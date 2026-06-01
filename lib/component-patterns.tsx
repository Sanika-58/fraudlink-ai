// DESIGN SYSTEM INTEGRATION GUIDE
// Copy and use these patterns in your components

import { motion } from "framer-motion"
import {
  DESIGN_TOKENS,
  ANIMATION_VARIANTS,
  getRiskColor,
  getRiskGlowClass,
  getRiskTextGlowClass,
  getBadgeClass,
} from "@/lib/design-tokens"

// ============================================================================
// PATTERN 1: Risk Score Card with Glassmorphism and Glow
// ============================================================================

export function RiskScoreCard({ 
  score, 
  level 
}: { 
  score: number
  level: "critical" | "high" | "medium" | "safe"
}) {
  return (
    <motion.div
      className={`card-glass-strong p-6 space-y-3 ${getRiskGlowClass(level)}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <p className="mono-label text-muted-foreground">RISK SCORE</p>
        <div className={getBadgeClass(level)}>
          {level.toUpperCase()}
        </div>
      </div>

      <motion.p
        className={`mono-value ${getRiskTextGlowClass(level)}`}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {score.toFixed(1)}%
      </motion.p>

      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full"
          style={{ backgroundColor: getRiskColor(level) }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </motion.div>
  )
}

// ============================================================================
// PATTERN 2: Animated Counter
// ============================================================================

export function AnimatedCounter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = React.useState(0)

  React.useEffect(() => {
    let start = 0
    const duration = 1000
    const step = (value / duration) * 16

    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return (
    <motion.div
      className="mono-value text-risk-critical animate-glow-pulse"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {displayValue.toLocaleString()}
    </motion.div>
  )
}

// ============================================================================
// PATTERN 3: Status Badge with Pulsing Indicator
// ============================================================================

export function StatusBadge({ 
  status, 
  label 
}: { 
  status: "critical" | "high" | "medium" | "safe"
  label: string
}) {
  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${getBadgeClass(status)} text-xs font-mono font-semibold`}
      animate={{
        boxShadow: [
          `0 0 8px ${getRiskColor(status)}40`,
          `0 0 16px ${getRiskColor(status)}60`,
          `0 0 8px ${getRiskColor(status)}40`,
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <motion.span
        className="size-2 rounded-full"
        style={{ backgroundColor: getRiskColor(status) }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {label}
    </motion.div>
  )
}

// ============================================================================
// PATTERN 4: Data Row with Multiple Values
// ============================================================================

export function DataRow({ 
  label, 
  values 
}: { 
  label: string
  values: Array<{ label: string; value: string | number; level?: "critical" | "high" | "medium" | "safe" }>
}) {
  return (
    <motion.div
      className="card-glass p-4 space-y-2"
      variants={ANIMATION_VARIANTS.item}
      whileHover={{ scale: 1.02 }}
    >
      <p className="mono-label text-muted-foreground">{label}</p>
      <div className="flex gap-4">
        {values.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p
              className={`mono-data ${
                item.level ? getRiskTextGlowClass(item.level) : ""
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ============================================================================
// PATTERN 5: Alert Panel with Icon and Actions
// ============================================================================

export function AlertPanel({ 
  level, 
  title, 
  description, 
  actionLabel,
  onAction
}: {
  level: "critical" | "high" | "medium" | "safe"
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <motion.div
      className={`card-glass-strong p-6 space-y-4 border-l-4`}
      style={{ borderColor: getRiskColor(level) }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <motion.span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: getRiskColor(level) }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className="mono-label text-foreground">{title}</p>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {actionLabel && (
        <motion.button
          className={`w-full py-2 rounded-lg font-mono text-sm font-semibold ${getRiskGlowClass(level)}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAction}
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  )
}

// ============================================================================
// PATTERN 6: Container with Staggered Items
// ============================================================================

export function ItemList({ 
  items 
}: { 
  items: Array<{ id: string; label: string; value: string; level: "critical" | "high" | "medium" | "safe" }>
}) {
  return (
    <motion.div
      className="space-y-2"
      variants={ANIMATION_VARIANTS.container}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          className={`card-glass p-4 flex items-center justify-between ${getRiskGlowClass(item.level)}`}
          variants={ANIMATION_VARIANTS.item}
          whileHover={{ scale: 1.02, x: 4 }}
        >
          <p className="mono-data">{item.label}</p>
          <p className={`mono-value ${getRiskTextGlowClass(item.level)}`}>
            {item.value}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ============================================================================
// PATTERN 7: Graph Node Component (for network visualizations)
// ============================================================================

export function GraphNode({ 
  x, 
  y, 
  level,
  label 
}: {
  x: number
  y: number
  level: "critical" | "high" | "medium" | "safe"
  label: string
}) {
  return (
    <g>
      {/* Outer glow ring */}
      <motion.circle
        cx={x}
        cy={y}
        r={8}
        fill="none"
        stroke={getRiskColor(level)}
        strokeWidth="1"
        opacity="0.2"
        animate={{
          r: [8, 12, 8],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />

      {/* Main node */}
      <motion.circle
        cx={x}
        cy={y}
        r="5"
        fill={getRiskColor(level)}
        filter="drop-shadow(0 0 6px currentColor)"
        animate={{
          r: [5, 6, 5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Label */}
      <text
        x={x}
        y={y - 12}
        textAnchor="middle"
        className="text-xs fill-foreground font-mono"
      >
        {label}
      </text>
    </g>
  )
}

// ============================================================================
// PATTERN 8: Tab Component with Glassmorphism
// ============================================================================

export function GlassTab({ 
  tabs, 
  active, 
  onChange 
}: {
  tabs: Array<{ id: string; label: string; icon?: React.ComponentType<any> }>
  active: string
  onChange: (id: string) => void
}) {
  return (
    <div className="flex gap-2 glass-strong p-1 rounded-lg">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm font-semibold transition-all ${
            active === tab.id
              ? "glass-strong text-foreground glow-critical"
              : "text-muted-foreground hover:text-foreground"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          {tab.icon && <tab.icon className="size-4" />}
          {tab.label}
        </motion.button>
      ))}
    </div>
  )
}

// ============================================================================
// PATTERN 9: Loading State with Shimmer
// ============================================================================

export function ShimmerLoader({ count = 3 }: { count?: number }) {
  return (
    <motion.div className="space-y-3">
      {Array.from({ length: count }).map((_, idx) => (
        <motion.div
          key={idx}
          className="card-glass h-12 animate-shimmer"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: idx * 0.1,
          }}
        />
      ))}
    </motion.div>
  )
}

// ============================================================================
// PATTERN 10: Modal/Overlay with Glass Effect
// ============================================================================

export function GlassModal({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.currentTarget === e.target && onClose()}
          >
            <div className="glass-xl rounded-xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">{title}</h2>
                <motion.button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>
              <div className="max-h-96 overflow-y-auto">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ============================================================================
// EXPORT PATTERNS
// ============================================================================

export const COMPONENT_PATTERNS = {
  RiskScoreCard,
  AnimatedCounter,
  StatusBadge,
  DataRow,
  AlertPanel,
  ItemList,
  GraphNode,
  GlassTab,
  ShimmerLoader,
  GlassModal,
}
