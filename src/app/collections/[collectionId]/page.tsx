import { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { Package, ShoppingCart } from "lucide-react";
import { fetchProductById } from "@/services/productServices";
import { SITE_URL, stripHtml } from "@/lib/seo";
import ProductDetailSection from "@/components/new-ui/ProductDetailSection";
import ProductSeoSchema from "@/components/seo/ProductSeoSchema";
import SectionMoreProducts from "./SectionMoreProducts";
import StockClient from "./StockClient";

interface PageProps {
  params: {
    collectionId: string;
  };
}

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
  { revalidate: 30 },
);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const product = await getCachedProduct(params.collectionId);

  if (!product) {
    return {
      title: "Product Not Found - Luxury Online Mart",
    };
  }

  const canonical = `${SITE_URL}/collections/${product.slug}`;
  const title = product.seoTitle || product.name || "Product";
  const description =
    product.seoDescription ||
    stripHtml(product.description).slice(0, 160) ||
    `Shop ${product.name} at Luxury Online Mart - Your trusted kids fashion and lifestyle brand in Bangladesh.`;

  return {
    title,
    description,
    keywords: product.seoKeywords || [
      product.name,
      "kids fashion",
      "Bangladesh",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: "Luxury Online Mart",
      locale: "en_BD",
      images: product.thumbnail
        ? [
            {
              url: product.thumbnail,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.thumbnail ? [product.thumbnail] : undefined,
    },
    alternates: {
      canonical,
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

export default async function SingleProductPage({ params }: PageProps) {
  const { collectionId } = params;

  const product = await getCachedProduct(collectionId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
            <Package className="w-10 h-10 text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Product Not Found
          </h1>
          <p className="text-gray-500 mb-8">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-2 bg-babybloom-pink text-white px-6 py-3 rounded-xl font-semibold hover:bg-babybloom-pink/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              <ShoppingCart className="w-4 h-4" />
              Browse Collections
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:border-babybloom-pink hover:text-babybloom-pink transition-all duration-300">
              Back to Home
            </Link>
          </div>
          <div className="mt-12">
            <SectionMoreProducts categoryId="" />
          </div>
        </div>
      </div>
    );
  }

  if (product.slug && product.slug !== collectionId) {
    permanentRedirect(`/collections/${product.slug}`);
  }

  const { images, thumbnail, categoryId } = product;

  let imageData = [thumbnail];
  if (images && images.length > 0) imageData = [...imageData, ...images];

  return (
    <>
      <ProductSeoSchema product={product} />

      <ProductDetailSection product={product} shots={imageData} />

      <div className="max-w-7xl mx-auto px-4 py-4">
        <StockClient
          productId={product.id}
          initialStock={product.quantity || 0}
          initialPrice={product.unitPrice || 0}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="border-t border-gray-200 pt-12">
          <SectionMoreProducts categoryId={categoryId} />
        </div>
      </div>
    </>
  );
}
