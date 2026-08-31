import { Metadata } from "next";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import { fetchCategoryBySlugOrId } from "@/services/categoryServices";
import { fetchCategoryProducts, fetchCategories } from "@/services/categorySeoService";
import { SITE_URL } from "@/lib/seo";
import CategoryProductsClient from "./CategoryProductsClient";
import CategoryContent from "./CategoryContent";
import CategorySeoSchema from "@/components/seo/CategorySeoSchema";

interface PageProps {
  params: {
    categoryId: string;
  };
}

const getCachedCategory = unstable_cache(
  async (categoryId: string) => {
    try {
      const response = await fetchCategoryBySlugOrId(categoryId);
      return response;
    } catch (error) {
      console.error("Error fetching category:", error);
      return null;
    }
  },
  ["category"],
  { revalidate: 60 },
);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const category = await getCachedCategory(params.categoryId);

  if (!category) {
    return {
      title: "Category Not Found - Luxury Online Mart",
    };
  }

  const canonical = `${SITE_URL}/category/${category.slug}`;
  const categoryName = category.seoTitle || category.name || "Category";
  const description =
    category.metaDescription ||
    category.shortDescription ||
    category.description ||
    `Browse our collection of ${category.name} at Luxury Online Mart - Your trusted kids fashion and lifestyle brand in Bangladesh.`;

  return {
    title: categoryName,
    description,
    keywords: [...(category.tags || []), category.focusKeyphrase].filter(
      Boolean,
    ) as string[],
    openGraph: {
      title: categoryName,
      description,
      type: "website",
      url: canonical,
      siteName: "Luxury Online Mart",
      locale: "en_BD",
      images: category.image
        ? [
            {
              url: category.image,
              width: 1200,
              height: 630,
              alt: category.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: categoryName,
      description,
      images: category.image ? [category.image] : undefined,
    },
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SingleCategoryPage({ params }: PageProps) {
  const { categoryId } = params;

  const category = await getCachedCategory(categoryId);
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Category Not Found
          </h1>
          <p className="text-gray-500 mb-8">
            The category you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  if (category.slug && category.slug !== categoryId) {
    redirect(`/category/${category.slug}`);
  }

  const [categories, productsResult] = await Promise.all([
    fetchCategories(),
    fetchCategoryProducts(category.id, 12),
  ]);

  return (
    <>
      <CategorySeoSchema
        category={category}
        categories={categories}
        products={productsResult.products}
        totalProducts={productsResult.totalProducts}
      />
      <CategoryContent
        category={category}
        categories={categories}
        products={productsResult.products}
        totalProducts={productsResult.totalProducts}
      />
      <CategoryProductsClient categoryId={category.id} category={category} />
    </>
  );
}
