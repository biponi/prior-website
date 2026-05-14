"use client";

import dynamic from "next/dynamic";
import { useDesignSystem } from "@/lib/design-system/DesignSystemProvider";

// Code split the headers to only load the active design system
const EditorialHeader = dynamic(
  () => import("./design-system-agnostic/Header/EditorialHeader").then(mod => ({
    default: mod.default,
  })),
  {
    ssr: true,
    loading: () => (
      <div className="sticky top-0 z-50 h-20 bg-white border-b border-gray-200 animate-pulse" />
    ),
  }
);

const BabyBloomHeader = dynamic(
  () => import("./design-system-agnostic/Header/BabyBloomHeader").then(mod => ({
    default: mod.default,
  })),
  {
    ssr: true,
    loading: () => (
      <div className="sticky top-0 z-50 h-32 bg-white border-b border-gray-200 animate-pulse" />
    ),
  }
);

/**
 * Smart Header Component
 *
 * Dynamically loads the appropriate header based on the active design system.
 * Uses code splitting to minimize bundle size.
 */
export default function SmartHeader() {
  const { isBabyBloom } = useDesignSystem();

  if (isBabyBloom) {
    return <BabyBloomHeader />;
  }

  return <EditorialHeader />;
}
