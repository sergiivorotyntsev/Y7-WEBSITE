# TRANSPORT Follow-up — Carrier Application Backend

**Status:** Deferred. Y7-WEBSITE frontend delivered this session; TRANSPORT backend needs a dedicated session with full test-setup access.

## Why deferred

1. TRANSPORT repo had uncommitted work on `main` (`CLAUDE.md`, `.gitignore`, 2 new scripts) when this sprint ran — safer to pair the backend implementation than stack on pending changes.
2. Sprint spec referenced helpers that don't exist exactly as named (e.g. `services/admin_notifier.py` — the real helper is `services/alerting.py::send_alert(message, severity)`).
3. Email sending uses the **outbox pattern** (`services/email_sender.py::enqueue_email`), not direct Graph API. The endpoint code must be written around this.
4. `create_invitation(created_by=...)` expects `int | None`, not a string — needs a system user ID or `None`.
5. Tests require PDF fixtures + test DB isolation that warrant a tight local loop.

## Verified helper signatures (T01 audit)

### Onboarding token (reuse)

```python
# services/onboarding_token_service.py
def create_invitation(
    carrier_id: int,
    carrier_email: str,
    carrier_name: str | None = None,
    created_by: int | None = None,
    purpose: str = "bank_account",
    expires_hours: int = 72,
) -> dict:
    # Returns {'token', 'expires_at', 'portal_url', 'id'}
    # URL base: PORTAL_BASE_URL env var, defaults to https://carriers.y7dispatch.com
```

Call from the endpoint:

```python
from services.onboarding_token_service import create_invitation

invitation = create_invitation(
    carrier_id=carrier_id,
    carrier_email=contact_email,
    carrier_name=legal_name,
    created_by=None,  # no admin user for careers_web submissions
    purpose='bank_account',
    expires_hours=72,
)
portal_url = invitation['portal_url']
```

### Email (outbox pattern, not direct Graph)

```python
# services/email_sender.py
def enqueue_email(
    conn,
    *,
    to: str,
    subject: str,
    template: str,
    context: dict,
    customer_id: Optional[int] = None,
    reply_to_message_id: Optional[str] = None,
    source: Optional[str] = None,
    category: Literal["notification", "transactional"] = "notification",
    destination: str = "internal",
    idempotency_key: Optional[str] = None,
) -> int:  # outbox_id
```

The welcome email needs to be sent via `enqueue_email` inside the same transaction as the carrier insert. This means:
- A new email template (e.g. `templates/email/careers_welcome.html`) with Jinja-style placeholders for `portal_url`, `legal_name`, `contact_name`
- Email `category='transactional'` (login/security-adjacent, should always attempt delivery)
- `destination='external'` (going to a real carrier, not internal routing)
- The template and rendering helper live in `services/email_template_renderer.py`

### Admin alert (Slack via alerting.py, not admin_notifier)

```python
# services/alerting.py
from enum import Enum
class Severity(Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"

def send_alert(message: str, severity: Severity, context: Optional[dict] = None) -> bool:
    # Uses SLACK_WEBHOOK_URL env; falls back to logging
```

For Telegram specifically, there may be a separate path — `services/telegram_bot.py` / `services/bot_notifications.py` could be inspected for admin-chat notification patterns. If Telegram is required specifically (not Slack), this needs verification.

### DB connection pattern

```python
from db.connection import get_connection

with get_connection() as conn:
    row = conn.execute("... ?", (param,)).fetchone()
    # fetchone() returns dict-like (psycopg3 dict_row) — access with row['id']
    # NO positional [0] indexing
    # NO %s placeholders — always ?
```

## Schema additions required (T02)

Verify in `init_all_tables()` within `db/__init__.py`:

```sql
ALTER TABLE carriers ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'admin';
```

Check the current `carriers.status` CHECK constraint. If one exists restricting values, it must be widened to allow `'pending_application'`. Otherwise, no schema change needed.

Also verify the `carrier_documents` table accepts a row shape matching the insert in the endpoint:
```sql
INSERT INTO carrier_documents (
    carrier_id, canonical_type, source_type,
    original_filename, mime_type, file_size_bytes,
    pdf_content, uploaded_by, status, created_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
```

`uploaded_by` is typed in some places as `int`, in others as `text` — check actual column type before committing.

## Endpoint file (ready-to-adapt draft)

File: `api/routes/public_carrier.py`

```python
"""Public carrier application endpoint — POST /api/public/carrier-application.

Rate-limited, file-validated, creates carrier row + documents, issues
onboarding token, fires admin alert, enqueues welcome email.
Auth: NONE (public path).
"""

import logging
import re
from typing import Optional

from fastapi import APIRouter, File, Form, HTTPException, Request, UploadFile

from db.connection import get_connection
from services.onboarding_token_service import create_invitation
from services.email_sender import enqueue_email
from services.alerting import Severity, send_alert

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/public", tags=["public-carrier"])

MC_PATTERN = re.compile(r"^(MC-?)?\d{6,7}$")
USDOT_PATTERN = re.compile(r"^\d{6,8}$")
VALID_EQUIPMENT = {"open", "enclosed", "both"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB
ALLOWED_MIME = {"application/pdf", "image/jpeg", "image/png"}
MAGIC_BYTES = {
    "application/pdf": b"%PDF",
    "image/jpeg": b"\xff\xd8\xff",
    "image/png": b"\x89PNG\r\n\x1a\n",
}


def _validate_magic_bytes(content: bytes, declared_mime: str) -> bool:
    sig = MAGIC_BYTES.get(declared_mime)
    return bool(sig) and content.startswith(sig)


def _normalize_mc(mc: str) -> str:
    return re.sub(r"^MC-?", "", mc.upper().strip())


def _rate_limited(conn, ip: str) -> bool:
    """5 applications per IP per hour. Uses DB counter instead of Redis
    to avoid a new service dependency — check the last hour's application
    count for this IP."""
    row = conn.execute(
        """SELECT COUNT(*) AS n FROM carriers
           WHERE source = 'careers_web'
             AND notes LIKE ?
             AND created_at > NOW() - INTERVAL '1 hour'""",
        (f"%ip={ip}%",),
    ).fetchone()
    return (row["n"] if row else 0) >= 5


@router.post("/carrier-application")
async def submit_carrier_application(
    request: Request,
    legal_name: str = Form(...),
    mc_number: str = Form(...),
    usdot_number: str = Form(...),
    equipment_type: str = Form(...),
    contact_name: str = Form(...),
    contact_email: str = Form(...),
    contact_phone: str = Form(...),
    operating_states: str = Form(...),
    notes: Optional[str] = Form(None),
    coi_file: UploadFile = File(...),
    w9_file: UploadFile = File(...),
):
    client_ip = request.client.host if request.client else "unknown"

    # Validation
    mc_clean = _normalize_mc(mc_number)
    if not re.match(r"^\d{6,7}$", mc_clean):
        raise HTTPException(status_code=400, detail="Invalid MC number format")
    if not USDOT_PATTERN.match(usdot_number.strip()):
        raise HTTPException(status_code=400, detail="Invalid USDOT number format")
    if equipment_type.lower() not in VALID_EQUIPMENT:
        raise HTTPException(status_code=400, detail="equipment_type must be open|enclosed|both")
    if "@" not in contact_email or "." not in contact_email.split("@")[1]:
        raise HTTPException(status_code=400, detail="Invalid email")

    # File read + validation
    coi_content = await coi_file.read()
    w9_content = await w9_file.read()
    if len(coi_content) > MAX_FILE_SIZE or len(w9_content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large (max 10MB)")
    if coi_file.content_type not in ALLOWED_MIME or w9_file.content_type not in ALLOWED_MIME:
        raise HTTPException(status_code=400, detail="Only PDF, JPG, PNG accepted")
    if not _validate_magic_bytes(coi_content, coi_file.content_type):
        raise HTTPException(status_code=400, detail="COI magic bytes mismatch")
    if not _validate_magic_bytes(w9_content, w9_file.content_type):
        raise HTTPException(status_code=400, detail="W9 magic bytes mismatch")

    with get_connection() as conn:
        # Rate limit
        if _rate_limited(conn, client_ip):
            raise HTTPException(status_code=429, detail="Too many applications from this IP in the last hour")

        # MC uniqueness
        existing = conn.execute(
            "SELECT id FROM carriers WHERE mc_number = ?", (mc_clean,)
        ).fetchone()
        if existing:
            raise HTTPException(
                status_code=409,
                detail=(
                    "MC number already registered. If this is your company, "
                    "contact dispatch@y7agency.com."
                ),
            )

        try:
            notes_with_ip = f"ip={client_ip}; {notes or ''}"
            carrier = conn.execute(
                """INSERT INTO carriers
                   (name, legal_name, mc_number, usdot_number, contact_name,
                    email, phone, equipment_type, operating_states,
                    status, source, notes, created_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
                   RETURNING id""",
                (
                    legal_name.strip(), legal_name.strip(), mc_clean,
                    usdot_number.strip(), contact_name.strip(),
                    contact_email.strip(), contact_phone.strip(),
                    equipment_type.lower(), operating_states.strip(),
                    "pending_application", "careers_web", notes_with_ip,
                ),
            ).fetchone()
            carrier_id = carrier["id"]

            for (canonical, content, file_ref) in [
                ("COI", coi_content, coi_file),
                ("W9", w9_content, w9_file),
            ]:
                conn.execute(
                    """INSERT INTO carrier_documents
                       (carrier_id, canonical_type, source_type,
                        original_filename, mime_type, file_size_bytes,
                        pdf_content, uploaded_by, status, created_at)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())""",
                    (
                        carrier_id, canonical, "careers_application",
                        file_ref.filename, file_ref.content_type, len(content),
                        content, "careers_web", "pending_review",
                    ),
                )

            # Enqueue welcome email inside the same transaction
            # (requires a `careers_welcome` email template to exist in
            # services/email_template_renderer.py — create if missing)
            try:
                invitation = create_invitation(
                    carrier_id=carrier_id,
                    carrier_email=contact_email,
                    carrier_name=legal_name,
                    created_by=None,
                    purpose="bank_account",
                    expires_hours=72,
                )
                enqueue_email(
                    conn,
                    to=contact_email,
                    subject="Welcome to Y7 Logistics — Complete Your Carrier Setup",
                    template="careers_welcome",
                    context={
                        "contact_name": contact_name,
                        "legal_name": legal_name,
                        "portal_url": invitation["portal_url"],
                    },
                    category="transactional",
                    destination="external",
                    source="careers_web",
                    idempotency_key=f"careers_welcome_{carrier_id}",
                )
            except Exception:
                logger.exception("Failed to issue invitation / enqueue welcome email; admin should follow up")

            conn.commit()
        except HTTPException:
            conn.rollback()
            raise
        except Exception as e:
            conn.rollback()
            logger.exception("carrier-application insert failed")
            raise HTTPException(status_code=500, detail=f"Registration failed: {e}")

    # Best-effort admin alert (outside transaction; failure should not
    # roll back the carrier insert)
    try:
        send_alert(
            message=(
                f"New Carrier Application: {legal_name} | MC #{mc_clean} | "
                f"USDOT #{usdot_number} | {contact_email} | Equipment: {equipment_type} | "
                f"States: {operating_states} | carrier_id={carrier_id}"
            ),
            severity=Severity.MEDIUM,
            context={"carrier_id": carrier_id, "source": "careers_web", "ip": client_ip},
        )
    except Exception:
        logger.exception("admin alert failed (non-fatal)")

    return {
        "ok": True,
        "message": "Application received. Check your email for next steps within 5 minutes.",
        "carrier_id": carrier_id,
    }
```

Wire in `api/main.py`:
```python
from api.routes.public_carrier import router as public_carrier_router
app.include_router(public_carrier_router)
```

## Email template needed

Create `services/email_template_renderer.py` mapping for `careers_welcome` (or add an HTML template file wherever the project conventions live). Template body:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #993C1D;">Welcome to Y7 Logistics</h2>
  <p>Hi {{ contact_name }},</p>
  <p>Thanks for applying to join the Y7 carrier network. We've received your application for <strong>{{ legal_name }}</strong>.</p>
  <p><strong>Next step:</strong> Complete your setup by clicking the secure link below.</p>
  <ul>
    <li>ACH banking details (encrypted at rest)</li>
    <li>Voided check</li>
    <li>Driver/dispatcher contact info</li>
  </ul>
  <p style="margin: 24px 0;">
    <a href="{{ portal_url }}" style="background: #993C1D; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
      Complete Carrier Setup
    </a>
  </p>
  <p style="color: #666; font-size: 13px;">This link expires in 72 hours. If you need a new one, reply to this email.</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
  <p style="color: #888; font-size: 12px;">
    Y7 Consulting Inc, d/b/a Y7 Logistics<br>
    1007 Chestnut St, Newton, MA 02464<br>
    FMCSA MC #1741537 · USDOT #4427359 · Licensed &amp; Bonded FMCSA Broker
  </p>
</div>
```

## Tests to write (T04 — deferred)

16 tests covering:
- Valid submission returns ok + carrier row + documents + token
- Each missing field returns 400
- Invalid MC / USDOT / equipment / email formats return 400
- Duplicate MC returns 409
- Wrong magic bytes per file returns 400
- File too large returns 413
- Rate limit (6th submission from same IP within an hour) returns 429
- Email enqueue failure doesn't roll back carrier insert

Requires PDF fixtures at `tests/fixtures/minimal_coi.pdf` and `tests/fixtures/minimal_w9.pdf`.

## Verification after backend lands

```bash
cd C:/dev/TRANSPORT
python -m pytest tests/test_public_carrier_application.py -v
python -m pytest  # full regression, confirm no baseline drift
```

Deploy to Railway, then test end-to-end from `https://www.y7agency.com/careers/apply`.
