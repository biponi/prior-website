"use client";

import React from "react";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  CreditCard,
  Gift,
} from "lucide-react";

interface TrustItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const trustItems: TrustItem[] = [
  {
    icon: <Truck className='w-5 h-5' strokeWidth={1.5} />,
    title: "Nationwide Delivery",
    subtitle: "Fast delivery across Bangladesh",
  },
  {
    icon: <ShieldCheck className='w-5 h-5' strokeWidth={1.5} />,
    title: "100% Authentic Products",
    subtitle: "Trusted brands & genuine quality",
  },
  {
    icon: <RotateCcw className='w-5 h-5' strokeWidth={1.5} />,
    title: "Cash on Delivery",
    subtitle: "Available inside Dhaka city",
  },
  {
    icon: <Headphones className='w-5 h-5' strokeWidth={1.5} />,
    title: "Customer Support",
    subtitle: "Quick help via Facebook Messenger",
  },
];

const TrustBar: React.FC = () => {
  return (
    <section className='border-b border-neutral-100 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-neutral-100'>
          {trustItems.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-center gap-3 py-4 sm:py-5 md:py-6 group cursor-default'>
              <div className='text-neutral-400 group-hover:text-[#CD2A75] transition-colors duration-300'>
                {item.icon}
              </div>
              <div className='min-w-0'>
                <p className='text-xs sm:text-sm font-medium text-neutral-800 tracking-wide truncate'>
                  {item.title}
                </p>
                <p className='text-[10px] sm:text-xs text-neutral-400 tracking-wide truncate'>
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
