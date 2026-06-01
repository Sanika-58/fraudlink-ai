"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { RefreshCw, Route, GitBranch, RotateCcw } from "lucide-react"
import {
  accounts,
  transactions,
  cycles,
  bfsOrder,
  formatINR,
} from "@/lib/fraud-data"
import { GraphCanvas } from "./graph-canvas"
import { NodeDrawer } from "./node-drawer"
import { cn } from "@/lib/utils"

type Mode = "all" | "cycles" | "paths" | "bfs"

export function NetworkGraphView({
  frozen,
  onFreeze,
  initialCycleId,
}: {
  frozen: Set<string>
  onFreeze: (id: string) => void
  initialCycleId?: string | null
}) {
  const [mode, setMode] = useState<Mode>(initialCycleId ? "cycles" : "all")
  const [cycleIdx, setCycleIdx] = useState(() => {
    const i = cycles.findIndex((c) => c.id === initialCycleId)
    return i >= 0 ? i : 0
  })
  const [selected, setSelected] = useState<string | null>(null)

  const totalVolume = transactions.reduce((s, t) => s + t.amount, 0)
  const flagged = accounts.filter((a) => a.riskScore >= 70).length

  const highlightPath = useMemo(() => {
    if (mode === "cycles") return cycles[cycleIdx].path
    return undefined
  }, [mode, cycleIdx])

  const bfsLit = useMemo(() => {
    if (mode !== "bfs") return undefined
    return new Set(bfsOrder("SHELL01").order)
  }, [mode])

  const highlightEdges = useMemo(() => {
    if (mode !== "paths") return undefined
    return new Set(transactions.map((t) => `${t.from}->${t.to}`))
  }, [mode])

  const toggles: { id: Mode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "cycles", label: "Show Cycles", icon: RefreshCw },
    { id: "paths", label: "Show All Paths", icon: Route },
    { id: "bfs", label: "BFS Expand", icon: GitBranch },
  ]

  const stats = [
    { label: "Accounts", value: accounts.length.toString() },
    { label: "Transactions", value: transactions.length.toString() },
    { label: "Flagged", value: flagged.toString() },
    { label: "Volume", value: formatINR(totalVolume) },
  ]

  return (
    <div className="flex h-full flex-col gap-4">
      {/* stat strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl px-4 py-3"
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {s.label}
            </p>
            <p className="mt-0.5 font-mono text-lg font-bold text-foreground">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* controls */}
      <div className="flex flex-wrap items-center gap-2">
        {toggles.map((t) => (
          <button
            key={t.id}
            onClick={() => setMode(mode === t.id ? "all" : t.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
              mode === t.id
                ? "border-primary/50 bg-primary/15 text-primary"
                : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground",
            )}
          >
            <t.icon className="size-4" />
            {t.label}
          </button>
        ))}
        <button
          onClick={() => {
            setMode("all")
            setSelected(null)
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <RotateCcw className="size-4" />
          Reset
        </button>

        {mode === "cycles" && (
          <div className="ml-auto flex items-center gap-1.5">
            {cycles.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setCycleIdx(i)}
                className={cn(
                  "rounded-md px-2.5 py-1 font-mono text-xs font-semibold transition-colors",
                  cycleIdx === i
                    ? "bg-risk-critical/20 text-risk-critical"
                    : "bg-card/50 text-muted-foreground hover:text-foreground",
                )}
              >
                Cycle {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* graph */}
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-border/60 bg-card/30 grid-bg">
        <GraphCanvas
          className="h-full w-full"
          highlightPath={highlightPath}
          activeNodes={bfsLit}
          visibleNodes={bfsLit}
          highlightEdges={highlightEdges}
          frozenNodes={frozen}
          selectedNode={selected}
          onNodeClick={setSelected}
        />
        {/* legend */}
        <div className="pointer-events-none absolute bottom-3 left-3 flex flex-wrap gap-3 rounded-lg border border-border/60 bg-background/70 px-3 py-2 backdrop-blur-sm">
          {[
            { c: "var(--risk-critical)", l: "Critical" },
            { c: "var(--risk-high)", l: "High" },
            { c: "var(--risk-medium)", l: "Medium" },
            { c: "oklch(0.72 0.16 230)", l: "Frozen" },
          ].map((x) => (
            <span key={x.l} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: x.c }} />
              {x.l}
            </span>
          ))}
        </div>
        {mode === "cycles" && (
          <div className="absolute right-3 top-3 rounded-lg border border-risk-critical/40 bg-background/80 px-3 py-2 backdrop-blur-sm">
            <p className="font-mono text-[11px] text-muted-foreground">
              {cycles[cycleIdx].type}
            </p>
            <p className="font-mono text-sm font-bold text-risk-critical">
              {formatINR(cycles[cycleIdx].volume)} circulated
            </p>
          </div>
        )}
      </div>

      <NodeDrawer
        nodeId={selected}
        onClose={() => setSelected(null)}
        frozen={frozen}
        onFreeze={onFreeze}
      />
    </div>
  )
}
