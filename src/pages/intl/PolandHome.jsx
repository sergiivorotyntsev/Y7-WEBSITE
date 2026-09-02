// PolandHome.jsx
// Route: /pl
// Audience: Poland-based buyers importing cars from USA
// Co-brand: Y7 (US inland) + DaytonaCargo (international leg)
// Word count: ~1800 words native Polish
// Sources: motopodprad.pl, cars-world.pl, americars.com.pl, usrides.pl, transfergo.pl

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import ContextualCTA from '../../components/ContextualCTA';
import styles from './PolandHome.module.css';
import HeroRouteVisual from '../../components/HeroRouteVisual';

const PolandHome = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Ile kosztuje sprowadzenie auta z USA do Polski?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Całkowity koszt sprowadzenia składa się z czterech głównych pozycji: cena wylicytowana na aukcji + opłaty Copart/IAAI (10-25% wartości), transport lądowy w USA (200-500 USD), fracht morski (800-2500 USD w zależności od metody), cło i podatki w Polsce (10% cła + 23% VAT + akcyza 3,1% lub 18,7% w zależności od pojemności silnika). Finalny rachunek zazwyczaj wynosi o 40-80% więcej niż cena z aukcji."
        }
      },
      {
        "@type": "Question",
        "name": "Jak długo trwa sprowadzenie auta z USA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standardowo 6-10 tygodni od wygranej licytacji do odbioru w Polsce. Transport lądowy w USA: 2-10 dni. Fracht morski z Wschodniego Wybrzeża: 2-3 tygodnie, z Zachodniego Wybrzeża: 4-5 tygodni. Odprawa celna w porcie europejskim i transport do Polski: 1-2 tygodnie. Opóźnienia mogą wydłużyć proces o 2-6 tygodni."
        }
      },
      {
        "@type": "Question",
        "name": "Czy Y7 Logistics obsługuje cały proces do Polski?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Y7 Logistics to licencjonowany broker FMCSA (MC #1741537) obsługujący transport lądowy wyłącznie na terenie USA — od odbioru z aukcji do portu załadunku. Międzynarodowy transport morski, odprawę celną i dostawę do Polski obsługuje nasza siostrzana firma DaytonaCargo LLC, specjalizująca się w eksporcie pojazdów z USA do Europy. Razem zapewniamy kompleksową obsługę 'od aukcji pod dom'."
        }
      },
      {
        "@type": "Question",
        "name": "Czy można sprowadzić auto z salvage title?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tak, większość aut z Copart i IAAI ma salvage title — to standardowy typ tytułu dla pojazdów powypadkowych. W Polsce po sprowadzeniu auto wymaga badania technicznego i ewentualnych napraw przed rejestracją. Salvage title nie jest przeszkodą w rejestracji w Polsce, ale warto pamiętać o dodatkowym budżecie na naprawy (zazwyczaj 3 000-8 000 zł przy autach po 80 000 milach przebiegu)."
        }
      },
      {
        "@type": "Question",
        "name": "Z którego portu w USA najlepiej wysyłać auto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dla aut trafiających do Polski najczęściej wykorzystujemy porty Wschodniego Wybrzeża: Newark (NJ), Baltimore (MD), Savannah (GA). Fracht morski z Wschodniego Wybrzeża do Gdyni to 2-3 tygodnie vs 4-5 tygodni z Zachodniego Wybrzeża. W przypadku aut z Kalifornii czasami opłaca się transport lądowy przez całe USA do Newark zamiast shortfracht z LA — zależy od ceny transportu lądowego i aktualnych stawek oceanu."
        }
      },
      {
        "@type": "Question",
        "name": "Kontener czy RoRo — co wybrać?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kontener (1200-2500 USD) zapewnia lepszą ochronę — auto jedzie zamknięte, bez ekspozycji na warunki atmosferyczne, sól morską i ewentualne uszkodzenia. Polecany dla aut droższych, zabytkowych i mocno uszkodzonych. RoRo (800-1500 USD) jest tańszy, ale auto stoi na otwartym pokładzie. Przy konsolidacji w jednym 40-stopowym kontenerze mieszczą się 3-4 auta, co obniża koszt na jeden pojazd."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.y7agency.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Sprowadzanie aut z USA do Polski",
        "item": "https://www.y7agency.com/pl"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Sprowadzanie aut z USA do Polski — Y7 Logistics & DaytonaCargo</title>
        <meta
          name="description"
          content="Y7 Logistics (FMCSA, MC #1741537) i DaytonaCargo — kompleksowe sprowadzanie aut z USA do Polski. Od Copart i IAAI przez transport lądowy w USA po fracht morski i dostawę pod dom. Przejrzyste ceny, realny czas realizacji."
        />
        <meta property="og:title" content="Sprowadzanie aut z USA do Polski — Y7 Logistics" />
        <meta property="og:description" content="Kompleksowa obsługa od aukcji Copart i IAAI po dostawę pod dom w Polsce. Licencjonowany broker FMCSA MC #1741537." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.y7agency.com/pl" />
        <meta property="og:locale" content="pl_PL" />
        <html lang="pl" />
        <link rel="canonical" href="https://www.y7agency.com/pl/transport-z-usa" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags
        currentPath=""
        hasPolishVersion={true}
        hasUkrainianVersion={true}
        hasRussianVersion={true}
      />

      <main className={styles.page}>
        {/* Hero section */}
        <section className={styles.hero}>
          <div className={styles.heroVisual} aria-hidden="true">
            <HeroRouteVisual />
          </div>
          <div className={styles.heroInner}>
            <span className={styles.heroKicker}>Y7 Logistics × DaytonaCargo</span>

            <h1 className={styles.h1}>
              Sprowadzanie aut z USA do Polski — od licytacji po dostawę pod dom
            </h1>

            <p className={styles.heroSub}>
              Licencjonowany broker FMCSA (MC #1741537) obsługujący odbiór z aukcji Copart, IAAI
              i Manheim oraz transport lądowy w USA. Dalszą część drogi — fracht morski, odprawę
              celną i dostawę do Polski — prowadzi nasza siostrzana firma DaytonaCargo LLC.
            </p>

            <div className={styles.heroActions}>
              <a
                href="https://t.me/y7dispatch_bot"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnCta}
              >
                Napisz na Telegramie →
              </a>
              <a
                href="mailto:info@y7agency.com"
                className={styles.btnGhostDark}
              >
                info@y7agency.com
              </a>
            </div>
          </div>
        </section>

        {/* Quick stats — dark strip, parity with English TrustBar */}
        <section className={styles.bandPaper}>
          <div className={styles.statsInner}>
            <div className={styles.statsGrid}>
              <div style={{ padding: '8px 16px' }}>
                <p className={styles.statNumber}>6-10 tyg.</p>
                <p className={styles.statLabel}>typowy czas od wygranej aukcji do odbioru w Polsce</p>
              </div>
              <div style={{ padding: '8px 16px' }}>
                <p className={styles.statNumber}>4-8 tys. zł</p>
                <p className={styles.statLabel}>koszt transportu USA → Polska (kontener lub RoRo)</p>
              </div>
              <div style={{ padding: '8px 16px' }}>
                <p className={styles.statNumber}>MC #1741537</p>
                <p className={styles.statLabel}>licencja FMCSA — pełna weryfikacja DOT</p>
              </div>
            </div>
          </div>
        </section>

        {/* Kto jest za co odpowiedzialny */}
        <section className={styles.bandBoard}>
          <div className={styles.inner}>
            <span className={styles.eyebrowRuleBoard}>PARTNERSTWO</span>
            <h2 className={styles.h2Board}>
              Dwie firmy, jeden łańcuch logistyczny
            </h2>
            <p className={styles.leadBoard}>
              Sprowadzanie auta z USA to proces rozciągnięty na dwa kontynenty i pod dwóch
              różnych reżimów regulacyjnych. W Stanach obowiązują przepisy Federal Motor
              Carrier Safety Administration (FMCSA), w Europie — Unia Celna i krajowe urzędy
              skarbowe. Dlatego obsługujemy Cię poprzez dwie wyspecjalizowane firmy.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}>
              {/* Y7 card */}
              <div className={styles.cardBoard}>
                <div className={styles.cardMiniLabel}>
                  Etap amerykański
                </div>
                <h3 className={styles.h3Board}>
                  Y7 Logistics
                </h3>
                <p className={styles.pBoard} style={{ fontSize: '0.9375rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                  Licencjonowany broker FMCSA z siedzibą w Natick (Massachusetts).
                  USDOT #4427359, MC #1741537. Obsługujemy:
                </p>
                <ul className={styles.cardList}>
                  <li>Odbiór auta z aukcji Copart, IAAI, Manheim</li>
                  <li>Transport lądowy z placu aukcji do portu załadunku</li>
                  <li>Koordynację gate pass przy odbiorze</li>
                  <li>Dokumentację transportową w USA</li>
                  <li>Aktualizacje statusu na każdym etapie</li>
                </ul>
              </div>

              {/* DaytonaCargo card */}
              <div className={styles.cardBoard}>
                <div className={styles.cardMiniLabel}>
                  Etap międzynarodowy
                </div>
                <h3 className={styles.h3Board}>
                  DaytonaCargo LLC
                </h3>
                <p className={styles.pBoard} style={{ fontSize: '0.9375rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                  Siostrzana firma zarejestrowana w Dover (Delaware), specjalizująca się
                  w międzynarodowym transporcie z USA i Kanady do Europy. Obsługa po polsku.
                  Zajmuje się:
                </p>
                <ul className={styles.cardList}>
                  <li>Załadunek kontenera lub RoRo w porcie USA</li>
                  <li>Fracht morski do Gdyni lub portu UE</li>
                  <li>Sprawdzanie historii pojazdu (Carfax, AutoCheck)</li>
                  <li>Przygotowanie dokumentacji eksportowej</li>
                  <li>Dostawa "Pojazd pod dom" w Polsce</li>
                </ul>
                <p style={{ fontSize: '0.875rem', marginTop: '1rem' }}>
                  <a
                    href="mailto:info@y7agency.com"
                    className={styles.bodyLinkDark}
                  >
                    info@y7agency.com — obsługa po polsku →
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Etapy procesu */}
        <section className={styles.bandPaper}>
          <div className={styles.inner}>
            <span className={styles.eyebrowPlainPaper}>JAK TO DZIAŁA</span>
            <h2 className={styles.h2Paper}>
              Jak wygląda cały proces — krok po kroku
            </h2>
            <p className={styles.leadPaper}>
              Poniżej realny harmonogram sprowadzenia auta z aukcji Copart lub IAAI do
              odbioru pod dom w Polsce. Terminy pochodzą z rzeczywistej praktyki — bez
              marketingowych obietnic "szybkiej dostawy w 3 tygodnie", których nikt nie dotrzymuje.
            </p>

            {[
              {
                num: '1',
                title: 'Wygrana licytacja i zapłata',
                time: 'Dzień 0-3',
                desc: 'Po wygranej licytacji masz 2-3 dni na przelew do Copart/IAAI. Spóźnienie oznacza karę 2% dziennie plus opłaty za przechowanie na placu. Jeśli kupujesz przez pośrednika (broker z licencją), to on realizuje płatność w Twoim imieniu.'
              },
              {
                num: '2',
                title: 'Transport lądowy w USA — Y7 Logistics',
                time: '2-10 dni',
                desc: 'Y7 odbiera auto z placu aukcji i transportuje do portu załadunku. Najczęściej są to Newark (NJ), Baltimore (MD) lub Savannah (GA) dla Wschodniego Wybrzeża; Houston (TX) lub Los Angeles (CA) dla południa i zachodu. Koszt zależy od odległości: 200-500 USD dla krótkich tras, więcej przy cross-country.'
              },
              {
                num: '3',
                title: 'Odprawa eksportowa i załadunek',
                time: '2-7 dni',
                desc: 'DaytonaCargo przejmuje auto w porcie, realizuje odprawę eksportową (US Customs) i ładuje do kontenera 40-stopowego lub na statek RoRo. W kontenerze mieszczą się 3-4 auta co obniża koszt na jeden pojazd.'
              },
              {
                num: '4',
                title: 'Fracht morski do Europy',
                time: '2-5 tygodni',
                desc: 'Z Wschodniego Wybrzeża USA do Gdyni lub Rotterdamu: 2-3 tygodnie. Z Zachodniego Wybrzeża: 4-5 tygodni przez Kanał Panamski. Koszt kontenera: 1200-2500 USD, RoRo: 800-1500 USD.'
              },
              {
                num: '5',
                title: 'Odprawa celna w UE i dostawa do Polski',
                time: '1-2 tygodnie',
                desc: 'Po przybyciu do portu UE (najczęściej Gdynia lub Rotterdam) następuje odprawa celna. Poniesiesz cło 10%, VAT 23% i akcyzę (3,1% dla silników do 2000 cm³, 18,7% powyżej). Następnie transport lawetą do miejsca docelowego w Polsce: 800-1500 zł z Gdyni, mniej przy odbiorze własnym.'
              }
            ].map(step => (
              <div key={step.num} className={styles.stepRow}>
                <div className={styles.stepNum}>
                  {step.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div className={styles.stepHead}>
                    <h3 className={styles.h3Paper} style={{ fontSize: '1.25rem' }}>
                      {step.title}
                    </h3>
                    <span className={styles.stepTime}>
                      {step.time}
                    </span>
                  </div>
                  <p className={styles.pPaper} style={{ fontSize: '0.9375rem', lineHeight: '1.65', margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rzeczywiste koszty */}
        <section className={styles.bandBoard}>
          <div className={styles.inner}>
            <span className={styles.eyebrowRuleBoard}>KOSZTY</span>
            <h2 className={styles.h2Board}>
              Rzeczywiste koszty — cztery składowe
            </h2>
            <p className={styles.leadBoard} style={{ marginBottom: '2rem' }}>
              Całkowity koszt sprowadzenia auta to suma czterech pozycji. Poniżej realne
              widełki oparte o dane z aukcji Copart i IAAI oraz aktualne stawki frachtu
              morskiego z 2026 roku.
            </p>

            <div className={styles.dataPanel}>
              {[
                {
                  label: '1. Zakup na aukcji',
                  range: 'Cena wylicytowana + 10-25%',
                  detail: 'Buyer\'s premium Copart/IAAI, opłaty członkowskie, storage fees jeśli odbiór z opóźnieniem. Dla auta wylicytowanego za 10 000 USD realnie zapłacisz 11 500-12 500 USD.'
                },
                {
                  label: '2. Transport lądowy w USA',
                  range: '200-500 USD',
                  detail: 'Zależy od odległości placu aukcji do portu. Copart/IAAI w Newark, NJ — 200 USD do Port Newark. Copart Dallas — 450-600 USD do Port Houston. Cross-country z Kalifornii do East Coast: 1200-1800 USD (rzadkie, ale zdarza się).'
                },
                {
                  label: '3. Fracht morski',
                  range: '800-2500 USD',
                  detail: 'RoRo: 800-1500 USD — tańszy, auto na otwartym pokładzie. Kontener 40-stopowy współdzielony: 1200-2000 USD za auto. Kontener dedykowany: 2500-3500 USD. Z East Coast transit 2-3 tyg., West Coast 4-5 tyg.'
                },
                {
                  label: '4. Cło, VAT i akcyza w Polsce',
                  range: '~35-50% wartości auta',
                  detail: 'Cło 10% od wartości CIF (cena + fracht + ubezpieczenie). VAT 23% od wartości CIF + cła. Akcyza 3,1% (silniki do 2000 cm³) lub 18,7% (powyżej 2000 cm³). Dla auta o wartości 15 000 USD: około 22 000-28 000 zł opłat.'
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className={i < 3 ? styles.dataRow : styles.dataRowLast}
                >
                  <div className={styles.dataRowHead}>
                    <h3 className={styles.h3Board} style={{ fontSize: '1.125rem', margin: 0 }}>
                      {item.label}
                    </h3>
                    <span className={styles.dataValue}>
                      {item.range}
                    </span>
                  </div>
                  <p className={styles.pBoard} style={{ fontSize: '0.9375rem', lineHeight: '1.65', margin: 0 }}>
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <p className={styles.noteBoard}>
              Podane widełki oparte są o dane publiczne z aukcji Copart i IAAI oraz
              aktualne stawki frachtu morskiego z Q1 2026. Rzeczywista cena zależy od
              modelu, lokalizacji, pory roku i wybranej metody transportu. Wycena indywidualna
              zawsze darmowa — napisz na Telegramie lub e-mailu.
            </p>
          </div>
        </section>

        {/* Przykłady realnych rachunków */}
        <section className={styles.bandPaper}>
          <div className={styles.inner}>
            <span className={styles.eyebrowPlainPaper}>OPŁACALNOŚĆ</span>
            <h2 className={styles.h2Paper}>
              Kiedy import z USA się opłaca
            </h2>
            <p className={styles.leadPaper} style={{ marginBottom: '2rem' }}>
              Nie każde auto warto sprowadzać. Próg opłacalności to zazwyczaj 60 000 zł
              wartości rynkowej w Polsce — poniżej tej kwoty koszty transportu i opłat
              zjadają marżę. Poniżej trzy przykłady z rynku pokazujące gdzie import ma sens.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}>
              {[
                {
                  model: 'Ford Mustang GT V8',
                  year: '2020-2022',
                  auctionPrice: '18-28 tys. USD',
                  polandTotal: '120-165 tys. zł',
                  marketPL: '160-210 tys. zł',
                  savings: '40-60 tys. zł'
                },
                {
                  model: 'BMW X5',
                  year: '2020-2022',
                  auctionPrice: '28-40 tys. USD',
                  polandTotal: '185-250 tys. zł',
                  marketPL: '240-320 tys. zł',
                  savings: '50-80 tys. zł'
                },
                {
                  model: 'Tesla Model Y',
                  year: '2021-2023',
                  auctionPrice: '22-32 tys. USD',
                  polandTotal: '155-210 tys. zł',
                  marketPL: '190-260 tys. zł',
                  savings: '30-55 tys. zł'
                }
              ].map((ex, i) => (
                <div
                  key={i}
                  className={styles.cardPaper}
                >
                  <h3 className={styles.h3Paper} style={{ fontSize: '1.25rem', margin: '0 0 0.25rem 0' }}>
                    {ex.model}
                  </h3>
                  <div className={styles.exYear}>
                    Rocznik {ex.year}
                  </div>

                  {[
                    ['Cena na Copart', ex.auctionPrice],
                    ['Całkowity koszt w PL', ex.polandTotal],
                    ['Rynek krajowy', ex.marketPL],
                  ].map(([label, value], j) => (
                    <div
                      key={j}
                      className={styles.exRow}
                    >
                      <span className={styles.exRowLabel}>{label}</span>
                      <span className={styles.exRowValue}>{value}</span>
                    </div>
                  ))}

                  <div className={styles.exSavings}>
                    <span>Oszczędność</span>
                    <span>{ex.savings}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className={styles.notePaper} style={{ fontSize: '0.8125rem', marginTop: '1.5rem' }}>
              Źródło danych: aukcje Copart i IAAI, serwisy ogłoszeniowe otomoto.pl
              i autotrader.pl, dane Q1 2026. Oszczędność nie uwzględnia kosztów
              naprawy ewentualnych uszkodzeń pozostałych po wypadku — budżetuj dodatkowo
              3 000-8 000 zł na przegląd i drobne naprawy.
            </p>
          </div>
        </section>

        {/* Pułapki i ryzyka */}
        <section className={styles.bandBoard}>
          <div className={styles.inner}>
            <span className={styles.eyebrowRuleBoard}>RYZYKA</span>
            <h2 className={styles.h2Board}>
              Pułapki, o których nikt nie mówi wprost
            </h2>
            <p className={styles.leadBoard} style={{ marginBottom: '2rem' }}>
              Marketing firm importowych koncentruje się na oszczędnościach. Uczciwość
              wymaga pokazania także ryzyk — w końcu sprowadzasz auto, nie kupujesz
              chleba. Oto cztery rzeczy, o których warto wiedzieć przed licytacją.
            </p>

            {[
              {
                title: 'Opóźnienia są normą, nie wyjątkiem',
                text: '6-10 tygodni to optymistyczny scenariusz. Problemy z dokumentacją tytułu (brakujący original title, opóźnienie wystawienia), zatory w porcie Gdynia w sezonie lub awarie statków mogą dodać 2-6 tygodni. Nie planuj wymiany auta "na konkretną datę".'
              },
              {
                title: 'Naprawy po sprowadzeniu — realny budżet',
                text: 'Każde auto z Copart/IAAI wymaga przeglądu: hamulce, opony, amortyzatory, lampy, akumulator. Przy autach po 80 000 milach budżet 3 000-8 000 zł na podstawowe naprawy to minimum. Droższe uszkodzenia (rama, silnik) wymagają dużo większych nakładów.'
              },
              {
                title: 'Dopasowanie do europejskich norm',
                text: 'Amerykańskie światła mają symetryczne odbłyśniki — trzeba je wymienić lub modyfikować przed rejestracją. Tylnie kierunkowskazy często są czerwone — niektóre modele wymagają wymiany. Tylny reflektor przeciwmgłowy bywa nieobecny. Koszt adaptacji: 500-3000 zł w zależności od auta.'
              },
              {
                title: 'Koszt tłumaczenia dokumentów',
                text: 'Title, bill of sale i inne dokumenty wymagają tłumaczenia przez tłumacza przysięgłego — polskiego, nie amerykańskiego. Tłumaczenie z USA nie ma mocy prawnej w Polsce. Koszt: 200-500 zł za komplet dokumentów do rejestracji.'
              }
            ].map((item, i) => (
              <div key={i} className={styles.cardBoard} style={{ marginBottom: '1rem' }}>
                <h3 className={styles.h3Board} style={{ fontSize: '1.125rem', margin: '0 0 0.5rem 0' }}>
                  {item.title}
                </h3>
                <p className={styles.pBoard} style={{ fontSize: '0.9375rem', lineHeight: '1.65', margin: 0 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.bandPaper}>
          <div className={styles.inner}>
            <span className={styles.eyebrowPlainPaper}>FAQ</span>
            <h2 className={styles.h2Paper} style={{ marginBottom: '2rem' }}>
              Najczęściej zadawane pytania
            </h2>

            {faqSchema.mainEntity.map((faq, i) => (
              <details
                key={i}
                className={styles.faqItem}
              >
                <summary className={styles.faqSummary}>
                  <span>{faq.name}</span>
                  <span className={styles.faqMarker}>+</span>
                </summary>
                <p className={styles.faqAnswer}>
                  {faq.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </section>


        {/* ================================================================== */}
        {/* SECTION — Dla Polonii w USA (diaspora addendum)                    */}
        {/* ================================================================== */}
        <section className={styles.bandBoard}>
          <div className={styles.inner}>
            <span className={styles.eyebrowPlainBoard}>
              Dla Polonii w USA
            </span>
            <h2 className={styles.h2Board}>
              Mieszkasz w Stanach? Obsługujemy transport również u Ciebie
            </h2>
            <p className={styles.pBoard} style={{ marginBottom: '1.25rem' }}>
              Cała góra tej strony opisuje drogę auta z USA do Polski — pełny import
              z aukcji Copart pod dom w Gdańsku czy Krakowie. Ale jeśli jesteś z Polonii
              mieszkającej w Stanach i potrzebujesz jedynie transportu lądowego między
              stanami — odbioru z Copart pod dom w Chicago, przewozu z Kalifornii do
              Nowego Jorku albo dostawy do portu przed wysłaniem auta rodzinie w Polsce —
              Y7 Logistics obsługuje ten zakres samodzielnie, bez angażowania DaytonaCargo.
            </p>
            <p className={styles.pBoard} style={{ marginBottom: '1.25rem' }}>
              Jako licencjonowany broker FMCSA (MC #1741537) mamy dostęp do sieci
              zweryfikowanych przewoźników na terenie wszystkich 50 stanów. Typowe
              zlecenia od Polonii to transport z aukcji Copart i IAAI, przeprowadzki
              międzystanowe, dostawy aut sprzedanych na Facebook Marketplace czy
              Cars.com, oraz dowóz auta do portu (Newark, Baltimore, Savannah, Houston,
              Los Angeles) przed wysyłką oceaniczną.
            </p>
            <p className={styles.pBoard} style={{ marginBottom: '1.5rem' }}>
              <strong>Uczciwie mówiąc:</strong> nasz zespół w Y7 nie prowadzi obsługi
              w języku polskim — komunikację prowadzimy po angielsku lub rosyjsku przez
              Telegram. Jeśli zależy Ci na pełnej obsłudze po polsku również w USA,
              warto napisać do DaytonaCargo, która obsługuje polskojęzycznych klientów
              także na rynku amerykańskim.
            </p>

            {/* Pricing cards for US-internal transport */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginTop: '2rem',
            }}>
              <div className={styles.cardBoard}>
                <h3 className={styles.priceLabel}>
                  Krótki dystans (do 500 mil)
                </h3>
                <div className={styles.priceValue}>
                  $450–750
                </div>
                <p className={styles.priceDesc}>
                  Np. NY → Chicago, LA → San Francisco, Miami → Atlanta. Czas dostawy 3-5 dni.
                </p>
              </div>

              <div className={styles.cardBoard}>
                <h3 className={styles.priceLabel}>
                  Średni dystans (500-1500 mil)
                </h3>
                <div className={styles.priceValue}>
                  $750–1 200
                </div>
                <p className={styles.priceDesc}>
                  Np. Chicago → Miami, NY → Dallas, Denver → Seattle. Czas dostawy 5-8 dni.
                </p>
              </div>

              <div className={styles.cardBoard}>
                <h3 className={styles.priceLabel}>
                  Przez cały kraj (1500+ mil)
                </h3>
                <div className={styles.priceValue}>
                  $1 100–1 600
                </div>
                <p className={styles.priceDesc}>
                  Np. Kalifornia → New York, Florida → Washington. Czas dostawy 7-10 dni.
                </p>
              </div>
            </div>

            <p className={styles.noteBoard} style={{ fontSize: '0.95rem', lineHeight: '1.6', marginTop: '1.5rem' }}>
              Ceny dla standardowego sedana lub crossovera na lawecie otwartej. Auta enclosed
              (kryte), pickupy i auta niejężdżące wyceniamy indywidualnie — dopłata typowo 30-60%.
            </p>

            <div style={{
              marginTop: '2rem',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
            }}>
              <Link
                to="/pl/ship-my-car"
                className={styles.btnCta}
              >
                Szczegóły zlecenia transportu →
              </Link>
              <a
                href="https://t.me/y7dispatch_bot"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnGhostDark}
              >
                Telegram — napisz po angielsku
              </a>
            </div>
          </div>
        </section>

        <ContextualCTA variant="card" to="/exporters" intlKey="exporters" tone="amber" />
        {/* [WEBFIX-T04] the CO service, in this locale (ContextualCTA prefixes the path). */}
        <ContextualCTA variant="inline" to="/certificate-of-origin" intlKey="certificateOfOrigin" />

        {/* Final CTA */}
        <section className={styles.bandBoard}>
          <div className={styles.inner} style={{ textAlign: 'center' }}>
            <h2 className={styles.h2Board}>
              Rozważasz sprowadzenie auta z USA?
            </h2>
            <p className={styles.leadBoard} style={{ maxWidth: '600px', margin: '0 auto 2rem auto' }}>
              Przed licytacją sprawdź realny koszt całego procesu. Darmowa wycena
              w ciągu godziny, bez zobowiązań. Odpowiadamy po polsku przez DaytonaCargo.
            </p>
            <div className={styles.finalActions}>
              <a
                href="https://t.me/y7dispatch_bot"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnCta}
              >
                Telegram — szybka wycena
              </a>
              <a
                href="mailto:info@y7agency.com"
                className={styles.btnGhostDark}
              >
                Email — wycena po polsku
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PolandHome;
