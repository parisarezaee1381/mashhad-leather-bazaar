import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { getProduct } from "@/lib/catalog";
import { lineKey, remainingForFreeShipping, FREE_SHIPPING_THRESHOLD, type CartLine } from "@/lib/cart";
import { formatToman, toFa } from "@/lib/format";
import { cart, ui } from "@/lib/store";

export function FreeShippingBanner({ subtotal }: { subtotal: number }) {
  const remaining = remainingForFreeShipping(subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  return (
    <div className="border border-gold/40 bg-card px-4 py-3 text-[12px] text-muted-foreground">
      {remaining > 0 ? (
        <p>
          با افزودن <span className="text-foreground">{formatToman(remaining)}</span> دیگر، ارسال شما
          رایگان می‌شود.
        </p>
      ) : (
        <p className="text-foreground">ارسال این سفارش به سراسر ایران رایگان است.</p>
      )}
      <div className="mt-2 h-px w-full bg-border">
        <div className="h-px bg-gold transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function CartLineRow({ line, compact }: { line: CartLine; compact?: boolean }) {
  const p = getProduct(line.productId);
  if (!p) return null;
  const key = lineKey(line);
  const atMax = line.qty >= p.stock;
  return (
    <li className="flex gap-4 py-5">
      <Link
        to="/product/$id"
        params={{ id: p.id }}
        onClick={() => ui.set({ cartOpen: false })}
        className={`shrink-0 bg-sand ${compact ? "h-24 w-20" : "h-32 w-26 sm:h-36 sm:w-28"}`}
      >
        <img src={p.image} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.15em] text-gold">کد اصالت {toFa(p.code)}</p>
            <Link
              to="/product/$id"
              params={{ id: p.id }}
              onClick={() => ui.set({ cartOpen: false })}
              className="mt-0.5 block truncate text-[14px] font-medium text-foreground hover:text-primary"
            >
              {p.name}
            </Link>
            <p className="mt-1 text-[12px] text-muted-foreground">
              {line.color}
              {line.size ? ` · سایز ${line.size}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => cart.remove(key)}
            className="shrink-0 p-1 text-muted-foreground hover:text-destructive"
            aria-label={`حذف ${p.name}`}
          >
            <X className="h-4 w-4" strokeWidth={1.2} />
          </button>
        </div>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="flex h-8 items-center border border-border">
            <button
              type="button"
              onClick={() => cart.setQty(key, line.qty + 1)}
              disabled={atMax}
              className="grid h-full w-8 place-items-center text-muted-foreground hover:text-foreground disabled:opacity-30"
              aria-label="افزایش تعداد"
            >
              <Plus className="h-3 w-3" />
            </button>
            <span className="w-7 text-center text-[13px]" aria-live="polite">
              {toFa(line.qty)}
            </span>
            <button
              type="button"
              onClick={() => cart.setQty(key, line.qty - 1)}
              className="grid h-full w-8 place-items-center text-muted-foreground hover:text-foreground"
              aria-label="کاهش تعداد"
            >
              <Minus className="h-3 w-3" />
            </button>
          </div>
          <p className="text-[13px] text-foreground">{formatToman(p.price * line.qty)}</p>
        </div>
        {atMax && (
          <p className="mt-1 text-[11px] text-muted-foreground">حداکثر موجودی: {toFa(p.stock)} عدد</p>
        )}
      </div>
    </li>
  );
}
