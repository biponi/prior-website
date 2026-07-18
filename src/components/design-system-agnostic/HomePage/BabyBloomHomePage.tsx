import React from "react";
import Link from "next/link";
import Image from "next/image";
import BabyBloomCategoryPills from "../CategoryPills/BabyBloomCategoryPills";
import BabyBloomProductGrid from "../ProductGrid/BabyBloomProductGrid";
import BabyBloomTrustBar from "../TrustBar/BabyBloomTrustBar";
import { Product } from "@/lib/adapters/productAdapter";
import { Zap, ArrowRight, Sparkles, TrendingUp, Clock } from "lucide-react";

interface BabyBloomHomePageProps {
  products: Product[];
  categories: any[];
}

export default function BabyBloomHomePage({
  products,
  categories,
}: BabyBloomHomePageProps) {
  const newProducts = products.slice(0, 8);
  const hotProducts = products.slice(8, 16);
  const moreProducts = products.slice(16, 24);

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* ── Offer Strip Banner ───────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#CD2A75] via-[#d93580] to-[#E84A8F] text-white py-2.5 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-wide">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
            <span>Free shipping on orders over ৳1,000</span>
            <span className="hidden sm:inline text-white/60">|</span>
            <span className="hidden sm:inline">Use code: <strong>FREESHIP</strong></span>
          </div>
        </div>
      </div>

      {/* ── Category Pills ───────────────────────────────────────────── */}
      <BabyBloomCategoryPills categories={categories} />

      {/* ── Flash Sale Hero ──────────────────────────────────────────── */}
      <section className="py-4 sm:py-6 px-4">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#CD2A75] via-[#d93580] to-[#a01f5a] p-6 sm:p-8">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/5 rounded-full" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Limited Time</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
                  Flash Sale
                </h2>
                <p className="text-sm text-white/75">
                  Up to 50% off — hurry, ends soon!
                </p>
              </div>
              <Link
                href="/deals"
                className="group flex items-center gap-2 bg-white text-[#CD2A75] px-6 py-3 rounded-lg font-bold text-sm hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-black/10 shrink-0"
              >
                View All Deals
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Flash Sale Products */}
          <div className="mt-6">
            <BabyBloomProductGrid
              products={products.slice(0, 4)}
              title=""
              subtitle=""
            />
          </div>
        </div>
      </section>

      {/* ── New Arrivals ─────────────────────────────────────────────── */}
      <section className="py-4 sm:py-6 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#CD2A75]" />
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#CD2A75]">Just Dropped</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#191C1F] tracking-tight">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/new-arrivals"
              className="group flex items-center gap-1.5 text-sm font-semibold text-[#CD2A75] hover:text-[#B02462] transition-colors"
            >
              See All
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <BabyBloomProductGrid
            products={newProducts}
            title=""
            subtitle=""
            className="bg-transparent px-0 py-0"
          />
        </div>
      </section>

      {/* ── Trust Bar ────────────────────────────────────────────────── */}
      <BabyBloomTrustBar />

      {/* ── Trending Now ─────────────────────────────────────────────── */}
      <section className="py-4 sm:py-6 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-[#CD2A75]" />
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#CD2A75]">Most Loved</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#191C1F] tracking-tight">
                Trending Now
              </h2>
            </div>
            <Link
              href="/best-sellers"
              className="group flex items-center gap-1.5 text-sm font-semibold text-[#CD2A75] hover:text-[#B02462] transition-colors"
            >
              See All
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <BabyBloomProductGrid
            products={hotProducts}
            title=""
            subtitle=""
            className="bg-transparent px-0 py-0"
          />
        </div>
      </section>

      {/* ── Featured CTA Banner ──────────────────────────────────────── */}
      <section className="py-4 sm:py-6 px-4">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#FDF5F8] via-white to-[#FDF5F8] border border-[#CD2A75]/10 p-8 sm:p-12 text-center">
            {/* Decorative dots */}
            <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-[#CD2A75]/20" />
            <div className="absolute top-8 left-12 w-1.5 h-1.5 rounded-full bg-[#CD2A75]/15" />
            <div className="absolute bottom-6 right-8 w-2 h-2 rounded-full bg-[#CD2A75]/20" />
            <div className="absolute bottom-10 right-16 w-1.5 h-1.5 rounded-full bg-[#CD2A75]/15" />

            <div className="relative z-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#CD2A75] mb-3">
                Featured Collection
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#191C1F] mb-3 tracking-tight">
                Summer Collection 2024
              </h2>
              <p className="text-sm text-[#666] mb-6 max-w-md mx-auto">
                Discover our latest arrivals — fresh styles curated just for you
              </p>
              <Link
                href="/collections?sort=newest"
                className="inline-flex items-center gap-2 bg-[#CD2A75] text-white px-8 py-3.5 rounded-lg font-bold text-sm hover:bg-[#B02462] transition-all duration-300 hover:shadow-lg hover:shadow-[#CD2A75]/20"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── More For You ─────────────────────────────────────────────── */}
      {moreProducts.length > 0 && (
        <section className="py-4 sm:py-6 px-4 pb-12">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#A3A3A3] block mb-1">
                  Curated Picks
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#191C1F] tracking-tight">
                  More For You
                </h2>
              </div>
            </div>
            <BabyBloomProductGrid
              products={moreProducts}
              title=""
              subtitle=""
              className="bg-transparent px-0 py-0"
            />
          </div>
        </section>
      )}
    </div>
  );
}
