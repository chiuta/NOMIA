import os as _os
NOMIA_FILE=_os.path.abspath(_os.environ.get('NOMIA_FILE') or _os.path.join(_os.path.dirname(_os.path.abspath(__file__)),'..','index.html'))
import asyncio, json, sys
from playwright.async_api import async_playwright
F=NOMIA_FILE
DEV={'iphone':dict(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True),
     'desktop':dict(viewport={'width':1440,'height':900}),
     'tablet':dict(viewport={'width':820,'height':1180},device_scale_factor=1.5,is_mobile=True,has_touch=True)}
which=sys.argv[1:] or list(DEV)
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    for name in which:
      ctx=await b.new_context(**DEV[name]); pg=await ctx.new_page(); errs=[]
      pg.on('pageerror',lambda e:errs.append('PAGE '+str(e))); pg.on('console',lambda m:errs.append('c:'+m.text[:160]) if m.type=='error' else None)
      await pg.goto('file://'+F); await pg.wait_for_timeout(1500)
      async def shot(n): await pg.screenshot(path=f'f_{name}_{n}.png')
      await shot('01_start')
      try: await pg.evaluate("dismissTutorial()")
      except Exception as e: errs.append('tut '+str(e))
      await pg.click('#nhi-pill'); await pg.wait_for_timeout(600); await shot('02_sheet')
      await pg.fill('#np-search-input','elan'); await pg.wait_for_timeout(600); await shot('03_search')
      await pg.click('#nhi-desk-elan'); await pg.wait_for_timeout(4500); await shot('04_selected')
      for i,sel in enumerate(['#nhi-pill']):
        pass
      await pg.click('button.abtn.a-ia'); await pg.wait_for_timeout(3000); await shot('05_ianhi')
      await pg.click('#top-ovf-btn'); await pg.wait_for_timeout(600); await shot('06_menu')
      await pg.keyboard.press('Escape'); await pg.wait_for_timeout(400)
      await pg.evaluate("openDetailSheet()"); await pg.wait_for_timeout(600); await shot('07_detail')
      await pg.evaluate("closeAllSheets();openTriadicSheet()"); await pg.wait_for_timeout(600); await shot('08_triadic')
      await pg.evaluate("closeAllSheets();openStatsSheet()"); await pg.wait_for_timeout(600); await shot('09_stats')
      await pg.evaluate("closeAllSheets()"); 
      print(name,'errors:',errs[:8])
      await ctx.close()
    await b.close()
asyncio.run(main())
