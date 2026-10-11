import os as _os
NOMIA_FILE=_os.path.abspath(_os.environ.get('NOMIA_FILE') or _os.path.join(_os.path.dirname(_os.path.abspath(__file__)),'..','index.html'))
import asyncio, json, sys
from playwright.async_api import async_playwright
F = sys.argv[1] if len(sys.argv)>1 else NOMIA_FILE
DEV = {'iphone':dict(viewport={'width':390,'height':844},device_scale_factor=3,is_mobile=True,has_touch=True,user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1'),
 'pixel':dict(viewport={'width':412,'height':915},device_scale_factor=2.6,is_mobile=True,has_touch=True),
 'small':dict(viewport={'width':320,'height':568},is_mobile=True,has_touch=True),
 'tablet':dict(viewport={'width':820,'height':1180},is_mobile=True,has_touch=True),
 'desktop':dict(viewport={'width':1440,'height':900})}
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    for name,kw in DEV.items():
      ctx=await b.new_context(**kw); pg=await ctx.new_page(); errs=[]
      pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m:errs.append('c:'+m.text[:150]) if m.type in('error','warning') else None)
      import time;t=time.time()
      await pg.goto('file://'+F); await pg.wait_for_timeout(2500)
      r=await pg.evaluate("""()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,
        small:[...document.querySelectorAll('button,a,[onclick],[data-onclick],input,select')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(r.width<32||r.height<32)}).length,
        tot:[...document.querySelectorAll('button,a,[onclick],[data-onclick],input,select')].filter(e=>e.getBoundingClientRect().width>0).length,
        over:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.right>innerWidth+2}).slice(0,8).map(e=>e.tagName+'#'+e.id+'.'+(e.className+'').slice(0,30)),
        fs:[...document.querySelectorAll('input,select,textarea')].filter(e=>e.getBoundingClientRect().width>0&&parseFloat(getComputedStyle(e).fontSize)<16).length})""")
      print(name,round(time.time()-t,1),'s',json.dumps(r,ensure_ascii=False)); print(' errs',errs[:5])
      await pg.screenshot(path=f'shot_{name}.png'); await ctx.close()
    await b.close()
asyncio.run(main())
