import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';
import ContextualCTA from '../../components/ContextualCTA';
import styles from './PolandShipMyCar.module.css';

// =============================================================================
// PolandShipMyCar.jsx — Merged audience (Poland + Polonia w USA)
// Route: /pl/ship-my-car
// Primary audience: Poland buyers importing cars from US auctions
// Secondary audience: Polish diaspora in USA needing inland US transport
// Co-brand: Y7 Logistics (US inland, FMCSA MC#1741537) + DaytonaCargo (ocean+EU)
// Sources: americars.com.pl, motopodprad.pl, cars-world.pl, usrides.pl,
//          petrolboys.pl, daytonacargo.com/pl
// =============================================================================

// -- Structured data ----------------------------------------------------------

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Czy muszę już mieć kupione auto, żeby zamówić transport?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nie. Możesz napisać do nas przed licytacją — dostaniesz realną wycenę transportu lądowego w USA i wiesz, ile naprawdę będzie kosztować całość, zanim podbijesz stawkę na Copart. Wycena jest bezpłatna i nie zobowiązuje do zlecenia. Alternatywnie zgłaszasz się zaraz po wygranej licytacji, wtedy od razu rejestrujemy auto w systemie.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ile trwa cały proces od wygranej licytacji do dostawy pod dom w Polsce?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typowo 6-8 tygodni. Rozkład: transport lądowy z placu Copart do portu w USA 3-10 dni, oczekiwanie na załadunek kontenera 1-2 tygodnie, fracht morski do Europy 3-5 tygodni, odprawa celna w porcie docelowym 2-5 dni, transport lądowy do klienta w Polsce 2-4 dni. Transport RoRo bywa o tydzień szybszy niż kontener, ale nie jest dostępny dla aut z salvage title.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kto odpowiada za auto na każdym etapie — Y7 czy DaytonaCargo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Y7 Logistics (licencjonowany broker FMCSA, MC #1741537) obsługuje etap amerykański: odbiór z placu aukcyjnego, transport lądowy do portu w USA, przekazanie do terminala. Od momentu załadunku kontenera przejmuje obsługę DaytonaCargo LLC (Dover, Delaware) — fracht morski, dokumenty eksportowe, odprawa celna w Europie, dostawa do Polski. Obie firmy są ze sobą powiązane, więc nie koordynujesz dwóch oddzielnych umów.',
      },
    },
    {
      '@type': 'Question',
      name: 'Jakie dokumenty muszę przygotować przed złożeniem zlecenia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Minimum: numer lotu z Copart lub IAAI (lub inny identyfikator pojazdu, jeśli auto jest od dealera), kopia title lub bill of sale po wygranej licytacji, dane kontaktowe odbiorcy w Polsce, adres dostawy. Do odprawy celnej w Polsce potrzebne będą dodatkowo: dane kupującego, NIP firmy (jeśli zakup na firmę), wskazanie portu docelowego. DaytonaCargo prowadzi klienta przez całą dokumentację eksportową i importową.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mieszkam w USA i potrzebuję tylko transportu między stanami — też się tym zajmujecie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. Y7 Logistics obsługuje Polonię w USA w zakresie transportu lądowego po całych Stanach — z aukcji Copart i IAAI, między stanami, od dealerów, na sprzedaż prywatną. W tym przypadku nie angażujemy DaytonaCargo, bo auto zostaje w USA. Komunikację prowadzimy po angielsku lub rosyjsku przez Telegram; jeśli zależy Ci na obsłudze po polsku, zarekomendujemy DaytonaCargo, która również operuje na rynku amerykańskim.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy można zamówić samą część transportu — tylko odbiór z Copart bez dalszej wysyłki?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. Y7 Logistics obsługuje również zlecenia obejmujące wyłącznie transport lądowy w USA — z placu Copart do wskazanego punktu w Stanach (port, magazyn, inny spedytor, adres prywatny). To standardowe rozwiązanie dla klientów, którzy samodzielnie organizują fracht morski albo dla Polonii mieszkającej w USA.',
      },
    },
  ],
};

// Breadcrumb: Home -> Sprowadzanie aut -> Zamów transport
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.y7agency.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Sprowadzanie aut',
      item: 'https://www.y7agency.com/pl',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Zamów transport',
      item: 'https://www.y7agency.com/pl/ship-my-car',
    },
  ],
};

// -- Data arrays --------------------------------------------------------------

const checklistItems = [
  'Numer lotu z Copart lub IAAI (albo identyfikator pojazdu od dealera)',
  'Kopia title lub bill of sale po wygranej licytacji',
  'Dane kontaktowe osoby odbierającej auto (imię, telefon, email)',
  'Dokładny adres dostawy — ulica, miasto, kod pocztowy',
  'Preferowany port docelowy: Gdynia, Bremerhaven lub Rotterdam (doradzamy)',
  'Informacja o stanie auta: jeździ, nie jeździ, brak kluczyków — wpływa na koszt załadunku',
];

const orderingSteps = [
  {
    num: 1,
    title: 'Wstępne zapytanie i wycena',
    desc: 'Piszesz do nas przez Telegram lub email. Podajesz numer lotu z Copart/IAAI albo link do aukcji. W ciągu 1-2 godzin dostajesz realną wycenę obejmującą transport lądowy w USA (Y7) oraz szacunkowy koszt frachtu i dostawy do Polski (DaytonaCargo). Wycena jest bezpłatna i nie zobowiązuje do zlecenia.',
  },
  {
    num: 2,
    title: 'Potwierdzenie zlecenia po wygranej licytacji',
    desc: 'Po wygraniu licytacji przesyłasz nam potwierdzenie z Copart lub IAAI. Rejestrujemy auto w naszym systemie i przypisujemy do transportu lądowego. Otrzymujesz dostęp do portalu klienta, gdzie możesz śledzić status na każdym etapie.',
  },
  {
    num: 3,
    title: 'Odbiór z placu aukcyjnego w USA',
    desc: 'Nasz przewoźnik zabiera auto z placu Copart w ciągu 3-10 dni od dyspozycji. Uwaga: Copart nalicza opłaty za storage od 3. dnia po wygranej licytacji — szybkie potwierdzenie zlecenia oszczędza 100-300 USD. Przewoźnik wykonuje dokumentację zdjęciową przy załadunku.',
  },
  {
    num: 4,
    title: 'Transport do portu załadunku w USA',
    desc: 'Auto trafia do jednego z portów: Newark (NJ), Baltimore (MD), Savannah (GA), Houston (TX) lub Los Angeles (CA). Wybór portu zależy od lokalizacji placu Copart i dostępności slotów kontenerowych. To moment, w którym odpowiedzialność przechodzi z Y7 Logistics na DaytonaCargo.',
  },
  {
    num: 5,
    title: 'Fracht morski do Europy',
    desc: 'DaytonaCargo ładuje auto w kontener 40HC (standardowo 1-3 auta w kontenerze) albo na statek RoRo. Tranzyt oceaniczny trwa 3-5 tygodni. Na tym etapie otrzymujesz konosament (BOL) — dokument potwierdzający załadunek i tytuł do odbioru w porcie docelowym.',
  },
  {
    num: 6,
    title: 'Odprawa celna i dostawa pod dom',
    desc: 'Po przybyciu do portu docelowego (Gdynia, Bremerhaven lub Rotterdam) DaytonaCargo prowadzi odprawę celną. Klient otrzymuje rachunki za cło (10% wartości), VAT (23%) i akcyzę (3,1% do 2.0L, 18,7% powyżej). Po opłaceniu należności auto jest transportowane lawetą pod wskazany adres w Polsce.',
  },
];

// Diaspora section — use cases for Polonia in USA
const diasporaUseCases = [
  {
    title: 'Odbiór z Copart lub IAAI pod dom',
    desc: 'Kupujesz auto na aukcji w innym stanie i potrzebujesz dostawy pod dom w USA. Y7 obsługuje wszystkie 50 stanów — typowa trasa międzystanowa (np. Kalifornia → Illinois) to 5-8 dni i $900-1 400 dla sedana.',
  },
  {
    title: 'Transport między stanami — przeprowadzka',
    desc: 'Przeprowadzasz się z Chicago do Florydy i nie chcesz jechać trzy dni za kółkiem. Zabieramy auto sprzed domu i dostarczamy pod nowy adres. Opcja enclosed (laweta kryta) dostępna dla aut kolekcjonerskich i nowych.',
  },
  {
    title: 'Sprzedaż prywatna — dostawa do kupującego',
    desc: 'Sprzedajesz auto na Facebook Marketplace albo Cars.com komuś z drugiego końca kraju. Organizujemy odbiór i dostawę — Ty wystawiasz fakturę przewozową, my koordynujemy kierowcę.',
  },
  {
    title: 'Dostawa do portu w USA — własna wysyłka do Europy',
    desc: 'Planujesz wysłać auto rodzinie w Polsce, ale współpracujesz już z innym spedytorem morskim. Dostarczamy auto do wskazanego portu (Newark, Baltimore, Savannah, Houston, LA) — Ty przejmujesz od momentu przekazania do terminala.',
  },
];

// =============================================================================
// Component
// =============================================================================

function PolandShipMyCar() {
  return (
    <div className={styles.page} lang="pl">
      {/* -- Head ----------------------------------------------------------- */}
      <Helmet>
        <title>Zamów transport auta z USA — dla Polski i Polonii w USA | Y7 Logistics</title>
        <meta
          name="description"
          content="Zamów transport auta z aukcji Copart lub IAAI. Y7 Logistics (broker FMCSA MC #1741537) obsługuje transport lądowy w USA. Dla importu do Polski — siostrzana firma DaytonaCargo. Wycena w 1 godzinę."
        />
        <meta
          name="keywords"
          content="zamów transport auta z USA, sprowadzenie auta z Copart, transport samochodu USA Polska, transport aut między stanami, Polonia USA transport, Y7 Logistics, DaytonaCargo"
        />
        <link rel="canonical" href="https://www.y7agency.com/pl/wysylka-auta-z-usa" />
        <meta property="og:title" content="Zamów transport auta z USA — Y7 × DaytonaCargo" />
        <meta
          property="og:description"
          content="Licencjonowany broker FMCSA (MC #1741537). Obsługujemy import do Polski oraz transport w USA dla Polonii. Bez ukrytych opłat."
        />
        <meta property="og:url" content="https://www.y7agency.com/pl/ship-my-car" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:image" content="https://www.y7agency.com/og/ship-my-car-pl.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zamów transport auta z USA" />
        <meta
          name="twitter:description"
          content="Y7 × DaytonaCargo: od placu Copart do drzwi w Polsce. Dla Polonii w USA — transport między stanami. Wycena w 1 godzinę."
        />
        <html lang="pl" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags
        currentPath="/ship-my-car"
        hasPolishVersion={true}
        hasUkrainianVersion={true}
        hasRussianVersion={true}
      />

      {/* ================================================================== */}
      {/* SECTION 1 — Hero                                                    */}
      {/* ================================================================== */}
      <section className={styles.bandBoard}>
        <div className={styles.heroInner}>
          <div className={styles.eyebrowPlainBoard}>
            Zamówienie transportu
          </div>
          <h1 className={styles.h1}>
            Zamów transport auta z USA — prosto, bez ukrytych opłat
          </h1>
          <p className={styles.leadBoard} style={{ marginTop: '1.5rem', maxWidth: '720px' }}>
            Wygrałeś licytację na Copart albo IAAI? A może dopiero planujesz zakup
            i chcesz wiedzieć, ile realnie kosztuje cała droga od placu aukcyjnego
            w Stanach pod dom w Polsce? A może mieszkasz w USA i potrzebujesz
            jedynie transportu między stanami? Trafiłeś w dobre miejsce. Y7
            Logistics to licencjonowany broker FMCSA (MC #1741537) obsługujący
            transport lądowy na terenie całych Stanów Zjednoczonych. Dla klientów,
            którzy sprowadzają auta do Polski, dalszą część obsługi — fracht
            morski, dokumentację eksportową, odprawę celną i dostawę pod Twój
            adres — prowadzi nasza siostrzana firma DaytonaCargo LLC z siedzibą
            w Dover, Delaware. Ta strona opisuje oba scenariusze: na górze pełna
            obsługa z importem do Polski, niżej — zakres dla Polonii mieszkającej
            w Stanach.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 2 — Checklist                                              */}
      {/* ================================================================== */}
      <section className={styles.bandPaper}>
        <div className={styles.inner}>
          <span className={styles.eyebrowPlainPaper}>PRZYGOTOWANIE</span>
          <h2 className={styles.h2Paper}>Co przygotować przed złożeniem zlecenia</h2>
          <p className={styles.leadPaper} style={{ marginBottom: '1.5rem' }}>
            Im wcześniej skompletujesz te informacje, tym szybciej dostaniesz
            wiążącą wycenę i krótszy czas oczekiwania na odbiór z placu Copart.
            Bez owijania w bawełnę — to minimum, bez którego nie ruszamy
            z transportem.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
            }}
          >
            {checklistItems.map((item, idx) => (
              <div key={idx} className={styles.cardPaper}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span className={styles.checkMark}>
                    &#10003;
                  </span>
                  <span className={styles.pPaper}>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 3 — Ordering workflow (6 steps) — Poland import            */}
      {/* ================================================================== */}
      <section className={styles.bandBoard}>
        <div className={styles.inner}>
          <span className={styles.eyebrowRuleBoard}>JAK TO DZIAŁA</span>
          <h2 className={styles.h2Board}>Jak wygląda proces importu do Polski — krok po kroku</h2>
          <p className={styles.leadBoard} style={{ marginBottom: '2rem' }}>
            Cały proces — od pierwszego zapytania do dostawy pod dom w Polsce —
            zajmuje typowo 6-8 tygodni. Poniżej pokazujemy, co dzieje się na
            każdym etapie i kto za co odpowiada. Warto zauważyć, że
            odpowiedzialność przechodzi z Y7 na DaytonaCargo w momencie załadunku
            kontenera w porcie USA — ale dla Ciebie to jedna ciągła obsługa.
          </p>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {orderingSteps.map((step) => (
              <div
                key={step.num}
                className={styles.cardBoard}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}
              >
                <div className={styles.stepBadge}>
                  {step.num}
                </div>
                <div>
                  <h3 className={styles.h3SansBoard}>
                    {step.title}
                  </h3>
                  <p className={styles.pBoard} style={{ margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 4 — Pricing overview (Poland import)                        */}
      {/* ================================================================== */}
      <section className={styles.bandPaper}>
        <div className={styles.inner}>
          <span className={styles.eyebrowPlainPaper}>KOSZTY</span>
          <h2 className={styles.h2Paper}>Orientacyjne koszty transportu do Polski</h2>
          <p className={styles.leadPaper} style={{ marginBottom: '1.5rem' }}>
            Poniżej typowe zakresy cen dla standardowego auta osobowego (sedan,
            SUV, crossover do 2.5 tony). Wiążącą wycenę dostaniesz po przesłaniu
            numeru lotu — każde auto wyceniamy indywidualnie, bo różnice między
            placami Copart i portami załadunku potrafią sięgać kilkuset dolarów.
            Ceny nie obejmują cła, VAT-u i akcyzy płaconych w Polsce.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            <div className={styles.cardPaper}>
              <h3 className={styles.priceLabelPaper}>
                Transport lądowy w USA (Y7)
              </h3>
              <div className={styles.priceValuePaper}>
                $300–1 600
              </div>
              <ul className={styles.priceList}>
                <li>Do 500 mil: $300–600</li>
                <li>500–1 500 mil: $600–1 200</li>
                <li>Cross-country (1 500+ mil): $900–1 600</li>
              </ul>
              <p className={styles.notePaper} style={{ marginTop: '0.6rem' }}>
                Odbiór z placu Copart/IAAI i dostawa pod adres lub do portu. Cena zależy
                od dystansu, stanu auta (jeździ/nie jeździ) i pory roku.
              </p>
            </div>

            <div className={styles.cardPaper}>
              <h3 className={styles.priceLabelPaper}>
                Fracht morski (DaytonaCargo)
              </h3>
              <div className={styles.priceValuePaper}>
                $1 150–2 250
              </div>
              <p className={styles.priceDescPaper}>
                Kontener 40HC współdzielony (1/3 do 1/2 kontenera) lub RoRo.
                Zależy od portu załadunku w USA i portu docelowego w Europie.
              </p>
            </div>

            <div className={styles.cardPaper}>
              <h3 className={styles.priceLabelPaper}>
                Odprawa + dostawa w Polsce
              </h3>
              <div className={styles.priceValuePaper}>
                4 000–8 000 zł
              </div>
              <p className={styles.priceDescPaper}>
                Agencja celna, rozładunek w porcie, transport lawetą pod wskazany
                adres. Nie obejmuje cła (10%), VAT-u (23%) ani akcyzy (3,1% lub 18,7%).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 5 — Trust signals                                          */}
      {/* ================================================================== */}
      <section className={styles.bandBoard}>
        <div className={styles.inner}>
          <div className={styles.trustCard}>
            <h2 className={styles.h2Board} style={{ fontSize: '1.5rem' }}>
              Dlaczego warto zaufać Y7 × DaytonaCargo
            </h2>
            <p className={styles.pBoard} style={{ marginBottom: '1rem' }}>
              Y7 Logistics działa jako licencjonowany broker FMCSA — podlegamy
              federalnemu nadzorowi amerykańskiego Departamentu Transportu, mamy
              obowiązkowe ubezpieczenie odpowiedzialności cywilnej oraz pełną
              rejestrację w rejestrze publicznym FMCSA. Każdy może zweryfikować
              nasz status przez wyszukiwarkę SAFER (safer.fmcsa.dot.gov) wpisując
              numer MC #1741537.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem' }}>
              <div>
                <span className={styles.trustStatLabel}>
                  Licencja brokerska
                </span>
                <span className={styles.trustStatValue}>MC#1741537</span>
              </div>

              <div>
                <span className={styles.trustStatLabel}>
                  Status FMCSA
                </span>
                <span className={styles.trustStatValue}>Aktywny, ubezpieczony</span>
              </div>

              <div>
                <span className={styles.trustStatLabel}>
                  Siostrzana firma
                </span>
                <span className={styles.trustStatValue}>DaytonaCargo</span>
              </div>
            </div>

            <p className={styles.pBoard} style={{ marginTop: '1rem' }}>
              DaytonaCargo LLC (Dover, Delaware) specjalizuje się w eksporcie aut
              z Ameryki Północnej do Europy. Nasze firmy tworzą jedną kompleksową
              obsługę rozdzieloną na dwa podmioty prawne — jeden optymalizowany
              pod amerykańskie regulacje FMCSA, drugi pod międzynarodowy transport
              morski i odprawę celną w UE.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 6 — Contact (shared)                                        */}
      {/* ================================================================== */}
      <section className={styles.bandPaper}>
        <div className={styles.inner}>
          <span className={styles.eyebrowPlainPaper}>KONTAKT</span>
          <h2 className={styles.h2Paper}>Skontaktuj się z nami</h2>
          <p className={styles.leadPaper} style={{ marginBottom: '1.5rem' }}>
            Najszybsza odpowiedź — przez Telegram. Standardowo odpisujemy
            w ciągu 1 godziny w godzinach pracy (9:00-18:00 czasu wschodniego
            USA, czyli 15:00-00:00 czasu polskiego). Komunikacja po angielsku
            lub rosyjsku. Dla obsługi w języku polskim zarekomendujemy
            DaytonaCargo — nasza siostrzana firma prowadzi pełną obsługę po polsku.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            <div className={styles.cardPaper}>
              <p className={styles.contactLabel}>
                Telegram (EN/RU)
              </p>
              <a
                href="https://t.me/y7dispatch_bot"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                @y7dispatch_bot
              </a>
            </div>

            <div className={styles.cardPaper}>
              <p className={styles.contactLabel}>
                Email
              </p>
              <a
                href="mailto:info@y7agency.com"
                className={styles.contactLink}
              >
                info@y7agency.com
              </a>
            </div>

            <div className={styles.cardPaper}>
              <p className={styles.contactLabel}>
                Obsługa po polsku
              </p>
              <a
                href="mailto:info@y7agency.com"
                className={styles.contactLink}
              >
                info@y7agency.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 7 — DLA POLONII W USA (diaspora split)                     */}
      {/* ================================================================== */}
      <section className={styles.bandBoard}>
        <div className={styles.inner}>
          <div className={styles.eyebrowPlainBoard}>
            Dla Polonii w USA
          </div>
          <h2 className={styles.h2Board}>Mieszkasz w Stanach? Transport w USA bez wysyłki do Polski</h2>
          <p className={styles.pBoard} style={{ marginBottom: '1.5rem' }}>
            Jeśli mieszkasz w USA i potrzebujesz jedynie przewiezienia auta
            między stanami, odbioru z Copart pod dom albo dostawy do portu —
            Y7 obsługuje ten zakres w pełni samodzielnie, bez angażowania
            DaytonaCargo. Jesteśmy licencjonowanym brokerem FMCSA (MC #1741537)
            z dostępem do sieci zweryfikowanych przewoźników na terenie
            wszystkich 50 stanów.
          </p>
          <p className={styles.pBoard} style={{ marginBottom: '2rem' }}>
            <strong>Uczciwie mówiąc:</strong> nasz zespół w Y7 nie prowadzi
            obsługi w języku polskim — komunikację prowadzimy po angielsku lub
            rosyjsku przez Telegram. Jeśli zależy Ci na pełnej obsłudze po
            polsku, również w USA, warto napisać do DaytonaCargo, która obsługuje
            polskojęzycznych klientów na rynku amerykańskim.
          </p>

          <h3 className={styles.h3SansBoard} style={{ marginTop: '2rem', marginBottom: '1rem' }}>
            Typowe zlecenia od Polonii mieszkającej w USA
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            {diasporaUseCases.map((uc, idx) => (
              <div key={idx} className={styles.cardBoard}>
                <h4 className={styles.h3SansBoard}>
                  {uc.title}
                </h4>
                <p className={styles.pBoard} style={{ fontSize: '0.95rem', margin: 0 }}>{uc.desc}</p>
              </div>
            ))}
          </div>

          <h3 className={styles.h3SansBoard} style={{ marginTop: '2rem', marginBottom: '1rem' }}>
            Orientacyjne ceny transportu między stanami
          </h3>
          <p className={styles.pBoard} style={{ marginBottom: '1.5rem' }}>
            Ceny dla standardowego sedana lub crossovera na lawecie otwartej.
            Auta enclosed (kryte), ciężarówki pickup i auta niejężdżące
            wyceniamy indywidualnie — dopłata typowo 30-60%.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            <div className={styles.cardBoard}>
              <h4 className={styles.priceLabelBoard}>
                Krótki dystans (do 500 mil)
              </h4>
              <div className={styles.priceValueBoard}>
                $450–750
              </div>
              <p className={styles.priceDescBoard}>
                Np. NY → Chicago, LA → San Francisco, Miami → Atlanta.
                Czas dostawy 3-5 dni.
              </p>
            </div>

            <div className={styles.cardBoard}>
              <h4 className={styles.priceLabelBoard}>
                Średni dystans (500-1500 mil)
              </h4>
              <div className={styles.priceValueBoard}>
                $750–1 200
              </div>
              <p className={styles.priceDescBoard}>
                Np. Chicago → Miami, NY → Dallas, Denver → Seattle.
                Czas dostawy 5-8 dni.
              </p>
            </div>

            <div className={styles.cardBoard}>
              <h4 className={styles.priceLabelBoard}>
                Przez cały kraj (1500+ mil)
              </h4>
              <div className={styles.priceValueBoard}>
                $1 100–1 600
              </div>
              <p className={styles.priceDescBoard}>
                Np. Kalifornia → New York, Florida → Washington.
                Czas dostawy 7-10 dni.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 8 — FAQ                                                    */}
      {/* ================================================================== */}
      <section className={styles.bandPaper}>
        <div className={styles.inner}>
          <span className={styles.eyebrowPlainPaper}>FAQ</span>
          <h2 className={styles.h2Paper}>Najczęściej zadawane pytania</h2>
          <p className={styles.leadPaper} style={{ marginBottom: '1.5rem' }}>
            Zebraliśmy pytania, które najczęściej dostajemy od klientów — zarówno
            importujących auta do Polski, jak i Polonii w USA. Jeśli nie znajdziesz
            tu odpowiedzi, napisz do nas na Telegramie, odpiszemy bez szablonów.
          </p>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {faqSchema.mainEntity.map((faq, idx) => (
              <details key={idx} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  {faq.name}
                  <span className={styles.faqMarker}>
                    +
                  </span>
                </summary>
                <p className={styles.faqAnswer}>{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContextualCTA variant="card" to="/exporters" intlKey="exporters" tone="amber" />

      {/* ================================================================== */}
      {/* SECTION 9 — Dark CTA                                               */}
      {/* ================================================================== */}
      <section className={styles.bandBoard}>
        <div className={styles.inner} style={{ textAlign: 'center' }}>
          <h2 className={styles.h2Board}>Gotowy do zamówienia transportu?</h2>
          <p className={styles.leadBoard} style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            Wyślij numer lotu z Copart lub IAAI przez Telegram — dostaniesz
            realną wycenę w ciągu 1 godziny. Wycena jest bezpłatna i nie
            zobowiązuje Cię do zlecenia.
          </p>
          <div className={styles.finalActions}>
            <a
              href="https://t.me/y7dispatch_bot"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnCta}
            >
              Napisz na Telegram
            </a>
            <Link
              to="/pl"
              className={styles.btnGhostDark}
            >
              Wróć do przewodnika
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PolandShipMyCar;
