import { ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AccentVariant =
  | "pink"
  | "mint"
  | "sky"
  | "peach"
  | "lavender"
  | "amber";

export interface Category {
  title: string;
  count: string;
  badge: string;
  icon: string;
  href: string;
  imageSrc: string;
  accent: AccentVariant;
}

// ─── Accent config ────────────────────────────────────────────────────────────

const accentConfig: Record<
  AccentVariant,
  { overlay: string; shopText: string; badgeText: string; badgeBg: string }
> = {
  pink: {
    overlay:
      "bg-gradient-to-t from-[rgba(40,14,35,0.72)] via-[rgba(40,14,35,0.15)] to-transparent",
    shopText: "text-[#FFD6EC]",
    badgeText: "text-[#B06A8A]",
    badgeBg: "bg-white/90",
  },
  mint: {
    overlay:
      "bg-gradient-to-t from-[rgba(14,47,40,0.72)] via-[rgba(14,47,40,0.15)] to-transparent",
    shopText: "text-[#B2FFDB]",
    badgeText: "text-[#1D9E75]",
    badgeBg: "bg-white/90",
  },
  sky: {
    overlay:
      "bg-gradient-to-t from-[rgba(12,44,83,0.72)] via-[rgba(12,44,83,0.15)] to-transparent",
    shopText: "text-[#B5D4F4]",
    badgeText: "text-[#185FA5]",
    badgeBg: "bg-white/90",
  },
  peach: {
    overlay:
      "bg-gradient-to-t from-[rgba(71,28,10,0.72)] via-[rgba(71,28,10,0.15)] to-transparent",
    shopText: "text-[#FFD4B5]",
    badgeText: "text-[#D85A30]",
    badgeBg: "bg-white/90",
  },
  lavender: {
    overlay:
      "bg-gradient-to-t from-[rgba(38,33,92,0.72)] via-[rgba(38,33,92,0.15)] to-transparent",
    shopText: "text-[#CECBF6]",
    badgeText: "text-[#534AB7]",
    badgeBg: "bg-white/90",
  },
  amber: {
    overlay:
      "bg-gradient-to-t from-[rgba(65,36,2,0.75)] via-[rgba(65,36,2,0.15)] to-transparent",
    shopText: "text-[#FAC775]",
    badgeText: "text-[#BA7517]",
    badgeBg: "bg-white/90",
  },
};

// ─── Sample data (fallback if no categories provided) ──────────────────────────

const defaultCategories: Category[] = [
  {
    title: "Women's Bags",
    count: "148 items",
    badge: "Best sellers",
    icon: "👜",
    href: "/category/fed3dffe-c6c1-46fd-b020-eb8ca8f3ca8c",
    imageSrc:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    accent: "pink",
  },
  {
    title: "Women's Footwear",
    count: "96 items",
    badge: "New arrivals",
    icon: "👠",
    href: "/category/4506b4bb-e6a4-44c5-bb0c-ad77c1c3c967",
    imageSrc:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    accent: "mint",
  },
  {
    title: "Women's Hijabs",
    count: "210 items",
    badge: "Trending",
    icon: "🧕",
    href: "/category/e425d9b7-bdf6-4268-b203-390dd28d984f",
    imageSrc:
      "https://images.unsplash.com/photo-1524293581917-878a6d017c71?w=600&q=80",
    accent: "peach",
  },
];

// ─── Individual card ───────────────────────────────────────────────────────────

const CategoryCard: React.FC<Category> = ({
  title,
  count,
  badge,
  icon,
  href,
  imageSrc,
  accent,
}) => {
  const cfg = accentConfig[accent];

  return (
    <Link href={href} className='group block'>
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
        {/* Image */}
        <Image
          src={imageSrc}
          alt={title}
          fill
          className='object-cover transition-transform duration-700 group-hover:scale-[1.08]'
          sizes='(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw'
        />

        {/* Black overlay for text readability */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none' />

        {/* Colored gradient overlay */}
        <div className={`absolute inset-0 ${cfg.overlay}`} />

        {/* Badge */}
        <div
          className={`
            absolute top-3 right-3 ${cfg.badgeBg} ${cfg.badgeText}
            text-[10px] font-medium tracking-[0.05em]
            px-2.5 py-1 rounded-full backdrop-blur-sm whitespace-nowrap
          `}>
          {badge}
        </div>

        {/* Content */}
        <div className='absolute bottom-0 left-0 right-0 p-3.5 sm:p-4'>
          <span className='block text-lg mb-1' aria-hidden='true'>
            {icon}
          </span>
          <p className='font-serif text-[15px] sm:text-base font-semibold text-white leading-tight mb-0.5'>
            {title}
          </p>
          <p className='text-[11px] text-white/70 mb-2'>{count}</p>
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

// ─── Section header ───────────────────────────────────────────────────────────

const SectionHeader: React.FC = () => (
  <div className='text-center mb-8'>
    {/* Decorative dots */}
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

    <h2
      className='font-serif text-2xl sm:text-3xl font-semibold text-[#3D2540] leading-tight mb-1'
      style={{ fontFamily: "'Fraunces', serif" }}>
      Everything your little one needs
    </h2>
    <p className='text-sm text-[#8A7090]'>
      Thoughtfully chosen, safe &amp; adorable — just like them.
    </p>
  </div>
);

// ─── Main showcase component ──────────────────────────────────────────────────

interface CategoryShowcaseProps {
  /** Pass up to 8 categories. Defaults to sample data. */
  categories?: Category[];
  /** Link for the "Browse all" button */
  viewAllHref?: string;
  /** Loading state */
  loading?: boolean;
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  categories = defaultCategories,
  viewAllHref = "/collections",
  loading = false,
}) => {
  const displayCategories = categories.slice(0, 8);

  // Loading skeleton
  if (loading) {
    return (
      <section className='py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <SectionHeader />
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4'>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className='aspect-[3/4] rounded-[20px] bg-gray-100 animate-pulse'
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className='py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
      <SectionHeader />

      {/*
        Grid layout:
          Mobile  → 2 columns
          Tablet  → 3 columns
          Desktop → 4 columns
      */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4'>
        {displayCategories.map((cat) => (
          <CategoryCard key={cat.href} {...cat} />
        ))}
      </div>

      {/* View all CTA */}
      <div className='text-center mt-8'>
        <Link
          href={viewAllHref}
          className='
            inline-flex items-center gap-2
            px-7 py-2.5 rounded-full
            border border-pink-300
            text-sm font-medium text-[#B06A8A]
            tracking-[0.04em]
            transition-all duration-200
            hover:bg-pink-50 hover:border-[#B06A8A] hover:-translate-y-px
          '>
          Browse all categories
          <ArrowRight className='w-4 h-4' aria-hidden='true' />
        </Link>
      </div>
    </section>
  );
};

export default CategoryShowcase;
export type { CategoryShowcaseProps };
