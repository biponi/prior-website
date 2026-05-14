import { DesignSystem } from "@/lib/design-system/types";

/**
 * Design System Configuration
 *
 * This file contains all configuration related to design system switching,
 * including environment variables, A/B testing settings, and route overrides.
 */

export const designSystemConfig = {
  /**
   * Get the design system from environment variable
   * Falls back to 'editorial' if not set
   */
  getSystemFromEnv(): DesignSystem {
    const envSystem = process.env.NEXT_PUBLIC_DESIGN_SYSTEM as DesignSystem;
    if (envSystem === "editorial" || envSystem === "babybloom") {
      return envSystem;
    }
    return "editorial";
  },

  /**
   * Get the A/B test rollout percentage for Baby Bloom
   * Value between 0-100
   */
  getBabyBloomRolloutPercentage(): number {
    const percentage = parseInt(
      process.env.NEXT_PUBLIC_BABY_BLOOM_ROLLOUT_PERCENTAGE || "0",
      10
    );
    return Math.min(100, Math.max(0, percentage));
  },

  /**
   * Check if A/B testing is enabled for design systems
   */
  isABTestingEnabled(): boolean {
    return this.getBabyBloomRolloutPercentage() > 0;
  },

  /**
   * Route-based overrides for specific design systems
   * Routes will use the specified design system regardless of A/B test assignment
   */
  routeOverrides: {
    // Example: Force Baby Bloom on specific routes
    // "/baby-products": "babybloom" as DesignSystem,
    // "/test-bloom": "babybloom" as DesignSystem,
  },

  /**
   * Get design system for a specific route
   * Returns the override if exists, otherwise returns null (use default)
   */
  getSystemForRoute(pathname: string): DesignSystem | null {
    return (this.routeOverrides as Record<string, DesignSystem>)[pathname] || null;
  },

  /**
   * User segment-based targeting (future implementation)
   * Can be used to target specific user segments with different design systems
   */
  getSystemForUser(user: any): DesignSystem | null {
    // Future: Implement user segment logic here
    // Example: BD users get Baby Bloom, others get Editorial
    return null;
  },

  /**
   * Check if a design system is valid
   */
  isValidSystem(system: string): system is DesignSystem {
    return system === "editorial" || system === "babybloom";
  },
};

/**
 * Helper function to determine if Baby Bloom should be shown based on A/B test
 * @param userId Optional user ID for consistent assignment
 * @returns DesignSystem to use
 */
export function assignDesignSystem(userId?: string): DesignSystem {
  const config = designSystemConfig;

  // Check environment variable first (highest priority)
  const envSystem = process.env.NEXT_PUBLIC_DESIGN_SYSTEM as DesignSystem;
  if (config.isValidSystem(envSystem)) {
    return envSystem;
  }

  // Check A/B test rollout percentage
  const rolloutPercentage = config.getBabyBloomRolloutPercentage();
  if (rolloutPercentage === 0) {
    return "editorial";
  }

  if (rolloutPercentage === 100) {
    return "babybloom";
  }

  // Perform A/B test assignment
  // Use user ID for consistent assignment, or random for anonymous
  const randomValue = userId
    ? hashUserId(userId) % 100
    : Math.random() * 100;

  return randomValue < rolloutPercentage ? "babybloom" : "editorial";
}

/**
 * Simple hash function for user ID to ensure consistent assignment
 */
function hashUserId(userId: string): number {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
