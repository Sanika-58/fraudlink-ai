"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  accounts as allAccounts,
  transactions as allTx,
  riskLevel,
  riskColorVar,
  formatINR,
  type Account,
  type Transaction,
} from "@/lib/fraud-data"

interface GraphCanvasProps {
  accounts?: Account[]
  transactions?: Transaction[]
  /** node ids to render at full prominence; others dim */
  visibleNodes?: Set<string>
  /** ordered path to draw an animated glowing loop over */
  highlightPath?: string[]
  /** nodes currently "lit" during a traversal animation */
  activeNodes?: Set<string>
  selectedNode?: string | null
  onNodeClick?: (id: string) => void
  /** which directed edges to emphasize (key = `from->to`) */
  highlightEdges?: Set<string>
  /** nodes that have been frozen (rendered in cool primary tone) */
  frozenNodes?: Set<string>
  className?: string
  compact?: boolean
}

const W = 1000
const H = 680

function nodeRadius(score: number, compact: boolean) {
  const base = compact ? 14 : 24
  return base + (score / 100) * (compact ? 8 : 18)
}

export function GraphCanvas({
  accounts = allAccounts,
  transactions = allTx,
  visibleNodes,
  highlightPath,
  activeNodes,
  selectedNode,
  onNodeClick,
  highlightEdges,
  frozenNodes,
  className,
  compact = false,
}: GraphCanvasProps) {
  const pos = useMemo(() => {
    const map: Record<string, { x: number; y: number }> = {}
    for (const a of accounts) map[a.id] = { x: a.x, y: a.y }
    return map
  }, [accounts])

  const pathEdgeSet = useMemo(() => {
    const s = new Set<string>()
    if (highlightPath) {
      for (let i = 0; i < highlightPath.length - 1; i++) {
        s.add(`${highlightPath[i]}->${highlightPath[i + 1]}`)
      }
    }
    return s
  }, [highlightPath])

  function edgePath(from: string, to: string) {
    const a = pos[from]
    const b = pos[to]
    if (!a || !b) return ""
    const mx = (a.x + b.x) / 2
    const my = (a.y + b.y) / 2
    // perpendicular offset for a gentle curve
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = Math.hypot(dx, dy) || 1
    const off = 36
    const cx = mx - (dy / len) * off
    const cy = my + (dx / len) * off
    return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`
  }

  const maxAmount = Math.max(...transactions.map((t) => t.amount))

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Transaction network graph"
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="oklch(0.6 0.03 255)" />
        </marker>
        <marker
          id="arrow-hot"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--risk-critical)" />
        </marker>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* edges */}
      {transactions.map((t) => {
        const key = `${t.from}->${t.to}`
        const dimmed =
          visibleNodes && (!visibleNodes.has(t.from) || !visibleNodes.has(t.to))
        const onPath = pathEdgeSet.has(key)
        const emphasized = highlightEdges?.has(key)
        const width = 1.2 + (t.amount / maxAmount) * (compact ? 2 : 4)
        return (
          <g key={key} opacity={dimmed ? 0.12 : 1}>
            <path
              d={edgePath(t.from, t.to)}
              fill="none"
              stroke={
                onPath
                  ? "var(--risk-critical)"
                  : emphasized
                    ? "var(--risk-high)"
                    : "oklch(0.45 0.03 255)"
              }
              strokeWidth={onPath ? width + 1.5 : width}
              markerEnd={onPath ? "url(#arrow-hot)" : "url(#arrow)"}
              strokeLinecap="round"
            />
            {onPath && (
              <path
                d={edgePath(t.from, t.to)}
                fill="none"
                stroke="var(--risk-critical)"
                strokeWidth={width + 2}
                strokeDasharray="6 18"
                strokeLinecap="round"
                style={{ animation: "dash-flow 0.9s linear infinite" }}
                opacity={0.9}
                filter="url(#glow)"
              />
            )}
            {!compact && !dimmed && (
              <text
                x={(pos[t.from]?.x + pos[t.to]?.x) / 2}
                y={(pos[t.from]?.y + pos[t.to]?.y) / 2 - 6}
                fill="oklch(0.7 0.02 255)"
                fontSize="13"
                fontFamily="var(--font-jetbrains)"
                textAnchor="middle"
                className="pointer-events-none select-none"
              >
                {formatINR(t.amount)}
              </text>
            )}
          </g>
        )
      })}

      {/* nodes */}
      {accounts.map((a) => {
        const dimmed = visibleNodes && !visibleNodes.has(a.id)
        const level = riskLevel(a.riskScore)
        const isFrozen = frozenNodes?.has(a.id)
        const color = isFrozen ? "oklch(0.72 0.16 230)" : riskColorVar[level]
        const r = nodeRadius(a.riskScore, compact)
        const isActive = activeNodes?.has(a.id)
        const isSelected = selectedNode === a.id
        const isCritical = level === "CRITICAL"
        return (
          <g
            key={a.id}
            opacity={dimmed ? 0.18 : 1}
            onClick={() => onNodeClick?.(a.id)}
            style={{ cursor: onNodeClick ? "pointer" : "default" }}
            role={onNodeClick ? "button" : undefined}
            aria-label={`Account ${a.id}, risk ${a.riskScore}`}
          >
            {(isCritical || isActive || isSelected) && !dimmed && (
              <motion.circle
                cx={a.x}
                cy={a.y}
                r={r + 8}
                fill="none"
                stroke={color}
                strokeWidth={2}
                initial={{ opacity: 0.6, scale: 0.9 }}
                animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ transformOrigin: `${a.x}px ${a.y}px` }}
              />
            )}
            <circle
              cx={a.x}
              cy={a.y}
              r={r}
              fill="oklch(0.2 0.03 262)"
              stroke={color}
              strokeWidth={isSelected ? 4 : 2.5}
              filter={isActive || isSelected ? "url(#glow)" : undefined}
            />
            <circle cx={a.x} cy={a.y} r={r - 5} fill={color} opacity={0.18} />
            <text
              x={a.x}
              y={a.y - 1}
              fill={color}
              fontSize={compact ? 13 : 17}
              fontWeight={700}
              fontFamily="var(--font-jetbrains)"
              textAnchor="middle"
              className="pointer-events-none select-none"
            >
              {a.id}
            </text>
            {!compact && (
              <text
                x={a.x}
                y={a.y + 15}
                fill="oklch(0.75 0.02 255)"
                fontSize={11}
                fontFamily="var(--font-jetbrains)"
                textAnchor="middle"
                className="pointer-events-none select-none"
              >
                {a.riskScore}
              </text>
            )}
            {!compact && <title>{`${a.id} · risk ${a.riskScore} · ${a.action}`}</title>}
          </g>
        )
      })}
    </svg>
  )
}
