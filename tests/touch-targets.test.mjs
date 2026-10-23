// NOMIA — pe ecrane tactile (pointer:coarse) butoanele 🔊 și derulare automată au ≥44 px (o regulă ulterioară de 24 px le suprascria) + metadate coerente.
// Rulare: node tests/touch-targets.test.mjs [index.html]   (CHROME=cale/chromium, NODE_PW=cale/package.json)
import {createRequire} from "module"; import path from "path"; import fs from "fs"; import crypto from "crypto"; import {fileURLToPath} from "url";
const require = createRequire(process.env.NODE_PW || "/home/claude/pw/package.json"); const {chromium} = require("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url)); const IDX = path.resolve(process.argv[2] || path.join(HERE, "..", "index.html"));
let fails = 0, passes = 0; const check = (n, c, x) => { c ? (passes++, console.log("  ok  " + n)) : (fails++, console.log("FAIL  " + n + (x !== undefined ? "  -> " + JSON.stringify(x) : ""))); };
const html = fs.readFileSync(IDX, "utf8"), app = JSON.parse(fs.readFileSync(path.join(HERE, "..", "app.json"), "utf8"));
const S = html.match(/"sha256":"([0-9a-f]{64})"/)[1];
check("app.json: sha256 = hash(index.html cu valoarea golită)", app.sha256 === S && crypto.createHash("sha256").update(html.split(S).join("")).digest("hex") === S);
check("app.json: sizeBytes și versiune", app.sizeBytes === Buffer.byteLength(html) && html.includes('BUILD = \'' + app.version + '\''), [app.sizeBytes, app.version]);
check("sw.js și pachetele i18n au aceeași versiune", fs.readFileSync(path.join(HERE, "..", "sw.js"), "utf8").includes("v=" + app.version) && fs.readdirSync(path.join(HERE, "..", "i18n")).every(f => fs.readFileSync(path.join(HERE, "..", "i18n", f), "utf8").slice(0, 80).includes('"' + app.version + '"')));
const b = await chromium.launch({executablePath: process.env.CHROME || "/opt/pw-browsers/chromium", args: ["--no-sandbox"]});
const ctx = await b.newContext({viewport: {width: 360, height: 740}, hasTouch: true, isMobile: true, serviceWorkers: "block"}); await ctx.route(/^https?:/, r => r.abort());
const p = await ctx.newPage(); await p.goto("file://" + IDX); await p.waitForTimeout(2500);
check("pointer:coarse activ", await p.evaluate(() => matchMedia("(pointer:coarse)").matches));
const sz = await p.evaluate(() => ["autoscroll-btn", "r8-read-btn"].map(id => { const e = document.getElementById(id), r = e && e.getBoundingClientRect(); return [id, r ? Math.round(r.width) : null, r ? Math.round(r.height) : null, e && getComputedStyle(e).display]; }));
for (const [id, w, h, d] of sz) check(id + " ≥44×44 pe ecran tactil", d === "none" || (w >= 44 && h >= 44), [w, h, d]);
await b.close(); console.log("\n" + passes + " reușite, " + fails + " eșuate"); process.exit(fails ? 1 : 0);
