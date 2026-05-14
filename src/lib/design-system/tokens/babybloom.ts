import { DesignTokens } from "../types";

export const babybloomTokens: DesignTokens = {
  colors: {
    primary: "#CD2A75", // Pink
    secondary: "#6B7280",
    background: "#FFFFFF",
    foreground: "#191C1F",
    card: "#FFFFFF",
    border: "rgba(205, 42, 117, 0.14)", // Pink with opacity
    muted: "#FDF5F8", // Light pink tint
    accent: "#CD2A75",
    success: "#30AD2E",
    warning: "#FF7E05",
    error: "#EE5858",
  },
  typography: {
    fontFamily: "var(--font-inter), var(--font-public-sans), sans-serif",
    headingFont: "var(--font-inter), sans-serif",
    bodyFont: "var(--font-public-sans), sans-serif",
    fontSize: {
      xs: "0.75rem",    // 12px
      sm: "0.875rem",   // 14px
      base: "1rem",     // 16px
      lg: "1.125rem",   // 18px
      xl: "1.25rem",    // 20px
      "2xl": "1.5rem",  // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: "0.5rem",   // 8px
    sm: "0.75rem",  // 12px
    md: "1rem",     // 16px
    lg: "1.5rem",   // 24px
    xl: "2rem",     // 32px
    "2xl": "3rem",  // 48px
  },
  borderRadius: {
    sm: "0.25rem",  // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem",   // 8px
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  },
  borderWidth: {
    thin: "1px",
    normal: "1.5px",
    thick: "2px",
  },
};
