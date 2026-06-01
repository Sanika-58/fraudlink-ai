"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ShieldAlert, Radio } from "lucide-react"
import { ANIMATION_VARIANTS } from "@/lib/design-tokens"

export function TopNavbar() {
  const [now, setNow] = useState<string>("")
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    setNow(fmt())
    const id = setInterval(() => setNow(fmt()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border/40 glass-strong px-4 py-3 sm:px-6">
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Logo with pulsing glow */}
        <div className="relative flex size-9 items-center justify-center rounded-xl bg-primary/10 glow-critical-border backdrop-blur-sm">
          <ShieldAlert className="size-5 text-risk-critical animate-glow-pulse" />
          <motion.span
            className="absolute inset-0 rounded-xl ring-2 ring-risk-critical/60"
            animate={{ 
              opacity: [0.6, 0.2, 0.6],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
        </div>

        <div className="leading-tight">
          <h1 className="font-mono text-base font-bold tracking-tight text-foreground">
            FraudLink<span className="text-risk-critical animate-glow-pulse"> AI</span>
          </h1>
          <p className="hidden text-[11px] text-muted-foreground sm:block">
            Fraud Ring Detection Engine
          </p>
        </div>
      </motion.div>

      <motion.div
        className="flex items-center gap-2 sm:gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.1 }}
      >
        {/* Case ID */}
        <motion.div
          className="hidden flex-col items-end leading-tight rounded-lg px-3 py-2 glass md:flex"
          whileHover={{ scale: 1.05 }}
        >
          <span className="mono-label text-muted-foreground">CASE ID</span>
          <span className="mono-value text-foreground">FL-2026-0529-7741</span>
        </motion.div>

        {/* UTC Time */}
        <motion.div
          className="hidden flex-col items-end leading-tight rounded-lg px-3 py-2 glass sm:flex"
          whileHover={{ scale: 1.05 }}
        >
          <span className="mono-label text-muted-foreground">UTC+5:30</span>
          <span className="mono-value tabular-nums text-foreground">{now}</span>
        </motion.div>

        {/* Critical Status Badge with glowing effect */}
        <motion.div
          className="flex items-center gap-2 rounded-full badge-critical"
          animate={{
            opacity: [1, 0.6, 1],
            boxShadow: [
              '0 0 12px rgba(255, 59, 59, 0.3)',
              '0 0 20px rgba(255, 59, 59, 0.5)',
              '0 0 12px rgba(255, 59, 59, 0.3)',
            ],
          }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <Radio className="size-3.5" style={{ color: '#ff3b3b' }} />
          </motion.div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-risk-critical">
            LIVE
          </span>
        </motion.div>
      </motion.div>
    </header>
  )
}
