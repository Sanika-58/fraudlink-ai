"use client"

import { motion } from "framer-motion"
import { RefreshCw, ArrowRight, Maximize2 } from "lucide-react"
import { cycles, accounts, formatINR, riskColorVar } from "@/lib/fraud-data"
import { GraphCanvas } from "./graph-canvas"
import { PanelHeader, RiskBadge } from "./ui-bits"

export function CyclePanel({
  onOpenInGraph,
}: {
  onOpenInGraph: (cycleId: string) => void
}) {
  return (
    <div>
      <PanelHeader
        icon={RefreshCw}
        title="Cycle Detection"
        subtitle="Modified DFS with back-edge tracking — circular money flows that indicate round-tripping."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cycles.map((c, i) => {
          const nodeSet = new Set(c.path)
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/40 glass"
            >
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                <span className="font-mono text-sm font-bold text-foreground">
                  Cycle {i + 1}
                </span>
                <RiskBadge risk={c.risk} />
              </div>

              {/* mini graph */}
              <div
                className="relative h-44 grid-bg"
                style={{
                  borderBottom: "1px solid color-mix(in oklab, var(--border) 100%, transparent)",
                }}
              >
                <GraphCanvas
                  className="h-full w-full"
                  compact
                  highlightPath={c.path}
                  visibleNodes={nodeSet}
                  accounts={accounts}
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex flex-wrap items-center gap-1">
                  {c.path.map((id, idx) => (
                    <span key={idx} className="flex items-center gap-1">
                      <span
                        className="rounded-md px-1.5 py-0.5 font-mono text-xs font-semibold"
                        style={{
                          color: riskColorVar[c.risk],
                          backgroundColor: `color-mix(in oklab, ${riskColorVar[c.risk]} 14%, transparent)`,
                        }}
                      >
                        {id}
                      </span>
                      {idx < c.path.length - 1 && (
                        <ArrowRight className="size-3 text-muted-foreground" />
                      )}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      Volume Circulated
                    </p>
                    <p className="font-mono text-base font-bold text-foreground">
                      {formatINR(c.volume)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      Type
                    </p>
                    <p className="text-sm font-medium text-foreground">{c.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenInGraph(c.id)}
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
                >
                  <Maximize2 className="size-4" />
                  Highlight on main graph
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
