"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowUpDown,
  PackageOpen,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/new-ui/ProductCard";
import ProductFilters from "@/components/new-ui/ProductFilters";
import { adaptProductsToNewFormat } from "@/lib/adapters/productAdapter";
import useProductFetch from "@/hooks/useProductFetch";
import { usePageState } from "@/context/PageStateContext";
import { cn } from "@/lib/utils";
import ProductFiltersSheet from "@/components/new-ui/ProductFilterSheet";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-az", label: "Name: A to Z" },
];

function sortProducts(products: any[], sortBy: string) {
  const sorted = [...products];
  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-az":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "newest":
    default:
      return sorted;
  }
}

export default function CollectionsPage() {
  const {
    products,
    loading,
    totalPages,
    currentPage,
    distictFilterValues,
    setFilterData,
    filterData,
    handleLoadMore,
  } = useProductFetch();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { state, setState } = usePageState();

  useEffect(() => {
    window.scrollTo(0, state.scrollPosition);

    if (state.filterData) {
      // @ts-ignore
      setFilterData(state.filterData);
    }

    if (state.currentPage > 1) {
      // @ts-ignore
      handleLoadMore(state.currentPage - 1);
    }
    // eslint-disable-next-line
  }, []);

  const saveNavigationState = () => {
    setState((prev) => ({
      ...prev,
      scrollPosition: window.scrollY,
      filterData,
      currentPage,
    }));
  };

  const handleFilterChange = (newFilterData: any) => {
    setFilterData(newFilterData);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setFilterData({ categoryId: "", color: "", size: "", price: "" });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filterData?.categoryId) count++;
    if (filterData?.color)
      count += filterData.color.split(",").filter(Boolean).length;
    if (filterData?.size)
      count += filterData.size.split(",").filter(Boolean).length;
    return count;
  };

  const getActiveFilterLabels = () => {
    const labels: { key: string; label: string; type: string }[] = [];
    if (filterData?.categoryId) {
      const cat = distictFilterValues.categories.find(
        (c) => c.id === filterData.categoryId,
      );
      labels.push({
        key: "category",
        label: cat?.name || filterData.categoryId,
        type: "categoryId",
      });
    }
    if (filterData?.color) {
      filterData.color
        .split(",")
        .filter(Boolean)
        .forEach((c: string) => {
          labels.push({ key: `color-${c}`, label: c, type: "color" });
        });
    }
    if (filterData?.size) {
      filterData.size
        .split(",")
        .filter(Boolean)
        .forEach((s: string) => {
          labels.push({ key: `size-${s}`, label: s, type: "size" });
        });
    }
    return labels;
  };

  const removeFilter = (type: string, value: string) => {
    if (type === "categoryId") {
      setFilterData((prev: any) => ({ ...prev, categoryId: "" }));
    } else if (type === "color") {
      setFilterData((prev: any) => ({
        ...prev,
        color: prev.color
          .split(",")
          .filter((c: string) => c !== value)
          .join(","),
      }));
    } else if (type === "size") {
      setFilterData((prev: any) => ({
        ...prev,
        size: prev.size
          .split(",")
          .filter((s: string) => s !== value)
          .join(","),
      }));
    }
  };

  const adaptedProducts = adaptProductsToNewFormat(products || []);
  const sortedProducts = useMemo(
    () => sortProducts(adaptedProducts, sortBy),
    [adaptedProducts, sortBy],
  );
  const activeFilterCount = getActiveFilterCount();
  const activeFilterLabels = getActiveFilterLabels();
  const hasFiltersAvailable =
    distictFilterValues.categories.length > 0 ||
    distictFilterValues.colors.length > 0 ||
    distictFilterValues.sizes.length > 0;

  const isLoadingInitial = loading && (!products || products.length === 0);
  const hasProducts = products && products.length > 0;
  const isEmpty = !loading && products && products.length === 0;
  const hasMore = currentPage < totalPages;

  return (
    <div className='min-h-screen bg-[#fafafa]'>
      {/* Hero Header */}
      <div className='relative overflow-hidden bg-white border-b border-neutral-100'>
        {/* Ambient brand-tinted glow, kept quiet so it reads as atmosphere rather than decoration */}
        <div className='absolute inset-0 bg-gradient-to-br from-[#CD2A75]/[0.04] via-transparent to-[#CD2A75]/[0.02]' />
        <div className='absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#CD2A75]/[0.06] blur-3xl pointer-events-none' />

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 relative'>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}>
            <span className='inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#CD2A75]'>
              <Sparkles className='w-3.5 h-3.5' />
              The Collection
            </span>
            <h1 className='mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold tracking-tight text-neutral-900'>
              All Products
            </h1>
            <p className='mt-2 text-neutral-500 text-sm md:text-base max-w-md'>
              Discover our complete collection of premium products
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8'>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-10'>
          {/* Desktop Filters Sidebar */}
          {hasFiltersAvailable && (
            <aside className='hidden lg:block w-72 xl:w-80 flex-shrink-0'>
              <div className='sticky top-24'>
                <ProductFilters
                  sizes={distictFilterValues.sizes.filter((i) => i !== "")}
                  colors={distictFilterValues.colors.filter((i) => i !== "")}
                  categories={distictFilterValues.categories}
                  filterData={filterData}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </aside>
          )}

          {/* Products Section */}
          <main className='flex-1 min-w-0'>
            {/* Toolbar */}
            <div className='flex items-center justify-between gap-3 pb-4 mb-4 md:mb-6 border-b border-neutral-100'>
              <div className='flex items-center gap-3 min-w-0'>
                {/* Mobile Filter */}
                {hasFiltersAvailable && (
                  <ProductFiltersSheet
                    sizes={distictFilterValues.sizes.filter((i) => i !== "")}
                    colors={distictFilterValues.colors.filter((i) => i !== "")}
                    categories={distictFilterValues.categories}
                    filterData={filterData}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                  />
                )}

                {/* Results count */}
                {!isLoadingInitial && (
                  <p className='text-sm text-neutral-500 hidden sm:block truncate'>
                    <span className='font-medium text-neutral-800'>
                      {products?.length || 0}
                    </span>{" "}
                    products
                  </p>
                )}
              </div>

              <div className='flex items-center gap-2 shrink-0'>
                {/* Sort */}
                <div className='relative'>
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className='flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 px-2.5 sm:px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors'>
                    <ArrowUpDown className='w-3.5 h-3.5' />
                    <span className='hidden sm:inline'>
                      {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        sortOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {sortOpen && (
                      <>
                        <div
                          className='fixed inset-0 z-40'
                          onClick={() => setSortOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -4, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className='absolute right-0 top-full mt-1 z-50 w-48 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 overflow-hidden'>
                          {SORT_OPTIONS.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setSortBy(option.value);
                                setSortOpen(false);
                              }}
                              className={cn(
                                "w-full text-left px-4 py-2.5 text-sm transition-colors",
                                sortBy === option.value
                                  ? "bg-[#CD2A75]/5 text-[#CD2A75] font-medium"
                                  : "text-neutral-600 hover:bg-neutral-50",
                              )}>
                              {option.label}
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            <AnimatePresence>
              {activeFilterLabels.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className='flex flex-wrap gap-2 mb-4 overflow-hidden'>
                  {activeFilterLabels.map((f) => (
                    <motion.button
                      key={f.key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => removeFilter(f.type, f.label)}
                      className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#CD2A75]/8 text-[#CD2A75] text-xs font-medium rounded-full hover:bg-[#CD2A75]/15 transition-colors group'>
                      {f.label}
                      <X className='w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity' />
                    </motion.button>
                  ))}
                  {activeFilterCount > 1 && (
                    <button
                      onClick={handleClearFilters}
                      className='inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-800 rounded-full hover:bg-neutral-100 transition-colors'>
                      Clear all
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Initial Loading - Skeleton */}
            {isLoadingInitial && (
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6'>
                {Array.from({ length: 9 }).map((_, i) => (
                  <SkeletonCard key={i} index={i} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {isEmpty && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='flex flex-col items-center justify-center py-16 sm:py-24 px-4 bg-white rounded-2xl border border-neutral-100'>
                <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-50 flex items-center justify-center mb-5'>
                  <PackageOpen className='w-8 h-8 sm:w-10 sm:h-10 text-neutral-300' />
                </div>
                <h3 className='text-lg font-medium text-neutral-900 mb-2 text-center'>
                  No products found
                </h3>
                <p className='text-neutral-500 mb-6 text-sm max-w-sm text-center'>
                  Try adjusting your filters or search criteria to find what
                  you&apos;re looking for
                </p>
                {activeFilterCount > 0 && (
                  <Button
                    variant='outline'
                    onClick={handleClearFilters}
                    className='rounded-full px-6'>
                    Clear all filters
                  </Button>
                )}
              </motion.div>
            )}

            {/* Products */}
            {hasProducts && (
              <>
                {/* Grid View */}
                {viewMode === "grid" && (
                  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6'>
                    {sortedProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: i < 12 ? i * 0.04 : 0,
                          ease: "easeOut",
                        }}
                        onClick={saveNavigationState}>
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* List View */}
                {viewMode === "list" && (
                  <div className='space-y-3 sm:space-y-4'>
                    {sortedProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: i < 10 ? i * 0.04 : 0,
                          ease: "easeOut",
                        }}>
                        <Link
                          href={`/collections/${product.id}`}
                          onClick={saveNavigationState}>
                          <ProductListCard product={product} />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Load More */}
                {hasMore && (
                  <div className='flex justify-center mt-10 mb-4'>
                    <Button
                      onClick={() => handleLoadMore()}
                      disabled={loading}
                      variant='outline'
                      className='relative rounded-full px-8 h-11 text-sm font-medium border-neutral-200 hover:border-[#CD2A75]/40 hover:bg-[#CD2A75]/[0.04] hover:text-[#CD2A75] transition-all duration-300 disabled:opacity-60'>
                      {loading ? (
                        <span className='flex items-center gap-2'>
                          <span className='w-4 h-4 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin' />
                          Loading...
                        </span>
                      ) : (
                        "Load More"
                      )}
                    </Button>
                  </div>
                )}

                {/* End of Results */}
                {!loading && !hasMore && (
                  <div className='flex items-center gap-4 mt-10 mb-4'>
                    <div className='flex-1 h-px bg-neutral-200' />
                    <p className='text-xs text-neutral-400 tracking-wider uppercase whitespace-nowrap'>
                      You&apos;ve seen it all
                    </p>
                    <div className='flex-1 h-px bg-neutral-200' />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

/* ─── Skeleton Loader ─────────────────────────────────────────────── */

function SkeletonCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className='bg-white rounded-xl border border-neutral-100 overflow-hidden'>
      <div className='aspect-[3/4] bg-neutral-100 animate-pulse relative'>
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]' />
      </div>
      <div className='p-3 space-y-2.5'>
        <div className='h-3 bg-neutral-100 rounded-full w-3/4 animate-pulse' />
        <div className='h-3 bg-neutral-100 rounded-full w-1/2 animate-pulse' />
        <div className='flex items-center gap-2 pt-1'>
          <div className='h-4 bg-neutral-100 rounded-full w-16 animate-pulse' />
          <div className='h-3 bg-neutral-100 rounded-full w-10 animate-pulse' />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Product List Card ───────────────────────────────────────────── */

function ProductListCard({ product }: { product: any }) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div className='group bg-white rounded-xl sm:rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-[0_12px_32px_-16px_rgba(205,42,117,0.25)] hover:border-[#CD2A75]/20 transition-all duration-300'>
      <div className='flex flex-col sm:flex-row gap-4 p-3 sm:p-4 md:p-5'>
        {/* Image */}
        <div className='relative w-full sm:w-44 h-52 sm:h-44 flex-shrink-0 overflow-hidden bg-neutral-50 rounded-lg sm:rounded-xl'>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className='object-cover group-hover:scale-105 transition-transform duration-500'
              sizes='(max-width: 640px) 100vw, 176px'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-neutral-300'>
              <PackageOpen className='w-8 h-8' />
            </div>
          )}
          {discount > 0 && (
            <div className='absolute top-2 right-2 bg-[#CD2A75] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm shadow-[#CD2A75]/30'>
              -{discount}%
            </div>
          )}
        </div>

        {/* Info */}
        <div className='flex-1 flex flex-col justify-between min-w-0'>
          <div>
            <h3 className='text-base font-medium text-neutral-900 mb-1 group-hover:text-[#CD2A75] transition-colors line-clamp-1'>
              {product.name}
            </h3>

            {product.description && (
              <p className='text-sm text-neutral-500 mb-3 line-clamp-2'>
                {product.description}
              </p>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className='flex items-center gap-2 mb-2'>
                <div className='flex gap-1'>
                  {product.colors.slice(0, 6).map((color: any, idx: number) => (
                    <div
                      key={idx}
                      className='w-3.5 h-3.5 rounded-full border border-neutral-200 ring-1 ring-black/5'
                      style={{ backgroundColor: color.value || "#ccc" }}
                      title={color.name}
                    />
                  ))}
                  {product.colors.length > 6 && (
                    <span className='text-[10px] text-neutral-400 ml-0.5'>
                      +{product.colors.length - 6}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className='flex items-center gap-1.5 flex-wrap'>
                {product.sizes.slice(0, 5).map((size: any, idx: number) => (
                  <span
                    key={idx}
                    className='text-[10px] bg-neutral-50 text-neutral-500 px-1.5 py-0.5 rounded border border-neutral-100'>
                    {size.name}
                  </span>
                ))}
                {product.sizes.length > 5 && (
                  <span className='text-[10px] text-neutral-400'>
                    +{product.sizes.length - 5}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Price */}
          <div className='flex items-center justify-between mt-3 pt-3 border-t border-neutral-50 gap-2'>
            <div className='flex items-baseline gap-2 flex-wrap'>
              <span className='text-lg font-semibold text-neutral-900'>
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className='text-sm text-neutral-400 line-through'>
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                  <span className='text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded'>
                    Save ৳
                    {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            <span className='text-xs text-[#CD2A75] font-medium sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
              View Details →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
