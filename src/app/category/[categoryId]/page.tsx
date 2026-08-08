import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import Script from "next/script";
import { fetchCategoryBySlugOrId } from "@/services/categoryServices";
import CategoryProductsClient from "./CategoryProductsClient";
import { collectionTag } from "@/data/content";

interface PageProps {
  params: {
    categoryId: string;
  };
}

/**
 * Cached category fetch with 60-second revalidation
 */
const getCachedCategory = unstable_cache(
  async (categoryId: string) => {
    try {
      const response = await fetchCategoryBySlugOrId(categoryId);
      return response;
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  },
  ['category'],
  { revalidate: 60 }
);

/**
 * Generate SEO metadata for category pages
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await getCachedCategory(params.categoryId);

  if (!category) {
    return {
      title: 'Category Not Found - Luxury Online Mart',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://priorbd.com';
  const categoryName = category.name || 'Category';
  const description = category.description
    ? category.description
    : `Browse our collection of ${category.name} at Luxury Online Mart - Your trusted kids fashion and lifestyle brand in Bangladesh.`;

  return {
    title: `${categoryName} - Luxury Online Mart`,
    description: description,
    keywords: [categoryName, 'kids fashion', 'Bangladesh', 'children clothing'],
    openGraph: {
      title: `${categoryName} - Luxury Online Mart`,
      description: description,
      type: 'website',
      url: `${baseUrl}/category/${category.slug}`,
      siteName: 'Luxury Online Mart',
      locale: 'en_BD',
      images: category.image
        ? [
            {
              url: category.image,
              width: 1200,
              height: 630,
              alt: categoryName,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} - Luxury Online Mart`,
      description: description,
      images: category.image ? [category.image] : undefined,
    },
    alternates: {
      canonical: `${baseUrl}/category/${category.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Category page - Server Component with Hybrid Rendering
 *
 * Server-side rendering provides SEO benefits while client components
 * handle interactive features like filtering and infinite scroll.
 */
export default async function SingleCategoryPage({ params }: PageProps) {
  const { categoryId } = params;

  // Server-side category data fetch (cached)
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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://priorbd.com';

  // Category JSON-LD Structured Data
  const categoryStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description || '',
    url: `${baseUrl}/category/${category.slug}`,
  };

  return (
    <>
      {/* Category Structured Data for SEO */}
      <Script
        id="category-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryStructuredData) }}
      />

      {/* Client component for interactive features */}
      <CategoryProductsClient categoryId={category.id} category={category} />
    </>
  );
}
