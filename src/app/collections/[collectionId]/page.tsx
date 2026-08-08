import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import Script from "next/script";
import Link from "next/link";
import { Package, ShoppingCart } from "lucide-react";
import { fetchProductById } from "@/services/productServices";
import ProductDetailSection from "@/components/new-ui/ProductDetailSection";
import SectionMoreProducts from "./SectionMoreProducts";
import StockClient from "./StockClient";

interface PageProps {
  params: {
    collectionId: string;
  };
}

/**
 * Cached product fetch with 30-second revalidation
 * This provides server-side rendering performance while keeping data reasonably fresh
 */
const getCachedProduct = unstable_cache(
  async (productId: string) => {
    try {
      const response = await fetchProductById(productId);
      return response;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  },
  ["product"],
  { revalidate: 30 }, // Cache for 30 seconds
);

/**
 * Generate SEO metadata for product pages
 * This runs on the server and is critical for search engine optimization
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const product = await getCachedProduct(params.collectionId);

  if (!product) {
    return {
      title: "Product Not Found - Luxury Online Mart",
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://luxuryonlinemart.com";
  const productName = product.name || "Product";
  const description = product.description
    ? `${product.description.substring(0, 160)}`
    : `Shop ${productName} at Luxury Online Mart - Your trusted kids fashion and lifestyle brand in Bangladesh.`;

  return {
    title: product.seoTitle || productName,
    description: product.seoDescription || description,
    keywords: product.seoKeywords || [
      productName,
      "kids fashion",
      "Bangladesh",
    ],
    openGraph: {
      title: product.seoTitle || productName,
      description: product.seoDescription || description,
      type: "website",
      url: `${baseUrl}/collections/${product.slug}`,
      siteName: "Luxury Online Mart",
      locale: "en_BD",
      images: product.thumbnail
        ? [
            {
              url: product.thumbnail,
              width: 1200,
              height: 630,
              alt: productName,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoTitle || productName,
      description: product.seoDescription || description,
      images: product.thumbnail ? [product.thumbnail] : undefined,
    },
    alternates: {
      canonical: `${baseUrl}/collections/${product.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Product page - Server Component with Hybrid Rendering
 *
 * This page uses server-side rendering for SEO (critical for search engines)
 * while maintaining real-time stock updates through client components.
 *
 * Architecture:
 * - Server: Fetches product data (cached 30s), renders HTML, generates metadata
 * - Client: StockClient component fetches real-time stock updates every 15s
 */
export default async function SingleProductPage({ params }: PageProps) {
  const { collectionId } = params;

  // Server-side product data fetch (cached)
  const product = await getCachedProduct(collectionId);

  if (!product) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='text-center max-w-md mx-auto px-4'>
          <div className='w-20 h-20 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center mb-6'>
            <Package className='w-10 h-10 text-gray-300' />
          </div>
          <h1 className='text-2xl font-bold text-gray-900 mb-3'>
            Product Not Found
          </h1>
          <p className='text-gray-500 mb-8'>
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <Link
              href='/collections'
              className='inline-flex items-center justify-center gap-2 bg-babybloom-pink text-white px-6 py-3 rounded-xl font-semibold hover:bg-babybloom-pink/90 transition-all duration-300 shadow-lg hover:shadow-xl'>
              <ShoppingCart className='w-4 h-4' />
              Browse Collections
            </Link>
            <Link
              href='/'
              className='inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:border-babybloom-pink hover:text-babybloom-pink transition-all duration-300'>
              Back to Home
            </Link>
          </div>
          <div className='mt-12'>
            <SectionMoreProducts categoryId='' />
          </div>
        </div>
      </div>
    );
  }

  const { images, thumbnail, categoryId, unitPrice, quantity, slug } = product;

  // Prepare image data
  let imageData = [thumbnail];
  if (images && images.length > 0) imageData = [...imageData, ...images];

  // Product JSON-LD Structured Data
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://luxuryonlinemart.com";
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || "",
    image: imageData,
    url: `${baseUrl}/collections/${slug}`,
    offers: {
      "@type": "Offer",
      price: unitPrice ? unitPrice.toString() : "0",
      priceCurrency: "BDT",
      availability:
        quantity && quantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${baseUrl}/collections/${slug}`,
    },
    brand: {
      "@type": "Brand",
      name: "Luxury Online Mart",
    },
  };

  return (
    <>
      {/* Product Structured Data for SEO */}
      <Script
        id='product-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productStructuredData),
        }}
      />

      {/* Main Product Content - Server Rendered */}
      <ProductDetailSection product={product} shots={imageData} />

      {/* Real-time Stock Updates - Client Component */}
      <div className='max-w-7xl mx-auto px-4 py-4'>
        <StockClient
          productId={product.id}
          initialStock={product.quantity || 0}
          initialPrice={product.unitPrice || 0}
        />
      </div>

      {/* Related Products */}
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='border-t border-gray-200 pt-12'>
          <SectionMoreProducts categoryId={categoryId} />
        </div>
      </div>
    </>
  );
}
