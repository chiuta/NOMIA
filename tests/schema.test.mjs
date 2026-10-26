// NOMIA 1.0.0 — schema datelor înghețată (schema 1): export complet, validare, compatibilitate cu backup-ul vechi (format 1).
import {createRequire} from 'module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
let pass = 0, fail = 0;
const ok = (c, n, i) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (i === undefined ? '' : ' ' + JSON.stringify(i).slice(0, 300))); } };
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || process.env.CHROME || undefined, args: ['--no-sandbox']});
const ctx = await browser.newContext({viewport: {width: 1280, height: 800}, locale: 'ro-RO', acceptDownloads: true});
const reqs = [], errs = [];
await ctx.route(/^https?:/, r => { reqs.push(r.request().url()); r.abort(); });
const page = await ctx.newPage();
page.on('pageerror', e => errs.push(e.message));
await page.goto('file://' + path.join(HERE, '..', 'index.html'));
await page.waitForTimeout(2500);
console.log('NOMIA — schema 1');
const S = await page.evaluate(() => ({schema: NOMIA_SCHEMA.schema, format: NOMIA_SCHEMA.format, n: NOMIA_SCHEMA.keys.length, frozen: Object.isFrozen(NOMIA_SCHEMA) && Object.isFrozen(NOMIA_SCHEMA.keys) && Object.isFrozen(NOMIA_SCHEMA.keys[0])}));
ok(S.schema === 1 && S.format === 2, 'schema 1 / format 2', S);
ok(S.frozen, 'registrul este înghețat');
ok(S.n >= 20, 'registru cu ≥ 20 chei', S.n);
// populare cu date valide
const SEED = {
  nomia_history: JSON.stringify([{id: 'sefirot', ts: '2026-10-01T10:00:00.000Z', cat: 'Tradiții esoterice'}]),
  nomia_protocols: '3', nomia_streak: '2', nomia_last_visit: '2026-10-01',
  nomia_protocol_nhi_log: JSON.stringify([{nhi: 'sefirot', ch: 1, tip: 0, ts: '2026-10-01T10:00:00.000Z'}]),
  nomia_favorites: JSON.stringify(['sefirot']), nomia_fav_dates: JSON.stringify({sefirot: '2026-10-01'}),
  nomia_pins: JSON.stringify(['sefirot']), nomia_nhi_notes: JSON.stringify({sefirot: 'notă proprie ăîșț'}),
  nomia_saved_searches: JSON.stringify(['delfin']), nomia_monthly_snapshots: JSON.stringify([{month: '2026-10', explored: 1, protocols: 3, streak: 2}]),
  nomia_dark: '1', nomia_font_size: '13', nomia_ms_10: '1'
};
await page.evaluate(d => { Object.keys(d).forEach(k => localStorage.setItem(k, d[k])); }, SEED);
const B = await page.evaluate(() => buildBackup());
ok(B.app === 'NOMIA' && B.format === 2 && B.schema === 1, 'antet backup', [B.app, B.format, B.schema]);
ok(B.appVersion === JSON.parse(require('fs').readFileSync(path.join(HERE, '..', 'app.json'), 'utf8')).version, 'appVersion = app.json');
ok(Object.keys(SEED).every(k => B.data[k] === SEED[k]), 'toate cheile populate sunt în export, identice');
ok(Object.keys(B.data).every(k => !/idmig|version$/.test(k)), 'cheile interne nu sunt exportate', Object.keys(B.data));
const V = await page.evaluate(b => validateBackup(b), B);
ok(V.ok && V.rejected.length === 0 && V.accepted.length === Object.keys(B.data).length, 'backup-ul propriu validează integral', V);
// format 1 (vechi)
const V1 = await page.evaluate(b => validateBackup({app: 'NOMIA', format: 1, exported: 'x', data: b.data}), B);
ok(V1.ok && V1.rejected.length === 0, 'format 1 (vechi) este acceptat');
// schemă mai nouă
const VN = await page.evaluate(b => validateBackup({app: 'NOMIA', format: 2, schema: 2, data: b.data}), B);
ok(!VN.ok && VN.error === 'newer', 'schema 2 refuzată (versiune mai nouă)', VN);
// ostile / invalide
const BAD = {app: 'NOMIA', format: 2, schema: 1, data: {
  nomia_history: '[{"id":1}]', nomia_protocols: '-5', nomia_pins: '{"a":1}', nomia_dark: 'da', nomia_font_size: '999',
  nomia_ui_lang: '<script>', nomia_unknown_key: 'x', nomia_nhi_notes: 'not json', nomia_ms_abc: '1', altceva: 'y', nomia_favorites: '["ok"]'}};
const VB = await page.evaluate(b => validateBackup(b), BAD);
ok(VB.accepted.length === 1 && VB.accepted[0] === 'nomia_favorites', 'doar cheia validă e acceptată', VB);
ok(VB.rejected.length === 9 && !VB.rejected.some(r => r.key === 'altceva'), 'invalidele sunt respinse, cheile străine ignorate', VB.rejected.length);
ok((await page.evaluate(() => [validateBackup(null).error, validateBackup({app: 'X', data: {}}).error, validateBackup({app: 'NOMIA', data: []}).error, validateBackup({app: 'NOMIA', data: {}}).error].join()) === 'format,format,format,empty'), 'intrări goale/greșite');
// ciclu complet: șterge, importă prin UI
const file = '/tmp/nomia-schema-test-' + process.pid + '.json';
require('fs').writeFileSync(file, JSON.stringify(B));
await page.evaluate(() => { Object.keys(localStorage).filter(k => k.indexOf('nomia') === 0).forEach(k => localStorage.removeItem(k)); });
const [chooser] = await Promise.all([page.waitForEvent('filechooser'), page.evaluate(() => importBackup())]);
await chooser.setFiles(file);
await page.waitForSelector('#ff-ask, [role=dialog]', {timeout: 5000}).catch(() => {});
const txt = await page.evaluate(() => (document.querySelector('dialog.fff-dlg') || document.body).innerText.slice(0, 400));
ok(/Imporți datele/.test(txt), 'dialogul propriu de import cere confirmarea', txt);
await Promise.all([page.waitForNavigation({timeout: 8000}).catch(() => {}), page.click('dialog .fff-primary, .fff-primary')]);
await page.waitForTimeout(1500);
const SKIP = ['nomia_streak', 'nomia_last_visit']; // actualizate de aplicație la încărcare
const after = await page.evaluate(([d, sk]) => Object.keys(d).filter(k => !sk.includes(k)).every(k => localStorage.getItem(k) === d[k]), [SEED, SKIP]);
ok(after, 'după import, datele sunt restaurate identic', await page.evaluate(([d, sk]) => Object.keys(d).filter(k => !sk.includes(k) && localStorage.getItem(k) !== d[k]), [SEED, SKIP]));
// export schemă
await page.evaluate(() => { const m = document.getElementById('nomia-disclaimer'); if (m) m.style.display = 'none'; });
const [dl] = await Promise.all([page.waitForEvent('download'), page.evaluate(() => exportSchema())]);
const sj = JSON.parse(require('fs').readFileSync(await dl.path(), 'utf8'));
ok(sj.schema === 1 && Array.isArray(sj.keys) && sj.keys.some(k => k.key === 'nomia_history'), 'exportul schemei are chei documentate');
ok(sj.keys.every(k => k.description && k.type && k.group), 'fiecare cheie are tip, grup și descriere');
ok(errs.length === 0, '0 erori JS', errs);
ok(reqs.length === 0, '0 cereri de rețea', reqs);
require('fs').unlinkSync(file);
await browser.close();
console.log(`\n${pass} reușite, ${fail} eșuate`);
process.exit(fail ? 1 : 0);
