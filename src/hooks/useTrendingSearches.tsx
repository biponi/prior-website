/**
 * Trending Searches Hook
 * Fetches and caches trending search queries with SWR strategy
 */

import { useState, useEffect, useCallback, useRef } from "react";
import {
  getCachedTrending,
  setCachedTrending,
  isCacheStale,
} from "@/lib/trendingCache";

export interface TrendingItem {
  query: string;
  frequency: number;
  growth: string;
  rank: number;
  successRate?: number;
  calculatedAt?: string;
}

interface TrendingResponse {
  success: boolean;
  data: TrendingItem[];
  meta?: {
    source: string;
    cachedAt: string;
    cacheExpiresIn: number;
    period: string;
  };
}

interface UseTrendingSearchesResult {
  trending: TrendingItem[];
  loading: boolean;
  error: string | null;
  source: string;
  refresh: () => Promise<void>;
}

// Track pending requests to prevent duplicates
const pendingRequests = new Set<string>();

const STATIC_FALLBACK: TrendingItem[] = [
  { query: "Baby rompers", frequency: 0, growth: "+0%", rank: 1 },
  { query: "Feeding bottles", frequency: 0, growth: "+0%", rank: 2 },
  { query: "Diaper bags", frequency: 0, growth: "+0%", rank: 3 },
  { query: "Soft toys", frequency: 0, growth: "+0%", rank: 4 },
  { query: "Nursing covers", frequency: 0, growth: "+0%", rank: 5 },
  { query: "Baby shoes", frequency: 0, growth: "+0%", rank: 6 },
  { query: "Strollers", frequency: 0, growth: "+0%", rank: 7 },
  { query: "Baby monitors", frequency: 0, growth: "+0%", rank: 8 },
];

export function useTrendingSearches(): UseTrendingSearchesResult {
  const [trending, setTrending] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string>("initial");
  const isLoadingRef = useRef(false);

  // Fetch trending searches from API
  const fetchTrending = useCallback(async (forceRefresh = false) => {
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL || "https://shop.priorbd.com";
    const requestKey = `${API_URL}/prior/search/trending${forceRefresh ? "?refresh=true" : ""}`;

    // Check if identical request is already in progress
    if (pendingRequests.has(requestKey)) {
      console.log("[useTrendingSearches] Request already in progress, skipping duplicate call");
      return;
    }

    // Mark this request as pending
    pendingRequests.add(requestKey);

    try {
      // Only set loading to true if we're not already loading
      if (!isLoadingRef.current) {
        setLoading(true);
      }
      setError(null);

      const refreshParam = forceRefresh ? "?refresh=true" : "";
      const response = await fetch(
        `${API_URL}/prior/search/trending${refreshParam}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: TrendingResponse = await response.json();

      if (result.success && result.data && result.data.length > 0) {
        setTrending(result.data);
        setSource(result.meta?.source || "api");
        setCachedTrending(result.data);
      } else {
        // Use cached data if API returns empty
        const cached = getCachedTrending();
        if (cached) {
          setTrending(cached);
          setSource("cache_fallback");
        } else {
          setTrending(STATIC_FALLBACK);
          setSource("static_fallback");
        }
      }
    } catch (err) {
      console.error("[useTrendingSearches] Error fetching trending:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch trending searches",
      );

      // Try to use cached data on error
      const cached = getCachedTrending();
      if (cached) {
        setTrending(cached);
        setSource("cache_fallback");
      } else {
        setTrending(STATIC_FALLBACK);
        setSource("static_fallback");
      }
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
      // Remove this request from pending set
      pendingRequests.delete(requestKey);
    }
  }, []);

  // Manual refresh function
  const refresh = useCallback(async () => {
    await fetchTrending(true);
  }, [fetchTrending]);

  // Store fetchTrending in a ref to avoid dependency issues
  const fetchTrendingRef = useRef(fetchTrending);
  fetchTrendingRef.current = fetchTrending;

  useEffect(() => {
    // SWR Strategy: Show cached data immediately, then refresh in background
    const cached = getCachedTrending();
    const shouldRefreshInBackground = isCacheStale();

    if (cached) {
      setTrending(cached);
      setSource("cache");
      setLoading(false);
    }

    // Fetch fresh data (either immediately if no cache, or in background if stale)
    if (!cached || shouldRefreshInBackground) {
      fetchTrendingRef.current(false);
    }

    // Set up auto-refresh interval (every 5 minutes)
    const intervalId = setInterval(
      () => {
        fetchTrendingRef.current(false);
      },
      5 * 60 * 1000,
    ); // 5 minutes

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array - only run on mount

  return {
    trending,
    loading,
    error,
    source,
    refresh,
  };
}
