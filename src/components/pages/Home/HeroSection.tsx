/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import dynamic from "next/dynamic";
const ImageSlider = dynamic(() => import("@/shared/ImageSlider"), {
  ssr: false,
});

import Shoe from "@/images/ladies_shoe.png";
import HandbagIcon from "@/images/ladies_bag.png";
import Shirt from "@/images/ladies_hijab.png";

import { Button } from "@/components/ui/button";
import CarouselComponent from "@/components/Carosol/SwiperComponent";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { link } from "fs";

const heroSlides = [
  {
    id: 1,
    image:
      "https://d38c45qguy2pwg.cloudfront.net/beach-with-umbrella-summer-vacation-concept-generative-ai.jpg",
    title: "Summer Collection 2025",
    subtitle: "Discover the latest trends for the season",
    cta: "Shop Now",
  },

  {
    id: 2,
    image:
      "https://d38c45qguy2pwg.cloudfront.net/young-woman-holding-phone-shopping-with-satisfaction-generated-by-ai.jpg",
    title: "New Arrivals",
    subtitle: "Be the first to shop our latest collection",
    cta: "Explore",
  },
  {
    id: 3,
    image:
      "https://d38c45qguy2pwg.cloudfront.net/glamorous-stiletto-pair-vibrant-pink-color-generated-by-ai.jpg",
    title: "Elevate Your Everyday",
    subtitle: "Refined shoes and bags designed for modern living",
    cta: "View Offers",
  },
];

const featuredProducts = [
  {
    id: 1,
    title: "Shoes",
    description: "Elegant & comfortable designs for every occasion",
    icon: Shoe,
    color: "bg-pink-100 dark:bg-pink-950",
    iconColor: "text-pink-500",
    price: "$49.99",
    link: "/category/4506b4bb-e6a4-44c5-bb0c-ad77c1c3c967",
  },
  {
    id: 2,
    title: "Bags",
    description: "Stylish & functional accessories for your daily needs",
    icon: HandbagIcon,
    color: "bg-purple-100 dark:bg-purple-950",
    iconColor: "text-purple-500",
    price: "$79.99",
    link: "/category/fed3dffe-c6c1-46fd-b020-eb8ca8f3ca8c",
  },
  {
    id: 3,
    title: "Hijabs",
    description: "Beautiful fabrics & patterns in various styles",
    icon: Shirt,
    color: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-500",
    price: "$29.99",
    link: "/category/e425d9b7-bdf6-4268-b203-390dd28d984f",
  },
];

const HeroSection: React.FC = () => {
  const HeroSectionImg = "https://d38c45qguy2pwg.cloudfront.net/hero-img.webp";
  const img1 =
    "https://prior-image.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2024-11-04+at+1.14.21+AM+(1).jpeg";
  const img2 =
    "https://prior-image.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2024-11-04+at+1.14.21+AM.jpeg";
  const img3 =
    "https://prior-image.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2024-11-04+at+1.14.20+AM.jpeg";

  return (
    <>
      <header className='bg-white block min-h-[30vh] md:min-h-[600px] lg:min-h-[700px] relative'>
        <section className='relative w-full h-[30vh] md:h-[600px] lg:h-[700px] overflow-hidden'>
          <CarouselComponent
            items={heroSlides.map((slide) => (
              <div
                key={slide.id}
                className='relative w-full h-[30vh] md:h-full'>
                <div className='absolute inset-0 bg-black/40 z-10' />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className='w-full h-full object-fit md:object-cover'
                />
                <div className='absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4'>
                  <h1 className='text-xl md:text-6xl font-bold text-white mb-2 md:mb-4'>
                    {slide.title}
                  </h1>
                  <p className='text-sm md:text-2xl text-white/90 mb-4 md:mb-8 max-w-2xl'>
                    {slide.subtitle}
                  </p>
                  <Button
                    size='lg'
                    className='hidden md:block text-lg px-8'
                    onClick={() => (window.location.href = "/collections")}>
                    {slide.cta}
                  </Button>
                  <Button
                    size='sm'
                    className='text-sm px-4 block md:hidden'
                    onClick={() => (window.location.href = "/collections")}>
                    {slide.cta}
                  </Button>
                </div>
              </div>
            ))}
          />
        </section>
        <section className='py-2 px-4 md:py-16 max-w-full md:max-w-7xl mx-auto'>
          <h2 className=' text-lg md:text-3xl font-semibold text-center mb-2 md:mb-10'>
            Featured Collections
          </h2>
          <div className='grid grid-cols-3 gap-2 md:gap-6'>
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className='overflow-hidden hover:shadow-lg transition-all duration-300 flex-1 w-full  border shadow-sm'
                onClick={() => (window.location.href = product.link)}>
                <CardHeader
                  className={`flex flex-col items-center justify-center py-2 md:py-8 bg-gray-100 md:${product?.color}`}>
                  <div className='rounded-full p-4 bg-white/90 dark:bg-black/20 mb-2 md:mb-4'>
                    <img
                      src={product?.icon.src}
                      alt='category'
                      className={` h-8 w-8 md:h-12 md:w-12 bg-white`}
                    />
                  </div>
                  <CardTitle className=' font-medium md:font-semibold text-center'>
                    {product.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </header>
      <div className='hidden w-full'>
        {/* <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-lg dark:bg-gray-800 overflow-hidden shadow-md">
                <Image
                  src={HeroSectionImg}
                  width={500}
                  height={400}
                  quality={50}
                  alt="hero-section"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div> */}

        <ImageSlider images={[img1, img2, img3]} />
      </div>
    </>
  );
};

export default HeroSection;
