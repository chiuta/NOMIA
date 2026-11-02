# Jurnal de modificări — NOMIA

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
