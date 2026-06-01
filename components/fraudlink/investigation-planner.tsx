"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Crosshair, ChevronRight } from "lucide-react"
import { investigationPlan, formatINR } from "@/lib/fraud-data"
import { PanelHeader, AnimatedNumber } from "./ui-bits"

export function InvestigationPlanner() {
  const [budget, setBudget] = useState(3)
  const plan = investigationPlan(budget)

  return (
    <div>
      <PanelHeader
        icon={Crosshair}
        title="Investigation Planner"
        subtitle="Branch & Bound — selects the freeze set that maximizes fraud exposure under a fixed budget."
      />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        {/* control + summary */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/60 glass p-5">
            <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Accounts you can freeze
            </label>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono text-4xl font-bold text-primary">{budget}</span>
              <span className="text-sm text-muted-foreground">/ 5</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="mt-4 w-full accent-[var(--primary)]"
              aria-label="Freeze budget"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-muted-foreground">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-risk-critical/40 bg-risk-critical/5 p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Expected fraud exposure
            </p>
            <AnimatedNumber
              key={budget}
              value={plan.exposure}
              prefix="₹"
              className="block text-3xl font-bold text-risk-critical"
            />
            <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Evidence yield score
            </p>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-border/60">
              <motion.div
                className="h-full rounded-full bg-risk-safe"
                initial={{ width: 0 }}
                animate={{ width: `${plan.yieldScore}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="mt-1 font-mono text-xs font-semibold text-risk-safe">
              {plan.yieldScore}/100
            </p>
          </div>
        </div>

        {/* steps */}
        <div className="space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Optimal investigation sequence
          </p>
          <AnimatePresence mode="popLayout">
            {plan.steps.map((step, i) => (
              <motion.div
                key={step.account}
                layout
                initial={{ opacity: 0, rotateX: -45, y: 10 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 260, damping: 26 }}
                className="flex items-center gap-4 rounded-xl border border-border/60 bg-card/40 glass p-4"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-foreground">
                      {step.account}
                    </span>
                    {i < plan.steps.length - 1 && (
                      <ChevronRight className="size-4 text-muted-foreground" />
                    )}
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{step.reason}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Marginal
                  </p>
                  <p className="font-mono text-sm font-bold text-foreground">
                    {formatINR(step.marginalExposure)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
