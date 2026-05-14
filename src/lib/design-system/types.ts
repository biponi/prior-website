export type DesignSystem = "editorial" | "babybloom";

export interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    card: string;
    border: string;
    muted: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
  };
  typography: {
    fontFamily: string;
    headingFont: string;
    bodyFont: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
      "4xl": string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  borderWidth: {
    thin: string;
    normal: string;
    thick: string;
  };
}

export interface DesignSystemContextType {
  system: DesignSystem;
  setSystem: (system: DesignSystem) => void;
  tokens: DesignTokens;
  isBabyBloom: boolean;
  isEditorial: boolean;
}
