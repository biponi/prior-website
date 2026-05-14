"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { DesignSystem, DesignSystemContextType, DesignTokens } from "./types";
import { getTokens } from "./tokens";

interface DesignSystemProviderProps {
  children: ReactNode;
  defaultSystem?: DesignSystem;
  forceSystem?: DesignSystem;
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

export function DesignSystemProvider({
  children,
  defaultSystem = "editorial",
  forceSystem,
}: DesignSystemProviderProps) {
  const [system, setSystemState] = useState<DesignSystem>(defaultSystem);
  const [tokens, setTokens] = useState<DesignTokens>(getTokens(defaultSystem));

  // Initialize design system on mount
  useEffect(() => {
    // Priority: forceSystem > localStorage > environment variable > default
    let selectedSystem: DesignSystem = defaultSystem;

    // Check for force system (useful for testing)
    if (forceSystem) {
      selectedSystem = forceSystem;
    }
    // Check environment variable
    else if (process.env.NEXT_PUBLIC_DESIGN_SYSTEM) {
      const envSystem = process.env.NEXT_PUBLIC_DESIGN_SYSTEM as DesignSystem;
      if (envSystem === "editorial" || envSystem === "babybloom") {
        selectedSystem = envSystem;
      }
    }
    // Check for A/B test assignment in localStorage
    else {
      const storedSystem = localStorage.getItem("design-system");
      if (storedSystem === "editorial" || storedSystem === "babybloom") {
        selectedSystem = storedSystem as DesignSystem;
      } else {
        // Perform A/B test assignment
        const rolloutPercentage = parseInt(
          process.env.NEXT_PUBLIC_BABY_BLOOM_ROLLOUT_PERCENTAGE || "0",
          10
        );

        if (rolloutPercentage > 0) {
          const randomValue = Math.random() * 100;
          selectedSystem = randomValue < rolloutPercentage ? "babybloom" : "editorial";
        }

        // Store the assignment
        localStorage.setItem("design-system", selectedSystem);
      }
    }

    setSystemState(selectedSystem);
    setTokens(getTokens(selectedSystem));

    // Apply data attribute to document for CSS selectors
    document.documentElement.setAttribute("data-design-system", selectedSystem);
  }, [defaultSystem, forceSystem]);

  // Update tokens and data attribute when system changes
  useEffect(() => {
    setTokens(getTokens(system));
    document.documentElement.setAttribute("data-design-system", system);
    localStorage.setItem("design-system", system);
  }, [system]);

  const setSystem = (newSystem: DesignSystem) => {
    setSystemState(newSystem);
  };

  const value: DesignSystemContextType = {
    system,
    setSystem,
    tokens,
    isBabyBloom: system === "babybloom",
    isEditorial: system === "editorial",
  };

  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
}

export function useDesignSystem(): DesignSystemContextType {
  const context = useContext(DesignSystemContext);
  if (context === undefined) {
    throw new Error("useDesignSystem must be used within a DesignSystemProvider");
  }
  return context;
}
