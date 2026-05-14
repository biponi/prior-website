# Baby Bloom — Design System A

**Baby Product E-Commerce Platform | Bangladesh**
Version 1.0 · 2025 · Built on Luxury E-Commerce Design Foundation

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Color System](#2-color-system)
3. [Typography System](#3-typography-system)
4. [Spacing & Layout](#4-spacing--layout)
5. [Component Design Specs](#5-component-design-specs)
6. [Visual Effects](#6-visual-effects)
7. [BD-Specific Design Patterns](#7-bd-specific-design-patterns)
8. [Implementation Checklist](#8-implementation-checklist)
9. [Quick Reference](#9-quick-reference)

---

## 1. System Overview

Baby Bloom is a warm, bold design system tailored for baby product e-commerce targeting Bangladeshi customers. It is derived directly from the Luxury E-Commerce Design Foundation, inheriting its color tokens, typography scale, and component patterns — then adapted for mobile-first BD shoppers familiar with platforms like Daraz and Chaldal.

### Design Philosophy

| Principle              | Description                                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Bold Pink Identity** | Primary color `#CD2A75` dominates all CTAs, borders, badges, and brand elements — instantly recognizable and warm |
| **BD-Familiar Layout** | Standard top-bar, search bar, category pills, 2-column product grid — mirrors what BD shoppers expect             |
| **Trust First**        | Discount badges, star ratings, Bengali CTA text, and a 4-icon trust bar build immediate credibility               |
| **Mobile First**       | Designed for 390px viewport. All components prioritize touch targets, readable sizes, and thumb-friendly buttons  |
| **Baby-Safe Warmth**   | Pink backgrounds (`#FFF0F6`), soft card backgrounds (`#FDF5F8`), and warm orange stars create a nurturing feel    |

---

## 2. Color System

All colors are inherited from the parent Luxury E-Commerce system. Baby Bloom uses the primary pink as its dominant brand color.

### 2.1 Primary Brand Colors

| Swatch | Name              | Hex       | Usage                                                                                                            |
| ------ | ----------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| 🟥     | Theme Primary     | `#CD2A75` | All primary CTAs, nav top-bar, section title borders, discount badges, price text, wishlist icons, search button |
| ⬛     | Dark / Foreground | `#191C1F` | Primary text, product names, category bar text                                                                   |
| ⬜     | Page Background   | `#F8F8F8` | Main page background, category bar background                                                                    |
| ⬜     | Card Background   | `#FFFFFF` | All product cards, logo bar, search bar fill                                                                     |
| 🟪     | Pink Tint         | `#FFF0F6` | Card image backgrounds, offer strip background, hover tint                                                       |

### 2.2 Status & Semantic Colors

| Name           | Hex       | Usage                                                   |
| -------------- | --------- | ------------------------------------------------------- |
| Success Green  | `#30AD2E` | Certified labels, in-stock indicators, success messages |
| Warning Orange | `#FF7E05` | Star ratings, flash sale icons, discount highlights     |
| Alert Red      | `#EE5858` | Out of stock, error messages, danger states             |
| Info Yellow    | `#FFD34D` | Notifications, info banners                             |

### 2.3 Neutral Colors

| Token          | Hex                        | Usage                                        |
| -------------- | -------------------------- | -------------------------------------------- |
| Primary Text   | `#191C1F`                  | Product names, headings, body copy           |
| Secondary Text | `#949494`                  | Descriptions, secondary info                 |
| Muted Text     | `#737373`                  | Placeholders, metadata                       |
| Neutral 400    | `#A3A3A3`                  | Strikethrough prices, inactive stars         |
| Border Default | `#E3E3E3`                  | Card borders, dividers, section lines        |
| Border Light   | `#F4F4F5`                  | Light card borders, hover borders (zinc-100) |
| Pink Border    | `rgba(205, 42, 117, 0.14)` | Logo bar, search bar, category bar borders   |

### 2.4 CSS Custom Properties

Colors are defined as RGB triplets to support opacity modifiers:

```css
:root {
  --theme-primary: 205 42 117; /* #CD2A75 */
  --theme-secondary: 205 42 117; /* #CD2A75 */
  --theme-green: 48 173 46; /* #30AD2E */
  --theme-orange: 255 126 5; /* #FF7E05 */
  --theme-alert: 238 88 88; /* #EE5858 */
  --theme-yellow: 255 211 77; /* #FFD34D */
  --foreground: 25 28 31; /* #191C1F */
  --background: 248 248 248; /* #F8F8F8 */
  --card: 255 255 255; /* #FFFFFF */
  --border: 227 227 227; /* #E3E3E3 */
}
```

**Usage with opacity:**

```css
/* Full opacity */
background: rgb(var(--theme-primary));

/* 14% opacity — for borders */
border-color: rgb(var(--theme-primary) / 0.14);

/* 80% opacity — for overlays */
background: rgb(var(--theme-primary) / 0.8);
```

---

## 3. Typography System

Baby Bloom inherits the Inter + Public Sans font stack from the parent system.

### 3.1 Font Families

```css
/* UI elements, labels, buttons, prices */
font-family: "Inter", sans-serif;

/* Product names, card content, data displays */
font-family: "Public Sans", sans-serif;
```

**Google Fonts import:**

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Public+Sans:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### 3.2 Type Scale

| Element                | Mobile           | Desktop        | Font        | Notes                              |
| ---------------------- | ---------------- | -------------- | ----------- | ---------------------------------- |
| Top bar text           | 11px             | 11px           | Inter       | Hotline, authenticity label        |
| Brand logo             | 14px Bold        | 18px Bold      | Inter       | Brand name in logo bar             |
| Category pills         | 11px Medium      | 11px Medium    | Inter       | Pill labels                        |
| Search placeholder     | 12px             | 12px           | Inter       | Input placeholder                  |
| Section title (ARM-H2) | 12px Bold Caps   | 14px Bold Caps | Inter       | Flash Sale, Featured Products      |
| Product name           | 11.5px Regular   | 12px Regular   | Public Sans | 2 lines max (`line-clamp-2`)       |
| Price (new)            | 14px Bold        | 16px Bold      | Inter       | Current/discounted price           |
| Price (old)            | 11px Regular     | 12px Regular   | Inter       | Strikethrough original price       |
| Star rating            | 10px             | 10px           | Inter       | Stars + review count               |
| Add to cart button     | 10.5px Bold Caps | 11px Bold Caps | Inter       | Primary CTA                        |
| Trust bar text         | 10px Medium      | 10px Medium    | Inter       | Delivery, Return, Payment, Support |
| Discount badge         | 9px Bold Caps    | 9px Bold Caps  | Inter       | `-30%`, `-20%` overlay             |

### 3.3 Font Weight Scale

| Weight       | Class           | Usage                               |
| ------------ | --------------- | ----------------------------------- |
| 400 Regular  | `font-normal`   | Product names, body copy, nav links |
| 500 Medium   | `font-medium`   | Category pills, trust bar text      |
| 600 Semibold | `font-semibold` | Brand logo, badge labels            |
| 700 Bold     | `font-bold`     | Prices, button text, section titles |

### 3.4 Tailwind Typography Classes

```tsx
// Section label (ARM-H2)
className =
  "text-[12px] sm:text-[14px] font-bold uppercase tracking-[0.06em] text-[#191C1F]";

// Product name
className =
  "font-public-sans text-[11.5px] text-[#191C1F] line-clamp-2 leading-[1.4]";

// New price
className = "text-[14px] font-bold text-[#CD2A75]";

// Old price
className = "text-[11px] font-normal text-[#A3A3A3] line-through";

// Add to cart button
className = "text-[10.5px] font-bold uppercase tracking-[0.04em] text-white";

// Trust bar label
className = "text-[10px] font-medium text-[#525252]";
```

---

## 4. Spacing & Layout

### 4.1 Base Spacing Scale

| Token           | Value | Usage                                        |
| --------------- | ----- | -------------------------------------------- |
| `gap-1` / `p-1` | 4px   | Tiny — badge internal spacing                |
| `gap-2` / `p-2` | 8px   | Icon gaps, star rating gaps                  |
| `gap-3` / `p-3` | 12px  | Card internal padding (mobile)               |
| `gap-4` / `p-4` | 16px  | Search bar padding, section gaps             |
| `gap-5` / `p-5` | 20px  | Card internal padding (desktop)              |
| `gap-6` / `p-6` | 24px  | Logo bar vertical padding                    |
| `px-[15px]`     | 15px  | Responsive container base horizontal padding |

### 4.2 Responsive Container

```html
<div class="px-[15px] sm:px-5 lg:px-6 xl:px-7 2xl:px-8">
  <!-- Content -->
</div>
```

| Breakpoint       | Min Width | Padding |
| ---------------- | --------- | ------- |
| Mobile (default) | < 640px   | 15px    |
| SM               | 640px     | 20px    |
| LG               | 1024px    | 24px    |
| XL               | 1280px    | 28px    |
| 2XL              | 1536px    | 32px    |

### 4.3 Grid System

```html
<!-- Product grid -->
<div
  class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[15px]"
>
  <!-- Products -->
</div>
```

| Breakpoint      | Columns   | Gap                                |
| --------------- | --------- | ---------------------------------- |
| Mobile < 768px  | 2 columns | 1px (grid line via `bg-[#E3E3E3]`) |
| Tablet 768px+   | 3 columns | 15px                               |
| Desktop 1024px+ | 4 columns | 15px                               |
| XL 1280px+      | 5 columns | 15px                               |

### 4.4 Breakpoints

```javascript
// tailwind.config.js
screens: {
  xxs: '400px',   // Small Android phones
  xs:  '490px',   // Standard phones
  sm:  '640px',   // Large phones / small tablets
  md:  '768px',   // Tablets
  lg:  '1024px',  // Desktop
  xl:  '1280px',  // Large desktop
  '2xl': '1536px',
  '3xl': '1850px',
}
```

### 4.5 Section Spacing Pattern

```html
<section class="space-y-3 sm:space-y-6 lg:space-y-12">
  <!-- 12px → 24px → 48px vertical rhythm -->
</section>
```

---

## 5. Component Design Specs

### 5.1 Header Structure

The header is split into 3 stacked bars, each separated by `1px border rgba(205,42,117,0.14)`.

```html
<!-- Top Bar -->
<div class="h-9 bg-[#CD2A75] px-[14px] flex items-center justify-between">
  <span class="text-white font-bold text-[14px]">🍼 Baby Bloom</span>
  <span class="text-[#FFD6EB] text-[11px] font-medium"
    >✓ 100% Authentic Products</span
  >
</div>

<!-- Logo Bar -->
<div
  class="bg-white py-[10px] px-[14px] flex items-center justify-between border-b border-[rgba(205,42,117,0.14)]"
>
  <span class="text-[#CD2A75] font-bold text-[18px]"
    >Baby<span class="text-[#191C1F] font-normal">Bloom</span></span
  >
  <div class="flex gap-[14px] items-center">
    <!-- Wishlist, Cart, Account icons -->
  </div>
</div>

<!-- Search Bar -->
<div
  class="bg-[#F8F8F8] py-[8px] px-[12px] flex gap-[6px] border-b border-[rgba(205,42,117,0.14)]"
>
  <input
    class="flex-1 h-[34px] border-[1.5px] border-[rgba(205,42,117,0.3)] rounded-[4px] px-[12px] text-[12px]"
    placeholder="Search baby products..."
  />
  <button
    class="h-[34px] bg-[#CD2A75] text-white text-[12px] font-bold px-[14px] rounded-[4px]"
  >
    Search
  </button>
</div>
```

#### Cart/Wishlist Badge Spec

| Property   | Value                    |
| ---------- | ------------------------ |
| Badge size | `h-4 w-4` (16×16px)      |
| Position   | `top: -4px, right: -5px` |
| Background | `#CD2A75`                |
| Text       | `9px Bold White`         |
| Shape      | `rounded-full`           |

```html
<div class="relative">
  <span>🛒</span>
  <span
    class="absolute -top-1 -right-1 h-4 w-4 bg-[#CD2A75] text-white text-[9px] rounded-full flex items-center justify-center font-bold"
    >4</span
  >
</div>
```

### 5.2 Category Pills

```html
<!-- Category bar -->
<div
  class="bg-white py-[8px] px-[12px] flex gap-[6px] overflow-x-auto no-scrollbar border-b border-[rgba(205,42,117,0.1)]"
>
  <span
    class="bg-[#CD2A75] text-white border border-[#CD2A75] rounded-full text-[11px] font-medium px-[11px] py-[4px] whitespace-nowrap"
    >All</span
  >
  <span
    class="bg-white text-[#CD2A75] border border-[rgba(205,42,117,0.35)] rounded-full text-[11px] font-medium px-[11px] py-[4px] whitespace-nowrap"
    >Newborn</span
  >
  <span
    class="bg-white text-[#CD2A75] border border-[rgba(205,42,117,0.35)] rounded-full text-[11px] font-medium px-[11px] py-[4px] whitespace-nowrap"
    >Feeding</span
  >
</div>
```

| State   | Background | Border                  | Text Color |
| ------- | ---------- | ----------------------- | ---------- |
| Default | `#FFFFFF`  | `rgba(205,42,117,0.35)` | `#CD2A75`  |
| Active  | `#CD2A75`  | `#CD2A75`               | `#FFFFFF`  |
| Hover   | `#FFF0F6`  | `rgba(205,42,117,0.35)` | `#CD2A75`  |

### 5.3 Offer Strip Banner

```html
<div
  class="bg-gradient-to-r from-[#FFF0F6] to-[#FFE4F0] py-[8px] px-[14px] flex items-center justify-between border-b border-[rgba(205,42,117,0.12)]"
>
  <span class="text-[12px] text-[#8B1A4A] font-medium"
    >🎉 Special Offer — Up to 35% off this week!</span
  >
  <span
    class="bg-[#CD2A75] text-white text-[10px] font-bold px-[9px] py-[3px] rounded-[3px]"
    >35% OFF</span
  >
</div>
```

| Property      | Value                                      |
| ------------- | ------------------------------------------ |
| Background    | `linear-gradient(90deg, #FFF0F6, #FFE4F0)` |
| Text          | `12px Medium #8B1A4A`                      |
| Badge bg      | `#CD2A75`                                  |
| Badge text    | `10px Bold White rounded-[3px]`            |
| Border bottom | `1px rgba(205,42,117,0.12)`                |

### 5.4 Section Title

Inherited directly from the parent design system — 2px bottom border in brand pink.

```html
<div
  class="flex items-center justify-between pb-[8px] border-b-2 border-[#CD2A75] mb-[10px]"
>
  <div class="flex items-center gap-[6px]">
    <span class="text-[#CD2A75] text-[13px]">⚡</span>
    <h2
      class="text-[12px] sm:text-[14px] font-bold uppercase tracking-[0.06em] text-[#191C1F]"
    >
      Flash Sale
    </h2>
  </div>
  <a class="text-[11px] text-[#CD2A75] font-medium cursor-pointer"
    >View All →</a
  >
</div>
```

### 5.5 Product Card

The core UI unit. On mobile, a 1px grid line via `bg-[#E3E3E3]` on the grid container creates visual card separation.

```html
<!-- Grid container -->
<div class="grid grid-cols-2 gap-[1px] bg-[#E3E3E3]">
  <!-- Individual card -->
  <div
    class="bg-white p-[10px] relative hover:shadow-[0_4px_16px_rgba(205,42,117,0.12)] transition-shadow z-0 hover:z-10"
  >
    <!-- Image container -->
    <div
      class="relative h-[96px] bg-[#FDF5F8] rounded-[4px] flex items-center justify-center mb-[8px]"
    >
      <img
        src="product.jpg"
        alt="Product"
        class="object-contain h-full w-full"
      />

      <!-- Discount badge -->
      <span
        class="absolute top-[6px] left-[6px] bg-[#CD2A75] text-white text-[9px] font-bold uppercase px-[6px] py-[2px] rounded-[3px]"
      >
        -30%
      </span>

      <!-- Wishlist -->
      <span
        class="absolute top-[6px] right-[6px] text-[#CD2A75] text-[14px] cursor-pointer"
        >♡</span
      >
    </div>

    <!-- Product info -->
    <p
      class="font-public-sans text-[11.5px] text-[#191C1F] line-clamp-2 leading-[1.4] mb-[5px]"
    >
      Organic Cotton Teddy Bear Soft Toy
    </p>

    <!-- Prices -->
    <div class="flex items-baseline gap-[5px] mb-[4px]">
      <span class="text-[14px] font-bold text-[#CD2A75]">৳840</span>
      <span class="text-[11px] text-[#A3A3A3] line-through">৳1,200</span>
    </div>

    <!-- Stars -->
    <div class="text-[10px] text-[#FF7E05] mb-[7px]">★★★★★ (128)</div>

    <!-- CTA -->
    <button
      class="w-full h-[28px] bg-[#CD2A75] text-white text-[10.5px] font-bold uppercase tracking-[0.04em] rounded-[4px] border-0"
    >
      Cart এ যোগ করুন
    </button>
  </div>
</div>
```

#### Product Card Spec Summary

| Element         | Spec                                                                              |
| --------------- | --------------------------------------------------------------------------------- |
| Card background | `#FFFFFF`                                                                         |
| Card padding    | `p-[10px]`                                                                        |
| Card border     | None (grid gap = separator)                                                       |
| Hover shadow    | `0 4px 16px rgba(205,42,117,0.12)`                                                |
| Image container | `h-96px bg-[#FDF5F8] rounded-[4px]`                                               |
| Discount badge  | `top-[6px] left-[6px]` · `bg-[#CD2A75]` · `9px Bold White Caps` · `rounded-[3px]` |
| Wishlist icon   | `top-[6px] right-[6px]` · `#CD2A75` · `14px`                                      |
| Product name    | `11.5px Regular #191C1F line-clamp-2` · Public Sans                               |
| New price       | `14px Bold #CD2A75`                                                               |
| Old price       | `11px Regular #A3A3A3 line-through`                                               |
| Stars           | `10px #FF7E05`                                                                    |
| CTA button      | `w-full h-[28px] bg-[#CD2A75] rounded-[4px]` · `10.5px Bold Caps`                 |

### 5.6 Buttons

```html
<!-- Primary (main CTAs) -->
<button
  class="h-10 px-4 bg-[#CD2A75] hover:bg-[#CD2A75]/90 text-white text-[10.5px] font-bold uppercase tracking-[0.04em] rounded-[4px] transition-colors"
>
  Button Text
</button>

<!-- Dark (secondary) -->
<button
  class="h-10 px-4 bg-[#191C1F] hover:bg-[#191C1F]/90 text-white text-[11px] font-bold uppercase tracking-[0.04em] rounded-[4px] transition-colors"
>
  Button Text
</button>

<!-- Outline Pink -->
<button
  class="h-10 px-4 bg-white hover:bg-[#FFF0F6] text-[#CD2A75] text-[11px] font-semibold border border-[#CD2A75] rounded-[4px] transition-colors"
>
  Button Text
</button>

<!-- Success -->
<button
  class="h-10 px-4 bg-[#30AD2E] hover:bg-[#30AD2E]/90 text-white text-[11px] font-bold rounded-[4px] transition-colors"
>
  Confirm
</button>
```

#### Button Variant Reference

| Variant      | Background               | Text      | Usage                          |
| ------------ | ------------------------ | --------- | ------------------------------ |
| Primary      | `#CD2A75`                | White     | Add to Cart, Search, main CTAs |
| Dark         | `#191C1F`                | White     | System B navbar buttons        |
| Outline Pink | White + `border #CD2A75` | `#CD2A75` | Secondary actions              |
| Success      | `#30AD2E`                | White     | Confirm, place order           |
| Danger       | `#EE5858`                | White     | Remove, cancel                 |
| Light        | `#F4F4F5`                | `#191C1F` | Inactive filters               |

#### Button Size Scale

| Size       | Height            | Padding | Usage                           |
| ---------- | ----------------- | ------- | ------------------------------- |
| Small      | `h-8` (32px)      | `px-3`  | Compact UI, icon actions        |
| Medium     | `h-10` (40px)     | `px-4`  | Standard CTAs                   |
| Large      | `h-12` (48px)     | `px-6`  | Hero CTAs, primary page actions |
| Full Width | `h-[28px] w-full` | —       | Add to Cart in product card     |

### 5.7 Badges & Labels (Theme Label)

```css
.theme-label {
  font-size: 11px;
  padding: 2px 8px;
  font-weight: 600;
  border-radius: 3px;
  text-transform: uppercase;
  display: inline-block;
}
```

```html
<!-- Primary -->
<span class="theme-label bg-[#CD2A75] text-white">New</span>

<!-- Success -->
<span class="theme-label bg-[#30AD2E] text-white">In Stock</span>

<!-- Warning -->
<span class="theme-label bg-[#FF7E05] text-white">Flash Sale</span>

<!-- Danger -->
<span class="theme-label bg-[#EE5858] text-white">Out of Stock</span>

<!-- Light -->
<span class="theme-label bg-[#F4F4F5] text-[#525252]">Filter</span>
```

| Variant  | Background           | Text      | Usage                         |
| -------- | -------------------- | --------- | ----------------------------- |
| Primary  | `#CD2A75`            | White     | New arrivals, featured, sale  |
| Discount | `#CD2A75` · 9px Bold | White     | % discount on card image      |
| Success  | `#30AD2E`            | White     | In stock, certified, verified |
| Warning  | `#FF7E05`            | White     | Flash sale, limited stock     |
| Danger   | `#EE5858`            | White     | Out of stock, discontinued    |
| Light    | `#F4F4F5`            | `#525252` | Neutral filters               |

### 5.8 Trust Bar

Sits at the bottom of the header area. Must appear on every major page.

```html
<div
  class="flex justify-around py-[10px] px-[8px] bg-white border-t border-[rgba(205,42,117,0.1)]"
>
  <div class="text-center">
    <div class="text-[15px] mb-[2px]">🚚</div>
    <div class="text-[10px] font-medium text-[#525252]">Fast Delivery</div>
  </div>
  <div class="text-center">
    <div class="text-[15px] mb-[2px]">↩️</div>
    <div class="text-[10px] font-medium text-[#525252]">Easy Return</div>
  </div>
  <div class="text-center">
    <div class="text-[15px] mb-[2px]">🔒</div>
    <div class="text-[10px] font-medium text-[#525252]">Safe Payment</div>
  </div>
  <div class="text-center">
    <div class="text-[15px] mb-[2px]">☎️</div>
    <div class="text-[10px] font-medium text-[#525252]">24/7 Support</div>
  </div>
</div>
```

| Property   | Value                                        |
| ---------- | -------------------------------------------- |
| Container  | `bg-white` · `border-top 1px rgba(pink,0.1)` |
| Layout     | `flex justify-around`                        |
| Padding    | `py-[10px] px-[8px]`                         |
| Icon size  | 15px                                         |
| Label text | `10px Medium #525252`                        |
| Alignment  | `text-center` · icon above text              |

### 5.9 Form Inputs

```html
<!-- Text input -->
<input
  type="text"
  class="w-full h-8 sm:h-10 px-[15px] text-[13px] border border-[rgba(205,42,117,0.14)] rounded-[4px] focus:border-[#CD2A75] focus:ring-1 focus:ring-[#CD2A75] focus:outline-none placeholder:text-[#A3A3A3] transition-colors"
  placeholder="Enter text..."
/>

<!-- Select -->
<select
  class="w-full h-8 sm:h-10 px-[15px] text-[13px] border border-[rgba(205,42,117,0.14)] rounded-[4px] focus:border-[#CD2A75] focus:outline-none bg-white cursor-pointer"
>
  <option>Option</option>
</select>
```

| Property     | Mobile                      | Desktop       |
| ------------ | --------------------------- | ------------- |
| Height       | `h-8` (32px)                | `h-10` (40px) |
| Padding      | `px-[15px]`                 | `px-[15px]`   |
| Border       | `1px rgba(205,42,117,0.14)` | same          |
| Radius       | `rounded-[4px]`             | same          |
| Focus border | `#CD2A75` full opacity      | same          |
| Placeholder  | `#A3A3A3`                   | same          |

### 5.10 Modal

```html
<!-- Overlay -->
<div class="fixed inset-0 z-[2] bg-black/50 transition-opacity duration-300">
  <!-- Modal -->
  <div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-30px)] z-[5] bg-white rounded-[4px] shadow-xl max-h-[calc(100%-50px)] overflow-y-auto"
  >
    <!-- Header -->
    <div
      class="px-5 py-3 border-b border-[#E3E3E3] flex items-center justify-between"
    >
      <h3 class="text-[18px] font-semibold text-[#191C1F]">Modal Title</h3>
      <button class="text-[#737373] hover:text-[#191C1F]">✕</button>
    </div>

    <!-- Body -->
    <div class="px-5 py-3"><!-- Content --></div>

    <!-- Footer -->
    <div class="px-5 py-3 border-t border-[#E3E3E3] flex justify-end gap-2">
      <button>Cancel</button>
      <button>Confirm</button>
    </div>
  </div>
</div>
```

---

## 6. Visual Effects

### 6.1 Border Radius

| Token                       | Value | Usage                                            |
| --------------------------- | ----- | ------------------------------------------------ |
| `rounded-[3px]`             | 3px   | Badges, discount labels, theme-label             |
| `rounded` / `rounded-[4px]` | 4px   | Buttons, inputs, cards, modals, image containers |
| `rounded-lg`                | 8px   | Large buttons, desktop modals                    |
| `rounded-full`              | 50%   | Badge dots, radio buttons                        |
| `rounded-[20px]`            | 20px  | Category pills                                   |

### 6.2 Shadows

| Name        | CSS Value                          | Usage                             |
| ----------- | ---------------------------------- | --------------------------------- |
| Card Hover  | `0 4px 16px rgba(205,42,117,0.12)` | Product card on hover — pink glow |
| Dropdown    | `0 3px 10px rgba(0,0,0,0.1)`       | Nav dropdowns, floating elements  |
| `shadow-xl` | Tailwind default                   | Large modals, overlays            |

### 6.3 Transitions & Animations

| Type            | Duration        | Usage                                     |
| --------------- | --------------- | ----------------------------------------- |
| Color change    | `duration-150`  | Button hover bg/text                      |
| Opacity + Scale | `duration-300`  | Modal open/close (`scale-95 → scale-100`) |
| Shadow          | `duration-200`  | Card hover shadow                         |
| Skeleton        | `animate-pulse` | Loading state                             |

```html
<!-- Modal animation classes -->
<!-- Closed: -->
scale-95 opacity-0 invisible
<!-- Open:   -->
scale-100 opacity-100 visible transition-all duration-300
```

### 6.4 Z-Index Scale

| Z-Index | Usage                                     |
| ------- | ----------------------------------------- |
| `z-[1]` | Content above borders, section title text |
| `z-[2]` | Modal overlay background                  |
| `z-[3]` | Dropdowns, popups                         |
| `z-[5]` | Modals, sidebars, drawers                 |
| `z-40`  | Mobile cart FAB button                    |
| `z-50`  | Highest priority — toast notifications    |

### 6.5 Scrollbar Utilities

```css
/* Hide scrollbar (category pills) */
.no-scrollbar::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Theme scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #e3e3e3be;
}
::-webkit-scrollbar-thumb {
  background: #cd2a75;
  border-radius: 2px;
}
```

### 6.6 Skeleton Loader

```css
.skeleton {
  @apply rounded h-3.5 block bg-gray-200 animate-pulse;
}
```

```html
<div class="animate-pulse">
  <div class="skeleton h-[96px] w-full mb-[8px]"></div>
  <div class="space-y-2">
    <div class="skeleton h-[11px] w-3/4"></div>
    <div class="skeleton h-[11px] w-1/2"></div>
    <div class="skeleton h-[14px] w-1/3"></div>
    <div class="skeleton h-[28px] w-full"></div>
  </div>
</div>
```

---

## 7. BD-Specific Design Patterns

These patterns are unique to Baby Bloom and address the specific behaviors of Bangladeshi online shoppers.

### 7.1 Bengali CTA Text

Primary Add to Cart buttons should use Bengali for maximum familiarity on mobile.

```html
<!-- Mobile (Bengali — preferred) -->
<button>Cart এ যোগ করুন</button>

<!-- Desktop / premium positioning (English) -->
<button>Add to Cart</button>
```

### 7.2 Discount Badges

BD shoppers respond strongly to visible discounts. Rules:

- Always show percentage off (e.g., `-30%` not just both prices)
- Badge position: `top: 6px, left: 6px` on product image
- Style: `bg-[#CD2A75]` · White 9px Bold Uppercase · `rounded-[3px]`
- Show badge for discounts of 5% and above — never skip
- Use `theme-label` base styles

### 7.3 Star Ratings

Social proof is critical for BD baby product buyers:

- Always show full 5-star row (filled + unfilled) in `#FF7E05` orange
- Show review count in parentheses: `★★★★★ (128)`
- Minimum 10px font on mobile
- Position: between old price and Add to Cart button
- If no reviews yet: show a `New` badge instead of hiding stars

### 7.4 Trust Bar Requirements

The 4-icon trust bar is **mandatory** on every page:

| Slot | Label         | Why It Matters                                          |
| ---- | ------------- | ------------------------------------------------------- |
| 🚚   | Fast Delivery | BD customers need delivery time assurance upfront       |
| ↩️   | Easy Return   | Return policy trust is key for first-time online buyers |
| 🔒   | Safe Payment  | Security badge reduces payment anxiety                  |
| ☎️   | 24/7 Support  | Hotline builds brand trust                              |

- Text must be `10px Medium #525252` — not pink (avoids visual noise)
- Always 4 items, evenly distributed full width
- Never collapse or remove on mobile

### 7.5 Mobile-First Rules

Over 90% of BD e-commerce traffic is mobile. These rules are mandatory:

- Minimum touch target: **44×44px** for all interactive elements
- Product card CTA: minimum `h-[28px]` full width
- Category pills: horizontally scrollable with `no-scrollbar` class
- Font size: never below **10px** on any visible element
- No hover-only interactions — all actions must work on touch
- Search bar must be in the **top 3 visible elements** on page load
- All images: lazy loaded with skeleton placeholder

---

## 8. Implementation Checklist

### Setup

- [ ] Install Tailwind CSS with custom config
- [ ] Add Google Fonts: Inter + Public Sans (weights: 300, 400, 500, 600, 700)
- [ ] Configure CSS custom properties (`--theme-primary`, `--theme-green`, etc.)
- [ ] Set up all 8 breakpoints (xxs → 3xl)
- [ ] Configure custom Tailwind colors: `theme-primary`, `theme-green`, `theme-orange`, `theme-alert`, `theme-yellow`
- [ ] Add `no-scrollbar` utility class

### Colors & Tokens

- [ ] `#CD2A75` applied to all CTAs, badges, price text, section borders
- [ ] `#191C1F` for all primary text
- [ ] Page background set to `#F8F8F8`
- [ ] Card backgrounds set to `#FFFFFF`
- [ ] All brand borders use `rgba(205,42,117,0.14)`

### Header

- [ ] Top bar: `#CD2A75` bg · authenticity label · brand name
- [ ] Logo bar: white bg · wishlist + cart badges · account icon
- [ ] Search bar: `#F8F8F8` bg · pink border input · pink search button
- [ ] Category pills: horizontally scrollable · active = filled pink · no visible scrollbar

### Product Cards

- [ ] 2-column grid default · `bg-[#E3E3E3]` grid container for 1px separator
- [ ] Image container: `h-[96px] bg-[#FDF5F8] rounded-[4px]`
- [ ] Discount badge: absolute top-left · pink bg · white caps
- [ ] Wishlist icon: absolute top-right · pink
- [ ] Price: new price pink bold · old price gray strikethrough
- [ ] Stars: 5-star row `#FF7E05` · review count gray
- [ ] CTA: full width · `#CD2A75` · Bengali text · `rounded-[4px]`

### Trust & Credibility

- [ ] Trust bar present on every major page
- [ ] Offer strip banner when promotions are active
- [ ] Discount badges on all discounted cards
- [ ] Star ratings visible on all product cards

### Accessibility & Performance

- [ ] All touch targets minimum 44×44px
- [ ] No hover-only interactions
- [ ] Font sizes: minimum 10px visible
- [ ] Verify `#CD2A75` on white meets WCAG AA contrast
- [ ] Lazy load all product images
- [ ] Skeleton loaders during data fetch

---

## 9. Quick Reference

### Core Color Tokens

| Token             | Hex       | Usage                           |
| ----------------- | --------- | ------------------------------- |
| `--theme-primary` | `#CD2A75` | CTAs, badges, borders, prices   |
| `--foreground`    | `#191C1F` | Primary text                    |
| `--background`    | `#F8F8F8` | Page background                 |
| `--card`          | `#FFFFFF` | Card background                 |
| `--theme-orange`  | `#FF7E05` | Star ratings                    |
| `--theme-green`   | `#30AD2E` | Certified labels                |
| `--theme-alert`   | `#EE5858` | Out of stock, errors            |
| Pink tint         | `#FFF0F6` | Card image bg, offer strip      |
| Pink card image   | `#FDF5F8` | Product card image container bg |

### Key Measurements

| Element            | Mobile                | Desktop               |
| ------------------ | --------------------- | --------------------- |
| Top bar            | `h-9` (36px)          | 36px                  |
| Search input       | 34px                  | 34px                  |
| Product card image | 96px                  | 120px+                |
| Add to Cart btn    | `h-[28px]` full-width | `h-[32px]` full-width |
| Category pill      | `py-[4px] px-[11px]`  | same                  |
| Badge dot          | 15×15px               | 16×16px               |
| Trust bar icon     | 15px                  | 15px                  |
| Min touch target   | 44×44px               | 44×44px               |

### Component Border Radius Map

| Component                      | Radius           |
| ------------------------------ | ---------------- |
| Buttons, inputs, cards, modals | `rounded-[4px]`  |
| Badges, discount labels        | `rounded-[3px]`  |
| Category pills                 | `rounded-[20px]` |
| Badge dots, radio              | `rounded-full`   |
| Large desktop modals           | `rounded-lg`     |

### Transition Cheatsheet

```css
/* Hover color change */
transition-colors duration-150

/* Modal open/close */
transition-all duration-300

/* Card shadow */
transition-shadow duration-200
```

---

_Baby Bloom Design System v1.0 · 2025 · System A_
_Built on Luxury E-Commerce Design Foundation_
