import ferdows from "@/assets/products/ferdows-handbag.jpg";
import neyshabur from "@/assets/products/neyshabur-shoulder.jpg";
import toos from "@/assets/products/toos-shoes.jpg";
import golbahar from "@/assets/products/golbahar-wallet.jpg";
import kalat from "@/assets/products/kalat-briefcase.jpg";
import sabzevar from "@/assets/products/sabzevar-jacket.jpg";
import shandiz from "@/assets/products/shandiz-jacket.jpg";
import torghabeh from "@/assets/products/torghabeh-shoulder.jpg";
import abrisham from "@/assets/products/abrisham-shoes.jpg";
import kashafrood from "@/assets/products/kashafrood-belt.jpg";
import sarakhs from "@/assets/products/sarakhs-messenger.jpg";
import binalood from "@/assets/products/binalood-cardholder.jpg";

export type CategoryId = "bags" | "shoes" | "accessories" | "jackets";
export type ProductType = "shoulder" | "hand" | "shoe" | "jacket" | "accessory";
export type Collection = "women" | "men";

export type Product = {
  id: string;
  /** Authenticity code, Latin digits; shown as "کد اصالت ۰۱۴۷". */
  code: string;
  sku: string;
  name: string;
  category: CategoryId;
  type: ProductType;
  collection: Collection;
  price: number;
  stock: number;
  image: string;
  sceneNote: string;
  description: string;
  colors: string[];
  sizes?: string[];
  specs: [string, string][];
  /** Lower = newer arrival. */
  arrival: number;
};

/** Tabs exactly as designed, plus the jackets group the brief asks for. */
export const CATEGORY_TABS: { id: "all" | CategoryId; label: string }[] = [
  { id: "all", label: "همه محصولات" },
  { id: "bags", label: "کیف‌های دست‌دوز" },
  { id: "shoes", label: "کفش و پاپوش" },
  { id: "accessories", label: "اکسسوری و هدایا" },
  { id: "jackets", label: "کاپشن چرمی" },
];

export const TYPE_LABELS: Record<ProductType, string> = {
  shoulder: "کیف دوشی",
  hand: "کیف دستی",
  shoe: "کفش",
  jacket: "کاپشن",
  accessory: "اکسسوری",
};

export const COLLECTION_LABELS: Record<Collection, string> = {
  women: "کلکسیون بانوان",
  men: "مجموعه آقایان",
};

export const PRICE_RANGES: { id: string; label: string; min: number; max: number }[] = [
  { id: "0-5", label: "تا ۵ میلیون تومان", min: 0, max: 5_000_000 },
  { id: "5-15", label: "۵ تا ۱۵ میلیون تومان", min: 5_000_000, max: 15_000_000 },
  { id: "15-25", label: "۱۵ تا ۲۵ میلیون تومان", min: 15_000_000, max: 25_000_000 },
  { id: "25+", label: "بیش از ۲۵ میلیون تومان", min: 25_000_000, max: 0 },
];

export const SORT_OPTIONS = [
  { id: "featured", label: "پیشنهاد آتلیه" },
  { id: "new", label: "تازه‌ترین" },
  { id: "price-asc", label: "ارزان‌ترین" },
  { id: "price-desc", label: "گران‌ترین" },
] as const;
export type SortId = (typeof SORT_OPTIONS)[number]["id"];


export const PRODUCTS: Product[] = [
  {
    id: "ferdows-handbag",
    code: "0147",
    sku: "S5410",
    name: "کیف دستی فردوس",
    category: "bags",
    type: "hand",
    collection: "women",
    price: 18_400_000,
    stock: 6,
    image: ferdows,
    sceneNote: "صحنه: سکوی تراورتن خام بر فرش دستباف کاشان، نور صبحگاهی از پنجره‌ی قوسی.",
    description:
      "کیف دستی ساختارمند با قفل چرخشی برنجی؛ از چرم گاوی دباغی‌شده با پوست انار، با لبه‌های رنگ‌خورده و دوخت زین‌دوز دست.",
    colors: ["عسلی", "قهوه‌ای سوخته", "مشکی زغالی"],
    specs: [
      ["جنس رویه", "چرم طبیعی گاوی، دباغی گیاهی"],
      ["آستر", "جیر طبیعی شتری"],
      ["یراق‌آلات", "برنج یکپارچه حکاکی‌شده"],
      ["ابعاد", "۲۸ × ۲۲ × ۱۲ سانتی‌متر"],
      ["ساخت", "دست‌دوز در کارگاه چرم‌شهر مشهد"],
    ],
    arrival: 2,
  },
  {
    id: "neyshabur-shoulder",
    code: "0238",
    sku: "S5426",
    name: "کیف دوشی نیشابور",
    category: "bags",
    type: "shoulder",
    collection: "women",
    price: 12_900_000,
    stock: 9,
    image: neyshabur,
    sceneNote: "صحنه: پله‌های سنگی حیاط خانه‌ای قدیمی، کنار حوض فیروزه‌ای.",
    description:
      "کیف دوشی نرم با درِ نیم‌گرد و بند بلند قابل تنظیم؛ سبک، جادار و همراه روزهای آرام پاییزی.",
    colors: ["عسلی", "زیتونی", "شیری"],
    specs: [
      ["جنس رویه", "چرم بز نرم، دباغی گیاهی"],
      ["آستر", "پارچه کتان طبیعی"],
      ["بند", "قابل تنظیم، ۱۰۵ تا ۱۲۵ سانتی‌متر"],
      ["ابعاد", "۲۴ × ۱۹ × ۸ سانتی‌متر"],
      ["ساخت", "دست‌دوز در کارگاه چرم‌شهر مشهد"],
    ],
    arrival: 5,
  },
  {
    id: "toos-shoes",
    code: "0352",
    sku: "S5433",
    name: "پاپوش مردانه توس",
    category: "shoes",
    type: "shoe",
    collection: "men",
    price: 15_600_000,
    stock: 4,
    image: toos,
    sceneNote: "صحنه: فرش لاکی‌سرمه‌ای تبریز، استکان کمرباریک در زیرلیوانی برنجی.",
    description:
      "کفش آکسفورد کلاسیک با دوخت گودیر؛ قالب‌گیری دستی روی کالبد چوبی و زیره‌ی چرمی قابل تعویض.",
    colors: ["قهوه‌ای سوخته", "مشکی"],
    sizes: ["۴۰", "۴۱", "۴۲", "۴۳", "۴۴", "۴۵"],
    specs: [
      ["جنس رویه", "چرم گوساله تمام‌دانه"],
      ["زیره", "چرم طبیعی با پاشنه لاستیکی"],
      ["دوخت", "گودیر، قابل تعمیر"],
      ["قالب", "استاندارد، یک سایز معمول خود را انتخاب کنید"],
      ["ساخت", "دست‌ساز در کارگاه چرم‌شهر مشهد"],
    ],
    arrival: 4,
  },
  {
    id: "golbahar-wallet",
    code: "0461",
    sku: "S5441",
    name: "کیف پول گلبهار",
    category: "accessories",
    type: "accessory",
    collection: "women",
    price: 4_800_000,
    stock: 12,
    image: golbahar,
    sceneNote: "صحنه: روسری ابریشمی شیری، گلبرگ‌های گل محمدی و ظرف میناکاری اصفهان.",
    description:
      "کیف پول بلند با نقش برجسته‌ی گل و بوته؛ قلم‌زنی دستی روی چرم و دکمه‌ی فشاری برنجی.",
    colors: ["عسلی", "شتری"],
    specs: [
      ["جنس", "چرم گاوی دباغی گیاهی"],
      ["جای کارت", "۱۲ جای کارت و ۲ جیب اسکناس"],
      ["ابعاد", "۱۹ × ۱۰ سانتی‌متر"],
      ["نقش", "قلم‌زنی دستی گل و بوته"],
      ["ساخت", "دست‌دوز در کارگاه چرم‌شهر مشهد"],
    ],
    arrival: 7,
  },
  {
    id: "kalat-briefcase",
    code: "0519",
    sku: "S5452",
    name: "کیف اداری کلات",
    category: "bags",
    type: "hand",
    collection: "men",
    price: 24_500_000,
    stock: 3,
    image: kalat,
    sceneNote: "صحنه: میز گردوی منبت‌کاری، دیوان حافظ و دوات برنجی.",
    description:
      "کیف اداری با دو سگک و قفل برنجی؛ جای لپ‌تاپ ۱۵ اینچ و پوشه‌بندی داخلی برای اسناد.",
    colors: ["قهوه‌ای تلخ", "مشکی"],
    specs: [
      ["جنس رویه", "چرم گاوی تمام‌دانه"],
      ["آستر", "جیر طبیعی"],
      ["یراق‌آلات", "برنج با قفل کلیددار"],
      ["ابعاد", "۴۰ × ۳۰ × ۱۱ سانتی‌متر"],
      ["ساخت", "دست‌دوز در کارگاه چرم‌شهر مشهد"],
    ],
    arrival: 3,
  },
  {
    id: "sabzevar-jacket",
    code: "0624",
    sku: "S5418",
    name: "کاپشن چرمی سبزوار",
    category: "jackets",
    type: "jacket",
    collection: "men",
    price: 35_998_000,
    stock: 5,
    image: sabzevar,
    sceneNote: "صحنه: طاق آجری کاروانسرا، نور طلایی عصر.",
    description:
      "کاپشن مردانه با یقه‌ی برگردان و زیپ برنجی؛ چرم بره‌ی نرم که با گذر زمان رنگی گرم‌تر می‌گیرد.",
    colors: ["قهوه‌ای سوخته", "مشکی"],
    sizes: ["M", "L", "XL", "XXL"],
    specs: [
      ["جنس رویه", "چرم بره، دباغی روغنی"],
      ["آستر", "ویسکوز ابریشمی"],
      ["زیپ", "برنجی"],
      ["قالب", "کلاسیک، کمی آزاد"],
      ["ساخت", "دوخت در کارگاه چرم‌شهر مشهد"],
    ],
    arrival: 1,
  },
  {
    id: "shandiz-jacket",
    code: "0681",
    sku: "S5467",
    name: "کت چرمی بانوان شاندیز",
    category: "jackets",
    type: "jacket",
    collection: "women",
    price: 32_400_000,
    stock: 4,
    image: shandiz,
    sceneNote: "صحنه: نیمکت منبت در کوشک باغ ایرانی، فرش دستباف زیر پا.",
    description:
      "کت بلند چرمی با برش پوشیده و دکمه‌های چرمی؛ وقار پاییز خراسان در قامتی آراسته.",
    colors: ["کنیاکی", "قهوه‌ای تلخ"],
    sizes: ["S", "M", "L", "XL"],
    specs: [
      ["جنس رویه", "چرم بره نرم"],
      ["آستر", "ویسکوز ابریشمی"],
      ["بلندی", "تا زیر باسن"],
      ["قالب", "پوشیده و راسته"],
      ["ساخت", "دوخت در کارگاه چرم‌شهر مشهد"],
    ],
    arrival: 0,
  },
  {
    id: "torghabeh-shoulder",
    code: "0703",
    sku: "S5472",
    name: "کیف دوشی طرقبه",
    category: "bags",
    type: "shoulder",
    collection: "women",
    price: 14_200_000,
    stock: 7,
    image: torghabeh,
    sceneNote: "صحنه: چهارپایه‌ی چوبی روستایی، کاسه‌ی مسی پر از انار.",
    description:
      "کیف دوشی زین‌شکل به رنگ اناری با سگک برنجی؛ الهام‌گرفته از باغ‌های انار طرقبه.",
    colors: ["اناری", "عسلی"],
    specs: [
      ["جنس رویه", "چرم گاوی نرم"],
      ["آستر", "جیر طبیعی"],
      ["بند", "قابل تنظیم"],
      ["ابعاد", "۲۵ × ۲۱ × ۹ سانتی‌متر"],
      ["ساخت", "دست‌دوز در کارگاه چرم‌شهر مشهد"],
    ],
    arrival: 6,
  },
  {
    id: "abrisham-shoes",
    code: "0758",
    sku: "S5480",
    name: "کفش بانوان ابریشم",
    category: "shoes",
    type: "shoe",
    collection: "women",
    price: 11_800_000,
    stock: 8,
    image: abrisham,
    sceneNote: "صحنه: پله‌های تراورتن حیاط، روسری ابریشمی و آبنمای سنگی.",
    description:
      "کفش پاشنه‌کوتاه با چرم ناپا و تزئین برنجی؛ راحت برای ساعت‌ها ایستادن و خرامیدن.",
    colors: ["شتری", "مشکی"],
    sizes: ["۳۶", "۳۷", "۳۸", "۳۹", "۴۰"],
    specs: [
      ["جنس رویه", "چرم ناپای گوساله"],
      ["زیره", "چرم طبیعی"],
      ["پاشنه", "۴ سانتی‌متر"],
      ["قالب", "استاندارد"],
      ["ساخت", "دست‌ساز در کارگاه چرم‌شهر مشهد"],
    ],
    arrival: 8,
  },
  {
    id: "kashafrood-belt",
    code: "0812",
    sku: "S5491",
    name: "کمربند مردانه کشف‌رود",
    category: "accessories",
    type: "accessory",
    collection: "men",
    price: 3_900_000,
    stock: 15,
    image: kashafrood,
    sceneNote: "صحنه: سینی گردوی منبت روی فرش، ساعت جیبی قدیمی.",
    description:
      "کمربند چرم تمام‌دانه با سگک فلزی دودی؛ لبه‌های رنگ‌خورده و دوخت دوطرفه.",
    colors: ["قهوه‌ای تلخ", "مشکی"],
    sizes: ["۹۰", "۹۵", "۱۰۰", "۱۰۵", "۱۱۰"],
    specs: [
      ["جنس", "چرم گاوی تمام‌دانه"],
      ["عرض", "۳٫۵ سانتی‌متر"],
      ["سگک", "فلز دودی، ضدزنگ"],
      ["اندازه", "دور کمر به سانتی‌متر"],
      ["ساخت", "دست‌دوز در کارگاه چرم‌شهر مشهد"],
    ],
    arrival: 10,
  },
  {
    id: "sarakhs-messenger",
    code: "0865",
    sku: "S5503",
    name: "کیف دوشی مردانه سرخس",
    category: "bags",
    type: "shoulder",
    collection: "men",
    price: 16_700_000,
    stock: 2,
    image: sarakhs,
    sceneNote: "صحنه: راسته‌ی طاق‌دار بازار سنتی، نور زمستانی.",
    description:
      "کیف دوشی رودوشی با چرم روغنی که با گذر زمان پتینه‌ای زیبا می‌گیرد؛ جای تبلت و دفتر.",
    colors: ["کنیاکی"],
    specs: [
      ["جنس رویه", "چرم روغنی گاوی"],
      ["آستر", "کتان ضخیم"],
      ["بند", "قابل تنظیم، پهن"],
      ["ابعاد", "۳۴ × ۲۶ × ۱۰ سانتی‌متر"],
      ["ساخت", "دست‌دوز در کارگاه چرم‌شهر مشهد"],
    ],
    arrival: 9,
  },
  {
    id: "binalood-cardholder",
    code: "0920",
    sku: "S5517",
    name: "جاکارتی و دسته‌چکی بینالود",
    category: "accessories",
    type: "accessory",
    collection: "men",
    price: 2_600_000,
    stock: 20,
    image: binalood,
    sceneNote: "صحنه: تخته‌سنگ تراورتن، فیروزه‌ی نیشابور و قاشق برنجی.",
    description:
      "ست جاکارتی و جلد دسته‌چک با دوخت لبه‌ی ظریف؛ هدیه‌ای ماندگار در جعبه‌ی چرمی.",
    colors: ["قهوه‌ای تلخ", "مشکی"],
    specs: [
      ["جنس", "چرم گاوی نرم"],
      ["جای کارت", "۶ جای کارت"],
      ["بسته‌بندی", "جعبه‌ی هدیه با شناسنامه اصالت"],
      ["ابعاد جاکارتی", "۱۰ × ۷ سانتی‌متر"],
      ["ساخت", "دست‌دوز در کارگاه چرم‌شهر مشهد"],
    ],
    arrival: 11,
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export type CatalogQuery = {
  cat: string;
  type: string;
  gender: string;
  price: string;
  sort: string;
  q: string;
};

export const PAGE_SIZE = 8;

function normalizeSearch(s: string) {
  return s
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, " ")
    .trim()
    .toLowerCase();
}

export function matchesSearch(p: Product, q: string): boolean {
  const needle = normalizeSearch(q);
  if (!needle) return true;
  const hay = normalizeSearch(
    [p.name, p.code, p.sku, TYPE_LABELS[p.type], COLLECTION_LABELS[p.collection], ...p.colors].join(
      " ",
    ),
  );
  return needle.split(/\s+/).every((w) => hay.includes(w));
}

export function filterProducts(products: Product[], query: Partial<CatalogQuery>): Product[] {
  const range = PRICE_RANGES.find((r) => r.id === query.price);
  let list = products.filter((p) => {
    if (query.cat && query.cat !== "all" && p.category !== query.cat) return false;
    if (query.type && p.type !== query.type) return false;
    if (query.gender && p.collection !== query.gender) return false;
    if (range) {
      if (p.price < range.min) return false;
      if (range.max && p.price >= range.max) return false;
    }
    if (query.q && !matchesSearch(p, query.q)) return false;
    return true;
  });
  switch (query.sort) {
    case "price-asc":
      list = [...list].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list = [...list].sort((a, b) => b.price - a.price);
      break;
    case "new":
      list = [...list].sort((a, b) => a.arrival - b.arrival);
      break;
  }
  return list;
}

export function paginate<T>(items: T[], page: number, size = PAGE_SIZE) {
  const pageCount = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(Math.max(1, page), pageCount);
  return {
    page: current,
    pageCount,
    items: items.slice((current - 1) * size, current * size),
  };
}
