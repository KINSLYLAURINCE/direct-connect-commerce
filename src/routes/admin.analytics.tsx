import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/admin/analytics")({
  component: AdminAnalytics,
});

const monthlyData = [
  { month: "Jan", inquiries: 120, users: 45 },
  { month: "Feb", inquiries: 150, users: 62 },
  { month: "Mar", inquiries: 180, users: 78 },
  { month: "Apr", inquiries: 220, users: 95 },
  { month: "May", inquiries: 195, users: 110 },
  { month: "Jun", inquiries: 260, users: 135 },
];

const topCategories = [
  { name: "Cloud Solutions", percentage: 35 },
  { name: "Cybersecurity", percentage: 25 },
  { name: "DevOps Tools", percentage: 20 },
  { name: "AI & ML", percentage: 12 },
  { name: "Networking", percentage: 8 },
];

function AdminAnalytics() {
  const maxInq = Math.max(...monthlyData.map((d) => d.inquiries));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics Center</h1>
        <p className="text-muted-foreground">Detailed insights into your business performance</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Inquiries */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-6 font-semibold text-foreground">Monthly Inquiries</h3>
          <div className="flex h-56 items-end gap-3">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs font-medium text-foreground">{d.inquiries}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.inquiries / maxInq) * 100}%` }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="w-full rounded-t-md bg-primary/80"
                />
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Registrations */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-6 font-semibold text-foreground">User Registrations Growth</h3>
          <div className="flex h-56 items-end gap-3">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs font-medium text-foreground">{d.users}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.users / 140) * 100}%` }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="w-full rounded-t-md bg-chart-2"
                />
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories Interest */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-6 font-semibold text-foreground">Top Categories by Interest</h3>
          <div className="space-y-4">
            {topCategories.map((cat, i) => (
              <div key={cat.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-foreground">{cat.name}</span>
                  <span className="font-medium text-primary">{cat.percentage}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Activity */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-6 font-semibold text-foreground">Daily Activity (This Week)</h3>
          <div className="flex h-48 items-end gap-2">
            {[22, 35, 28, 42, 38, 55, 48].map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / 60) * 100}%` }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="w-full rounded-t-md bg-chart-3"
                />
                <span className="text-xs text-muted-foreground">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
