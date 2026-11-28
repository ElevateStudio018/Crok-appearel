"""Builds design/hero-lab/kreativa.html: hero concepts for CORK, each its own idea.

Usage: python design/hero-lab/kreativa.py   (needs Pillow)
"""

from labkit import NAV, lg, mascot, nav, ph, render

C = []


def concept(title):
    def wrap(fn):
        C.append((title, fn))
        return fn
    return wrap


# Each concept returns (html, css, background). Classes are scoped with the concept number.

@concept('liftkort')
def k(n):
    html = f'''<div class="pass">
  <div class="pass-top">{lg('k', 'pass-lg')}<span>säsongskort · cork 3</span></div>
  <div class="pass-body">{ph('slide', 'pass-ph')}<dl>
    <div><dt>namn</dt><dd>gäst</dd></div><div><dt>giltigt</dt><dd>hela vintern</dd></div>
    <div><dt>leverans</dt><dd>före 24/12</dd></div></dl></div>
  <div class="pass-nav">{nav()}</div>
  <div class="barcode"></div></div>'''
    css = '''.pass{position:absolute;inset:8% 10%;background:#f4f3ef;color:#111;display:grid;grid-template-rows:auto 1fr auto auto;border-radius:10px;overflow:hidden;box-shadow:0 20px 60px rgb(0 0 0/.5);transform:rotate(-2deg)}
.pass-top{display:flex;justify-content:space-between;align-items:center;padding:.8em 1em;border-bottom:1px dashed #111;font-size:.8em}.pass-lg{width:6em}
.pass-body{display:grid;grid-template-columns:1fr 1fr;gap:1em;padding:1em;min-height:0}.pass-ph{min-height:0}
.pass dl{margin:0;display:grid;align-content:center;gap:.6em;font-size:.85em}.pass dt{color:#777}.pass dd{margin:0}
.pass-nav{padding:.4em 1em;border-top:1px dashed #111}.pass-nav .nv{display:flex;flex-wrap:wrap;gap:.2em 1em;font-size:.8em}
.barcode{height:2.2em;margin:0 1em .8em;background:repeating-linear-gradient(90deg,#111 0 2px,transparent 2px 4px,#111 4px 5px,transparent 5px 9px,#111 9px 12px,transparent 12px 14px)}
@container(max-width:480px){.pass{inset:6% 6%}.pass-body{grid-template-columns:1fr}}'''
    return html, css, 'street'


@concept('videokamera, rec')
def k(n):
    html = f'''{ph('jam', 'full')}<div class="vf">
  <span class="rec">● rec</span><span class="tc">00:03:17:24</span><span class="bat">▮▮▮▯</span>
  <span class="br tl"></span><span class="br tr"></span><span class="br bl"></span><span class="br brr"></span>
  <div class="vf-mid">{lg('w', 'vf-lg')}</div>
  <div class="vf-nav">{nav('chap', [f"0{i + 1} {x}" for i, x in enumerate(NAV)])}</div></div>'''
    css = '''.vf{position:absolute;inset:0;padding:5%;font-size:.95em}.vf>span{position:absolute}
.rec{top:6%;left:7%;animation:blink 1.2s steps(1) infinite}.tc{top:6%;right:7%}.bat{bottom:6%;right:7%;letter-spacing:.1em}
@keyframes blink{50%{opacity:0}}
.br{width:8%;height:10%;border:2px solid #f4f3ef}.br.tl{top:4%;left:4%;border-right:0;border-bottom:0}.br.tr{top:4%;right:4%;border-left:0;border-bottom:0}
.br.bl{bottom:4%;left:4%;border-right:0;border-top:0}.br.brr{bottom:4%;right:4%;border-left:0;border-top:0}
.vf-mid{position:absolute;inset:0;display:grid;place-items:center}.vf-lg{width:min(14em,40cqi)}
.vf-nav{position:absolute;left:7%;bottom:8%;right:25%}.chap{display:flex;flex-wrap:wrap;gap:.2em 1.1em;font-size:.82em}'''
    return html, css, 'night'


@concept('filmremsa med perforering')
def k(n):
    frames = ''.join(f'<div class="fr">{ph(p)}<span>{i + 21}a</span></div>' for i, p in enumerate(['slide', 'street', 'swiss', 'jam']))
    html = f'''<div class="film"><div class="holes"></div><div class="frames">{frames}</div><div class="holes"></div></div>
<div class="film-cap">{lg('w', 'film-lg')}{nav('row')}</div>'''
    css = '''.film{position:absolute;left:0;right:0;top:12%;height:58%;background:#151515;display:grid;grid-template-rows:12% 1fr 12%;transform:rotate(-3deg) scale(1.08)}
.holes{background:repeating-linear-gradient(90deg,transparent 0 10px,#f4f3ef 10px 22px,transparent 22px 34px);background-size:34px 46%;background-repeat:repeat-x;background-position:0 50%;opacity:.85}
.frames{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:0 10px}.fr{position:relative}.fr .ph{position:absolute;inset:0}
.fr span{position:absolute;bottom:-1.4em;left:0;font-size:.7em;color:#cfcfca}
.film-cap{position:absolute;left:6%;right:6%;bottom:7%;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:1em}.film-lg{width:9em}
@container(max-width:480px){.frames{grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}.film{height:52%}}'''
    return html, css, 'night'


@concept('terminal')
def k(n):
    lines = ''.join(f'<li><span class="perm">drwxr-xr-x</span> <a href="#">{x}/</a></li>' for x in NAV)
    html = f'''<div class="term"><div class="term-bar"><i></i><i></i><i></i><span>cork — zsh</span></div>
<div class="term-body"><div><p>$ cat cork.txt</p>{lg('w', 'term-lg')}<p class="dim">not made to fit in. two pieces, 25 of each.</p><p>$ ls ~/cork</p><ul class="ls">{lines}</ul><p>$ <span class="cur">▌</span></p></div>{ph('swiss', 'term-ph')}</div></div>'''
    css = '''.term{position:absolute;inset:7% 7%;background:#0a0a0a;border:1px solid #333;display:grid;grid-template-rows:auto 1fr}
.term-bar{display:flex;align-items:center;gap:.4em;padding:.5em .8em;background:#1b1b1b;font-size:.75em;color:#999}.term-bar i{width:.8em;height:.8em;border-radius:50%;background:#444}.term-bar span{margin-left:auto;margin-right:auto}
.term-body{display:grid;grid-template-columns:1.2fr 1fr;gap:1.2em;padding:1em 1.2em;min-height:0;font-size:.9em}.term-body p{margin:.2em 0}.term-lg{width:9em;margin:.4em 0}
.dim{color:#888}.ls{list-style:none;margin:0;padding:0}.perm{color:#666}.cur{animation:blink 1s steps(1) infinite}@keyframes blink{50%{opacity:0}}.term-ph{min-height:0}
@container(max-width:480px){.term-body{grid-template-columns:1fr}.term-ph{min-height:30%}.perm{display:none}}'''
    return html, css, 'night'


@concept('klistermärken på bilden')
def k(n):
    html = f'''{ph('street', 'full')}<div class="stk s1">{lg('k', 'stk-lg')}</div><div class="stk s2">{mascot('stk-m')}</div>
<div class="stk s3"><span>cork 3<br>25 ex</span></div><div class="stk s4 nv-stk">{nav()}</div>'''
    css = '''.stk{position:absolute;background:#f4f3ef;color:#111;padding:.6em .8em;border-radius:6px;box-shadow:0 4px 14px rgb(0 0 0/.35)}
.s1{left:6%;top:9%;transform:rotate(-8deg)}.stk-lg{width:10em}.s2{right:8%;top:12%;transform:rotate(9deg);padding:.4em;border-radius:14px}.stk-m{width:5em}
.s3{left:40%;top:44%;border-radius:50%;width:6em;height:6em;display:grid;place-items:center;text-align:center;font-weight:600;transform:rotate(-14deg)}
.s4{right:6%;bottom:8%;transform:rotate(-3deg)}.nv-stk .nv{display:grid;gap:.1em}
@container(max-width:480px){.s3{left:10%;top:48%}}'''
    return html, css, 'night'


@concept('polaroid med text på kanten')
def k(n):
    html = f'''<div class="pol">{ph('slide', 'pol-ph')}<div class="pol-cap">{lg('k', 'pol-lg')}<span>uppsala, natt.</span></div></div>
<div class="pol-nav">{nav('stack')}</div>'''
    css = '''.pol{position:absolute;left:12%;top:8%;width:42%;background:#fff;padding:3% 3% 0;box-shadow:0 18px 40px rgb(0 0 0/.25);transform:rotate(-4deg)}
.pol-ph{aspect-ratio:1}.pol-cap{display:flex;justify-content:space-between;align-items:center;padding:1em 0 1.2em;color:#555;font-size:.85em}.pol-lg{width:7em}
.pol-nav{position:absolute;right:12%;top:50%;transform:translateY(-50%);font-size:1.3em}.nv.stack{display:grid;gap:.1em}
@container(max-width:480px){.pol{left:10%;top:5%;width:80%}.pol-nav{top:auto;bottom:5%;right:10%;transform:none;font-size:1.05em}}'''
    return html, css, 'paper'


@concept('höjdkurvor')
def k(n):
    rings = ''.join(f'<i style="--s:{1 + i * 0.32}"></i>' for i in range(10))
    html = f'''<div class="topo">{rings}</div>{ph('swiss', 'topo-ph')}
<div class="topo-c">{lg('k', 'topo-lg')}<ol class="legend">{''.join(f'<li><a href="#">{x}</a><span>{1200 + i * 150} m</span></li>' for i, x in enumerate(NAV))}</ol></div>'''
    css = '''.topo{position:absolute;inset:0;display:grid;place-items:center;overflow:hidden}.topo i{position:absolute;width:30cqi;height:22cqi;border:1px solid #bdbdb8;border-radius:47% 53% 44% 56%/55% 41% 59% 45%;transform:scale(var(--s)) rotate(calc(var(--s)*14deg))}
.topo-ph{position:absolute;left:50%;top:50%;width:28cqi;height:20cqi;transform:translate(-50%,-50%);border-radius:47% 53% 44% 56%/55% 41% 59% 45%}
.topo-c{position:absolute;left:5%;top:7%;bottom:7%;display:flex;flex-direction:column;justify-content:space-between}.topo-lg{width:8em}
.legend{list-style:none;margin:0;padding:0;font-size:.85em;display:grid;gap:.15em;width:13em}.legend li{display:flex;justify-content:space-between;border-bottom:1px dotted #999}.legend span{color:#777}
@container(max-width:480px){.topo-ph{width:60cqi;height:44cqi;top:34%}.topo i{width:60cqi;height:44cqi;top:auto}.topo-c{top:auto;bottom:5%;height:auto;gap:1em}}'''
    return html, css, 'paper'


@concept('pistkarta')
def k(n):
    runs = ''.join(f'<li class="run r{i}"><span class="dot"></span><a href="#">{x}</a></li>' for i, x in enumerate(NAV))
    html = f'''{ph('swiss', 'full dim')}<svg class="piste" viewBox="0 0 100 62" preserveAspectRatio="none" aria-hidden="true">
<path d="M50 4 C40 18 30 26 18 58"/><path d="M50 4 C52 22 48 40 52 58"/><path d="M50 4 C62 16 74 30 84 58"/><path d="M50 4 C58 24 66 34 70 58" class="dash"/></svg>
<div class="piste-top">{lg('w', 'piste-lg')}<span>cork 3 — pistkarta</span></div><ul class="runs">{runs}</ul>'''
    css = '''.dim{filter:brightness(.6)}.piste{position:absolute;inset:0;width:100%;height:100%}.piste path{fill:none;stroke:#f4f3ef;stroke-width:.5}.piste .dash{stroke-dasharray:1.5 1.5}
.piste-top{position:absolute;left:5%;top:6%;display:grid;gap:.4em;font-size:.8em}.piste-lg{width:9em}
.runs{position:absolute;right:5%;bottom:7%;list-style:none;margin:0;padding:.8em 1em;background:rgb(10 10 10/.7);display:grid;gap:.2em;font-size:.9em}
.dot{display:inline-block;width:.7em;height:.7em;margin-right:.6em;background:#f4f3ef;vertical-align:middle}.r1 .dot,.r4 .dot{border-radius:50%}.r2 .dot,.r5 .dot{transform:rotate(45deg)}.r3 .dot,.r6 .dot{background:transparent;border:1px solid #f4f3ef}'''
    return html, css, 'night'


@concept('en jättesiffra 3 med bilden i')
def k(n):
    html = f'''<div class="three">3</div><div class="three-side">{lg('k', 'three-lg')}<p>cork 3 är vår första kollektion, döpt efter tricket där allt började.</p>{nav('stack')}</div>'''
    css = f'''.three{{position:absolute;left:2%;top:-6%;bottom:-10%;font-size:min(110cqi,92cqh,66em);line-height:1;font-weight:600;background:var(--slide) 45% 40%/cover;-webkit-background-clip:text;background-clip:text;color:transparent}}
.three-side{{position:absolute;right:6%;top:10%;bottom:10%;width:36%;display:flex;flex-direction:column;justify-content:space-between}}.three-lg{{width:9em}}.three-side p{{margin:0;color:#555}}
@container(max-width:480px){{.three{{left:0;right:0;top:-4%;bottom:auto;text-align:center;font-size:120cqi}}.three-side{{left:8%;right:8%;width:auto;top:auto;bottom:5%;gap:1em}}}}'''
    return html, css, 'paper'


@concept('avgångstavla')
def k(n):
    rows = ''.join(f'<li><span class="t">{20 + i}:{(i * 7) % 60:02d}</span><a href="#">{x}</a><span class="g">{["a1", "b2", "c3", "d4", "e5", "f6", "g7"][i]}</span><span class="s">{"ombord" if i == 1 else "i tid"}</span></li>' for i, x in enumerate(NAV))
    html = f'''<div class="board"><div class="board-h">{lg('w', 'board-lg')}<span>avgångar / departures</span></div><ul class="flap">{rows}</ul></div>{ph('jam', 'board-ph')}'''
    css = '''.board{position:absolute;left:5%;top:8%;bottom:8%;width:56%;display:flex;flex-direction:column;gap:1em}.board-h{display:flex;justify-content:space-between;align-items:center;font-size:.8em;color:#aaa}.board-lg{width:8em}
.flap{list-style:none;margin:0;padding:0;display:grid;gap:.25em}.flap li{display:grid;grid-template-columns:4em 1fr 3em 4.5em;gap:.5em;background:#1a1a1a;padding:.35em .6em;border-top:1px solid #000}
.flap .t,.flap .g{color:#e0e0d8}.flap .s{color:#9a9a96;text-align:right}.board-ph{position:absolute;right:5%;top:8%;bottom:8%;width:32%}
@container(max-width:480px){.board{width:auto;right:5%;bottom:auto}.board-ph{left:5%;width:auto;top:auto;height:28%}.flap li{grid-template-columns:3.5em 1fr 4em}.flap .g{display:none}}'''
    return html, css, 'night'


@concept('tvättlapp')
def k(n):
    html = f'''{ph('street', 'full dim2')}<div class="care">{lg('k', 'care-lg')}<p class="care-big">100 % oberoende</p>
<p>tillverkad i små upplagor<br>25 ex per modell<br>skickas före 24 dec</p><div class="icons"><span>⌂ 30°</span><span>△</span><span>◯</span><span>✕</span></div>{nav('care-nav')}</div>'''
    css = '''.dim2{filter:brightness(.55)}.care{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotate(2deg);width:min(17em,60cqi);background:#f4f3ef;color:#111;padding:1.2em 1.2em 1.4em;display:grid;gap:.8em;font-size:.88em;clip-path:polygon(0 0,100% 0,100% 94%,92% 100%,8% 100%,0 94%)}
.care-lg{width:7em}.care-big{margin:0;font-weight:600;font-size:1.2em}.care p{margin:0}.icons{display:flex;gap:1em;border-block:1px solid #111;padding:.3em 0}.care-nav{display:grid;gap:.05em}'''
    return html, css, 'night'


@concept('kvitto')
def k(n):
    items = ''.join(f'<li><a href="#">{x}</a><span>{"1 500 kr" if x == "shop" else "→"}</span></li>' for x in NAV)
    html = f'''{ph('slide', 'full dim')}<div class="rcpt">{lg('k', 'rcpt-lg')}<p class="mid">almstigen 30 · uppsala</p><p class="mid">-------------------------</p>
<ul>{items}</ul><p class="mid">-------------------------</p><p class="tot"><span>totalt</span><span>1 st oberoende</span></p><div class="bc"></div><p class="mid small">tack. vi ses i backen.</p></div>'''
    css = '''.rcpt{position:absolute;left:50%;top:5%;bottom:-2%;transform:translateX(-50%) rotate(-1.5deg);width:min(17em,64cqi);background:#f7f7f4;color:#111;padding:1.2em;font-size:.86em;display:flex;flex-direction:column;gap:.5em;
-webkit-mask:linear-gradient(#000,#000) top/100% calc(100% - 10px) no-repeat,radial-gradient(circle 6px at 50% 100%,transparent 98%,#000) bottom/14px 10px repeat-x;mask:linear-gradient(#000,#000) top/100% calc(100% - 10px) no-repeat,radial-gradient(circle 6px at 50% 100%,transparent 98%,#000) bottom/14px 10px repeat-x}
.rcpt-lg{width:7em;margin:0 auto}.rcpt p{margin:0}.mid{text-align:center}.rcpt ul{list-style:none;margin:0;padding:0;display:grid;gap:.15em}.rcpt li,.tot{display:flex;justify-content:space-between}.tot{font-weight:600}
.bc{height:2em;background:repeating-linear-gradient(90deg,#111 0 1px,transparent 1px 3px,#111 3px 5px,transparent 5px 8px)}.small{font-size:.8em;color:#666}'''
    return html, css, 'night'


@concept('kameradisplay med fokusram')
def k(n):
    html = f'''{ph('swiss', 'full')}<div class="cam"><div class="grid3"></div><div class="focus"></div>
<div class="cam-top"><span>m</span><span>frame 29</span><span>cork 3</span></div>
<div class="cam-bot">{lg('w', 'cam-lg')}{nav('row')}</div></div>'''
    css = '''.cam{position:absolute;inset:0}.grid3{position:absolute;inset:0;background:linear-gradient(90deg,transparent 33.2%,rgb(244 243 239/.35) 33.3%,transparent 33.5%,transparent 66.5%,rgb(244 243 239/.35) 66.6%,transparent 66.8%),linear-gradient(180deg,transparent 33.2%,rgb(244 243 239/.35) 33.3%,transparent 33.5%,transparent 66.5%,rgb(244 243 239/.35) 66.6%,transparent 66.8%)}
.focus{position:absolute;left:66%;top:42%;width:12%;height:20%;border:1.5px solid #f4f3ef;transform:translate(-50%,-50%)}
.cam-top{position:absolute;left:5%;right:5%;top:5%;display:flex;justify-content:space-between;font-size:.8em}
.cam-bot{position:absolute;left:5%;right:5%;bottom:6%;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:1em;background:linear-gradient(transparent,rgb(10 10 10/.5));padding-top:2em}.cam-lg{width:10em}'''
    return html, css, 'night'


@concept('menyn som vertikal text')
def k(n):
    html = f'''{ph('slide', 'vt-ph')}<div class="vt-nav">{nav('vert')}</div><div class="vt-lg">{lg('k', 'vt-logo')}</div>'''
    css = '''.vt-ph{position:absolute;left:28%;right:0;top:0;bottom:0}
.vt-nav{position:absolute;left:3%;top:6%;bottom:6%;display:flex}.vert{display:flex;gap:1.1em;writing-mode:vertical-rl;transform:rotate(180deg);font-size:1.25em}
.vt-lg{position:absolute;left:3%;bottom:6%;width:22%}.vt-logo{width:100%}
@container(max-width:480px){.vt-ph{left:22%}.vt-lg{width:18%}.vert{font-size:1em}}'''
    return html, css, 'paper'


@concept('fönster från ett gammalt operativsystem')
def k(n):
    icons = ''.join(f'<li><a href="#"><span class="fold"></span>{x}</a></li>' for x in NAV)
    html = f'''<ul class="desk">{icons}</ul><div class="win"><div class="win-bar"><span class="x"></span><span>cork 3.jpg</span></div>{ph('street', 'win-ph')}<div class="win-foot">{lg('k', 'win-lg')}<span>2 objekt · 25 ex per modell</span></div></div>'''
    css = '''.desk{position:absolute;left:4%;top:6%;bottom:6%;list-style:none;margin:0;padding:0;display:grid;align-content:start;gap:.7em;font-size:.8em}
.desk a{display:grid;justify-items:center;gap:.25em;width:6em;text-align:center}.fold{width:2.6em;height:2em;border:1.5px solid #111;border-radius:2px;background:linear-gradient(#111 0 0) 0 0/40% 18% no-repeat}
.win{position:absolute;left:24%;right:6%;top:9%;bottom:12%;background:#fff;border:1.5px solid #111;box-shadow:6px 6px 0 #111;display:grid;grid-template-rows:auto 1fr auto}
.win-bar{display:flex;align-items:center;gap:.6em;padding:.3em .6em;border-bottom:1.5px solid #111;background:repeating-linear-gradient(#fff 0 2px,#111 2px 3px);font-size:.8em}.win-bar span:last-child{background:#fff;padding:0 .5em;margin:0 auto}
.x{width:.9em;height:.9em;border:1.5px solid #111;background:#fff}.win-ph{min-height:0}.win-foot{display:flex;justify-content:space-between;align-items:center;padding:.4em .7em;border-top:1.5px solid #111;font-size:.75em}.win-lg{width:5em}
@container(max-width:480px){.desk{left:4%;right:4%;top:auto;bottom:4%;grid-template-columns:repeat(4,1fr);gap:.4em}.desk a{width:auto}.win{left:5%;right:7%;top:5%;bottom:34%}}'''
    return html, css, 'paper'


@concept('rastrerad bild')
def k(n):
    html = f'''{ph('jam', 'full halftone')}<div class="ht">{lg('w', 'ht-lg')}{nav('row')}</div>'''
    css = '''.halftone{filter:contrast(1.4) brightness(1.05)}.halftone::after{content:"";position:absolute;inset:0;background:radial-gradient(circle,#0e0e0e 34%,transparent 36%) 0 0/7px 7px;mix-blend-mode:multiply;opacity:.85}
.ht{position:absolute;left:0;right:0;bottom:0;padding:1.2em 5%;background:#0e0e0e;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1em}.ht-lg{width:9em}'''
    return html, css, 'night'


@concept('ritning med måttlinjer')
def k(n):
    html = f'''<div class="bp">{ph('slide', 'bp-ph')}<div class="dim-h"><span>1 500 kr</span></div><div class="dim-v"><span>25 ex</span></div>
<div class="bp-title"><div>{lg('w', 'bp-lg')}</div><dl><div><dt>projekt</dt><dd>cork 3</dd></div><div><dt>skala</dt><dd>1:1</dd></div><div><dt>klar</dt><dd>24/12</dd></div></dl></div>
<div class="bp-nav">{nav('row left')}</div></div>'''
    css = '''.bp{position:absolute;inset:0;background:#0e0e0e linear-gradient(rgb(244 243 239/.07) 1px,transparent 1px) 0 0/22px 22px,linear-gradient(90deg,rgb(244 243 239/.07) 1px,transparent 1px) 0 0/22px 22px}
.bp-ph{position:absolute;left:12%;top:14%;width:38%;bottom:22%;outline:1px solid #f4f3ef;outline-offset:6px}
.dim-h{position:absolute;left:12%;width:38%;top:6%;border-top:1px solid #f4f3ef;text-align:center;font-size:.75em}.dim-h span{background:#0e0e0e;padding:0 .4em;position:relative;top:-.8em}
.dim-v{position:absolute;left:5%;top:14%;bottom:22%;border-left:1px solid #f4f3ef;display:grid;align-items:center;font-size:.75em}.dim-v span{writing-mode:vertical-rl;transform:rotate(180deg);background:#0e0e0e;margin-left:-.7em}
.bp-title{position:absolute;right:5%;bottom:8%;width:34%;border:1px solid #f4f3ef;display:grid}.bp-title>div{padding:.6em;border-bottom:1px solid #f4f3ef}.bp-lg{width:8em}
.bp-title dl{margin:0;display:grid;grid-template-columns:repeat(3,1fr);font-size:.75em}.bp-title dl div{padding:.4em .5em;border-right:1px solid #f4f3ef}.bp-title dl div:last-child{border-right:0}.bp-title dt{color:#888}.bp-title dd{margin:0}
.bp-nav{position:absolute;right:5%;top:12%;width:34%}.bp-nav .nv{display:grid;gap:.1em;font-size:1.05em}
@container(max-width:480px){.bp-ph{left:12%;right:8%;width:auto;bottom:48%}.dim-h{width:auto;right:8%}.dim-v{bottom:48%}.bp-title{left:5%;width:auto}.bp-nav{left:12%;top:56%;width:auto}}'''
    return html, css, 'night'


@concept('släppdatum stort')
def k(n):
    html = f'''{ph('street', 'date-ph')}<div class="date-col"><div class="date"><span class="d">24</span><span class="d2">.12</span></div>
<div class="date-side">{lg('k', 'date-lg')}<p>sista dagen för leverans av cork 3.</p>{nav('row')}</div></div>'''
    css = '''.date-ph{position:absolute;right:0;top:0;bottom:0;width:46%}
.date-col{position:absolute;left:5%;top:5%;bottom:7%;width:44%;display:flex;flex-direction:column;justify-content:space-between;gap:1em}
.date{line-height:.82;font-weight:600}.d{display:block;font-size:min(22cqi,9em)}.d2{display:block;font-size:min(13cqi,5em);color:#999}
.date-side{display:grid;gap:.8em}.date-lg{width:8em}.date-side p{margin:0;color:#555}
@container(max-width:480px){.date-ph{width:auto;left:0;top:auto;height:36%}.date-col{width:auto;right:5%;bottom:40%}.d{font-size:40cqi}.d2{font-size:22cqi}}'''
    return html, css, 'paper'


@concept('riven papperskant')
def k(n):
    html = f'''{ph('slide', 'torn-ph')}<div class="torn"><div class="torn-in">{lg('k', 'torn-lg')}{nav('row left')}<p>inte gjord för att passa in.</p></div></div>'''
    css = '''.torn-ph{position:absolute;inset:0 0 30% 0}.torn{position:absolute;left:0;right:0;bottom:0;height:40%;background:#f4f3ef;clip-path:polygon(0 18%,4% 12%,9% 19%,15% 9%,22% 16%,28% 7%,35% 15%,41% 10%,48% 18%,55% 8%,61% 14%,68% 6%,74% 15%,81% 9%,88% 17%,94% 10%,100% 16%,100% 100%,0 100%)}
.torn-in{position:absolute;left:5%;right:5%;bottom:12%;display:grid;gap:.8em;color:#111}.torn-lg{width:10em}.torn-in p{margin:0;color:#666;font-size:.85em}
@container(max-width:480px){.torn{height:46%}.torn-ph{bottom:36%}}'''
    return html, css, 'paper'


@concept('slit-scan')
def k(n):
    slices = ''.join(f'<div class="sl" style="--i:{i}"></div>' for i in range(12))
    html = f'''<div class="slit">{slices}</div><div class="slit-c">{lg('w', 'slit-lg')}{nav('row')}</div>'''
    css = f'''.slit{{position:absolute;inset:0;display:grid;grid-template-rows:repeat(12,1fr)}}.sl{{background:var(--swiss) calc(50% + (var(--i) - 6) * 2.2%) calc(var(--i) * 9%)/cover;background-size:140% auto}}
.slit-c{{position:absolute;left:0;right:0;bottom:0;padding:1em 5%;background:#0e0e0e;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1em}}.slit-lg{{width:9em}}'''
    return html, css, 'night'


@concept('menyn som bildrutor')
def k(n):
    tiles = ''.join(f'<a class="tile" href="#">{ph(p)}<span>{x}</span></a>' for x, p in zip(NAV, ['slide', 'street', 'swiss', 'jam', 'street', 'slide', 'swiss']))
    html = f'''<div class="tiles"><div class="tile lgtile">{lg('w', 'tiles-lg')}</div>{tiles}</div>'''
    css = '''.tiles{position:absolute;inset:0;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:1fr 1fr;gap:3px}
.tile{position:relative;display:block;overflow:hidden}.tile .ph{position:absolute;inset:0;transition:transform .4s}.tile:hover .ph{transform:scale(1.06)}
.tile span{position:absolute;left:.6em;bottom:.5em;background:#0e0e0e;padding:.1em .4em;font-size:.9em}.lgtile{display:grid;place-items:center;background:#0e0e0e}.tiles-lg{width:70%}
@container(max-width:480px){.tiles{grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,1fr)}}'''
    return html, css, 'night'


@concept('maskoten tittar upp')
def k(n):
    html = f'''{ph('swiss', 'full dim')}<div class="peek">{mascot('peek-m')}</div><div class="bubble">{nav('stack')}</div><div class="peek-lg">{lg('w', 'pk-lg')}</div>'''
    css = '''.peek{position:absolute;left:12%;bottom:-18%;width:24%;transform:rotate(8deg)}.peek-m{width:100%}
.bubble{position:absolute;left:34%;bottom:30%;background:#f4f3ef;color:#111;padding:.8em 1.2em;border-radius:1.2em;font-size:.95em}.bubble::after{content:"";position:absolute;left:-.8em;bottom:1em;border:.6em solid transparent;border-right-color:#f4f3ef}
.peek-lg{position:absolute;right:5%;top:6%;width:min(12em,30cqi)}.pk-lg{width:100%}
@container(max-width:480px){.peek{left:4%;width:46%;bottom:-10%}.bubble{left:auto;right:6%;bottom:38%}}'''
    return html, css, 'night'


@concept('biljett med perforering')
def k(n):
    html = f'''<div class="tix">{ph('jam', 'tix-ph')}<div class="tix-stub">{lg('k', 'tix-lg')}<p>adm. one<br>cork 3</p>{nav('stack')}<p class="no">nr 0001 / 0025</p></div></div>'''
    css = '''.tix{position:absolute;inset:14% 8%;display:grid;grid-template-columns:2.2fr 1fr;filter:drop-shadow(0 16px 30px rgb(0 0 0/.25))}
.tix-ph{border-radius:10px 0 0 10px}.tix-stub{background:#f4f3ef;color:#111;border-left:2px dashed #111;border-radius:0 10px 10px 0;padding:1em;display:flex;flex-direction:column;justify-content:space-between;font-size:.85em}
.tix-stub p{margin:0}.tix-lg{width:7em}.no{color:#777;font-size:.85em}
@container(max-width:480px){.tix{inset:5% 8%;grid-template-columns:1fr;grid-template-rows:1fr auto}.tix-ph{border-radius:10px 10px 0 0}.tix-stub{border-left:0;border-top:2px dashed #111;border-radius:0 0 10px 10px;gap:.6em}}'''
    return html, css, 'street'


@concept('kassettband')
def k(n):
    html = f'''{ph('street', 'full dim')}<div class="tape"><div class="tape-label">{lg('k', 'tape-lg')}<span>sida a — cork 3</span></div><div class="reels"><i></i><span class="twin"></span><i></i></div>
<div class="tape-nav">{nav('row')}</div></div>'''
    css = '''.tape{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(30em,78cqi);aspect-ratio:1.6;background:#1b1b1b;border-radius:10px;border:2px solid #333;padding:4%;display:grid;grid-template-rows:auto 1fr auto;gap:4%}
.tape-label{background:#f4f3ef;color:#111;padding:.5em .8em;display:flex;justify-content:space-between;align-items:center;font-size:.75em}.tape-lg{width:6em}
.reels{display:flex;align-items:center;justify-content:center;gap:8%}.reels i{width:16%;aspect-ratio:1;border-radius:50%;border:6px dotted #f4f3ef;animation:spin 3s linear infinite}.twin{width:30%;height:40%;background:#000;border:1px solid #444}
@keyframes spin{to{transform:rotate(360deg)}}.tape-nav .nv{display:flex;flex-wrap:wrap;justify-content:center;gap:.2em 1em;font-size:.8em}'''
    return html, css, 'night'


@concept('tunnelbanekarta')
def k(n):
    st = ''.join(f'<li style="--x:{8 + i * 13}%;--y:{[60, 40, 58, 30, 52, 36, 62][i]}%"><span class="stn"></span><a href="#">{x}</a></li>' for i, x in enumerate(NAV))
    html = f'''<svg class="line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points="8,60 21,40 34,58 47,30 60,52 73,36 86,62"/></svg><ul class="stations">{st}</ul>
<div class="metro-top">{lg('k', 'metro-lg')}<span>linje 3 · cork</span></div>{ph('slide', 'metro-ph')}'''
    css = '''.line{position:absolute;inset:0;width:100%;height:100%}.line polyline{fill:none;stroke:#111;stroke-width:1.4;vector-effect:non-scaling-stroke}
.stations{list-style:none;margin:0;padding:0}.stations li{position:absolute;left:var(--x);top:var(--y);transform:translate(-50%,-50%);display:grid;justify-items:center;gap:.3em}.stn{width:1em;height:1em;border-radius:50%;background:#f4f3ef;border:3px solid #111}
.stations a{font-size:.85em;background:#f4f3ef;padding:0 .2em}
.metro-top{position:absolute;left:5%;top:6%;display:grid;gap:.3em;font-size:.8em;color:#555}.metro-lg{width:9em}.metro-ph{position:absolute;right:5%;top:6%;width:24%;aspect-ratio:1;border-radius:50%}
@container(max-width:480px){.stations a{font-size:.75em}.metro-ph{width:30%}}'''
    return html, css, 'paper'


@concept('resultatlista från en tävling')
def k(n):
    rows = ''.join(f'<li><span>{i + 1}.</span><a href="#">{x}</a><span class="pts">{98 - i * 4},{(i * 3) % 10}</span></li>' for i, x in enumerate(NAV))
    html = f'''<div class="res">{lg('w', 'res-lg')}<p class="res-h">rail jam · final · resultat</p><ol>{rows}</ol></div>{ph('jam', 'res-ph')}'''
    css = '''.res{position:absolute;left:5%;top:7%;bottom:7%;width:48%;display:flex;flex-direction:column;gap:.8em}.res-lg{width:9em}.res-h{margin:0;color:#999;font-size:.8em}
.res ol{list-style:none;margin:0;padding:0;display:grid}.res li{display:grid;grid-template-columns:2em 1fr auto;padding:.3em 0;border-top:1px solid #333}.res li:first-child{font-size:1.25em}.pts{color:#aaa}
.res-ph{position:absolute;right:0;top:0;bottom:0;width:42%}
@container(max-width:480px){.res{width:auto;right:5%;bottom:auto}.res-ph{left:0;width:auto;top:auto;height:30%}}'''
    return html, css, 'night'


@concept('strålkastare som följer musen')
def k(n):
    html = f'''{ph('street', 'full spot-ph')}<div class="spot"></div><div class="spot-c">{lg('w', 'spot-lg')}{nav('row')}<span class="hint">flytta muspekaren</span></div>'''
    css = '''.spot{position:absolute;inset:0;background:radial-gradient(circle 18cqi at var(--mx,55%) var(--my,40%),transparent 0,transparent 60%,rgb(8 8 8/.94) 100%);pointer-events:none}
.spot-c{position:absolute;left:5%;right:5%;bottom:7%;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:1em}.spot-lg{width:9em}.hint{width:100%;color:#777;font-size:.75em}'''
    return html, css, 'night spotlight'


@concept('menyn byter bild')
def k(n):
    links = ''.join(f'<li><a href="#" data-ph="{p}">{x}</a></li>' for x, p in zip(NAV, ['slide', 'street', 'swiss', 'jam', 'street', 'slide', 'swiss']))
    html = f'''{ph('slide', 'full swap-ph')}<div class="shade-l"></div><div class="swap">{lg('w', 'swap-lg')}<ul class="nv swap-nav">{links}</ul><span class="hint">håll över menyn</span></div>'''
    css = '''.shade-l{position:absolute;inset:0;background:linear-gradient(90deg,rgb(10 10 10/.8),transparent 60%)}.swap{position:absolute;left:5%;top:8%;bottom:8%;display:flex;flex-direction:column;justify-content:space-between}
.swap-lg{width:8em}.swap-nav{display:grid;gap:.05em;font-size:1.8em;line-height:1.1}.swap-nav a{opacity:.55}.swap-nav a:hover,.swap-nav a:focus-visible{opacity:1;text-decoration:none}.hint{color:#999;font-size:.75em}'''
    return html, css, 'night swapper'


@concept('förstoringsglas')
def k(n):
    html = f'''{ph('swiss', 'full')}<div class="loupe"></div><div class="loupe-c">{lg('w', 'lp-lg')}{nav('stack')}</div>'''
    css = f'''.loupe{{position:absolute;left:62%;top:44%;width:30cqi;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;border:3px solid #f4f3ef;background:var(--swiss) 64% 47%/360% auto;box-shadow:0 10px 40px rgb(0 0 0/.5)}}
.loupe::after{{content:"";position:absolute;right:-24%;bottom:-24%;width:30%;height:8%;background:#f4f3ef;transform:rotate(45deg);border-radius:4px}}
.loupe-c{{position:absolute;left:5%;top:8%;bottom:8%;display:flex;flex-direction:column;justify-content:space-between}}.lp-lg{{width:9em}}
@container(max-width:480px){{.loupe{{left:50%;top:38%;width:60cqi}}.loupe-c{{top:auto;bottom:5%;gap:1em}}}}'''
    return html, css, 'night'


@concept('negativ')
def k(n):
    html = f'''<div class="neg-wrap">{ph('jam', 'neg')}<span class="edge">cork 400 · 29 → 29a</span></div><div class="neg-c">{lg('k', 'neg-lg')}{nav('row')}</div>'''
    css = '''.neg-wrap{position:absolute;inset:7% 7% 24% 7%;background:#2a2622;padding:2.2em 1.2em}.neg{position:absolute;inset:2.2em 1.2em;filter:invert(1) contrast(.9)}
.edge{position:absolute;left:1.2em;top:.5em;font-size:.7em;color:#e8b37a;letter-spacing:.1em}.neg-c{position:absolute;left:7%;right:7%;bottom:7%;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1em}.neg-lg{width:9em}'''
    return html, css, 'paper'


@concept('vykort')
def k(n):
    html = f'''<div class="pc">{ph('swiss', 'pc-ph')}<div class="pc-back"><div class="stamp">{mascot('stamp-m')}</div><span class="pm">uppsala<br>— cork —</span>
<p class="msg">hej. vi gör två plagg i 25 ex. hör av dig.</p><ul class="addr">{''.join(f'<li><a href="#">{x}</a></li>' for x in NAV)}</ul>{lg('k', 'pc-lg')}</div></div>'''
    css = '''.pc{position:absolute;inset:10% 6%;display:grid;grid-template-columns:1fr 1fr;background:#fbfaf6;box-shadow:0 18px 40px rgb(0 0 0/.25);transform:rotate(1.5deg)}
.pc-ph{min-height:0}.pc-back{position:relative;padding:1.2em;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto 1fr auto;gap:.8em;color:#111;font-size:.82em}
.stamp{grid-column:2;justify-self:end;width:4.2em;padding:.3em;border:2px dotted #111;background:#fff}.stamp-m{width:100%}.pm{grid-column:1;grid-row:1;align-self:center;width:6em;height:6em;border:1.5px solid #555;border-radius:50%;display:grid;place-items:center;text-align:center;font-size:.75em;color:#555;transform:rotate(-12deg)}
.msg{margin:0;align-self:center;color:#444}.addr{list-style:none;margin:0;padding:0;display:grid}.addr li{border-bottom:1px solid #bbb}.pc-lg{grid-column:1/-1;width:8em}
@container(max-width:480px){.pc{inset:5% 6%;grid-template-columns:1fr;grid-template-rows:.8fr 1.2fr}}'''
    return html, css, 'paper'


@concept('skidans topsheet')
def k(n):
    html = f'''<div class="ski">{ph('slide', 'ski-ph')}<div class="ski-lg">{lg('w', 'sk-lg')}</div></div><div class="ski2">{ph('street', 'ski-ph')}</div><div class="ski-c">{nav('stack')}<span>cork 3 — 25 ex</span></div>'''
    css = '''.ski,.ski2{position:absolute;top:-10%;bottom:-10%;width:16%;border-radius:999px 999px 40% 40%/14% 14% 6% 6%;overflow:hidden;transform:rotate(18deg);box-shadow:0 12px 30px rgb(0 0 0/.3)}.ski{left:22%}.ski2{left:42%;transform:rotate(14deg)}
.ski-ph{position:absolute;inset:0}.ski-lg{position:absolute;left:50%;top:50%;width:300%;transform:translate(-50%,-50%) rotate(-90deg)}.sk-lg{width:100%}
.ski-c{position:absolute;right:6%;top:50%;transform:translateY(-50%);display:grid;gap:1em;color:#111;font-size:1.1em}.ski-c span{color:#777;font-size:.75em}
@container(max-width:480px){.ski,.ski2{width:24%}.ski{left:8%}.ski2{left:36%}.ski-c{right:6%}}'''
    return html, css, 'paper'


@concept('feltryck, två lager')
def k(n):
    html = f'''{ph('jam', 'mis a')}{ph('jam', 'mis b')}<div class="mis-shade"></div><div class="mis-c">{lg('w', 'mis-lg')}<div class="mis-lg2">{lg('w', 'mis-lg')}</div>{nav('row')}</div>'''
    css = '''.mis{position:absolute;inset:0}.mis-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgb(10 10 10/.85),transparent 55%)}.mis.b{transform:translate(1.4%,1%);mix-blend-mode:screen;opacity:.45}
.mis-c{position:absolute;left:5%;right:5%;bottom:7%;display:grid;gap:1em;justify-items:start}.mis-lg{width:min(22em,60cqi)}.mis-lg2{position:absolute;top:0;left:.35em;opacity:.35}'''
    return html, css, 'night'


@concept('flikar som mappar')
def k(n):
    tabs = ''.join(f'<li class="tab" style="--i:{i}"><a href="#">{x}</a></li>' for i, x in enumerate(NAV))
    html = f'''<ul class="tabs">{tabs}</ul><div class="folder">{ph('street', 'fold-ph')}<div class="fold-lg">{lg('w', 'fl-lg')}</div></div>'''
    css = '''.tabs{position:absolute;left:6%;right:6%;top:8%;list-style:none;margin:0;padding:0;display:flex;gap:4px}.tab a{display:block;padding:.4em .9em;background:#e6e5e1;border-radius:8px 8px 0 0;font-size:.85em;color:#111}.tab:first-child a{background:#111;color:#f4f3ef}
.folder{position:absolute;left:6%;right:6%;top:calc(8% + 2.1em);bottom:8%;background:#111;padding:1.4%;border-radius:0 8px 8px 8px}.fold-ph{position:absolute;inset:1.4%;border-radius:4px}.fold-lg{position:absolute;left:4%;bottom:6%;width:min(16em,40cqi)}.fl-lg{width:100%}
@container(max-width:480px){.tabs{flex-wrap:wrap}.folder{top:calc(8% + 4.4em)}}'''
    return html, css, 'paper'


@concept('hängetikett')
def k(n):
    html = f'''{ph('slide', 'full dim')}<div class="string"></div><div class="tag"><span class="hole"></span>{lg('k', 'tag-lg')}<p>cork 3 puff jacket<br>3 000 kr</p>{nav('stack')}<p class="sz">s · m · l</p></div>'''
    css = '''.string{position:absolute;left:58%;top:0;height:18%;border-left:1.5px solid #f4f3ef}
.tag{position:absolute;left:50%;top:16%;width:min(13em,46cqi);background:#f4f3ef;color:#111;padding:2.6em 1.2em 1.2em;display:grid;gap:.8em;font-size:.85em;transform:rotate(-6deg);clip-path:polygon(18% 0,82% 0,100% 12%,100% 100%,0 100%,0 12%)}
.hole{position:absolute;left:50%;top:1em;width:.9em;height:.9em;border-radius:50%;background:#0e0e0e;transform:translateX(-50%)}.tag-lg{width:7em}.tag p{margin:0}.sz{color:#777}
@container(max-width:480px){.tag{left:28%;top:14%}}'''
    return html, css, 'night'


@concept('fotobås-remsa')
def k(n):
    shots = ''.join(ph(p, 'booth-ph') for p in ['slide', 'street', 'swiss', 'jam'])
    html = f'''<div class="booth">{shots}<span>cork · uppsala</span></div><div class="booth-c">{lg('k', 'booth-lg')}{nav('stack')}</div>'''
    css = '''.booth{position:absolute;left:20%;top:-4%;width:18%;background:#fff;padding:1.2% 1.2% 3%;display:grid;gap:4px;transform:rotate(-7deg);box-shadow:0 18px 40px rgb(0 0 0/.25)}.booth-ph{aspect-ratio:4/3.4}.booth span{font-size:.7em;color:#777;text-align:center}
.booth-c{position:absolute;left:52%;top:50%;transform:translateY(-50%);display:grid;gap:1.2em;color:#111}.booth-lg{width:10em}
@container(max-width:480px){.booth{left:8%;width:36%;top:2%}.booth-c{left:52%;top:auto;bottom:6%;transform:none}}'''
    return html, css, 'paper'


@concept('cirkel och båge')
def k(n):
    html = f'''<div class="circ">{ph('swiss', 'circ-ph')}</div><svg class="arc" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="ap{n}" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0"/></defs>
<text><textPath href="#ap{n}">not made to fit in · cork 3 · two pieces · 25 of each · uppsala · </textPath></text></svg><div class="circ-c">{lg('k', 'circ-lg')}{nav('row')}</div>'''
    css = '''.circ{position:absolute;left:50%;top:44%;width:min(46cqi,62cqh);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;overflow:hidden}.circ-ph{position:absolute;inset:0}
.arc{position:absolute;left:50%;top:44%;width:min(60cqi,80cqh);transform:translate(-50%,-50%);animation:spin 40s linear infinite;font-family:inherit;font-size:9.5px;fill:#111}@keyframes spin{to{transform:translate(-50%,-50%) rotate(360deg)}}
.circ-c{position:absolute;left:5%;right:5%;bottom:6%;display:grid;justify-items:center;gap:.8em}.circ-lg{width:8em}
@container(max-width:480px){.circ{width:66cqi;top:38%}.arc{width:88cqi;top:38%}}'''
    return html, css, 'paper'


@concept('manifest över bilden')
def k(n):
    html = f'''{ph('street', 'full dim')}<p class="mani">inte<br>gjord<br>för att<br>passa in.</p><div class="mani-c">{lg('w', 'mani-lg')}{nav('row right')}</div>'''
    css = '''.mani{position:absolute;left:5%;top:5%;margin:0;font-size:min(13cqi,6.5em);line-height:.95;font-weight:600}
.mani-c{position:absolute;right:5%;bottom:7%;display:grid;justify-items:end;gap:.8em}.mani-lg{width:9em}.nv.row.right{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:.2em 1em}
@container(max-width:480px){.mani{font-size:17cqi}.mani-c{left:5%;justify-items:start}.nv.row.right{justify-content:flex-start}}'''
    return html, css, 'night'


@concept('korken studsar över menyn')
def k(n):
    html = f'''{ph('jam', 'bounce-ph')}<div class="bounce">{lg('k', 'bc-lg')}<div class="track"><div class="hop">{mascot('hop-m')}</div></div>{nav('row bline')}</div>'''
    css = '''.bounce-ph{position:absolute;left:0;right:0;bottom:0;height:32%}
.bounce{position:absolute;left:6%;right:6%;top:7%;bottom:36%;display:grid;grid-template-rows:auto 1fr auto;justify-items:center;color:#111}.bc-lg{width:10em}
.track{position:relative;width:100%;align-self:end;height:5.5em}.hop{position:absolute;left:50%;bottom:0;width:2.8em;margin-left:-1.4em;animation:hopx 4s linear infinite}
.hop-m{width:100%;animation:hopy .5s cubic-bezier(.3,.7,.5,1) infinite alternate}
@keyframes hopx{0%,100%{transform:translateX(-35cqi)}50%{transform:translateX(35cqi)}}@keyframes hopy{to{transform:translateY(-2em)}}
.nv.bline{width:100%;justify-content:center;border-top:1px solid #111;padding-top:.6em}'''
    return html, css, 'paper'


render(C, 'kreativa.html', 'CORK kreativa heros', 'cork-hero-picks-kreativa',
       '{count} helt olika idéer för startsidans hero, var och en med egen layout. Några rör sig eller reagerar på muspekaren. '
       '<a href="clean.html">Clean</a> · <a href="fem-stilar.html">fem stilar</a> · <a href="index.html">första labbet</a>.')
