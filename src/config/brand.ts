/**
 * Centralized Brand Configuration
 *
 * This file serves as the single source of truth for all brand-related information
 * including identity, contact details, social media, assets, SEO, and legal information.
 *
 * Usage:
 *   import { brandConfig } from '@/config/brand';
 *   import type { BrandConfig } from '@/config/brand';
 */

export const brandConfig = {
  // =========================================================================
  // BRAND IDENTITY
  // =========================================================================
  identity: {
    name: "Luxury Online Mart",
    tagline: "Luxury Online Mart",
    siteName: "Luxury Online Mart",
    legalName: "Luxury Online Mart",
    businessType: "Retail",
  },

  // =========================================================================
  // CONTACT INFORMATION
  // =========================================================================
  contact: {
    phone: {
      display: "+8801306915635",
      link: "tel:+8801306915635",
      whatsapp: "+8801306915635",
    },
    email: {
      display: "hello@luxuryonlinemart.com",
      address: "hello@luxuryonlinemart.com",
    },
    address: {
      full: "39 & 41 Sonargaon Janapath Road, Sector 13, Uttara, Dhaka Shop no : 05",
      city: "Dhaka",
      area: "Dhanmondi",
      building: "Uttara Square Shopping Mall",
      shopNumber: "05",
      country: "Bangladesh",
      // For Google Maps embed
      coordinates: {
        lat: 23.7481,
        lng: 90.3799,
      },
    },
  },

  // =========================================================================
  // SOCIAL MEDIA
  // =========================================================================
  social: {
    facebook: {
      url: "https://www.facebook.com/luxuryonlinemart",
      username: "@luxuryonlinemart",
      enabled: true,
    },
    instagram: {
      url: "#",
      username: "@luxuryonlinemart",
      enabled: false,
    },
    twitter: {
      url: null,
      username: null,
      enabled: false,
    },
    youtube: {
      url: null,
      username: null,
      enabled: false,
    },
    tiktok: {
      url: null,
      username: null,
      enabled: false,
    },
  },

  // =========================================================================
  // ASSETS
  // =========================================================================
  assets: {
    logo: "/logo.webp",
    logoAlt: "luxury_Logo",
    favicon: "/favicon.png",
    appleTouchIcon: "/apple-touch-icon.png",
    faviconIco: "/favicons.ico",
    paymentMethods: "/images/payment-methods.png",
    ogImage: "/og-image.png",
    // Logo variants for different themes
    logoLight: "/logo.webp",
    logoDark: "/logo.webp",
  },

  // =========================================================================
  // SEO METADATA
  // =========================================================================
  seo: {
    title: "Baby Products & Kids Accessories | Luxury Online Mart",
    description:
      "Shop baby products, kids accessories, toys, clothing, feeding essentials, diapers, baby care, and nursery items at Luxury Online Mart. Fast delivery across Bangladesh.",
    keywords: [
      "baby products",
      "kids accessories",
      "baby shop Bangladesh",
      "baby care products",
      "baby toys",
      "baby clothing",
      "newborn essentials",
      "diapers Bangladesh",
      "feeding accessories",
      "Luxury Online Mart",
      "online baby store",
      "baby fashion BD",
    ],
    twitterCard: "summary_large_image",
    siteName: "Luxury Online Mart",
    locale: "en_US",
    type: "website",
  },

  // =========================================================================
  // EXTERNAL SERVICES
  // =========================================================================
  services: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://localhost:3000",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-T2HZLQ22",
    firebase: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    },
  },

  // =========================================================================
  // LEGAL INFORMATION
  // =========================================================================
  legal: {
    copyright: `© ${new Date().getFullYear()} ${"Luxury Online Mart"}. All rights reserved.`,
    companyName: "Luxury Online Mart",
    companyRegistration: "", // Add if applicable
    taxId: "", // Add if applicable
    privacyPolicy: "/privacy-policy",
    termsConditions: "/terms-conditions",
    returnPolicy: "/return-policy",
    refundPolicy: "/refund-policy",
    shippingPolicy: "/shipping-policy",
  },

  // =========================================================================
  // NAVIGATION LINKS
  // =========================================================================
  navigation: {
    // Company information links
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contact-us" },
      { name: "Store Location", href: "/store-location" },
      { name: "Blog", href: "/blog" },
    ],

    // Customer service links
    customer: [
      { name: "My Account", href: "/account" },
      { name: "Order Tracking", href: "/order-tracking" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns & Exchange", href: "/returns" },
      { name: "Payment Methods", href: "/payments" },
      { name: "FAQ", href: "/faq" },
    ],

    // Legal & policy links
    legal: [
      { name: "Return Policy", href: "/return-policy" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms & Conditions", href: "/terms-conditions" },
    ],

    // Social links (for quick access)
    social: [
      {
        name: "Facebook",
        href: "https://www.facebook.com/Prioryourpriority",
        icon: "facebook",
      },
      { name: "Instagram", href: "#", icon: "instagram" },
    ],
  },

  // =========================================================================
  // BUSINESS HOURS (optional, if applicable)
  // =========================================================================
  businessHours: {
    weekdays: "10:00 AM - 9:00 PM",
    friday: "3:00 PM - 9:00 PM",
    saturday: "10:00 AM - 9:00 PM",
    timezone: "Asia/Dhaka",
  },

  // =========================================================================
  // PAYMENT METHODS (for display)
  // =========================================================================
  paymentMethods: {
    available: [
      { name: "Cash on Delivery", enabled: true },
      { name: "bKash", enabled: true },
      { name: "Nagad", enabled: true },
      { name: "Card Payment", enabled: false },
      { name: "Bank Transfer", enabled: false },
    ],
    showPaymentMethodsImage: true,
  },

  // =========================================================================
  // FEATURE FLAGS
  // =========================================================================
  features: {
    enableWishlist: true,
    enableCompare: true,
    enableReviews: true,
    enableMultiCurrency: false,
    enableMultiLanguage: false,
    enableLiveChat: process.env.NEXT_PUBLIC_ENABLE_CHAT_WIDGET === "true",
  },
};

// Export the type for use in other files
export type BrandConfig = typeof brandConfig;

// Helper functions for common use cases
export const getSocialUrl = (
  platform: keyof typeof brandConfig.social,
): string | null => {
  const social = brandConfig.social[platform];
  return social?.enabled && social?.url ? social.url : null;
};

export const getContactPhone = (
  format: "display" | "link" | "whatsapp" = "display",
): string => {
  return brandConfig.contact.phone[format];
};

export const getContactEmail = (
  format: "display" | "address" = "display",
): string => {
  return brandConfig.contact.email[format];
};

export const getCopyrightYear = (): string => {
  return new Date().getFullYear().toString();
};

export const getCopyrightText = (): string => {
  return `© ${getCopyrightYear()} ${brandConfig.identity.name}. All rights reserved.`;
};

export const getSocialLinks = () => {
  return Object.entries(brandConfig.social)
    .filter(([_, config]) => config.enabled && config.url)
    .map(([platform, config]) => ({
      platform,
      url: config.url,
      username: config.username,
    }));
};

export default brandConfig;
