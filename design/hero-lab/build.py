"""Builds design/hero-lab/index.html: 100 hero ideas for CORK to pick from.

Usage: python design/hero-lab/build.py   (needs Pillow)
Self-contained: the photos are embedded once, so it works straight from githack.
"""

import base64
import io
import urllib.parse
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).with_name('index.html')


def photo(name, width):
    im = Image.open(ROOT / 'src/assets/photos' / name).convert('L')
    im = im.resize((width, round(im.size[1] * width / im.size[0])), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, 'JPEG', quality=60, optimize=True, progressive=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode()


PHOTOS = {
    'slide': (photo('night-rail-slide.jpg', 1100), '45% 40%'),
    'street': (photo('street-rail-crowd.jpg', 1400), '55% 30%'),
    'swiss': (photo('swiss-trick.jpg', 1200), '62% 50%'),
    'jam': (photo('night-rail-jam.jpg', 900), '50% 45%'),
}
ORDER = ['slide', 'street', 'swiss', 'jam']
logo_svg = (ROOT / 'src/assets/brand/cork-logo.svg').read_text().strip()
mascot_svg = (ROOT / 'src/assets/brand/cork-mascot.svg').read_text().strip()
logo_inner = logo_svg[logo_svg.index('>') + 1:logo_svg.rindex('</svg>')]
logo_vb = logo_svg.split('viewBox="')[1].split('"')[0]
mascot_inner = mascot_svg[mascot_svg.index('>') + 1:mascot_svg.rindex('</svg>')]
mascot_vb = mascot_svg.split('viewBox="')[1].split('"')[0]
logo_mask = 'url("data:image/svg+xml,' + urllib.parse.quote(logo_svg.replace('currentColor', '#000')) + '")'

NAV = ['videor', 'shop', 'team', 'om oss', 'backstage', 'nyhetsbrev', 'info']
NOTE = 'cork 3 — förbeställ nu'
LINE = 'inte gjord för att passa in.'


def logo(cls=''):
    return f'<svg class="logo {cls}" viewBox="{logo_vb}" aria-hidden="true"><use href="#lg"/></svg>'


def mascot(cls=''):
    return f'<svg class="mascot {cls}" viewBox="{mascot_vb}" aria-hidden="true"><use href="#mc"/></svg>'


def menu(kind, items=NAV):
    return f'<ul class="nav {kind}">' + ''.join(f'<li><a href="#">{n}</a></li>' for n in items) + '</ul>'


def ph(name, cls='', style=''):
    return f'<div class="ph ph-{name} {cls}" style="{style}"></div>'


def note(cls=''):
    return f'<a class="note {cls}" href="#">{NOTE}</a>'


# ---------- 20 families × 5 variants ----------
# each returns (name, html of the mock's inside, extra classes on the mock)
F = []


def family(title):
    def wrap(fn):
        F.append((title, fn))
        return fn
    return wrap


@family('helbild, menyn i mitten')
def f1(v):
    shade = ['s-mid', 's-soft', 's-strong', 's-mid', 's-soft'][v]
    return ph(ORDER[v % 4]) + f'<div class="shade {shade}"></div><div class="center col">{logo("lg-m")}{menu("stack")}{note()}</div>', 'night'


@family('helbild, stor logga nere till vänster')
def f2(v):
    p = ['street', 'slide', 'jam', 'swiss', 'street'][v]
    big = ['lg-xl', 'lg-xxl', 'lg-xl', 'lg-xxl', 'lg-full'][v]
    return ph(p) + f'<div class="shade s-bottom"></div><span class="corner tr small">{NOTE}</span><div class="bl col start">{logo(big)}{menu("row left")}</div>', 'night'


@family('helbild, logga uppe, menyn nere')
def f3(v):
    p = ['swiss', 'slide', 'street', 'jam', 'swiss'][v]
    return ph(p) + f'<div class="shade s-both"></div><div class="top-c">{logo("lg-m")}</div><div class="bottom-c col">{menu("row")}{note() if v % 2 else ""}</div>', 'night'


@family('helbild, menyn längs vänsterkanten')
def f4(v):
    p = ['slide', 'jam', 'street', 'swiss', 'slide'][v]
    return ph(p) + f'<div class="shade s-left"></div><div class="left-rail col start">{logo("lg-s")}{menu("stack left big" if v in (1, 3) else "stack left")}</div><div class="br">{note()}</div>', 'night'


@family('delad: papper och foto')
def f5(v):
    p = ORDER[v % 4]
    side = 'flip' if v in (1, 3) else ''
    return f'<div class="split {side}"><div class="pane paper col start between">{logo("lg-s ink")}{menu("stack left ink")}<p class="small muted-ink">{LINE}</p></div>{ph(p, "pane")}</div>', 'paper'


@family('delad: svart och foto')
def f6(v):
    p = ['street', 'swiss', 'slide', 'jam', 'street'][v]
    side = 'flip' if v % 2 else ''
    return f'<div class="split w60 {side}"><div class="pane col start between">{logo("lg-m")}{menu("stack left")}{note()}</div>{ph(p, "pane")}</div>', 'night'


@family('tre remsor')
def f7(v):
    orders = [['slide', 'street', 'swiss'], ['street', 'slide', 'jam'], ['jam', 'swiss', 'street'], ['swiss', 'jam', 'slide'], ['slide', 'jam', 'swiss']]
    gap = ['g3', 'g0', 'g12', 'g3', 'g0'][v]
    return f'<div class="strips {gap}">' + ''.join(ph(p) for p in orders[v]) + f'</div><div class="shade s-soft"></div><div class="center col">{logo("lg-l")}</div><div class="bottom-c">{menu("row")}</div>', 'night'


@family('två bilder sida vid sida')
def f8(v):
    pairs = [('slide', 'swiss'), ('street', 'jam'), ('jam', 'swiss'), ('swiss', 'slide'), ('street', 'slide')]
    a, b = pairs[v]
    return f'<div class="duo">{ph(a)}{ph(b)}</div><div class="shade s-mid"></div><div class="center col">{logo("lg-m")}{menu("row")}</div>', 'night'


@family('zine: liten bild på papper')
def f9(v):
    p = ORDER[v % 4]
    shape = ['r43', 'r45', 'r11', 'r169', 'r34'][v]
    return f'<div class="center col">{logo("lg-s ink")}<figure class="fig">{ph(p, "frame " + shape)}<figcaption>fig. {v + 1} — {p}</figcaption></figure><p class="line ink">{LINE}</p>{menu("row ink")}</div>', 'paper'


@family('zine: liten bild på svart')
def f10(v):
    p = ['jam', 'swiss', 'street', 'slide', 'jam'][v]
    shape = ['r34', 'r11', 'r169', 'r45', 'r43'][v]
    return f'<div class="center col">{figure_white(p, shape, v)}{logo("lg-s")}{menu("row")}</div>', 'night'


def figure_white(p, shape, v):
    return f'<figure class="fig">{ph(p, "frame " + shape)}<figcaption class="on">fig. {v + 1}</figcaption></figure>'


@family('fotot inuti loggan')
def f11(v):
    p = ORDER[v % 4]
    bg = 'paper' if v % 2 == 0 else 'night'
    ink = 'ink' if bg == 'paper' else ''
    return f'<div class="center col wide">{ph(p, "inlogo")}{menu("row " + ink)}{note(ink)}</div>', bg


@family('passepartout: bild med vit kant')
def f12(v):
    p = ['slide', 'street', 'swiss', 'jam', 'street'][v]
    return f'<div class="passe">{ph(p, "inner")}<div class="shade s-soft inner-shade"></div><div class="center col">{logo("lg-m")}</div></div><div class="passe-nav">{menu("row ink")}</div>', 'paper'


@family('löpband med menyn över bilden')
def f13(v):
    p = ORDER[v % 4]
    items = ''.join(f'<a href="#">{n}</a><span>·</span>' for n in NAV * 2)
    pos = ['mid', 'low', 'high', 'mid', 'low'][v]
    return ph(p) + f'<div class="shade s-soft"></div><div class="top-c">{logo("lg-m")}</div><div class="ticker {pos}"><div class="track">{items}</div></div>', 'night'


@family('kontaktark 2×2')
def f14(v):
    order = ORDER[v % 4:] + ORDER[:v % 4]
    bg = 'paper' if v in (0, 2, 4) else 'night'
    ink = 'ink' if bg == 'paper' else ''
    cells = ''.join(f'<div class="cell">{ph(p)}<span class="num">{i + 1:02d}</span></div>' for i, p in enumerate(order))
    return f'<div class="sheet">{cells}</div><div class="sheet-side col start between">{logo("lg-s " + ink)}{menu("stack left " + ink)}{note(ink)}</div>', bg


@family('utspridda bilder på papper')
def f15(v):
    picks = [ORDER[(v + i) % 4] for i in range(3)]
    tilt = [(-6, 4, -2), (3, -5, 6), (-3, 2, -7), (5, -2, 3), (-8, 6, -1)][v]
    cards = ''.join(f'<div class="snap s{i}" style="--r:{tilt[i]}deg">{ph(p)}</div>' for i, p in enumerate(picks))
    return f'<div class="top-c">{logo("lg-m ink")}</div><div class="scatter">{cards}</div><div class="bottom-c">{menu("row ink")}</div>', 'paper'


@family('bildband över mitten')
def f16(v):
    p = ORDER[v % 4]
    h = ['b40', 'b30', 'b50', 'b35', 'b45'][v]
    return f'<div class="top-c">{logo("lg-s ink")}</div><div class="band {h}">{ph(p)}</div><div class="bottom-c col">{menu("row ink")}<span class="small muted-ink">{LINE}</span></div>', 'paper'


@family('stor rad text och smal bild')
def f17(v):
    p = ['slide', 'jam', 'swiss', 'street', 'slide'][v]
    bg = 'paper' if v % 2 == 0 else 'night'
    ink = 'ink' if bg == 'paper' else ''
    return f'<div class="manifest col start between"><span>{logo("lg-s " + ink)}</span><p class="big {ink}">{LINE}</p>{menu("row left " + ink)}</div>{ph(p, "slim")}', bg


@family('bara text, tumnaglar under')
def f18(v):
    bg = 'paper' if v % 2 == 0 else 'night'
    ink = 'ink' if bg == 'paper' else ''
    thumbs = ''.join(ph(p, 'thumb') for p in ORDER[: 3 + (v % 2)])
    return f'<div class="center col">{logo("lg-l " + ink)}<p class="line {ink}">{LINE}</p><div class="thumbs">{thumbs}</div>{menu("row " + ink)}</div>', bg


@family('menyn som index med bild')
def f19(v):
    p = ORDER[v % 4]
    bg = 'paper' if v in (0, 3) else 'night'
    ink = 'ink' if bg == 'paper' else ''
    side = 'flip' if v % 2 else ''
    return f'<div class="index {side}"><div class="col start between pad">{logo("lg-s " + ink)}{menu("idx " + ink)}</div>{ph(p, "pane")}</div>', bg


@family('maskoten i mitten')
def f20(v):
    bg = ['night', 'paper', 'night', 'paper', 'photo'][v]
    ink = 'ink' if bg == 'paper' else ''
    back = ph('swiss') + '<div class="shade s-strong"></div>' if bg == 'photo' else ''
    menu_kind = 'stack' if v < 2 else 'row'
    return back + f'<div class="center col">{mascot("ms-" + str(v))}{logo("lg-s " + ink)}{menu(menu_kind + " " + ink)}</div>', 'night' if bg == 'photo' else bg



# ---------- set 2: 20 variants each of the five styles CORK liked ----------
S2 = []


def style(title):
    def wrap(fn):
        S2.append((title, fn))
        return fn
    return wrap


P4 = ['slide', 'street', 'swiss', 'jam']


@style('ett foto, menyn i mitten')
def s1(v):
    p = P4[v % 4]
    shade = ['s-mid', 's-soft', 's-strong', 's-mid', 's-vign'][v % 5]
    size = ['lg-m', 'lg-l', 'lg-s', 'lg-m', 'lg-l'][v // 4 % 5]
    kind = 'stack' if v % 3 != 2 else 'row'
    extra = note() if v % 2 == 0 else ''
    frame = ' bordered' if v in (7, 15) else ''
    grain = '<div class="grain"></div>' if v in (3, 11, 18) else ''
    return ph(p) + f'<div class="shade {shade}"></div>{grain}<div class="center col{frame}">{logo(size)}{menu(kind)}{extra}</div>', 'night'


@style('loggan nere till vänster')
def s2(v):
    p = ['street', 'slide', 'jam', 'swiss'][v % 4]
    big = ['lg-xl', 'lg-xxl', 'lg-full', 'lg-xl', 'lg-xxl'][v // 4 % 5]
    menu_kind = 'row left' if v % 2 == 0 else 'stack left'
    corner = [f'<span class="corner tr small">{NOTE}</span>', f'<span class="corner tl small">{LINE}</span>', '', f'<span class="corner tr small">25 ex per modell</span>'][v % 4]
    side = ' right' if v in (5, 9, 13, 17) else ''
    return ph(p) + f'<div class="shade s-bottom"></div>{corner}<div class="bl col start{side}">{logo(big)}{menu(menu_kind)}</div>', 'night'


@style('papper och foto')
def s3(v):
    p = P4[v % 4]
    flip = ' flip' if (v // 4) % 2 else ''
    ratio = ['', ' w60', ' w40', '', ' w60'][v // 4 % 5]
    bg = 'paper' if v % 5 != 4 else 'night'
    ink = ' ink' if bg == 'paper' else ''
    txt = [LINE, 'cork 3 — två plagg, 25 av varje.', 'uppsala, sverige.', LINE][v % 4]
    menu_kind = 'stack left' if v % 3 else 'idx'
    pane = 'paper' if bg == 'paper' else ''
    return f'<div class="split{ratio}{flip}"><div class="pane {pane} col start between">{logo("lg-s" + ink)}{menu(menu_kind + ink)}<p class="small muted-ink">{txt}</p></div>{ph(p, "pane")}</div>', bg


@style('zine')
def s4(v):
    p = P4[v % 4]
    shape = ['r43', 'r45', 'r11', 'r169', 'r34'][v % 5]
    bg = 'paper' if v < 14 else 'night'
    ink = ' ink' if bg == 'paper' else ''
    cap = f'<figcaption class="{"" if bg == "paper" else "on"}">fig. {v + 1} — {p}</figcaption>'
    order = v % 3
    fig = f'<figure class="fig">{ph(p, "frame " + shape)}{cap}</figure>'
    lg = logo('lg-s' + ink)
    line = f'<p class="line{ink}">{LINE}</p>'
    nav = menu('row' + ink)
    parts = [lg + fig + line + nav, fig + lg + nav, lg + line + fig + nav][order]
    return f'<div class="center col">{parts}</div>', bg


@style('filmremsa')
def s5(v):
    combos = [['slide', 'street', 'swiss'], ['street', 'slide', 'jam'], ['jam', 'swiss', 'street'], ['swiss', 'jam', 'slide'], ['slide', 'jam', 'swiss']]
    pics = combos[v % 5]
    if v // 5 == 3:
        pics = pics + [P4[(v + 1) % 4]]
    gap = ['g3', 'g0', 'g12', 'g3'][v // 5]
    bg = 'paper' if v in (2, 7, 12) else 'night'
    ink = ' ink' if bg == 'paper' else ''
    cols = f'style="grid-template-columns:repeat({len(pics)},1fr)"'
    strips = f'<div class="strips {gap}{" paper-gap" if bg == "paper" else ""}" {cols}>' + ''.join(ph(x) for x in pics) + '</div>'
    lg = ['lg-l', 'lg-xl', 'lg-m', 'lg-l'][v // 5]
    return strips + f'<div class="shade s-soft"></div><div class="center col">{logo(lg)}</div><div class="film-nav{ink}">{menu("row" + ink)}</div>', bg



def render(families, per, key, title, intro, out_name):
    cards = []
    n = 0
    for fi, (ftitle, fn) in enumerate(families):
        for v in range(per):
            n += 1
            inner, bg = fn(v)
            label = "abcde"[v] if per <= 5 else str(v + 1)
            cards.append(
                f'<article class="card" id="h{n}" data-n="{n}">'
                f'<header><span class="no">{n:03d}</span><span class="title">{ftitle} <em>{label}</em></span>'
                f'<button type="button" class="pick" aria-pressed="false" data-n="{n}">fet</button></header>'
                f'<div class="frame"><div class="m {bg} fam{fi + 1}">{inner}</div></div></article>'
            )
    html = (TEMPLATE
            .replace('<title>CORK hero-labb</title>', f'<title>{title}</title>')
            .replace("var KEY = 'cork-hero-picks';", f"var KEY = '{key}';")
            .replace('<!--INTRO-->', intro)
            .replace('<!--CARDS-->', '\n'.join(cards)))
    (Path(__file__).parent / out_name).write_text(html)
    print(f'{out_name}: {n} heroes, {len(html) // 1024} KB')


css_photos = '\n'.join(
    f'.ph-{k} {{ background-image: var(--{k}); background-position: {pos}; }}' for k, (_, pos) in PHOTOS.items()
)
vars_photos = ''.join(f'--{k}: url({src});' for k, (src, _) in PHOTOS.items())
TEMPLATE = (Path(__file__).with_name('template.html').read_text()
            .replace('/*PHOTO_VARS*/', vars_photos)
            .replace('/*PHOTO_CSS*/', css_photos)
            .replace('/*LOGO_MASK*/', logo_mask)
            .replace('<!--SYMBOLS-->', f'<svg width="0" height="0" style="position:absolute"><symbol id="lg" viewBox="{logo_vb}">{logo_inner}</symbol><symbol id="mc" viewBox="{mascot_vb}">{mascot_inner}</symbol></svg>'))

render(F, 5, 'cork-hero-picks', 'CORK hero-labb',
       '100 heroes för startsidan, 20 idéer i 5 varianter var. <a href="fem-stilar.html">Se också 100 varianter av de fem stilarna.</a>',
       'index.html')
render(S2, 20, 'cork-hero-picks-2', 'CORK fem stilar',
       '100 varianter av de fem stilarna du valde: 1–20 ett foto med menyn i mitten, 21–40 loggan nere till vänster, 41–60 papper och foto, 61–80 zine, 81–100 filmremsa. <a href="index.html">Tillbaka till första labbet.</a>',
       'fem-stilar.html')
