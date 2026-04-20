import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Eye, CheckCircle2, Clock, XCircle, Search } from "lucide-react";
import { useState } from "react";
import { formatFCFA } from "@/lib/data";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

type OrderStatus = "pending" | "confirmed" | "delivered" | "cancelled";

interface Order {
  id: string;
  client: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  productId: string;
  amount: number;
  via: "WhatsApp" | "Email";
  date: string;
  status: OrderStatus;
}

const initialOrders: Order[] = [
  { id: "CMD-2026-001", client: "Marie Dupont",  email: "marie@email.fr",   phone: "+221 77 123 45 67", country: "Sénégal",       product: "CloudRest Mémoire 24cm", productId: "mat-001", amount: 250000, via: "WhatsApp", date: "16/04/2026 09:32", status: "pending" },
  { id: "CMD-2026-002", client: "Pierre Martin", email: "pierre@email.fr",  phone: "+225 07 00 00 00",  country: "Côte d'Ivoire", product: "OrthoSpring Premium",    productId: "mat-002", amount: 350000, via: "Email",    date: "16/04/2026 08:15", status: "confirmed" },
  { id: "CMD-2026-003", client: "Léa Bernard",   email: "lea@email.fr",     phone: "+237 6 55 55 55",   country: "Cameroun",      product: "BioLatex Nature",        productId: "mat-003", amount: 425000, via: "WhatsApp", date: "15/04/2026 17:45", status: "delivered" },
  { id: "CMD-2026-004", client: "Thomas Petit",  email: "thomas@email.fr",  phone: "+33 6 12 34 56 78", country: "France",        product: "HybridLuxe Royal",       productId: "mat-004", amount: 650000, via: "Email",    date: "15/04/2026 14:20", status: "pending" },
  { id: "CMD-2026-005", client: "Camille Roux",  email: "camille@email.fr", phone: "+221 76 999 88 77", country: "Sénégal",       product: "DorsiCare Ortho",        productId: "mat-005", amount: 325000, via: "WhatsApp", date: "14/04/2026 11:02", status: "cancelled" },
];

const STATUS_META: Record<OrderStatus, { label: string; cls: string; icon: typeof Clock }> = {
  pending:   { label: "En attente",  cls: "bg-warning/10 text-warning",         icon: Clock },
  confirmed: { label: "Confirmée",   cls: "bg-primary/10 text-primary",         icon: CheckCircle2 },
  delivered: { label: "Livrée",      cls: "bg-success/10 text-success",         icon: CheckCircle2 },
  cancelled: { label: "Annulée",     cls: "bg-destructive/10 text-destructive", icon: XCircle },
};

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");

  const filtered = orders.filter((o) =>
    (filter === "all" || o.status === filter) &&
    (o.client.toLowerCase().includes(search.toLowerCase()) ||
     o.id.toLowerCase().includes(search.toLowerCase()) ||
     o.product.toLowerCase().includes(search.toLowerCase()))
  );

  const total = orders.reduce((s, o) => o.status !== "cancelled" ? s + o.amount : s, 0);

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders(orders.map((o) => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Commandes</h1>
          <p className="text-muted-foreground">{orders.length} commandes — {formatFCFA(total)} générés</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par client, n° de commande, produit…"
            className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="inline-flex rounded-lg border border-border bg-card p-0.5 text-xs">
          {(["all", "pending", "confirmed", "delivered", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-md px-3 py-1.5 font-medium transition-colors ${filter === s ? "bg-gradient-blue text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              {s === "all" ? "Toutes" : STATUS_META[s].label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 font-medium text-muted-foreground">N°</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Client</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Produit</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Montant</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Canal</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Statut</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((o, i) => {
              const meta = STATUS_META[o.status];
              const Icon = meta.icon;
              return (
                <motion.tr
                  key={o.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(i * 0.03, 0.4) }}
                >
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{o.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{o.client}</div>
                    <div className="text-xs text-muted-foreground">{o.country} · {o.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{o.product}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{formatFCFA(o.amount)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${o.via === "WhatsApp" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>{o.via}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{o.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.cls}`}>
                      <Icon className="h-3 w-3" /> {meta.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
                      className="rounded-lg border border-input bg-background px-2 py-1 text-xs"
                    >
                      <option value="pending">En attente</option>
                      <option value="confirmed">Confirmée</option>
                      <option value="delivered">Livrée</option>
                      <option value="cancelled">Annulée</option>
                    </select>
                  </td>
                </motion.tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-sm text-muted-foreground"><Eye className="mx-auto mb-2 h-5 w-5 opacity-50" />Aucune commande trouvée</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
