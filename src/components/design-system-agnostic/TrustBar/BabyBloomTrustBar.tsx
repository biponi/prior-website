import React from "react";
import { Truck, RotateCcw, ShieldCheck, HeadphonesIcon } from "lucide-react";

const trustItems = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Within 2-3 business days",
  },
  {
    icon: RotateCcw,
    title: "Easy Return",
    description: "7 days return policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Dedicated support team",
  },
];

export default function BabyBloomTrustBar() {
  return (
    <div className="bg-white border-y border-gray-100 py-8 px-4 my-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#FDF5F8] flex items-center justify-center group-hover:bg-[#CD2A75] group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#CD2A75]/20">
                  <Icon className="w-5 h-5 text-[#CD2A75] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#191C1F] mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#A3A3A3]">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
