import { BOTTOM_PORES, FACE, TOP_PORES } from './cork3d-art';

// The loader's cork in 3D: a turned cork with the mascot's face wrapped around it,
// toon shading, an inked outline with a white sticker edge and a shadow on the ground,
// drawn with plain WebGL. Same moves as the flat version in Loader.astro.

type Mat4 = Float32Array;

const RADIUS = 0.6;
const HEIGHT = 1.95;
const BEVEL = 0.1;
const BULGE = 0.03;
const SEGMENTS = 64;
const SIDE_ROWS = 16;
// The side texture runs from V0 (on the top bevel) to V1 (on the bottom bevel), see cork3d-art.ts.
const V0 = -0.06;
const V1 = 1.06;
const LOOP_MS = 2600;
const INK = '#0e0e0e';
const LIGHT = normalize([-0.35, 0.7, 0.75]);
const SPIN_AXIS: [number, number, number] = [0.55, 1, 0.2];
// slightly from above, so the top of the cork shows like in the drawing
const EYE: [number, number, number] = [0, 5, 9.1];
const TARGET: [number, number, number] = [0, 1.65, 0];
const FOV = 27;

// ---------- matrices (column-major) ----------

function normalize(v: number[]) {
  const l = Math.hypot(...v);
  return v.map((x) => x / l);
}

function identity(): Mat4 {
  const m = new Float32Array(16);
  m[0] = m[5] = m[10] = m[15] = 1;
  return m;
}

function mul(a: Mat4, b: Mat4): Mat4 {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 4; r++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
      o[c * 4 + r] = s;
    }
  return o;
}

function translate(x: number, y: number, z: number): Mat4 {
  const m = identity();
  m[12] = x;
  m[13] = y;
  m[14] = z;
  return m;
}

function scale(x: number, y: number, z: number): Mat4 {
  const m = identity();
  m[0] = x;
  m[5] = y;
  m[10] = z;
  return m;
}

function rotate(axis: number[], deg: number): Mat4 {
  const [x, y, z] = normalize(axis);
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  const t = 1 - c;
  const m = identity();
  m[0] = t * x * x + c;
  m[1] = t * x * y + s * z;
  m[2] = t * x * z - s * y;
  m[4] = t * x * y - s * z;
  m[5] = t * y * y + c;
  m[6] = t * y * z + s * x;
  m[8] = t * x * z + s * y;
  m[9] = t * y * z - s * x;
  m[10] = t * z * z + c;
  return m;
}

function perspective(fovDeg: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan((fovDeg * Math.PI) / 360);
  const m = new Float32Array(16);
  m[0] = f / aspect;
  m[5] = f;
  m[10] = (far + near) / (near - far);
  m[11] = -1;
  m[14] = (2 * far * near) / (near - far);
  return m;
}

function lookAt(eye: number[], target: number[]): Mat4 {
  const z = normalize([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]);
  const x = normalize([z[2], 0, -z[0]]);
  const y = [z[1] * x[2] - z[2] * x[1], z[2] * x[0] - z[0] * x[2], z[0] * x[1] - z[1] * x[0]];
  const m = identity();
  [m[0], m[4], m[8]] = x;
  [m[1], m[5], m[9]] = y;
  [m[2], m[6], m[10]] = z;
  m[12] = -(x[0] * eye[0] + x[1] * eye[1] + x[2] * eye[2]);
  m[13] = -(y[0] * eye[0] + y[1] * eye[1] + y[2] * eye[2]);
  m[14] = -(z[0] * eye[0] + z[1] * eye[1] + z[2] * eye[2]);
  return m;
}

// ---------- the cork ----------

/** Rings of [radius, y, normal r, normal y, side texture v] turned around the y axis. */
function buildCork() {
  const pos: number[] = [];
  const nor: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  const capR = RADIUS - BEVEL;

  const strip = (rings: number[][], part: 'side' | 'top' | 'bottom') => {
    const base = pos.length / 3;
    for (const [r, y, nr, ny, v] of rings) {
      for (let s = 0; s <= SEGMENTS; s++) {
        // phi = 0 faces the camera (+z), where the face sits (u = 0.5)
        const phi = -Math.PI + (s / SEGMENTS) * 2 * Math.PI;
        const sin = Math.sin(phi);
        const cos = Math.cos(phi);
        pos.push(r * sin, y, r * cos);
        nor.push(nr * sin, ny, nr * cos);
        if (part === 'side') {
          uv.push(0.5 + phi / (2 * Math.PI), ((v - V0) / (V1 - V0)) * 0.5);
        } else {
          const k = (r / capR) * 0.24;
          uv.push((part === 'top' ? 0.25 : 0.75) + sin * k, 0.75 + cos * k);
        }
      }
    }
    for (let i = 0; i < rings.length - 1; i++)
      for (let s = 0; s < SEGMENTS; s++) {
        const a = base + i * (SEGMENTS + 1) + s;
        const b = a + SEGMENTS + 1;
        idx.push(a, b, a + 1, a + 1, b, b + 1);
      }
  };

  const cap = (y: number, ny: number) => [0, 0.25, 0.5, 0.75, 1].map((k) => [capR * k, y, 0, ny, 0]);
  const side: number[][] = [];
  for (let i = 0; i <= 6; i++) {
    const a = (Math.PI / 2) * (1 - i / 6);
    side.push([capR + BEVEL * Math.cos(a), HEIGHT - BEVEL + BEVEL * Math.sin(a), Math.cos(a), Math.sin(a), V0 * (a / (Math.PI / 2))]);
  }
  const span = HEIGHT - 2 * BEVEL;
  for (let i = 1; i < SIDE_ROWS; i++) {
    const t = i / SIDE_ROWS;
    const r = RADIUS * (1 + BULGE * (1 - (2 * t - 1) ** 2));
    const drdy = (4 * RADIUS * BULGE * (2 * t - 1)) / span;
    const [nr, ny] = normalize([1, -drdy]);
    side.push([r, HEIGHT - BEVEL - t * span, nr, ny, t]);
  }
  for (let i = 0; i <= 6; i++) {
    const a = -(Math.PI / 2) * (i / 6);
    side.push([capR + BEVEL * Math.cos(a), BEVEL + BEVEL * Math.sin(a), Math.cos(a), Math.sin(a), 1 + (V1 - 1) * (-a / (Math.PI / 2))]);
  }

  strip(cap(HEIGHT, 1), 'top');
  strip(side, 'side');
  strip(cap(0, -1).reverse(), 'bottom');
  return { pos: new Float32Array(pos), nor: new Float32Array(nor), uv: new Float32Array(uv), idx: new Uint16Array(idx) };
}

/** Small seeded random numbers, so the pores on the back are the same every time. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

/** Texture atlas: the side (top half) and the two ends (bottom half). */
function paintAtlas() {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const g = canvas.getContext('2d');
  if (!g) return null;
  const sideH = size / 2;
  const vy = (v: number) => ((v - V0) / (V1 - V0)) * sideH;

  g.fillStyle = '#fff';
  g.fillRect(0, 0, size, size);
  g.fillStyle = INK;
  // the rims around both ends, on the rounded edges
  g.fillRect(0, vy(-0.045), size, vy(0.014) - vy(-0.045));
  g.fillRect(0, vy(0.986), size, vy(1.045) - vy(0.986));
  // pores on the back half, like the ones on the sides of the drawing
  const rand = seeded(7);
  for (let i = 0; i < 18; i++) {
    const u = (i % 2 ? 0.74 : 0.02) + rand() * 0.24;
    g.beginPath();
    g.ellipse(u * size, vy(0.12 + rand() * 0.76), 3 + rand() * 3, 10 + rand() * 9, (rand() - 0.5) * 0.3, 0, 2 * Math.PI);
    g.fill();
  }
  // the face on the front
  g.save();
  g.scale(size / 1000, sideH / 500);
  g.fill(new Path2D(FACE));
  g.restore();

  const end = (cx: number, pores: number[][]) => {
    // the end stays white up to its edge; the rim is drawn on the rounded edge next to it
    const cy = size * 0.75;
    const r = size * 0.24;
    g.fillStyle = INK;
    for (const [x, y, rx, ry, a] of pores) {
      g.beginPath();
      g.ellipse(cx + x * r, cy + y * r, rx * r, ry * r, a, 0, 2 * Math.PI);
      g.fill();
    }
  };
  end(size * 0.25, TOP_PORES);
  end(size * 0.75, BOTTOM_PORES);
  return canvas;
}

// ---------- the moves (one loop = LOOP_MS) ----------

/** Eased interpolation between keys of [time, ...values]. */
function track(keys: number[][], p: number, linear = false) {
  for (let i = 1; i < keys.length; i++) {
    if (p <= keys[i][0]) {
      const a = keys[i - 1];
      const b = keys[i];
      const t = (p - a[0]) / (b[0] - a[0] || 1);
      const e = linear ? t : t * t * (3 - 2 * t);
      return a.slice(1).map((v, j) => v + (b[j + 1] - v) * e);
    }
  }
  return keys[keys.length - 1].slice(1);
}

// a big jump with the cork spin, then hops right, left and back to the middle
const JUMPS = [
  [0.03, 0.36, 1.5],
  [0.38, 0.58, 0.62],
  [0.58, 0.79, 0.62],
  [0.79, 1, 0.62],
];
const X_KEYS = [[0, 0], [0.38, 0], [0.58, 0.85], [0.79, -0.85], [1, 0]];
// crouch before take-off, stretch on the way up, squash on landing: [time, width, height]
const SQUASH = [
  [0, 1.14, 0.84], [0.03, 1.14, 0.84], [0.07, 0.9, 1.12], [0.14, 1, 1], [0.33, 1, 1],
  [0.36, 1.16, 0.82], [0.395, 0.94, 1.08], [0.44, 1, 1], [0.555, 1, 1],
  [0.58, 1.1, 0.88], [0.605, 0.95, 1.06], [0.65, 1, 1], [0.765, 1, 1],
  [0.79, 1.1, 0.88], [0.815, 0.95, 1.06], [0.86, 1, 1], [0.97, 1, 1], [1, 1.14, 0.84],
];
// turns its face towards each hop and leans into it (degrees)
const YAW = [[0, -14], [0.36, -14], [0.42, 24], [0.56, 24], [0.62, -28], [0.77, -28], [0.83, 24], [0.96, 24], [1, -14]];
const LEAN = [[0, 0], [0.38, 0], [0.48, -12], [0.58, 0], [0.685, 12], [0.79, 0], [0.895, -12], [1, 0]];

function pose(p: number) {
  let y = 0;
  for (const [a, b, h] of JUMPS) {
    if (p >= a && p <= b) {
      const s = (p - a) / (b - a);
      y = 4 * h * s * (1 - s);
    }
  }
  const t = Math.min(1, Math.max(0, (p - 0.05) / 0.28));
  const spin = 360 * (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
  const [x] = track(X_KEYS, p, true);
  const [sx, sy] = track(SQUASH, p);
  const [yaw] = track(YAW, p);
  const [lean] = track(LEAN, p);
  return { x, y, sx, sy, yaw, lean, spin };
}

// ---------- WebGL ----------

const CORK_VS = `
attribute vec3 aPos;
attribute vec3 aNormal;
attribute vec2 aUv;
uniform mat4 uMvp;
uniform mat3 uRot;
uniform float uGrow;
varying vec3 vNormal;
varying vec2 vUv;
void main() {
  vNormal = uRot * aNormal;
  vUv = aUv;
  gl_Position = uMvp * vec4(aPos + aNormal * uGrow, 1.0);
}`;

const CORK_FS = `
precision mediump float;
uniform sampler2D uTex;
uniform vec3 uLight;
uniform vec4 uSolid;
varying vec3 vNormal;
varying vec2 vUv;
void main() {
  if (uSolid.a > 0.0) {
    gl_FragColor = vec4(uSolid.rgb, 1.0);
    return;
  }
  float d = dot(normalize(vNormal), uLight);
  float shade = mix(0.66, 0.86, smoothstep(-0.14, -0.04, d));
  shade = mix(shade, 1.0, smoothstep(0.36, 0.46, d));
  gl_FragColor = vec4(texture2D(uTex, vUv).rgb * shade, 1.0);
}`;

const SHADOW_VS = `
attribute vec2 aCorner;
uniform mat4 uMvp;
varying vec2 vCorner;
void main() {
  vCorner = aCorner;
  gl_Position = uMvp * vec4(aCorner.x, 0.0, aCorner.y, 1.0);
}`;

const SHADOW_FS = `
precision mediump float;
uniform float uAlpha;
varying vec2 vCorner;
void main() {
  float a = uAlpha * (1.0 - smoothstep(0.15, 1.0, length(vCorner)));
  gl_FragColor = vec4(vec3(a), a);
}`;

function program(gl: WebGLRenderingContext, vs: string, fs: string) {
  const p = gl.createProgram();
  if (!p) throw new Error('program');
  for (const [type, src] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]] as const) {
    const s = gl.createShader(type);
    if (!s) throw new Error('shader');
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
    gl.attachShader(p, s);
  }
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'link');
  return p;
}

function buffer(gl: WebGLRenderingContext, target: number, data: ArrayBufferView) {
  const b = gl.createBuffer();
  gl.bindBuffer(target, b);
  gl.bufferData(target, data, gl.STATIC_DRAW);
  return b;
}

/** Starts the 3D cork in the loader's canvas. Returns false when WebGL is not available. */
export function startCork3d(loader: HTMLElement): boolean {
  const canvas = loader.querySelector<HTMLCanvasElement>('.loader-canvas');
  const gl = canvas?.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: true });
  const atlas = paintAtlas();
  if (!canvas || !gl || !atlas) return false;

  let corkProg: WebGLProgram;
  let shadowProg: WebGLProgram;
  try {
    corkProg = program(gl, CORK_VS, CORK_FS);
    shadowProg = program(gl, SHADOW_VS, SHADOW_FS);
  } catch {
    return false;
  }

  const cork = buildCork();
  const posBuf = buffer(gl, gl.ARRAY_BUFFER, cork.pos);
  const norBuf = buffer(gl, gl.ARRAY_BUFFER, cork.nor);
  const uvBuf = buffer(gl, gl.ARRAY_BUFFER, cork.uv);
  const idxBuf = buffer(gl, gl.ELEMENT_ARRAY_BUFFER, cork.idx);
  const quadBuf = buffer(gl, gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]));

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  const aniso = gl.getExtension('EXT_texture_filter_anisotropic');
  if (aniso) gl.texParameterf(gl.TEXTURE_2D, aniso.TEXTURE_MAX_ANISOTROPY_EXT, 4);

  const at = (p: WebGLProgram, name: string) => gl.getAttribLocation(p, name);
  const un = (p: WebGLProgram, name: string) => gl.getUniformLocation(p, name);
  const corkAttr = { pos: at(corkProg, 'aPos'), nor: at(corkProg, 'aNormal'), uv: at(corkProg, 'aUv') };
  const corkUni = {
    mvp: un(corkProg, 'uMvp'),
    rot: un(corkProg, 'uRot'),
    grow: un(corkProg, 'uGrow'),
    light: un(corkProg, 'uLight'),
    solid: un(corkProg, 'uSolid'),
    tex: un(corkProg, 'uTex'),
  };
  const shadowAttr = at(shadowProg, 'aCorner');
  const shadowUni = { mvp: un(shadowProg, 'uMvp'), alpha: un(shadowProg, 'uAlpha') };

  const view = lookAt(EYE, TARGET);
  let viewProj = identity();
  let sized = false;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (!sized || canvas.width !== w || canvas.height !== h) {
      sized = true;
      canvas.width = w;
      canvas.height = h;
      viewProj = mul(perspective(FOV, w / h, 0.1, 50), view);
    }
  };

  const draw = (p: number) => {
    resize();
    const { x, y, sx, sy, yaw, lean, spin } = pose(p);
    const cy = (HEIGHT / 2) * sy;
    const rot = mul(rotate(SPIN_AXIS, spin), mul(rotate([0, 0, 1], lean), rotate([0, 1, 0], yaw)));
    const model = mul(translate(x, y + cy, 0), mul(rot, mul(translate(0, -cy, 0), scale(sx, sy, sx))));
    const mvp = mul(viewProj, model);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // shadow: shrinks and fades as the cork goes up
    const lift = Math.min(1, y / 1.5);
    const sr = 0.95 * (1.12 - 0.6 * lift) * sx;
    gl.useProgram(shadowProg);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.enableVertexAttribArray(shadowAttr);
    gl.vertexAttribPointer(shadowAttr, 2, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix4fv(shadowUni.mvp, false, mul(viewProj, mul(translate(x, 0, 0), scale(sr, 1, sr))));
    gl.uniform1f(shadowUni.alpha, 0.24 * (1 - 0.65 * lift));
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.disableVertexAttribArray(shadowAttr);

    // cork: white sticker edge, black ink outline (both as inflated back faces), then the cork itself
    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.useProgram(corkProg);
    for (const [loc, buf, n] of [
      [corkAttr.pos, posBuf, 3],
      [corkAttr.nor, norBuf, 3],
      [corkAttr.uv, uvBuf, 2],
    ] as const) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, n, gl.FLOAT, false, 0, 0);
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.uniform1i(corkUni.tex, 0);
    gl.uniformMatrix4fv(corkUni.mvp, false, mvp);
    gl.uniformMatrix3fv(corkUni.rot, false, [rot[0], rot[1], rot[2], rot[4], rot[5], rot[6], rot[8], rot[9], rot[10]]);
    gl.uniform3fv(corkUni.light, LIGHT);

    gl.cullFace(gl.FRONT);
    gl.uniform1f(corkUni.grow, 0.085);
    gl.uniform4f(corkUni.solid, 0.957, 0.953, 0.937, 1);
    gl.drawElements(gl.TRIANGLES, cork.idx.length, gl.UNSIGNED_SHORT, 0);
    gl.uniform1f(corkUni.grow, 0.05);
    gl.uniform4f(corkUni.solid, 0.055, 0.055, 0.055, 1);
    gl.drawElements(gl.TRIANGLES, cork.idx.length, gl.UNSIGNED_SHORT, 0);

    gl.cullFace(gl.BACK);
    gl.uniform1f(corkUni.grow, 0);
    gl.uniform4f(corkUni.solid, 0, 0, 0, 0);
    gl.drawElements(gl.TRIANGLES, cork.idx.length, gl.UNSIGNED_SHORT, 0);
  };

  let start = -1;
  const frame = () => {
    if (!loader.isConnected) {
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return;
    }
    const now = performance.now();
    if (start < 0) start = now;
    draw(((now - start) % LOOP_MS) / LOOP_MS);
    requestAnimationFrame(frame);
  };

  canvas.addEventListener('webglcontextlost', () => {
    loader.classList.remove('is-3d');
    loader.classList.add('is-2d');
  });
  loader.classList.add('is-3d');
  requestAnimationFrame(frame);
  return true;
}
