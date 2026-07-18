"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PackageOpen } from "lucide-react";
import { Product } from "@/lib/adapters/productAdapter";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  className?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  onViewAll?: () => void;
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  subtitle,
  className = "",
  showViewAll = false,
  viewAllLink,
  onViewAll,
  loading = false,
  onLoadMore,
  hasMore = false,
}) => {
  const renderSkeleton = () =>
    Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="aspect-[3/4] bg-neutral-100 rounded-xl mb-3" />
        <div className="space-y-2">
          <div className="h-3 bg-neutral-100 rounded-full w-3/4" />
          <div className="h-3 bg-neutral-100 rounded-full w-1/2" />
          <div className="h-4 bg-neutral-100 rounded-full w-1/3 mt-1" />
        </div>
      </div>
    ));

  const renderEmpty = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
        <PackageOpen className="w-7 h-7 text-neutral-300" />
      </div>
      <h3 className="text-base font-medium text-neutral-900 mb-1">
        No products found
      </h3>
      <p className="text-sm text-neutral-500 max-w-sm text-center">
        Try adjusting your filters or browse other categories
      </p>
    </div>
  );

  return (
    <section className={className}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
          <div className="min-w-0">
            {title && (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-neutral-500 mt-1 hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>

          {showViewAll && (viewAllLink || onViewAll) && (
            <>
              {viewAllLink ? (
                <Link
                  href={viewAllLink}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors duration-200 whitespace-nowrap group shrink-0">
                  View All
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              ) : (
                <button
                  onClick={onViewAll}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors duration-200 whitespace-nowrap group shrink-0">
                  View All
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
        {loading && products.length === 0
          ? renderSkeleton()
          : products.length === 0
            ? renderEmpty()
            : products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className="h-full"
                />
              ))}
      </div>

      {/* Loading More */}
      {loading && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 mt-4">
          {renderSkeleton().slice(0, 4)}
        </div>
      )}

      {/* Load More Button */}
      {!loading && hasMore && onLoadMore && products.length > 0 && (
        <div className="flex justify-center mt-8 md:mt-10">
          <button
            onClick={onLoadMore}
            className="px-8 py-2.5 text-xs font-medium tracking-wide uppercase text-neutral-600 border border-neutral-200 rounded-full hover:border-neutral-900 hover:text-neutral-900 transition-all duration-200">
            Load More
          </button>
        </div>
      )}

      {/* End of Results with View All CTA */}
      {!loading && !hasMore && products.length > 0 && showViewAll && (
        <div className="mt-10 md:mt-14">
          {/* Divider */}
          <div className="relative flex items-center mb-8">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="px-4 text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              Continue Shopping
            </span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Focused View All Button */}
          <div className="flex justify-center">
            {viewAllLink ? (
              <Link
                href={viewAllLink}
                className="group relative inline-flex items-center justify-center gap-2 h-12 px-10 text-xs font-medium tracking-[0.15em] uppercase text-neutral-900 bg-white transition-all duration-300 overflow-hidden rounded-none">
                {/* Border animation */}
                <span className="absolute inset-0 z-0">
                  <span className="absolute top-0 h-[2px] bg-gradient-to-r from-transparent via-neutral-400 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
                  <span className="absolute right-0 w-[2px] h-0 bg-gradient-to-b from-transparent via-neutral-400 to-transparent group-hover:h-full transition-all duration-500 ease-out" />
                  <span className="absolute bottom-0 h-[2px] bg-gradient-to-l from-transparent via-neutral-400 to-transparent animate-[shimmer_3s_ease-in-out_infinite_reverse]" />
                  <span className="absolute left-0 w-[2px] h-0 bg-gradient-to-t from-transparent via-neutral-400 to-transparent group-hover:h-full transition-all duration-500 ease-out delay-200" />
                </span>
                {/* Static border */}
                <span className="absolute inset-0 border border-neutral-300 group-hover:border-neutral-400 transition-colors duration-300 z-0" />
                {/* Hover fill */}
                <span className="absolute inset-0 bg-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                {/* Content */}
                <span className="relative z-10 text-neutral-900 group-hover:text-white transition-colors duration-300">
                  View All Products
                </span>
                <ArrowRight className="relative z-10 w-4 h-4 text-neutral-900 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            ) : onViewAll ? (
              <button
                onClick={onViewAll}
                className="group relative inline-flex items-center justify-center gap-2 h-12 px-10 text-xs font-medium tracking-[0.15em] uppercase text-neutral-900 bg-white transition-all duration-300 overflow-hidden rounded-none">
                {/* Border animation */}
                <span className="absolute inset-0 z-0">
                  <span className="absolute top-0 h-[2px] bg-gradient-to-r from-transparent via-neutral-400 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
                  <span className="absolute right-0 w-[2px] h-0 bg-gradient-to-b from-transparent via-neutral-400 to-transparent group-hover:h-full transition-all duration-500 ease-out" />
                  <span className="absolute bottom-0 h-[2px] bg-gradient-to-l from-transparent via-neutral-400 to-transparent animate-[shimmer_3s_ease-in-out_infinite_reverse]" />
                  <span className="absolute left-0 w-[2px] h-0 bg-gradient-to-t from-transparent via-neutral-400 to-transparent group-hover:h-full transition-all duration-500 ease-out delay-200" />
                </span>
                {/* Static border */}
                <span className="absolute inset-0 border border-neutral-300 group-hover:border-neutral-400 transition-colors duration-300 z-0" />
                {/* Hover fill */}
                <span className="absolute inset-0 bg-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                {/* Content */}
                <span className="relative z-10 text-neutral-900 group-hover:text-white transition-colors duration-300">
                  View All Products
                </span>
                <ArrowRight className="relative z-10 w-4 h-4 text-neutral-900 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </button>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
