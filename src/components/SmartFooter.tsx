"use client";

import dynamic from "next/dynamic";

const BabyBloomFooter = dynamic(
  () =>
    import("./design-system-agnostic/Footer/BabyBloomFooter").then((mod) => ({
      default: mod.default,
    })),
  {
    ssr: true,
    loading: () => <div className='bg-white h-96 animate-pulse' />,
  },
);

/**
 * Smart Footer Component
 *
 * Dynamically loads the appropriate footer based on the active design system.
 * Uses code splitting to minimize bundle size.
 */
export default function SmartFooter() {
  return <BabyBloomFooter />;
}
