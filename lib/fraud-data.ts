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
    id: "SHELL01",
    riskScore: 97.2,
    action: "FREEZE",
    flags: ["Shell company", "Cycle controller", "High velocity"],
    x: 120,
    y: 130,
  },
  {
    id: "SHELL02",
    riskScore: 93.4,
    action: "FREEZE",
    flags: ["Shell company", "Round-trip node"],
    x: 720,
    y: 300,
  },
  {
    id: "SHELL03",
    riskScore: 89.1,
    action: "FREEZE",
    flags: ["Shell company", "Convergence hub"],
    x: 880,
    y: 200,
  },
  {
    id: "MULE01",
    riskScore: 72.6,
    action: "ESCALATE",
    flags: ["Mule account", "Zero retention"],
    x: 330,
    y: 80,
  },
  {
    id: "MULE02",
    riskScore: 70.1,
    action: "ESCALATE",
    flags: ["Mule account", "Zero retention"],
    x: 330,
    y: 230,
  },
  {
    id: "MULE03",
    riskScore: 68.4,
    action: "ESCALATE",
    flags: ["Mule account", "Zero retention"],
    x: 330,
    y: 380,
  },
  {
    id: "MULE04",
    riskScore: 66.9,
    action: "ESCALATE",
    flags: ["Mule account", "Zero retention"],
    x: 330,
    y: 530,
  },
  {
    id: "PROXY01",
    riskScore: 55.3,
    action: "MONITOR",
    flags: ["Proxy node", "Layering assist"],
    x: 530,
    y: 180,
  },
  {
    id: "PROXY02",
    riskScore: 53.8,
    action: "MONITOR",
    flags: ["Proxy node", "Layering assist"],
    x: 530,
    y: 440,
  },
  {
    id: "EXIT01",
    riskScore: 61.2,
    action: "MONITOR",
    flags: ["Cash-out node", "Suspected final beneficiary"],
    x: 890,
    y: 540,
  },
]

export const transactions: Transaction[] = [
  { from: "SHELL01", to: "MULE01", amount: 1950000, date: "Feb 1, 08:00" },
  { from: "SHELL01", to: "MULE02", amount: 1920000, date: "Feb 1, 08:04" },
  { from: "SHELL01", to: "MULE03", amount: 1880000, date: "Feb 1, 08:09" },
  { from: "SHELL01", to: "MULE04", amount: 1850000, date: "Feb 1, 08:13" },
  { from: "MULE01", to: "PROXY01", amount: 1930000, date: "Feb 1, 11:20" },
  { from: "MULE02", to: "PROXY01", amount: 1900000, date: "Feb 1, 11:25" },
  { from: "MULE03", to: "PROXY02", amount: 1860000, date: "Feb 1, 11:31" },
  { from: "MULE04", to: "PROXY02", amount: 1830000, date: "Feb 1, 11:38" },
  { from: "PROXY01", to: "SHELL02", amount: 3790000, date: "Feb 2, 09:00" },
  { from: "PROXY02", to: "SHELL02", amount: 3650000, date: "Feb 2, 09:05" },
  { from: "SHELL02", to: "SHELL03", amount: 7200000, date: "Feb 3, 10:00" },
  { from: "SHELL03", to: "SHELL01", amount: 6950000, date: "Feb 4, 10:00" },
  { from: "SHELL03", to: "EXIT01", amount: 180000, date: "Feb 4, 10:45" },
]

export const cycles: Cycle[] = [
  {
    id: "cycle-1",
    path: ["SHELL01", "MULE01", "PROXY01", "SHELL02", "SHELL03", "SHELL01"],
    volume: 16620000,
    type: "Shell Cycling Loop",
    risk: "CRITICAL",
  },
  {
    id: "cycle-2",
    path: ["SHELL01", "MULE02", "PROXY01", "SHELL02", "SHELL03", "SHELL01"],
    volume: 16590000,
    type: "Shell Cycling Loop",
    risk: "CRITICAL",
  },
  {
    id: "cycle-3",
    path: ["SHELL01", "MULE03", "PROXY02", "SHELL02", "SHELL03", "SHELL01"],
    volume: 16540000,
    type: "Shell Cycling Loop",
    risk: "CRITICAL",
  },
  {
    id: "cycle-4",
    path: ["SHELL01", "MULE04", "PROXY02", "SHELL02", "SHELL03", "SHELL01"],
    volume: 16480000,
    type: "Shell Cycling Loop",
    risk: "CRITICAL",
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
    title: "Circular shell-cycling flow exceeds threshold",
    description:
      "Four overlapping round-trip loops funnel funds SHELL01 → mules → proxies → SHELL02 → SHELL03 → SHELL01, recirculating over ₹6.6 crore per loop. Breaches PMLA 2002. STR to FIU-IND required.",
    severity: "CRITICAL",
    account: "SHELL01",
  },
  {
    id: "alert-2",
    code: "KYC",
    title: "Shell company cluster identified",
    description:
      "SHELL01, SHELL02 and SHELL03 exhibit shell-company traits — no operating balance, near-instant pass-through, and a closed return leg (SHELL03 → SHELL01).",
    severity: "CRITICAL",
    account: "SHELL03",
  },
  {
    id: "alert-3",
    code: "STR",
    title: "Fan-out distribution from controller",
    description:
      "SHELL01 disbursed ₹76.0L across four mule accounts within 13 minutes (₹18.5L–₹19.5L each). Coordinated fan-out / layering signature.",
    severity: "HIGH",
    account: "SHELL01",
  },
  {
    id: "alert-4",
    code: "STR",
    title: "Zero-retention mule behavior",
    description:
      "MULE01–MULE04 each forwarded ~99% of received value to a proxy within hours, retaining negligible balance. Classic money-mule pass-through.",
    severity: "HIGH",
    account: "MULE01",
  },
  {
    id: "alert-5",
    code: "STR",
    title: "Proxy re-convergence hub",
    description:
      "PROXY01 and PROXY02 each aggregate two mule legs before re-injecting funds into SHELL02, masking the original distribution. Layering assist.",
    severity: "MEDIUM",
    account: "PROXY01",
  },
  {
    id: "alert-6",
    code: "KYC",
    title: "Suspected final beneficiary",
    description:
      "EXIT01 received a ₹1.8L cash-out leg from SHELL03 outside the recirculation loop. Likely final beneficiary — verify identity and source of funds.",
    severity: "MEDIUM",
    account: "EXIT01",
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
  const hasMule = path.some((id) => id.startsWith("MULE"))
  const hasProxy = path.some((id) => id.startsWith("PROXY"))
  if (hasMule && hasProxy) return "Layering"
  if (hasMule) return "Fan-out"
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
