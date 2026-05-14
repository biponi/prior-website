import { DesignTokens, DesignSystem } from "../types";
import { editorialTokens } from "./editorial";
import { babybloomTokens } from "./babybloom";

export const tokens: Record<DesignSystem, DesignTokens> = {
  editorial: editorialTokens,
  babybloom: babybloomTokens,
};

export function getTokens(system: DesignSystem): DesignTokens {
  return tokens[system];
}
