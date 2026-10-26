// Teste funcții noi (runda 8, 14 octombrie 2026) — Playwright, Chromium headless, rețea blocată.
// Rulare: node tests/fff-r8.test.mjs   (cere /opt/node-tools cu playwright și /opt/pw-browsers/chromium; axe-core opțional prin AXE_PATH)
// [fff-portable] axe-core: FFF_AXE / AXE_PATH, apoi pachetul `axe-core` (npm i -D axe-core). Dacă lipsește: undefined (testele cu axe pică cu mesaj clar).
import {createRequire as __fffCR} from 'node:module';
const __fffAxe = () => { try { return __fffCR(import.meta.url).resolve('axe-core/axe.min.js'); } catch { return undefined; } };
import {createRequire} from 'module';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const INDEX = path.join(HERE, '..', 'index.html');
const URL_APP = 'file://' + INDEX;
const AXE = process.env.AXE_PATH || __fffAxe();
const sleep = ms => new Promise(r => setTimeout(r, ms));
const __FFF_APP = JSON.parse(fs.readFileSync(path.join(HERE, '..', 'app.json'), 'utf8'));
let pass = 0, fail = 0;
const ok = (cond, name, info) => { if (cond) { pass++; console.log('  ok   ' + name); } else { fail++; console.log('  FAIL ' + name + (info === undefined ? '' : ' ' + JSON.stringify(info).slice(0, 500))); } };
const FLAGS = ['--no-sandbox', '--allow-loopback-in-peer-connection', '--disable-features=WebRtcHideLocalIpsWithMdns'];
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: FLAGS});
const net = [], errs = [];
async function mk(o = {}) {
  const ctx = await browser.newContext({viewport: {width: o.w || 1280, height: o.h || 800}, acceptDownloads: true, colorScheme: o.scheme || 'dark', reducedMotion: o.reduced ? 'reduce' : 'no-preference', locale: o.locale || 'ro-RO', bypassCSP: !!o.bypassCSP});
  await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); });
  if (o.init) await ctx.addInitScript(o.init);
  const page = await ctx.newPage();
  page.on('pageerror', e => errs.push('pageerror: ' + e.message));
  page.on('console', m => { const t = m.text(); if (m.type() === 'error' || /Content Security Policy|Refused to/i.test(t)) errs.push('console: ' + t); });
  if (o.goto !== false) await page.goto(o.url || URL_APP);
  return {ctx, page};
}
async function axeRun(page, sel) {
  if (!(await page.evaluate(() => !!window.axe))) await page.evaluate(fs.readFileSync(AXE, 'utf8') + '\n;0');
  return page.evaluate(async s => { const r = await window.axe.run(s ? document.querySelector(s) : document, {resultTypes: ['violations']}); return r.violations.map(v => v.id + ':' + v.nodes.map(n => n.target.join(' ')).slice(0, 3).join(' | ')); }, sel || null);
}
const noHScroll = page => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
// sintetizator vocal fals: înregistrează textele „citite”
const TTS_MOCK = () => {
  window.__spoken = [];
  class U { constructor(t) { this.text = t; this.voice = null; this.lang = ''; this.rate = 1; } }
  const V = [{name: 'Test RO', lang: 'ro-RO', voiceURI: 'ro', localService: true, default: true}, {name: 'Test EN', lang: 'en-US', voiceURI: 'en', localService: true, default: false}];
  const synth = {getVoices: () => V, speaking: false, addEventListener() {}, removeEventListener() {}, pause() {}, resume() {},
    cancel() { synth.speaking = false; }, speak(u) { synth.speaking = true; setTimeout(() => { window.__spoken.push({text: u.text, lang: u.lang}); synth.speaking = false; if (u.onstart) u.onstart({}); if (u.onend) u.onend({}); }, 5); }};
  Object.defineProperty(window, 'SpeechSynthesisUtterance', {value: U, configurable: true}); Object.defineProperty(window, 'speechSynthesis', {value: synth, configurable: true});
};
console.log('NOMIA — teste funcții noi (citirea jurnalului cu voce, kit)');
for (const [w, h] of [[1280, 800], [360, 740]]) {
  const {ctx, page} = await mk({w, h, init: TTS_MOCK});
  await page.waitForTimeout(3800);
  ok(await page.evaluate(() => !!(window.FFF && FFF.tts && FFF.bundle && FFF.label)), `kit încărcat (${w}x${h})`);
  ok(await noHScroll(page), `fără depășire orizontală ${w}x${h}`);
  const ax = await axeRun(page); ok(ax.length === 0, `axe 0 violări (start) ${w}x${h}`, ax);
  await ctx.close();
}
ok(errs.length === 0, 'fără pageerror/CSP la pornire', errs); ok(net.length === 0, '0 cereri de rețea la pornire', net);
{
  const {ctx, page} = await mk({init: TTS_MOCK});
  await page.waitForTimeout(3800);
  const vis = await page.locator('#r8-read-btn').isVisible();
  ok(vis, 'butonul de citire e vizibil');
  await page.evaluate(() => { document.getElementById('log').innerHTML = ''; });
  await page.locator('#r8-read-btn').click(); await page.waitForTimeout(300);
  ok((await page.evaluate(() => window.__spoken.length)) === 0, 'jurnal gol: nu se citește nimic');
  await page.evaluate(() => { addLog('om', 'Salut, aici omul.'); addLog('ia', 'Răspunsul inteligenței artificiale.'); addLog('nhi', 'Semnal recepționat.'); });
  await page.locator('#r8-read-btn').click(); await page.waitForTimeout(1500);
  const sp = (await page.evaluate(() => window.__spoken)).map(x => x.text).join(' | ');
  ok(/Salut, aici omul/.test(sp) && /Răspunsul inteligenței/.test(sp) && /Semnal recep/.test(sp), 'toate liniile jurnalului sunt citite în ordine', sp);
  ok(!/^OM\b/.test(sp), 'etichetele nu sunt citite ca text');
  const lg = (await page.evaluate(() => window.__spoken))[0].lang; ok(/^ro/i.test(lg), 'voce ro', lg);
  // oprire
  await page.evaluate(() => { addLog('om', 'Linia a doua lungă '.repeat(5)); });
  await page.locator('#r8-read-btn').click(); await page.waitForTimeout(1500);
  ok((await page.locator('#r8-read-btn').innerText()) === '🔊', 'butonul revine la 🔊 după terminarea citirii');
  const ax = await axeRun(page); ok(ax.length === 0, 'axe 0 violări cu jurnal', ax);
  // copie .fff.json
  await page.evaluate(() => localStorage.setItem('nomia_pins', '["x1"]'));
  const b = await page.evaluate(async () => JSON.stringify(await FFF.bundle.build()));
  ok(/"app":"nomia"/.test(b) && /nomia_pins/.test(b), 'copia .fff.json conține datele NOMIA');
  // etichetă: panoul Statistici · Setări conține #app-version
  ok((await page.evaluate(() => document.getElementById('app-version').textContent)) === 'v ' + (await page.evaluate(() => document.querySelector('meta[name="application-version"]').content)) + ' · ' + __FFF_APP.updated, 'versiune afișată (coerentă cu meta application-version)');
  await ctx.close();
}
ok(errs.length === 0, 'fără pageerror/CSP în tot setul', errs); ok(net.length === 0, '0 cereri de rețea în tot setul', net);
console.log(`\n${pass} ok, ${fail} eșuate`); await browser.close(); process.exit(fail ? 1 : 0);
