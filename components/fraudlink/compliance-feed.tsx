"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TriangleAlert, CheckCircle2, ShieldCheck } from "lucide-react"
import { complianceAlerts, riskColorVar } from "@/lib/fraud-data"
import { PanelHeader, RiskBadge } from "./ui-bits"
import { cn } from "@/lib/utils"

export function ComplianceFeed() {
  const [resolved, setResolved] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setResolved((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const active = complianceAlerts.filter((a) => !resolved.has(a.id))
  const done = complianceAlerts.filter((a) => resolved.has(a.id))

  return (
    <div>
      <PanelHeader
        icon={TriangleAlert}
        title="Compliance Alerts"
        subtitle="Live regulatory feed — PMLA, CTR, STR and KYC triggers flagged for the case file."
      />

      <div className="mb-4 flex gap-3">
        <Stat label="Open" value={active.length} tone="var(--risk-critical)" />
        <Stat label="Resolved" value={done.length} tone="var(--risk-safe)" />
      </div>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {active.map((a) => (
            <motion.div
              key={a.id}
              layout
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/40 glass p-4"
              style={{
                borderLeftWidth: 3,
                borderLeftColor: riskColorVar[a.severity],
              }}
            >
              <div
                className="flex size-9 shrink-0 items-center justify-center rounded-lg"
                style={{
                  color: riskColorVar[a.severity],
                  backgroundColor: `color-mix(in oklab, ${riskColorVar[a.severity]} 14%, transparent)`,
                }}
              >
                <TriangleAlert className="size-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-border/70 bg-background/50 px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-foreground">
                    {a.code}
                  </span>
                  <RiskBadge risk={a.severity} />
                  {a.account && (
                    <span className="font-mono text-xs text-muted-foreground">
                      {a.account}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm font-semibold text-foreground">{a.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  {a.description}
                </p>
              </div>
              <button
                onClick={() => toggle(a.id)}
                className="shrink-0 rounded-md border border-risk-safe/40 px-2.5 py-1 text-[11px] font-semibold text-risk-safe transition-colors hover:bg-risk-safe/10"
              >
                Resolve
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {active.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/20 py-14 text-center">
            <ShieldCheck className="size-10 text-risk-safe" />
            <div>
              <p className="font-semibold text-foreground">All alerts resolved</p>
              <p className="text-sm text-muted-foreground">
                No outstanding compliance triggers for this case.
              </p>
            </div>
          </div>
        )}

        {done.length > 0 && (
          <div className="pt-2">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Resolved
            </p>
            <div className="space-y-2">
              {done.map((a) => (
                <motion.button
                  key={a.id}
                  layout
                  onClick={() => toggle(a.id)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border border-border/50 bg-card/20 px-4 py-2.5 text-left",
                  )}
                >
                  <CheckCircle2 className="size-4 shrink-0 text-risk-safe" />
                  <span className="flex-1 text-sm text-muted-foreground line-through">
                    {a.title}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">Undo</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="flex-1 rounded-xl border border-border/60 bg-card/40 px-4 py-3">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="font-mono text-2xl font-bold" style={{ color: tone }}>
        {value}
      </p>
    </div>
  )
}
