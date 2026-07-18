import React from "react";
import type { Metadata } from "next";
import FAQContent from "./FAQContent";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "FAQ - Luxury Online Mart | Help Center",
  description:
    "Find answers to frequently asked questions about ordering, delivery, payments, exchanges, returns, and products at Luxury Online Mart. Kids fashion and accessories shopping made easy.",
  keywords: [
    "Luxury Online Mart FAQ",
    "kids fashion FAQ",
    "delivery charges Bangladesh",
    "return policy kids clothing",
    "payment methods Bangladesh",
    "exchange policy online shopping",
    "kids accessories delivery",
    "cash on delivery Bangladesh",
    "online kids store help",
  ],
  robots: "index, follow",
  openGraph: {
    title: "FAQ - Luxury Online Mart | Help Center",
    description:
      "Find answers to common questions about ordering, delivery, payments, exchanges, and products.",
    siteName: brandConfig.seo.siteName,
    type: "website",
    locale: brandConfig.seo.locale,
  },
  alternates: {
    canonical: `${brandConfig.services.apiUrl}/faq`,
  },
};

const FAQPage = () => {
  return <FAQContent />;
};

export default FAQPage;
