/**
 * Best Sellers Cache Utilities
 * Manages localStorage caching for best seller product data with 30-minute TTL.
 * Each page is cached independently so subsequent visits are instant.
 */

import { ProductType } from "@/data/types";

export interface BestSellerPageData {
  products: ProductType[];
  totalProducts: number;
  totalPages: number;
  page: number;
}

export interface BestSellerCacheEntry {
  data: BestSellerPageData;
  cachedAt: string;
  expiresAt: string;
}

const CACHE_PREFIX = "best_sellers_page_";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Get cached best seller page from localStorage
 */
export function getCachedBestSellerPage(
  page: number,
): BestSellerPageData | null {
  if (typeof window === "undefined") return null;

  try {
    const key = `${CACHE_PREFIX}${page}`;
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const parsed = JSON.parse(cached) as BestSellerCacheEntry;
    const now = Date.now();

    if (now < new Date(parsed.expiresAt).getTime()) {
      return parsed.data;
    }

    localStorage.removeItem(key);
    return null;
  } catch (error) {
    console.error("[BestSellerCache] Error reading cache:", error);
    return null;
  }
}

/**
 * Set cached best seller page in localStorage
 */
export function setCachedBestSellerPage(
  page: number,
  data: BestSellerPageData,
): boolean {
  if (typeof window === "undefined") return false;

  try {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + CACHE_DURATION);

    const entry: BestSellerCacheEntry = {
      data,
      cachedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };

    const key = `${CACHE_PREFIX}${page}`;
    localStorage.setItem(key, JSON.stringify(entry));
    return true;
  } catch (error) {
    console.error("[BestSellerCache] Error setting cache:", error);
    return false;
  }
}

/**
 * Clear all cached best seller pages
 */
export function clearBestSellerCache(): void {
  if (typeof window === "undefined") return;

  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(CACHE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.error("[BestSellerCache] Error clearing cache:", error);
  }
}
