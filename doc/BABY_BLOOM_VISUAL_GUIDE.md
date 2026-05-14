# Baby Bloom Visual Guide

## 🎨 Color Palette

```css
/* Primary Colors */
--babybloom-pink:        #CD2A75  /* Primary pink for CTAs, accents, prices */
--babybloom-pink-dark:   #B02462  /* Hover state */
--babybloom-pink-light:  #FDF5F8  /* Image background tint */
--babybloom-orange:      #FF7E05  /* Star ratings */

/* Neutral Colors */
--babybloom-text:        #191C1F  /* Primary text */
--babybloom-text-muted:  #A3A3A3  /* Secondary text, strikethrough prices */
--babybloom-bg:          #F8F8F8  /* Page background */
--babybloom-card:        #FFFFFF  /* Card background */
--babybloom-border:      #E3E3E3  /* Separator lines */
```

---

## 📏 Component Measurements

### ProductCard
```
┌─────────────────────────────────┐
│  Padding: 10px on all sides    │
│                                 │
│  ┌──────────────────────────┐  │
│  │  Image Height: 96px       │  │
│  │  BG: #FDF5F8 (pink tint) │  │
│  │  Border Radius: 4px      │  │
│  └──────────────────────────┘  │
│                                 │
│  Product Name                   │
│  Font: 11.5px, Regular         │
│  Min Height: 32px              │
│                                 │
│  Price: 14px, Bold, Pink       │
│  Old Price: 11px, Line-through │
│                                 │
│  Stars: 10px, Orange            │
│                                 │
│  CTA Button                     │
│  Height: 28px                  │
│  Full Width                    │
│  BG: #CD2A75 (Pink)            │
└─────────────────────────────────┘
```

### ProductGrid (Mobile)
```
┌──────────────────────┐
│  1px Separator Line  │  ← Using bg-[#E3E3E3]
├──────────┬───────────┤
│          │           │
│  Card 1  │  Card 2   │  ← 2 columns
│          │           │
├──────────┴───────────┤
│  1px Separator Line  │
└──────────────────────┘
```

### TrustBar Icons
```
┌──────────────────┐
│   Circular BG    │  ← 48×48px
│   BG: #FDF5F8    │  ← Pink tint
│   Icon: 24px     │  ← Pink
└──────────────────┘
```

### Category Pills
```
┌──────────────────┐
│  All Products    │  ← Height: 32px
│  Border: 20px    │  ← Fully rounded
│  Padding: 4px 11px
└──────────────────┘
```

---

## 🎯 Key Visual Differences

### Editorial vs Baby Bloom

| Element | Editorial | Baby Bloom |
|---------|-----------|------------|
| **Primary Color** | Blue (#0b3393) | Pink (#CD2A75) |
| **Image Height** | aspect-[3/4] (responsive) | Fixed 96px |
| **Image BG** | neutral-100 | #FDF5F8 (pink tint) |
| **Card Padding** | Variable | Fixed 10px |
| **Price Color** | neutral-900 | #CD2A75 (pink) |
| **Star Color** | amber-400 | #FF7E05 (orange) |
| **Stars** | Optional | **Required** |
| **CTA Height** | Auto | 28px fixed |
| **Grid Gap** | 12px+ | 1px (separator) |
| **Trust Bar** | No | **Yes** (required) |
| **Category Pills** | No | **Yes** (required) |

---

## 📱 Responsive Breakpoints

### ProductCard Grid
```
Mobile (< 768px):     2 columns, gap-[1px]
Tablet (768px+):      3 columns, gap-[1px]
Desktop (1024px+):    4 columns, gap-[1px]
```

### TrustBar Grid
```
Mobile (< 768px):     2 columns
Desktop (768px+):     4 columns
```

### Header Elements
```
Mobile:                Hamburger menu, inline search, icon actions
Tablet:               Full nav links, inline search
Desktop:              Full nav links, inline search, all icons
```

---

## 🖼️ Visual Hierarchy

### Homepage Layout
```
┌──────────────────────────────────┐
│  Header (3-bar structure)        │
│  - Top bar (contact, account)    │
│  - Logo bar (logo, nav, search)  │
│  - Search bar (inline)           │
├──────────────────────────────────┤
│  Offer Strip (gradient pink)     │
├──────────────────────────────────┤
│  Category Pills (horizontal)     │
├──────────────────────────────────┤
│  Flash Sale Section              │
│  - Banner (gradient pink)        │
│  - Product Grid (2-4 cols)       │
├──────────────────────────────────┤
│  New Arrivals                    │
│  - Section Title (pink border)   │
│  - Product Grid                  │
├──────────────────────────────────┤
│  Trust Bar (4 icons)             │
├──────────────────────────────────┤
│  Trending Products               │
├──────────────────────────────────┤
│  Featured Banner                 │
├──────────────────────────────────┤
│  More For You                    │
├──────────────────────────────────┤
│  Footer                          │
└──────────────────────────────────┘
```

---

## ✨ Interaction States

### Buttons
```
Default:   BG: #CD2A75, Text: White
Hover:     BG: #B02462 (darker pink)
Disabled:  BG: #E3E3E3, Text: #A3A3A3
```

### Category Pills
```
Default:   BG: White, Border: #E3E3E3, Text: #191C1F
Hover:     BG: White, Border: #CD2A75, Text: #CD2A75
Active:    BG: #CD2A75, Border: #CD2A75, Text: White
```

### Wishlist Heart
```
Default:   Outline, #CD2A75
Hover:     Fill current, #B02462
Active:    Fill current, #CD2A75
```

### Product Cards
```
Default:   BG: White, No shadow
Hover:     BG: White, Subtle lift (optional)
```

---

## 🔤 Typography Scale

### Headings
```
Section Title (Mobile):    14px, Bold, Uppercase, tracking-[0.06em]
Section Title (Desktop):   16px, Bold, Uppercase, tracking-[0.06em]
Section Subtitle:          12px, Regular, #A3A3A3
```

### Product Card
```
Product Name:              11.5px, Regular, line-clamp-2
Price (New):               14px, Bold, #CD2A75
Price (Old):               11px, Regular, line-through, #A3A3A3
Stars:                     10px
Review Count:              10px, #A3A3A3
CTA Button:                10.5px, Bold, Uppercase, tracking-[0.04em]
```

### Navigation
```
Nav Links:                 14px, Medium
Mobile Menu Items:         14px, Regular
Category Pills:            12px, Medium
```

---

## 🎨 Badge Styles

### Discount Badge
```
Position:    top-[6px] left-[6px]
Background:  #CD2A75 (pink)
Text:        White, 9px, Bold, Uppercase
Padding:     2px 6px
Border:      3px rounded
Format:      "-30%" (percentage only)
Show if:     Discount >= 5%
```

### Trust Icons
```
Container:   48×48px, circular, #FDF5F8 bg
Icon:        24px, #CD2A75
Title:       14px, Bold
Description: 12px, Regular, #A3A3A3
```

---

## 📐 Spacing System

### ProductCard Internal Spacing
```
Image Bottom Margin:        8px
Name Bottom Margin:         5px
Price Bottom Margin:        4px
Stars Bottom Margin:        7px
```

### Section Spacing
```
Section Top/Bottom Padding:  32px (24px on mobile)
Grid Gap:                   1px (separator line)
Container Side Padding:     16px (mobile), 24px (desktop)
```

### Button Spacing
```
CTA Height:                 28px
Button Padding:             6px 12px
Icon Button:                8px (all sides)
```

---

## 🌟 Star Rating Display

### Filled Stars
```
Color:  #FF7E05 (orange)
Size:   10px
Rating: floor(product.rating)
```

### Empty Stars
```
Color:  neutral-300
Size:   10px
```

### Review Count
```
Format:  (123)
Color:   #A3A3A3
Size:    10px
```

---

## 💡 Design Tips

### 1. Always Show Stars
Star ratings are critical for BD market trust. Always display them even if rating is 0.

### 2. Bold CTAs
Use uppercase, bold font for all CTA buttons with tracking for emphasis.

### 3. Pink Consistency
Use #CD2A75 for all primary actions, prices, and accents throughout.

### 4. Separator Lines
Use 1px gap with gray background (#E3E3E3) for clean grid separation.

### 5. Touch Targets
Ensure all interactive elements are minimum 44×44px on mobile.

### 6. Image Tint
Use #FDF5F8 background for product images to maintain pink theme consistency.

---

## 🎨 Design Tokens (Tailwind)

```javascript
// Add to tailwind.config.ts
babybloom: {
  pink: "#CD2A75",
  "pink-dark": "#B02462",
  "pink-light": "#FDF5F8",
  orange: "#FF7E05",
  text: "#191C1F",
  "text-muted": "#A3A3A3",
  bg: "#F8F8F8",
  border: "#E3E3E3",
}
```

---

## 📱 Mobile-First Rules

1. **Touch Targets**: Minimum 44×44px
2. **Font Sizes**: Never below 10px
3. **Spacing**: Compact but readable
4. **Images**: Fixed height (96px) for consistency
5. **Scroll**: Horizontal scroll for category pills
6. **Search**: Always visible in top 3 elements

---

## ✅ Checklist for Baby Bloom Components

### ProductCard
- [x] Pink theme (#CD2A75)
- [x] 96px image height
- [x] Pink tint image bg (#FDF5F8)
- [x] Discount badges (5%+)
- [x] Star ratings (orange)
- [x] Pink prices (bold)
- [x] Full-width CTA (28px)
- [x] Wishlist icon (pink)
- [x] Rounded corners (4px)

### TrustBar
- [x] 4 icons
- [x] Pink circular backgrounds
- [x] Responsive grid
- [x] Title + description

### CategoryPills
- [x] Horizontal scroll
- [x] Pink active state
- [x] Rounded (20px)
- [x] Hover effects

### ProductGrid
- [x] 2-column grid
- [x] 1px separator
- [x] Pink title borders
- [x] Loading skeletons
- [x] Empty states

### HomePage
- [x] Offer strip
- [x] Category pills
- [x] Flash sale
- [x] New arrivals
- [x] Trust bar
- [x] Trending
- [x] Featured banner
- [x] More for you

---

This visual guide should help maintain consistency across all Baby Bloom components!
