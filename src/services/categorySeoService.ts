import { config } from "@/lib/config";
import type { ProductType } from "@/data/types";

export type CategoryProductsResult = {
  products: ProductType[];
  totalProducts: number;
};

/**
 * Fetch the first page of products for a category (used for ItemList
 * JSON-LD). NOT for the visible grid, which keeps its own client-side
 * pagination.
 */
export async function fetchCategoryProducts(
  categoryId: string,
  limit = 12,
): Promise<CategoryProductsResult> {
  try {
    const params = new URLSearchParams({
      page: "1",
      limit: String(limit),
      categoryId,
    });
    const res = await fetch(`${config.product.getProducts()}?${params}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { products: [], totalProducts: 0 };
    const json = await res.json();
    const products: ProductType[] = Array.isArray(json?.products) ? json.products : [];
    return {
      products,
      totalProducts:
        typeof json?.totalProducts === "number" ? json.totalProducts : products.length,
    };
  } catch {
    return { products: [], totalProducts: 0 };
  }
}

/**
 * Fetch the flat category list (for breadcrumbs).
 * Returns [] on failure.
 */
export async function fetchCategories(): Promise<any[]> {
  try {
    const res = await fetch(config.product.getCategories(), {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const json = await res.json();
    const list = Array.isArray(json) ? json : (json?.data ?? json?.categories);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}
