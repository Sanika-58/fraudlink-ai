export type Action = "FREEZE" | "ESCALATE" | "MONITOR"
export type Risk = "CRITICAL" | "HIGH" | "MEDIUM" | "SAFE"

export interface Account {
  id: string
  riskScore: number
  action: Action
  flags: string[]
  /** layout position on the 1000x680 graph canvas */
  x: number
  y: number
}

export interface Transaction {
  from: string
  to: string
  amount: number
  date: string
}

export interface Cycle {
  id: string
  path: string[]
  volume: number
  type: string
  risk: Risk
}

export const accounts: Account[] = [
  {
    id: "A123",
    riskScore: 95.1,
    action: "FREEZE",
    flags: ["Cycle origin", "Round-trip receiver", "Smurfing source"],
    x: 500,
    y: 90,
  },
  {
    id: "B456",
    riskScore: 78.3,
    action: "ESCALATE",
    flags: ["Layering node", "Pass-through mule"],
    x: 840,
    y: 250,
  },
  {
    id: "C789",
    riskScore: 88.6,
    action: "FREEZE",
    flags: ["Cycle node", "Dual feed receiver"],
    x: 660,
    y: 560,
  },
  {
    id: "D012",
    riskScore: 81.2,
    action: "ESCALATE",
    flags: ["Cycle node", "Return leg"],
    x: 230,
    y: 470,
  },
  {
    id: "E345",
    riskScore: 74.9,
    action: "ESCALATE",
    flags: ["Smurfing splitter", "High velocity"],
    x: 250,
    y: 180,
  },
  {
    id: "F678",
    riskScore: 52.4,
    action: "MONITOR",
    flags: ["Smurf leg mule"],
    x: 360,
    y: 360,
  },
  {
    id: "G901",
    riskScore: 50.7,
    action: "MONITOR",
    flags: ["Smurf leg mule"],
    x: 540,
    y: 330,
  },
]

export const transactions: Transaction[] = [
  { from: "A123", to: "B456", amount: 980000, date: "Jan 3, 09:12" },
  { from: "B456", to: "C789", amount: 960000, date: "Jan 3, 11:40" },
  { from: "C789", to: "D012", amount: 945000, date: "Jan 4, 08:05" },
  { from: "D012", to: "A123", amount: 920000, date: "Jan 4, 14:22" },
  { from: "A123", to: "E345", amount: 450000, date: "Jan 5, 10:00" },
  { from: "E345", to: "F678", amount: 225000, date: "Jan 5, 10:14" },
  { from: "E345", to: "G901", amount: 220000, date: "Jan 5, 10:18" },
  { from: "F678", to: "C789", amount: 210000, date: "Jan 6, 09:30" },
  { from: "G901", to: "C789", amount: 205000, date: "Jan 6, 09:33" },
]

export const cycles: Cycle[] = [
  {
    id: "cycle-1",
    path: ["A123", "B456", "C789", "D012", "A123"],
    volume: 3805000,
    type: "Simple Loop",
    risk: "CRITICAL",
  },
  {
    id: "cycle-2",
    path: ["A123", "E345", "F678", "C789", "D012", "A123"],
    volume: 2310000,
    type: "Smurf Feedback Loop",
    risk: "HIGH",
  },
  {
    id: "cycle-3",
    path: ["A123", "E345", "G901", "C789", "D012", "A123"],
    volume: 2300000,
    type: "Smurf Feedback Loop",
    risk: "HIGH",
  },
]

export interface ComplianceAlert {
  id: string
  code: string
  title: string
  description: string
  severity: Risk
  account?: string
}

export const complianceAlerts: ComplianceAlert[] = [
  {
    id: "alert-1",
    code: "PMLA",
    title: "Circular flow exceeds reporting threshold",
    description:
      "Round-trip loop A123 to B456 to C789 to D012 circulated ₹38,05,000, breaching PMLA 2002 limits. STR to FIU-IND required.",
    severity: "CRITICAL",
    account: "A123",
  },
  {
    id: "alert-2",
    code: "CTR",
    title: "Structuring signature detected",
    description:
      "Four transactions clustered between ₹9.2L and ₹9.8L, each just under the ₹10L CTR threshold. Classic structuring.",
    severity: "CRITICAL",
    account: "C789",
  },
  {
    id: "alert-3",
    code: "STR",
    title: "Smurfing velocity anomaly",
    description:
      "E345 split ₹4.5L into ₹2.25L and ₹2.20L legs within 4 minutes, re-converging at C789. File suspicious transaction report.",
    severity: "HIGH",
    account: "E345",
  },
  {
    id: "alert-4",
    code: "KYC",
    title: "Shell account suspected",
    description:
      "D012 closes the return leg of the primary cycle. Account age and KYC re-verification recommended.",
    severity: "HIGH",
    account: "D012",
  },
  {
    id: "alert-5",
    code: "KYC",
    title: "Mule pass-through pattern",
    description:
      "B456 acts as a high-value pass-through relay with near-zero retained balance. Review counterparties.",
    severity: "MEDIUM",
    account: "B456",
  },
  {
    id: "alert-6",
    code: "STR",
    title: "Convergence hub flagged",
    description:
      "C789 receives from three independent legs (D-feed, F-leg, G-leg). Dual-feed receiver behavior.",
    severity: "MEDIUM",
    account: "C789",
  },
]

/* ---------- helpers ---------- */

export function riskLevel(score: number): Risk {
  if (score >= 85) return "CRITICAL"
  if (score >= 70) return "HIGH"
  if (score >= 55) return "MEDIUM"
  return "SAFE"
}

export const riskColorVar: Record<Risk, string> = {
  CRITICAL: "var(--risk-critical)",
  HIGH: "var(--risk-high)",
  MEDIUM: "var(--risk-medium)",
  SAFE: "var(--risk-safe)",
}

export const riskTextClass: Record<Risk, string> = {
  CRITICAL: "text-risk-critical",
  HIGH: "text-risk-high",
  MEDIUM: "text-risk-medium",
  SAFE: "text-risk-safe",
}

export const actionColor: Record<Action, Risk> = {
  FREEZE: "CRITICAL",
  ESCALATE: "HIGH",
  MONITOR: "MEDIUM",
}

export function formatINR(amount: number): string {
  const s = Math.round(amount).toString()
  const last3 = s.slice(-3)
  const rest = s.slice(0, -3)
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
  return "₹" + (rest ? grouped + "," : "") + last3
}

export function getAccount(id: string): Account | undefined {
  return accounts.find((a) => a.id === id)
}

export function txFor(id: string): { incoming: Transaction[]; outgoing: Transaction[] } {
  return {
    incoming: transactions.filter((t) => t.to === id),
    outgoing: transactions.filter((t) => t.from === id),
  }
}

/** Build adjacency list for traversal algorithms. */
export function adjacency(): Record<string, string[]> {
  const adj: Record<string, string[]> = {}
  for (const a of accounts) adj[a.id] = []
  for (const t of transactions) adj[t.from].push(t.to)
  return adj
}

/** BFS layering — returns ordered list of nodes by discovery + depth map. */
export function bfsOrder(seed: string): { order: string[]; depth: Record<string, number> } {
  const adj = adjacency()
  const depth: Record<string, number> = { [seed]: 0 }
  const order: string[] = [seed]
  const queue = [seed]
  while (queue.length) {
    const node = queue.shift() as string
    for (const next of adj[node] ?? []) {
      if (depth[next] === undefined) {
        depth[next] = depth[node] + 1
        order.push(next)
        queue.push(next)
      }
    }
  }
  return { order, depth }
}

/** DFS — returns the first traversal order discovered from seed. */
export function dfsOrder(seed: string): string[] {
  const adj = adjacency()
  const visited = new Set<string>()
  const order: string[] = []
  const stack = [seed]
  while (stack.length) {
    const node = stack.pop() as string
    if (visited.has(node)) continue
    visited.add(node)
    order.push(node)
    const neighbors = [...(adj[node] ?? [])].reverse()
    for (const n of neighbors) if (!visited.has(n)) stack.push(n)
  }
  return order
}

/** Longest simple suspicious path from a seed (used for the path tracer). */
export function longestPath(seed: string): string[] {
  const adj = adjacency()
  let best: string[] = [seed]
  const dfs = (node: string, path: string[], seen: Set<string>) => {
    if (path.length > best.length) best = [...path]
    for (const next of adj[node] ?? []) {
      if (!seen.has(next)) {
        seen.add(next)
        dfs(next, [...path, next], seen)
        seen.delete(next)
      }
    }
  }
  dfs(seed, [seed], new Set([seed]))
  return best
}

export function detectPattern(path: string[]): string {
  if (path.length >= 2 && path[0] === path[path.length - 1]) return "Round-trip"
  const hasSmurf = path.some((id) => ["E345", "F678", "G901"].includes(id))
  if (hasSmurf) return "Smurfing"
  return "Layering"
}

export function pathVolume(path: string[]): number {
  let total = 0
  for (let i = 0; i < path.length - 1; i++) {
    const tx = transactions.find((t) => t.from === path[i] && t.to === path[i + 1])
    if (tx) total += tx.amount
  }
  return total
}

/**
 * Branch & Bound investigation planner: greedily select up to `budget`
 * accounts that maximize fraud exposure (risk-weighted volume coverage).
 */
export interface PlanStep {
  account: string
  marginalExposure: number
  reason: string
}

export function investigationPlan(budget: number): {
  steps: PlanStep[]
  exposure: number
  yieldScore: number
} {
  // exposure contribution per account = volume routed through it
  const routed: Record<string, number> = {}
  for (const a of accounts) routed[a.id] = 0
  for (const t of transactions) {
    routed[t.from] += t.amount
    routed[t.to] += t.amount
  }
  // weight by risk score, branch & bound prunes low-yield leaves
  const ranked = [...accounts].sort(
    (a, b) => routed[b.id] * b.riskScore - routed[a.id] * a.riskScore,
  )
  const totalVolume = transactions.reduce((s, t) => s + t.amount, 0) * 2
  const chosen = ranked.slice(0, budget)
  let exposure = 0
  const steps: PlanStep[] = chosen.map((a) => {
    const marginal = routed[a.id]
    exposure += marginal
    return {
      account: a.id,
      marginalExposure: marginal,
      reason:
        a.action === "FREEZE"
          ? "High-centrality cycle hub — freeze first"
          : a.action === "ESCALATE"
            ? "Relay node — escalate to AML"
            : "Peripheral mule — monitor",
    }
  })
  const yieldScore = Math.min(100, Math.round((exposure / totalVolume) * 100))
  return { steps, exposure, yieldScore }
}