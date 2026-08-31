import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { buildBreadcrumbChain } from "@/lib/seo";
import type { Category, ProductType } from "@/data/types";

interface CategoryContentProps {
  category: Category;
  categories: Category[];
  products: ProductType[];
  totalProducts: number;
}

function minPrice(products: ProductType[]): number | null {
  let min: number | null = null;
  for (const p of products) {
    const price = p.hasDiscount ? p.updatedPrice : p.unitPrice;
    if (
      typeof price === "number" &&
      price > 0 &&
      (min === null || price < min)
    ) {
      min = price;
    }
  }
  return min;
}

export default function CategoryContent({
  category,
  categories,
  products,
  totalProducts,
}: CategoryContentProps) {
  const chain = buildBreadcrumbChain(
    { id: category.id, name: category.name, parentId: undefined, slug: category.slug },
    categories,
  );
  const from = minPrice(products);

  return (
    <div className="px-4 md:container pt-6 pb-2">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-gray-400">
          <li>
            <Link href="/" className="hover:text-gray-600 transition-colors">
              Home
            </Link>
          </li>
          {chain.map((item, i) => {
            const isLast = i === chain.length - 1;
            return (
              <li key={item.slugOrId} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                {isLast ? (
                  <span aria-current="page" className="text-gray-900 font-medium">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={`/category/${item.slugOrId}`}
                    className="hover:text-gray-600 transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* GEO answer-first sentence (hidden, for crawlers) */}
      <p className="text-[15px] text-gray-600 leading-relaxed max-w-2xl hidden">
        {`${category.name} at Luxury Online Mart${totalProducts > 0 ? ` \u2014 ${totalProducts} products to shop` : ""}${from !== null ? `, prices from \u09F3${Math.ceil(from)}` : ""}. Delivery across Bangladesh with cash on delivery. Shop online or in-store at Luxury Online Mart.`}
      </p>
    </div>
  );
}
