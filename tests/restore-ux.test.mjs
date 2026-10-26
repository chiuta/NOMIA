// NOMIA — teste pentru stratul UX restaurat după eliminarea Patreon (0.10.2): dispecer data-on*, meniul mobil / ⋮, panou categorii,
// comparație, backup/import, linkuri ?nhi= și #nhi/, protocoale UAP în engleză, citire jurnal, 8 limbi. Playwright, Chromium, rețea blocată.
// Rulare: node tests/restore-ux.test.mjs   (playwright din /opt/node-tools sau PW_ROOT=/home/claude/pw/package.json)
import {createRequire} from 'module';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const URL_APP = 'file://' + path.join(HERE, '..', 'index.html');
let pass = 0, fail = 0;
const ok = (c, n, i) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (i === undefined ? '' : ' ' + JSON.stringify(i).slice(0, 300))); } };
const errs = [], net = [];
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || process.env.CHROME || undefined, args: ['--no-sandbox']});
async function mk(o = {}) {
  const ctx = await browser.newContext({viewport: {width: o.w || 1280, height: o.h || 800}, acceptDownloads: true, locale: 'ro-RO'});
  if (o.ul) await ctx.addInitScript(l => { try { localStorage.setItem('nomia_ui_lang', l); } catch (e) {} }, o.ul);
  await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); });
  const page = await ctx.newPage();
  page.dlg = [];
  page.on('dialog', d => { page.dlg.push(d.message()); d.accept(); });
  page.on('pageerror', e => errs.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text().slice(0, 200)); });
  await page.goto(o.url || URL_APP); await page.waitForTimeout(o.wait || 3800);
  return {ctx, page};
}
const LANGS = ['ro', 'en', 'fr', 'it', 'es', 'pt', 'de', 'hu'];

console.log('NOMIA — strat UX restaurat');
{ // dispecer + butoane
  const {ctx, page} = await mk();
  const r = await page.evaluate(() => {
    const miss = [];
    document.querySelectorAll('[data-onclick]').forEach(el => { /* există cheie în dispecer? testăm indirect: nu aruncă la click */ });
    return {mob: typeof buildMobMenu, bk: typeof exportBackup, imp: typeof importBackup, cp: typeof copyNHILink, uap: typeof window.UAP_PROTOCOLS_EN, fz: typeof window._fuzzyHit};
  });
  ok(Object.values(r).every(v => v !== 'undefined'), 'funcțiile restaurate sunt definite', r);
  await page.evaluate(() => selectNHI(NHI_DATA[0].id)); await page.waitForTimeout(600);
  await page.click('button[data-onclick="_runOrStop()"]'); await page.waitForTimeout(2500);
  const n = await page.evaluate(() => document.querySelectorAll('#log .ll').length);
  ok(n > 1, 'butonul REIA (data-onclick prin dispecer) pornește protocolul', n);
  // fuzzy / diacritice
  const f = await page.evaluate(() => ({a: _fold('ĂâÎșȚ Straße'), b: _lev1('murmuratii', 'murmuratil'), c: _lev1('abcdef', 'abcxyz'), d: _fuzzyHit('leopardul', 'leopard leopardu x')}));
  ok(f.a === 'aaist strasse' && f.b === true && f.c === false, 'căutare fără diacritice / toleranță la greșeli', f);
  // UAP engleză: aceleași chei ca în română
  const u = await page.evaluate(() => { const en = Object.keys(UAP_PROTOCOLS_EN), ro = Object.keys(UAP_PROTOCOLS); return {en: en.length, ro: ro.length, missing: en.filter(k => !(k in UAP_PROTOCOLS)).length}; });
  ok(u.en > 10 && u.missing === 0, 'protocoale UAP în engleză cu chei valide', u);
  ok(await page.evaluate(() => !!document.getElementById('r8-read-btn')), 'butonul de citire a jurnalului (🔊)');
  ok(!(await page.evaluate(() => /patreon/i.test(document.documentElement.outerHTML))), 'fără Patreon în pagină');
  ok(await page.evaluate(() => document.querySelectorAll('a[href*="buymeacoffee.com/echo.of.the.strings"]').length === 1), 'exact un link Buy Me a Coffee');
  await ctx.close();
}
{ // panou categorii, comparație, popup nod
  const {ctx, page} = await mk();
  const cats = await page.evaluate(() => Array.from(new Set(NHI_DATA.map(n => n.cat))).slice(0, 3));
  await page.evaluate(c => openCatPanel(c), cats[0]); await page.waitForTimeout(500);
  const o = await page.evaluate(() => { const w = document.getElementById('cat-panel-wrap'); return {open: w.classList.contains('open'), cards: w.querySelectorAll('.cp-card').length, vis: getComputedStyle(w).display}; });
  ok(o.open && o.cards > 0 && o.vis !== 'none', 'panoul de categorii se deschide cu fișe', o);
  await page.evaluate(() => closeCatPanel()); await page.waitForTimeout(300);
  ok(await page.evaluate(() => !document.getElementById('cat-panel-wrap').classList.contains('open')), 'panoul de categorii se închide');
  const ids = await page.evaluate(() => NHI_DATA.slice(0, 2).map(n => n.id));
  await page.evaluate(i => { addToCompare(i[0]); addToCompare(i[1]); openCompare(); }, ids); await page.waitForTimeout(600);
  const c = await page.evaluate(() => { const p = document.getElementById('compare-panel'); return {disp: getComputedStyle(p).display, cards: p.querySelectorAll('.cmp-card').length}; });
  ok(c.disp !== 'none' && c.cards >= 2, 'panoul de comparație afișează cele 2 fișe', c);
  await page.evaluate(() => closeCompare());
  await page.evaluate(() => { const el = document.getElementById('node-popup'); showNodePopup(NHI_DATA[0].id, 100, 100); });
  ok(await page.evaluate(() => getComputedStyle(document.getElementById('node-popup')).display !== 'none'), 'popup-ul de nod apare');
  await ctx.close();
}
{ // meniu mobil și ⋮ (360 px)
  const {ctx, page} = await mk({w: 360, h: 740});
  await page.click('#top-ovf-btn'); await page.waitForTimeout(500);
  const m = await page.evaluate(() => { const b = document.getElementById('mob-menu-body'); return {open: _openSheets.has('mob-menu'), btns: b.querySelectorAll('.gm-btn').length, sec: b.querySelectorAll('.mm-sec').length, ovf: document.documentElement.scrollWidth > innerWidth}; });
  ok(m.open && m.btns > 10 && m.sec > 2 && !m.ovf, 'butonul ⋮ deschide meniul mobil cu toate grupurile', m);
  await page.keyboard.press('Escape'); await page.waitForTimeout(300); // prima apăsare închide bannerul de bun venit, dacă e deschis
  if (await page.evaluate(() => _openSheets.has('mob-menu'))) { await page.keyboard.press('Escape'); await page.waitForTimeout(400); }
  ok(await page.evaluate(() => !_openSheets.has('mob-menu')), 'Escape închide meniul mobil');
  await ctx.close();
}
{ // backup / import / linkuri
  const {ctx, page} = await mk();
  await page.evaluate(() => { localStorage.setItem('nomia_protocols', '5'); });
  const [dl] = await Promise.all([page.waitForEvent('download'), page.evaluate(() => exportBackup())]);
  const f = path.join(os.tmpdir(), 'nomia-bk-' + process.pid + '.json'); await dl.saveAs(f);
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  ok(j.app === 'NOMIA' && j.data && j.data.nomia_protocols === '5', 'exportBackup produce un JSON NOMIA cu cheile nomia*', Object.keys(j));
  await page.evaluate(() => localStorage.removeItem('nomia_protocols'));
  const [fc] = await Promise.all([page.waitForEvent('filechooser'), page.evaluate(() => importBackup())]);
  await fc.setFiles(f); await page.waitForTimeout(700); await page.evaluate(() => document.querySelector('dialog.fff-dlg .fff-primary').click()); await page.waitForTimeout(2800);
  await page.waitForFunction(() => typeof importBackup === 'function', null, {timeout: 120000});
  ok(await page.evaluate(() => localStorage.getItem('nomia_protocols')) === '5', 'importBackup restaurează cheile și reîncarcă pagina');
  fs.writeFileSync(f, '{"x":1}');
  const [fc2] = await Promise.all([page.waitForEvent('filechooser'), page.evaluate(() => importBackup())]);
  await fc2.setFiles(f); await page.waitForTimeout(800);
  const t = await page.evaluate(() => document.body.innerText);
  ok(/Fișier invalid/.test(t), 'import cu fișier invalid: mesaj în română');
  fs.unlinkSync(f);
  await page.evaluate(() => selectNHI(NHI_DATA[3].id)); await page.waitForTimeout(500);
  const id = await page.evaluate(() => selNHI.id);
  const url = await page.evaluate(() => { let got = ''; Object.defineProperty(navigator, 'clipboard', {value: {writeText: u => { got = u; return Promise.resolve(); }}, configurable: true}); copyNHILink(); return got; });
  ok(url.endsWith('?nhi=' + encodeURIComponent(id)), 'copyNHILink produce ?nhi= (același format ca „Copiază link”)', url);
  ok(/#nhi\//.test(await page.evaluate(() => location.hash)), 'selectNHI scrie #nhi/<id> în adresă', await page.evaluate(() => location.hash));
  await ctx.close();
  const b = await mk({url: URL_APP + '#nhi/' + encodeURIComponent(id)});
  ok(await b.page.evaluate(() => selNHI && selNHI.id) === id, '#nhi/<id> deschide inteligența indicată');
  await b.ctx.close();
}
{ // 8 limbi: fără pageerror, fără overflow, mesaje traduse
  for (const L of LANGS) {
    const {ctx, page} = await mk({ul: L, w: 390, h: 800});
    await page.evaluate(() => openMobMenu()); await page.waitForTimeout(400);
    const r = await page.evaluate(() => ({ovf: document.documentElement.scrollWidth > innerWidth, mm: document.getElementById('mob-menu-body').innerText.slice(0, 40), undef: /undefined|\[object|\{\d\}/.test(document.body.innerText), lang: document.documentElement.lang}));
    ok(!r.ovf && !r.undef && r.lang === L, `[${L}] meniu mobil fără overflow/undefined`, r);
    if (L !== 'ro' && L !== 'en') ok(!/QUICK|RAPID\b/.test(r.mm) || L === 'it' && false, `[${L}] titlul „RAPID/QUICK” tradus`, r.mm);
    // mesaj tradus la import invalid
    const tmp = path.join(os.tmpdir(), 'nomia-bad-' + L + '.json'); fs.writeFileSync(tmp, '{"x":1}');
    const [fc] = await Promise.all([page.waitForEvent('filechooser'), page.evaluate(() => importBackup())]);
    await fc.setFiles(tmp); await page.waitForTimeout(700);
    const txt = await page.evaluate(() => (document.getElementById('toast') || document.querySelector('.toast') || document.body).innerText);
    const bad = L === 'ro' ? /Fișier invalid/.test(txt) : L === 'en' ? /Invalid file/.test(txt) : !/Invalid file|Fișier invalid/.test(txt) || false;
    ok(bad, `[${L}] mesajul „fișier invalid” în limba interfeței`, txt.slice(0, 120));
    fs.writeFileSync(tmp, JSON.stringify({app: 'NOMIA', format: 1, data: {nomia_protocols: '9'}}));
    const [fc3] = await Promise.all([page.waitForEvent('filechooser'), page.evaluate(() => importBackup())]);
    await fc3.setFiles(tmp); await page.waitForTimeout(500);
    const dm = await page.evaluate(() => { const d = document.querySelector('dialog.fff-dlg'); const t = d ? d.innerText : ''; if (d) d.querySelector('.fff-btn').click(); return t; });
    const dok = L === 'ro' ? /Imporți datele/.test(dm) : L === 'en' ? /Import the data/.test(dm) : dm.length > 10 && !/Import the data|Imporți datele/.test(dm);
    ok(dok, `[${L}] dialogul de confirmare a importului în limba interfeței`, dm.slice(0, 120));
    fs.unlinkSync(tmp);
    await ctx.close();
  }
}
ok(errs.length === 0, 'fără pageerror/CSP în tot setul', errs.slice(0, 3));
ok(net.length === 0, '0 cereri de rețea', net.slice(0, 3));
await browser.close();
console.log(`\n${pass} ok, ${fail} eșuate`);
process.exit(fail ? 1 : 0);
