"use client"

import { motion } from "framer-motion"
import { DESIGN_TOKENS, ANIMATION_VARIANTS, getRiskColor, getRiskGlowClass, getRiskTextGlowClass } from "@/lib/design-tokens"

/**
 * Design System Showcase Component
 * Demonstrates all design tokens, colors, animations, and effects
 * Remove this component after reviewing the design system
 */
export function DesignShowcase() {
  return (
    <motion.div
      className="space-y-8 px-6 py-8"
      variants={ANIMATION_VARIANTS.container}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={ANIMATION_VARIANTS.item}>
        <h1 className="text-4xl font-bold text-foreground">
          FraudLink <span className="text-risk-critical animate-glow-pulse">Design System</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Professional dark theme with glassmorphism, neon accents, and fluid animations
        </p>
      </motion.div>

      {/* Color Palette */}
      <motion.section variants={ANIMATION_VARIANTS.item} className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Neon Risk Colors</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { level: "critical" as const, label: "Critical" },
            { level: "high" as const, label: "High" },
            { level: "medium" as const, label: "Medium" },
            { level: "safe" as const, label: "Safe" },
          ].map((item) => (
            <motion.div
              key={item.level}
              className={`card-glass-strong p-4 space-y-3 ${getRiskGlowClass(item.level)}`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="size-4 rounded-full animate-pulse"
                  style={{ backgroundColor: getRiskColor(item.level) }}
                />
                <span className="mono-label">{item.label}</span>
              </div>
              <div className={`mono-value ${getRiskTextGlowClass(item.level)}`}>
                {getRiskColor(item.level)}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Glassmorphism Cards */}
      <motion.section variants={ANIMATION_VARIANTS.item} className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Glassmorphism Effects</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <motion.div className="card-glass p-6 space-y-2" whileHover={{ scale: 1.02 }}>
            <p className="mono-label">Standard Glass</p>
            <p className="text-sm text-muted-foreground">
              Subtle blur with frosted appearance
            </p>
          </motion.div>
          <motion.div className="card-glass-strong p-6 space-y-2" whileHover={{ scale: 1.02 }}>
            <p className="mono-label">Strong Glass</p>
            <p className="text-sm text-muted-foreground">
              Enhanced blur for prominent elements
            </p>
          </motion.div>
          <motion.div className="glass-xl rounded-xl border p-6 space-y-2" whileHover={{ scale: 1.02 }}>
            <p className="mono-label">Extra Large Glass</p>
            <p className="text-sm text-muted-foreground">
              Maximum blur for hero sections
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Glow Effects */}
      <motion.section variants={ANIMATION_VARIANTS.item} className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Glowing Borders & Effects</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            className="glow-critical-border rounded-xl bg-card p-6 text-center"
            animate={{ boxShadow: [
              '0 0 12px rgba(255, 59, 59, 0.3)',
              '0 0 20px rgba(255, 59, 59, 0.5)',
              '0 0 12px rgba(255, 59, 59, 0.3)',
            ] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="mono-label">Critical Glow</p>
          </motion.div>
          <motion.div
            className="glow-high-border rounded-xl bg-card p-6 text-center"
            animate={{ boxShadow: [
              '0 0 12px rgba(255, 140, 0, 0.3)',
              '0 0 20px rgba(255, 140, 0, 0.4)',
              '0 0 12px rgba(255, 140, 0, 0.3)',
            ] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="mono-label">High Glow</p>
          </motion.div>
          <motion.div
            className="glow-medium-border rounded-xl bg-card p-6 text-center"
            animate={{ boxShadow: [
              '0 0 12px rgba(255, 215, 0, 0.3)',
              '0 0 18px rgba(255, 215, 0, 0.4)',
              '0 0 12px rgba(255, 215, 0, 0.3)',
            ] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="mono-label">Medium Glow</p>
          </motion.div>
          <motion.div
            className="glow-safe-border rounded-xl bg-card p-6 text-center"
            animate={{ boxShadow: [
              '0 0 12px rgba(0, 255, 136, 0.3)',
              '0 0 18px rgba(0, 255, 136, 0.4)',
              '0 0 12px rgba(0, 255, 136, 0.3)',
            ] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="mono-label">Safe Glow</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Text Glows */}
      <motion.section variants={ANIMATION_VARIANTS.item} className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Text Glow Effects</h2>
        <div className="card-glass-strong p-6 space-y-4">
          <p className="text-glow-critical mono-value">Critical Risk Score: 95/100</p>
          <p className="text-glow-high mono-value">High Alert: Fraudulent Activity</p>
          <p className="text-glow-medium mono-value">Medium Warning: Suspicious Pattern</p>
          <p className="text-glow-safe mono-value">Safe Status: No Threats Detected</p>
        </div>
      </motion.section>

      {/* Animation Showcase */}
      <motion.section variants={ANIMATION_VARIANTS.item} className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Animations</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <motion.div
            className="card-glass-strong p-6 text-center space-y-2"
            animate={{ scale: [1, 1.05, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="mono-label">Pulse Animation</p>
            <p className="text-2xl font-bold text-risk-critical">●</p>
          </motion.div>

          <motion.div
            className="card-glass-strong p-6 text-center space-y-2"
            animate={{ y: [-8, 0, -8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="mono-label">Float Animation</p>
            <p className="text-2xl">↕️</p>
          </motion.div>

          <motion.div
            className="card-glass-strong p-6 text-center space-y-2 overflow-hidden"
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,59,59,0.2), transparent)',
              backgroundSize: '200% 100%',
            }}
          >
            <p className="mono-label">Shimmer Animation</p>
            <p className="text-sm">✨ Shimmer Effect</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Badge Examples */}
      <motion.section variants={ANIMATION_VARIANTS.item} className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Risk Badges</h2>
        <div className="card-glass-strong p-6 flex flex-wrap gap-3">
          <motion.div className="badge-critical" whileHover={{ scale: 1.1 }}>
            🚨 CRITICAL
          </motion.div>
          <motion.div className="badge-high" whileHover={{ scale: 1.1 }}>
            ⚠️ HIGH
          </motion.div>
          <motion.div className="badge-medium" whileHover={{ scale: 1.1 }}>
            ⚡ MEDIUM
          </motion.div>
          <motion.div className="badge-safe" whileHover={{ scale: 1.1 }}>
            ✓ SAFE
          </motion.div>
        </div>
      </motion.section>

      {/* Monospace Variants */}
      <motion.section variants={ANIMATION_VARIANTS.item} className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Monospace Variants</h2>
        <div className="card-glass-strong p-6 space-y-4">
          <div>
            <p className="mono-label text-muted-foreground mb-1">Label</p>
            <p className="mono-label">INVESTIGATION_ID: FL-2026-0529</p>
          </div>
          <div>
            <p className="mono-label text-muted-foreground mb-1">Data</p>
            <p className="mono-data">Risk Score: 87.5% | Confidence: 94%</p>
          </div>
          <div>
            <p className="mono-label text-muted-foreground mb-1">Value</p>
            <p className="mono-value">$2,450,000.00</p>
          </div>
        </div>
      </motion.section>

      {/* Interactive Demo */}
      <motion.section variants={ANIMATION_VARIANTS.item} className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Interactive Elements</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {["critical", "high", "medium", "safe"].map((level) => (
            <motion.button
              key={level}
              className={`card-glass-strong py-3 px-4 font-semibold capitalize ${getRiskGlowClass(level as any)}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: [
                `0 0 8px ${getRiskColor(level as any)}40`,
                `0 0 16px ${getRiskColor(level as any)}60`,
                `0 0 8px ${getRiskColor(level as any)}40`,
              ] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {level} level button
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Design Notes */}
      <motion.section variants={ANIMATION_VARIANTS.item} className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Design System Features</h2>
        <div className="card-glass-strong p-6 space-y-2 text-sm text-muted-foreground">
          <p>✓ Deep navy/charcoal backgrounds (#0a0f1e, #0d1117)</p>
          <p>✓ Neon accent colors with glassmorphism effects</p>
          <p>✓ Smooth Framer Motion transitions on all panels</p>
          <p>✓ Professional monospace font (JetBrains Mono)</p>
          <p>✓ Pulsing nodes and glowing edges for data visualization</p>
          <p>✓ Animated risk score counters with smooth easing</p>
          <p>✓ Sidebar navigation with icon + label tabs</p>
          <p>✓ Responsive design for mobile and desktop</p>
        </div>
      </motion.section>
    </motion.div>
  )
}
