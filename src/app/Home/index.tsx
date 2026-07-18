"use client";

import React from "react";
import { IProduct } from "@/lib/interface";
import { adaptProductsToNewFormat } from "@/lib/adapters/productAdapter";
import ProductGrid from "@/components/new-ui/ProductGrid";
import EditorialHeroCarousel from "./HeroSectionV2";
import { heroSlides } from "@/utils/heroSectionContents";
import CategoryShowcase from "@/components/design-system-agnostic/CategoryShowcase/CategoryShowcase";
import { CategoryShowcase as CategoryProps } from "@/hooks/useCategories";
import LuxuryOutletSection from "@/components/new-ui/LuxuryOutletSection";
import TrustBar from "@/components/new-ui/TrustBar";
import EditorialFeature from "@/components/new-ui/EditorialFeature";
import PromoBanner from "@/components/new-ui/PromoBanner";
import Testimonials from "@/components/new-ui/Testimonials";
import Newsletter from "@/components/new-ui/Newsletter";

interface HomePageProps {
  products: IProduct[];
  categories: CategoryProps[];
}

const HomePage: React.FC<HomePageProps> = ({ products, categories }) => {
  const newProducts = adaptProductsToNewFormat(products || []);

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Carousel */}
      <EditorialHeroCarousel slides={heroSlides} />

      {/* Trust Indicators Bar */}
      <TrustBar />

      {/* Category Showcase */}
      <CategoryShowcase categories={categories} loading={false} />

      {/* New Arrivals */}
      <ProductGrid
        products={newProducts.slice(0, 8)}
        title='New Arrivals'
        subtitle='Fresh styles just landed. Discover the latest additions to our collection.'
        showViewAll={true}
        viewAllLink='/collections?sort=newest'
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 lg:py-24'
      />

      {/* Editorial Feature — Why Prior */}
      <EditorialFeature />

      {/* Trending Now */}
      <ProductGrid
        products={newProducts.slice(8, 16)}
        title='Trending Now'
        subtitle="Most loved pieces by our community. See what's capturing hearts this season."
        showViewAll={true}
        viewAllLink='/collections?sort=popular'
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 lg:py-24'
      />

      {/* Promo Banner */}
      <PromoBanner />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Prior Outlet Section */}
      <LuxuryOutletSection />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default HomePage;
