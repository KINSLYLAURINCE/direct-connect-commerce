import { createFileRoute } from "@tanstack/react-router";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure your admin panel preferences</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Company Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Company Name</label>
              <input defaultValue="NexScale" className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Email</label>
              <input defaultValue="contact@nexscale.io" className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Phone</label>
              <input defaultValue="+1 (555) 000-1234" className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">WhatsApp</label>
              <input defaultValue="+15550001234" className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Notification Preferences</h3>
          <div className="space-y-3">
            {["Email notifications for new inquiries", "WhatsApp notifications for urgent requests", "Daily digest summary", "New user registration alerts"].map((item) => (
              <label key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                <input type="checkbox" defaultChecked className="rounded accent-primary" />
                {item}
              </label>
            ))}
          </div>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground">
          <Save className="h-4 w-4" /> Save Settings
        </button>
      </div>
    </div>
  );
}
