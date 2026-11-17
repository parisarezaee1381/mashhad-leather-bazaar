# Mashhad Leather Bazaar

این طراحی را به یک فروشگاه زنده و واکنش‌گرا تبدیل کن و صفحه‌های اصلی فروشگاه را پیاده‌سازی کن.
Write Persian, Use Persian models and do not use modern poses - It should keep the cultural feeling. But the design is really perfect I like it.

### Locked
- **Visual Direction:** Editorial Atelier, high-end Iranian luxury leather boutique aesthetic blending durability with refined craftsmanship.
- **Color Palette & Foundations:**
  - Page Ground: Warm creamy beige (`#F7F3EB` / `#F5F0E6`).
  - Card Surface: Soft cream (`#FAF7F0`), lighter than page background.
  - Primary Action / Buttons: Muted Silk Road Blue (`#4A6B8A`, hover `#3D5973`) with white text.
  - Metallic Hairline Accents: Subtle Gold (`#D4AF37`) for women's collection cards, active tab lines, and section dividers. Subtle Gunmetal/Silver (`#B0B0B0`) for men's/executive collection. Metallic colors applied ONLY to 1px borders, active hover states, and micro-icons.
- **Typography & Direction:**
  - Full RTL layout (`dir="rtl"`).
  - Persian typography (Vazirmatn / Yekan Bakh with elegant serif headings).
  - All pricing, codes, and numerical details rendered with Persian numerals in Tomans (تومان) (e.g., ۳۵,۹۹۸,۰۰۰ تومان, کد S۵۴۱۸).
- **Imagery & Cultural Art Direction:**
  - Photography featuring Iranian models in graceful, poised, and dignified cultural postures (modest styling, graceful scarf draping, seated or poised stances). Avoid fast-fashion or avant-garde poses.
  - Cultural staging: Sunlit Persian courtyards, brick arches, antique Persian rugs, raw travertine, and traditional artisanal workshop environments.
- **Designed Screen:**
  - Product Listing Page (PLP) (`mashhad-plp-editorial`) at desktop 1280×832. Clean 4-column gallery grid (responsive to 2 columns on mobile, 3 on tablet), 32px internal card padding, subtle text filter bar with thin underlines on hover, rectangular Silk Road blue Add to Cart buttons, and jewelry divider (`<hr />`) with central diamond motif.
- **Header & Navigation:**
  - Sticky minimalist header with generous cream space, centered calligraphic/refined brand identity ('چـرم مـشـهـد • Est. 1997'), shopping bag with badge, wishlist, and search.

### Open
- **Store Architecture & Core Pages:**
  - Homepage (`/`): Editorial hero banner with heritage tagline ('قدرت چرم، ظرافت هنر • اصالت از سال ۱۳۷۶'), curated collections (کلکسیون بانوان، مجموعه آقایان), craftsmanship pillars (دباغی طبیعی، یراق‌آلات سفارشی، دست‌دوز در مشهد), and footer with brand locations (دفتر تهران جردن، کارخانجات شهرک صنعتی چرم‌شهر مشهد).
  - Product Listing Page (`/catalog` / `/category/:id`): Dynamic filtering by category (کیف دوشی، کیف دستی، کفش، کاپشن، اکسسوری), sorting, price filtering, and pagination.
  - Product Detail Page (`/product/:id`): High-res styled photo gallery with prop context notes, authenticity code, specifications, leather care guide, and add-to-bag interaction.
  - Cart Drawer & Checkout Flow (`/cart`): Slide-over bag showing items, subtotal with Persian numerals, free delivery banner, and mock checkout steps.
  - Heritage & Atelier Page (`/atelier` or `/about`): Rich story of Mashhad Leather founded in 1997, workshop provenance, and physical store locator.
- Responsive mobile drawer navigation, live cart state, wishlist persistence, and toast feedback on user actions.

build a real working app, not a clickable prototype; the screen and kit files show layout, content and look (a wireframe's, structure only) and are never code to copy. The screens are the moments the user designed, not the whole product. Before building, walk through each flow as its user would and design what the pictures leave out, as a product designer would for this product: the steps a flow needs to finish and how the app responds to what the user does, including the moments its users will actually run into, like waiting on something or finding nothing yet. Add nothing a user of this product would never meet, and keep an app the user wants simple, simple. Never leave a step the product's core flows need as "coming soon", unless the brief says the user chose to. Where such a step needs an outside service, build every part up to it and say in your reply what's left to connect. Fill product gaps only, never a look the design set: an added step reuses the UI kit's tokens, chrome and parts and the nearest designed screen's layout, with no new visual direction. Look at every screen's picture before writing code; design.md says which picture or sheet holds each screen. Open the UI kit's shells and parts HTML for the header, tab bar, composer and components, not only its tokens. Use each finished screen's copy exactly as design.md lists it; never invent copy for one. A wireframe under design.md's Wireframes gives structure only: build it in the design's look, as design.md says. The screens' photos are placeholders for the mockups only: replace every photo design.md lists with the user's own upload for it, else as design.md says (a photo without people re-composed with imagegen--edit_image from it as a reference, a photo of people generated from its brief and never from the photo), and ship no set photo or its URL. For a design that came with no design.md, every photo on assets.lovable.dev or images.unsplash.com is a set photo: replace it with the user's own upload for it, else a new image generated for its slot, any person in it one who doesn't exist, never from the photo or a picture showing it. Build and check each screen at the canvas it was drawn at: phone 393×764, tablet landscape 1133×744, tablet portrait 744×1133, desktop 1280×832. After building, screenshot the app at those sizes and states, compare each finished screen with its picture, and fix every visual difference you didn't choose; check a wireframe's screen against its structure, never its grey look. End your reply with "Changed from the mockups": each deliberate change and why, and "Added beyond the mockups": each step, state or interaction you built that no screen shows.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mashhad-leather-bazaar.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ee247179-3e78-4ec6-b1ec-34ca182bcf06).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
