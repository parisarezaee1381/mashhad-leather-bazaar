import { Link } from "@tanstack/react-router";
import { JewelDivider } from "./jewel-divider";

export const LOCATIONS = [
  {
    id: "tehran",
    title: "دفتر و نمایشگاه تهران",
    area: "خیابان جردن",
    address: "تهران، خیابان آفریقا (جردن)، بالاتر از میدان محسنی، پلاک ۱۴۲",
    hours: "شنبه تا پنجشنبه، ۱۰ تا ۲۰",
    phone: "۰۲۱-۲۲۰۱۱۳۷۶",
    mapQuery: "Africa Blvd Jordan Tehran",
  },
  {
    id: "mashhad",
    title: "کارخانجات و آتلیه مشهد",
    area: "شهرک صنعتی چرم‌شهر",
    address: "مشهد، کیلومتر ۱۵ جاده قوچان، شهرک صنعتی چرم‌شهر، بلوار صنعت، قطعه ۳۷",
    hours: "شنبه تا چهارشنبه، ۸ تا ۱۶ — بازدید با هماهنگی",
    phone: "۰۵۱-۳۶۵۱۱۳۷۶",
    mapQuery: "Charm Shahr Industrial Park Mashhad",
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto px-4 pb-10 pt-16 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <JewelDivider />

        <div className="mt-12 grid gap-10 text-[13px] text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-[26px] leading-none text-foreground">چرم مشهد</p>
            <p className="mt-4 leading-7">
              قدرت چرم، ظرافت هنر. از سال ۱۳۷۶ در کارگاه‌های خراسان، چرم را با دستِ استادکار به کالایی
              ماندگار بدل می‌کنیم.
            </p>
          </div>
          <nav aria-label="فروشگاه">
            <p className="mb-4 text-[12px] tracking-[0.15em] text-gold">فروشگاه</p>
            <ul className="space-y-3">
              <li>
                <Link to="/catalog" className="hover:text-foreground">همه محصولات</Link>
              </li>
              <li>
                <Link to="/catalog" search={{ gender: "women" }} className="hover:text-foreground">
                  کلکسیون بانوان
                </Link>
              </li>
              <li>
                <Link to="/catalog" search={{ gender: "men" }} className="hover:text-foreground">
                  مجموعه آقایان
                </Link>
              </li>
              <li>
                <Link to="/atelier" className="hover:text-foreground">آتلیه و میراث</Link>
              </li>
            </ul>
          </nav>
          {LOCATIONS.map((loc) => (
            <div key={loc.id}>
              <p className="mb-4 text-[12px] tracking-[0.15em] text-gold">{loc.title}</p>
              <p className="leading-7">{loc.address}</p>
              <p className="mt-2" dir="ltr" style={{ textAlign: "right" }}>
                {loc.phone}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-[13px] text-muted-foreground">
          <span className="font-display text-[18px] text-foreground">تأسیس ۱۳۷۶</span> — شهرک صنعتی
          چرم‌شهر
        </p>
      </div>
    </footer>
  );
}
