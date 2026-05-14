"use client";

import dynamic from "next/dynamic";
import { useDesignSystem } from "@/lib/design-system/DesignSystemProvider";

// Code split the footers to only load the active design system
const EditorialFooter = dynamic(
  () => import("./design-system-agnostic/Footer/EditorialFooter").then(mod => ({
    default: mod.default,
  })),
  {
    ssr: true,
    loading: () => (
      <div className="bg-neutral-900 h-96 animate-pulse" />
    ),
  }
);

const BabyBloomFooter = dynamic(
  () => import("./design-system-agnostic/Footer/BabyBloomFooter").then(mod => ({
    default: mod.default,
  })),
  {
    ssr: true,
    loading: () => (
      <div className="bg-white h-96 animate-pulse" />
    ),
  }
);

/**
 * Smart Footer Component
 *
 * Dynamically loads the appropriate footer based on the active design system.
 * Uses code splitting to minimize bundle size.
 */
export default function SmartFooter() {
  const { isBabyBloom } = useDesignSystem();

  if (isBabyBloom) {
    return <BabyBloomFooter />;
  }

  return <EditorialFooter />;
}
