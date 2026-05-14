import React from "react";
import { Truck, RotateCcw, ShieldCheck, HeadphonesIcon } from "lucide-react";

/**
 * Baby Bloom Trust Bar Component
 *
 * Features:
 * - 4-icon trust bar (Delivery, Return, Payment, Support)
 * - Pink theme (#CD2A75)
 * - Mobile-first design
 */
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
    description: "Dedicated support",
  },
];

export default function BabyBloomTrustBar() {
  return (
    <div className="bg-white border-t border-ds-border py-6 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-[#FDF5F8] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#CD2A75]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#191C1F] mb-1">
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
