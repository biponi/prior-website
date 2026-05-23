// lib/server/fetchCategories.ts
import type { Category } from "@/data/types";
import type { CategoryShowcase, AccentVariant } from "@/hooks/useCategories";
import { config } from "@/lib/config";

const accentColors: AccentVariant[] = [
  "pink",
  "mint",
  "sky",
  "peach",
  "lavender",
  "amber",
];
const categoryIcons: Record<string, string> = {
  bag: "👜",
  bags: "👜",
  footwear: "👠",
  shoes: "👠",
  hijab: "🧕",
  hijabs: "🧕",
  clothing: "👗",
  accessories: "🎀",
  default: "🛍️",
};
const categoryBadges = ["Best sellers", "New arrivals", "Trending", "Popular"];

export async function fetchCategoriesForShowcase(): Promise<
  CategoryShowcase[]
> {
  try {
    const url = config.product.getCategories();
    console.log("[fetchCategoriesForShowcase] fetching:", url);

    const res = await fetch(url, { method: "GET", next: { revalidate: 3 } });

    console.log("[fetchCategoriesForShowcase] status:", res.status);

    const json = await res.json();
    console.log(
      "[fetchCategoriesForShowcase] raw json:",
      JSON.stringify(json).slice(0, 300),
    );
    console.log(
      "[fetchCategoriesForShowcase] active categories:",
      (json?.data || json || []).filter((c: any) => c != null).length,
    );
    const categoryData: Category[] = json?.data || json || [];

    return categoryData
      .filter((cat) => cat != null)
      .slice(0, 8)
      .map((cat, index) => {
        const lowerName = cat.name.toLowerCase();
        const icon =
          Object.entries(categoryIcons).find(([key]) =>
            lowerName.includes(key),
          )?.[1] ?? categoryIcons.default;

        return {
          title: cat.name,
          count: `${cat.totalProducts ?? 0} items`, // Use real count if available
          badge: categoryBadges[index % categoryBadges.length],
          icon,
          href: `/category/${cat.id}`,
          imageSrc:
            cat.img ||
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
          accent: accentColors[index % accentColors.length],
        };
      });
  } catch (err) {
    console.error("[fetchCategoriesForShowcase] failed:", err);
    return [];
  }
}
