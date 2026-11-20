# Jurnal de modificări — NOMIA

## 1.1.4 — 2026-11-19

- Detaliul NHI se randează în două containere (desktop și mobil): butonul de favorit, caseta de note și contorul de caractere aveau aceleași id-uri în ambele, iar contorul unei casete se actualiza în cealaltă. Id-urile au acum sufixul containerului, contorul își găsește elementul corect, iar caseta de note are etichetă accesibilă (constatat de bateria adversarială din 19 noiembrie 2026)
- Pachetele de limbă încărcate la cerere (`i18n/*.js`) poartă ștampila noii versiuni (1.1.4), cum cere pagina; `fff.config.json` le listează acum (`versionFiles`), așa că la următoarele release-uri sunt re-ștampilate automat de kit (fără re-ștampilare, pagina respinge pachetele și fr/it/es/pt/de/hu rămân în textul original)
- Kit fff 1.8.1: dacă stocarea locală este indisponibilă (mod privat, politică de browser), aplicația pornește cu o stocare temporară în memorie, în loc să se oprească

## 1.1.3 — 2026-11-18

- Corectat: pachetele de limbă din `i18n/` (cheile și fr, de, es, hu, it, pt) purtau identificatorul de construcție „1.0.9”, iar pagina cere identificatorul versiunii curente și ignoră pachetele cu alt identificator; textul rămânea în română (verificat în teste pentru fr, de și it). Pachetele poartă acum identificatorul 1.1.3, iar conținutul lor este neschimbat

## 1.1.2 — 2026-11-17

- Compatibilitate cu browsere mai vechi (Chrome/Edge 55+, Firefox 52+, Safari 10.1+/iOS 10.3+): kitul 1.8.0 aduce stratul de compatibilitate (rezerve pentru API-urile care lipsesc în motoarele vechi), iar sintaxa JavaScript mai nouă decât ES2017 a fost înlocuită cu forme echivalente acolo unde exista; expresiile regulate noi și `import()` trec prin rezerve. Fără modificări de funcționalitate intenționate. Verificat cu parser ES2017 și într-un motor vechi simulat, nu pe dispozitive reale.

## 1.1.1 — 2026-11-15

- Nou: butoane de distribuire pe rețele sociale (vertical, pe marginea din stânga; fără scripturi externe, doar linkuri deschise la clic); bara de zoom cu lupă și „potrivire ecran” revine pe marginea din dreapta, centrată pe verticală; corectat afișarea suprapusă la zoom mare (panourile cu înălțimi în vh/vw nu mai ies din ecran).

## 1.1.0 — 2026-11-15

- Nou: accesibilitate pe toate ecranele — butonul „Aa” (mărimea textului, contrast ridicat, fără animații, text lizibil, linkuri subliniate, citire cu voce), săgeata „Înapoi sus” și „Sari la conținut”; fereastra se potrivește mereu ecranului; zoom-ul cu lupă și „potrivire ecran” stau acum pe marginea din stânga (fff-kit 1.6.0).

## 1.0.9 — 2026-11-15

- Nou: texturi fractale hiper-detaliate (fff-texturi 1.1.2) — fundalul și suprafețele mari (carduri, panouri, antete, butoane; filele și dialogurile ascunse la încărcare, când se deschid) primesc un material generat local (WebGL2, fără rețea și fără imagini), care se repetă fără cusătură; culorile aplicației rămân ale ei. Se oprește din dialogul „Transparență” sau cu `?notex=1`.

## 1.0.2 — 2026-11-02 (reîmprospătare kit)

- Nou (kit): **Sincronizare între dispozitive** (`FFF.sync`) — în dialogul «Transparență» (clic pe versiune → Copie de siguranță): conectezi două dispozitive direct (WebRTC, cod/QR, fără server și fără cont) și își schimbă datele aplicației; cea mai recentă valoare câștigă, secretele (chei API, parole) nu se trimit, ștergerile nu se propagă. Aplicarea trece prin importul kitului (confirmare, chei permise, rollback).
- Nou (kit): **Istoric local — «mașina timpului»** (`FFF.history`) — instantanee automate ale datelor (IndexedDB, fără secrete), diferență față de starea curentă și restaurare reversibilă; «Șterge datele aplicației» șterge și istoricul.
- Module adăugate: `qr`, `p2p`, `sync`, `history` (+~140 KB). Versiunea aplicației nu se schimbă.

## 1.0.2 — 2026-10-31

### Localizare
- Ghidul ro/en: etichetele butoanelor (↕ NHI inițiază / NHI initiates, ⧡ IA→NHI / AI→NHI, ◄ NHI→IA / NHI→AI, ▶ RERUN) aliniate cu interfața.
- Ghidul scurt este tradus în fr, de, es, it, pt, hu (înainte afișa engleza); titlul pliantului și `aria-label`-ul urmează limba interfeței (fără „RO · EN” hardcodat).
- „Drepturi și atribuire”: în fr/it/es/pt/de/hu se afișează acum traducerea (existentă, dar ascunsă), cu versiunea de referință RO/EN într-un bloc pliabil; în ro/en rămân vizibile ambele versiuni de referință, fără mențiunea bilingvă din etichetă.
- Neschimbate intenționat: „Printre inteligențe”, „Prima Directivă”, P.1–P.7, numerele și formatarea HTML.

### Accesibilitate
- Indicatorul de salvare automată (💾) la 12 px în loc de 10 px, prag minim de lizibilitate pe mobil. `NOMIA_VERSION` aliniat cu `app.json`.
- Rămân circa 135 de declarații `font-size` sub 12 px în CSS; nu le-am schimbat în bloc, fiindcă un efect asupra aranjării nu poate fi verificat pe toate ecranele. Decizia de a le urca e a autorului.

## 1.0.1 — 2026-10-27 (anterior: 2.0.0)

Doar text (ghid), fără funcții noi de calcul.

- Ghid scurt pliabil pentru cei care nu au citit cartea (*Printre inteligențe*), ro + en, scris din conținutul real al aplicației: părțile Om/IA/NHI, tipurile de IA, catalogul, cele 5 canale, butoanele, limitele.
- Versiunea afișată în aplicație și în backup (`appVersion`) este 1.0.1; README: „Stare” și „Offline” (8 limbi).

Nu implementat:

- Rezumatul intrigei cărții: NU s-a scris (regulă: să nu se inventeze intriga; ghidul descrie doar aplicația).
- Ghidul în fr/it/es/pt/de/hu: nu s-a tradus (afișează textul englez). [Rezolvat în 1.0.2.]

Istoricul anterior (1.x–2.0.0) este în secțiunea „History” din README.md.
