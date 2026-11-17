import { useSyncExternalStore } from "react";
import { getProduct } from "./catalog";
import {
  addLine,
  countOf,
  lineKey,
  setLineQty,
  subtotalOf,
  type CartLine,
  type ShippingMethodId,
} from "./cart";

type Listener = () => void;

/** A tiny localStorage-backed store; server render always sees the initial value. */
function createPersistentStore<T>(key: string, initial: T) {
  let state = initial;
  let loaded = false;
  const listeners = new Set<Listener>();

  const load = () => {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) state = JSON.parse(raw) as T;
    } catch {
      /* ignore corrupt storage */
    }
  };

  const emit = () => listeners.forEach((l) => l());

  return {
    get: () => {
      load();
      return state;
    },
    getServer: () => initial,
    set: (fn: (prev: T) => T) => {
      load();
      state = fn(state);
      try {
        window.localStorage.setItem(key, JSON.stringify(state));
      } catch {
        /* storage full or blocked */
      }
      emit();
    },
    subscribe: (l: Listener) => {
      listeners.add(l);
      const onStorage = (e: StorageEvent) => {
        if (e.key === key) {
          loaded = false;
          load();
          emit();
        }
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(l);
        window.removeEventListener("storage", onStorage);
      };
    },
  };
}

function useStore<T>(store: ReturnType<typeof createPersistentStore<T>>) {
  return useSyncExternalStore(store.subscribe, store.get, store.getServer);
}

/* ---------------- cart ---------------- */

const EMPTY_CART: CartLine[] = [];
const cartStore = createPersistentStore<CartLine[]>("ml-cart-v1", EMPTY_CART);

export const cart = {
  add(line: CartLine) {
    const p = getProduct(line.productId);
    if (!p) return { added: 0 };
    const before = cartStore.get().find((l) => lineKey(l) === lineKey(line))?.qty ?? 0;
    cartStore.set((prev) => addLine(prev, line, p.stock));
    const after = cartStore.get().find((l) => lineKey(l) === lineKey(line))?.qty ?? 0;
    return { added: after - before };
  },
  setQty(key: string, qty: number) {
    const productId = key.split("|")[0];
    const p = getProduct(productId);
    cartStore.set((prev) => setLineQty(prev, key, qty, p?.stock ?? 0));
  },
  remove(key: string) {
    cartStore.set((prev) => prev.filter((l) => lineKey(l) !== key));
  },
  clear() {
    cartStore.set(() => []);
  },
};

export function useCart() {
  const lines = useStore(cartStore);
  return {
    lines: lines.filter((l) => getProduct(l.productId)),
    count: countOf(lines),
    subtotal: subtotalOf(lines, getProduct),
  };
}

/* ---------------- wishlist ---------------- */

const EMPTY_WISH: string[] = [];
const wishStore = createPersistentStore<string[]>("ml-wishlist-v1", EMPTY_WISH);

export const wishlist = {
  toggle(id: string): boolean {
    const has = wishStore.get().includes(id);
    wishStore.set((prev) => (has ? prev.filter((x) => x !== id) : [id, ...prev]));
    return !has;
  },
};

export function useWishlist() {
  return useStore(wishStore);
}

/* ---------------- orders ---------------- */

export type Order = {
  id: string;
  createdAt: string;
  lines: (CartLine & { name: string; price: number })[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingMethod: ShippingMethodId;
  payment: "online" | "cod";
  address: {
    fullName: string;
    phone: string;
    province: string;
    city: string;
    address: string;
    postalCode: string;
  };
};

const EMPTY_ORDERS: Order[] = [];
const orderStore = createPersistentStore<Order[]>("ml-orders-v1", EMPTY_ORDERS);

export const orders = {
  place(order: Order) {
    orderStore.set((prev) => [order, ...prev]);
  },
};

export function useOrders() {
  return useStore(orderStore);
}

/* ---------------- ui (not persisted) ---------------- */

let uiState = { cartOpen: false, searchOpen: false, menuOpen: false };
const uiListeners = new Set<Listener>();
const SERVER_UI = uiState;

export const ui = {
  set(patch: Partial<typeof uiState>) {
    uiState = { ...uiState, ...patch };
    uiListeners.forEach((l) => l());
  },
};

export function useUi() {
  return useSyncExternalStore(
    (l) => {
      uiListeners.add(l);
      return () => uiListeners.delete(l);
    },
    () => uiState,
    () => SERVER_UI,
  );
}
