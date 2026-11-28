"""Builds design/hero-lab/clean.html: clean hero compositions for CORK.

Each one is its own layout, kept quiet: lots of space, hairlines, small type,
one photo (or a few small ones) and nothing that is only decoration.
Usage: python design/hero-lab/clean.py   (needs Pillow)
"""

from labkit import NAV, lg, mascot, nav, ph, render

C = []


def concept(title):
    def wrap(fn):
        C.append((title, fn))
        return fn
    return wrap


def numbered(cls=''):
    return f'<ol class="nv num {cls}">' + ''.join(f'<li><span>{i + 1:02d}</span><a href="#">{x}</a></li>' for i, x in enumerate(NAV)) + '</ol>'


# shared quiet type for every clean concept
BASE = '''.cl{position:absolute;inset:0;font-size:.92em}.cl p{margin:0}.cl .mut{color:#8a8a86}.k.night .cl .mut{color:#8c8c88}
.cl .hair{border-top:1px solid currentColor;opacity:.25}
.nv.num{display:grid;gap:.15em}.nv.num li{display:grid;grid-template-columns:2.2em 1fr}.nv.num span{color:#8a8a86}
.nv.thin{display:flex;flex-wrap:wrap;gap:.2em 1.4em}'''


@concept('liten bild i mitten')
def k(n):
    return f'''<div class="cl c1">{lg('k', 'c1-lg')}{ph('slide', 'c1-ph')}{nav('thin')}</div>''', BASE + '''
.c1{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2.2em}.c1-lg{width:6.5em}.c1-ph{width:min(18em,40cqi);aspect-ratio:4/5}
@container(max-width:480px){.c1-ph{width:64cqi}.c1 .nv{justify-content:center}}''', 'paper'


@concept('helbild, bara hörnen')
def k(n):
    return f'''{ph('swiss', 'full')}<div class="c2-shade"></div><div class="cl c2">{lg('w', 'c2-lg')}<span class="c2-tr">cork 3 — förbeställ</span>{nav('thin c2-nav')}<span class="c2-bl mut">uppsala</span></div>''', BASE + '''
.c2-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgb(10 10 10/.45),transparent 22%,transparent 70%,rgb(10 10 10/.6))}.c2>*{position:absolute}.c2-lg{left:4%;top:5%;width:6em}.c2-tr{right:4%;top:5%}.c2-nav{right:4%;bottom:5%;max-width:60%;justify-content:flex-end}.c2-bl{left:4%;bottom:5%}
@container(max-width:480px){.c2-nav{left:4%;max-width:none;justify-content:flex-start;bottom:10%}}''', 'night'


@concept('bild uppe till höger, text nere till vänster')
def k(n):
    return f'''<div class="cl c3">{ph('street', 'c3-ph')}<div class="c3-txt">{lg('k', 'c3-lg')}<p class="mut">inte gjord för att passa in.</p>{nav('thin')}</div></div>''', BASE + '''
.c3-ph{position:absolute;right:5%;top:7%;width:56%;aspect-ratio:3/2}.c3-txt{position:absolute;left:5%;bottom:7%;width:34%;display:grid;gap:1.2em}.c3-lg{width:7em}
@container(max-width:480px){.c3-ph{left:5%;width:auto}.c3-txt{width:auto;right:5%}}''', 'paper'


@concept('två spalter med hårlinje')
def k(n):
    return f'''<div class="cl c4"><div class="c4-l">{lg('k', 'c4-lg')}{numbered()}</div><div class="c4-r">{ph('jam', 'c4-ph')}<p class="mut">fig. 01 — rail jam, natt</p></div></div>''', BASE + '''
.c4{display:grid;grid-template-columns:1fr 1.4fr}.c4-l{padding:7% 8%;display:flex;flex-direction:column;justify-content:space-between;border-right:1px solid rgb(17 17 17/.2)}.c4-lg{width:6em}
.c4-r{padding:7% 8%;display:grid;grid-template-rows:1fr auto;gap:.6em}.c4-ph{min-height:0}
@container(max-width:480px){.c4{grid-template-columns:1fr;grid-template-rows:1.2fr 1fr}.c4-l{order:2;border-right:0;border-top:1px solid rgb(17 17 17/.2)}}''', 'paper'


@concept('bildband och en rad')
def k(n):
    return f'''<div class="cl c5">{ph('swiss', 'c5-ph')}<div class="c5-row">{lg('k', 'c5-lg')}{nav('thin')}</div></div>''', BASE + '''
.c5-ph{position:absolute;left:0;right:0;top:12%;height:46%}.c5-row{position:absolute;left:5%;right:5%;top:68%;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1em;border-top:1px solid rgb(17 17 17/.25);padding-top:1em}.c5-lg{width:6em}''', 'paper'


@concept('bild med vit marginal och bildtext')
def k(n):
    return f'''<div class="cl c6">{ph('slide', 'c6-ph')}<div class="c6-cap"><span>{lg('k', 'c6-lg')}</span>{nav('thin')}</div></div>''', BASE + '''
.c6-ph{position:absolute;left:6%;right:6%;top:6%;bottom:22%}.c6-cap{position:absolute;left:6%;right:6%;bottom:6%;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:.8em}.c6-lg{display:block;width:5.5em}''', 'paper'


@concept('rutnät, menyn i första kolumnen')
def k(n):
    return f'''<div class="cl c7"><div class="c7-a">{lg('k', 'c7-lg')}{numbered()}</div>{ph('street', 'c7-ph')}<p class="c7-cap mut">cork 3 · två plagg · 25 av varje</p></div>''', BASE + '''
.c7{display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:1fr auto;gap:1em 2%;padding:6% 5%}.c7-a{grid-column:1/4;display:flex;flex-direction:column;justify-content:space-between}.c7-lg{width:5.5em}
.c7-ph{grid-column:5/13;min-height:0}.c7-cap{grid-column:5/13}
@container(max-width:480px){.c7{grid-template-rows:1fr auto auto}.c7-ph{grid-column:1/13;grid-row:1}.c7-cap{grid-column:1/13;grid-row:2}.c7-a{grid-column:1/13;grid-row:3;gap:1em}}''', 'paper'


@concept('kvadrat till vänster, menyn mot baslinjen')
def k(n):
    return f'''<div class="cl c8">{ph('swiss', 'c8-ph')}<div class="c8-r">{lg('k', 'c8-lg')}{nav('stack c8-nav')}</div></div>''', BASE + '''
.c8-ph{position:absolute;left:5%;top:8%;bottom:8%;aspect-ratio:1}.c8-r{position:absolute;right:5%;top:8%;bottom:8%;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end;text-align:right}.c8-lg{width:6em}
@container(max-width:480px){.c8-ph{right:5%;bottom:auto;aspect-ratio:1}.c8-r{left:5%;top:auto;align-items:flex-start;text-align:left;gap:1.2em}}''', 'paper'


@concept('svart, loggan och en tumnagel')
def k(n):
    return f'''<div class="cl c9">{lg('w', 'c9-lg')}{nav('thin c9-nav')}{ph('jam', 'c9-ph')}</div>''', BASE + '''
.c9{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.4em}.c9-lg{width:9em}.c9-nav{justify-content:center}
.c9-ph{position:absolute;right:5%;bottom:7%;width:min(8em,22cqi);aspect-ratio:4/5}''', 'night'


@concept('tre små bilder på rad')
def k(n):
    pics = ''.join(ph(p, 'c10-ph') for p in ['slide', 'street', 'swiss'])
    return f'''<div class="cl c10">{lg('k', 'c10-lg')}<div class="c10-row">{pics}</div>{nav('thin')}</div>''', BASE + '''
.c10{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2em}.c10-lg{width:6em}.c10-row{display:grid;grid-template-columns:repeat(3,min(10em,22cqi));gap:.8em}.c10-ph{aspect-ratio:3/4}
@container(max-width:480px){.c10-row{grid-template-columns:repeat(3,26cqi)}.c10 .nv{justify-content:center}}''', 'paper'


@concept('foto uppe, papper nere')
def k(n):
    return f'''<div class="cl c11">{ph('street', 'c11-ph')}<div class="c11-b">{lg('k', 'c11-lg')}{nav('stack c11-nav')}</div></div>''', BASE + '''
.c11-ph{position:absolute;left:0;right:0;top:0;height:58%}.c11-b{position:absolute;left:5%;right:5%;top:58%;bottom:0;display:flex;justify-content:space-between;align-items:center}.c11-lg{width:min(16em,40cqi)}.c11-nav{text-align:right}
@container(max-width:480px){.c11-b{flex-direction:column;align-items:flex-start;justify-content:center;gap:1em}.c11-nav{text-align:left}}''', 'paper'


@concept('index med hårlinjer')
def k(n):
    rows = ''.join(f'<li><a href="#">{x}</a><span class="mut">{["film", "två plagg", "fem åkare", "historia", "så görs det", "släpp", "frågor"][i]}</span></li>' for i, x in enumerate(NAV))
    return f'''<div class="cl c12"><div class="c12-top">{lg('k', 'c12-lg')}{ph('slide', 'c12-ph')}</div><ul class="c12-list">{rows}</ul></div>''', BASE + '''
.c12{padding:5% 5%;display:grid;grid-template-rows:auto 1fr;gap:1.2em}.c12-top{display:flex;justify-content:space-between;align-items:flex-start}.c12-lg{width:6em}.c12-ph{width:min(9em,24cqi);aspect-ratio:4/5}
.c12-list{list-style:none;margin:0;padding:0;display:grid;align-content:end}.c12-list li{display:flex;justify-content:space-between;padding:.35em 0;border-top:1px solid rgb(17 17 17/.2)}''', 'paper'


@concept('helbild, loggan i mitten och en list')
def k(n):
    return f'''{ph('slide', 'full')}<div class="cl c13"><div class="c13-mid">{lg('w', 'c13-lg')}</div><div class="c13-bar">{nav('thin')}</div></div>''', BASE + '''
.c13-mid{position:absolute;inset:0 0 3em;display:grid;place-items:center}.c13-lg{width:min(16em,46cqi)}.c13-bar{position:absolute;left:0;right:0;bottom:0;padding:1em 4%;border-top:1px solid rgb(244 243 239/.5);background:rgb(10 10 10/.35)}
@container(max-width:480px){.c13-mid{bottom:5em}}''', 'night'


@concept('meningen först, liten bild')
def k(n):
    return f'''<div class="cl c14"><p class="c14-big">inte gjord för<br>att passa in.</p>{ph('jam', 'c14-ph')}<div class="c14-foot">{lg('k', 'c14-lg')}{nav('thin')}</div></div>''', BASE + '''
.c14-big{position:absolute;left:5%;top:9%;font-size:2.3em;line-height:1.1}.c14-ph{position:absolute;right:5%;top:9%;width:min(10em,26cqi);aspect-ratio:4/5}
.c14-foot{position:absolute;left:5%;right:5%;bottom:7%;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1em}.c14-lg{width:6em}
@container(max-width:480px){.c14-big{font-size:1.7em;top:46%}.c14-ph{left:5%;width:auto;aspect-ratio:auto;height:34%}}''', 'paper'


@concept('svart och vitt 50/50')
def k(n):
    return f'''<div class="cl c15"><div class="c15-l">{lg('w', 'c15-lg')}{nav('stack')}</div>{ph('swiss', 'c15-ph')}</div>''', BASE + '''
.c15{display:grid;grid-template-columns:1fr 1fr}.c15-l{background:#0e0e0e;color:#f4f3ef;padding:8%;display:flex;flex-direction:column;justify-content:space-between}.c15-lg{width:7em}.c15-ph{min-height:0}
@container(max-width:480px){.c15{grid-template-columns:1fr;grid-template-rows:1fr 1fr}}''', 'paper'


@concept('smal kolumn, bred bild')
def k(n):
    return f'''<div class="cl c16"><div class="c16-col">{lg('k', 'c16-lg')}{ph('swiss', 'c16-ph')}{nav('thin')}</div></div>''', BASE + '''
.c16-col{position:absolute;left:8%;top:8%;bottom:8%;width:58%;display:flex;flex-direction:column;justify-content:space-between;gap:1em}.c16-lg{width:6em}.c16-ph{aspect-ratio:21/9}
@container(max-width:480px){.c16-col{width:auto;right:8%}.c16-ph{aspect-ratio:4/3}}''', 'paper'


@concept('bild på vägg med etikett')
def k(n):
    return f'''<div class="cl c17">{ph('slide', 'c17-ph')}<div class="c17-label">{lg('k', 'c17-lg')}<p class="mut">cork 3, 2026<br>två plagg, 25 av varje</p>{nav('stack')}</div></div>''', BASE + '''
.c17{background:#e9e8e4}.c17-ph{position:absolute;left:16%;top:12%;width:36%;aspect-ratio:4/5;box-shadow:0 10px 30px rgb(0 0 0/.12)}
.c17-label{position:absolute;left:60%;bottom:16%;width:24%;background:#f8f7f4;padding:1em;display:grid;gap:.8em;font-size:.85em}.c17-lg{width:5em}
@container(max-width:480px){.c17-ph{left:12%;width:64%;top:6%}.c17-label{left:12%;width:64%;bottom:6%}}''', 'paper'


@concept('fyra små i rutnät')
def k(n):
    pics = ''.join(ph(p) for p in ['slide', 'street', 'swiss', 'jam'])
    return f'''<div class="cl c18"><div class="c18-g">{pics}</div><div class="c18-l">{lg('k', 'c18-lg')}</div><div class="c18-r">{nav('stack')}</div></div>''', BASE + '''
.c18-g{position:absolute;left:50%;top:50%;width:min(20em,40cqi);aspect-ratio:1;transform:translate(-50%,-50%);display:grid;grid-template-columns:1fr 1fr;gap:4px}
.c18-l{position:absolute;left:5%;top:50%;transform:translateY(-50%)}.c18-lg{width:6em}.c18-r{position:absolute;right:5%;top:50%;transform:translateY(-50%);text-align:right}
@container(max-width:480px){.c18-g{width:70cqi;top:42%}.c18-l{top:6%;transform:none}.c18-r{top:auto;bottom:5%;transform:none;left:5%;text-align:left}.c18-r .nv{display:flex;flex-wrap:wrap;gap:.2em 1em}}''', 'paper'


@concept('maskoten, liten')
def k(n):
    return f'''<div class="cl c19">{mascot('c19-m')}{lg('k', 'c19-lg')}{nav('thin')}</div>''', BASE + '''
.c19{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.4em}.c19-m{width:3.2em}.c19-lg{width:6em}
@container(max-width:480px){.c19 .nv{justify-content:center}}''', 'paper'


@concept('hög bild till vänster, luft till höger')
def k(n):
    return f'''<div class="cl c20">{ph('slide', 'c20-ph')}<div class="c20-r">{lg('k', 'c20-lg')}<p class="mut">cork 3 — förbeställning öppen.</p>{nav('stack')}</div></div>''', BASE + '''
.c20-ph{position:absolute;left:0;top:0;bottom:0;width:32%}.c20-r{position:absolute;left:40%;top:50%;transform:translateY(-50%);display:grid;gap:1.4em}.c20-lg{width:9em}
@container(max-width:480px){.c20-ph{width:auto;right:0;bottom:auto;height:46%}.c20-r{left:8%;top:auto;bottom:6%;transform:none}}''', 'paper'


@concept('helbild med etikettremsa')
def k(n):
    return f'''{ph('street', 'c21-ph')}<div class="cl c21"><div class="c21-strip">{lg('k', 'c21-lg')}<span class="mut">cork 3</span>{nav('thin')}</div></div>''', BASE + '''
.c21-ph{position:absolute;left:0;right:0;top:0;bottom:4.2em}.c21-strip{position:absolute;left:0;right:0;bottom:0;height:4.2em;padding:0 4%;display:flex;align-items:center;gap:2em;background:#f4f3ef}.c21-strip .nv{margin-left:auto}.c21-lg{width:5em}
@container(max-width:480px){.c21-ph{bottom:7.5em}.c21-strip{height:7.5em;flex-wrap:wrap;align-content:center;gap:.5em 1.2em}.c21-strip .nv{margin-left:0}}''', 'paper'


@concept('numrerad meny och bild')
def k(n):
    return f'''<div class="cl c22"><div class="c22-l">{numbered('c22-num')}{lg('k', 'c22-lg')}</div>{ph('swiss', 'c22-ph')}</div>''', BASE + '''
.c22{display:grid;grid-template-columns:1fr 1.3fr;gap:5%;padding:7% 5%}.c22-l{display:flex;flex-direction:column;justify-content:space-between}.c22-num{font-size:1.25em}.c22-lg{width:6em}.c22-ph{min-height:0}
@container(max-width:480px){.c22{grid-template-columns:1fr;grid-template-rows:1fr auto}.c22-ph{grid-row:1}.c22-l{gap:1.2em}.c22-num{font-size:1em}}''', 'paper'


@concept('datum i hörnet')
def k(n):
    return f'''<div class="cl c23"><span class="c23-d">24.12</span>{ph('jam', 'c23-ph')}<div class="c23-f">{lg('k', 'c23-lg')}{nav('thin')}</div></div>''', BASE + '''
.c23-d{position:absolute;right:5%;top:6%}.c23-ph{position:absolute;left:50%;top:46%;width:min(22em,44cqi);aspect-ratio:4/3;transform:translate(-50%,-50%)}
.c23-f{position:absolute;left:5%;right:5%;bottom:6%;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1em}.c23-lg{width:6em}
@container(max-width:480px){.c23-ph{width:80cqi;top:42%}}''', 'paper'


@concept('tre remsor med tunna mellanrum')
def k(n):
    pics = ''.join(f'<figure>{ph(p)}<figcaption class="mut">0{i + 1}</figcaption></figure>' for i, p in enumerate(['slide', 'street', 'swiss']))
    return f'''<div class="cl c24"><div class="c24-row">{pics}</div><div class="c24-f">{lg('k', 'c24-lg')}{nav('thin')}</div></div>''', BASE + '''
.c24-row{position:absolute;left:5%;right:5%;top:7%;bottom:24%;display:grid;grid-template-columns:repeat(3,1fr);gap:1.2%}.c24-row figure{margin:0;display:grid;grid-template-rows:1fr auto;gap:.4em}.c24-row .ph{min-height:0}
.c24-f{position:absolute;left:5%;right:5%;bottom:6%;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1em}.c24-lg{width:6em}
@container(max-width:480px){.c24-row{bottom:30%}}''', 'paper'


@concept('ram med loggan i kanten')
def k(n):
    return f'''<div class="cl c25"><div class="c25-frame">{ph('swiss', 'c25-ph')}<span class="c25-leg">{lg('k', 'c25-lg')}</span></div>{nav('thin c25-nav')}</div>''', BASE + '''
.c25-frame{position:absolute;left:6%;right:6%;top:10%;bottom:20%;border:1px solid #111;padding:1.6em}.c25-ph{width:100%;height:100%}
.c25-leg{position:absolute;left:1.4em;top:-.75em;background:#f4f3ef;padding:0 .6em}.c25-lg{width:5.5em}.c25-nav{position:absolute;left:6%;right:6%;bottom:7%;justify-content:center}''', 'paper'


@concept('två bilder, lätt förskjutna')
def k(n):
    return f'''<div class="cl c26">{ph('slide', 'c26-a')}{ph('swiss', 'c26-b')}<div class="c26-t">{lg('k', 'c26-lg')}{nav('stack')}</div></div>''', BASE + '''
.c26-a{position:absolute;left:8%;top:10%;width:30%;aspect-ratio:4/5}.c26-b{position:absolute;left:30%;top:34%;width:30%;aspect-ratio:4/5}
.c26-t{position:absolute;right:7%;top:10%;bottom:10%;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end;text-align:right}.c26-lg{width:6em}
@container(max-width:480px){.c26-a{left:6%;width:50%}.c26-b{left:36%;top:22%;width:50%}.c26-t{left:6%;top:auto;bottom:5%;align-items:flex-start;text-align:left;gap:1em}}''', 'paper'


@concept('omslag')
def k(n):
    return f'''<div class="cl c27"><div class="c27-top">{lg('k', 'c27-lg')}<span class="mut">nr 3 · vinter</span></div>{ph('street', 'c27-ph')}<div class="c27-f">{nav('thin')}</div></div>''', BASE + '''
.c27{display:grid;grid-template-rows:auto 1fr auto;gap:1em;padding:5% 6%}.c27-top{display:flex;justify-content:space-between;align-items:flex-end}.c27-lg{width:min(18em,46cqi)}.c27-ph{min-height:0}
.c27-f{border-top:1px solid rgb(17 17 17/.25);padding-top:.8em}''', 'paper'


@concept('svart, menyn som lista till vänster')
def k(n):
    return f'''{ph('jam', 'c28-ph')}<div class="cl c28"><div class="c28-l">{lg('w', 'c28-lg')}{nav('stack c28-nav')}<span class="mut">förbeställ cork 3</span></div></div>''', BASE + '''
.c28-ph{position:absolute;left:38%;right:0;top:0;bottom:0}.c28-l{position:absolute;left:5%;top:8%;bottom:8%;width:28%;display:flex;flex-direction:column;justify-content:space-between}.c28-lg{width:6em}.c28-nav{font-size:1.2em}
@container(max-width:480px){.c28-ph{left:0;bottom:50%}.c28-l{width:auto;right:5%;top:54%;gap:1em}}''', 'night'


@concept('bara typografi')
def k(n):
    return f'''<div class="cl c29">{lg('k', 'c29-lg')}<p class="mut">oberoende skidkläder från uppsala.<br>två plagg, 25 av varje.</p>{nav('thin c29-nav')}</div>''', BASE + '''
.c29{display:flex;flex-direction:column;justify-content:center;padding:0 12%;gap:1.6em}.c29-lg{width:min(24em,60cqi)}.c29 p{max-width:30ch}''', 'paper'


@concept('helbild, loggan liten i mitten, menyn under')
def k(n):
    return f'''{ph('slide', 'full')}<div class="c30-shade"></div><div class="cl c30">{lg('w', 'c30-lg')}{nav('thin c30-nav')}</div>''', BASE + '''
.c30-shade{position:absolute;inset:0;background:radial-gradient(ellipse at center,rgb(10 10 10/.62),rgb(10 10 10/.3) 70%)}.c30{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.2em}.c30-lg{width:6.5em}.c30-nav{justify-content:center}''', 'night'


render(C, 'clean.html', 'CORK clean heros', 'cork-hero-picks-clean',
       '{count} rena heros: mycket luft, tunna linjer, liten text och en idé per bild. Var och en har sin egen komposition. '
       '<a href="kreativa.html">Kreativa</a> · <a href="fem-stilar.html">fem stilar</a> · <a href="index.html">första labbet</a>.')
