import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { CATEGORY_TABS } from "@/lib/catalog";
import { ui, useUi } from "@/lib/store";
import { JewelDivider } from "./jewel-divider";

export function MenuSheet() {
  const { menuOpen } = useUi();
  const close = () => ui.set({ menuOpen: false });
  const linkCls = "block py-2.5 text-[15px] text-foreground transition-colors hover:text-primary";

  return (
    <Sheet open={menuOpen} onOpenChange={(o) => ui.set({ menuOpen: o })}>
      <SheetContent side="left" dir="rtl" className="flex w-[86%] flex-col border-gold/40 bg-background p-0 sm:max-w-sm">
        <div className="px-6 pb-4 pt-6">
          <SheetTitle className="font-display text-[30px] font-normal leading-none">چرم مشهد</SheetTitle>
          <SheetDescription className="mt-2 text-[12px]">قدرت چرم، ظرافت هنر • اصالت از سال ۱۳۷۶</SheetDescription>
        </div>
        <JewelDivider className="px-6" />
        <nav className="flex-1 overflow-y-auto px-6 py-4" aria-label="منوی اصلی">
          <Link to="/" onClick={close} className={linkCls}>خانه</Link>
          <p className="mt-4 text-[11px] tracking-[0.15em] text-gold">فروشگاه</p>
          {CATEGORY_TABS.map((t) => (
            <Link
              key={t.id}
              to="/catalog"
              search={t.id === "all" ? {} : { cat: t.id }}
              onClick={close}
              className={linkCls}
            >
              {t.label}
            </Link>
          ))}
          <p className="mt-4 text-[11px] tracking-[0.15em] text-gold">کلکسیون‌ها</p>
          <Link to="/catalog" search={{ gender: "women" }} onClick={close} className={linkCls}>
            کلکسیون بانوان
          </Link>
          <Link to="/catalog" search={{ gender: "men" }} onClick={close} className={linkCls}>
            مجموعه آقایان
          </Link>
          <p className="mt-4 text-[11px] tracking-[0.15em] text-gold">چرم مشهد</p>
          <Link to="/atelier" onClick={close} className={linkCls}>آتلیه و میراث</Link>
          <Link to="/account" search={{ tab: "orders" }} onClick={close} className={linkCls}>
            حساب کاربری و سفارش‌ها
          </Link>
          <Link to="/account" search={{ tab: "wishlist" }} onClick={close} className={linkCls}>
            علاقه‌مندی‌ها
          </Link>
        </nav>
        <p className="border-t border-gold/40 px-6 py-4 text-[12px] text-muted-foreground">
          <span className="font-display text-[16px] text-foreground">تأسیس ۱۳۷۶</span> — شهرک صنعتی چرم‌شهر
        </p>
      </SheetContent>
    </Sheet>
  );
}
