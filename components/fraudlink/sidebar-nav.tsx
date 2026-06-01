"use client"

import { motion } from "framer-motion"
import {
  Share2,
  RefreshCw,
  Trophy,
  Crosshair,
  Footprints,
  TriangleAlert,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ANIMATION_VARIANTS } from "@/lib/design-tokens"

export type TabId =
  | "graph"
  | "cycles"
  | "leaderboard"
  | "planner"
  | "tracer"
  | "alerts"

export const NAV_ITEMS: {
  id: TabId
  label: string
  short: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { id: "graph", label: "Network Graph", short: "Graph", icon: Share2 },
  { id: "cycles", label: "Cycle Detection", short: "Cycles", icon: RefreshCw },
  { id: "leaderboard", label: "Risk Leaderboard", short: "Risk", icon: Trophy },
  { id: "planner", label: "Investigation Planner", short: "Plan", icon: Crosshair },
  { id: "tracer", label: "DFS Path Tracer", short: "Trace", icon: Footprints },
  { id: "alerts", label: "Compliance Alerts", short: "Alerts", icon: TriangleAlert },
]

export function SidebarNav({
  active,
  onChange,
}: {
  active: TabId
  onChange: (id: TabId) => void
}) {
  return (
    <>
      {/* desktop sidebar with glassmorphism */}
      <nav className="hidden w-60 shrink-0 flex-col gap-2 border-r border-border/40 glass-strong px-3 py-4 lg:flex">
        <motion.p
          className="px-3 py-2 mono-label text-muted-foreground"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Investigation
        </motion.p>

        <motion.div
          className="space-y-1"
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id
            return (
              <motion.button
                key={item.id}
                onClick={() => onChange(item.id)}
                variants={ANIMATION_VARIANTS.item}
                className={cn(
                  "relative w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "glass-strong text-foreground"
                    : "text-muted-foreground hover:bg-accent/20 hover:text-foreground",
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg border border-primary/40 glow-critical"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <motion.div
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{
                    duration: 2,
                    repeat: isActive ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <item.icon
                    className={cn(
                      "size-4.5 shrink-0 transition-colors",
                      isActive && "text-risk-critical animate-glow-pulse",
                    )}
                  />
                </motion.div>
                <span className="relative font-medium">{item.label}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Engine Status Card with glassmorphism and glow */}
        <motion.div
          className="mt-auto rounded-lg glass-strong border border-risk-safe/40 p-3 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="mono-label text-muted-foreground">ENGINE STATUS</p>
          <motion.p
            className="flex items-center gap-2 text-xs font-semibold text-risk-safe"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              className="size-2.5 rounded-full bg-risk-safe glow-safe"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Algorithms online
          </motion.p>
        </motion.div>
      </nav>

      {/* mobile bottom tab bar with glassmorphism */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex items-stretch justify-between gap-1 border-t border-border/40 glass-strong px-2 py-2 lg:hidden">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id
          return (
            <motion.button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[10px] font-medium transition-all",
                isActive
                  ? "text-risk-critical glow-critical-border"
                  : "text-muted-foreground hover:text-foreground",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isActive ? { y: [-2, 0, -2] } : {}}
              transition={isActive ? { duration: 2, repeat: Infinity } : {}}
            >
              <motion.div
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
              >
                <item.icon className={cn(
                  "size-5",
                  isActive && "animate-glow-pulse"
                )} />
              </motion.div>
              <span className="text-[9px] font-semibold leading-none truncate">
                {item.short}
              </span>
            </motion.button>
          )
        })}
      </nav>
    </>
  )
}
