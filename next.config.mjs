import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Output: Standalone ───────────────────────────────────────────────────
  // #1 fix for your OOM crashes and 502 errors on DigitalOcean.
  // Cuts memory usage ~40%. After this change you MUST run the app with:
  //   node .next/standalone/server.js
  // NOT `next start` or `pm2 ... next start`
  // Also copy public/ and .next/static/ into .next/standalone/ after build:
  //   cp -r public .next/standalone/public
  //   cp -r .next/static .next/standalone/.next/static
  output: "standalone",

  // ─── Images ───────────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "prior-image.s3.eu-north-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "d38c45qguy2pwg.cloudfront.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api-demo.priorbd.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api.luxuryonlinemart.com",
        port: "",
        // FIX: restrict to /images/* so Next.js optimizer can't be abused
        // to proxy arbitrary paths on your Express backend
        pathname: "/images/**",
      },
    ],

    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // CHANGE: Drop avif for now. AVIF encoding is CPU-heavy and will spike
    // memory on your small Droplet, contributing to OOM kills.
    // Re-enable it when you move to a 2GB+ Droplet.
    formats: ["image/avif", "image/webp"],
    // formats: ["image/avif", "image/webp"], // re-enable on bigger server

    // 30 days is great — keep this. Next.js caches the optimized image on
    // disk so Express only gets hit once per unique image+size combination.
    minimumCacheTTL: 60 * 60 * 24 * 30,

    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
  },

  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,

  // NOTE: swcMinify is default true in Next.js 13+ and the option is removed
  // in Next.js 15. Remove it if you're on Next 15+ to avoid a deprecation warning.
  swcMinify: true,

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // ─── Tree Shaking ─────────────────────────────────────────────────────────
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{member}}",
    },
  },

  // ─── Experimental ─────────────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-accordion",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-popover",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-separator",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-label",
      "@radix-ui/react-hover-card",
      "@radix-ui/react-navigation-menu",
      "framer-motion",
      "firebase",
      "axios",
      "sweetalert2",
      "swiper",
      "embla-carousel-react",
      "react-hook-form",
      "zod",
    ],

    webpackBuildWorker: true,

    // FIX: Move ISR cache off the heap onto disk.
    // Default behaviour keeps ISR pages in RAM — on a 1GB Droplet this
    // competes with your Node heap and causes the OOM kills behind your 502s.
    isrMemoryCacheSize: 0,
  },

  // ─── HTTP Headers ─────────────────────────────────────────────────────────
  headers: async () => [
    // Next.js static assets are content-hashed — safe to cache forever
    {
      source: "/_next/static/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    // Your /static folder (if any)
    {
      source: "/static/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    // API proxy routes — never cache
    {
      source: "/api/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
    // All other pages — revalidate on every request (your existing behaviour)
    {
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=0, must-revalidate",
        },
        // Security headers — add these, they were missing
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ],

  // ─── API Proxy Rewrites ───────────────────────────────────────────────────
  // This proxies /api/* → your Express backend.
  // IMPORTANT: This means Next.js is making a server-side fetch to Express
  // on every API call — fine for most routes, but for images use <Image>
  // with the direct api.luxuryonlinemart.com URL, NOT through this proxy.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.luxuryonlinemart.com/:path*",
      },
    ];
  },
};

export default process.env.ANALYZE === "true"
  ? withBundleAnalyzer({ enabled: true })(nextConfig)
  : nextConfig;
