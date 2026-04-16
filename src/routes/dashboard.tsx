import { createFileRoute } from "@tanstack/react-router";
import { User, MessageCircle, Settings, LogOut } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — NexScale" },
      { name: "description", content: "Your NexScale account dashboard." },
    ],
  }),
  component: DashboardPage,
});

const inquiries = [
  { product: "CloudScale Pro", date: "2026-04-15", status: "Replied", via: "WhatsApp" },
  { product: "SecureVault Enterprise", date: "2026-04-12", status: "Pending", via: "Email" },
  { product: "NeuralEngine AI", date: "2026-04-08", status: "Replied", via: "WhatsApp" },
];

function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-24 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <nav className="hidden space-y-1 lg:block">
          {[
            { icon: User, label: "Profile", active: true },
            { icon: MessageCircle, label: "Inquiries", active: false },
            { icon: Settings, label: "Settings", active: false },
            { icon: LogOut, label: "Sign Out", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${item.active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
            <p className="text-muted-foreground">Manage your profile and view inquiry history</p>
          </div>

          {/* Profile Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Profile Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Name</label>
                <input defaultValue="Guest User" className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Email</label>
                <input defaultValue="guest@example.com" className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Phone</label>
                <input defaultValue="+1 (555) 000-0000" className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <button className="mt-4 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground">Save Changes</button>
          </div>

          {/* Inquiry History */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Inquiry History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 font-medium text-muted-foreground">Product</th>
                    <th className="pb-3 font-medium text-muted-foreground">Date</th>
                    <th className="pb-3 font-medium text-muted-foreground">Via</th>
                    <th className="pb-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {inquiries.map((inq, i) => (
                    <tr key={i}>
                      <td className="py-3 font-medium text-foreground">{inq.product}</td>
                      <td className="py-3 text-muted-foreground">{inq.date}</td>
                      <td className="py-3 text-muted-foreground">{inq.via}</td>
                      <td className="py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${inq.status === "Replied" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                          {inq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
