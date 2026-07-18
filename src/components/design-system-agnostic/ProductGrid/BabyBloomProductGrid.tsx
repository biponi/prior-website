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

export default function BabyBloomProductGrid({
  products,
  title,
  subtitle,
  className = "",
  loading = false,
}: BabyBloomProductGridProps) {
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
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='bg-white rounded-xl p-3 animate-pulse'>
                <div className='aspect-[3/4] bg-[#FDF5F8] rounded-lg mb-3' />
                <div className='h-10 bg-gray-200 rounded mb-2' />
                <div className='h-4 bg-gray-200 rounded w-3/4 mb-2' />
                <div className='h-5 bg-gray-200 rounded w-1/2 mb-3' />
                <div className='h-10 bg-[#CD2A75]/20 rounded-lg' />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-[#F8F8F8] py-6 px-4", className)}>
      <div className='container mx-auto'>
        {/* Section Header */}
        {title && (
          <div className='text-center mb-6'>
            <h2 className='text-lg md:text-xl font-bold text-[#191C1F] tracking-tight mb-1'>
              {title}
            </h2>
            {subtitle && (
              <p className='text-sm text-[#A3A3A3]'>{subtitle}</p>
            )}
            <div className='w-12 h-0.5 bg-[#CD2A75] mx-auto mt-3 rounded-full' />
          </div>
        )}

        {/* Product Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'>
          {products.map((product) => (
            <div key={product.id}>
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
