import React from "react";
import type { Metadata } from "next";
import ReturnsContent from "./ReturnsContent";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "Returns & Exchange - Luxury Online Mart",
  description:
    "Learn about return and exchange policies at Luxury Online Mart. Easy returns within 3 days, free returns for damaged items, and hassle-free exchanges for kids fashion and accessories.",
  keywords: [
    "Luxury Online Mart returns",
    "exchange policy Bangladesh",
    "kids fashion return",
    "return damaged product",
    "exchange kids clothing",
    "online shopping returns Bangladesh",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Returns & Exchange - Luxury Online Mart",
    description:
      "Easy returns and exchanges for kids fashion and accessories at Luxury Online Mart.",
    siteName: brandConfig.seo.siteName,
    type: "website",
    locale: brandConfig.seo.locale,
  },
  alternates: {
    canonical: `${brandConfig.services.apiUrl}/returns`,
  },
};

const ReturnsPage = () => {
  return <ReturnsContent />;
};

export default ReturnsPage;
