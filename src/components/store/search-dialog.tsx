import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { PRODUCTS, matchesSearch } from "@/lib/catalog";
import { formatToman, toFa } from "@/lib/format";
import { ui, useUi } from "@/lib/store";
import { SearchIcon } from "./icons";

const SUGGESTIONS = ["کیف دوشی", "کفش", "کاپشن", "کیف پول", "بانوان", "آقایان"];

export function SearchDialog() {
  const { searchOpen } = useUi();
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const results = useMemo(() => (q.trim() ? PRODUCTS.filter((p) => matchesSearch(p, q)) : []), [q]);
  const close = () => {
    ui.set({ searchOpen: false });
  };

  return (
    <Dialog
      open={searchOpen}
      onOpenChange={(o) => {
        ui.set({ searchOpen: o });
        if (!o) setQ("");
      }}
    >
      <DialogContent dir="rtl" className="top-[12%] max-w-xl translate-y-0 gap-0 rounded-none border-gold/40 bg-background p-0">
        <DialogTitle className="sr-only">جستجو در فروشگاه</DialogTitle>
        <DialogDescription className="sr-only">نام محصول، نوع یا کد اصالت را بنویسید</DialogDescription>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!q.trim()) return;
            close();
            navigate({ to: "/catalog", search: { q: q.trim() } });
            setQ("");
          }}
          className="flex items-center gap-3 border-b border-gold/40 px-5 py-4 pe-12"
        >
          <SearchIcon className="shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="نام محصول، نوع یا کد اصالت…"
            className="w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="عبارت جستجو"
          />
        </form>

        <div className="max-h-[60vh] overflow-y-auto px-5 py-4">
          {!q.trim() ? (
            <div>
              <p className="text-[11px] tracking-[0.15em] text-gold">جستجوهای پرتکرار</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQ(s)}
                    className="border border-border px-3 py-1.5 text-[12px] text-muted-foreground hover:border-gold hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-[14px] text-foreground">نتیجه‌ای برای «{q}» پیدا نشد</p>
              <p className="mt-2 text-[12px] text-muted-foreground">
                املای دیگری را امتحان کنید یا{" "}
                <Link to="/catalog" onClick={close} className="text-primary hover:underline">
                  همه محصولات
                </Link>{" "}
                را ببینید.
              </p>
            </div>
          ) : (
            <>
              <p className="text-[11px] text-muted-foreground">{toFa(results.length)} نتیجه</p>
              <ul className="mt-2 divide-y divide-border">
                {results.slice(0, 6).map((p) => (
                  <li key={p.id}>
                    <Link
                      to="/product/$id"
                      params={{ id: p.id }}
                      onClick={() => {
                        close();
                        setQ("");
                      }}
                      className="flex items-center gap-4 py-3 hover:bg-card"
                    >
                      <img src={p.image} alt="" className="h-14 w-11 shrink-0 bg-sand object-cover" loading="lazy" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] text-foreground">{p.name}</p>
                        <p className="text-[11px] text-gold">کد اصالت {toFa(p.code)}</p>
                      </div>
                      <p className="shrink-0 text-[12px] text-muted-foreground">{formatToman(p.price)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
              {results.length > 6 && (
                <button
                  type="submit"
                  onClick={() => {
                    close();
                    navigate({ to: "/catalog", search: { q: q.trim() } });
                    setQ("");
                  }}
                  className="mt-3 text-[12px] text-primary hover:underline"
                >
                  مشاهده همه {toFa(results.length)} نتیجه
                </button>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
