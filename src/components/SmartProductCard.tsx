"use client";

import ProductCard from "@/components/new-ui/ProductCard";
import { Product } from "@/lib/adapters/productAdapter";

interface SmartProductCardProps {
  product: Product;
  className?: string;
  loading?: boolean;
}

/**
 * Smart Product Card Component
 *
 * Dynamically uses the appropriate ProductCard variant based on the active design system.
 * For Baby Bloom, it uses the "babybloom" variant of the existing ProductCard component.
 * For other systems, it uses the default "editorial" variant.
 *
 * This approach is more efficient than code splitting since ProductCard already
 * handles all variants internally.
 */
export default function SmartProductCard({
  product,
  className = "",
  loading = false,
}: SmartProductCardProps) {
  return <ProductCard product={product} className={className} />;
}
