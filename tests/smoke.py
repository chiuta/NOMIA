import os as _os
NOMIA_FILE=_os.path.abspath(_os.environ.get('NOMIA_FILE') or _os.path.join(_os.path.dirname(_os.path.abspath(__file__)),'..','index.html'))
import sys,json
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page()
    errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+NOMIA_FILE); pg.wait_for_timeout(1500)
    res=pg.evaluate('''()=>{
      const out={err:[],ro_in_en:[],n:0};
      const roRe=/(Răspuns|Starea|Apare|Comportament|Sincronic|Frecvența|Insight-ul|Canal|apariție|Perspectiva|Mediez|Detectez)/;
      for(const lg of ['ro','en']){ lang=lg;
        for(const n of NHI_DATA.slice(0,40)){
          for(const ch of ['mat','intuitie','simb','sinc','stare']){
            for(const tip of [0,1,2]){
              try{ const L=buildChannelScript(n,ch,tip); out.n++;
                 for(const [t,m] of L){ if(typeof m!=='string'||/undefined|\\[object/.test(m)) out.err.push([lg,n.id,ch,tip,m]);
                    if(lg==='en' && ch!=='x' && roRe.test(m) && L.length>3 && n.channels.includes(ch)) out.ro_in_en.push([n.id,ch,tip,m.slice(0,100)]);
                 }
              }catch(e){out.err.push([lg,n.id,ch,tip,String(e)]);}
            }}}}
      lang='ro';
      return out;}''')
    print('n',res['n'],'errs',len(res['err']),res['err'][:5])
    seen=set(); 
    for r in res['ro_in_en']:
        if r[3] in seen: continue
        seen.add(r[3]); 
    print('RO-looking lines in EN:',len(seen)); 
    for x in list(seen)[:15]: print('  ',x)
    print('pageerrors',errs[:5])
    # UAP checks
    r=pg.evaluate('''()=>{const o=[];for(const u of UAP_INTL.concat(UAP_RO)){o.push([u.name,uapKeyFor(u),!!UAP_PROTOCOLS[uapKeyFor(u)]]);}return o}''')
    print([x for x in r if not x[2]])
    b.close()
