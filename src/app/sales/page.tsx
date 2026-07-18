"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { config } from "@/lib/config";
import ProductCard from "@/components/new-ui/ProductCard";
import { ProductType } from "@/data/types";
import { convertProductTypeToProduct } from "@/utils/functions";
import { PackageOpen, Tag, Zap, Percent, ShoppingBag } from "lucide-react";
import {
  getCachedSalesPage,
  setCachedSalesPage,
} from "@/lib/salesCache";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 20;

const SOURCE_TABS = [
  { value: "all", label: "All Deals", icon: Tag },
  { value: "campaign", label: "Campaign", icon: Zap },
  { value: "category", label: "Category", icon: ShoppingBag },
  { value: "product", label: "Product", icon: Percent },
] as const;

type SourceType = (typeof SOURCE_TABS)[number]["value"];

export default function SalesPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeSource, setActiveSource] = useState<SourceType>("all");

  const fetchPage = useCallback(
    async (page: number, append: boolean, source: SourceType) => {
      // Check localStorage cache first
      const cached = getCachedSalesPage(page, source);
      if (cached) {
        setProducts((prev) =>
          append ? [...prev, ...cached.products] : cached.products,
        );
        setTotalPages(cached.totalPages);
        setTotalProducts(cached.totalProducts);
        setCurrentPage(page);
        return;
      }

      const setter = append ? setLoadingMore : setLoading;

      try {
        setter(true);
        const url = config.product.getDeals(page, PAGE_SIZE, source);
        const response = await axios.get(url, { timeout: 10000 });

        const apiData = response.data?.data;
        if (!apiData) return;

        const pageData = {
          products: apiData.products || [],
          totalProducts: apiData.totalProducts || 0,
          totalPages: apiData.totalPages || 0,
          page,
        };

        setCachedSalesPage(page, source, pageData);

        setProducts((prev) =>
          append ? [...prev, ...pageData.products] : pageData.products,
        );
        setTotalPages(pageData.totalPages);
        setTotalProducts(pageData.totalProducts);
        setCurrentPage(page);
      } catch (error) {
        console.error("Error fetching sales:", error);
      } finally {
        setter(false);
      }
    },
    [],
  );

  // Load first page on mount
  useEffect(() => {
    fetchPage(1, false, activeSource);
  }, [fetchPage, activeSource]);

  const handleSourceChange = (source: SourceType) => {
    if (source === activeSource) return;
    setActiveSource(source);
    setProducts([]);
    setCurrentPage(1);
    setTotalPages(0);
    setTotalProducts(0);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loadingMore) {
      fetchPage(currentPage + 1, true, activeSource);
    }
  };

  const hasMore = currentPage < totalPages;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-white border-b border-neutral-100">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.04] via-transparent to-orange-500/[0.03]" />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-red-500/[0.05] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full bg-orange-500/[0.04] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-xs font-medium text-red-600 mb-4">
              <Tag className="w-3 h-3" />
              Limited Time Offers
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900">
              Sales & Deals
            </h1>
            <p className="mt-3 text-neutral-500 text-sm sm:text-base max-w-lg mx-auto">
              Grab amazing discounts before they&apos;re gone
            </p>
            {totalProducts > 0 && (
              <p className="mt-2 text-xs text-neutral-400">
                {totalProducts} discounted {totalProducts === 1 ? "product" : "products"} available
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Source Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {SOURCE_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSource === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => handleSourceChange(tab.value)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer",
                  isActive
                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:border-red-200 hover:text-red-600 hover:bg-red-50",
                )}>
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
                  className="relative rounded-full px-8 h-11 text-sm font-medium border border-neutral-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all duration-300 disabled:opacity-60 cursor-pointer">
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
                  You&apos;ve seen all deals
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
              No deals available
            </h3>
            <p className="text-sm text-neutral-500">
              Check back soon for amazing discounts
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
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
