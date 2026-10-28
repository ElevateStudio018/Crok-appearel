// Client-side cart stored in localStorage. Prices are never stored here –
// the checkout function looks them up server-side.

export interface CartLine {
  id: string;
  size: string;
  qty: number;
}

const KEY = 'cork-cart-v1';
const EVENT = 'cork:cart';
export const MAX_QTY = 5;

const read = (): CartLine[] => {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((l) => l && typeof l.id === 'string' && typeof l.size === 'string' && l.qty > 0)
      : [];
  } catch {
    return [];
  }
};

const write = (lines: CartLine[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    // Storage unavailable (private mode) – cart lives for this page only.
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: lines }));
};

export const getCart = read;

export const cartCount = (lines = read()) => lines.reduce((n, l) => n + l.qty, 0);

export const addToCart = (id: string, size: string, qty = 1) => {
  const lines = read();
  const line = lines.find((l) => l.id === id && l.size === size);
  if (line) line.qty = Math.min(MAX_QTY, line.qty + qty);
  else lines.push({ id, size, qty: Math.min(MAX_QTY, qty) });
  write(lines);
};

export const setQty = (id: string, size: string, qty: number) => {
  const lines = read()
    .map((l) => (l.id === id && l.size === size ? { ...l, qty: Math.min(MAX_QTY, qty) } : l))
    .filter((l) => l.qty > 0);
  write(lines);
};

export const removeFromCart = (id: string, size: string) => setQty(id, size, 0);

export const clearCart = () => write([]);

export const onCartChange = (fn: (lines: CartLine[]) => void) => {
  window.addEventListener(EVENT, (e) => fn((e as CustomEvent<CartLine[]>).detail));
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) fn(read());
  });
};

export const initCartBadge = () => {
  const update = (lines: CartLine[]) => {
    const count = cartCount(lines);
    document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach((el) => {
      el.textContent = String(count);
      el.toggleAttribute('data-empty', count === 0);
      el.closest('a')?.setAttribute('aria-label', `Cart, ${count} ${count === 1 ? 'item' : 'items'}`);
    });
  };
  update(read());
  onCartChange(update);
};
