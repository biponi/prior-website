"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const EditorialFeature: React.FC = () => {
  return (
    <section className='py-12 sm:py-16 md:py-20 lg:py-24 bg-[#FDF5F8]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-center'>
          {/* Text Content */}
          <div className='space-y-5 sm:space-y-6 md:space-y-8 order-2 md:order-1'>
            {/* Label */}
            <div className='flex items-center gap-3'>
              <span className='w-8 h-px bg-[#CD2A75]' />
              <p className='text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-[#CD2A75]'>
                Why Prior
              </p>
            </div>

            {/* Heading */}
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif tracking-wide text-neutral-900 leading-[1.15]'>
              Every Detail, <br className='hidden sm:block' />
              <span className='text-[#CD2A75]'>Crafted with Love</span>
            </h2>

            {/* Description */}
            <p className='text-sm sm:text-base md:text-lg text-neutral-500 leading-relaxed max-w-lg'>
              We understand that your baby deserves nothing but the best.
              That&apos;s why every product at Luxury Online Mart is handpicked,
              tested, and approved by real parents.
            </p>

            {/* Feature Grid */}
            <div className='grid grid-cols-2 gap-4 sm:gap-5 pt-2'>
              {[
                {
                  number: "500+",
                  label: "Curated Products",
                },
                {
                  number: "50K+",
                  label: "Happy Parents",
                },
                {
                  number: "4.9",
                  label: "Average Rating",
                },
                {
                  number: "48hr",
                  label: "Fast Delivery",
                },
              ].map((stat, i) => (
                <div key={i} className='space-y-1'>
                  <p className='text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-neutral-900'>
                    {stat.number}
                  </p>
                  <p className='text-xs sm:text-sm text-neutral-400 tracking-wide'>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href='/about'
              className='inline-flex items-center gap-2 text-sm sm:text-base font-medium text-neutral-900 hover:text-[#CD2A75] transition-colors duration-300 group pt-2'>
              <span className='tracking-wide'>Discover Our Story</span>
              <span className='group-hover:translate-x-1 transition-transform duration-300'>
                &rarr;
              </span>
            </Link>
          </div>

          {/* Image Grid */}
          <div className='order-1 md:order-2 relative'>
            <div className='grid grid-cols-2 gap-3 sm:gap-4'>
              {/* Main large image */}
              <div className='col-span-2 relative aspect-[4/3] rounded-2xl overflow-hidden'>
                <Image
                  src='/images/cover/luxury/COVER1.jpg'
                  alt='Baby products collection'
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
              </div>
              {/* Two smaller images */}
              <div className='relative aspect-square rounded-2xl overflow-hidden'>
                <Image
                  src='/images/about/kids-fashion.jpg'
                  alt='Kids fashion'
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 50vw, 25vw'
                />
              </div>
              <div className='relative aspect-square rounded-2xl overflow-hidden'>
                <Image
                  src='/images/about/little-female.jpg'
                  alt='Baby care'
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 50vw, 25vw'
                />
              </div>
            </div>

            {/* Floating Badge */}
            <div className='absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-4 bg-white rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-lg shadow-black/5 border border-neutral-100'>
              <p className='text-[10px] sm:text-xs text-neutral-400 tracking-wide mb-0.5'>
                Trusted since
              </p>
              <p className='text-lg sm:text-xl font-serif font-semibold text-neutral-900'>
                2020
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialFeature;
