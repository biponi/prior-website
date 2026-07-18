"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/lib/adapters/productAdapter";
import { cn } from "@/lib/utils";
import QuickAddSheet from "./QuickAddSheet";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
}) => {
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishBump, setWishBump] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const isOutOfStock = product.stock === 0 || !product.inStock;
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) *
          100,
      )
    : 0;

  const formatPrice = (price: number) => {
    return typeof price === "number"
      ? `৳${price.toLocaleString()}`
      : `৳${Number(price).toLocaleString()}`;
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickAddOpen(true);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    setWishBump(true);
    window.setTimeout(() => setWishBump(false), 320);
  };

  return (
    <>
      <div
        className={cn(
          "group relative transition-transform duration-300 ease-out",
          "md:hover:-translate-y-1",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div className='relative'>
          {/* Image Container */}
          <div
            className={cn(
              "relative aspect-[3/4] bg-[#FDF5F8] rounded-2xl overflow-hidden",
              "ring-1 ring-black/[0.04] transition-shadow duration-500 ease-out",
              "shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
              "group-hover:shadow-[0_24px_48px_-18px_rgba(205,42,117,0.4)]",
              "group-focus-within:ring-2 group-focus-within:ring-[#CD2A75]",
            )}>
            {/* Skeleton while loading */}
            {!imageLoaded && (
              <div className='absolute inset-0 overflow-hidden bg-[#FDF5F8]'>
                <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent' />
              </div>
            )}

            <Link
              href={`/collections/${product.slug || product.id}`}
              className='absolute inset-0 z-0 focus:outline-none'>
              <Image
                src={product.image}
                alt={product.name}
                fill
                quality={90}
                sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw'
                className={cn(
                  "object-cover object-center transition-transform duration-700 ease-out will-change-transform motion-reduce:transition-none",
                  isHovered ? "scale-[1.07]" : "scale-100",
                  imageLoaded ? "opacity-100" : "opacity-0",
                )}
                priority={isMobile}
                onLoad={() => setImageLoaded(true)}
              />
            </Link>

            {/* Gradient overlay on hover, anchors the floating quick-add button */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent transition-opacity duration-500 pointer-events-none",
                isHovered && !isMobile ? "opacity-100" : "opacity-0",
              )}
            />

            {/* Top Badges */}
            <div className='absolute top-0 left-0 right-0 p-3 flex justify-between items-start z-10'>
              <div className='flex flex-col gap-1.5'>
                {hasDiscount && discountPercentage >= 5 && (
                  <span className='bg-[#CD2A75] text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md shadow-sm shadow-[#CD2A75]/30 inline-block w-fit'>
                    -{discountPercentage}%
                  </span>
                )}
                {!hasDiscount && product.isNew && (
                  <span className='bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md shadow-sm inline-block w-fit'>
                    New
                  </span>
                )}
                {!hasDiscount && !product.isNew && product.isHot && (
                  <span className='bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md shadow-sm inline-block w-fit'>
                    Hot
                  </span>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={handleWishlist}
                className={cn(
                  "p-2 rounded-full transition-all duration-300 z-10 backdrop-blur-sm",
                  isWishlisted
                    ? "bg-[#CD2A75] text-white shadow-lg shadow-[#CD2A75]/30"
                    : "bg-white/85 text-gray-500 hover:text-[#CD2A75] hover:bg-white hover:scale-110 shadow-sm",
                  wishBump && "scale-125",
                )}
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                aria-pressed={isWishlisted}>
                <Heart
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isWishlisted && "fill-current",
                  )}
                />
              </button>
            </div>

            {/* Out of Stock Overlay */}
            {isOutOfStock && (
              <div className='absolute inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center z-20'>
                <div className='bg-white/90 px-5 py-2.5 rounded-lg shadow-md'>
                  <span className='text-xs font-bold text-gray-700 uppercase tracking-widest'>
                    Sold Out
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className='mt-3 md:mt-4 px-0.5'>
            <Link
              href={`/collections/${product.slug || product.id}`}
              className='block focus:outline-none'>
              {product.category && (
                <span className='text-[10px] md:text-[11px] font-semibold uppercase tracking-wider text-[#CD2A75]/70'>
                  {product.category}
                </span>
              )}

              <h3 className='mt-0.5 text-[12.5px] md:text-sm min-h-[2rem] md:min-h-[2.5rem] font-semibold uppercase text-gray-900 line-clamp-2 leading-[1.4] tracking-wide group-hover:text-[#CD2A75] transition-colors duration-300'>
                {product.name}
              </h3>

              <div className='flex items-baseline gap-2 mt-1.5 md:mt-2'>
                {hasDiscount ? (
                  <>
                    <span className='text-base md:text-lg font-bold text-[#CD2A75]'>
                      {formatPrice(product.price)}
                    </span>
                    <span className='text-xs md:text-sm text-gray-400 line-through'>
                      {formatPrice(product.originalPrice!)}
                    </span>
                  </>
                ) : (
                  <span className='text-base md:text-lg font-bold text-gray-900'>
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </Link>

            {/* Quick Add — always visible full-width button, outside the link */}
            {!isOutOfStock && (
              <div className='mt-2.5 w-full'>
                <button
                  onClick={handleQuickAdd}
                  className='w-full h-10 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#CD2A75] text-white hover:text-[#CD2A75] hover:bg-white hover:border hover:border-[#CD2A75]  active:scale-[0.98] shadow-sm transition-transform duration-150 flex items-center justify-center gap-2'
                  aria-label='Quick add to cart'>
                  <ShoppingCart className='w-4 h-4' />
                  Quick Add
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickAddSheet
        productId={product.id}
        open={quickAddOpen}
        onOpenChange={setQuickAddOpen}
      />
    </>
  );
};

export default ProductCard;
