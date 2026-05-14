import React from "react";
import Link from "next/link";
import Image from "next/image";
import BabyBloomCategoryPills from "../CategoryPills/BabyBloomCategoryPills";
import BabyBloomProductGrid from "../ProductGrid/BabyBloomProductGrid";
import BabyBloomTrustBar from "../TrustBar/BabyBloomTrustBar";
import { Product } from "@/lib/adapters/productAdapter";
import { Zap } from "lucide-react";

interface BabyBloomHomePageProps {
  products: Product[];
  categories: any[];
}

/**
 * Baby Bloom Home Page Component
 *
 * Features:
 * - Offer strip banner
 * - Category pills
 * - Flash sale section
 * - Featured products
 * - Trust bar
 * - Pink theme throughout
 */
export default function BabyBloomHomePage({
  products,
  categories,
}: BabyBloomHomePageProps) {
  const newProducts = products.slice(0, 8);
  const hotProducts = products.slice(8, 16);

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Offer Strip Banner */}
      <div className="bg-gradient-to-r from-[#CD2A75] to-[#E84A8F] text-white py-3 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <Zap className="w-4 h-4" />
            <span>Free shipping on orders over ৳1000! Use code: FREESHIP</span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <BabyBloomCategoryPills categories={categories} />

      {/* Flash Sale Section */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-[#CD2A75] to-[#E84A8F] rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Flash Sale</h2>
                </div>
                <p className="text-sm opacity-90">Limited time offers - Do not miss out!</p>
              </div>
              <Link
                href="/sale"
                className="bg-white text-[#CD2A75] px-6 py-2 rounded font-bold text-sm hover:bg-opacity-90 transition-colors">
                View All
              </Link>
            </div>
          </div>

          {/* Flash Sale Products */}
          <BabyBloomProductGrid
            products={products.slice(0, 4)}
            title="Hot Deals"
            subtitle="Up to 50% off"
          />
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-6 px-4">
        <BabyBloomProductGrid
          products={newProducts}
          title="New Arrivals"
          subtitle="Fresh styles just landed"
        />
      </section>

      {/* Trust Bar */}
      <BabyBloomTrustBar />

      {/* Trending Section */}
      <section className="py-6 px-4">
        <BabyBloomProductGrid
          products={hotProducts}
          title="Trending Now"
          subtitle="Most loved pieces by our community"
        />
      </section>

      {/* Featured Banner */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="bg-[#FDF5F8] rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold text-[#CD2A75] mb-2">
              Summer Collection 2024
            </h2>
            <p className="text-sm text-[#191C1F] mb-4">
              Discover our latest arrivals
            </p>
            <Link
              href="/collections?sort=newest"
              className="inline-block bg-[#CD2A75] text-white px-8 py-3 rounded font-bold text-sm hover:bg-[#B02462] transition-colors">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Products */}
      <section className="py-6 px-4 pb-12">
        <BabyBloomProductGrid
          products={products.slice(16, 24)}
          title="More For You"
          subtitle="Curated picks based on your taste"
        />
      </section>
    </div>
  );
}
