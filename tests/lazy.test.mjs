// NOMIA — pachete de limbă și date la cerere (0.10.17): încărcare lazy, cache în service worker, offline, fallback fără pachet.
// Rulare: node tests/lazy.test.mjs   (PW_ROOT=/home/claude/pw/package.json CHROME=/cale/chrome)
import {createRequire} from 'module';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || '/opt/node-tools/package.json');
const {chromium} = require('playwright');
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
let pass = 0, fail = 0;
const ok = (c, n, i) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (i === undefined ? '' : ' ' + JSON.stringify(i).slice(0, 300))); } };
const MIME = {'.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.webmanifest': 'application/manifest+json'};
const srv = http.createServer((q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); r.end(); return; }
  r.writeHead(200, {'content-type': MIME[path.extname(f)] || 'application/octet-stream'}); fs.createReadStream(f).pipe(r);
});
await new Promise(res => srv.listen(0, '127.0.0.1', res));
const BASE = 'http://127.0.0.1:' + srv.address().port + '/';
const browser = await chromium.launch({executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--no-sandbox']});
const errs = [];
async function mk(ul, extra) {
  const ctx = await browser.newContext({viewport: {width: 1280, height: 800}, locale: 'ro-RO'});
  await ctx.addInitScript(l => { try { localStorage.setItem('nomia_ui_lang', l); localStorage.setItem('nomia_tutorial_done', '1'); } catch (e) {} }, ul);
  const page = await ctx.newPage(); page.reqs = [];
  page.on('request', r => page.reqs.push(r.url().replace(BASE, '')));
  page.on('pageerror', e => errs.push(e.message));
  if (extra) await extra(ctx, page);
  await page.goto(BASE); await page.waitForTimeout(2500);
  return {ctx, page};
}
console.log('NOMIA — pachete la cerere');
console.log('  index.html: ' + (fs.statSync(ROOT + '/index.html').size / 1e6).toFixed(2) + ' MB');
ok(fs.statSync(ROOT + '/index.html').size < 5e6, 'index.html < 5 MB');

// 1) fr: doar keys + fr; variants nu se cer la start
{
  const {ctx, page} = await mk('fr');
  const r = page.reqs.filter(u => /^(i18n|data)\//.test(u));
  ok(r.some(u => u.startsWith('i18n/keys.js')) && r.some(u => u.startsWith('i18n/fr.js')), 'fr: se cer keys + fr', r);
  ok(!r.some(u => /i18n\/(de|hu|it|es|pt)\.js/.test(u)) && !r.some(u => u.startsWith('data/')), 'fr: nu se cer alte limbi / variants', r);
  const t = await page.evaluate(() => ({ul: NomiaI18n.get(), has: NomiaI18n.tr('Selectează un NHI din panou.'), wait: document.documentElement.classList.contains('ni-wait'), op: getComputedStyle(document.body).opacity}));
  ok(t.ul === 'fr' && /Sélectionn/i.test(t.has) && !t.wait && t.op === '1', 'fr: text tradus, pagină vizibilă', t);
  // variantele: la prima folosire
  await page.evaluate(() => { selectNHI('delfini'); });
  await page.waitForTimeout(600);
  await page.evaluate(() => initiateIA_NHI());
  await page.waitForTimeout(2500);
  ok(page.reqs.some(u => u.startsWith('data/variants.js')), 'variants.js cerut la prima folosire');
  const n = await page.evaluate(() => ({ia: typeof PROTOCOLS_IA.delfini, nia: typeof PROTOCOLS_NHI_IA.delfini, inv: typeof PROTOCOLS_INV.delfini}));
  ok(n.ia === 'object' && n.nia === 'object' && n.inv === 'object', 'variantele încărcate', n);
  const logTxt = await page.evaluate(() => (document.querySelector('#log, .log, [id*=log]') || document.body).innerText.length);
  ok(logTxt > 100, 'jurnalul are conținut');
  // schimbare limbă -> se cere de.js
  await page.evaluate(() => NomiaI18n.set('de')); await page.waitForTimeout(2000);
  ok(page.reqs.some(u => u.startsWith('i18n/de.js')), 'de.js cerut la schimbarea limbii');
  ok(await page.evaluate(() => /Wähle|Wählen|Wähle/.test(NomiaI18n.tr('Selectează un NHI din panou.'))), 'de tradus după încărcare');
  await ctx.close();
}
// 2) ro: keys la idle; fără pachet de limbă
{
  const {ctx, page} = await mk('ro');
  await page.waitForTimeout(2500);
  const r = page.reqs.filter(u => /^i18n\//.test(u));
  ok(r.length === 1 && r[0].startsWith('i18n/keys.js'), 'ro: doar keys.js', r);
  await ctx.close();
}
// 3) fallback: pachetul hu indisponibil -> mesaj, fără erori, text original
{
  const {ctx, page} = await mk('hu', async (c) => { await c.route(/i18n\/hu\.js/, r => r.abort()); });
  const m = await page.evaluate(() => ({note: [...document.querySelectorAll('[role=status]')].map(e => e.textContent).join('|'), op: getComputedStyle(document.body).opacity, tr: NomiaI18n.tr('Selectează un NHI din panou.')}));
  ok(/nyelvi csomag/.test(m.note), 'hu: notificare în limba aleasă', m);
  ok(m.op === '1' && m.tr === 'Selectează un NHI din panou.', 'hu: pagina rămâne utilizabilă, text original', m);
  await ctx.close();
}
// 4) service worker: cache + offline
{
  const {ctx, page} = await mk('en');
  await page.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, {timeout: 20000}).catch(() => {});
  await page.reload(); await page.waitForTimeout(1500);
  ok(await page.evaluate(() => !!navigator.serviceWorker.controller), 'SW controlează pagina');
  await page.waitForTimeout(22000); // prefetch în fundal (idle 8 s + 7 fișiere)
  const keys = await page.evaluate(async () => { const o = []; for (const k of await caches.keys()) for (const r of await (await caches.open(k)).keys()) o.push(new URL(r.url).pathname); return o; });
  ok(['keys', 'fr', 'it', 'es', 'pt', 'de', 'hu'].every(l => keys.some(k => k.endsWith('/i18n/' + l + '.js'))), 'toate pachetele în cache', keys.filter(k => /i18n|data/.test(k)));
  ok(keys.some(k => k.endsWith('/data/variants.js')), 'variants.js în cache');
  await ctx.setOffline(true);
  await page.reload(); await page.waitForTimeout(2500);
  await page.evaluate(() => NomiaI18n.set('it')); await page.waitForTimeout(2000);
  const o = await page.evaluate(() => ({ul: NomiaI18n.get(), t: NomiaI18n.tr('Selectează un NHI din panou.')}));
  ok(o.ul === 'it' && /Seleziona/i.test(o.t), 'offline: limba it din cache', o);
  await page.evaluate(() => { selectNHI('delfini'); }); await page.waitForTimeout(500);
  await page.evaluate(() => initiateInverse()); await page.waitForTimeout(2500);
  ok(await page.evaluate(() => typeof PROTOCOLS_INV.delfini === 'object'), 'offline: variantele din cache');
  await ctx.close();
}
ok(errs.length === 0, 'fără pageerror', errs.slice(0, 3));
console.log('\n' + pass + ' ok, ' + fail + ' eșuate');
await browser.close(); srv.close();
process.exit(fail ? 1 : 0);
