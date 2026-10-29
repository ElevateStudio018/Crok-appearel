"""Builds the mascot files from the original artwork (design/cork-mascot.webp).

- src/assets/brand/cork-mascot.svg  the flat mascot (white sticker fill + black ink)
- src/scripts/cork3d-art.ts         the face unwrapped onto a cylinder and the pores
                                    on its ends, for the 3D cork in the loader

Usage: pip install numpy pillow scipy potracer && python scripts/mascot-art.py
"""

import json
from pathlib import Path

import numpy as np
import potrace
from PIL import Image, ImageFilter
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'design' / 'cork-mascot.webp'


def trace(mask, scale, turdsize, alphamax, opttolerance, decimals):
    """Outline of a boolean mask as SVG path data."""
    path = potrace.Bitmap(~mask).trace(turdsize=turdsize, alphamax=alphamax, opticurve=True, opttolerance=opttolerance)
    fmt = lambda p: f'{round(p.x * scale, decimals):g} {round(p.y * scale, decimals):g}'
    d = []
    for curve in path:
        d.append('M' + fmt(curve.start_point))
        for seg in curve:
            if seg.is_corner:
                d.append('L' + fmt(seg.c) + ' ' + fmt(seg.end_point))
            else:
                d.append('C' + fmt(seg.c1) + ' ' + fmt(seg.c2) + ' ' + fmt(seg.end_point))
        d.append('Z')
    return ''.join(d).replace(' -', '-')


im = Image.open(SRC).convert('RGBA')
white = Image.new('RGBA', im.size, (255, 255, 255, 255))
lum = np.array(Image.alpha_composite(white, im).convert('L'))
alpha = np.array(im.getchannel('A'))
ink = (lum < 128) & (alpha > 128)
H, W = ink.shape

# ---------- flat mascot ----------
# the white fill sits just inside the outer black line, so no white halo shows around it
fill = np.array(Image.fromarray((alpha > 128).astype(np.uint8) * 255).filter(ImageFilter.MinFilter(7))) > 0
ys, xs = np.where(alpha > 128)
S = 0.5
vb = f'{xs.min() * S:g} {ys.min() * S:g} {(xs.max() + 1 - xs.min()) * S:g} {(ys.max() + 1 - ys.min()) * S:g}'
svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">'
    f'<path fill="#fff" d="{trace(fill, S, 50, 1.0, 0.4, 1)}"/>'
    f'<path fill="#0e0e0e" fill-rule="evenodd" d="{trace(ink, S, 8, 1.0, 0.4, 1)}"/></svg>\n'
)
(ROOT / 'src/assets/brand/cork-mascot.svg').write_text(svg)

# ---------- 3D texture ----------
lab, n = ndimage.label(ink)
sizes = ndimage.sum(ink, lab, range(1, n + 1))
order = np.argsort(-sizes)
body = lab == order[0] + 1    # thick outline with rims, fangs and spikes
outer = lab == order[2] + 1   # thin sticker line around everything
filled = ndimage.binary_fill_holes(body)

# inner edges of the side outline, per row
xl_in = np.full(H, np.nan)
xr_in = np.full(H, np.nan)
for y in range(H):
    inner = np.where(filled[y] & ~body[y])[0]
    if len(inner) >= 2:
        xl_in[y], xr_in[y] = inner[0], inner[-1]


def runs(col):
    d = np.diff(np.concatenate([[0], col.astype(int), [0]]))
    return list(zip(np.where(d == 1)[0], np.where(d == -1)[0] - 1))


# rims from the central columns: bottom edge of the top rim, top edge of the bottom rim
mid = int(np.nanmean((xl_in[500:560] + xr_in[500:560]) / 2))
cols = np.arange(mid - 200, mid + 200)
top_raw, bot_raw, cap_t, cap_b, bcap_t, bcap_b = [], [], [], [], [], []
for x in cols:
    r = runs(body[:, x])
    top_raw.append(r[1][1]); cap_t.append(r[0][1]); cap_b.append(r[1][0])
    bot_raw.append(r[-2][0]); bcap_t.append(r[-2][1]); bcap_b.append(r[-1][0])
top_fit = np.polyfit(cols, ndimage.median_filter(np.array(top_raw, float), 61), 2)
bot_fit = np.polyfit(cols, ndimage.median_filter(np.array(bot_raw, float), 61), 2)
top_arc = lambda x: np.polyval(top_fit, x)
bot_arc = lambda x: np.polyval(bot_fit, x)

# smooth centre line and half width of the body
rows = np.arange(H)
ok = ~np.isnan(xl_in)
c = np.interp(rows, rows[ok], ((xl_in + xr_in) / 2)[ok])
w = np.interp(rows, rows[ok], ((xr_in - xl_in) / 2)[ok])
y0, y1 = int(top_arc(mid)), int(bot_arc(mid))
cs, ws = c.copy(), w.copy()
cs[y0:y1] = ndimage.uniform_filter1d(ndimage.median_filter(c[y0:y1], 41), 31)
ws[y0:y1] = ndimage.uniform_filter1d(ndimage.median_filter(w[y0:y1], 41), 31)

# the side: face, side pores, plus the fangs and spikes that hang off the rims
side = np.zeros_like(ink)
top_parts, bottom_parts = [], []
for i in range(1, n + 1):
    m = lab == i
    if (m & (body | outer)).any():
        continue
    cy, cx = ndimage.center_of_mass(m)
    if cy < top_arc(cx):
        top_parts.append(m)
    elif cy > bot_arc(cx):
        bottom_parts.append(m)
    else:
        side |= m
yy, xx = np.mgrid[0:H, 0:W]
inside = (xx > np.nan_to_num(xl_in)[:, None] + 3) & (xx < np.nan_to_num(xr_in)[:, None] - 3)
side |= body & inside & (yy > top_arc(xx) + 3) & (yy < top_arc(xx) + 170)
side |= body & inside & (yy < bot_arc(xx) - 3) & (yy > bot_arc(xx) - 170)

# unwrap: texture u runs around the cork (0.5 = front), v from the top rim (0) to the bottom rim (1)
TW, TH, V0, V1 = 2000, 1000, -0.06, 1.06
U, V = np.meshgrid((np.arange(TW) + 0.5) / TW, V0 + (np.arange(TH) + 0.5) / TH * (V1 - V0))
theta = (U - 0.5) * 2 * np.pi
front = np.abs(theta) < np.pi / 2 * 0.985
s = np.sin(np.clip(theta, -np.pi / 2, np.pi / 2))
x = cs[(y0 + y1) // 2] + s * ws[(y0 + y1) // 2]
for _ in range(4):
    yi = np.clip(top_arc(x) + V * (bot_arc(x) - top_arc(x)), 0, H - 1)
    x = np.interp(yi, rows, cs) + s * np.interp(yi, rows, ws)
y = top_arc(x) + V * (bot_arc(x) - top_arc(x))
sampled = ndimage.map_coordinates(side.astype(float), [y, x], order=1, mode='constant')
tex = Image.fromarray((~((sampled > 0.5) & front) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2.2))
face = trace(np.array(tex) < 128, 0.5, 10, 1.1, 1.2, 0)


def pores(parts, top):
    """Pores on an end as ellipses in a unit disc: [x, y, rx, ry, angle], y > 0 = front."""
    i = np.argmin(np.abs(cols - mid))
    yc = (cap_t[i] + cap_b[i]) / 2 if top else (bcap_t[i] + bcap_b[i]) / 2
    b = (cap_b[i] - cap_t[i]) / 2 if top else (bcap_b[i] - bcap_t[i]) / 2
    a = ws[int(yc)]
    out = []
    for m in parts:
        py, px = np.nonzero(m)
        X, Y = (px - c[int(yc)]) / a, (py - yc) / b * (1 if top else -1)
        ev, evec = np.linalg.eigh(np.cov(np.vstack([X - X.mean(), Y - Y.mean()])))
        out.append([round(float(v), k) for v, k in [
            (X.mean(), 3), (Y.mean(), 3), (2 * np.sqrt(ev[1]), 3), (2 * np.sqrt(ev[0]), 3),
            (np.arctan2(evec[1, 1], evec[0, 1]), 2)]])
    return out


ts = f"""// Generated by scripts/mascot-art.py from design/cork-mascot.webp – do not edit by hand.
// The face unwrapped onto the side of a cylinder, and the pores on its two ends.
// The face path is in a 1000×500 box: x runs once around the cork (500 = front),
// y runs from just above the top rim (0) to just below the bottom rim (500).

export const FACE = '{face}';

/** Pores on the ends as ellipses in a unit disc: [x, y, rx, ry, angle]. y > 0 is the front. */
export const TOP_PORES: number[][] = {json.dumps(pores(top_parts, True))};
export const BOTTOM_PORES: number[][] = {json.dumps(pores(bottom_parts, False))};
"""
(ROOT / 'src/scripts/cork3d-art.ts').write_text(ts)
print(f'cork-mascot.svg {len(svg)} bytes, cork3d-art.ts {len(ts)} bytes')
