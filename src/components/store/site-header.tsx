import { Link } from "@tanstack/react-router";
import { toFa } from "@/lib/format";
import { ui, useCart, useWishlist } from "@/lib/store";
import { BagIcon, MenuIcon, SearchIcon, UserIcon } from "./icons";

export function SiteHeader() {
  const { count } = useCart();
  const wish = useWishlist();

  return (
    <header className="sticky top-0 z-40 border-b border-gold/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-20 sm:px-8 lg:px-14">
        {/* start (right in RTL): bag + wishlist */}
        <div className="flex items-center gap-4 sm:gap-5">
          <button
            type="button"
            onClick={() => ui.set({ cartOpen: true })}
            className="relative text-foreground transition-colors hover:text-primary"
            aria-label={`سبد خرید، ${toFa(count)} کالا`}
          >
            <BagIcon />
            {count > 0 && (
              <span className="absolute -left-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] text-primary-foreground">
                {toFa(count)}
              </span>
            )}
          </button>
          <Link
            to="/account"
            search={{ tab: "wishlist" }}
            className="group relative"
            aria-label={`علاقه‌مندی‌ها، ${toFa(wish.length)} مورد`}
          >
            <span className="grid h-7 w-7 rotate-45 place-items-center border border-gold transition-colors group-hover:bg-gold/10">
              <span className="h-2 w-2 bg-gold" />
            </span>
            {wish.length > 0 && (
              <span className="absolute -left-2.5 -top-2 grid h-4 min-w-4 place-items-center rounded-full border border-gold bg-card px-1 text-[9px] text-foreground">
                {toFa(wish.length)}
              </span>
            )}
          </Link>
        </div>

        <Link to="/" className="justify-self-center text-center" aria-label="چرم مشهد — صفحه اصلی">
          <span className="font-display block text-[28px] leading-none text-foreground sm:text-[34px]">
            چرم مشهد
          </span>
        </Link>

        {/* end (left in RTL): account, search, menu */}
        <div className="flex items-center justify-self-end gap-4 text-[13px] text-muted-foreground sm:gap-6">
          <Link
            to="/account"
            search={{ tab: "orders" }}
            className="hidden items-center gap-2 transition-colors hover:text-foreground md:flex"
          >
            <UserIcon />
            حساب کاربری
          </Link>
          <button
            type="button"
            onClick={() => ui.set({ searchOpen: true })}
            className="flex items-center gap-2 transition-colors hover:text-foreground"
            aria-label="جستجو"
          >
            <SearchIcon />
            <span className="hidden md:inline">جستجو</span>
          </button>
          <button
            type="button"
            onClick={() => ui.set({ menuOpen: true })}
            className="flex items-center gap-2 transition-colors hover:text-foreground"
            aria-label="منو"
          >
            <MenuIcon />
            <span className="hidden lg:inline">منو</span>
          </button>
        </div>
      </div>
    </header>
  );
}
