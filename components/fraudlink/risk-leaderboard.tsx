"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Snowflake } from "lucide-react"
import {
  accounts,
  riskLevel,
  riskColorVar,
  type Risk,
} from "@/lib/fraud-data"
import { PanelHeader, RiskGauge, ActionBadge } from "./ui-bits"
import { cn } from "@/lib/utils"

type Filter = "ALL" | "CRITICAL" | "HIGH" | "MEDIUM"

export function RiskLeaderboard({
  frozen,
  onFreeze,
}: {
  frozen: Set<string>
  onFreeze: (id: string) => void
}) {
  const [filter, setFilter] = useState<Filter>("ALL")

  const ranked = [...accounts].sort((a, b) => b.riskScore - a.riskScore)
  const filtered = ranked.filter((a) =>
    filter === "ALL" ? true : riskLevel(a.riskScore) === filter,
  )

  const filters: Filter[] = ["ALL", "CRITICAL", "HIGH", "MEDIUM"]

  return (
    <div>
      <PanelHeader
        icon={Trophy}
        title="Risk Leaderboard"
        subtitle="Greedy priority ranking — score = cycle 0.4 + velocity 0.3 + anomaly 0.2 + centrality 0.1."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
              filter === f
                ? "border-primary/50 bg-primary/15 text-primary"
                : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 glass">
        {/* header row */}
        <div className="hidden grid-cols-[48px_1fr_2fr_1.5fr_120px] items-center gap-3 border-b border-border/60 px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:grid">
          <span>Rank</span>
          <span>Account</span>
          <span>Risk Score</span>
          <span>Primary Flag</span>
          <span className="text-right">Action</span>
        </div>

        {filtered.map((a, i) => {
          const rank = ranked.indexOf(a) + 1
          const level = riskLevel(a.riskScore)
          const isTop = rank === 1
          const isFrozen = frozen.has(a.id)
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "relative grid grid-cols-2 items-center gap-3 border-b border-border/40 px-4 py-3 last:border-0 sm:grid-cols-[48px_1fr_2fr_1.5fr_120px]",
                isTop && "bg-risk-critical/5",
              )}
            >
              {isTop && (
                <motion.span
                  className="absolute inset-y-0 left-0 w-0.5"
                  style={{ backgroundColor: "var(--risk-critical)" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              )}
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full font-mono text-xs font-bold",
                  isTop ? "animate-pulse-ring text-risk-critical" : "text-muted-foreground",
                )}
                style={
                  isTop
                    ? { backgroundColor: "color-mix(in oklab, var(--risk-critical) 18%, transparent)" }
                    : { backgroundColor: "color-mix(in oklab, var(--muted) 60%, transparent)" }
                }
              >
                {rank}
              </span>

              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-foreground">{a.id}</span>
                {isFrozen && <Snowflake className="size-3.5 text-primary" />}
              </div>

              <div className="flex items-center gap-3">
                <RiskGauge value={a.riskScore} risk={level} />
                <div className="hidden flex-1 sm:block">
                  <div className="h-2 overflow-hidden rounded-full bg-border/60">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: riskColorVar[level] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${a.riskScore}%` }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                  </div>
                  <span className="mt-1 font-mono text-xs font-semibold text-foreground">
                    {a.riskScore}
                  </span>
                </div>
              </div>

              <span className="hidden text-sm text-muted-foreground sm:block">
                {a.flags[0]}
              </span>

              <div className="col-span-2 flex items-center justify-between gap-2 sm:col-span-1 sm:justify-end">
                <ActionBadge action={a.action} />
                <button
                  onClick={() => onFreeze(a.id)}
                  className={cn(
                    "rounded-md border px-2 py-1 text-[11px] font-semibold transition-colors",
                    isFrozen
                      ? "border-primary/50 bg-primary/15 text-primary"
                      : "border-risk-critical/40 text-risk-critical hover:bg-risk-critical/10",
                  )}
                >
                  {isFrozen ? "Frozen" : "Freeze"}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
