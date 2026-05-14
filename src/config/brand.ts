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
      display: "+880 1700 534317",
      link: "tel:+8801700534317",
      whatsapp: "+8801700534317",
    },
    email: {
      display: "info@priorbd.com",
      address: "prior.retailshop.info.bd@gmail.com",
    },
    address: {
      full: "Dhaka, Dhanmondi 27, Genetic Plaza, Shop no : 134",
      city: "Dhaka",
      area: "Dhanmondi",
      building: "Genetic Plaza",
      shopNumber: "134",
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
      url: "https://www.facebook.com/Prioryourpriority",
      username: "@Prioryourpriority",
      enabled: true,
    },
    instagram: {
      url: "#",
      username: "@prior",
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
    title: "Women's Shoes and Bags | Prior - Your Priority in Fashion",
    description:
      "Discover Prior's latest collection of women's shoes and bags. Shop trendy footwear, handbags, and accessories with fast shipping across Bangladesh. Your priority in fashion.",
    keywords: [
      "women's shoes",
      "ladies footwear",
      "handbags",
      "fashion accessories",
      "Prior",
      "Bangladesh fashion",
      "online shopping",
      "shoes BD",
      "bags BD",
    ],
    twitterCard: "summary_large_image",
    siteName: "Prior",
    locale: "en_US",
    type: "website",
  },

  // =========================================================================
  // EXTERNAL SERVICES
  // =========================================================================
  services: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://app.priorbd.com",
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
    copyright: `© ${new Date().getFullYear()} ${"Prior"}. All rights reserved.`,
    companyName: "Prior Your Priority",
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
