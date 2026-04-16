import { createFileRoute } from "@tanstack/react-router";
import { Mail, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/newsletter")({
  component: AdminNewsletter,
});

const subscribers = [
  { email: "alice@company.com", date: "2026-04-15", source: "Homepage" },
  { email: "bob@startup.io", date: "2026-04-14", source: "Footer" },
  { email: "carol@tech.com", date: "2026-04-13", source: "Homepage" },
  { email: "dave@enterprise.co", date: "2026-04-12", source: "Footer" },
  { email: "eve@digital.net", date: "2026-04-10", source: "Homepage" },
  { email: "frank@cloud.io", date: "2026-04-08", source: "Footer" },
];

function AdminNewsletter() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Newsletter Subscribers</h1>
          <p className="text-muted-foreground">{subscribers.length} active subscribers</p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
          <Mail className="h-5 w-5 text-primary" />
          <div>
            <div className="text-2xl font-bold text-foreground">{subscribers.length}</div>
            <div className="text-xs text-muted-foreground">Total subscribers</div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 font-medium text-muted-foreground">Email</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Source</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {subscribers.map((sub) => (
              <tr key={sub.email}>
                <td className="px-4 py-3 font-medium text-foreground">{sub.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{sub.date}</td>
                <td className="px-4 py-3 text-muted-foreground">{sub.source}</td>
                <td className="px-4 py-3">
                  <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
