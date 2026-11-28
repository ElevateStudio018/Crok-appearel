"""Shared parts of the hero lab pages built from kreativa-template.html
(kreativa.py, clean.py): the photos, the logo and mascot, small HTML helpers
and render(). The logo and mascot are drawn once as backgrounds with their
real proportions, so they look the same in every browser.
"""

import base64
import io
import urllib.parse
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).parent


def photo(name, width):
    im = Image.open(ROOT / 'src/assets/photos' / name).convert('L')
    im = im.resize((width, round(im.size[1] * width / im.size[0])), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, 'JPEG', quality=60, optimize=True, progressive=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode()


def svg_uri(svg):
    return 'data:image/svg+xml,' + urllib.parse.quote(svg)


PH = {
    'slide': (photo('night-rail-slide.jpg', 1100), '45% 40%'),
    'street': (photo('street-rail-crowd.jpg', 1400), '55% 30%'),
    'swiss': (photo('swiss-trick.jpg', 1200), '62% 50%'),
    'jam': (photo('night-rail-jam.jpg', 900), '50% 45%'),
}
logo_src = (ROOT / 'src/assets/brand/cork-logo.svg').read_text().strip()
logo_src = logo_src.replace('<svg ', '<svg width="825" height="215" ', 1)
LOGO = {
    'w': svg_uri(logo_src.replace('currentColor', '#f4f3ef')),
    'k': svg_uri(logo_src.replace('currentColor', '#111111')),
}
mascot_src = (ROOT / 'src/assets/brand/cork-mascot.svg').read_text().strip()
MASCOT = svg_uri(mascot_src.replace('<svg ', '<svg width="343" height="534" ', 1))

NAV = ['videor', 'shop', 'team', 'om oss', 'backstage', 'nyhetsbrev', 'info']


def lg(color='w', cls=''):
    return f'<span class="lg lg-{color} {cls}" role="img" aria-label="cork"></span>'


def mascot(cls=''):
    return f'<span class="masc {cls}" aria-hidden="true"></span>'


def nav(cls='', items=NAV, sep=''):
    return f'<ul class="nv {cls}">' + ''.join(f'<li><a href="#">{n}</a>{sep}</li>' for n in items) + '</ul>'


def ph(name, cls='', style=''):
    return f'<div class="ph ph-{name} {cls}" style="{style}"></div>'




def render(concepts, out_name, title, key, intro):
    """Writes one self-contained lab page; concepts is a list of (title, fn) with fn(n) -> (html, css, background)."""
    cards, styles = [], []
    for i, (ctitle, fn) in enumerate(concepts, 1):
        html, css, bg = fn(i)
        if bg.startswith('street'):
            html = ph('street', 'full dim') + html
        styles.append(css)
        bg_cls = {'night': 'night', 'paper': 'paper', 'street': 'night'}.get(bg.split()[0], 'night')
        extra = ' '.join(bg.split()[1:])
        cards.append(
            f'<article class="card" id="h{i}" data-n="{i}"><header><span class="no">{i:02d}</span><span class="title">{ctitle}</span>'
            f'<button type="button" class="pick" aria-pressed="false" data-n="{i}">fet</button></header>'
            f'<div class="frame"><div class="k {bg_cls} {extra}">{html}</div></div></article>'
        )
    photo_vars = ''.join(f'--{k}:url({src});' for k, (src, _) in PH.items())
    photo_vars += f'--logo-w:url("{LOGO["w"]}");--logo-k:url("{LOGO["k"]}");--masc:url("{MASCOT}");'
    photo_css = ''.join(f'.ph-{k}{{background-image:var(--{k});background-position:{pos}}}' for k, (_, pos) in PH.items())
    page = (HERE / 'kreativa-template.html').read_text()
    page = (page.replace('/*VARS*/', photo_vars).replace('/*PHOTOS*/', photo_css)
            .replace('/*CONCEPTS*/', '\n'.join(styles)).replace('<!--CARDS-->', '\n'.join(cards))
            .replace('<!--TITLE-->', title).replace('/*KEY*/', key)
            .replace('<!--INTRO-->', intro.replace('{count}', str(len(concepts)))))
    (HERE / out_name).write_text(page)
    print(f'{out_name}: {len(concepts)} concepts, {len(page) // 1024} KB')
