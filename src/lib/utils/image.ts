import { Variation, ProductType } from "@/data/types";

/**
 * Get the appropriate image for a product variant
 *
 * Priority:
 * 1. Variant-specific image (if available)
 * 2. Variant's first image from images array
 * 3. Product thumbnail (fallback)
 *
 * @param variant - The selected variation
 * @param product - The product data
 * @returns Image URL to display
 */
export function getVariantImage(
  variant: Variation | null | undefined,
  product: ProductType | null | undefined
): string {
  // If no variant, return product thumbnail
  if (!variant || !product) {
    return product?.thumbnail || "";
  }

  // 1. Check if variant has its own image
  if (variant.image) {
    return variant.image;
  }

  // 2. Check if variant has images array
  if (variant.images && variant.images.length > 0) {
    return variant.images[0];
  }

  // 3. Fallback to product thumbnail
  return product.thumbnail || "";
}

/**
 * Get all images for a variant (for image gallery)
 *
 * @param variant - The selected variation
 * @param product - The product data
 * @returns Array of image URLs
 */
export function getVariantImages(
  variant: Variation | null | undefined,
  product: ProductType | null | undefined
): string[] {
  if (!product) {
    return [];
  }

  // If variant has specific images, return those
  if (variant?.images && variant.images.length > 0) {
    return variant.images;
  }

  // Otherwise, return product-level images
  if (product.images && product.images.length > 0) {
    return [product.thumbnail, ...product.images];
  }

  // Fallback to just thumbnail
  return product.thumbnail ? [product.thumbnail] : [];
}
