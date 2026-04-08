// PolandCopart.jsx
// Route: /pl/copart-shipping
// Audience: Poland-based buyers importing cars from Copart auctions
// High-intent keyword: "copart sprowadzenie auta", "auto z copart do polski"
// Word count: ~2000 words native Polish
// Sources: americars.com.pl, motopodprad.pl, cars-world.pl, petrolboys.pl, transfergo.pl

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';
import { colors, fonts } from '../../theme';

const PolandCopart = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Czy mogę samodzielnie licytować na Copart bez pośrednika?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Technicznie tak, po wykupieniu członkostwa Basic (200 USD) lub Premier (600 USD). Ale bez licencji dealerskiej masz ograniczenia: nie widzisz wszystkich lotów, nie możesz licytować na auta oznaczone jako 'Dealer Only', a buyer fees są wyższe. W praktyce 95% polskich klientów korzysta z brokera z licencją — to znacząco obniża finalny koszt i otwiera dostęp do pełnej oferty."
        }
      },
      {
        "@type": "Question",
        "name": "Co oznaczają tytuły Salvage, Clean i Rebuilt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Clean title — auto bez historii szkody całkowitej, zazwyczaj pochodzi od leasingu, dealera lub prywatnego sprzedawcy. Salvage title — pojazd uznany przez ubezpieczyciela za szkodę całkowitą (total loss), najczęściej po wypadku, kradzieży, powodzi lub gradzie. Rebuilt title — auto wcześniej salvage, które zostało naprawione i ponownie zarejestrowane w USA. W Polsce wszystkie trzy typy podlegają tym samym procedurom rejestracyjnym po sprowadzeniu — różnica leży głównie w historii i koszcie napraw."
        }
      },
      {
        "@type": "Question",
        "name": "Ile realnie zapłacę za auto wylicytowane za 10 000 USD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Realnie około 45 000-55 000 zł łącznie, w zależności od silnika. Kalkulacja: 10 000 USD cena aukcji + 1 200 USD buyer fees Copart = 11 200 USD. Transport lądowy w USA: 300-500 USD. Fracht morski (kontener shared): 1 500 USD. Cło 10% od CIF: ~1 300 USD. VAT 23%: ~3 300 USD. Akcyza 3,1% (silnik do 2.0L) lub 18,7% (większy): 500-3 000 USD. Po przeliczeniu na złote: 45 000-55 000 zł. Dla silników powyżej 2.0L dodaj kolejne 10 000-15 000 zł akcyzy."
        }
      },
      {
        "@type": "Question",
        "name": "Jak długo mam czas na odbiór auta z placu Copart po wygranej?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Copart daje 3 dni bezpłatnego przechowania po wygranej licytacji i zaksięgowaniu płatności. Po tym terminie naliczane są opłaty storage — zazwyczaj 20-40 USD dziennie, zależnie od lokalizacji placu. Nieodebrane auto po 30 dniach może wrócić na aukcję. Y7 Logistics odbiera auta z placów Copart w ciągu 1-5 dni od zapłaty, co w praktyce eliminuje ryzyko storage fees."
        }
      },
      {
        "@type": "Question",
        "name": "Czy Y7 Logistics licytuje w moim imieniu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Y7 Logistics to licencjonowany broker FMCSA, ale specjalizujemy się w TRANSPORCIE w USA, nie w licytacjach. Licytowaniem i zakupem na Copart/IAAI zajmuje się nasza siostrzana firma DaytonaCargo LLC, która ma pełną licencję dealerską w USA i dostęp do wszystkich aukcji. W typowym scenariuszu: DaytonaCargo licytuje i kupuje, Y7 odbiera z placu i transportuje do portu, DaytonaCargo organizuje fracht i dostawę do Polski. Dla klienta to jeden kontakt i jedna usługa."
        }
      },
      {
        "@type": "Question",
        "name": "Na co uważać przy ocenie aut z Copart przed licytacją?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kluczowe: (1) Sprawdź raport Carfax lub AutoCheck — historia właścicieli, wypadków, przebiegu. (2) Obejrzyj wszystkie zdjęcia lotu, szczególnie zbliżenia uszkodzeń. (3) Status 'Run & Drive' nie gwarantuje stanu silnika — to tylko info, że auto odpaliło przy odbiorze na placu. (4) Primary Damage (główne uszkodzenie) pokazuje tylko część problemu — często są wtórne szkody nieujęte w opisie. (5) Uwaga na flood damage (powódź) — woda niszczy elektronikę, a efekty pojawiają się miesiącami później. (6) Sekcja Starts to jedno zdanie — nie mylić z gwarancją technicznej sprawności."
        }
      },
      {
        "@type": "Question",
        "name": "Czy mogę odebrać auto osobiście z portu w Gdyni?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tak, odbiór własny z portu obniża koszt o 800-1500 zł za transport lawetą do miejsca docelowego. Warunki: musisz mieć komplet dokumentów (konosament, title, faktury celne), opłacone cło i VAT, oraz własny transport do przewiezienia auta lub gotowość prowadzenia niezarejestrowanego pojazdu do miejsca tymczasowej rejestracji. Większość klientów wybiera dostawę pod dom dla wygody — koordynuje to DaytonaCargo w ramach usługi 'pojazd pod dom'."
        }
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Copart Car Import Service",
    "provider": {
      "@type": "Organization",
      "name": "Y7 Logistics",
      "url": "https://www.y7agency.com",
      "identifier": {
        "@type": "PropertyValue",
        "propertyID": "FMCSA MC",
        "value": "1741537"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "description": "Odbiór aut wylicytowanych na Copart i transport do portu załadunku w USA. Współpraca z DaytonaCargo dla dalszej obsługi międzynarodowej do Polski."
  };

  return (
    <>
      <Helmet>
        <title>Sprowadzanie aut z Copart do Polski — przewodnik 2026 | Y7 & DaytonaCargo</title>
        <meta 
          name="description" 
          content="Kompleksowy przewodnik po sprowadzaniu aut z aukcji Copart do Polski. Realne koszty, terminy, pułapki. Y7 Logistics obsługuje transport w USA, DaytonaCargo zajmuje się frachtem i dostawą do Polski." 
        />
        <meta property="og:title" content="Sprowadzanie aut z Copart do Polski — przewodnik 2026" />
        <meta property="og:description" content="Co naprawdę kosztuje sprowadzenie auta z Copart, ile to trwa i na co uważać. Bez marketingowych obietnic." />
        <meta property="og:locale" content="pl_PL" />
        <html lang="pl" />
        <link rel="canonical" href="https://www.y7agency.com/pl/copart-shipping" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <HreflangTags 
        currentPath="/copart-shipping"
        hasPolishVersion={true}
        hasUkrainianVersion={true}
        hasRussianVersion={true}
      />

      <main style={{
        fontFamily: fonts.serif,
        color: colors.text,
        background: colors.bg,
        minHeight: '100vh',
      }}>
        {/* Breadcrumb */}
        <nav style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '1.5rem clamp(1.25rem, 4vw, 2rem) 0',
          fontSize: '0.875rem',
          color: '#6B6B65',
          fontFamily: fonts.sans,
        }}>
          <Link to="/pl" style={{ color: '#6B6B65', textDecoration: 'none' }}>
            Sprowadzanie aut z USA
          </Link>
          {' → '}
          <span>Copart</span>
        </nav>

        {/* Hero */}
        <section style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2rem) clamp(2rem, 5vw, 3rem)',
        }}>
          <div style={{ 
            fontSize: '14px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: colors.accent,
            marginBottom: '1rem',
            fontFamily: fonts.sans
          }}>
            Copart × Polska
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: '1.15',
            fontWeight: 400,
            marginTop: 0,
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}>
            Sprowadzanie aut z Copart do Polski — przewodnik bez marketingowego lukru
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.0625rem, 2vw, 1.1875rem)',
            lineHeight: '1.65',
            color: '#4A4A46',
            marginBottom: '1.5rem',
          }}>
            Copart to największa platforma aukcyjna aut powypadkowych na świecie — codziennie 
            wystawia ponad 175 000 pojazdów na ponad 260 placach w USA i Kanadzie. 
            Dla polskich importerów oznacza to potencjalnie niższe ceny o 30-50% w stosunku 
            do rynku krajowego. Ale droga "od młotka do garażu" ma więcej etapów i pułapek, 
            niż sugeruje marketing firm importowych.
          </p>

          <p style={{
            fontSize: '1.0625rem',
            lineHeight: '1.65',
            color: '#4A4A46',
            marginBottom: '2rem',
          }}>
            Ten przewodnik pokazuje realny proces: ile to kosztuje, ile trwa, czego unikać. 
            Y7 Logistics obsługuje amerykańską część łańcucha — odbiór z placów Copart 
            i transport do portu załadunku. Dalszą obsługę (fracht, odprawa, dostawa 
            do Polski) prowadzi nasza siostrzana firma DaytonaCargo LLC.
          </p>
        </section>

        {/* What Copart really is */}
        <section style={{
          background: '#fff',
          borderTop: `1px solid ${colors.border}`,
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 2rem)',
          }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              fontWeight: 400,
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}>
              Czym tak naprawdę jest Copart
            </h2>
            <p style={{ 
              fontSize: '1.0625rem', 
              lineHeight: '1.7', 
              color: '#4A4A46',
              marginBottom: '1.5rem'
            }}>
              Copart (Copart Inc., założony 1982 w Kalifornii) to platforma łącząca 
              ubezpieczycieli, dealerów i banki z kupującymi na całym świecie. 
              Skala: ponad 175 tysięcy aut dziennie, ponad milion sprzedaży rocznie, 
              siedziba w Dallas, Teksas. W przeciwieństwie do tradycyjnych domów aukcyjnych 
              Copart działa wyłącznie online — wszystkie licytacje odbywają się 
              przez internet w systemie VB3 (Virtual Bidding 3.0).
            </p>

            <p style={{ 
              fontSize: '1.0625rem', 
              lineHeight: '1.7', 
              color: '#4A4A46',
              marginBottom: '1.5rem'
            }}>
              Większość aut na Copart pochodzi od ubezpieczycieli — są to pojazdy 
              uznane za szkodę całkowitą (total loss) po kolizjach, kradzieżach, 
              powodziach, gradobiciach. Co ważne: "szkoda całkowita" w USA nie zawsze 
              oznacza zniszczenie. Amerykańskie zasady wymagają uznania auta za 
              total loss, gdy koszt naprawy przekracza ~70-80% wartości rynkowej — 
              to oznacza, że wiele lekko uszkodzonych aut trafia na Copart tylko dlatego, 
              że cena części w USA jest wysoka, a wartość rynkowa niższa niż w Europie.
            </p>

            <p style={{ 
              fontSize: '1.0625rem', 
              lineHeight: '1.7', 
              color: '#4A4A46',
              marginBottom: 0
            }}>
              Dla polskiego importera to szansa: auto powypadkowe w USA za 10 000 USD 
              może po naprawie i sprowadzeniu być warte 90 000 zł na polskim rynku. 
              Ale ta sama zasada działa w drugą stronę — niedoświadczony kupiec może 
              wylicytować auto z ukrytymi wadami, których koszt naprawy zjada całą 
              potencjalną oszczędność.
            </p>
          </div>
        </section>

        {/* Copart vs IAAI */}
        <section style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 2rem)',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 400,
            marginBottom: '1rem',
            letterSpacing: '-0.01em',
          }}>
            Copart czy IAAI — różnica dla polskiego importera
          </h2>
          <p style={{ 
            fontSize: '1.0625rem', 
            lineHeight: '1.7', 
            color: '#4A4A46',
            marginBottom: '2rem'
          }}>
            Copart to jeden z dwóch graczy na amerykańskim rynku aukcji aut powypadkowych. 
            Drugi to IAAI (Insurance Auto Auctions). Oba mają polskich klientów, ale różnią 
            się wolumenem, regulacjami i dostępnością dla kupujących spoza USA.
          </p>

          <div style={{
            background: '#fff',
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            marginBottom: '2rem',
            fontSize: '0.9375rem',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: colors.bg }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: `1px solid ${colors.border}`, fontWeight: 500 }}></th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: `1px solid ${colors.border}`, fontWeight: 500 }}>Copart</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: `1px solid ${colors.border}`, fontWeight: 500 }}>IAAI</th>
                </tr>
              </thead>
              <tbody style={{ fontFamily: fonts.sans, color: '#4A4A46' }}>
                {[
                  ['Wolumen dzienny', '~175 000 lotów', '~50 000 lotów'],
                  ['Placów w USA', 'Ponad 260', 'Ponad 200'],
                  ['Dostęp bez licencji', 'Basic/Premier member', 'Utrudniony, często broker konieczny'],
                  ['Typ licytacji', 'VB3 — licytacja na żywo', 'Pre-bid + live auction'],
                  ['Źródło aut', 'Ubezpieczyciele, dealerzy, osoby prywatne', 'Głównie ubezpieczyciele'],
                  ['Typy tytułów', 'Salvage, Clean, Rebuilt', 'Głównie Salvage'],
                  ['Interfejs', 'Bardziej techniczny', 'Prostszy w obsłudze'],
                  ['Narzędzia oceny', 'Standardowe zdjęcia', 'Key Images, Engine Start Video'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < 7 ? `1px solid ${colors.border}` : 'none' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: colors.text }}>{row[0]}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{row[1]}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ 
            fontSize: '1rem', 
            lineHeight: '1.65', 
            color: '#4A4A46',
            marginBottom: '1rem'
          }}>
            <strong style={{ color: colors.text }}>Kiedy Copart:</strong> gdy szukasz maksymalnie 
            szerokiej oferty, chcesz mieć dostęp do klasyków lub nietypowych modeli, cenisz 
            dynamiczną licytację i masz doświadczenie z amerykańskimi platformami.
          </p>
          <p style={{ 
            fontSize: '1rem', 
            lineHeight: '1.65', 
            color: '#4A4A46',
            margin: 0
          }}>
            <strong style={{ color: colors.text }}>Kiedy IAAI:</strong> gdy priorytetem jest 
            pewne źródło pochodzenia (głównie ubezpieczyciele), cenisz dodatkowe narzędzia 
            oceny stanu technicznego i zaczynasz przygodę z importem — interfejs jest bardziej 
            przejrzysty.
          </p>
        </section>

        {/* Opłaty Copart */}
        <section style={{
          background: '#fff',
          borderTop: `1px solid ${colors.border}`,
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 2rem)',
          }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              fontWeight: 400,
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}>
              Opłaty Copart — czego nie pokazuje cena wyświetlana na licytacji
            </h2>
            <p style={{ 
              fontSize: '1.0625rem', 
              lineHeight: '1.7', 
              color: '#4A4A46',
              marginBottom: '2rem'
            }}>
              Największy szok dla początkujących importerów to różnica między ceną 
              wylicytowaną a kwotą na fakturze. Copart pobiera serię opłat, które trzeba 
              doliczyć do każdej stawki. Dla auta wylicytowanego za 5 000 USD realny koszt 
              wyjścia z placu Copart wynosi 6 500-7 000 USD.
            </p>

            <div style={{
              background: colors.bg,
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 500, 
                marginTop: 0,
                marginBottom: '1rem',
                fontFamily: fonts.sans
              }}>
                Typowy rachunek Copart (auto za 10 000 USD)
              </h3>
              <div style={{ 
                fontSize: '0.9375rem',
                fontFamily: fonts.sans,
                color: '#4A4A46',
                lineHeight: '1.7'
              }}>
                {[
                  ['Cena wylicytowana (Sale Price)', '10 000 USD'],
                  ['Buyer Fee (główna opłata aukcji)', '900-1 200 USD'],
                  ['Virtual Bid Fee (opłata licytacji online)', '79 USD'],
                  ['Gate Fee (opłata za wydanie)', '59 USD'],
                  ['Environmental Fee', '15 USD'],
                  ['Membership (roczna, jeśli własne konto)', '200 USD (Basic) lub 600 USD (Premier)'],
                ].map((row, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0',
                    borderBottom: i < 5 ? `1px solid ${colors.border}` : 'none'
                  }}>
                    <span>{row[0]}</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{row[1]}</span>
                  </div>
                ))}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0 0 0',
                  fontWeight: 500,
                  color: colors.text
                }}>
                  <span>Realny koszt wyjścia z placu</span>
                  <span>11 250-12 550 USD</span>
                </div>
              </div>
            </div>

            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.65', 
              color: '#4A4A46',
              marginBottom: '1rem'
            }}>
              Dodatkowo: <strong>storage fee</strong> — jeśli nie odbierzesz auta w ciągu 3 dni 
              od płatności, Copart nalicza 20-40 USD dziennie. <strong>Late Payment Fee</strong> — 
              50 USD za każdy dzień opóźnienia przelewu. <strong>Wash Fee</strong> — opcjonalna 
              opłata 25-50 USD za mycie przed odbiorem (zwykle pomijana przy salvage).
            </p>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.65', 
              color: '#4A4A46',
              margin: 0
            }}>
              <strong style={{ color: colors.text }}>Dlaczego broker obniża koszty:</strong> licencjonowany 
              dealer ma dostęp do niższych buyer fees (tzw. dealer rates), nie płaci rocznego 
              membership i może łączyć zakupy kilku klientów w jeden transport — co obniża 
              koszt na jedno auto. W praktyce ta oszczędność często pokrywa koszt prowizji brokera.
            </p>
          </div>
        </section>

        {/* Transport do portu */}
        <section style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 2rem)',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 400,
            marginBottom: '1rem',
            letterSpacing: '-0.01em',
          }}>
            Transport z placu Copart do portu — rola Y7 Logistics
          </h2>
          <p style={{ 
            fontSize: '1.0625rem', 
            lineHeight: '1.7', 
            color: '#4A4A46',
            marginBottom: '1.5rem'
          }}>
            Po zapłacie i otrzymaniu dokumentu wydania (gate pass) auto musi opuścić 
            plac Copart w ciągu 3 dni bezpłatnego przechowania. To pierwszy moment, 
            w którym wchodzi Y7 Logistics — jako licencjonowany broker FMCSA (MC #1741537) 
            koordynujemy odbiór i transport do portu załadunku.
          </p>

          <p style={{ 
            fontSize: '1.0625rem', 
            lineHeight: '1.7', 
            color: '#4A4A46',
            marginBottom: '2rem'
          }}>
            Najczęstsze scenariusze dla aut kierowanych do Polski:
          </p>

          {[
            {
              route: 'Copart Newark (NJ) → Port Newark',
              distance: '~25 km',
              cost: '150-200 USD',
              time: '1 dzień',
              note: 'Najkrótszy możliwy transport — wiele aut na Copart Newark kończy w Port Newark tego samego dnia. Optymalny scenariusz kosztowy.'
            },
            {
              route: 'Copart Chicago (IL) → Port Newark lub Baltimore',
              distance: '~1 200 km',
              cost: '500-750 USD',
              time: '3-5 dni',
              note: 'Transport lawetą przez Wschodnie Wybrzeże. Alternatywnie Cicero (IN) — port używany przez DaytonaCargo dla aut ze Środkowego Zachodu.'
            },
            {
              route: 'Copart Dallas (TX) → Port Houston',
              distance: '~400 km',
              cost: '300-450 USD',
              time: '2-3 dni',
              note: 'Port Houston to druga co do wielkości lokalizacja eksportu aut z USA. Transit z Teksasu krótszy niż z East Coast.'
            },
            {
              route: 'Copart LA (CA) → Port Long Beach',
              distance: '~50 km',
              cost: '200-280 USD',
              time: '1-2 dni',
              note: 'Zachodnie wybrzeże. Uwaga: fracht z West Coast do Europy trwa 4-5 tygodni (Kanał Panamski) vs 2-3 tygodnie z East Coast.'
            }
          ].map((item, i) => (
            <div key={i} style={{
              background: '#fff',
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              padding: '1.25rem 1.5rem',
              marginBottom: '1rem'
            }}>
              <h3 style={{ 
                fontSize: '1.0625rem', 
                fontWeight: 500, 
                margin: '0 0 0.75rem 0',
                fontFamily: fonts.sans
              }}>
                {item.route}
              </h3>
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                fontSize: '0.875rem',
                fontFamily: fonts.sans,
                color: '#6B6B65',
                marginBottom: '0.75rem'
              }}>
                <span><strong style={{ color: colors.text }}>Dystans:</strong> {item.distance}</span>
                <span><strong style={{ color: colors.text }}>Koszt:</strong> {item.cost}</span>
                <span><strong style={{ color: colors.text }}>Czas:</strong> {item.time}</span>
              </div>
              <p style={{ 
                fontSize: '0.9375rem', 
                lineHeight: '1.6', 
                color: '#4A4A46',
                margin: 0
              }}>
                {item.note}
              </p>
            </div>
          ))}
        </section>

        {/* Na co uważać */}
        <section style={{
          background: '#fff',
          borderTop: `1px solid ${colors.border}`,
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 2rem)',
          }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              fontWeight: 400,
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}>
              Siedem pułapek przy kupowaniu na Copart
            </h2>
            <p style={{ 
              fontSize: '1.0625rem', 
              lineHeight: '1.7', 
              color: '#4A4A46',
              marginBottom: '2rem'
            }}>
              Po latach obsługi klientów polskich i europejskich widzimy powtarzające się 
              błędy początkujących. Poniżej lista rzeczy, które najczęściej kosztują ludzi 
              pieniądze — albo marzenie o wymarzonym aucie.
            </p>

            {[
              {
                num: '1',
                title: 'Licytacja "na emocjach" bez analizy cen historycznych',
                text: 'Copart pokazuje tylko aktualne licytacje — nie widzisz ile podobne auta kosztowały wcześniej. Bez analizy historycznej (np. przez BidSpace lub własną bazę) łatwo przepłacić o 15-25%. Przed licytacją sprawdź co najmniej 5 podobnych aut z ostatnich 90 dni.'
              },
              {
                num: '2',
                title: 'Ignorowanie sekcji Secondary Damage',
                text: 'Primary Damage pokazuje główne uszkodzenie, ale często są dodatkowe — frame damage, flood, mechanical. Sprawdź pełny opis, wszystkie zdjęcia i ikonki w prawym górnym rogu strony lotu. "Front End" w primary to jedno, ale "Front End + Undercarriage + Airbag" to już zupełnie inna kalkulacja napraw.'
              },
              {
                num: '3',
                title: 'Flood damage — cichy zabójca budżetu',
                text: 'Powódź to najgorszy typ szkody z punktu widzenia kupca z Europy. Woda niszczy elektronikę, złącza, moduły ECU, a efekty pojawiają się 3-12 miesięcy po naprawie. Sekcja flood w historii Copart oznacza bardzo wysokie ryzyko — unikaj, chyba że kupujesz na części.'
              },
              {
                num: '4',
                title: 'Status "Run & Drive" nie jest gwarancją',
                text: 'Run & Drive oznacza tylko tyle, że w momencie przyjęcia na plac auto odpaliło i poruszyło się o własnych siłach. To nie jest gwarancja stanu silnika, skrzyni biegów ani innych podzespołów. Samochód może po miesiącu na placu przestać działać.'
              },
              {
                num: '5',
                title: 'Pre-bidy podbijają cenę zanim ruszy licytacja',
                text: 'Copart pozwala na pre-bidy (oferty składane przed startem aukcji). Każdy pre-bid staje się natychmiast obowiązujący. Jeśli auto ma pre-bid 5 000 USD, licytacja na żywo zacznie się właśnie od tej kwoty. Unikaj pre-bidów — licytuj na żywo, wtedy cena otwarcia będzie niższa.'
              },
              {
                num: '6',
                title: 'Storage fees naliczają się błyskawicznie',
                text: 'Masz 3 dni bezpłatnego przechowania po zapłacie. Po tym terminie 20-40 USD dziennie. Nieodebrane auto po 30 dniach może wrócić na aukcję, a Ty stracisz część wpłaty. Zorganizuj transport PRZED licytacją, nie po.'
              },
              {
                num: '7',
                title: 'Auta "Dealer Only" — pułapka dostępu',
                text: 'Niektóre loty są oznaczone "Dealer Only" — nie kupisz ich bez licencji dealerskiej w USA. Widzisz ofertę, ale nie możesz licytować. Jeśli wybrałeś auto i dopiero przed licytacją zauważyłeś ten status, skontaktuj się z brokerem — może pomóc.'
              }
            ].map(item => (
              <div key={item.num} style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem',
                paddingBottom: '1.5rem',
                borderBottom: item.num !== '7' ? `1px solid ${colors.border}` : 'none'
              }}>
                <div style={{
                  flexShrink: 0,
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: colors.bg,
                  color: colors.accent,
                  fontSize: '1rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: fonts.serif
                }}>
                  {item.num}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: '1.0625rem', 
                    fontWeight: 500, 
                    margin: '0 0 0.5rem 0',
                    color: colors.text,
                    fontFamily: fonts.sans
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ 
                    fontSize: '0.9375rem', 
                    lineHeight: '1.65', 
                    color: '#4A4A46',
                    margin: 0
                  }}>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Jak wygląda współpraca */}
        <section style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 2rem)',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 400,
            marginBottom: '1rem',
            letterSpacing: '-0.01em',
          }}>
            Jak wygląda współpraca z Y7 i DaytonaCargo
          </h2>
          <p style={{ 
            fontSize: '1.0625rem', 
            lineHeight: '1.7', 
            color: '#4A4A46',
            marginBottom: '2rem'
          }}>
            Dla Ciebie to jedna usługa z jednym kontaktem. Technicznie obsługują ją dwie 
            wyspecjalizowane firmy, ale klient rozmawia z jedną osobą i otrzymuje jedną 
            wycenę "door-to-door" — od placu Copart do własnego podwórka w Polsce.
          </p>

          <ol style={{ 
            fontSize: '1rem', 
            lineHeight: '1.8', 
            color: '#4A4A46',
            paddingLeft: '1.25rem',
            margin: 0
          }}>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Wybierasz auto na Copart</strong> lub prosisz nas o pomoc w wyszukaniu. 
              Wyślij link do lotu przez Telegram lub e-mail — otrzymasz wstępną kalkulację 
              całkowitego kosztu w ciągu kilku godzin.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Akceptujesz wycenę</strong> i wpłacasz kaucję (zazwyczaj 10% zakładanej 
              ceny maksymalnej). Kaucja zabezpiecza obie strony i jest odliczana od końcowego rachunku.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>DaytonaCargo licytuje</strong> w Twoim imieniu na aukcji z użyciem 
              licencji dealerskiej — dostęp do wszystkich lotów, niższe buyer fees.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Y7 Logistics odbiera auto</strong> z placu Copart w ciągu 1-5 dni od wygranej 
              i transportuje do portu załadunku. Otrzymujesz dokumentację transportową i tracking.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>DaytonaCargo organizuje fracht</strong> — kontener lub RoRo do Gdyni 
              lub Rotterdamu. Czas transportu morskiego 2-5 tygodni w zależności od wybrzeża 
              startowego i dostępności statków.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Odprawa celna w Polsce</strong> — cło 10%, VAT 23%, akcyza. DaytonaCargo 
              koordynuje dokumenty, Ty opłacasz należności.
            </li>
            <li style={{ marginBottom: 0 }}>
              <strong>Dostawa pod dom</strong> z portu do wskazanego adresu w Polsce. 
              Alternatywnie odbiór własny z Gdyni obniża koszt o 800-1500 zł.
            </li>
          </ol>
        </section>

        {/* FAQ */}
        <section style={{
          background: '#fff',
          borderTop: `1px solid ${colors.border}`,
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 2rem)',
          }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              fontWeight: 400,
              marginBottom: '2rem',
              letterSpacing: '-0.01em',
            }}>
              Pytania, które słyszymy najczęściej
            </h2>

            {faqSchema.mainEntity.map((faq, i) => (
              <details 
                key={i}
                style={{
                  borderBottom: `1px solid ${colors.border}`,
                  paddingBottom: '1rem',
                  marginBottom: '1rem'
                }}
              >
                <summary style={{
                  fontSize: '1.0625rem',
                  fontWeight: 400,
                  cursor: 'pointer',
                  padding: '0.75rem 0',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <span>{faq.name}</span>
                  <span style={{ color: colors.accent, fontSize: '1.5rem' }}>+</span>
                </summary>
                <p style={{
                  fontSize: '0.9375rem',
                  lineHeight: '1.7',
                  color: '#4A4A46',
                  paddingTop: '0.5rem',
                  margin: 0
                }}>
                  {faq.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </section>


        {/* ================================================================== */}
        {/* SECTION — Dla Polonii w USA (diaspora addendum)                    */}
        {/* ================================================================== */}
        <section style={{
          background: '#EFEAE0',
          borderTop: '1px solid #E8E4DC',
          borderBottom: '1px solid #E8E4DC',
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 2rem)',
          }}>
            <div style={{
              display: 'inline-block',
              padding: '0.375rem 0.875rem',
              background: '#fff',
              border: '1px solid #E8E4DC',
              borderRadius: '999px',
              fontSize: '0.8rem',
              color: colors.accent,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontFamily: fonts.sans,
            }}>
              Dla Polonii w USA
            </div>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              fontWeight: 400,
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}>
              Kupujesz na Copart i mieszkasz w USA? Dostarczymy pod dom
            </h2>
            <p style={{
              fontSize: '1.0625rem',
              lineHeight: '1.7',
              color: '#4A4A46',
              marginBottom: '1.25rem',
            }}>
              Cały powyższy przewodnik opisuje drogę auta z Copart do Polski — pełny import
              z aukcji, przez fracht morski, aż po odprawę celną w Gdyni. Ale jeśli jesteś
              z Polonii mieszkającej w Stanach i kupujesz auto na Copart na własne potrzeby
              albo na sprzedaż w USA, Twoja droga jest krótsza: od placu aukcyjnego
              bezpośrednio pod dom w Chicago, Los Angeles, Nowym Jorku albo gdziekolwiek
              w Stanach. Y7 Logistics obsługuje ten zakres samodzielnie.
            </p>
            <p style={{
              fontSize: '1.0625rem',
              lineHeight: '1.7',
              color: '#4A4A46',
              marginBottom: '1.25rem',
            }}>
              Jako licencjonowany broker FMCSA (MC #1741537) odbieramy auta z każdego
              z ponad 200 placów Copart w USA i Kanadzie oraz z aukcji IAAI. Sieć
              zweryfikowanych przewoźników pokrywa wszystkie 50 stanów. Typowa trasa
              międzystanowa dla sedana z Copart to 5-8 dni od wygranej licytacji do
              dostawy pod Twój adres. <strong>Ważne:</strong> pamiętaj, że Copart nalicza
              opłaty za storage od 3. dnia po wygranej licytacji, więc szybkie potwierdzenie
              zlecenia oszczędza 100-300 USD.
            </p>
            <p style={{
              fontSize: '1.0625rem',
              lineHeight: '1.7',
              color: '#4A4A46',
              marginBottom: '1.5rem',
            }}>
              <strong>Uczciwie mówiąc:</strong> nasz zespół w Y7 nie prowadzi obsługi
              w języku polskim — komunikację prowadzimy po angielsku lub rosyjsku przez
              Telegram. Jeśli zależy Ci na pełnej obsłudze po polsku również w USA,
              warto napisać do DaytonaCargo, która obsługuje polskojęzycznych klientów
              także na rynku amerykańskim.
            </p>

            {/* Pricing cards for US-internal transport from Copart */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginTop: '2rem',
            }}>
              <div style={{
                background: '#fff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #E8E4DC',
              }}>
                <h3 style={{
                  fontFamily: fonts.sans,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  marginTop: 0,
                  marginBottom: '0.75rem',
                  color: '#4A4A46',
                }}>
                  Copart pod dom (do 500 mil)
                </h3>
                <div style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 300,
                  color: colors.accent,
                  marginBottom: '0.5rem',
                }}>
                  $450–750
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  color: '#4A4A46',
                  margin: 0,
                }}>
                  Typowa trasa wewnątrz jednego regionu. Np. Copart NJ → Nowy Jork,
                  Copart CA → Los Angeles.
                </p>
              </div>

              <div style={{
                background: '#fff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #E8E4DC',
              }}>
                <h3 style={{
                  fontFamily: fonts.sans,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  marginTop: 0,
                  marginBottom: '0.75rem',
                  color: '#4A4A46',
                }}>
                  Copart między regionami (500-1500 mil)
                </h3>
                <div style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 300,
                  color: colors.accent,
                  marginBottom: '0.5rem',
                }}>
                  $750–1 200
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  color: '#4A4A46',
                  margin: 0,
                }}>
                  Np. Copart Texas → Chicago, Copart Florida → Nowy Jork.
                  Czas dostawy 5-8 dni.
                </p>
              </div>

              <div style={{
                background: '#fff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #E8E4DC',
              }}>
                <h3 style={{
                  fontFamily: fonts.sans,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  marginTop: 0,
                  marginBottom: '0.75rem',
                  color: '#4A4A46',
                }}>
                  Copart przez cały kraj (1500+ mil)
                </h3>
                <div style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 300,
                  color: colors.accent,
                  marginBottom: '0.5rem',
                }}>
                  $1 100–1 600
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  color: '#4A4A46',
                  margin: 0,
                }}>
                  Np. Copart California → New York, Copart Washington → Florida.
                  Czas dostawy 7-10 dni.
                </p>
              </div>
            </div>

            <p style={{
              fontSize: '0.95rem',
              lineHeight: '1.6',
              color: '#4A4A46',
              marginTop: '1.5rem',
              marginBottom: 0,
              fontStyle: 'italic',
            }}>
              Ceny dla standardowego sedana lub crossovera na lawecie otwartej.
              Auta niejężdżące (non-running) — dopłata 150-300 USD za wciąganie wciągarką.
              Auta powypadkowe bez szyby/drzwi — wymagana enclosed laweta, dopłata 30-60%.
            </p>

            <div style={{
              marginTop: '2rem',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
            }}>
              <a
                href="https://t.me/y7dispatch_bot"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: colors.accent,
                  color: '#fff',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  fontFamily: fonts.sans,
                }}
              >
                Telegram — wyślij numer lotu
              </a>
              <Link
                to="/pl/ship-my-car"
                style={{
                  background: 'transparent',
                  color: colors.accent,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  border: `1px solid ${colors.accent}`,
                  fontFamily: fonts.sans,
                }}
              >
                Jak zamówić transport →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{
          background: colors.text,
          color: colors.bg
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2rem)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              fontWeight: 400,
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
              color: colors.bg
            }}>
              Masz wybrane auto na Copart?
            </h2>
            <p style={{ 
              fontSize: '1.0625rem', 
              lineHeight: '1.7', 
              color: '#D0CDC6',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem auto'
            }}>
              Prześlij link do lotu — otrzymasz pełną kalkulację door-to-door w ciągu godziny. 
              Bez zobowiązań, bez ukrytych opłat, bez marketingowej sprzedaży.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a 
                href="https://t.me/y7dispatch_bot"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: colors.accent,
                  color: '#fff',
                  padding: '0.875rem 2rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  fontFamily: fonts.sans
                }}
              >
                Telegram — szybka wycena
              </a>
              <Link 
                to="/pl/ship-my-car"
                style={{
                  background: 'transparent',
                  color: colors.bg,
                  padding: '0.875rem 2rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  border: `1px solid ${colors.bg}`,
                  fontFamily: fonts.sans
                }}
              >
                Jak zamówić auto →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PolandCopart;
