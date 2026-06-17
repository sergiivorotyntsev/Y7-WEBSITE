// PlAuctionSavings.jsx
// Route: /pl/tani-transport-z-aukcji
// Audience: buyers importing cars from US auctions to Poland. Y7 owns the US
// inland leg (auction → US export port). No DaytonaCargo — Y7 keeps the US-side
// chain in-house and notes its OWN exporter/representative in Poland for the
// Polish-language / European side. Per-job pricing (no flat fee). Self-canonical,
// no hreflang twin. Native Polish per STYLE_GUIDE_PL.md («Ty», concrete numbers,
// skeptical-honest tone, no marketing hype).
import { Link } from 'react-router-dom';
import AuctionSavingsIntl, {
  Section,
  ComparisonCard,
  pStyle,
  strongStyle,
  accentLinkStyle,
} from './AuctionSavingsIntl';

const faqs = [
  {
    q: 'Czy transport od aukcji jest tańszy niż przez brokera?',
    a: 'Zwykle nie. Wewnętrzny transport aukcji to pośrednik, który dolicza własny narzut do stawki przewoźnika. Cox Automotive, właściciel Manheim, sam pozycjonuje swoją platformę bezpośredniego zlecania przewoźnikom jako sposób na oszczędność — w przeciwieństwie do opcji pełnoserwisowej. Broker FMCSA znajduje tych samych przewoźników po realnej stawce rynkowej.',
  },
  {
    q: 'Ile można zaoszczędzić na transporcie z aukcji przez brokera?',
    a: 'To zależy od trasy, więc nie podajemy jednego procentu. Przykład: na krótkim odcinku Copart w New Jersey → Port Newark aukcja potrafi podać około $300, a rynkowa stawka przewoźnika to bliżej $150–200 plus nasza przejrzysta opłata. Znasz już cenę aukcji — wyślij trasę, podamy aktualną stawkę, a decyzja należy do Ciebie.',
  },
  {
    q: 'Dlaczego transport od aukcji zawiera narzut?',
    a: 'Bo każda duża aukcja zarabia na transporcie — cena, którą widzisz, to stawka przewoźnika plus prowizja aukcji. To ich model: Cox, właściciel Manheim, wprost nazywa bezpośrednie zlecanie przewoźnikom sposobem na oszczędność. Broker FMCSA dysponuje tych samych przewoźników bez narzutu aukcji.',
  },
  {
    q: 'Skąd mam wiedzieć, że Y7 też nie dolicza narzutu do stawki?',
    a: 'Przy płatności gotówką przy odbiorze (COD) płacisz przewoźnikowi bezpośrednio, gdy auto dociera — realną stawkę widzisz sam, a ukrycie narzutu jest niemożliwe. Przychód Y7 to osobna, przejrzysta opłata za organizację doliczona do stawki, a nie różnica w jej środku.',
  },
  {
    q: 'Jak szybko można odebrać auto z aukcji?',
    a: 'To zależy od trasy. Popularne kierunki ruszają szybko; trasy odludne lub nietypowe trwają dłużej. Podajemy realną stawkę rynkową — to ona znajduje przewoźnika, zanim ruszą opłaty za postój. Zaniżona stawka po prostu wisi na giełdzie ładunków.',
  },
  {
    q: 'Czy obsługujecie Copart, IAA, Manheim, ADESA i ACV?',
    a: 'Tak — jeden broker dla wszystkich dużych aukcji w USA. Załatwiamy gate pass, dysponujemy zweryfikowanego przewoźnika przez Central Dispatch i dostarczamy auto do portu załadunku; płacisz realną stawkę rynkową plus przejrzystą opłatę za organizację.',
  },
];

export default function PlAuctionSavings() {
  return (
    <AuctionSavingsIntl
      urlLang="pl"
      htmlLang="pl"
      ogLocale="pl_PL"
      path="/pl/tani-transport-z-aukcji"
      title="Tani transport auta z aukcji w USA — bez narzutu aukcji | Y7 Logistics"
      description="Transport „wewnętrzny” aukcji (Copart, IAA, Manheim) dolicza własny narzut do stawki przewoźnika. Y7 to licencjonowany broker FMCSA — dysponujemy tych samych przewoźników bezpośrednio, po realnej stawce. Odbiór z aukcji do portu w USA."
      homeLabel="Strona główna"
      currentLabel="Tani transport z aukcji"
      kicker="Transport z aukcji × USA"
      h1="Transport auta z aukcji — bez narzutu aukcji"
      intro={
        <>
          <p style={pStyle}>
            Kiedy wygrywasz lot na Copart, IAA, Manheim, ADESA lub ACV, cena transportu
            „wewnętrznego” od aukcji to stawka przewoźnika <strong style={strongStyle}>plus własny
            narzut aukcji</strong>. Y7 Logistics to licencjonowany broker FMCSA (MC #1741537,
            Newton MA). Obsługujemy amerykańską część trasy: odbiór auta z placu i transport do
            portu załadunku w USA.
          </p>
          <p style={{ ...pStyle, marginBottom: 0 }}>
            Współpracujemy z tymi samymi przewoźnikami bezpośrednio, więc płacisz realną stawkę
            rynkową — bez narzutu ukrytego w cenie. Mamy też własnego eksportera w Polsce, więc masz
            kontakt po polsku i obsługę dalszego etapu po stronie europejskiej.
          </p>
        </>
      }
      faqTitle="Najczęstsze pytania"
      faqs={faqs}
      cta={{
        title: 'Gotowy poznać swoją realną stawkę?',
        subtitle:
          'Przejrzysta cena, zweryfikowani przewoźnicy, szybka odpowiedź. Wyślij nam trasę od aukcji do portu — podamy aktualną stawkę rynkową, a decyzja należy do Ciebie.',
        primaryTo: '/pl/quote',
        primaryLabel: 'Sprawdź stawkę dla trasy',
        telegramLabel: 'Napisz na Telegramie',
      }}
    >
      <Section kicker="Dlaczego drożej" title="Dlaczego transport od aukcji jest droższy">
        <p style={{ ...pStyle, marginBottom: 0 }}>
          Każda duża aukcja zarabia na transporcie — cena, którą widzisz, to stawka przewoźnika plus
          prowizja aukcji. To ich model biznesowy, nie tajemnica. Cox Automotive, właściciel Manheim,
          mówi o tym wprost: opcję pełnoserwisową Ready Logistics sprzedaje pod hasłem{' '}
          <strong style={strongStyle}>„Save time”</strong>, a własną platformę bezpośredniego
          zlecania przewoźnikom, Central Dispatch, pozycjonuje jako sposób na oszczędność. Broker
          FMCSA dysponuje tych samych przewoźników — ale bez narzutu aukcji po drodze.
        </p>
      </Section>

      <Section kicker="Porównanie" title="Porównaj sam: cena aukcji vs broker bezpośrednio">
        <ComparisonCard
          auctionLabel="Przez aukcję"
          auctionChildren={
            <>
              Stawka przewoźnika <strong style={strongStyle}>+ narzut aukcji</strong> — to właśnie
              zbędny koszt.
            </>
          }
          y7Label="Przez Y7 (broker bezpośrednio)"
          y7Children={
            <>
              <strong style={strongStyle}>Ta sama rynkowa stawka przewoźnika</strong>, którą widzisz
              i płacisz, <strong style={strongStyle}>+ nasza przejrzysta opłata za
              organizację</strong> — liczymy ją pod każdy transport, bez sztywnej kwoty i bez
              narzutu ukrytego w stawce.
            </>
          }
        />
        <p style={pStyle}>
          <strong style={strongStyle}>Przykład:</strong> na krótkim odcinku{' '}
          <strong style={strongStyle}>Copart w New Jersey → Port Newark</strong> aukcja potrafi
          podać około <strong style={strongStyle}>$300</strong>, podczas gdy rynkowa stawka
          przewoźnika jest zwykle bliższa <strong style={strongStyle}>$150–200</strong> plus nasza
          przejrzysta opłata. <strong style={strongStyle}>Każda trasa jest inna.</strong> Wyślij nam
          swoją trasę — podamy aktualną stawkę rynkową, a decyzja należy do Ciebie.
        </p>
        <Link to="/pl/quote" style={accentLinkStyle}>
          Sprawdź realną stawkę dla swojej trasy
        </Link>
      </Section>

      <Section kicker="Uczciwa cena" title="Jak utrzymujemy uczciwą cenę">
        <p style={{ ...pStyle, marginBottom: 0 }}>
          Przy płatności gotówką przy odbiorze (COD) płacisz wyznaczonemu przewoźnikowi{' '}
          <strong style={strongStyle}>bezpośrednio, gdy auto dociera</strong> — realną stawkę widzisz
          na własne oczy, a ukrycie narzutu jest niemożliwe. Przychód Y7 to osobna, przejrzysta
          opłata za organizację transportu doliczona do stawki, a nie różnica ukryta w środku.
          Wolisz, żebyśmy to my rozliczali przewoźnika? To osobna usługa, ustalana wcześniej.
        </p>
      </Section>

      <Section kicker="Terminy" title="Uczciwie o terminach">
        <p style={{ ...pStyle, marginBottom: 0 }}>
          Znalezienie dobrego przewoźnika po uczciwej stawce wymaga trochę czasu. Popularne kierunki
          ruszają szybko; trasy odludne lub nietypowe trzeba szukać dłużej. Podajemy realną stawkę
          rynkową — to ona faktycznie znajduje przewoźnika, zanim zaczną naliczać się opłaty za
          postój (storage). Sztucznie zaniżona stawka po prostu wisi na giełdzie ładunków, a czas
          leci.
        </p>
      </Section>
    </AuctionSavingsIntl>
  );
}
