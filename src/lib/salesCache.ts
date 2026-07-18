/**
 * Sales / Deals Cache Utilities
 * Manages localStorage caching for discounted product data with 30-minute TTL.
 * Each page+source combination is cached independently.
 */

import { ProductType } from "@/data/types";

export interface SalesPageData {
  products: ProductType[];
  totalProducts: number;
  totalPages: number;
  page: number;
}

export interface SalesCacheEntry {
  data: SalesPageData;
  cachedAt: string;
  expiresAt: string;
}

const CACHE_PREFIX = "sales_page_";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Get cached sales page from localStorage
 */
export function getCachedSalesPage(
  page: number,
  source: string = "all",
): SalesPageData | null {
  if (typeof window === "undefined") return null;

  try {
    const key = `${CACHE_PREFIX}${source}:${page}`;
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const parsed = JSON.parse(cached) as SalesCacheEntry;
    const now = Date.now();

    if (now < new Date(parsed.expiresAt).getTime()) {
      return parsed.data;
    }

    localStorage.removeItem(key);
    return null;
  } catch (error) {
    console.error("[SalesCache] Error reading cache:", error);
    return null;
  }
}

/**
 * Set cached sales page in localStorage
 */
export function setCachedSalesPage(
  page: number,
  source: string,
  data: SalesPageData,
): boolean {
  if (typeof window === "undefined") return false;

  try {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + CACHE_DURATION);

    const entry: SalesCacheEntry = {
      data,
      cachedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };

    const key = `${CACHE_PREFIX}${source}:${page}`;
    localStorage.setItem(key, JSON.stringify(entry));
    return true;
  } catch (error) {
    console.error("[SalesCache] Error setting cache:", error);
    return false;
  }
}

/**
 * Clear all cached sales pages
 */
export function clearSalesCache(): void {
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
    console.error("[SalesCache] Error clearing cache:", error);
  }
}
