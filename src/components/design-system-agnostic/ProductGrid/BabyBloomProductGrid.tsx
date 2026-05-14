import React from "react";
import ProductCard from "@/components/new-ui/ProductCard";
import { Product } from "@/lib/adapters/productAdapter";
import { cn } from "@/lib/utils";

interface BabyBloomProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  className?: string;
  loading?: boolean;
}

/**
 * Baby Bloom Product Grid Component
 *
 * Features:
 * - 2-column grid with 1px separator
 * - Pink theme accents
 * - Section titles with pink bottom border
 * - Baby Bloom ProductCard variant
 */
export default function BabyBloomProductGrid({
  products,
  title,
  subtitle,
  className = "",
  loading = false,
}: BabyBloomProductGridProps) {
  // Skeleton loader
  if (loading) {
    return (
      <div className={cn("bg-[#F8F8F8] py-8 px-4", className)}>
        <div className='container mx-auto'>
          {title && (
            <div className='text-center mb-6'>
              <div className='h-6 bg-gray-200 rounded w-48 mx-auto mb-2 animate-pulse' />
              <div className='h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse' />
            </div>
          )}
          <div className='grid grid-cols-2 gap-[1px] bg-[#E3E3E3] rounded-lg overflow-hidden'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='bg-white p-3 animate-pulse'>
                <div className='aspect-[4/3] bg-[#FDF5F8] rounded-lg mb-3' />
                <div className='h-10 bg-gray-200 rounded mb-2' />
                <div className='h-4 bg-gray-200 rounded w-3/4 mb-2' />
                <div className='h-5 bg-gray-200 rounded w-1/2 mb-3' />
                <div className='h-10 bg-[#CD2A75]/30 rounded' />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-[#F8F8F8] py-8 px-4", className)}>
      <div className='container mx-auto'>
        {/* Section Header */}
        {title && (
          <div className='text-center mb-6'>
            <h2 className='text-sm md:text-base font-bold text-[#191C1F] uppercase tracking-[0.06em] mb-2'>
              {title}
            </h2>
            {subtitle && <p className='text-xs text-[#A3A3A3]'>{subtitle}</p>}
            {/* Pink Bottom Border */}
            <div className='w-16 h-0.5 bg-[#CD2A75] mx-auto mt-3' />
          </div>
        )}

        {/* Product Grid with 1px Separator */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] bg-[#E3E3E3] rounded-lg overflow-hidden'>
          {products.map((product) => (
            <div key={product.id} className='bg-white'>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-sm text-[#A3A3A3]'>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
