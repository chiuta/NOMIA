# NOMIA — schema datelor (schema 1, înghețată la 1.0.0)

NOMIA stochează totul local, în `localStorage`, sub chei care încep cu `nomia_`. Nu există server și nu se trimite nimic în rețea.
Începând cu **1.0.0** formatul este înghețat: cheile de mai jos își păstrează numele, tipul și sensul. O schimbare de format cere un număr nou de schemă (`schema: 2`), iar importul rămâne compatibil înapoi.

## Backup complet (JSON)

Meniul Export → „Backup complet (JSON)” produce `nomia-backup-AAAA-LL-ZZ.json`:

```json
{ "app": "NOMIA", "format": 2, "schema": 1, "appVersion": "1.0.0",
  "exported": "2026-10-26T12:00:00.000Z", "keys": 14,
  "data": { "nomia_history": "[{\"id\":\"sefirot\",...}]", "nomia_protocols": "3", ... } }
```

- Toate valorile din `data` sunt **șiruri** (exact ce e în `localStorage`); tipul `json` înseamnă JSON serializat în șir.
- Sunt exportate doar cheile din registrul de mai jos. Cheile interne (`nomia_version`, `nomia_idmig1`, datele de sesiune/undo) nu sunt exportate.
- Formatul 1 (`{app, format: 1, exported, data}`, fără `schema`) este în continuare acceptat la import.
- Un backup cu `schema` mai mare de 1 este refuzat cu mesaj („versiune mai nouă”).

## Import

„Importă backup” validează fiecare cheie (tip, formă, limite de mărime) **înainte** de a scrie. Cheile necunoscute, cele care nu încep cu `nomia` și valorile invalide sunt ignorate; dialogul arată câte chei sunt valide și câte vor fi sărite. Importul înlocuiește valorile cheilor cu același nume, apoi reîncarcă pagina.

## Chei

| Cheie | Grup | Tip | Descriere |
|---|---|---|---|
| `nomia_history` | date | json | Istoricul explorărilor: listă (max 500) de {id, ts ISO, cat}, cele mai recente primele. |
| `nomia_protocols` | date | int | Contor: numărul de protocoale rulate. |
| `nomia_streak` | date | int | Contor: serie de zile consecutive. |
| `nomia_last_visit` | date | str | Ultima vizită (dată, text). |
| `nomia_protocol_nhi_log` | date | json | Jurnalul protocoalelor: listă (max 200) de {nhi, ch, tip, ts}. |
| `nomia_favorites` | date | json | Favorite: listă de id-uri de intrări. |
| `nomia_fav_dates` | date | json | Datele adăugării la favorite: obiect id → text dată. |
| `nomia_pins` | date | json | Intrări fixate: listă de id-uri. |
| `nomia_nhi_notes` | date | json | Notele proprii: obiect id → text. |
| `nomia_saved_searches` | date | json | Căutări salvate: listă (max 10) de texte. |
| `nomia_monthly_snapshots` | date | json | Instantanee lunare (max 24): {month AAAA-LL, explored, protocols, streak}. |
| `nomia_nhi_day` | date | json | Intrarea zilei: {id, date}. |
| `nomia_disc_v2` | preferințe | str | Avertisment acceptat: „accepted” sau „minor”. |
| `nomia_ui_lang` | preferințe | str | Limba interfeței (ro, en, fr, it, es, pt, de, hu). |
| `nomia_dark` | preferințe | flag | Tema întunecată: „1” sau gol. |
| `nomia_night` | preferințe | flag | Modul de noapte: „1” sau gol. |
| `nomia_stacked` | preferințe | flag | Afișare stivuită: „1” sau gol. |
| `nomia_split` | preferințe | flag | Afișare împărțită: „1” sau gol. |
| `nomia_autorun` | preferințe | flag | Rulare automată: „1” sau gol. |
| `nomia_font_size` | preferințe | int | Dimensiunea fontului jurnalului (px, 8–32). |
| `nomia_tutorial_done` | preferințe | flag | Tutorial parcurs. |
| `nomia_ms_<N>` | preferințe | flag | Reper atins (`nomia_ms_<N>`): „1”. |

„date” = conținut creat de utilizator sau progres; „preferințe” = setări de aspect/limbă.

## Citire programatică

În consola browserului: `NOMIA_SCHEMA` (obiect înghețat cu cheile), `buildBackup()` (obiectul de export), `validateBackup(obj)` (validare fără scriere → `{ok, accepted, rejected, error}`). Butonul „Schema datelor (JSON)” din meniul Export descarcă registrul ca `nomia-schema-1.json`.

## Garanții de stabilitate (testate)

`tests/schema.test.mjs` verifică: registrul înghețat, un ciclu complet export → ștergere → import, acceptarea formatului 1, respingerea schemei mai noi și a valorilor ostile sau malformate, zero erori JS și zero cereri de rețea.
