"use client"

import { useEffect, useRef, useState } from "react"
import { animate } from "framer-motion"
import { cn } from "@/lib/utils"
import { riskColorVar, type Risk, type Action, actionColor } from "@/lib/fraud-data"

export function AnimatedNumber({
  value,
  decimals = 0,
  className,
  prefix = "",
  suffix = "",
}: {
  value: number
  decimals?: number
  className?: string
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const controls = animate(0, value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate(v) {
        node.textContent =
          prefix + v.toFixed(decimals) + suffix
      },
    })
    return () => controls.stop()
  }, [value, decimals, prefix, suffix])
  return <span ref={ref} className={cn("font-mono tabular-nums", className)} />
}

export function RiskBadge({ risk, className }: { risk: Risk; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
        className,
      )}
      style={{
        color: riskColorVar[risk],
        backgroundColor: `color-mix(in oklab, ${riskColorVar[risk]} 16%, transparent)`,
        border: `1px solid color-mix(in oklab, ${riskColorVar[risk]} 45%, transparent)`,
      }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: riskColorVar[risk] }}
      />
      {risk}
    </span>
  )
}

const actionLabel: Record<Action, string> = {
  FREEZE: "FREEZE",
  ESCALATE: "ESCALATE",
  MONITOR: "MONITOR",
}

export function ActionBadge({ action }: { action: Action }) {
  const risk = actionColor[action]
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wide font-mono"
      style={{
        color: riskColorVar[risk],
        backgroundColor: `color-mix(in oklab, ${riskColorVar[risk]} 14%, transparent)`,
        border: `1px solid color-mix(in oklab, ${riskColorVar[risk]} 40%, transparent)`,
      }}
    >
      {actionLabel[action]}
    </span>
  )
}

/** Lightweight circular gauge using stroke-dasharray. */
export function RiskGauge({
  value,
  size = 44,
  risk,
}: {
  value: number
  size?: number
  risk: Risk
}) {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (v) => setShown(v),
    })
    return () => controls.stop()
  }, [value])
  const stroke = 4
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (shown / 100) * c
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="oklch(0.3 0.03 258)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={riskColorVar[risk]}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold"
        style={{ color: riskColorVar[risk] }}
      >
        {shown.toFixed(0)}
      </span>
    </div>
  )
}

export function PanelHeader({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
        <Icon className="size-5 text-primary" />
      </div>
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}
