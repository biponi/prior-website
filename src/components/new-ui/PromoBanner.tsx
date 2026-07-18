"use client";

import React from "react";
import Link from "next/link";

const PromoBanner: React.FC = () => {
  return (
    <section className='relative overflow-hidden bg-neutral-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16'>
        <div className='grid md:grid-cols-2 gap-6 sm:gap-8 items-center'>
          {/* Left: Content */}
          <div className='space-y-4 sm:space-y-5 md:space-y-6 text-center md:text-left'>
            <div className='inline-flex items-center gap-2 bg-[#CD2A75]/20 border border-[#CD2A75]/30 rounded-full px-3 py-1 sm:px-4 sm:py-1.5'>
              <span className='w-1.5 h-1.5 rounded-full bg-[#CD2A75] animate-pulse' />
              <span className='text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-[#FFB8D9]'>
                Limited Time Offer
              </span>
            </div>

            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif tracking-wide text-white leading-[1.15]'>
              Flat <span className='text-[#CD2A75]'>30% Off</span>
              <br />
              New Arrivals
            </h2>

            <p className='text-sm sm:text-base text-neutral-400 max-w-md mx-auto md:mx-0 leading-relaxed'>
              Refresh your little one&apos;s wardrobe with our newest collection.
              Premium quality, unmatched comfort — now at unbeatable prices.
            </p>

            <div className='flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-2'>
              <Link
                href='/collections?sort=newest'
                className='inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 text-xs sm:text-sm font-medium tracking-[0.12em] uppercase bg-[#CD2A75] hover:bg-[#B02462] text-white transition-colors duration-300 rounded-full'>
                Shop New Arrivals
              </Link>
              <Link
                href='/collections?sort=popular'
                className='inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 text-xs sm:text-sm font-medium tracking-[0.12em] uppercase bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/60 transition-all duration-300 rounded-full'>
                View Bestsellers
              </Link>
            </div>
          </div>

          {/* Right: Stats Grid */}
          <div className='grid grid-cols-2 gap-3 sm:gap-4'>
            {[
              { value: "30%", label: "Discount", color: "bg-[#CD2A75]" },
              { value: "200+", label: "New Products", color: "bg-white" },
              { value: "48hr", label: "Fast Delivery", color: "bg-white" },
              { value: "100%", label: "Quality assured", color: "bg-[#CD2A75]" },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center ${
                  item.color === "bg-[#CD2A75]"
                    ? "bg-[#CD2A75]"
                    : "bg-white/5 border border-white/10"
                }`}>
                <p
                  className={`text-2xl sm:text-3xl md:text-4xl font-serif font-bold ${
                    item.color === "bg-[#CD2A75]" ? "text-white" : "text-white"
                  }`}>
                  {item.value}
                </p>
                <p className='text-[10px] sm:text-xs text-white/70 tracking-wide mt-1'>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative circles */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-[#CD2A75]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl' />
      <div className='absolute bottom-0 left-0 w-48 h-48 bg-[#CD2A75]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl' />
    </section>
  );
};

export default PromoBanner;
