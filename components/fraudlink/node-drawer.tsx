"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X, ArrowDownLeft, ArrowUpRight, Flag } from "lucide-react"
import {
  getAccount,
  txFor,
  riskLevel,
  riskColorVar,
  formatINR,
} from "@/lib/fraud-data"
import { AnimatedNumber, RiskBadge, ActionBadge } from "./ui-bits"

export function NodeDrawer({
  nodeId,
  onClose,
  frozen,
  onFreeze,
}: {
  nodeId: string | null
  onClose: () => void
  frozen: Set<string>
  onFreeze: (id: string) => void
}) {
  const account = nodeId ? getAccount(nodeId) : undefined
  const level = account ? riskLevel(account.riskScore) : "SAFE"
  const tx = nodeId ? txFor(nodeId) : { incoming: [], outgoing: [] }

  return (
    <AnimatePresence>
      {account && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col glass-strong border-l border-border/60"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between border-b border-border/60 p-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex size-11 items-center justify-center rounded-xl font-mono text-sm font-bold"
                  style={{
                    color: riskColorVar[level],
                    backgroundColor: `color-mix(in oklab, ${riskColorVar[level]} 16%, transparent)`,
                    border: `1px solid color-mix(in oklab, ${riskColorVar[level]} 45%, transparent)`,
                  }}
                >
                  {account.id.slice(0, 1)}
                </div>
                <div>
                  <p className="font-mono text-lg font-bold text-foreground">
                    {account.id}
                  </p>
                  <ActionBadge action={account.action} />
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-md p-2 text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                aria-label="Close drawer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-4">
              {/* risk score */}
              <div
                className="rounded-xl border p-4"
                style={{
                  borderColor: `color-mix(in oklab, ${riskColorVar[level]} 35%, transparent)`,
                  backgroundColor: `color-mix(in oklab, ${riskColorVar[level]} 8%, transparent)`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    Risk Score
                  </span>
                  <RiskBadge risk={level} />
                </div>
                <div className="mt-1 flex items-end gap-1">
                  <AnimatedNumber
                    value={account.riskScore}
                    decimals={1}
                    className="text-4xl font-bold leading-none"
                  />
                  <span className="mb-1 font-mono text-sm text-muted-foreground">/100</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-border/60">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: riskColorVar[level] }}
                    initial={{ width: 0 }}
                    animate={{ width: `${account.riskScore}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* fraud flags */}
              <div>
                <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  <Flag className="size-3.5" /> Fraud Flags
                </p>
                <div className="flex flex-wrap gap-2">
                  {account.flags.map((f) => (
                    <span
                      key={f}
                      className="rounded-md border border-border/70 bg-card/60 px-2.5 py-1 text-xs text-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* transactions */}
              <div className="grid gap-4 sm:grid-cols-1">
                <TxList
                  title="Incoming"
                  icon={<ArrowDownLeft className="size-3.5 text-risk-safe" />}
                  rows={tx.incoming.map((t) => ({
                    party: t.from,
                    amount: t.amount,
                    date: t.date,
                  }))}
                />
                <TxList
                  title="Outgoing"
                  icon={<ArrowUpRight className="size-3.5 text-risk-high" />}
                  rows={tx.outgoing.map((t) => ({
                    party: t.to,
                    amount: t.amount,
                    date: t.date,
                  }))}
                />
              </div>
            </div>

            <div className="border-t border-border/60 p-4">
              <button
                onClick={() => onFreeze(account.id)}
                className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors"
                style={
                  frozen.has(account.id)
                    ? {
                        color: "var(--risk-safe)",
                        backgroundColor:
                          "color-mix(in oklab, var(--risk-safe) 14%, transparent)",
                        border: "1px solid color-mix(in oklab, var(--risk-safe) 45%, transparent)",
                      }
                    : {
                        color: "var(--risk-critical)",
                        backgroundColor:
                          "color-mix(in oklab, var(--risk-critical) 14%, transparent)",
                        border:
                          "1px solid color-mix(in oklab, var(--risk-critical) 50%, transparent)",
                      }
                }
              >
                {frozen.has(account.id) ? "Account Frozen — Unfreeze" : "Freeze Account"}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function TxList({
  title,
  icon,
  rows,
}: {
  title: string
  icon: React.ReactNode
  rows: { party: string; amount: number; date: string }[]
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-3">
      <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {icon} {title} ({rows.length})
      </p>
      {rows.length === 0 ? (
        <p className="py-2 text-center text-xs text-muted-foreground">No transactions</p>
      ) : (
        <ul className="space-y-1.5">
          {rows.map((r, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-md bg-background/40 px-2.5 py-1.5"
            >
              <div className="flex flex-col">
                <span className="font-mono text-xs font-semibold text-foreground">
                  {r.party}
                </span>
                <span className="text-[10px] text-muted-foreground">{r.date}</span>
              </div>
              <span className="font-mono text-xs font-semibold text-foreground">
                {formatINR(r.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
