// NOMIA — interogarea din #np-search-input și căutările salvate nu se inserează ca HTML.
// Rulare: node tests/search-xss.test.mjs [index.html]
import {createRequire} from "module"; import path from "path"; import {fileURLToPath} from "url";
const require = createRequire("/home/claude/pw/package.json"); const {chromium} = require("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const FILE = "file://" + path.resolve(process.argv[2] || path.join(HERE, "..", "index.html"));
let fails = 0, passes = 0; const check = (n, c, x) => { c ? (passes++, console.log("  ok  " + n)) : (fails++, console.log("FAIL  " + n + (x !== undefined ? "  -> " + JSON.stringify(x) : ""))); };
const b = await chromium.launch({executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-sandbox"]});
const EVIL = '<img src=x id=pwn1 onerror="window.__x=1">';
for (const lang of ["ro", "en"]) {
  const ctx = await b.newContext({viewport: {width: 1280, height: 900}, serviceWorkers: "block", locale: lang === "en" ? "en-US" : "ro-RO"}); await ctx.route(/^https?:/, r => r.abort());
  await ctx.addInitScript(([evil, lang]) => { try { localStorage.setItem("nomia_saved_searches", JSON.stringify([evil + "<b id=pwn2>s</b>"])); localStorage.setItem("nomia_lang", lang); } catch (e) {} }, [EVIL, lang]);
  const p = await ctx.newPage(); const errs = []; p.on("pageerror", e => errs.push(String(e)));
  await p.goto(FILE); await p.waitForTimeout(6500);
  const r = await p.evaluate(async evil => {
    const i = document.getElementById("np-search-input"); if (!i) return {noinput: true};
    i.value = evil; i.dispatchEvent(new Event("input", {bubbles: true}));
    await new Promise(r => setTimeout(r, 1200));
    const grids = [...document.querySelectorAll("img#pwn1")].length;
    const html = document.body.innerHTML; 
    return {imgs: grids, hasText: document.body.textContent.includes(evil.slice(0, 12)), msgs: [...document.querySelectorAll("div")].filter(d => /No NHI for|Niciun NHI pentru/.test(d.textContent) && d.children.length === 0).map(d => d.textContent.slice(0, 90))};
  }, EVIL);
  check(lang + ": «Niciun NHI pentru» — fără element injectat", !r.noinput && r.imgs === 0, r);
  check(lang + ": mesajul apare ca text cu interogarea", r.msgs && r.msgs.length >= 1 && r.msgs[0].includes("<img src=x"), r.msgs);
  const s = await p.evaluate(() => { try { if (typeof renderSavedSearchPills === "function") { if (!document.getElementById("saved-search-pills")) { const d = document.createElement("div"); d.id = "saved-search-pills"; document.body.appendChild(d); } renderSavedSearchPills(); } } catch (e) { return "err " + e.message; } const el = document.getElementById("saved-search-pills"); return el ? {imgs: el.querySelectorAll("img,b").length, txt: el.textContent} : "noel"; });
  check(lang + ": căutări salvate — text, nu HTML", s && s.imgs === 0 && /<img src=x/.test(s.txt), s);
  check(lang + ": 0 erori JS", errs.length === 0, errs);
  await ctx.close();
}
await b.close(); console.log(`\n${passes} reușite, ${fails} eșuate`); process.exit(fails ? 1 : 0);
