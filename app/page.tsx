"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TopNavbar } from "@/components/fraudlink/top-navbar"
import { SidebarNav, NAV_ITEMS, type TabId } from "@/components/fraudlink/sidebar-nav"
import { NetworkGraphView } from "@/components/fraudlink/network-graph-view"
import { CyclePanel } from "@/components/fraudlink/cycle-panel"
import { RiskLeaderboard } from "@/components/fraudlink/risk-leaderboard"
import { InvestigationPlanner } from "@/components/fraudlink/investigation-planner"
import { PathTracer } from "@/components/fraudlink/path-tracer"
import { ComplianceFeed } from "@/components/fraudlink/compliance-feed"

export default function Page() {
  const [tab, setTab] = useState<TabId>("graph")
  const [frozen, setFrozen] = useState<Set<string>>(new Set())
  const [focusCycle, setFocusCycle] = useState<string | null>(null)

  const toggleFreeze = useCallback((id: string) => {
    setFrozen((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const openCycleInGraph = useCallback((cycleId: string) => {
    setFocusCycle(cycleId)
    setTab("graph")
  }, [])

  const activeLabel = NAV_ITEMS.find((n) => n.id === tab)?.label ?? ""

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopNavbar />
      <div className="flex flex-1">
        <SidebarNav active={tab} onChange={(t) => setTab(t)} />
        <main className="min-w-0 flex-1 px-4 pb-24 pt-5 sm:px-6 lg:pb-6">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Investigation / <span className="text-primary">{activeLabel}</span>
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={tab === "graph" ? "h-[calc(100vh-9.5rem)]" : ""}
            >
              {tab === "graph" && (
                <NetworkGraphView
                  frozen={frozen}
                  onFreeze={toggleFreeze}
                  initialCycleId={focusCycle}
                />
              )}
              {tab === "cycles" && <CyclePanel onOpenInGraph={openCycleInGraph} />}
              {tab === "leaderboard" && (
                <RiskLeaderboard frozen={frozen} onFreeze={toggleFreeze} />
              )}
              {tab === "planner" && <InvestigationPlanner />}
              {tab === "tracer" && <PathTracer />}
              {tab === "alerts" && <ComplianceFeed />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
