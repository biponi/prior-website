"use client";

import dynamic from "next/dynamic";

const BabyBloomHeader = dynamic(
  () =>
    import("./design-system-agnostic/Header/BabyBloomHeader").then((mod) => ({
      default: mod.default,
    })),
  {
    ssr: true,
    loading: () => (
      <div className='sticky top-0 z-50 h-32 bg-white border-b border-gray-200 animate-pulse' />
    ),
  },
);

/**
 * Smart Header Component
 *
 * Dynamically loads the appropriate header based on the active design system.
 * Uses code splitting to minimize bundle size.
 */
export default function SmartHeader() {
  return <BabyBloomHeader />;
}
