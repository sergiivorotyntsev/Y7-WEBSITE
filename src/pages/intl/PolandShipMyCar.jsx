import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';

// =============================================================================
// PolandShipMyCar.jsx — Merged audience (Poland + Polonia w USA)
// Route: /pl/ship-my-car
// Primary audience: Poland buyers importing cars from US auctions
// Secondary audience: Polish diaspora in USA needing inland US transport
// Co-brand: Y7 Logistics (US inland, FMCSA MC#1741537) + DaytonaCargo (ocean+EU)
// Sources: americars.com.pl, motopodprad.pl, cars-world.pl, usrides.pl,
//          petrolboys.pl, daytonacargo.com/pl
// =============================================================================

// -- Shared style objects -----------------------------------------------------

const pageStyle = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  color: '#2C2C2A',
  background: '#F7F5F0',
};

const sectionStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: 'clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2rem)',
};

const h1Style = {
  fontSize: 'clamp(2rem, 5vw, 3.25rem)',
  lineHeight: '1.15',
  fontWeight: 400,
};

const h2Style = {
  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
  lineHeight: '1.2',
  fontWeight: 400,
  marginBottom: '1rem',
};

const pStyle = {
  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
  lineHeight: '1.7',
  color: '#4A4A46',
};

const cardStyle = {
  background: '#fff',
  padding: '1.5rem',
  borderRadius: '8px',
  border: '1px solid #E8E4DC',
};

const ctaButtonStyle = {
  background: '#993C1D',
  color: '#fff',
  padding: '0.875rem 1.75rem',
  borderRadius: '6px',
  display: 'inline-block',
  textDecoration: 'none',
  fontFamily: 'system-ui, sans-serif',
  fontWeight: 500,
  border: 'none',
  cursor: 'pointer',
};

const darkCtaStyle = {
  background: '#2C2C2A',
  color: '#F7F5F0',
};

const accentColor = '#993C1D';

// Section divider style for the "Dla Polonii w USA" split
const dividerSectionStyle = {
  background: '#EFEAE0',
  borderTop: '1px solid #E8E4DC',
  borderBottom: '1px solid #E8E4DC',
  marginTop: '2rem',
};

// -- Structured data ----------------------------------------------------------

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Czy musz\u0119 ju\u017c mie\u0107 kupione auto, \u017ceby zam\u00f3wi\u0107 transport?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nie. Mo\u017cesz napisa\u0107 do nas przed licytacj\u0105 \u2014 dostaniesz realn\u0105 wycen\u0119 transportu l\u0105dowego w USA i wiesz, ile naprawd\u0119 b\u0119dzie kosztowa\u0107 ca\u0142o\u015b\u0107, zanim podbijesz stawk\u0119 na Copart. Wycena jest bezp\u0142atna i nie zobowi\u0105zuje do zlecenia. Alternatywnie zg\u0142aszasz si\u0119 zaraz po wygranej licytacji, wtedy od razu rejestrujemy auto w systemie.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ile trwa ca\u0142y proces od wygranej licytacji do dostawy pod dom w Polsce?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typowo 6-8 tygodni. Rozk\u0142ad: transport l\u0105dowy z placu Copart do portu w USA 3-10 dni, oczekiwanie na za\u0142adunek kontenera 1-2 tygodnie, fracht morski do Europy 3-5 tygodni, odprawa celna w porcie docelowym 2-5 dni, transport l\u0105dowy do klienta w Polsce 2-4 dni. Transport RoRo bywa o tydzie\u0144 szybszy ni\u017c kontener, ale nie jest dost\u0119pny dla aut z salvage title.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kto odpowiada za auto na ka\u017cdym etapie \u2014 Y7 czy DaytonaCargo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Y7 Logistics (licencjonowany broker FMCSA, MC #1741537) obs\u0142uguje etap ameryka\u0144ski: odbi\u00f3r z placu aukcyjnego, transport l\u0105dowy do portu w USA, przekazanie do terminala. Od momentu za\u0142adunku kontenera przejmuje obs\u0142ug\u0119 DaytonaCargo LLC (Dover, Delaware) \u2014 fracht morski, dokumenty eksportowe, odprawa celna w Europie, dostawa do Polski. Obie firmy s\u0105 ze sob\u0105 powi\u0105zane, wi\u0119c nie koordynujesz dw\u00f3ch oddzielnych um\u00f3w.',
      },
    },
    {
      '@type': 'Question',
      name: 'Jakie dokumenty musz\u0119 przygotowa\u0107 przed z\u0142o\u017ceniem zlecenia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Minimum: numer lotu z Copart lub IAAI (lub inny identyfikator pojazdu, je\u015bli auto jest od dealera), kopia title lub bill of sale po wygranej licytacji, dane kontaktowe odbiorcy w Polsce, adres dostawy. Do odprawy celnej w Polsce potrzebne b\u0119d\u0105 dodatkowo: dane kupuj\u0105cego, NIP firmy (je\u015bli zakup na firm\u0119), wskazanie portu docelowego. DaytonaCargo prowadzi klienta przez ca\u0142\u0105 dokumentacj\u0119 eksportow\u0105 i importow\u0105.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mieszkam w USA i potrzebuj\u0119 tylko transportu mi\u0119dzy stanami \u2014 te\u017c si\u0119 tym zajmujecie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. Y7 Logistics obs\u0142uguje Poloni\u0119 w USA w zakresie transportu l\u0105dowego po ca\u0142ych Stanach \u2014 z aukcji Copart i IAAI, mi\u0119dzy stanami, od dealer\u00f3w, na sprzeda\u017c prywatn\u0105. W tym przypadku nie anga\u017cujemy DaytonaCargo, bo auto zostaje w USA. Komunikacj\u0119 prowadzimy po angielsku lub rosyjsku przez Telegram; je\u015bli zale\u017cy Ci na obs\u0142udze po polsku, zarekomendujemy DaytonaCargo, kt\u00f3ra r\u00f3wnie\u017c operuje na rynku ameryka\u0144skim.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy mo\u017cna zam\u00f3wi\u0107 sam\u0105 cz\u0119\u015b\u0107 transportu \u2014 tylko odbi\u00f3r z Copart bez dalszej wysy\u0142ki?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. Y7 Logistics obs\u0142uguje r\u00f3wnie\u017c zlecenia obejmuj\u0105ce wy\u0142\u0105cznie transport l\u0105dowy w USA \u2014 z placu Copart do wskazanego punktu w Stanach (port, magazyn, inny spedytor, adres prywatny). To standardowe rozwi\u0105zanie dla klient\u00f3w, kt\u00f3rzy samodzielnie organizuj\u0105 fracht morski albo dla Polonii mieszkaj\u0105cej w USA.',
      },
    },
  ],
};

// Breadcrumb: Home -> Sprowadzanie aut -> Zam\u00f3w transport
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
      name: 'Zam\u00f3w transport',
      item: 'https://www.y7agency.com/pl/ship-my-car',
    },
  ],
};

// -- Data arrays --------------------------------------------------------------

const checklistItems = [
  'Numer lotu z Copart lub IAAI (albo identyfikator pojazdu od dealera)',
  'Kopia title lub bill of sale po wygranej licytacji',
  'Dane kontaktowe osoby odbieraj\u0105cej auto (imi\u0119, telefon, email)',
  'Dok\u0142adny adres dostawy \u2014 ulica, miasto, kod pocztowy',
  'Preferowany port docelowy: Gdynia, Bremerhaven lub Rotterdam (doradzamy)',
  'Informacja o stanie auta: je\u017adzi, nie je\u017adzi, brak kluczyk\u00f3w \u2014 wp\u0142ywa na koszt za\u0142adunku',
];

const orderingSteps = [
  {
    num: 1,
    title: 'Wst\u0119pne zapytanie i wycena',
    desc: 'Piszesz do nas przez Telegram lub email. Podajesz numer lotu z Copart/IAAI albo link do aukcji. W ci\u0105gu 1-2 godzin dostajesz realn\u0105 wycen\u0119 obejmuj\u0105c\u0105 transport l\u0105dowy w USA (Y7) oraz szacunkowy koszt frachtu i dostawy do Polski (DaytonaCargo). Wycena jest bezp\u0142atna i nie zobowi\u0105zuje do zlecenia.',
  },
  {
    num: 2,
    title: 'Potwierdzenie zlecenia po wygranej licytacji',
    desc: 'Po wygraniu licytacji przesy\u0142asz nam potwierdzenie z Copart lub IAAI. Rejestrujemy auto w systemie dispatch.y7agency.com i przypisujemy do transportu l\u0105dowego. Otrzymujesz dost\u0119p do portalu klienta, gdzie mo\u017cesz \u015bledzi\u0107 status na ka\u017cdym etapie.',
  },
  {
    num: 3,
    title: 'Odbi\u00f3r z placu aukcyjnego w USA',
    desc: 'Nasz przewo\u017anik zabiera auto z placu Copart w ci\u0105gu 3-10 dni od dyspozycji. Uwaga: Copart nalicza op\u0142aty za storage od 3. dnia po wygranej licytacji \u2014 szybkie potwierdzenie zlecenia oszcz\u0119dza 100-300 USD. Przewo\u017anik wykonuje dokumentacj\u0119 zdj\u0119ciow\u0105 przy za\u0142adunku.',
  },
  {
    num: 4,
    title: 'Transport do portu za\u0142adunku w USA',
    desc: 'Auto trafia do jednego z port\u00f3w: Newark (NJ), Baltimore (MD), Savannah (GA), Houston (TX) lub Los Angeles (CA). Wyb\u00f3r portu zale\u017cy od lokalizacji placu Copart i dost\u0119pno\u015bci slot\u00f3w kontenerowych. To moment, w kt\u00f3rym odpowiedzialno\u015b\u0107 przechodzi z Y7 Logistics na DaytonaCargo.',
  },
  {
    num: 5,
    title: 'Fracht morski do Europy',
    desc: 'DaytonaCargo \u0142aduje auto w kontener 40HC (standardowo 1-3 auta w kontenerze) albo na statek RoRo. Tranzyt oceaniczny trwa 3-5 tygodni. Na tym etapie otrzymujesz konosament (BOL) \u2014 dokument potwierdzaj\u0105cy za\u0142adunek i tytu\u0142 do odbioru w porcie docelowym.',
  },
  {
    num: 6,
    title: 'Odprawa celna i dostawa pod dom',
    desc: 'Po przybyciu do portu docelowego (Gdynia, Bremerhaven lub Rotterdam) DaytonaCargo prowadzi odpraw\u0119 celn\u0105. Klient otrzymuje rachunki za c\u0142o (10% warto\u015bci), VAT (23%) i akcyz\u0119 (3,1% do 2.0L, 18,7% powy\u017cej). Po op\u0142aceniu nale\u017cno\u015bci auto jest transportowane lawet\u0105 pod wskazany adres w Polsce.',
  },
];

// Diaspora section — use cases for Polonia in USA
const diasporaUseCases = [
  {
    title: 'Odbi\u00f3r z Copart lub IAAI pod dom',
    desc: 'Kupujesz auto na aukcji w innym stanie i potrzebujesz dostawy pod dom w USA. Y7 obs\u0142uguje wszystkie 50 stan\u00f3w \u2014 typowa trasa mi\u0119dzystanowa (np. Kalifornia \u2192 Illinois) to 5-8 dni i $900-1 400 dla sedana.',
  },
  {
    title: 'Transport mi\u0119dzy stanami \u2014 przeprowadzka',
    desc: 'Przeprowadzasz si\u0119 z Chicago do Florydy i nie chcesz jecha\u0107 trzy dni za k\u00f3\u0142kiem. Zabieramy auto sprzed domu i dostarczamy pod nowy adres. Opcja enclosed (laweta kryta) dost\u0119pna dla aut kolekcjonerskich i nowych.',
  },
  {
    title: 'Sprzeda\u017c prywatna \u2014 dostawa do kupuj\u0105cego',
    desc: 'Sprzedajesz auto na Facebook Marketplace albo Cars.com komu\u015b z drugiego ko\u0144ca kraju. Organizujemy odbi\u00f3r i dostaw\u0119 \u2014 Ty wystawiasz faktur\u0119 przewozow\u0105, my koordynujemy kierowc\u0119.',
  },
  {
    title: 'Dostawa do portu w USA \u2014 w\u0142asna wysy\u0142ka do Europy',
    desc: 'Planujesz wys\u0142a\u0107 auto rodzinie w Polsce, ale wsp\u00f3\u0142pracujesz ju\u017c z innym spedytorem morskim. Dostarczamy auto do wskazanego portu (Newark, Baltimore, Savannah, Houston, LA) \u2014 Ty przejmujesz od momentu przekazania do terminala.',
  },
];

// =============================================================================
// Component
// =============================================================================

function PolandShipMyCar() {
  return (
    <div style={pageStyle} lang="pl">
      {/* -- Head ----------------------------------------------------------- */}
      <Helmet>
        <title>Zam\u00f3w transport auta z USA \u2014 dla Polski i Polonii w USA | Y7 Logistics</title>
        <meta
          name="description"
          content="Zam\u00f3w transport auta z aukcji Copart lub IAAI. Y7 Logistics (broker FMCSA MC #1741537) obs\u0142uguje transport l\u0105dowy w USA. Dla importu do Polski \u2014 siostrzana firma DaytonaCargo. Wycena w 1 godzin\u0119."
        />
        <meta
          name="keywords"
          content="zam\u00f3w transport auta z USA, sprowadzenie auta z Copart, transport samochodu USA Polska, transport aut mi\u0119dzy stanami, Polonia USA transport, Y7 Logistics, DaytonaCargo"
        />
        <link rel="canonical" href="https://www.y7agency.com/pl/ship-my-car" />
        <meta property="og:title" content="Zam\u00f3w transport auta z USA \u2014 Y7 \u00d7 DaytonaCargo" />
        <meta
          property="og:description"
          content="Licencjonowany broker FMCSA (MC #1741537). Obs\u0142ugujemy import do Polski oraz transport w USA dla Polonii. Bez ukrytych op\u0142at."
        />
        <meta property="og:url" content="https://www.y7agency.com/pl/ship-my-car" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.y7agency.com/og/ship-my-car-pl.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zam\u00f3w transport auta z USA" />
        <meta
          name="twitter:description"
          content="Y7 \u00d7 DaytonaCargo: od placu Copart do drzwi w Polsce. Dla Polonii w USA \u2014 transport mi\u0119dzy stanami. Wycena w 1 godzin\u0119."
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
      <section style={{ ...sectionStyle, paddingTop: 'clamp(3rem, 8vw, 6rem)' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '0.375rem 0.875rem',
            background: '#fff',
            border: '1px solid #E8E4DC',
            borderRadius: '999px',
            fontSize: '0.8rem',
            color: accentColor,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Zam\u00f3wienie transportu
        </div>
        <h1 style={h1Style}>
          Zam\u00f3w transport auta z USA \u2014 prosto, bez ukrytych op\u0142at
        </h1>
        <p style={{ ...pStyle, marginTop: '1.5rem', maxWidth: '720px' }}>
          Wygra\u0142e\u015b licytacj\u0119 na Copart albo IAAI? A mo\u017ce dopiero planujesz zakup
          i chcesz wiedzie\u0107, ile realnie kosztuje ca\u0142a droga od placu aukcyjnego
          w Stanach pod dom w Polsce? A mo\u017ce mieszkasz w USA i potrzebujesz
          jedynie transportu mi\u0119dzy stanami? Trafi\u0142e\u015b w dobre miejsce. Y7
          Logistics to licencjonowany broker FMCSA (MC #1741537) obs\u0142uguj\u0105cy
          transport l\u0105dowy na terenie ca\u0142ych Stan\u00f3w Zjednoczonych. Dla klient\u00f3w,
          kt\u00f3rzy sprowadzaj\u0105 auta do Polski, dalsz\u0105 cz\u0119\u015b\u0107 obs\u0142ugi \u2014 fracht
          morski, dokumentacj\u0119 eksportow\u0105, odpraw\u0119 celn\u0105 i dostaw\u0119 pod Tw\u00f3j
          adres \u2014 prowadzi nasza siostrzana firma DaytonaCargo LLC z siedzib\u0105
          w Dover, Delaware. Ta strona opisuje oba scenariusze: na g\u00f3rze pe\u0142na
          obs\u0142uga z importem do Polski, ni\u017cej \u2014 zakres dla Polonii mieszkaj\u0105cej
          w Stanach.
        </p>
      </section>

      {/* ================================================================== */}
      {/* SECTION 2 — Checklist                                              */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Co przygotowa\u0107 przed z\u0142o\u017ceniem zlecenia</h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          Im wcze\u015bniej skompletujesz te informacje, tym szybciej dostaniesz
          wi\u0105\u017c\u0105c\u0105 wycen\u0119 i kr\u00f3tszy czas oczekiwania na odbi\u00f3r z placu Copart.
          Bez owijania w bawe\u0142n\u0119 \u2014 to minimum, bez kt\u00f3rego nie ruszamy
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
            <div key={idx} style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span
                  style={{
                    color: accentColor,
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    lineHeight: '1',
                    flexShrink: 0,
                  }}
                >
                  &#10003;
                </span>
                <span style={pStyle}>{item}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 3 — Ordering workflow (6 steps) — Poland import            */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Jak wygl\u0105da proces importu do Polski \u2014 krok po kroku</h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          Ca\u0142y proces \u2014 od pierwszego zapytania do dostawy pod dom w Polsce \u2014
          zajmuje typowo 6-8 tygodni. Poni\u017cej pokazujemy, co dzieje si\u0119 na
          ka\u017cdym etapie i kto za co odpowiada. Warto zauwa\u017cy\u0107, \u017ce
          odpowiedzialno\u015b\u0107 przechodzi z Y7 na DaytonaCargo w momencie za\u0142adunku
          kontenera w porcie USA \u2014 ale dla Ciebie to jedna ci\u0105g\u0142a obs\u0142uga.
        </p>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {orderingSteps.map((step) => (
            <div
              key={step.num}
              style={{ ...cardStyle, display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: accentColor,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                  flexShrink: 0,
                }}
              >
                {step.num}
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {step.title}
                </h3>
                <p style={{ ...pStyle, margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 4 — Pricing overview (Poland import)                        */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Orientacyjne koszty transportu do Polski</h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          Poni\u017cej typowe zakresy cen dla standardowego auta osobowego (sedan,
          SUV, crossover do 2.5 tony). Wi\u0105\u017c\u0105c\u0105 wycen\u0119 dostaniesz po przes\u0142aniu
          numeru lotu \u2014 ka\u017cde auto wyceniamy indywidualnie, bo r\u00f3\u017cnice mi\u0119dzy
          placami Copart i portami za\u0142adunku potrafi\u0105 si\u0119ga\u0107 kilkuset dolar\u00f3w.
          Ceny nie obejmuj\u0105 c\u0142a, VAT-u i akcyzy p\u0142aconych w Polsce.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          <div style={cardStyle}>
            <h3
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '0.95rem',
                marginBottom: '0.75rem',
                color: '#4A4A46',
              }}
            >
              Transport l\u0105dowy w USA (Y7)
            </h3>
            <div
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 300,
                color: accentColor,
                marginBottom: '0.5rem',
              }}
            >
              $350\u2013950
            </div>
            <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
              Odbi\u00f3r z placu Copart/IAAI i dostawa do portu za\u0142adunku.
              Cena zale\u017cy od dystansu, stanu auta (je\u017adzi/nie je\u017adzi) i pory roku.
            </p>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '0.95rem',
                marginBottom: '0.75rem',
                color: '#4A4A46',
              }}
            >
              Fracht morski (DaytonaCargo)
            </h3>
            <div
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 300,
                color: accentColor,
                marginBottom: '0.5rem',
              }}
            >
              $1 150\u20132 250
            </div>
            <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
              Kontener 40HC wsp\u00f3\u0142dzielony (1/3 do 1/2 kontenera) lub RoRo.
              Zale\u017cy od portu za\u0142adunku w USA i portu docelowego w Europie.
            </p>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '0.95rem',
                marginBottom: '0.75rem',
                color: '#4A4A46',
              }}
            >
              Odprawa + dostawa w Polsce
            </h3>
            <div
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 300,
                color: accentColor,
                marginBottom: '0.5rem',
              }}
            >
              4 000\u20138 000 z\u0142
            </div>
            <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
              Agencja celna, roz\u0142adunek w porcie, transport lawet\u0105 pod wskazany
              adres. Nie obejmuje c\u0142a (10%), VAT-u (23%) ani akcyzy (3,1% lub 18,7%).
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 5 — Trust signals                                          */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <div style={{ ...cardStyle, borderLeft: `4px solid ${accentColor}` }}>
          <h2 style={{ ...h2Style, fontSize: '1.5rem' }}>
            Dlaczego warto zaufa\u0107 Y7 \u00d7 DaytonaCargo
          </h2>
          <p style={{ ...pStyle, marginBottom: '1rem' }}>
            Y7 Logistics dzia\u0142a jako licencjonowany broker FMCSA \u2014 podlegamy
            federalnemu nadzorowi ameryka\u0144skiego Departamentu Transportu, mamy
            obowi\u0105zkowe ubezpieczenie odpowiedzialno\u015bci cywilnej oraz pe\u0142n\u0105
            rejestracj\u0119 w rejestrze publicznym FMCSA. Ka\u017cdy mo\u017ce zweryfikowa\u0107
            nasz status przez wyszukiwark\u0119 SAFER (safer.fmcsa.dot.gov) wpisuj\u0105c
            numer MC #1741537.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem' }}>
            <div>
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                Licencja brokerska
              </span>
              <span style={pStyle}>MC#1741537</span>
            </div>

            <div>
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                Status FMCSA
              </span>
              <span style={pStyle}>Aktywny, ubezpieczony</span>
            </div>

            <div>
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                Siostrzana firma
              </span>
              <span style={pStyle}>DaytonaCargo</span>
            </div>
          </div>

          <p style={{ ...pStyle, marginTop: '1rem' }}>
            DaytonaCargo LLC (Dover, Delaware) specjalizuje si\u0119 w eksporcie aut
            z Ameryki P\u00f3\u0142nocnej do Europy. Nasze firmy tworz\u0105 jedn\u0105 kompleksow\u0105
            obs\u0142ug\u0119 rozdzielon\u0105 na dwa podmioty prawne \u2014 jeden optymalizowany
            pod ameryka\u0144skie regulacje FMCSA, drugi pod mi\u0119dzynarodowy transport
            morski i odpraw\u0119 celn\u0105 w UE.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 6 — Contact (shared)                                        */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Skontaktuj si\u0119 z nami</h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          Najszybsza odpowied\u017a \u2014 przez Telegram. Standardowo odpisujemy
          w ci\u0105gu 1 godziny w godzinach pracy (9:00-18:00 czasu wschodniego
          USA, czyli 15:00-00:00 czasu polskiego). Komunikacja po angielsku
          lub rosyjsku. Dla obs\u0142ugi w j\u0119zyku polskim zarekomendujemy
          DaytonaCargo \u2014 nasza siostrzana firma prowadzi pe\u0142n\u0105 obs\u0142ug\u0119 po polsku.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          <div style={cardStyle}>
            <p style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600, marginBottom: '0.5rem' }}>
              Telegram (EN/RU)
            </p>
            <a
              href="https://t.me/y7dispatch_bot"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: accentColor, textDecoration: 'underline' }}
            >
              @y7dispatch_bot
            </a>
          </div>

          <div style={cardStyle}>
            <p style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600, marginBottom: '0.5rem' }}>
              Email
            </p>
            <a
              href="mailto:info@y7agency.com"
              style={{ color: accentColor, textDecoration: 'underline' }}
            >
              info@y7agency.com
            </a>
          </div>

          <div style={cardStyle}>
            <p style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600, marginBottom: '0.5rem' }}>
              DaytonaCargo (PL)
            </p>
            <a
              href="https://daytonacargo.com/pl"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: accentColor, textDecoration: 'underline' }}
            >
              daytonacargo.com/pl
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 7 — DLA POLONII W USA (diaspora split)                     */}
      {/* ================================================================== */}
      <section style={dividerSectionStyle}>
        <div style={sectionStyle}>
          <div
            style={{
              display: 'inline-block',
              padding: '0.375rem 0.875rem',
              background: '#fff',
              border: '1px solid #E8E4DC',
              borderRadius: '999px',
              fontSize: '0.8rem',
              color: accentColor,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Dla Polonii w USA
          </div>
          <h2 style={h2Style}>Mieszkasz w Stanach? Transport w USA bez wysy\u0142ki do Polski</h2>
          <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
            Je\u015bli mieszkasz w USA i potrzebujesz jedynie przewiezienia auta
            mi\u0119dzy stanami, odbioru z Copart pod dom albo dostawy do portu \u2014
            Y7 obs\u0142uguje ten zakres w pe\u0142ni samodzielnie, bez anga\u017cowania
            DaytonaCargo. Jeste\u015bmy licencjonowanym brokerem FMCSA (MC #1741537)
            z dost\u0119pem do sieci zweryfikowanych przewo\u017anik\u00f3w na terenie
            wszystkich 50 stan\u00f3w.
          </p>
          <p style={{ ...pStyle, marginBottom: '2rem' }}>
            <strong>Uczciwie m\u00f3wi\u0105c:</strong> nasz zesp\u00f3\u0142 w Y7 nie prowadzi
            obs\u0142ugi w j\u0119zyku polskim \u2014 komunikacj\u0119 prowadzimy po angielsku lub
            rosyjsku przez Telegram. Je\u015bli zale\u017cy Ci na pe\u0142nej obs\u0142udze po
            polsku, r\u00f3wnie\u017c w USA, warto napisa\u0107 do DaytonaCargo, kt\u00f3ra obs\u0142uguje
            polskoj\u0119zycznych klient\u00f3w na rynku ameryka\u0144skim.
          </p>

          <h3
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '1.125rem',
              fontWeight: 600,
              marginBottom: '1rem',
              marginTop: '2rem',
            }}
          >
            Typowe zlecenia od Polonii mieszkaj\u0105cej w USA
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
              <div key={idx} style={cardStyle}>
                <h4
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginTop: 0,
                    marginBottom: '0.5rem',
                    color: '#2C2C2A',
                  }}
                >
                  {uc.title}
                </h4>
                <p style={{ ...pStyle, fontSize: '0.95rem', margin: 0 }}>{uc.desc}</p>
              </div>
            ))}
          </div>

          <h3
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '1.125rem',
              fontWeight: 600,
              marginBottom: '1rem',
              marginTop: '2rem',
            }}
          >
            Orientacyjne ceny transportu mi\u0119dzy stanami
          </h3>
          <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
            Ceny dla standardowego sedana lub crossovera na lawecie otwartej.
            Auta enclosed (kryte), ci\u0119\u017car\u00f3wki pickup i auta niej\u0119\u017cd\u017c\u0105ce
            wyceniamy indywidualnie \u2014 dop\u0142ata typowo 30-60%.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            <div style={cardStyle}>
              <h4
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  marginTop: 0,
                  marginBottom: '0.75rem',
                  color: '#4A4A46',
                }}
              >
                Kr\u00f3tki dystans (do 500 mil)
              </h4>
              <div
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 300,
                  color: accentColor,
                  marginBottom: '0.5rem',
                }}
              >
                $450\u2013750
              </div>
              <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
                Np. NY \u2192 Chicago, LA \u2192 San Francisco, Miami \u2192 Atlanta.
                Czas dostawy 3-5 dni.
              </p>
            </div>

            <div style={cardStyle}>
              <h4
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  marginTop: 0,
                  marginBottom: '0.75rem',
                  color: '#4A4A46',
                }}
              >
                \u015aredni dystans (500-1500 mil)
              </h4>
              <div
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 300,
                  color: accentColor,
                  marginBottom: '0.5rem',
                }}
              >
                $750\u20131 200
              </div>
              <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
                Np. Chicago \u2192 Miami, NY \u2192 Dallas, Denver \u2192 Seattle.
                Czas dostawy 5-8 dni.
              </p>
            </div>

            <div style={cardStyle}>
              <h4
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  marginTop: 0,
                  marginBottom: '0.75rem',
                  color: '#4A4A46',
                }}
              >
                Przez ca\u0142y kraj (1500+ mil)
              </h4>
              <div
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 300,
                  color: accentColor,
                  marginBottom: '0.5rem',
                }}
              >
                $1 100\u20131 600
              </div>
              <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
                Np. Kalifornia \u2192 New York, Florida \u2192 Washington.
                Czas dostawy 7-10 dni.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 8 — FAQ                                                    */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Najcz\u0119\u015bciej zadawane pytania</h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          Zebrali\u015bmy pytania, kt\u00f3re najcz\u0119\u015bciej dostajemy od klient\u00f3w \u2014 zar\u00f3wno
          importuj\u0105cych auta do Polski, jak i Polonii w USA. Je\u015bli nie znajdziesz
          tu odpowiedzi, napisz do nas na Telegramie, odpiszemy bez szablon\u00f3w.
        </p>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {faqSchema.mainEntity.map((faq, idx) => (
            <details key={idx} style={{ ...cardStyle, cursor: 'pointer' }}>
              <summary
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {faq.name}
                <span
                  style={{
                    color: accentColor,
                    fontSize: '1.25rem',
                    marginLeft: '1rem',
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </summary>
              <p style={{ ...pStyle, marginTop: '1rem' }}>{faq.acceptedAnswer.text}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 9 — Dark CTA                                               */}
      {/* ================================================================== */}
      <section style={{ ...darkCtaStyle, padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2rem)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ ...h2Style, color: '#F7F5F0' }}>Gotowy do zam\u00f3wienia transportu?</h2>
          <p
            style={{
              ...pStyle,
              color: '#C5C0B8',
              maxWidth: '600px',
              margin: '0 auto 2rem',
            }}
          >
            Wy\u015blij numer lotu z Copart lub IAAI przez Telegram \u2014 dostaniesz
            realn\u0105 wycen\u0119 w ci\u0105gu 1 godziny. Wycena jest bezp\u0142atna i nie
            zobowi\u0105zuje Ci\u0119 do zlecenia.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            <a
              href="https://t.me/y7dispatch_bot"
              target="_blank"
              rel="noopener noreferrer"
              style={ctaButtonStyle}
            >
              Napisz na Telegram
            </a>
            <Link
              to="/pl"
              style={{
                ...ctaButtonStyle,
                background: 'transparent',
                border: '1px solid #F7F5F0',
                color: '#F7F5F0',
              }}
            >
              Wr\u00f3\u0107 do przewodnika
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PolandShipMyCar;
