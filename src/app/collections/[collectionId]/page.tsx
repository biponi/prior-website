"use client";

import React, { useEffect, useState } from "react";
import SectionMoreProducts from "./SectionMoreProducts";
import ProductDetailSection from "@/components/new-ui/ProductDetailSection";
import { fetchProductById } from "@/services/productServices";
import { SingleProductType } from "@/data/types";
import { Package, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    collectionId: string;
  };
}

const SingleProductPage = ({ params }: PageProps) => {
  const { collectionId } = params;
  const [product, setProduct] = useState<SingleProductType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetchProductById(collectionId);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [collectionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-babybloom-pink/10" />
            <div className="absolute inset-0 rounded-full border-4 border-babybloom-pink border-t-transparent animate-spin" />
          </div>
          <p className="text-gray-500 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

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
              className="inline-flex items-center justify-center gap-2 bg-babybloom-pink text-white px-6 py-3 rounded-xl font-semibold hover:bg-babybloom-pink/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="w-4 h-4" />
              Browse Collections
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:border-babybloom-pink hover:text-babybloom-pink transition-all duration-300"
            >
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

  const { images, thumbnail, categoryId } = product;

  let imageData = [thumbnail];
  if (images && images.length > 0) imageData = [...imageData, ...images];

  return (
    <>
      <ProductDetailSection product={product} shots={imageData} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="border-t border-gray-200 pt-12">
          <SectionMoreProducts categoryId={categoryId} />
        </div>
      </div>
    </>
  );
};

export default SingleProductPage;
