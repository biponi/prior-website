"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { config } from "@/lib/config";
import ProductCard from "@/components/new-ui/ProductCard";
import { ProductType } from "@/data/types";
import { convertProductTypeToProduct } from "@/utils/functions";
import { PackageOpen } from "lucide-react";
import {
  getCachedBestSellerPage,
  setCachedBestSellerPage,
} from "@/lib/bestSellerCache";

const PAGE_SIZE = 20;

export default function BestSellersPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPage = useCallback(
    async (page: number, append: boolean) => {
      const cacheKey = page;

      // Check localStorage cache first
      const cached = getCachedBestSellerPage(cacheKey);
      if (cached) {
        setProducts((prev) =>
          append ? [...prev, ...cached.products] : cached.products,
        );
        setTotalPages(cached.totalPages);
        setCurrentPage(page);
        return;
      }

      const setter = append ? setLoadingMore : setLoading;

      try {
        setter(true);
        const url = config.product.getBestSellers(page, PAGE_SIZE);
        const response = await axios.get(url, { timeout: 10000 });

        const apiData = response.data?.data;
        if (!apiData) return;

        const pageData = {
          products: apiData.products || [],
          totalProducts: apiData.totalProducts || 0,
          totalPages: apiData.totalPages || 0,
          page,
        };

        // Cache this page in localStorage
        setCachedBestSellerPage(page, pageData);

        setProducts((prev) =>
          append ? [...prev, ...pageData.products] : pageData.products,
        );
        setTotalPages(pageData.totalPages);
        setCurrentPage(page);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      } finally {
        setter(false);
      }
    },
    [],
  );

  // Load first page on mount
  useEffect(() => {
    fetchPage(1, false);
  }, [fetchPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loadingMore) {
      fetchPage(currentPage + 1, true);
    }
  };

  const hasMore = currentPage < totalPages;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-white border-b border-neutral-100">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] via-transparent to-orange-500/[0.02]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full text-xs font-medium text-amber-700 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Trending Now
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900">
              Best Sellers
            </h1>
            <p className="mt-3 text-neutral-500 text-sm sm:text-base max-w-lg mx-auto">
              Our most loved products, chosen by thousands of happy customers
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Initial Loading - Skeleton */}
        {loading && products.length === 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </div>
        )}

        {/* Products */}
        {products.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {products.map((item: ProductType, index: number) => (
                <div
                  key={`${item.id}-${index}`}
                  style={{ animationDelay: `${index * 40}ms` }}
                  className="animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0">
                  <ProductCard product={convertProductTypeToProduct(item)} />
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-10 mb-4">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="relative rounded-full px-8 h-11 text-sm font-medium border border-neutral-200 hover:border-amber-400/40 hover:bg-amber-500/[0.04] hover:text-amber-700 transition-all duration-300 disabled:opacity-60 cursor-pointer">
                  {loadingMore ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    "Load More"
                  )}
                </button>
              </div>
            )}

            {/* End of Results */}
            {!loadingMore && !hasMore && products.length > 0 && (
              <div className="flex items-center gap-4 mt-10 mb-4">
                <div className="flex-1 h-px bg-neutral-200" />
                <p className="text-xs text-neutral-400 tracking-wider uppercase whitespace-nowrap">
                  You&apos;ve seen it all
                </p>
                <div className="flex-1 h-px bg-neutral-200" />
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-5">
              <PackageOpen className="w-9 h-9 text-neutral-300" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">
              No products available
            </h3>
            <p className="text-sm text-neutral-500">
              Check back soon for our best-selling items
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ─── Skeleton Loader ─────────────────────────────────────────────── */

function SkeletonCard({ index }: { index: number }) {
  return (
    <div
      style={{ animationDelay: `${index * 50}ms` }}
      className="bg-white rounded-xl border border-neutral-100 overflow-hidden animate-[fadeIn_0.3s_ease-out_forwards] opacity-0">
      <div className="aspect-[3/4] bg-neutral-100 animate-pulse relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
      </div>
      <div className="p-3 space-y-2.5">
        <div className="h-3 bg-neutral-100 rounded-full w-3/4 animate-pulse" />
        <div className="h-3 bg-neutral-100 rounded-full w-1/2 animate-pulse" />
        <div className="flex items-center gap-2 pt-1">
          <div className="h-4 bg-neutral-100 rounded-full w-16 animate-pulse" />
          <div className="h-3 bg-neutral-100 rounded-full w-10 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
