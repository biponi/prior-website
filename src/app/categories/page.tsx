import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { config } from "@/lib/config";
import type { Category } from "@/data/types";
import type { AccentVariant } from "@/hooks/useCategories";

export const metadata: Metadata = {
  title: "All Categories | Luxury Online Mart",
  description:
    "Browse all product categories at Luxury Online Mart. Find bags, footwear, hijabs, clothing, accessories and more.",
  openGraph: {
    title: "All Categories | Luxury Online Mart",
    description:
      "Browse all product categories at Luxury Online Mart. Find bags, footwear, hijabs, clothing, accessories and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Categories | Luxury Online Mart",
    description:
      "Browse all product categories at Luxury Online Mart. Find bags, footwear, hijabs, clothing, accessories and more.",
  },
};

export const revalidate = 3600;

const ACCENT_COLORS: AccentVariant[] = [
  "pink",
  "mint",
  "sky",
  "peach",
  "lavender",
  "amber",
];

const ACCENT_CONFIG: Record<
  AccentVariant,
  { overlay: string; shopText: string }
> = {
  pink: {
    overlay:
      "bg-gradient-to-t from-[rgba(40,14,35,0.72)] via-[rgba(40,14,35,0.15)] to-transparent",
    shopText: "text-[#FFD6EC]",
  },
  mint: {
    overlay:
      "bg-gradient-to-t from-[rgba(14,47,40,0.72)] via-[rgba(14,47,40,0.15)] to-transparent",
    shopText: "text-[#B2FFDB]",
  },
  sky: {
    overlay:
      "bg-gradient-to-t from-[rgba(12,44,83,0.72)] via-[rgba(12,44,83,0.15)] to-transparent",
    shopText: "text-[#B5D4F4]",
  },
  peach: {
    overlay:
      "bg-gradient-to-t from-[rgba(71,28,10,0.72)] via-[rgba(71,28,10,0.15)] to-transparent",
    shopText: "text-[#FFD4B5]",
  },
  lavender: {
    overlay:
      "bg-gradient-to-t from-[rgba(38,33,92,0.72)] via-[rgba(38,33,92,0.15)] to-transparent",
    shopText: "text-[#CECBF6]",
  },
  amber: {
    overlay:
      "bg-gradient-to-t from-[rgba(65,36,2,0.75)] via-[rgba(65,36,2,0.15)] to-transparent",
    shopText: "text-[#FAC775]",
  },
};

const CATEGORY_BADGES = [
  "Best sellers",
  "New arrivals",
  "Trending",
  "Popular",
  "Top rated",
  "Featured",
] as const;

const ICON_MAP: [string, string][] = [
  ["skincare", "\u2728"],
  ["footwear", "\uD83D\uDC69\u200D\u2640\uFE0F"],
  ["hijabs", "\uD83E\uDDD5"],
  ["hijab", "\uD83E\uDDD5"],
  ["shoes", "\uD83D\uDC69\u200D\u2640\uFE0F"],
  ["bags", "\uD83D\uDC5C"],
  ["bag", "\uD83D\uDC5C"],
  ["clothing", "\uD83D\uDC57"],
  ["fashion", "\uD83D\uDC57"],
  ["accessories", "\uD83C\uDC80"],
  ["jewelry", "\uD83D\uDC8E"],
  ["watch", "\u231A"],
  ["beauty", "\uD83D\uDC84"],
  ["electronics", "\uD83D\uDCF1"],
  ["home", "\uD83C\uDFE0"],
  ["baby", "\uD83D\uDC76"],
  ["kids", "\uD83E\uDDF8"],
  ["sports", "\u26BD"],
  ["books", "\uD83D\uDCDA"],
];

const DEFAULT_ICON = "\uD83D\uDECD\uFE0F";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80";

function resolveIcon(name: string): string {
  const lower = name.toLowerCase();
  return ICON_MAP.find(([key]) => lower.includes(key))?.[1] ?? DEFAULT_ICON;
}

async function fetchAllCategories(): Promise<
  Array<{
    id: string;
    name: string;
    totalProducts: number;
    imageSrc: string;
    icon: string;
    badge: string;
    accent: AccentVariant;
  }>
> {
  try {
    const res = await fetch(config.product.getCategories(), {
      method: "GET",
      next: { revalidate: 3600 },
    });

    const json = await res.json();
    const categoryData: Category[] = json?.data || json || [];

    return categoryData
      .filter((cat) => cat != null && cat.active !== false)
      .map((cat, index) => ({
        id: cat.id,
        name: cat.name,
        totalProducts: cat.totalProducts ?? 0,
        imageSrc: cat.img?.trim() || FALLBACK_IMAGE,
        icon: resolveIcon(cat.name),
        badge: CATEGORY_BADGES[index % CATEGORY_BADGES.length],
        accent: ACCENT_COLORS[index % ACCENT_COLORS.length],
      }));
  } catch (err) {
    console.error("[categories/page] failed to fetch categories:", err);
    return [];
  }
}

const CategoryCard: React.FC<{
  id: string;
  name: string;
  totalProducts: number;
  imageSrc: string;
  icon: string;
  badge: string;
  accent: AccentVariant;
}> = ({ id, name, totalProducts, imageSrc, icon, badge, accent }) => {
  const cfg = ACCENT_CONFIG[accent];

  return (
    <Link href={`/category/${id}`} className='group block'>
      <div
        className='
          relative aspect-[3/4] rounded-[20px] overflow-hidden cursor-pointer
          border border-pink-200/30
          shadow-[0_2px_12px_rgba(176,106,138,0.08)]
          transition-all duration-300 ease-out
          hover:-translate-y-1.5 hover:scale-[1.02]
          hover:shadow-[0_16px_40px_rgba(176,106,138,0.2)]
          hover:border-pink-300/50
        '>
        <Image
          src={imageSrc}
          alt={name}
          fill
          className='object-cover transition-transform duration-700 group-hover:scale-[1.08]'
          sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none' />

        <div className={`absolute inset-0 ${cfg.overlay}`} />

        <div className='absolute bottom-0 left-0 right-0 p-3.5 sm:p-4'>
          <p className='text-lg mb-0.5'>{icon}</p>
          <p className='font-serif text-[15px] sm:text-base font-semibold text-white leading-tight mb-0.5'>
            {name}
          </p>
          <p className='text-[11px] text-white/70 mb-2'>
            {totalProducts} items
          </p>
          <div
            className={`flex items-center gap-1 text-[10px] font-medium tracking-[0.1em] uppercase ${cfg.shopText}`}>
            Shop now
            <ChevronRight
              className='w-3 h-3 transition-transform duration-200 group-hover:translate-x-1'
              aria-hidden='true'
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default async function CategoriesPage() {
  const categories = await fetchAllCategories();

  return (
    <div className='py-8 sm:py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8 sm:mb-10'>
          <div className='flex justify-center gap-1.5 mb-3'>
            {["#FBBFD4", "#F9A8C5", "#F690B5", "#F9A8C5", "#FBBFD4"].map(
              (color, i) => (
                <span
                  key={i}
                  className='inline-block w-1.5 h-1.5 rounded-full'
                  style={{ background: color }}
                />
              ),
            )}
          </div>

          <p className='inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[#B06A8A] mb-2'>
            <span className='inline-block w-5 h-px bg-pink-300 rounded-full' />
            Shop by category
            <span className='inline-block w-5 h-px bg-pink-300 rounded-full' />
          </p>

          <h1
            className='font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#3D2540] leading-tight mb-1'
            style={{ fontFamily: "'Fraunces', serif" }}>
            Browse All Categories
          </h1>
          <p className='text-sm sm:text-base text-[#8A7090] max-w-lg mx-auto'>
            Find exactly what you&apos;re looking for. Explore our full range of
            thoughtfully curated collections.
          </p>
        </div>

        {categories.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4'>
            {categories.map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>
        ) : (
          <div className='text-center py-16'>
            <p className='text-sm text-[#8A7090]'>
              No categories available at the moment. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
