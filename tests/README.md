# Teste NOMIA (Playwright / Chromium)

```
pip install playwright && playwright install chromium
python3 smoke.py        # 1001 NHI, protocoale pe toate canalele, RO+EN
python3 flow.py         # parcurs UI pe iPhone / tabletă / desktop
python3 base_audit.py   # overflow, ținte tactile, erori JS pe 5 dispozitive
python3 contrast.py     # contrast WCAG pe 9 ecrane × 2 teme
python3 perf.py         # timp de încărcare (CPU normal și throttling ×4)
python3 static_chk.py   # funcții/id-uri lipsă, variabile CSS nedefinite
```
Implicit testează `../index.html`; altfel: `NOMIA_FILE=/cale/index.html python3 smoke.py`.
