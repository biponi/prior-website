# Design System Feature Flag Implementation

This document describes the design system feature flag implementation that allows switching between "Editorial" and "Baby Bloom" design systems.

## Overview

The project now supports multiple design systems that can be switched via:
- Environment variables
- A/B testing
- Runtime switching (via admin panel or URL parameter)

## Architecture

### File Structure

```
src/
├── lib/
│   └── design-system/
│       ├── types.ts                          # TypeScript types
│       ├── DesignSystemProvider.tsx          # Context provider with A/B testing
│       ├── useDesignSystem.ts                # Hook to access design system
│       └── tokens/
│           ├── editorial.ts                  # Editorial design tokens
│           ├── babybloom.ts                  # Baby Bloom design tokens
│           └── index.ts                      # Token selector
├── config/
│   └── design-system.ts                      # Configuration & utilities
├── components/
│   ├── SmartHeader.tsx                       # Dynamic header selector
│   ├── SmartFooter.tsx                       # Dynamic footer selector
│   └── design-system-agnostic/
│       ├── Header/
│       │   ├── EditorialHeader.tsx          # Editorial header
│       │   └── BabyBloomHeader.tsx          # Baby Bloom header
│       ├── Footer/
│       │   ├── EditorialFooter.tsx          # Editorial footer
│       │   └── BabyBloomFooter.tsx          # Baby Bloom footer
│       └── ProductCard/
│           ├── EditorialProductCard.tsx     # Editorial product card (future)
│           └── BabyBloomProductCard.tsx     # Baby Bloom product card (future)
└── app/
    ├── layout.tsx                            # Root layout with DesignSystemProvider
    └── globals.css                           # CSS variables for both design systems
```

## Configuration

### Environment Variables

Add these to your `.env` file:

```bash
# Design System Configuration
# Options: 'editorial' (current) or 'babybloom' (new)
# Leave empty to enable A/B testing based on rollout percentage
NEXT_PUBLIC_DESIGN_SYSTEM=editorial

# A/B Testing: Baby Bloom Rollout Percentage (0-100)
# Set to 0 to disable A/B testing and use Editorial only
# Set to 100 to show Baby Bloom to all users
# Set to a value between 0-100 to show Baby Bloom to that percentage of users
NEXT_PUBLIC_BABY_BLOOM_ROLLOUT_PERCENTAGE=0
```

### Design System Switching

#### Method 1: Environment Variable (Simplest)

```bash
# Force Baby Bloom design system
NEXT_PUBLIC_DESIGN_SYSTEM=babybloom

# Force Editorial design system
NEXT_PUBLIC_DESIGN_SYSTEM=editorial
```

**Note:** Requires rebuild to take effect.

#### Method 2: A/B Testing

```bash
# Disable A/B testing (Editorial only)
NEXT_PUBLIC_BABY_BLOOM_ROLLOUT_PERCENTAGE=0

# Show Baby Bloom to 50% of users
NEXT_PUBLIC_BABY_BLOOM_ROLLOUT_PERCENTAGE=50

# Show Baby Bloom to all users
NEXT_PUBLIC_BABY_BLOOM_ROLLOUT_PERCENTAGE=100
```

**Note:** User assignment is consistent (stored in localStorage) and persists across sessions.

#### Method 3: Runtime Switching (Programmatic)

```typescript
import { useDesignSystem } from "@/lib/design-system/DesignSystemProvider";

function MyComponent() {
  const { system, setSystem, isBabyBloom, isEditorial } = useDesignSystem();

  // Switch to Baby Bloom
  const switchToBabyBloom = () => setSystem("babybloom");

  // Switch to Editorial
  const switchToEditorial = () => setSystem("editorial");

  return (
    <div>
      <p>Current system: {system}</p>
      {isBabyBloom && <p>Baby Bloom is active</p>}
      {isEditorial && <p>Editorial is active</p>}
      <button onClick={switchToBabyBloom}>Switch to Baby Bloom</button>
      <button onClick={switchToEditorial}>Switch to Editorial</button>
    </div>
  );
}
```

## Design System Tokens

### Editorial Design Tokens

```typescript
{
  colors: {
    primary: "#0b3393",      // Blue
    background: "#FFFFFF",
    foreground: "#191C1F",
    border: "#E3E3E3",
    // ...
  },
  typography: {
    fontFamily: "Noto Sans Devanagari",
    // ...
  }
}
```

### Baby Bloom Design Tokens

```typescript
{
  colors: {
    primary: "#CD2A75",      // Pink
    background: "#FFFFFF",
    foreground: "#191C1F",
    border: "rgba(205, 42, 117, 0.14)",  // Pink with opacity
    muted: "#FDF5F8",        // Light pink tint
    // ...
  },
  typography: {
    fontFamily: "Inter, Public Sans",
    // ...
  }
}
```

## Component Implementation

### Creating Design-Specific Components

When creating new components that need design system variants:

1. **Create separate component files:**
   ```
   src/components/design-system-agnostic/MyComponent/
   ├── EditorialMyComponent.tsx
   └── BabyBloomMyComponent.tsx
   ```

2. **Create a smart selector:**
   ```typescript
   // src/components/SmartMyComponent.tsx
   "use client";

   import dynamic from "next/dynamic";
   import { useDesignSystem } from "@/lib/design-system/DesignSystemProvider";

   const EditorialMyComponent = dynamic(() =>
     import("./design-system-agnostic/MyComponent/EditorialMyComponent").then(mod => ({
       default: mod.default,
     }))
   );

   const BabyBloomMyComponent = dynamic(() =>
     import("./design-system-agnostic/MyComponent/BabyBloomMyComponent").then(mod => ({
       default: mod.default,
     }))
   );

   export default function SmartMyComponent() {
     const { isBabyBloom } = useDesignSystem();

     if (isBabyBloom) {
       return <BabyBloomMyComponent />;
     }

     return <EditorialMyComponent />;
   }
   ```

3. **Use the smart component in pages:**
   ```typescript
   import SmartMyComponent from "@/components/SmartMyComponent";

   export default function MyPage() {
     return <SmartMyComponent />;
   }
   ```

### Using Design Tokens in Components

```typescript
import { useDesignSystem } from "@/lib/design-system/DesignSystemProvider";

function MyComponent() {
  const { tokens } = useDesignSystem();

  return (
    <div style={{
      color: tokens.colors.primary,
      fontFamily: tokens.typography.fontFamily,
      padding: tokens.spacing.md,
    }}>
      This component uses design system tokens
    </div>
  );
}
```

Or using Tailwind classes with CSS variables:

```tsx
<div className="text-ds-primary border border-ds-border bg-ds-muted">
  This uses Tailwind with design system colors
</div>
```

## Testing

### Test Editorial Design System

```bash
# .env
NEXT_PUBLIC_DESIGN_SYSTEM=editorial
```

### Test Baby Bloom Design System

```bash
# .env
NEXT_PUBLIC_DESIGN_SYSTEM=babybloom
```

### Test A/B Testing

```bash
# .env
NEXT_PUBLIC_BABY_BLOOM_ROLLOUT_PERCENTAGE=50
```

Then:
1. Open the application in an incognito window
2. Refresh multiple times to see different design systems
3. Check that assignment persists (localStorage)

## Performance Considerations

### Code Splitting

Components are dynamically imported to minimize bundle size:
- Only the active design system's components are loaded
- Approximately 5-10KB additional JS per design system variant
- Loading states are shown during component load

### Font Loading

Both font families are loaded in the root layout:
- **Editorial:** Noto Sans Devanagari (already in use)
- **Baby Bloom:** Inter + Public Sans (new)

Fonts use `font-display: swap` for performance.

### CSS Variables

Design tokens are mapped to CSS custom properties:
- No runtime JavaScript overhead for color changes
- Automatic browser optimization
- Works seamlessly with Tailwind CSS

## Future Enhancements

### Adding New Design Systems

1. **Create token file:**
   ```typescript
   // src/lib/design-system/tokens/newdesign.ts
   export const newdesignTokens: DesignTokens = {
     // ... your tokens
   };
   ```

2. **Update types:**
   ```typescript
   // src/lib/design-system/types.ts
   export type DesignSystem = "editorial" | "babybloom" | "newdesign";
   ```

3. **Update token selector:**
   ```typescript
   // src/lib/design-system/tokens/index.ts
   export const tokens: Record<DesignSystem, DesignTokens> = {
     editorial: editorialTokens,
     babybloom: babybloomTokens,
     newdesign: newdesignTokens,
   };
   ```

4. **Add CSS variables:**
   ```css
   /* src/app/globals.css */
   [data-design-system="newdesign"] {
     --ds-primary: ...;
     /* ... */
   }
   ```

5. **Create component variants:**
   - `NewDesignHeader.tsx`
   - `NewDesignFooter.tsx`
   - etc.

6. **Update smart selectors:**
   ```typescript
   if (system === "newdesign") {
     return <NewDesignHeader />;
   }
   ```

### User-Level Targeting

The config file supports user-level targeting:

```typescript
// src/config/design-system.ts
getSystemForUser(user: any): DesignSystem | null {
  // Target BD users with Baby Bloom
  if (user.country === "BD") {
    return "babybloom";
  }
  return "editorial";
}
```

### Route-Based Overrides

Force specific routes to use a particular design system:

```typescript
// src/config/design-system.ts
routeOverrides: {
  "/baby-products": "babybloom",
  "/test-bloom": "babybloom",
}
```

## Troubleshooting

### Design System Not Switching

1. **Check environment variables:**
   ```bash
   grep NEXT_PUBLIC_DESIGN_SYSTEM .env
   ```

2. **Clear localStorage:**
   ```javascript
   localStorage.removeItem("design-system");
   ```

3. **Check browser console for errors**

### Styles Not Applying

1. **Check data attribute:**
   ```javascript
   console.log(document.documentElement.getAttribute("data-design-system"));
   ```

2. **Verify CSS variables are set:**
   ```css
   [data-design-system="babybloom"] {
     --ds-primary: 338 66% 47%;
   }
   ```

3. **Rebuild the project:**
   ```bash
   npm run build
   ```

### Components Not Loading

1. **Check dynamic imports are correct:**
   ```typescript
   const BabyBloomHeader = dynamic(() =>
     import("./design-system-agnostic/Header/BabyBloomHeader").then(mod => ({
       default: mod.default,
     }))
   );
   ```

2. **Verify file paths are correct**

3. **Check for TypeScript errors**

## Summary

This design system feature flag implementation provides:

✅ Environment variable-based switching
✅ A/B testing with percentage-based rollout
✅ Runtime switching capabilities
✅ Code splitting for optimal bundle size
✅ Consistent user assignment (localStorage)
✅ Easy to extend with new design systems
✅ TypeScript type safety
✅ CSS custom properties for performance
✅ Smart component selectors for automatic switching

The architecture is flexible and allows for easy addition of new design systems in the future.
