import React from "react";
import type { Metadata } from "next";
import { brandConfig } from "@/config/brand";
import PaymentContent from "./PaymentContent";

export const metadata: Metadata = {
  title: "Payment Methods - Luxury Online Mart",
  description:
    "Learn about available payment methods at Luxury Online Mart. Cash on Delivery, bKash, and Nagad accepted. Secure and convenient payments for kids fashion and accessories in Bangladesh.",
  keywords: [
    "Luxury Online Mart payment",
    "cash on delivery Bangladesh",
    "bKash payment online",
    "Nagad payment",
    "kids fashion payment methods",
    "online shopping payment Bangladesh",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Payment Methods - Luxury Online Mart",
    description:
      "Secure and convenient payment options including Cash on Delivery, bKash, and Nagad.",
    siteName: brandConfig.seo.siteName,
    type: "website",
    locale: brandConfig.seo.locale,
  },
  alternates: {
    canonical: `${brandConfig.services.apiUrl}/payments`,
  },
};

const PaymentsPage = () => {
  return <PaymentContent />;
};

export default PaymentsPage;
