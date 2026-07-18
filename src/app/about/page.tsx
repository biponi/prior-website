import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Truck,
  Star,
  ShoppingBag,
  GraduationCap,
  Gift,
  PartyPopper,
  CalendarDays,
} from "lucide-react";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "About Us - Luxury Online Mart | Kids Fashion & Lifestyle Brand",
  description:
    "Discover Luxury Online Mart - a trusted kids' fashion and lifestyle accessories brand since 2018. Curated collections of trendy, premium-quality products blending style, comfort, and affordability for modern families in Bangladesh.",
  keywords: [
    "Luxury Online Mart",
    "kids fashion Bangladesh",
    "children clothing online",
    "kids accessories Bangladesh",
    "baby wear shop",
    "school essentials Bangladesh",
    "kids party bags",
    "princess dresses kids",
    "children lifestyle accessories",
    "online kids store Bangladesh",
    "premium kids fashion",
    "affordable kids clothing",
  ],
  robots: "index, follow",
  openGraph: {
    title: "About Us - Luxury Online Mart | Kids Fashion & Lifestyle Brand",
    description:
      "A trusted kids' fashion and lifestyle accessories brand since 2018. Curated collections of trendy, premium-quality products for modern families.",
    siteName: brandConfig.seo.siteName,
    type: "website",
    locale: brandConfig.seo.locale,
    url: `${brandConfig.services.apiUrl}/about`,
    images: [
      {
        url: brandConfig.assets.ogImage,
        width: 1200,
        height: 630,
        alt: "Luxury Online Mart - Kids Fashion Brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Luxury Online Mart",
    description:
      "A trusted kids' fashion and lifestyle accessories brand since 2018. Premium-quality products blending style, comfort, and affordability.",
  },
  alternates: {
    canonical: `${brandConfig.services.apiUrl}/about`,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brandConfig.identity.name,
  url: brandConfig.services.apiUrl,
  logo: `${brandConfig.services.apiUrl}${brandConfig.assets.logo}`,
  description:
    "Luxury Online Mart is a kids' fashion and lifestyle accessories brand offering curated collections of trendy, premium-quality products blending style, comfort, and affordability since 2018.",
  foundingDate: "2018",
  address: {
    "@type": "PostalAddress",
    streetAddress: brandConfig.contact.address.full,
    addressLocality: brandConfig.contact.address.city,
    addressCountry: brandConfig.contact.address.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: brandConfig.contact.phone.display,
    email: brandConfig.contact.email.address,
    contactType: "customer service",
  },
  sameAs: [brandConfig.social.facebook.url],
};

const values = [
  {
    icon: Heart,
    title: "Quality First",
    description:
      "Every product is carefully selected to ensure it meets our standards of quality, comfort, and durability.",
  },
  {
    icon: Sparkles,
    title: "Style & Trends",
    description:
      "We stay ahead of the curve to bring the latest fashion trends for kids, so your little ones always look their best.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted by Families",
    description:
      "Since 2018, thousands of families across Bangladesh have trusted us for their children's fashion needs.",
  },
  {
    icon: Truck,
    title: "Convenient Shopping",
    description:
      "From easy online ordering to fast delivery, we make every shopping experience enjoyable and hassle-free.",
  },
];

const offerings = [
  {
    icon: ShoppingBag,
    title: "Fashionable Kids' Wear",
    description:
      "From elegant princess dresses to everyday baby wear, our collection combines comfort with the latest trends.",
  },
  {
    icon: GraduationCap,
    title: "School Essentials",
    description:
      "Everything your child needs for a new school year — bags, stationery, and accessories that are both functional and stylish.",
  },
  {
    icon: Gift,
    title: "Gifts & Accessories",
    description:
      "Party bags, fashion accessories, and thoughtful gifts for every occasion — birthdays, Eid, festivities, and more.",
  },
  {
    icon: PartyPopper,
    title: "Celebrations & Events",
    description:
      "Make every celebration special with our curated collection of party supplies, festive wear, and event accessories.",
  },
];

const About: React.FC = () => {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main>
        {/* Hero Section */}
        <section className='relative overflow-hidden bg-gradient-to-br from-babybloom-pink-light via-white to-pink-50'>
          <div className='absolute inset-0 opacity-[0.03]'>
            <div
              className='absolute inset-0'
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #CD2A75 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 relative'>
            <div className='max-w-4xl mx-auto text-center'>
              <span className='inline-block px-4 py-1.5 bg-babybloom-pink/10 text-babybloom-pink text-sm font-medium rounded-full mb-6 tracking-wide uppercase'>
                Est. 2018
              </span>
              <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight'>
                About{" "}
                <span className='text-babybloom-pink'>Luxury Online Mart</span>
              </h1>
              <p className='text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                A trusted destination for kids&apos; fashion and lifestyle
                accessories — blending style, comfort, and affordability for
                modern families since 2018.
              </p>
            </div>
          </div>

          {/* Decorative bottom wave */}
          <div className='absolute bottom-0 left-0 right-0'>
            <svg
              viewBox='0 0 1440 60'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='w-full'
              preserveAspectRatio='none'>
              <path
                d='M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z'
                fill='white'
              />
            </svg>
          </div>
        </section>

        {/* Our Story Section */}
        <section className='py-16 md:py-24 bg-white'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
              {/* Text Content */}
              <div>
                <span className='text-babybloom-pink font-semibold text-sm tracking-widest uppercase'>
                  Our Story
                </span>
                <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6'>
                  Fashion That Celebrates
                  <br />
                  <span className='text-babybloom-pink'>Every Child</span>
                </h2>
                <div className='space-y-4 text-gray-600 leading-relaxed'>
                  <p>
                    Luxury Online Mart is a promising kids&apos; fashion and
                    lifestyle accessories brand, recognized for its curated
                    collection of trendy, premium-quality products that blend
                    style, comfort, and affordability. Established in 2018, we
                    have grown into a trusted destination for kids&apos; fashion
                    and style.
                  </p>
                  <p>
                    We specialize in offering fashionable kids&apos; wear,
                    school essentials, and lifestyle accessories, thoughtfully
                    selected to meet the needs of modern families. From elegant
                    princess dresses and everyday baby wear to party bags,
                    school supplies, and fashion accessories — every product is
                    chosen with quality and style in mind.
                  </p>
                </div>
              </div>

              {/* Image Collage */}
              <div className='relative'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-4'>
                    <div className='relative rounded-2xl overflow-hidden shadow-lg aspect-[3/4]'>
                      <Image
                        src='/images/about/family-col.jpg'
                        alt='Luxury Online Mart Kids Fashion Collection'
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 50vw, 25vw'
                      />
                    </div>
                    <div className='relative rounded-2xl overflow-hidden shadow-lg aspect-square'>
                      <Image
                        src='/images/about/kids-fashion.jpg'
                        alt='Kids School Bags and Accessories'
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 50vw, 25vw'
                      />
                    </div>
                  </div>
                  <div className='space-y-4 pt-8'>
                    <div className='relative rounded-2xl overflow-hidden shadow-lg aspect-square'>
                      <Image
                        src='/images/about/7702740.jpg'
                        alt='Kids Fashion Shoes Collection'
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 50vw, 25vw'
                      />
                    </div>
                    <div className='relative rounded-2xl overflow-hidden shadow-lg aspect-[3/4]'>
                      <Image
                        src='/images/about/little-female.jpg'
                        alt='Luxury Online Mart Lifestyle Collection'
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 50vw, 25vw'
                      />
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className='absolute -bottom-4 -left-4 bg-babybloom-pink text-white rounded-2xl p-4 shadow-xl hidden md:block'>
                  <div className='text-center'>
                    <span className='text-3xl font-bold block'>7+</span>
                    <span className='text-sm opacity-90'>Years of Trust</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className='py-16 md:py-24 bg-gray-50'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-12 md:mb-16'>
              <span className='text-babybloom-pink font-semibold text-sm tracking-widest uppercase'>
                What We Offer
              </span>
              <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4'>
                Everything Your Child Needs
              </h2>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                From everyday essentials to special occasion items, we have
                everything to make your child look and feel their best.
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
              {offerings.map((offering) => (
                <div
                  key={offering.title}
                  className='group bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-babybloom-pink/20'>
                  <div className='w-14 h-14 rounded-xl bg-babybloom-pink/10 flex items-center justify-center mb-5 group-hover:bg-babybloom-pink group-hover:scale-110 transition-all duration-300'>
                    <offering.icon className='w-7 h-7 text-babybloom-pink group-hover:text-white transition-colors duration-300' />
                  </div>
                  <h3 className='text-lg font-bold text-gray-900 mb-3'>
                    {offering.title}
                  </h3>
                  <p className='text-gray-500 text-sm leading-relaxed'>
                    {offering.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className='py-16 md:py-24 bg-white'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-12 md:mb-16'>
              <span className='text-babybloom-pink font-semibold text-sm tracking-widest uppercase'>
                Our Values
              </span>
              <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4'>
                What Drives Us
              </h2>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                At Luxury Online Mart, we believe that every child deserves
                products that are not only beautiful but also comfortable,
                durable, and practical.
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
              {values.map((value) => (
                <div
                  key={value.title}
                  className='relative group text-center p-6 md:p-8'>
                  <div className='w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-babybloom-pink to-pink-400 flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                    <value.icon className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='text-lg font-bold text-gray-900 mb-3'>
                    {value.title}
                  </h3>
                  <p className='text-gray-500 text-sm leading-relaxed'>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement Banner */}
        <section className='relative py-16 md:py-24 bg-gradient-to-br from-babybloom-pink via-pink-500 to-fuchsia-600 overflow-hidden'>
          <div className='absolute inset-0 opacity-10'>
            <div
              className='absolute inset-0'
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative'>
            <div className='max-w-4xl mx-auto text-center'>
              <CalendarDays className='w-12 h-12 text-white/80 mx-auto mb-6' />
              <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight'>
                Making Every Shopping Experience
                <br />
                <span className='text-yellow-200'>Enjoyable & Memorable</span>
              </h2>
              <p className='text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-8'>
                Whether you&apos;re preparing for a new school year, celebrating
                a birthday, shopping for Eid or festivities, or looking for the
                perfect gift — we are committed to making every moment special.
              </p>
              <Link
                href='/collections'
                className='inline-flex items-center gap-2 bg-white text-babybloom-pink px-8 py-3.5 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'>
                <ShoppingBag className='w-5 h-5' />
                Explore Our Collection
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-16 md:py-20 bg-gray-50'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='max-w-3xl mx-auto text-center'>
              <div className='flex justify-center mb-6'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-6 h-6 text-yellow-400 fill-yellow-400'
                  />
                ))}
              </div>
              <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
                Be a Part of Our Journey
              </h2>
              <p className='text-gray-600 text-lg mb-8 leading-relaxed'>
                Shop with Luxury Online Mart — let us be a part of your moments
                that inspire joy, style, and lasting memories.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link
                  href='/collections'
                  className='inline-flex items-center justify-center gap-2 bg-babybloom-pink text-white px-8 py-3.5 rounded-full font-semibold hover:bg-babybloom-pink/90 transition-all duration-300 shadow-lg hover:shadow-xl'>
                  Shop Now
                </Link>
                <Link
                  href='/contact-us'
                  className='inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-3.5 rounded-full font-semibold border border-gray-200 hover:border-babybloom-pink hover:text-babybloom-pink transition-all duration-300'>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
