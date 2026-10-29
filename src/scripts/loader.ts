// The jumping cork loader (src/components/Loader.astro).
// An inline script puts it on screen on the first page of a visit; this module
// draws the cork in 3D, takes the loader away once the page has loaded and lets
// other scripts show it again.

const SEEN_KEY = 'cork-loader-seen';
// Long enough for the cork to land its spin, so the loader never just flashes.
const MIN_MS = 1100;
const MAX_MS = 6000;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 3D cork when WebGL works, otherwise (and with reduced motion) the flat one. */
function animate(loader: HTMLElement) {
  const flat = () => loader.classList.add('is-2d');
  if (reducedMotion() || !window.WebGLRenderingContext) return flat();
  import('./cork3d')
    .then(({ startCork3d }) => startCork3d(loader) || flat())
    .catch(flat);
}

export function showLoader() {
  if (document.querySelector('.loader')) return;
  const template = document.getElementById('cork-loader') as HTMLTemplateElement | null;
  if (!template) return;
  document.body.prepend(template.content.cloneNode(true));
  const loader = document.querySelector<HTMLElement>('.loader');
  if (loader) animate(loader);
}

/** Fades out the given loader, or the one on screen. */
export function hideLoader(loader = document.querySelector<HTMLElement>('.loader')) {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // storage blocked – the loader then simply shows again next time
  }
  if (!loader || loader.classList.contains('is-leaving')) return;
  loader.classList.add('is-leaving');
  const remove = () => loader.remove();
  loader.addEventListener('animationend', remove, { once: true });
  setTimeout(remove, 800);
}

export function initLoader() {
  // Back from Stripe or another page via the back button: the page comes from the cache as it was.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) document.querySelector('.loader')?.remove();
  });

  const loader = document.querySelector<HTMLElement>('.loader');
  if (!loader) return;
  animate(loader);
  // Hide this loader only, not one the cart shows later.
  const hide = () => hideLoader(loader);
  if (loader.classList.contains('is-preview')) {
    loader.addEventListener('click', hide);
    document.addEventListener('keydown', hide, { once: true });
    return;
  }
  const minMs = reducedMotion() ? 300 : MIN_MS;
  // performance.now() counts from the start of the navigation.
  const done = () => setTimeout(hide, Math.max(0, minMs - performance.now()));
  if (document.readyState === 'complete') done();
  else window.addEventListener('load', done, { once: true });
  setTimeout(hide, MAX_MS);
}
