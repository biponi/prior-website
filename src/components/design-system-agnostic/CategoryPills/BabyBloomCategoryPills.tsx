"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface BabyBloomCategoryPillsProps {
  categories: Category[];
  activeCategory?: string;
  className?: string;
}

/**
 * Baby Bloom Category Pills Component
 *
 * Features:
 * - Horizontal scrollable category pills
 * - Pink theme (#CD2A75)
 * - Active state with pink fill
 * - Mobile-first design
 */
export default function BabyBloomCategoryPills({
  categories,
  activeCategory,
  className = "",
}: BabyBloomCategoryPillsProps) {
  return (
    <div className={cn("bg-white border-b border-ds-border", className)}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {/* All Products Pill */}
          <Link
            href="/collections"
            className={cn(
              "flex-shrink-0 py-[4px] px-[11px] rounded-[20px] text-xs font-medium border transition-all whitespace-nowrap",
              !activeCategory || activeCategory === "all"
                ? "bg-[#CD2A75] text-white border-[#CD2A75]"
                : "bg-white text-[#191C1F] border-ds-border hover:border-[#CD2A75] hover:text-[#CD2A75]"
            )}
          >
            All Products
          </Link>

          {/* Category Pills */}
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={cn(
                "flex-shrink-0 py-[4px] px-[11px] rounded-[20px] text-xs font-medium border transition-all whitespace-nowrap",
                activeCategory === category.id
                  ? "bg-[#CD2A75] text-white border-[#CD2A75]"
                  : "bg-white text-[#191C1F] border-ds-border hover:border-[#CD2A75] hover:text-[#CD2A75]"
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
