import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Product } from "@/lib/catalog";
import { formatToman, toFa } from "@/lib/format";
import { addToBag } from "@/lib/add-to-bag";
import { useWishlist, wishlist } from "@/lib/store";
import { cn } from "@/lib/utils";

export function WishToggle({ product, className }: { product: Product; className?: string }) {
  const wish = useWishlist();
  const active = wish.includes(product.id);
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const now = wishlist.toggle(product.id);
        toast(now ? `«${product.name}» به علاقه‌مندی‌ها افزوده شد` : "از علاقه‌مندی‌ها حذف شد");
      }}
      className={cn(
        "grid h-9 w-9 place-items-center bg-card/80 backdrop-blur-sm transition-colors hover:bg-card",
        className,
      )}
    >
      <span className="grid h-4 w-4 rotate-45 place-items-center border border-gold">
        <span className={cn("h-1.5 w-1.5 transition-colors", active ? "bg-gold" : "bg-transparent")} />
      </span>
    </button>
  );
}

export function ProductCard({ product, eager }: { product: Product; eager?: boolean }) {
  const [sizeOpen, setSizeOpen] = useState(false);
  const isMen = product.collection === "men";

  const button = (
    <button
      type="button"
      onClick={product.sizes ? undefined : () => addToBag(product.id)}
      className="mt-6 h-11 w-full bg-primary text-[13px] text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      افزودن به سبد خرید
    </button>
  );

  return (
    <article
      className={cn(
        "group flex flex-col border bg-card p-3 sm:p-5 lg:p-8",
        isMen ? "border-silver/70" : "border-gold/40",
      )}
    >
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand outline-1 -outline-offset-1 outline-foreground/5">
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1280}
            loading={eager ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <WishToggle product={product} className="absolute left-2 top-2" />
          {product.stock <= 3 && (
            <span className="absolute bottom-2 right-2 bg-card/90 px-2 py-1 text-[10px] text-foreground">
              فقط {toFa(product.stock)} عدد باقی مانده
            </span>
          )}
        </div>
        <p className="mt-6 text-[11px] tracking-[0.15em] text-gold">کد اصالت {toFa(product.code)}</p>
        <h3 className="mt-1 text-[16px] font-medium text-foreground sm:text-[19px]">{product.name}</h3>
        <p className="mt-1 text-[13px] text-muted-foreground sm:text-[14px]">{formatToman(product.price)}</p>
      </Link>

      <div className="mt-auto">
        {product.sizes ? (
          <Popover open={sizeOpen} onOpenChange={setSizeOpen}>
            <PopoverTrigger asChild>{button}</PopoverTrigger>
            <PopoverContent align="center" className="w-60 rounded-none border-gold/40 bg-card p-4" dir="rtl">
              <p className="text-[12px] text-muted-foreground">سایز را انتخاب کنید</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      addToBag(product.id, { size: s });
                      setSizeOpen(false);
                    }}
                    className="h-9 border border-border text-[13px] transition-colors hover:border-gold hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                className="mt-3 block text-[12px] text-primary hover:underline"
              >
                راهنمای سایز و جزئیات بیشتر
              </Link>
            </PopoverContent>
          </Popover>
        ) : (
          button
        )}
      </div>
    </article>
  );
}
