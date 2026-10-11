# NOMIA — Om·IA·NHI

**Ficțiune / speculație (Fiction / speculation).** Aplicație conceptuală, companion al antologiei *Printre inteligențe* (2026). Protocoalele, scorurile și „sesiunile” sunt modele narative și conceptuale, nu fapte verificate.

## Ce este

NOMIA este o aplicație single-file (`index.html`, PWA) care simulează „protocoale de contact” trilogice Om–IA–NHI (inteligențe non-umane) pe 5 canale (matematic, intuiție, simbolic, sincronicități, modificarea stării), în română și engleză. Catalogul conține 1001 de intrări, în 14 categorii: animale (primate, cetacee, mamifere, păsări, cefalopode, insecte, faună din România), entități colective și non-neuronale, „Tradiții esoterice”, „Tradiții religioase” și „Ipoteze moderne” (inclusiv ipoteze despre UAP/NHI). Intrările despre animale se bazează pe literatură științifică citată în fișe; intrările esoterice, religioase și ipotezele despre UAP/NHI sunt prezentate ca idei, nu ca dovezi, iar fișele le marchează adesea ca speculative sau neconfirmate. Panoul „Axa B” avertizează explicit: „incertitudine epistemică ridicată”.

## Cum se folosește

1. Deschide `index.html` (sau instalează-l ca aplicație din browser).
2. Alege un NHI din „Alege NHI” (sau din meniul 🧬 / categorii) și un canal.
3. Apasă ▶ REIA pentru a rula protocolul linie cu linie; ■ STOP, ⏸ și »STEP controlează rularea.
4. Meniurile din bara laterală oferă comparații, statistici, jurnal, exporturi (TXT, Markdown, snapshot-uri) și setări (temă, limbă, mărime font).

## Ce date pleacă din browser

Niciuna. În cod nu există `fetch`/XHR/WebSocket și nici scripturi, fonturi sau imagini externe (CSP `default-src 'self'`). Singurele adrese externe sunt linkurile de sprijin (Patreon, Buy Me a Coffee). Preferințele, istoricul sesiunilor, notele și favoritele se păstrează doar în `localStorage` (chei `nomia_*`). Service worker-ul (`sw.js`) ține în cache doar fișierele aceleiași origini pentru funcționare offline.

## Limitări

- Conținut informativ și creativ; nu este sfat științific, medical sau juridic. Conținutul esoteric/religios nu are validare științifică.
- Texte generate din șabloane: rezultatele „protocolului” nu sunt măsurători.

## Fișiere

- `index.html` — aplicația; `manifest.webmanifest`, `sw.js`, `icon-*.png` — PWA.
- `tests/` — teste Playwright (a se vedea `tests/README.md`).

## Licență

CC0 1.0 Universal (domeniu public) — vezi fișierul LICENSE. Declarată în antetul `index.html`.

**NOTICE – conținut cu coautor.** Dedicarea CC0 se aplică codului aplicației și textelor scrise de Alexandru-Ionuț Chiuță. Fragmentele care provin din Anexa I, Cap. 14 a antologiei *Printre inteligențe* (2026, semnat Urzică & Chiuță) sunt opera a doi coautori; coautorul nu a confirmat (în materialele auditate) dedicarea CC0 pentru partea sa, iar acest repository nu o presupune. Titlurile și numele unor opere terțe (de ex. *Solaris*, *Norul Negru*, *Monolitul*, *Prima Directivă*) aparțin deținătorilor lor și sunt folosite descriptiv.

## Audit

Audit: 2026-10-10. Corecturi de accesibilitate (roluri ARIA, contrast în temele luminoasă și întunecată, etichete) și adăugarea notei „Ficțiune / speculație” în aplicație.

## Autor

Alexio — Alexandru-Ionuț Chiuță, contact: alexio@trom.tf.
