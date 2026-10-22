# NOMIA — Om·IA·NHI

[English](README.md) · **Română** · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versiune:** 0.10.14 · **Ultima actualizare:** 2026-10-22

Limbile interfeței: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

**Live / demo:** https://chiuta.github.io/NOMIA/

![NOMIA — captură de ecran / screenshot](screenshot.ro.png)

**Ficțiune / speculație (Fiction / speculation).** Aplicație conceptuală, companion al antologiei *Printre inteligențe* (2026). Protocoalele, scorurile și „sesiunile” sunt modele narative și conceptuale, nu fapte verificate.

## Ce este

NOMIA este o aplicație single-file (`index.html`, PWA) care simulează „protocoale de contact” trilogice Om–IA–NHI (inteligențe non-umane) pe 5 canale (matematic, intuiție, simbolic, sincronicități, modificarea stării), cu interfață în 8 limbi (RO, EN, FR, IT, ES, PT, DE, HU; fișele din catalog și textele UAP sunt traduse integral; narațiunile protocoalelor sunt traduse doar în parte (vezi „Limitări”)). Catalogul conține 1001 de intrări, în 14 categorii: animale (primate, cetacee, mamifere, păsări, cefalopode, insecte, faună din România), entități colective și non-neuronale, „Tradiții esoterice”, „Tradiții religioase” și „Ipoteze moderne” (inclusiv ipoteze despre UAP/NHI). Intrările despre animale se bazează pe literatură științifică citată în fișe; intrările esoterice, religioase și ipotezele despre UAP/NHI sunt prezentate ca idei, nu ca dovezi, iar fișele le marchează adesea ca speculative sau neconfirmate. Panoul „Axa B” avertizează explicit: „incertitudine epistemică ridicată”.

## Cum se folosește

1. Deschide `index.html` (sau instalează-l ca aplicație din browser).
2. Alege un NHI din „Alege NHI” (sau din meniul 🧬 / categorii) și un canal.
3. Apasă ▶ REIA pentru a rula protocolul linie cu linie; ■ STOP, ⏸ și »STEP controlează rularea.
4. Meniurile din bara laterală oferă comparații, statistici, jurnal, exporturi (TXT, Markdown, snapshot-uri) și setări (temă, limbă, mărime font).

## Ce date pleacă din browser

Niciuna. În cod nu există `fetch`/XHR/WebSocket și nici scripturi, fonturi sau imagini externe (CSP `default-src 'self'`, scripturile permise doar pe hash, fără `'unsafe-inline'` pentru script). Singurele adrese externe sunt linkurile de sprijin (Buy Me a Coffee). Preferințele, istoricul sesiunilor, notele și favoritele se păstrează doar în `localStorage` (chei `nomia_*`). Service worker-ul (`sw.js`) ține în cache doar fișierele aceleiași origini pentru funcționare offline.

## Limitări

- **Limbi:** fișele din catalog (locuri, legende, necunoscute, referințe: 100%) și cele 301 texte UAP sunt traduse în fr, it, es, pt, de, hu, la fel și nota „Drepturi și atribuire” (RO+EN rămân versiunea de referință). Narațiunile protocoalelor (circa 2,5 milioane de caractere afișate) sunt acum traduse aproape complet: circa 11.500 de propoziții unice traduse direct acoperă circa 91% din caracterele narațiunilor (circa 99,6% dacă se numără și fragmentele de început); doar un mic rest (circa 0,4% după numărarea fragmentelor de început: propoziții încă netraduse) **rămâne în română** în celelalte limbi. Traducerile sunt automate, neverificate de vorbitori nativi; conținutul religios, medical (de ex. migrena lui Sacks, Hildegard, ipoteza lui Jaynes, rezistența la cancer) și cel speculativ/folcloric/UAP, precum și nota juridică, **necesită revizie de specialitate**.
- Conținut informativ și creativ; nu este sfat științific, medical sau juridic. Conținutul esoteric/religios nu are validare științifică.
- Texte generate din șabloane: rezultatele „protocolului” nu sunt măsurători.

## Fișiere

- `index.html` — aplicația; `manifest.webmanifest`, `sw.js`, `icon-*.png` — PWA.
- `tests/` — teste Playwright (a se vedea `tests/README.md`).

## Licență

MIT — vezi fișierul LICENSE. Declarată în antetul `index.html`.

**NOTICE – conținut cu coautor.** Licența MIT se aplică codului aplicației și textelor scrise de Alexandru-Ionuț Chiuță. Fragmentele care provin din Anexa I, Cap. 14 a antologiei *Printre inteligențe* (2026, semnat Urzică & Chiuță) sunt opera a doi coautori; coautorul nu a confirmat (în materialele auditate) licențierea MIT pentru partea sa, iar acest repository nu o presupune. Titlurile și numele unor opere terțe (de ex. *Solaris*, *Norul Negru*, *Monolitul*, *Prima Directivă*) aparțin deținătorilor lor și sunt folosite descriptiv.

## Drepturi și atribuire / Rights and attribution

- **Partea autorului:** licența declarată (MIT) se aplică DOAR codului aplicației și textelor scrise de Alexandru-Ionuț Chiuță.
- **Coautor:** Anexa I, Cap. 14 din *Printre inteligențe* (Urzică & Chiuță) – coautorul nu a confirmat licențierea MIT; nu este presupusă.
- **Materiale terțe:** titluri/nume de opere (folosite descriptiv) și referințele științifice din fișe aparțin titularilor; licența MIT nu le acoperă.
- **Rectificare / retragere:** dacă ești titular de drepturi sau persoană menționată și dorești corectarea sau retragerea, scrie la alexio@trom.tf; răspundem în 7 zile.

*EN:* The MIT licence applies ONLY to the code and to texts written by Alexandru-Ionuț Chiuță. The co-authored part (Annex I, Ch. 14, Urzică & Chiuță) is not assumed to be MIT-licensed; third-party materials belong to their holders and are not covered by the MIT licence. Rights holders or persons mentioned may request correction or withdrawal at alexio@trom.tf (reply within 7 days). The same note is visible in the app (log bar, "Drepturi și atribuire").

## Audit

Audit: 2026-10-10 (rundă 3: notă de drepturi și atribuire). Corecturi de accesibilitate (roluri ARIA, contrast în temele luminoasă și întunecată, etichete) și adăugarea notei „Ficțiune / speculație” în aplicație.

## Autor

Alexio — Alexandru-Ionuț Chiuță, contact: alexio@trom.tf.

## Funcții noi (v0.9.0)

- **Citirea jurnalului de protocol cu voce** (butonul 🔊 din antetul jurnalului, FFF.tts): citește liniile mesajelor în ordine (fără etichetele OM/IA/NHI), cu vocea locală a browserului, în limba activă (ro/en); „⏹” oprește. Textul nu pleacă din dispozitiv; dacă nu există voce, apare un mesaj. Nu citește jurnalul pe măsură ce apare, ci ce este afișat în momentul apăsării.
- **Etichetă de transparență și copie .fff.json** (kit comun: core, label, bundle, tts): clic pe `v 0.9.0 · 2026-10-14` din „Statistici · Setări”; arată stocarea locală și rețeaua (0 cereri), exportă/importă (opțional criptat cu parolă) istoricul, fixările și setările. Exporturile existente (TXT, Markdown, snapshot) rămân.
- Cache Service Worker: nomia-v6. CSP neschimbat (doar hash-urile scripturilor, recalculate).
- Textele noi sunt în ro, en, fr, it, es, pt, hu, de; traducerile fr/it/es/pt/hu/de sunt automate și neverificate nativ.
- Teste: `tests/fff-r8.test.mjs` (Node + Playwright; rețea blocată, 1280 și 360 px, axe 0 violări); testele Python existente rulează ca înainte.

## Istoric / Changelog
- **0.10.14 — 2026-10-22:** Greutate: pagina scade de la 18,6 MB la 3,3 MB. Dicționarul în 8 limbi e împărțit în pachete de limbă (`i18n/keys.js` + un fișier per limbă, încărcat doar pentru limba aleasă), iar variantele de protocol NHI→Om / IA→NHI / NHI→IA (2,4 MB) sunt în `data/variants.js`, încărcat la prima folosire; service worker-ul le servește cache-first și, când pagina e inactivă, descarcă în fundal celelalte pachete (nu se face cu Save-Data / conexiuni lente), deci aplicația rămâne complet offline. Dacă un pachet nu poate fi încărcat (offline înainte de a fi descărcat) se afișează textul original cu o notificare în limba aleasă. Fără clipire de text netradus (pagina se arată când sosește pachetul, cel mult după 6 s). Test nou: `tests/lazy.test.mjs`.
- **0.10.13 — 2026-10-22:** fff-kit 1.1.4: ținte tactile și text minim în interfața comună; ținte tactile/text corectate (butoanele de citire și auto-scroll, salvarea căutării, bannerul de prima utilizare, nota de drepturi, etichetele canalelor, etichetele modelului triadic).
- **0.10.12 — 2026-10-22:** Securitate: mesajul „Niciun NHI pentru …” și butoanele căutărilor salvate nu mai inserează interogarea tastată ca HTML (DOM-XSS latent).
- **0.10.11 — 2026-10-22:** fff-kit 1.1.2: PBKDF2 600 000 iterații, protecție anti-clickjacking.
- **0.10.10 (22 octombrie 2026):** Accesibilitate și mobil: un singur H1, nume accesibile pe cele 1001 butoane NHI (derivate din numele intrării) și pe câmpurile de căutare, text de minimum 12 px pe carduri și filtre; confirm() înlocuit cu dialoguri inline traduse; exporturile CSV neutralizează prefixele de formulă (=, +, -, @).
- **0.10.9 — 2026-10-22:** cele 1001 de nume de entități (ex. „Girafe”, „Ipoteza zoo”, „Struți”) sunt acum traduse în fr/it/es/pt/de/hu în listă, căutare și fișe; tabelul și panoul de detalii UAP, sugestiile canalelor și jurnalul de pornire nu mai afișează română (sau engleză în română).
- **0.10.8 — 2026-10-22:** titlul, nota despre drepturi și numele categoriilor (tradiții esoterice/religioase, ipoteze moderne, cefalopode) urmează acum limba interfeței (fără rămășițe ro/en).
- **0.10.7 — 2026-10-22:** validarea traducerilor acceptă acum formatul local al numerelor (10.000 / 10,000 / 10 000, 1.2 / 1,2) și numerele redate în litere sau ordinale; circa 320 de propoziții respinse anterior au fost revizuite și integrate (toate traduceri corecte: numere scrise în litere, format de oră, secole cu cifre romane, scara numerică a trilioanelor): circa 11.500 de propoziții unice, circa 91% din caracterele narațiunilor (circa 99,6% dacă se numără fragmentele de început); nicio propoziție nu mai este respinsă la validare.
- **0.10.6 — 2026-10-21:** narațiunile protocoalelor sunt acum traduse în fr, it, es, pt, de, hu aproape complet: circa 11.400 de propoziții unice traduse direct, circa 91% din caracterele narațiunilor (circa 99% dacă se numără fragmentele de început); doar un mic reziduu rămâne în română. Traducerile sunt automate, neverificate de vorbitori nativi, și necesită revizie de specialitate (conținut religios, medical, speculativ/folcloric/UAP și nota juridică).
- **0.10.5 — 2026-10-19:** nota „Drepturi și atribuire” este tradusă în fr, it, es, pt, de, hu (RO+EN rămân versiunea de referință); separator de propoziții și încă 105 șabloane cu locuri, plus 277 de propoziții traduse: circa 59% din caracterele narațiunilor protocoalelor sunt acum traduse (68% dacă se numără fragmentele de început). Traducerile necesită revizie de specialitate (juridică).
- **0.10.4 — 2026-10-19:** fișele din catalog și textele UAP sunt traduse în fr, it, es, pt, de, hu; mecanism de rezervă la nivel de propoziție pentru cele 331 de șabloane narative cele mai frecvente (circa jumătate din caracterele narațiunilor). **0.10.1:** bannerele de anulare / prima utilizare și toast-ul își recapătă decalajul de jos și lățimea (`calc()` invalid).
- **0.9.1 — 18 octombrie 2026:** linkul `?nhi=<id>` acceptă id-uri cu diacritice (`murmurații`, `leopard-nebuloși`; regex Unicode `\p{L}`), iar „Copiază link” codifică id-ul (`encodeURIComponent`); cache SW nomia-v6; teste pentru `?nhi=`.
- **0.9.0 — 14 octombrie 2026:** citirea jurnalului cu voce (FFF.tts); etichetă de transparență și copie .fff.json (kit comun); cache SW nomia-v5; teste `tests/fff-r8.test.mjs`.

- **0.8.58 — 2026-10-12:** versiunea și data ultimei actualizări sunt afișate în aplicație (panoul „Statistici · Setări”)
- **0.8.57 — 11 octombrie 2026:** Escape închide acum banner-ul „Bine ai venit” (textul îl anunța, dar tasta nu făcea nimic), iar banner-ul se închide singur când alegi un NHI (nu mai acoperă jurnalul); canalele incompatibile cu profilul unui NHI au în bara de jos explicația în `title`, iar alegerea lor scrie în jurnal motivul și lista canalelor compatibile (înainte: doar chenar punctat); CSP recalculat; 0 erori, axe 0 violări la 1280×800 și 360×740. Dialogurile-șablon și `style-src 'unsafe-inline'` rămân neschimbate (decizie de conținut / atribute style numeroase).
- **0.8.56 — 11 octombrie 2026:** cele 168 de handlere inline (`onclick`, `onkeydown`, `oninput`, `onmouseover/out`) sunt înlocuite cu un singur dispecer delegat (`data-onclick` etc. + argumente literale în `data-arg`; fără `eval`/`Function`); paritate verificată prin Playwright (aceleași apeluri de funcții, aceleași argumente și aceeași stare a paginii pentru 156.189 de evenimente simulate, pe 17 stări ale interfeței); CSP cu `script-src 'self'` + hash-uri SHA-256, fără `'unsafe-inline'` pentru script (și fără `blob:` la scripturi); textele de protocol cu habitatul tăiat în paranteză („Africa Centrală (Congo.”) sunt completate cu valoarea întreagă din date (14 șiruri, 7 NHI); toast-ul „Copiat/Copied” la copierea unei linii din log urmează acum limba aplicației. Stilurile inline (`style-src 'unsafe-inline'`) rămân.
- **0.8.55 — 11 octombrie 2026:** cât timp o foaie (NHI Browser, meniu, statistici) este deschisă, un clic pe REIA / STOP / ⏸ / »STEP vizibile prin backdrop închide foaia și acționează butonul (înainte backdrop-ul „înghițea” clicul; CLR rămâne neacționat, fiind distructiv); textele din log nu se mai taie în mijlocul cuvintelor (de ex. „name-lik.”) — tăierea se face acum la limită de cuvânt (29 de locuri în șabloanele de dialog + nota de evidență); cache-ul service worker devine `nomia-v4`.
- Accesibilitate: barele laterale sunt `nav` (rolul `navigation` nu era permis pe `aside`), banner-ul de bun venit și widgetul de sprijin au repere; axe-core: 0 violări la 1280×800 și 360×740. Cele 166 de handlere inline au fost eliminate în 0.8.56 (vezi mai sus). Testele din `tests/` (Python) nu au fost rulate aici (mediul are doar Node/Playwright); verificarea s-a făcut cu Playwright/Node: fără erori JS, sintaxa scripturilor validă, fluxul „foaie deschisă → REIA” funcțional.
