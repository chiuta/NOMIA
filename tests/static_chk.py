import os as _os
NOMIA_FILE=_os.path.abspath(_os.environ.get('NOMIA_FILE') or _os.path.join(_os.path.dirname(_os.path.abspath(__file__)),'..','index.html'))
import asyncio, json, re, sys
from playwright.async_api import async_playwright
F=sys.argv[1] if len(sys.argv)>1 else NOMIA_FILE
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1280,'height':800})
    errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    await pg.goto('file://'+F); await pg.wait_for_timeout(2500)
    r=await pg.evaluate("""()=>{
      const out={missingFn:[],dupIds:[],missingTargets:[],badCSSvars:[]};
      const fns=new Set();
      document.querySelectorAll('[onclick],[oninput],[onchange],[onkeydown],[onsubmit]').forEach(e=>{
        for(const a of ['onclick','oninput','onchange','onkeydown','onsubmit']){const v=e.getAttribute(a);if(!v)continue;
          for(const m of v.matchAll(/(?<![\\w.$'"])([A-Za-z_$][\\w$]*)\\s*\\(/g)){const n=m[1];
            if(['if','function','for','while','return','event','setTimeout','Math','parseInt','closeGrpAndRun','alert'].includes(n))continue;
            fns.add(n);}}});
      fns.forEach(n=>{ if(typeof window[n]!=='function' && !['Event','this'].includes(n)) out.missingFn.push(n)});
      const ids={};document.querySelectorAll('[id]').forEach(e=>{ids[e.id]=(ids[e.id]||0)+1});
      out.dupIds=Object.entries(ids).filter(([k,v])=>v>1).map(([k,v])=>k+'x'+v);
      // getElementById refs in scripts
      const src=[...document.scripts].map(s=>s.textContent).join('\\n');
      const refs=new Set();for(const m of src.matchAll(/getElementById\\(\\s*['"]([^'"]+)['"]\\s*\\)/g))refs.add(m[1]);
      out.missingTargets=[...refs].filter(i=>!document.getElementById(i));
      return out;}""")
    print(json.dumps(r,ensure_ascii=False,indent=0)); print(errs)
    await b.close()
asyncio.run(main())
