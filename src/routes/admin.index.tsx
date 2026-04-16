import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Package, Users, MessageCircle, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { products } from "@/lib/data";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

const kpis = [
  { label: "Total Products", value: "8", change: "+2", up: true, icon: Package },
  { label: "Registered Users", value: "2,547", change: "+12%", up: true, icon: Users },
  { label: "Inquiries Today", value: "34", change: "+8%", up: true, icon: MessageCircle },
  { label: "Monthly Growth", value: "18%", change: "+3%", up: true, icon: TrendingUp },
];

const recentInquiries = [
  { name: "John Doe", product: "CloudScale Pro", via: "WhatsApp", time: "2 min ago" },
  { name: "Jane Smith", product: "SecureVault Enterprise", via: "Email", time: "15 min ago" },
  { name: "Mike Johnson", product: "NeuralEngine AI", via: "WhatsApp", time: "1 hr ago" },
  { name: "Sarah Wilson", product: "DevPipeline Suite", via: "Email", time: "2 hrs ago" },
  { name: "Alex Brown", product: "NetMesh Ultra", via: "WhatsApp", time: "3 hrs ago" },
];

function AdminOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-2">
                <kpi.icon className="h-5 w-5 text-primary" />
              </div>
              <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${kpi.up ? "text-success" : "text-destructive"}`}>
                {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {kpi.change}
              </span>
            </div>
            <div className="mt-3 text-2xl font-bold text-foreground">{kpi.value}</div>
            <div className="text-sm text-muted-foreground">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Chart placeholder */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Inquiry Trends (Last 7 Days)</h3>
          <div className="flex h-48 items-end gap-2">
            {[35, 52, 41, 68, 55, 78, 62].map((v, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${(v / 80) * 100}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex-1 rounded-t-md bg-primary/80"
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Most Requested Products</h3>
          <div className="space-y-3">
            {products.slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-muted-foreground">{i + 1}</span>
                <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.category}</div>
                </div>
                <div className="text-sm font-semibold text-primary">{Math.floor(Math.random() * 50 + 20)} inquiries</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 font-semibold text-foreground">Recent Inquiries</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-medium text-muted-foreground">Client</th>
                <th className="pb-3 font-medium text-muted-foreground">Product</th>
                <th className="pb-3 font-medium text-muted-foreground">Channel</th>
                <th className="pb-3 font-medium text-muted-foreground">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentInquiries.map((inq, i) => (
                <tr key={i}>
                  <td className="py-3 font-medium text-foreground">{inq.name}</td>
                  <td className="py-3 text-muted-foreground">{inq.product}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${inq.via === "WhatsApp" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
                      {inq.via}
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground">{inq.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
