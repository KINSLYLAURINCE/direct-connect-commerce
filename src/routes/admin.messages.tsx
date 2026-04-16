import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Mail } from "lucide-react";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
});

const messages = [
  { id: 1, client: "John Doe", email: "john@example.com", product: "CloudScale Pro", productId: "prod-001", via: "WhatsApp", time: "2026-04-16 09:32", message: "Interested in enterprise plan" },
  { id: 2, client: "Jane Smith", email: "jane@example.com", product: "SecureVault Enterprise", productId: "prod-002", via: "Email", time: "2026-04-16 08:15", message: "Need demo for our team" },
  { id: 3, client: "Mike Johnson", email: "mike@example.com", product: "NeuralEngine AI", productId: "prod-004", via: "WhatsApp", time: "2026-04-15 17:45", message: "Pricing for custom models?" },
  { id: 4, client: "Sarah Wilson", email: "sarah@example.com", product: "DevPipeline Suite", productId: "prod-003", via: "Email", time: "2026-04-15 14:20", message: "Integration with GitLab?" },
  { id: 5, client: "Alex Brown", email: "alex@example.com", product: "NetMesh Ultra", productId: "prod-005", via: "WhatsApp", time: "2026-04-15 11:00", message: "Need multi-region setup" },
];

function AdminMessages() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Messages Manager</h1>
        <p className="text-muted-foreground">{messages.length} inquiries received</p>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{msg.client}</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${msg.via === "WhatsApp" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
                    {msg.via === "WhatsApp" ? <MessageCircle className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
                    {msg.via}
                  </span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{msg.email}</div>
                <div className="mt-2 text-sm text-foreground">{msg.message}</div>
                <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                  <span>Product: <strong className="text-foreground">{msg.product}</strong></span>
                  <span>ID: {msg.productId}</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
