"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "@/lib/config";
import type { Category } from "@/data/types";

// ─── Types ─────────────────────────────────────────────────────────────────────

export type AccentVariant =
  | "pink"
  | "mint"
  | "sky"
  | "peach"
  | "lavender"
  | "amber";

export interface CategoryShowcase {
  title: string;
  count: string;
  badge: string;
  icon: string;
  href: string;
  imageSrc: string;
  accent: AccentVariant;
}

interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const ACCENT_COLORS: AccentVariant[] = [
  "pink",
  "mint",
  "sky",
  "peach",
  "lavender",
  "amber",
];

const CATEGORY_BADGES = [
  "Best sellers",
  "New arrivals",
  "Trending",
  "Popular",
  "Top rated",
  "Featured",
] as const;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80";

// Ordered by specificity — more specific keys first to avoid partial mismatches
const ICON_MAP: [string, string][] = [
  ["skincare", "✨"],
  ["footwear", "👠"],
  ["hijabs", "🧕"],
  ["hijab", "🧕"],
  ["shoes", "👠"],
  ["bags", "👜"],
  ["bag", "👜"],
  ["clothing", "👗"],
  ["fashion", "👗"],
  ["accessories", "🎀"],
  ["jewelry", "💎"],
  ["watch", "⌚"],
  ["beauty", "💄"],
  ["electronics", "📱"],
  ["home", "🏠"],
  ["baby", "👶"],
  ["kids", "🧸"],
  ["sports", "⚽"],
  ["books", "📚"],
];

const DEFAULT_ICON = "🛍️";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function resolveIcon(name: string): string {
  const lower = name.toLowerCase();
  return ICON_MAP.find(([key]) => lower.includes(key))?.[1] ?? DEFAULT_ICON;
}

function transformCategory(cat: Category, index: number): CategoryShowcase {
  return {
    title: cat.name,
    count: cat.totalProducts != null ? `${cat.totalProducts} items` : "— items",
    badge: CATEGORY_BADGES[index % CATEGORY_BADGES.length],
    icon: resolveIcon(cat.name),
    href: `/category/${cat.id}`,
    imageSrc: cat.img?.trim() || FALLBACK_IMAGE,
    accent: ACCENT_COLORS[index % ACCENT_COLORS.length],
  };
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

interface UseCategoriesReturn {
  categories: CategoryShowcase[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<CategoryShowcase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  // Expose a stable refetch trigger
  const refetch = () => setTick((n) => n + 1);

  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      setLoading(true);
      setError(null);

      try {
        const { data: payload } = await axios.get<CategoriesResponse>(
          config.product.getCategories(),
          { timeout: 10_000 },
        );

        if (cancelled) return;

        // Normalise: handle both { success, data: [...] } and direct [...]
        const raw: Category[] = Array.isArray(payload)
          ? payload
          : (payload?.data ?? []);

        const showcaseCategories = raw
          .filter((cat) => cat?.active)
          .slice(0, 8)
          .map(transformCategory);

        setCategories(showcaseCategories);
      } catch (err: any) {
        if (cancelled) return;

        const status: number | undefined = err?.response?.status;

        const message =
          status === 404
            ? "Categories endpoint not found."
            : status === 401
              ? "Unauthorized — check API credentials."
              : status != null
                ? `Server error (${status}). Please try again.`
                : err?.code === "ECONNABORTED"
                  ? "Request timed out. Please try again."
                  : "Failed to load categories.";

        console.error("[useCategories]", {
          message: err?.message,
          status,
          url: err?.config?.url,
        });

        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCategories();

    // Cleanup: ignore stale responses if the component unmounts or refetch fires
    return () => {
      cancelled = true;
    };
  }, [tick]);

  return { categories, loading, error, refetch };
}
