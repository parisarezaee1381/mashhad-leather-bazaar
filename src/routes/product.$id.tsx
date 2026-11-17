import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import stitching from "@/assets/craft-stitching.jpg";
import hardware from "@/assets/craft-hardware.jpg";
import tanning from "@/assets/craft-tanning.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from "@/components/store/product-card";
import { JewelDivider } from "@/components/store/jewel-divider";
import { CATEGORY_TABS, COLLECTION_LABELS, PRODUCTS, TYPE_LABELS, getProduct } from "@/lib/catalog";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/cart";
import { formatToman, toFa } from "@/lib/format";
import { addToBag } from "@/lib/add-to-bag";
import { useWishlist, wishlist } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    if (!getProduct(params.id)) throw notFound();
  },
  head: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) return { meta: [{ title: "محصول یافت نشد — چرم مشهد" }, { name: "robots", content: "noindex" }] };
    const title = `${p.name} — کد اصالت ${toFa(p.code)} | چرم مشهد`;
    return {
      meta: [
        { title },
        { name: "description", content: `${p.description} قیمت: ${formatToman(p.price)}` },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: ProductNotFound,
  errorComponent: ({ error }) => (
    <div className="px-4 py-24 text-center" role="alert">
      <p className="font-display text-[28px]">بارگذاری این محصول ممکن نشد</p>
      <p className="mt-2 text-[13px] text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function ProductNotFound() {
  return (
    <div className="px-4 py-24 text-center">
      <p className="font-display text-[32px]">این اثر در نگارستان نیست</p>
      <p className="mt-3 text-[14px] text-muted-foreground">شاید فروخته شده یا نشانی آن تغییر کرده باشد.</p>
      <Link
        to="/catalog"
        className="mt-6 inline-flex h-11 items-center bg-primary px-8 text-[13px] text-primary-foreground hover:bg-primary-hover"
      >
        مشاهده همه محصولات
      </Link>
    </div>
  );
}

const CARE = [
  "چرم را دور از آفتاب مستقیم و گرمای بخاری نگه دارید؛ رنگ گیاهی آن با نور ملایم، گرم‌تر و زیباتر می‌شود.",
  "هر سه ماه یک‌بار، با پارچه‌ی نخی نرم و کمی واکس طبیعی موم زنبور، سطح چرم را تغذیه کنید.",
  "اگر خیس شد، با دستمال خشک آب را بگیرید و بگذارید در دمای اتاق، به آرامی خشک شود.",
  "در زمان نگهداری، کیف را با کاغذ بی‌اسید پر کنید و در کیسه‌ی پارچه‌ای همراهش بگذارید.",
];

function ProductPage() {
  const { id } = Route.useParams();
  const p = getProduct(id)!;
  const wish = useWishlist();
  const inWish = wish.includes(p.id);

  const gallery = [
    { src: p.image, note: p.sceneNote, alt: p.name },
    { src: stitching, note: "جزئیات: دوخت زین‌دوز دو سوزنه با نخ کتان موم‌اندود.", alt: "دوخت دستی چرم" },
    { src: hardware, note: "جزئیات: یراق برنجی یکپارچه با قلم‌زنی اسلیمی، ساخت سفارشی.", alt: "یراق‌آلات برنجی" },
    { src: tanning, note: "جزئیات: دباغی گیاهی با پوست انار در کارگاه چرم‌شهر.", alt: "دباغی طبیعی چرم" },
  ];
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(p.colors[0]);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const catLabel = CATEGORY_TABS.find((c) => c.id === p.category)?.label;
  const related = PRODUCTS.filter((x) => x.id !== p.id && (x.category === p.category || x.collection === p.collection)).slice(0, 4);
  const isMen = p.collection === "men";

  const onAdd = () => {
    if (p.sizes && !size) {
      setSizeError(true);
      toast.warning("لطفاً ابتدا سایز را انتخاب کنید");
      return;
    }
    addToBag(p.id, { color, size, qty });
  };

  return (
    <div key={p.id} className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14">
      <nav aria-label="مسیر" className="py-6 text-[12px] text-muted-foreground">
        <Link to="/" className="hover:text-foreground">خانه</Link>
        <span className="mx-2 text-gold">◆</span>
        <Link to="/catalog" className="hover:text-foreground">نگارستان</Link>
        <span className="mx-2 text-gold">◆</span>
        <Link to="/catalog" search={{ cat: p.category }} className="hover:text-foreground">{catLabel}</Link>
        <span className="mx-2 text-gold">◆</span>
        <span className="text-foreground">{p.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Gallery */}
        <div>
          <figure className={cn("border bg-card p-3 sm:p-6", isMen ? "border-silver/70" : "border-gold/40")}>
            <div className="aspect-[4/5] overflow-hidden bg-sand">
              <img
                src={gallery[active].src}
                alt={gallery[active].alt}
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 flex items-start gap-2 text-[12px] leading-6 text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden />
              {gallery[active].note}
            </figcaption>
          </figure>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {gallery.map((g, i) => (
              <button
                key={g.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`نمایش تصویر ${toFa(i + 1)}`}
                aria-pressed={active === i}
                className={cn(
                  "aspect-square overflow-hidden border bg-sand transition-colors",
                  active === i ? "border-gold" : "border-transparent hover:border-gold/50",
                )}
              >
                <img src={g.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[11px] tracking-[0.15em] text-gold">
            کد اصالت {toFa(p.code)} · {COLLECTION_LABELS[p.collection]}
          </p>
          <h1 className="font-display mt-2 text-[38px] leading-tight sm:text-[46px]">{p.name}</h1>
          <p className="mt-2 text-[18px] text-foreground">{formatToman(p.price)}</p>
          <p className="mt-5 text-[14px] leading-8 text-muted-foreground">{p.description}</p>

          <div className="mt-8">
            <p className="text-[12px] text-muted-foreground">
              رنگ: <span className="text-foreground">{color}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-pressed={color === c}
                  className={cn(
                    "h-9 border px-4 text-[13px] transition-colors",
                    color === c ? "border-gold text-foreground" : "border-border text-muted-foreground hover:border-gold/60",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {p.sizes && (
            <div className="mt-6">
              <p className={cn("text-[12px]", sizeError ? "text-destructive" : "text-muted-foreground")}>
                سایز: <span className="text-foreground">{size ?? "انتخاب کنید"}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s);
                      setSizeError(false);
                    }}
                    aria-pressed={size === s}
                    className={cn(
                      "h-9 min-w-12 border px-3 text-[13px] transition-colors",
                      size === s ? "border-gold text-foreground" : "border-border text-muted-foreground hover:border-gold/60",
                      sizeError && !size && "border-destructive/50",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <div className="flex h-12 items-center border border-border">
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(p.stock, q + 1))}
                disabled={qty >= p.stock}
                className="grid h-full w-10 place-items-center text-muted-foreground hover:text-foreground disabled:opacity-30"
                aria-label="افزایش تعداد"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-[14px]">{toFa(qty)}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-full w-10 place-items-center text-muted-foreground hover:text-foreground"
                aria-label="کاهش تعداد"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={onAdd}
              className="h-12 flex-1 bg-primary text-[14px] text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              افزودن به سبد خرید
            </button>
            <button
              type="button"
              onClick={() => {
                const now = wishlist.toggle(p.id);
                toast(now ? `«${p.name}» به علاقه‌مندی‌ها افزوده شد` : "از علاقه‌مندی‌ها حذف شد");
              }}
              aria-pressed={inWish}
              aria-label={inWish ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
              className="grid h-12 w-12 shrink-0 place-items-center border border-gold/60 hover:bg-gold/10"
            >
              <span className="grid h-4 w-4 rotate-45 place-items-center border border-gold">
                <span className={cn("h-1.5 w-1.5", inWish ? "bg-gold" : "")} />
              </span>
            </button>
          </div>
          <p className="mt-3 text-[12px] text-muted-foreground">
            {p.stock <= 3 ? `فقط ${toFa(p.stock)} عدد در انبار باقی مانده است. ` : "موجود در انبار مشهد. "}
            ارسال رایگان برای سفارش‌های بالای {formatToman(FREE_SHIPPING_THRESHOLD)}.
          </p>

          <div className="mt-8 border border-gold/40 bg-card p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-7 w-7 shrink-0 rotate-45 place-items-center border border-gold">
                <span className="h-2 w-2 bg-gold" />
              </span>
              <div>
                <p className="text-[13px] font-medium text-foreground">شناسنامه اصالت · کد {toFa(p.code)}</p>
                <p className="mt-1 text-[12px] leading-6 text-muted-foreground">
                  هر اثر با کارت اصالت شماره‌دار، نام استادکار و مهر کارگاه چرم‌شهر مشهد عرضه می‌شود. شناسه کالا:{" "}
                  <bdi>{toFa(p.sku)}</bdi>
                </p>
              </div>
            </div>
          </div>

          <Accordion type="multiple" defaultValue={["specs"]} className="mt-6">
            <AccordionItem value="specs" className="border-border">
              <AccordionTrigger className="text-[14px] hover:no-underline">مشخصات</AccordionTrigger>
              <AccordionContent>
                <dl className="divide-y divide-border text-[13px]">
                  <div className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted-foreground">نوع</dt>
                    <dd className="text-foreground">{TYPE_LABELS[p.type]}</dd>
                  </div>
                  {p.specs.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 py-2.5">
                      <dt className="shrink-0 text-muted-foreground">{k}</dt>
                      <dd className="text-start text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care" className="border-border">
              <AccordionTrigger className="text-[14px] hover:no-underline">راهنمای نگهداری چرم</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 text-[13px] leading-7 text-muted-foreground">
                  {CARE.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="mt-3 h-1 w-1 shrink-0 rotate-45 bg-gold" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping" className="border-border">
              <AccordionTrigger className="text-[14px] hover:no-underline">ارسال و بازگشت</AccordionTrigger>
              <AccordionContent className="text-[13px] leading-7 text-muted-foreground">
                ارسال با پست پیشتاز به سراسر ایران در ۳ تا ۵ روز کاری، و با پیک ویژه در تهران و مشهد تا فردا.
                تا ۷ روز پس از دریافت، کالای استفاده‌نشده را با شناسنامه اصالت بازگردانید.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {related.length > 0 && (
        <section className="pt-24">
          <JewelDivider />
          <h2 className="font-display mt-12 text-center text-[32px] sm:text-[38px]">همنشین‌های این اثر</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
