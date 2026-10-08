import os as _os
NOMIA_FILE=_os.path.abspath(_os.environ.get('NOMIA_FILE') or _os.path.join(_os.path.dirname(_os.path.abspath(__file__)),'..','index.html'))
import asyncio, json, sys, collections
from playwright.async_api import async_playwright
F=NOMIA_FILE
JS=r"""()=>{
 function parse(c){const m=c.match(/rgba?\(([^)]+)\)/);if(!m)return[0,0,0,0];const p=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);return[p[0],p[1],p[2],p[3]===undefined?1:p[3]];}
 function over(f,b){const a=f[3];return[f[0]*a+b[0]*(1-a),f[1]*a+b[1]*(1-a),f[2]*a+b[2]*(1-a),1];}
 function lum(c){const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2]);}
 function bgOf(el){let layers=[];let e=el;while(e&&e.nodeType===1){const cs=getComputedStyle(e);const c=parse(cs.backgroundColor);if(c[3]>0)layers.push(c);if(c[3]>=1)break;e=e.parentElement;}
   let base=[255,255,255,1];if(document.body.classList.contains('dark-mode'))base=[1,12,32,1];
   for(let i=layers.length-1;i>=0;i--)base=over(layers[i],base);return base;}
 const out=[];const seen=new Set();
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 let n;while(n=walker.nextNode()){
   const t=n.textContent.trim();if(t.length<2)continue;const el=n.parentElement;if(!el)continue;
   if(['SCRIPT','STYLE','NOSCRIPT'].includes(el.tagName))continue;
   const r=el.getBoundingClientRect();if(r.width<2||r.height<2)continue;
   const cs=getComputedStyle(el);if(cs.visibility==='hidden'||cs.display==='none'||parseFloat(cs.opacity)===0)continue;
   // skip if offscreen
   if(r.bottom<0||r.top>innerHeight||r.right<0||r.left>innerWidth)continue;
   let op=1,e=el;while(e&&e!==document.body){op*=parseFloat(getComputedStyle(e).opacity);e=e.parentElement;}
   if(op<0.05)continue;const fg=parse(cs.color);const bg=bgOf(el);const fgc=over([fg[0],fg[1],fg[2],fg[3]*op],bg);
   const L1=lum(fgc),L2=lum(bg);const ratio=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
   const size=parseFloat(cs.fontSize);const bold=parseInt(cs.fontWeight)>=700;
   const need=(size>=24||(size>=18.66&&bold))?3:4.5;
   const small=size<10.5;
   if(ratio<need||small){const sig=(el.id?'#'+el.id:'')+'.'+(el.className&&el.className.baseVal===undefined?String(el.className).split(' ').slice(0,2).join('.'):'')+'|'+el.tagName;
     if(!seen.has(sig+ratio.toFixed(1)))out.push({sig,ratio:+ratio.toFixed(2),size,txt:t.slice(0,28),small:small&&ratio>=need});seen.add(sig+ratio.toFixed(1));}
 }
 return out;}"""
async def main():
  dev=sys.argv[1] if len(sys.argv)>1 else 'desktop'
  kw={'desktop':dict(viewport={'width':1440,'height':900}),'iphone':dict(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)}[dev]
  async with async_playwright() as p:
    b=await p.chromium.launch(); tot=collections.defaultdict(list)
    for theme in ['light','dark']:
      ctx=await b.new_context(**kw); pg=await ctx.new_page()
      await pg.add_init_script("try{localStorage.setItem('nomia_dark','%s');localStorage.setItem('nomia_disc_v2','accepted')}catch(e){}"%('1' if theme=='dark' else ''))
      await pg.goto('file://'+F); await pg.wait_for_timeout(1500)
      await pg.evaluate("dismissTutorial()")
      states=[('base',"1"),('nhi',"openNHISheet()"),('sel',"closeAllSheets();selectNHI('elan')"),('detail',"openDetailSheet()"),('stats',"closeAllSheets();openStatsSheet()"),('triadic',"closeAllSheets();openTriadicSheet()"),('menu',"closeAllSheets();"+("openMobMenu()" if dev=='iphone' else "toggleGrpMenu('grp-set-menu',document.getElementById('grp-set-btn'))")),('cmp',"closeAllSheets();closeAllGrpMenus&&closeAllGrpMenus();addToCompare('elan');addToCompare('zimbru');openCompare()"),('cat',"closeCompare&&closeCompare();openCatPanel()")]
      for name,code in states:
        try: await pg.evaluate(code)
        except Exception as e: print('state err',name,str(e)[:80])
        await pg.wait_for_timeout(900 if name=='sel' else 500)
        res=await pg.evaluate(JS)
        for r in res: tot[(theme,name)].append(r)
      await ctx.close()
    for k,v in tot.items():
      bad=[r for r in v if not r['small']]
      print(k,'lowcontrast',len(bad),'tiny',len([r for r in v if r['small']]))
      for r in sorted(bad,key=lambda r:r['ratio'])[:7]: print('   ',r['ratio'],r['sig'],r['size'],repr(r['txt']))
    await b.close()
asyncio.run(main())
