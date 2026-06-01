"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Footprints, Play, ArrowRight } from "lucide-react"
import {
  accounts,
  dfsOrder,
  longestPath,
  detectPattern,
  pathVolume,
  formatINR,
} from "@/lib/fraud-data"
import { GraphCanvas } from "./graph-canvas"
import { PanelHeader } from "./ui-bits"
import { cn } from "@/lib/utils"

export function PathTracer() {
  const [seed, setSeed] = useState("SHELL01")
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)

  const order = useMemo(() => dfsOrder(seed), [seed])
  const tracePath = useMemo(() => longestPath(seed), [seed])

  useEffect(() => {
    setStep(0)
    setRunning(false)
  }, [seed])

  useEffect(() => {
    if (!running) return
    if (step >= order.length) {
      setRunning(false)
      return
    }
    const id = setTimeout(() => setStep((s) => s + 1), 650)
    return () => clearTimeout(id)
  }, [running, step, order.length])

  const lit = new Set(order.slice(0, step))
  const pattern = detectPattern(tracePath)
  const volume = pathVolume(tracePath)

  return (
    <div>
      <PanelHeader
        icon={Footprints}
        title="DFS / BFS Path Tracer"
        subtitle="Animated depth-first traversal — watch the layering chain light up node by node."
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Seed
          </label>
          <select
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="rounded-lg border border-border/60 bg-card/60 px-3 py-1.5 font-mono text-sm text-foreground outline-none focus:border-primary/60"
          >
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {
            setStep(0)
            setRunning(true)
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/15 px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/25"
        >
          <Play className="size-4" />
          {running ? "Tracing…" : "Run traversal"}
        </button>
        <span className="font-mono text-xs text-muted-foreground">
          Visited {Math.min(step, order.length)}/{order.length}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="relative h-[360px] overflow-hidden rounded-2xl border border-border/60 bg-card/30 grid-bg sm:h-[440px]">
          <GraphCanvas
            className="h-full w-full"
            activeNodes={lit}
            visibleNodes={lit.size ? lit : undefined}
            highlightPath={step >= order.length ? tracePath : undefined}
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border/60 glass p-4">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Discovered Path
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              {tracePath.map((id, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-xs font-semibold text-primary"
                  >
                    {id}
                  </motion.span>
                  {idx < tracePath.length - 1 && (
                    <ArrowRight className="size-3 text-muted-foreground" />
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Metric label="Hops" value={(tracePath.length - 1).toString()} />
            <Metric label="Layered" value={formatINR(volume)} />
          </div>

          <div
            className={cn(
              "rounded-2xl border p-4",
              "border-risk-high/40 bg-risk-high/5",
            )}
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Detected Pattern
            </p>
            <p className="mt-1 text-lg font-bold text-risk-high">{pattern}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-3">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 font-mono text-base font-bold text-foreground">{value}</p>
    </div>
  )
}
