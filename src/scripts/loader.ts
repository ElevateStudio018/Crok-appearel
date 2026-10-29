// The jumping cork loader (src/components/Loader.astro).
// An inline script puts it on screen on the first page of a visit; this module
// takes it away once the page has loaded, and lets other scripts show it again.

const SEEN_KEY = 'cork-loader-seen';
// Long enough for the cork to land its spin, so the loader never just flashes.
const MIN_MS = 1100;
const MAX_MS = 6000;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function showLoader() {
  if (document.querySelector('.loader')) return;
  const template = document.getElementById('cork-loader') as HTMLTemplateElement | null;
  if (template) document.body.prepend(template.content.cloneNode(true));
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
  // Hide this loader only, not one the cart shows later.
  const hide = () => hideLoader(loader);
  const minMs = reducedMotion() ? 300 : MIN_MS;
  // performance.now() counts from the start of the navigation.
  const done = () => setTimeout(hide, Math.max(0, minMs - performance.now()));
  if (document.readyState === 'complete') done();
  else window.addEventListener('load', done, { once: true });
  setTimeout(hide, MAX_MS);
}
