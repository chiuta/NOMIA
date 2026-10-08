import os as _os
NOMIA_FILE=_os.path.abspath(_os.environ.get('NOMIA_FILE') or _os.path.join(_os.path.dirname(_os.path.abspath(__file__)),'..','index.html'))
import sys
from playwright.sync_api import sync_playwright
F='file://'+NOMIA_FILE
with sync_playwright() as p:
    b=p.chromium.launch()
    for rate in (1,4):
        c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True); pg=c.new_page()
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        cdp=c.new_cdp_session(pg); cdp.send('Emulation.setCPUThrottlingRate',{'rate':rate})
        pg.goto(F)
        pg.wait_for_function("document.getElementById('nhi-desk')&&document.querySelectorAll('#nhi-desk .nhi-btn').length>0",timeout=60000)
        print(rate,pg.evaluate("()=>{const e=performance.getEntriesByType('navigation')[0];return [Math.round(e.domContentLoadedEventEnd),Math.round(e.loadEventEnd)]}"),errs)
        pg.wait_for_timeout(4000)
        print(' cards',pg.evaluate("document.querySelectorAll('#nhi-desk .nhi-btn').length"))
