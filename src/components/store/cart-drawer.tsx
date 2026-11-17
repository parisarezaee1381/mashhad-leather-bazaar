import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { formatToman, toFa } from "@/lib/format";
import { ui, useCart, useUi } from "@/lib/store";
import { CartLineRow, FreeShippingBanner } from "./cart-lines";
import { BagIcon } from "./icons";

export function CartDrawer() {
  const { cartOpen } = useUi();
  const { lines, count, subtotal } = useCart();
  const close = () => ui.set({ cartOpen: false });

  return (
    <Sheet open={cartOpen} onOpenChange={(o) => ui.set({ cartOpen: o })}>
      <SheetContent
        side="right"
        dir="rtl"
        className="flex w-full flex-col gap-0 border-gold/40 bg-background p-0 sm:max-w-md"
      >
        <div className="border-b border-gold/40 px-6 py-5">
          <SheetTitle className="font-display text-[26px] font-normal leading-none">سبد خرید</SheetTitle>
          <SheetDescription className="mt-2 text-[12px]">
            {count > 0 ? `${toFa(count)} کالا در سبد شما` : "هنوز کالایی انتخاب نکرده‌اید"}
          </SheetDescription>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <BagIcon size={40} className="text-placeholder" />
            <p className="mt-5 text-[15px] text-foreground">سبد خرید شما خالی است</p>
            <p className="mt-2 text-[13px] text-muted-foreground">
              از کلکسیون پاییزه، اثری دست‌دوز برای خود برگزینید.
            </p>
            <Link
              to="/catalog"
              onClick={close}
              className="mt-6 inline-flex h-11 items-center bg-primary px-8 text-[13px] text-primary-foreground hover:bg-primary-hover"
            >
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <>
            <div className="px-6 pt-5">
              <FreeShippingBanner subtotal={subtotal} />
            </div>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {lines.map((l) => (
                <CartLineRow key={`${l.productId}|${l.color}|${l.size ?? ""}`} line={l} compact />
              ))}
            </ul>
            <div className="border-t border-gold/40 px-6 py-5">
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-muted-foreground">جمع کالاها</span>
                <span className="font-medium text-foreground">{formatToman(subtotal)}</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">هزینه ارسال در مرحله بعد محاسبه می‌شود.</p>
              <Link
                to="/checkout"
                onClick={close}
                className="mt-4 flex h-11 w-full items-center justify-center bg-primary text-[13px] text-primary-foreground hover:bg-primary-hover"
              >
                ادامه و تسویه حساب
              </Link>
              <Link
                to="/cart"
                onClick={close}
                className="hairline-link mx-auto mt-3 block w-fit text-[12px] text-muted-foreground hover:text-foreground"
              >
                مشاهده کامل سبد خرید
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
