# FraudLink Design System

## Overview

A modern, professional fraud detection UI with dark theme, glassmorphism, neon accents, and smooth animations using Framer Motion.

## Color Palette

### Neon Risk Colors
- **Critical**: `#ff3b3b` (Red) - For critical alerts
- **High**: `#ff8c00` (Orange) - For high-risk items
- **Medium**: `#ffd700` (Yellow) - For medium-risk items
- **Safe**: `#00ff88` (Green) - For safe/clean status

### Theme Colors
- **Background**: `#0a0f1e` (Deep Navy/Charcoal)
- **Card**: `#0d1117` (Darker Navy)
- **Foreground**: `#e8ecf1` (Light Gray)
- **Muted**: `#1a1f2e` (Medium Navy)
- **Border**: `#1a2332` (Navy with slight tint)

## Design Features

### 1. Glassmorphism Cards

Three levels of glass effect:

```tsx
// Standard glass - subtle blur
<div className="glass rounded-xl p-4">Content</div>

// Strong glass - enhanced blur for prominent elements
<div className="glass-strong rounded-xl p-4">Content</div>

// Extra large glass - maximum blur
<div className="glass-xl rounded-xl p-4">Content</div>
```

### 2. Glowing Borders

Apply neon glow effects to elements:

```tsx
// Critical risk glow
<div className="glow-critical-border rounded-lg p-4">Content</div>

// High risk glow
<div className="glow-high-border rounded-lg p-4">Content</div>

// Medium risk glow
<div className="glow-medium-border rounded-lg p-4">Content</div>

// Safe status glow
<div className="glow-safe-border rounded-lg p-4">Content</div>
```

### 3. Text Glows

Glowing text effects for data values:

```tsx
// Critical text glow
<p className="text-glow-critical mono-value">Critical Alert</p>

// High text glow
<p className="text-glow-high mono-value">High Risk</p>

// Medium text glow
<p className="text-glow-medium mono-value">Medium Alert</p>

// Safe text glow
<p className="text-glow-safe mono-value">All Clear</p>
```

### 4. Risk Badges

Professional badge components:

```tsx
// Critical badge
<div className="badge-critical">🚨 CRITICAL</div>

// High badge
<div className="badge-high">⚠️ HIGH</div>

// Medium badge
<div className="badge-medium">⚡ MEDIUM</div>

// Safe badge
<div className="badge-safe">✓ SAFE</div>
```

### 5. Monospace Variants

Professional monospace typography for data:

```tsx
// Label - small uppercase monospace
<p className="mono-label">INVESTIGATION_ID</p>

// Data - medium monospace for values
<p className="mono-data">Risk Score: 87.5%</p>

// Value - large bold monospace for important numbers
<p className="mono-value">$2,450,000.00</p>
```

## Animations

### CSS Animations

```tsx
// Pulsing ring animation
<div className="animate-pulse-ring">Content</div>

// Glowing pulse
<div className="animate-glow-pulse">Content</div>

// Node pulse (for graph nodes)
<circle className="animate-node-pulse" />

// Edge glow (for graph edges)
<path className="animate-edge-glow" />

// Float animation
<div className="animate-float">Content</div>

// Shimmer effect
<div className="animate-shimmer">Content</div>

// Dash flow (for animated strokes)
<path className="animate-dash" />

// Counter up animation
<div className="animate-counter">123</div>

// Slide in animations
<div className="animate-slide-in-right">Content</div>
<div className="animate-slide-in-left">Content</div>

// Fade in animation
<div className="animate-fade-in">Content</div>
```

### Framer Motion Animations

Import animation variants for Framer Motion:

```tsx
import { ANIMATION_VARIANTS } from "@/lib/design-tokens"
import { motion } from "framer-motion"

// Container with stagger effect
<motion.div
  variants={ANIMATION_VARIANTS.container}
  initial="hidden"
  animate="visible"
>
  {/* Items will appear with stagger */}
</motion.div>

// Individual item animation
<motion.div variants={ANIMATION_VARIANTS.item}>
  Content
</motion.div>

// Slide in animation
<motion.div {...ANIMATION_VARIANTS.slideIn}>
  Content
</motion.div>

// Fade animation
<motion.div {...ANIMATION_VARIANTS.fade}>
  Content
</motion.div>

// Pulse animation
<motion.div {...ANIMATION_VARIANTS.pulse}>
  Content
</motion.div>

// Float animation
<motion.div {...ANIMATION_VARIANTS.float}>
  Content
</motion.div>
```

## Design Token Utilities

### Using Design Tokens

```tsx
import { 
  DESIGN_TOKENS, 
  getRiskColor, 
  getRiskGlowClass,
  getRiskTextGlowClass,
  getBadgeClass 
} from "@/lib/design-tokens"

// Get neon color for a risk level
const color = getRiskColor("critical") // #ff3b3b

// Get glow class for a risk level
const glowClass = getRiskGlowClass("high") // "glow-high-border"

// Get text glow class
const textGlow = getRiskTextGlowClass("safe") // "text-glow-safe"

// Get badge class
const badgeClass = getBadgeClass("medium") // "badge-medium"
```

## Component Examples

### Enhanced Navbar

```tsx
<header className="sticky top-0 z-30 glass-strong border-b border-border/40">
  <div className="flex items-center justify-between px-6 py-3">
    {/* Logo with glow */}
    <div className="flex items-center gap-3">
      <div className="glow-critical-border rounded-xl p-2">
        <ShieldIcon className="text-risk-critical animate-glow-pulse" />
      </div>
      <h1 className="font-mono text-base font-bold">
        FraudLink <span className="text-risk-critical">AI</span>
      </h1>
    </div>

    {/* Status badge */}
    <motion.div
      className="badge-critical"
      animate={{ opacity: [1, 0.6, 1] }}
      transition={{ duration: 1.6, repeat: Infinity }}
    >
      LIVE MONITORING
    </motion.div>
  </div>
</header>
```

### Risk Card

```tsx
<motion.div
  className="card-glass-strong glow-critical-border p-6 space-y-4"
  whileHover={{ scale: 1.02 }}
>
  <div className="flex items-center justify-between">
    <p className="mono-label">RISK SCORE</p>
    <div className="badge-critical">CRITICAL</div>
  </div>
  <p className="mono-value text-glow-critical">92.5%</p>
  <p className="text-sm text-muted-foreground">
    High probability of fraudulent activity detected
  </p>
</motion.div>
```

### Animated Data Display

```tsx
<div className="card-glass-strong p-6 space-y-3">
  <div className="flex justify-between items-center">
    <p className="mono-label">TRANSACTIONS</p>
    <motion.p
      className="mono-value text-glow-high"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      247
    </motion.p>
  </div>
  <div className="h-2 bg-card rounded-full overflow-hidden">
    <motion.div
      className="h-full bg-risk-high"
      initial={{ width: 0 }}
      animate={{ width: "75%" }}
      transition={{ duration: 1, delay: 0.2 }}
    />
  </div>
</div>
```

## Typography

### Font Stack
- **Sans**: Geist (fallback: system UI)
- **Mono**: JetBrains Mono (for data and technical values)

### Monospace Classes
- `.mono-label` - Small uppercase monospace (11px, tracking-widest)
- `.mono-data` - Medium monospace (14px, medium weight)
- `.mono-value` - Large bold monospace (18px, bold weight)

## Layout & Spacing

### Border Radius
- `sm`: `calc(var(--radius) - 4px)` - Tight curves
- `md`: `calc(var(--radius) - 2px)` - Standard curves
- `lg`: `var(--radius)` - Comfortable curves (default)
- `xl`: `calc(var(--radius) + 4px)` - Large curves
- `full`: `9999px` - Fully rounded

### Z-Index Scale
- Base: `0`
- Dropdown: `10`
- Sticky: `20`
- Fixed: `30`
- Modal backdrop: `40`
- Modal: `50`
- Popover: `60`
- Tooltip: `70`
- Notification: `80`

## Best Practices

1. **Use glassmorphism for layered content** - Creates depth and visual hierarchy
2. **Apply glow effects to important alerts** - Draws attention to critical information
3. **Animate state changes** - Use Framer Motion for smooth transitions
4. **Combine neon colors with glows** - Enhances visibility in dark theme
5. **Use monospace for data** - Professional appearance for numerical values
6. **Maintain glass-strong for headers** - Creates sticky navigation effect
7. **Stagger animations for lists** - Improves visual rhythm
8. **Use risk colors consistently** - Users quickly learn the severity scale

## Dark Mode

The design system is built for dark theme by default. All colors are optimized for:
- Deep navy/charcoal backgrounds
- High contrast for text readability
- Soft glows for visual interest
- Reduced eye strain for long viewing sessions

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support (requires -webkit- prefixes for backdrop-filter)
- Safari: Full support
- Mobile: Optimized for mobile devices with responsive utilities

## Import Locations

```tsx
// Design tokens and utilities
import { 
  DESIGN_TOKENS, 
  ANIMATION_VARIANTS,
  getRiskColor,
  getRiskGlowClass,
  getRiskTextGlowClass,
  getBadgeClass
} from "@/lib/design-tokens"

// Showcase component (for reference)
import { DesignShowcase } from "@/components/design-showcase"
```
