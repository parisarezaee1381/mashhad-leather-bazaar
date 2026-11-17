import type { Product } from "./catalog";

/** Orders at or above this subtotal ship free (Toman). */
export const FREE_SHIPPING_THRESHOLD = 15_000_000;

export const SHIPPING_METHODS = [
  {
    id: "post",
    label: "پست پیشتاز",
    note: "۳ تا ۵ روز کاری، سراسر ایران",
    fee: 250_000,
  },
  {
    id: "courier",
    label: "پیک ویژه",
    note: "تحویل فردا، فقط تهران و مشهد",
    fee: 450_000,
  },
] as const;
export type ShippingMethodId = (typeof SHIPPING_METHODS)[number]["id"];

export type CartLine = {
  productId: string;
  color: string;
  size?: string;
  qty: number;
};

export function lineKey(l: Pick<CartLine, "productId" | "color" | "size">) {
  return `${l.productId}|${l.color}|${l.size ?? ""}`;
}

/** Add a line, merging with an identical one; quantity never exceeds stock. */
export function addLine(lines: CartLine[], line: CartLine, stock: number): CartLine[] {
  const key = lineKey(line);
  const existing = lines.find((l) => lineKey(l) === key);
  if (existing) {
    return lines.map((l) =>
      lineKey(l) === key ? { ...l, qty: Math.min(stock, l.qty + line.qty) } : l,
    );
  }
  return [...lines, { ...line, qty: Math.min(stock, Math.max(1, line.qty)) }];
}

export function setLineQty(lines: CartLine[], key: string, qty: number, stock: number) {
  if (qty <= 0) return lines.filter((l) => lineKey(l) !== key);
  return lines.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(stock, qty) } : l));
}

export function subtotalOf(lines: CartLine[], getProduct: (id: string) => Product | undefined) {
  return lines.reduce((sum, l) => sum + (getProduct(l.productId)?.price ?? 0) * l.qty, 0);
}

export function countOf(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function shippingFee(subtotal: number, method: ShippingMethodId = "post") {
  if (subtotal <= 0) return 0;
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_METHODS.find((m) => m.id === method)?.fee ?? 0;
}

export function remainingForFreeShipping(subtotal: number) {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
}
