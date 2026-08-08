import { Category } from "@/data/types";
import { config } from "@/lib/config";

export const fetchCategoryBySlugOrId = async (
  categoryId: string
): Promise<Category | null> => {
  try {
    const response = await fetch(config.product.getCategories(), {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      return null;
    }
    const json = await response.json();
    const categories: Category[] = json?.data || json || [];
    return (
      categories.find((cat) => cat.slug === categoryId || cat.id === categoryId) ||
      null
    );
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};
