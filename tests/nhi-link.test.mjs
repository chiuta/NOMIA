// NOMIA — teste pentru linkul ?nhi=<id> (Unicode \p{L}, ostile, „Copiază link”). Playwright, Chromium headless, rețea blocată.
// Rulare: node tests/nhi-link.test.mjs   (playwright din /opt/node-tools sau PW_ROOT=/home/claude/pw/package.json)
import {createRequire} from 'module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const URL_APP = 'file://' + path.join(HERE, '..', 'index.html');
let pass = 0, fail = 0;
const ok = (c, n, i) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (i === undefined ? '' : ' ' + JSON.stringify(i).slice(0, 300))); } };
const errs = [];
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || process.env.CHROME || undefined, args: ['--no-sandbox']});
async function mk(o) {
  const ctx = await browser.newContext({viewport: {width: 1280, height: 800}, locale: 'ro-RO'});
  await ctx.route(/^https?:/, r => r.abort());
  const page = await ctx.newPage();
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(o.url);
  return {ctx, page};
}
console.log('NOMIA — ?nhi=');
// ?nhi=<id>: id-uri ASCII și cu diacritice (\p{L}), aliasuri, valori ostile, link generat de „Copiază link”
{
  const sel = page => page.evaluate(() => (typeof selNHI !== 'undefined' && selNHI) ? selNHI.id : null);
  for (const id of ['murmurații', 'leopard-nebuloși']) {
    const {ctx, page} = await mk({url: URL_APP + '?nhi=' + encodeURIComponent(id)}); await page.waitForTimeout(3800);
    ok((await sel(page)) === id, `?nhi=${id} (codificat) deschide inteligența`, await sel(page)); await ctx.close();
  }
  { const {ctx, page} = await mk({url: URL_APP + '?nhi=murmura%C8%9Bii'}); await page.waitForTimeout(3800);
    const id = await page.evaluate(() => (NHI_DATA.find(n => /^murmura/.test(n.id)) || {}).id);
    ok((await sel(page)) === id && !!id, '?nhi=murmura%C8%9Bii selectează murmurațiile', {id, sel: await sel(page)}); await ctx.close(); }
  { const {ctx, page} = await mk({url: URL_APP + '?nhi=' + encodeURIComponent('<img src=x onerror=alert(1)>')}); await page.waitForTimeout(3800);
    ok((await sel(page)) === null, '?nhi= ostil e ignorat'); await ctx.close(); }
  { const {ctx, page} = await mk({url: URL_APP + '?nhi=__proto__'}); await page.waitForTimeout(3800);
    ok((await sel(page)) === null, '?nhi=__proto__ ignorat'); await ctx.close(); }
  { const {ctx, page} = await mk({url: URL_APP + '?nhi=' + encodeURIComponent('murmurații')}); await page.waitForTimeout(3800);
    const url = await page.evaluate(() => { let got = ''; Object.defineProperty(navigator, 'clipboard', {value: {writeText: u => { got = u; return Promise.resolve(); }}, configurable: true}); shareNHI('murmurații'); return got; });
    ok(/\?nhi=murmura%C8%9Bii$/.test(url), 'Copiază link codifică id-ul', url); await ctx.close(); }
}

ok(errs.length === 0, 'fără pageerror', errs);
console.log(`\n${pass} ok, ${fail} eșuate`); await browser.close(); process.exit(fail ? 1 : 0);
