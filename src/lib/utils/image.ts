import { Variation, ProductType } from "@/data/types";

/**
 * Get the appropriate image for a product variant
 *
 * Priority:
 * 1. Variant-specific image (if available)
 * 2. Variant's first image from images array
 * 3. Product thumbnail (fallback)
 */
export function getVariantImage(
  variant: Variation | null | undefined,
  product: ProductType | null | undefined
): string {
  if (!variant || !product) {
    return product?.thumbnail || "";
  }

  if (variant.image) {
    return variant.image;
  }

  if (variant.images && variant.images.length > 0) {
    return variant.images[0];
  }

  return product.thumbnail || "";
}

/**
 * Get all images for a variant (for image gallery)
 */
export function getVariantImages(
  variant: Variation | null | undefined,
  product: ProductType | null | undefined
): string[] {
  if (!product) {
    return [];
  }

  if (variant?.images && variant.images.length > 0) {
    return variant.images;
  }

  if (product.images && product.images.length > 0) {
    return [product.thumbnail, ...product.images];
  }

  return product.thumbnail ? [product.thumbnail] : [];
}
