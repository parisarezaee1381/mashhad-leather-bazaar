import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-courtyard.jpg";
import women from "@/assets/collection-women.jpg";
import men from "@/assets/collection-men.jpg";
import tanning from "@/assets/craft-tanning.jpg";
import hardware from "@/assets/craft-hardware.jpg";
import stitching from "@/assets/craft-stitching.jpg";
import workshop from "@/assets/atelier-workshop.jpg";
import { ProductCard } from "@/components/store/product-card";
import { JewelDivider } from "@/components/store/jewel-divider";
import { PRODUCTS } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "چرم مشهد — قدرت چرم، ظرافت هنر • اصالت از سال ۱۳۷۶" },
      {
        name: "description",
        content:
          "کیف، کفش، کاپشن و اکسسوری چرم طبیعی، دباغی گیاهی و دست‌دوز در کارگاه‌های چرم‌شهر مشهد. کلکسیون بانوان و مجموعه آقایان.",
      },
      { property: "og:title", content: "چرم مشهد — قدرت چرم، ظرافت هنر" },
      { property: "og:description", content: "کالای چرم دست‌دوز مشهد؛ اصالت از سال ۱۳۷۶." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const PILLARS = [
  {
    title: "دباغی طبیعی",
    text: "پوست‌ها با پوست انار و مازو، به شیوه‌ی کهن خراسان و بی‌شتاب دباغی می‌شوند تا رنگی گرم و دوامی نسل‌به‌نسل بیابند.",
    image: tanning,
  },
  {
    title: "یراق‌آلات سفارشی",
    text: "سگک‌ها و قفل‌ها از برنج یکپارچه ریخته و با نقش اسلیمی قلم‌زنی می‌شوند؛ ویژه‌ی چرم مشهد و بی‌همتا.",
    image: hardware,
  },
  {
    title: "دست‌دوز در مشهد",
    text: "هر کالا را یک استادکار با دو سوزن و نخ موم‌اندود، کوک‌به‌کوک در کارگاه چرم‌شهر می‌دوزد و مهر می‌کند.",
    image: stitching,
  },
];

function HomePage() {
  const featured = PRODUCTS.slice(0, 4);
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[68vh] min-h-[420px] w-full overflow-hidden bg-sand sm:h-[78vh] lg:max-h-[760px]">
          <img
            src={hero}
            alt="بانویی با روسری ابریشمی و کیف چرمی عسلی، نشسته در حیاط خانه‌ای ایرانی"
            width={1920}
            height={1088}
            className="h-full w-full object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent sm:bg-gradient-to-l sm:from-transparent sm:via-foreground/10 sm:to-foreground/55" />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-4 pb-8 sm:inset-y-0 sm:left-0 sm:right-auto sm:flex sm:w-1/2 sm:items-center sm:px-10 sm:pb-0 lg:px-20">
          <div className="max-w-md text-primary-foreground">
            <p className="text-[12px] tracking-[0.2em] text-gold">اصالت از سال ۱۳۷۶</p>
            <h1 className="font-display mt-3 text-[40px] leading-[1.25] sm:text-[52px] lg:text-[60px]">
              قدرت چرم، <span className="text-gold">ظرافت</span> هنر
            </h1>
            <p className="mt-4 text-[15px] font-light leading-8 text-primary-foreground/90">
              چرمی که آفتاب خراسان رنگش زده و دستِ استادکار، به آرامیِ کاروان‌های جاده ابریشم دوختش.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/catalog"
                className="inline-flex h-11 items-center bg-primary px-8 text-[13px] text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                کلکسیون فاخر پاییزه
              </Link>
              <Link
                to="/atelier"
                className="inline-flex h-11 items-center border border-primary-foreground/70 px-6 text-[13px] text-primary-foreground transition-colors hover:border-gold hover:text-gold"
              >
                داستان آتلیه
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-[1440px] px-4 pt-20 sm:px-8 lg:px-14">
        <div className="text-center">
          <p className="text-[12px] tracking-[0.2em] text-gold">پاییز ۱۴۰۳</p>
          <h2 className="font-display mt-3 text-[34px] leading-tight sm:text-[42px]">دو کلکسیون، یک اصالت</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-8">
          <CollectionCard
            to="women"
            image={women}
            title="کلکسیون بانوان"
            text="کیف‌های دستی و دوشی، کت چرمی و پاپوش؛ با وقار و نرمی ابریشم."
            tone="gold"
          />
          <CollectionCard
            to="men"
            image={men}
            title="مجموعه آقایان"
            text="کیف اداری، کاپشن، کفش و کمربند؛ استوار، آراسته و ماندگار."
            tone="silver"
          />
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-[1440px] px-4 pt-24 sm:px-8 lg:px-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[12px] tracking-[0.2em] text-gold">نگارستان چرم مشهد</p>
            <h2 className="font-display mt-2 text-[30px] leading-tight sm:text-[38px]">برگزیده‌های فصل</h2>
          </div>
          <Link to="/catalog" className="hairline-link shrink-0 text-[13px] text-muted-foreground hover:text-foreground">
            همه محصولات
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-[1440px] px-4 pt-24 sm:px-8 lg:px-14">
        <JewelDivider />
        <div className="mt-14 text-center">
          <h2 className="font-display text-[32px] leading-tight sm:text-[40px]">سه ستون هنر چرم مشهد</h2>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {PILLARS.map((p, i) => (
            <article key={p.title} className="text-center">
              <div className="mx-auto aspect-square max-w-sm overflow-hidden bg-sand">
                <img src={p.image} alt={p.title} width={1024} height={1024} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <p className="mt-6 text-[11px] tracking-[0.2em] text-gold">{["یکم", "دوم", "سوم"][i]}</p>
              <h3 className="font-display mt-1 text-[26px]">{p.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-[14px] leading-7 text-muted-foreground">{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Atelier teaser */}
      <section className="mx-auto max-w-[1440px] px-4 pt-24 sm:px-8 lg:px-14">
        <div className="grid items-center gap-8 border border-gold/40 bg-card p-4 sm:p-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:p-10">
          <div className="aspect-[16/10] overflow-hidden bg-sand">
            <img src={workshop} alt="استادکار سالخورده در حال دوختن کیف چرمی در کارگاه مشهد" width={1600} height={1008} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-[12px] tracking-[0.2em] text-gold">آتلیه و میراث</p>
            <h2 className="font-display mt-2 text-[32px] leading-tight sm:text-[38px]">از کارگاهی کوچک در مشهد</h2>
            <p className="mt-4 text-[14px] leading-8 text-muted-foreground">
              سال ۱۳۷۶، در کارگاهی کوچک کنار بازار رضا، نخستین کیف چرم مشهد کوک خورد. امروز در کارخانجات
              شهرک صنعتی چرم‌شهر، همان شیوه‌ی دست‌دوز را با شکیبایی ادامه می‌دهیم.
            </p>
            <Link
              to="/atelier"
              className="mt-6 inline-flex h-11 items-center bg-primary px-8 text-[13px] text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              داستان ما و نشانی‌ها
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function CollectionCard({
  to,
  image,
  title,
  text,
  tone,
}: {
  to: "women" | "men";
  image: string;
  title: string;
  text: string;
  tone: "gold" | "silver";
}) {
  return (
    <Link
      to="/catalog"
      search={{ gender: to }}
      className={`group block border bg-card p-3 sm:p-6 ${tone === "gold" ? "border-gold/50" : "border-silver/70"}`}
    >
      <div className="aspect-[4/5] overflow-hidden bg-sand">
        <img src={image} alt={title} width={1024} height={1280} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <div className="flex items-end justify-between gap-4 px-1 pb-1 pt-5">
        <div className="min-w-0">
          <h3 className="font-display text-[28px] leading-tight sm:text-[32px]">{title}</h3>
          <p className="mt-1 text-[13px] text-muted-foreground">{text}</p>
        </div>
        <span className={`hairline-link shrink-0 text-[13px] ${tone === "gold" ? "text-gold" : "text-muted-foreground"}`}>
          مشاهده
        </span>
      </div>
    </Link>
  );
}
