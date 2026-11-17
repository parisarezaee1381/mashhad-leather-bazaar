import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductCard } from "@/components/store/product-card";
import {
  CATEGORY_TABS,
  COLLECTION_LABELS,
  PRICE_RANGES,
  PRODUCTS,
  SORT_OPTIONS,
  filterProducts,
  paginate,
} from "@/lib/catalog";
import { toFa } from "@/lib/format";

const searchSchema = z.object({
  cat: fallback(z.string(), "all").default("all"),
  type: fallback(z.string(), "").default(""),
  gender: fallback(z.string(), "").default(""),
  price: fallback(z.string(), "").default(""),
  sort: fallback(z.string(), "featured").default("featured"),
  q: fallback(z.string(), "").default(""),
  page: fallback(z.number().int(), 1).default(1),
});

export const Route = createFileRoute("/catalog")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "نگارستان چرم مشهد — کلکسیون فاخر پاییزه" },
      {
        name: "description",
        content: "کیف دوشی، کیف دستی، کفش، کاپشن و اکسسوری چرم دست‌دوز مشهد با کد اصالت و قیمت به تومان.",
      },
      { property: "og:title", content: "نگارستان چرم مشهد — کلکسیون فاخر پاییزه" },
      { property: "og:description", content: "همه محصولات چرم دست‌دوز مشهد در یک نگارستان." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CatalogPage,
});

const BAG_TYPES = [
  { id: "", label: "همه کیف‌ها" },
  { id: "shoulder", label: "کیف دوشی" },
  { id: "hand", label: "کیف دستی" },
];

function FilterMenu({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (v: string) => void;
}) {
  const current = options.find((o) => o.id === value) ?? options[0];
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger className="hairline-link flex items-center gap-1.5 text-[13px] text-muted-foreground outline-none hover:text-foreground data-[state=open]:text-foreground">
        <span>{label}:</span>
        <span className={value ? "text-foreground" : ""}>{current.label}</span>
        <ChevronDown className="h-3 w-3" strokeWidth={1.2} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-44 rounded-none border-gold/40 bg-card">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {options.map((o) => (
            <DropdownMenuRadioItem key={o.id || "none"} value={o.id} className="rounded-none text-[13px]">
              {o.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CatalogPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/catalog" });
  const filtered = filterProducts(PRODUCTS, search);
  const { items, page, pageCount } = paginate(filtered, search.page);

  const set = (patch: Partial<typeof search>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch, page: 1 }), resetScroll: false });

  const hasFilters = !!(search.type || search.gender || search.price || search.q || search.cat !== "all");
  const clearAll = () =>
    navigate({ search: { cat: "all", type: "", gender: "", price: "", sort: search.sort, q: "", page: 1 } });

  return (
    <div className="mx-auto max-w-[1440px]">
      <section className="px-4 pb-8 pt-12 text-center sm:pb-10 sm:pt-14">
        <p className="mb-4 text-[12px] tracking-[0.2em] text-gold">پاییز ۱۴۰۳</p>
        <h1 className="font-display text-[32px] leading-tight sm:text-[40px] lg:text-[46px]">
          کلکسیون فاخر پاییزه <span className="text-gold">•</span> نگارستان چرم مشهد
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[14px] font-light leading-7 text-muted-foreground sm:text-[16px]">
          چرمی که آفتاب خراسان رنگش زده و دستِ استادکار، به آرامیِ کاروان‌های جاده ابریشم دوختش.
        </p>
      </section>

      <nav
        aria-label="دسته‌بندی محصولات"
        className="flex gap-8 overflow-x-auto px-4 pb-8 text-[14px] [scrollbar-width:none] sm:justify-center sm:gap-12 sm:pb-10"
      >
        {CATEGORY_TABS.map((t) => {
          const active = search.cat === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => set({ cat: t.id, type: "" })}
              data-active={active}
              aria-current={active ? "page" : undefined}
              className={`hairline-link shrink-0 whitespace-nowrap ${
                active ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </nav>

      {/* Subtle text filter bar */}
      <div className="mx-4 flex flex-col gap-4 border-y border-border py-3 sm:mx-8 lg:mx-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {search.cat === "bags" && (
            <FilterMenu label="نوع" value={search.type} options={BAG_TYPES} onChange={(v) => set({ type: v })} />
          )}
          <FilterMenu
            label="مجموعه"
            value={search.gender}
            options={[
              { id: "", label: "همه" },
              { id: "women", label: COLLECTION_LABELS.women },
              { id: "men", label: COLLECTION_LABELS.men },
            ]}
            onChange={(v) => set({ gender: v })}
          />
          <FilterMenu
            label="قیمت"
            value={search.price}
            options={[{ id: "", label: "همه قیمت‌ها" }, ...PRICE_RANGES]}
            onChange={(v) => set({ price: v })}
          />
          {hasFilters && (
            <button type="button" onClick={clearAll} className="text-[12px] text-primary hover:underline">
              پاک کردن فیلترها
            </button>
          )}
        </div>
        <div className="flex items-center justify-between gap-8 lg:justify-end">
          <span className="text-[12px] text-muted-foreground" aria-live="polite">
            {toFa(filtered.length)} محصول
          </span>
          <FilterMenu
            label="مرتب‌سازی"
            value={search.sort}
            options={SORT_OPTIONS.map((o) => ({ id: o.id, label: o.label }))}
            onChange={(v) => set({ sort: v })}
          />
        </div>
      </div>

      {search.q && (
        <p className="px-4 pt-6 text-center text-[13px] text-muted-foreground">
          نتایج جستجو برای «<span className="text-foreground">{search.q}</span>»{" "}
          <button type="button" onClick={() => set({ q: "" })} className="text-primary hover:underline">
            حذف جستجو
          </button>
        </p>
      )}

      {items.length === 0 ? (
        <div className="mx-4 mt-10 border border-gold/40 bg-card px-6 py-16 text-center sm:mx-8 lg:mx-14">
          <p className="font-display text-[26px]">اثری با این ویژگی‌ها نیافتیم</p>
          <p className="mt-3 text-[14px] text-muted-foreground">
            فیلترها را کمتر کنید یا همه‌ی کلکسیون پاییزه را ببینید.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-6 h-11 bg-primary px-8 text-[13px] text-primary-foreground hover:bg-primary-hover"
          >
            نمایش همه محصولات
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 px-4 sm:gap-6 sm:px-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 lg:px-14">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} eager={i < 4} />
          ))}
        </div>
      )}

      {pageCount > 1 && (
        <nav aria-label="صفحه‌بندی" className="mt-14 flex items-center justify-center gap-6 text-[13px]">
          <Link
            from="/catalog"
            search={(prev) => ({ ...prev, page: page - 1 })}
            disabled={page <= 1}
            className={`hairline-link ${page <= 1 ? "pointer-events-none opacity-30" : "text-muted-foreground hover:text-foreground"}`}
          >
            قبلی
          </Link>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              from="/catalog"
              search={(prev) => ({ ...prev, page: n })}
              data-active={n === page}
              aria-current={n === page ? "page" : undefined}
              className={`hairline-link w-6 text-center ${n === page ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {toFa(n)}
            </Link>
          ))}
          <Link
            from="/catalog"
            search={(prev) => ({ ...prev, page: page + 1 })}
            disabled={page >= pageCount}
            className={`hairline-link ${page >= pageCount ? "pointer-events-none opacity-30" : "text-muted-foreground hover:text-foreground"}`}
          >
            بعدی
          </Link>
        </nav>
      )}
    </div>
  );
}
