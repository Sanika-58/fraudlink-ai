/**
 * Design System Tokens for FraudLink AI
 * Defines all design constants for colors, animations, and layout
 */

export const DESIGN_TOKENS = {
  colors: {
    /* Theme Colors */
    background: 'var(--background)',
    foreground: 'var(--foreground)',
    card: 'var(--card)',
    cardForeground: 'var(--card-foreground)',
    muted: 'var(--muted)',
    mutedForeground: 'var(--muted-foreground)',
    border: 'var(--border)',

    /* Risk Severity Palette (Neon) */
    risk: {
      critical: '#ff3b3b', // Red
      high: '#ff8c00', // Orange
      medium: '#ffd700', // Yellow
      safe: '#00ff88', // Green
    },

    /* Glow Effects */
    glow: {
      critical: 'var(--glow-critical)',
      high: 'var(--glow-high)',
      medium: 'var(--glow-medium)',
      safe: 'var(--glow-safe)',
    },

    /* Chart Colors */
    chart: {
      1: '#ff3b3b', // Critical
      2: '#ff8c00', // High
      3: '#ffd700', // Medium
      4: '#00ff88', // Safe
      5: '#0099ff', // Info
    },
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
  },

  borderRadius: {
    sm: 'calc(var(--radius) - 4px)',
    md: 'calc(var(--radius) - 2px)',
    lg: 'var(--radius)',
    xl: 'calc(var(--radius) + 4px)',
    full: '9999px',
  },

  /* Glassmorphism Effects */
  glass: {
    standard: 'glass',
    strong: 'glass-strong',
    xl: 'glass-xl',
  },

  /* Animations */
  animations: {
    pulse: 'animate-pulse-ring',
    glow: 'animate-glow-pulse',
    nodePulse: 'animate-node-pulse',
    edgeGlow: 'animate-edge-glow',
    float: 'animate-float',
    shimmer: 'animate-shimmer',
    dash: 'animate-dash',
    counter: 'animate-counter',
    slideInRight: 'animate-slide-in-right',
    slideInLeft: 'animate-slide-in-left',
    fadeIn: 'animate-fade-in',
  },

  /* Font Weights */
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  /* Transition Timings */
  transitions: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  /* Z-Index Scale */
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modalBackdrop: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
    notification: 80,
  },
};

/* Helper Functions */
export const getRiskColor = (
  level: 'critical' | 'high' | 'medium' | 'safe'
): string => {
  return DESIGN_TOKENS.colors.risk[level];
};

export const getRiskGlowClass = (
  level: 'critical' | 'high' | 'medium' | 'safe'
): string => {
  return {
    critical: 'glow-critical-border',
    high: 'glow-high-border',
    medium: 'glow-medium-border',
    safe: 'glow-safe-border',
  }[level];
};

export const getRiskTextGlowClass = (
  level: 'critical' | 'high' | 'medium' | 'safe'
): string => {
  return {
    critical: 'text-glow-critical',
    high: 'text-glow-high',
    medium: 'text-glow-medium',
    safe: 'text-glow-safe',
  }[level];
};

export const getBadgeClass = (
  level: 'critical' | 'high' | 'medium' | 'safe'
): string => {
  return {
    critical: 'badge-critical',
    high: 'badge-high',
    medium: 'badge-medium',
    safe: 'badge-safe',
  }[level];
};

/* Framer Motion Animation Variants */
export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  },

  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },

  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },

  pulse: {
    animate: {
      opacity: [1, 0.7, 1],
      scale: [1, 1.05, 1],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },

  glow: {
    animate: {
      boxShadow: [
        '0 0 0 0 rgba(255, 59, 59, 0.4)',
        '0 0 0 10px rgba(255, 59, 59, 0)',
      ],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },

  float: {
    animate: {
      y: [-8, 0, -8],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },

  shimmer: {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};
