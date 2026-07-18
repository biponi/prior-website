# UI Changes Log - Prior Website (Luxury Online Mart)

> **Last Updated:** July 2025
> **Scope:** UI/UX redesign, new pages, component improvements

---

## Table of Contents

1. [Pages Redesigned](#pages-redesigned)
2. [New Pages Created](#new-pages-created)
3. [Component Improvements](#component-improvements)
4. [Bug Fixes](#bug-fixes)

---

## Pages Redesigned

### About Us (`src/app/about/page.tsx`)
- Hero section with gradient and dot pattern
- Story section, offerings grid, values, mission banner
- JSON-LD structured data, Open Graph, canonical URL

### Terms & Conditions (`src/app/terms-conditions/page.tsx`)
- Bengali/English tab switcher via Radix Tabs
- Section cards with icons

### Privacy Policy (`src/app/privacy-policy/page.tsx`)
- English only (no Bengali tabs)
- Updated branding from "Prior" to "Luxury Online Mart"
- Contact footer grid

### Return & Refund Policy (`src/app/return-policy/page.tsx`)
- Bengali/English tab switcher
- 3 sections: Return, Exchange, Refund
- Exchange grid layout

### Contact Us (`src/app/contact-us/page.tsx`)
- 5-column grid layout with WhatsApp card
- Business hours sidebar, social media, Google Maps embed
- Correct data from brandConfig

### Collection Detail Page (`src/app/collections/[collectionId]/page.tsx`)
- Redesigned loading state (pink spinner)
- Improved empty state with icon and CTAs

---

## New Pages Created

### Shipping Info (`src/app/shipping/page.tsx`)
- Delivery zones cards
- Features grid, FAQ section, contact CTA

### FAQ (`src/app/faq/page.tsx` + `FAQContent.tsx`)
- 33 questions across 7 categories
- Sticky category navigation, animated accordions
- Server component for SEO metadata

### Returns & Exchange (`src/app/returns/page.tsx` + `ReturnsContent.tsx`)
- 3-step return process
- Return conditions (green/amber), exchange options, refund timeline

### Payment Methods (`src/app/payments/page.tsx` + `PaymentContent.tsx`)
- COD + bKash cards (Nagad disabled in config)
- How-it-works steps, security features, outside Dhaka notice

---

## Component Improvements

### EnhancedVariantSelector (`src/app/collections/[collectionId]/EnhancedVariantSelector.tsx`)
- Color variants: text-only rounded-xl badges with pink highlight on select
- Size variants: solid pink pill badges with shadow on select
- Out-of-stock: grayed with X icon
- Removed `COLOR_MAP` and hue dot rendering

### ProductDetailSection (`src/components/new-ui/ProductDetailSection.tsx`)
- Main image: `rounded-xl` with `shadow-lg shadow-black/10` (no border)
- Thumbnails: `rounded-xl` instead of `rounded-sm`
- Category badge: Redesigned to solid pink pill (`bg-[#CD2A75]`, `rounded-full`, pink shadow)
- All buttons (Buy Now, Add to Cart, quantity +/-): `rounded-xl`
- Mobile scroll restoration: Changed from `overflow:hidden` to `position:fixed` + scrollY save/restore pattern in GalleryModal

### QuickAddSheet (`src/components/new-ui/QuickAddSheet.tsx`)
- All buttons changed from `rounded-none` to `rounded-xl` (Buy Now, Add to Cart, quantity +/-)

---

## Bug Fixes

### Mobile Scroll Restoration
- **File:** `src/components/new-ui/ProductDetailSection.tsx` (GalleryModal)
- **Issue:** `overflow:hidden` on body broke scroll position on back navigation
- **Fix:** Changed to `position:fixed` + scrollY save/restore pattern

### Nagad Payment Option
- **File:** `src/config/brand.ts`
- **Fix:** Set Nagad to `enabled: false` (only COD + bKash active)

---

## Design System Notes

- **Primary color:** `#CD2A75` (babybloom-pink)
- **Consistent patterns:** Gradient hero sections, dot pattern backgrounds, wave SVG dividers, section cards with icons, pink accent colors
- **Bengali translations:** Via Radix Tabs (English/বাংলা toggle) on Terms, Return Policy pages
- **Brand config single source:** `src/config/brand.ts` — contact, social, SEO, assets
