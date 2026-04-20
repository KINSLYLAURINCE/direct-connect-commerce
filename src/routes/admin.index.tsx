import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Package, ShoppingBag, MessageCircle, TrendingUp, ArrowUpRight } from "lucide-react";
import { products } from "@/lib/data";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

const kpis = [
  { label: "Total Produits",       value: "12",  change: "+2",   icon: Package },
  { label: "Commandes du mois",    value: "184", change: "+12%", icon: ShoppingBag },
  { label: "Demandes du jour",     value: "34",  change: "+8%",  icon: MessageCircle },
  { label: "Croissance mensuelle", value: "18%", change: "+3%",  icon: TrendingUp },
];

const recentInquiries = [
  { name: "Marie Dupont", product: "CloudRest Mémoire 24cm", via: "WhatsApp", time: "il y a 2 min" },
  { name: "Pierre Martin", product: "OrthoSpring Premium", via: "Email", time: "il y a 15 min" },
  { name: "Léa Bernard", product: "BioLatex Nature", via: "WhatsApp", time: "il y a 1 h" },
  { name: "Thomas Petit", product: "HybridLuxe Royal", via: "Email", time: "il y a 2 h" },
  { name: "Camille Roux", product: "DorsiCare Ortho", via: "WhatsApp", time: "il y a 3 h" },
];

function AdminOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground">Bienvenue ! Voici un aperçu de votre activité.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-gradient-blue/10 p-2">
                <kpi.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-success">
                <ArrowUpRight className="h-3 w-3" /> {kpi.change}
              </span>
            </div>
            <div className="mt-3 text-2xl font-bold text-foreground">{kpi.value}</div>
            <div className="text-sm text-muted-foreground">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-foreground">Demandes (7 derniers jours)</h3>
          <div className="flex h-48 items-end gap-2">
            {[35, 52, 41, 68, 55, 78, 62].map((v, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${(v / 80) * 100}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex-1 rounded-t-md bg-gradient-blue"
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-foreground">Matelas les plus demandés</h3>
          <div className="space-y-3">
            {products.slice(0, 5).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-muted-foreground">{i + 1}</span>
                <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.category}</div>
                </div>
                <div className="text-sm font-semibold text-primary">{Math.floor(Math.random() * 50 + 20)} demandes</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-foreground">Demandes récentes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-medium text-muted-foreground">Client</th>
                <th className="pb-3 font-medium text-muted-foreground">Matelas</th>
                <th className="pb-3 font-medium text-muted-foreground">Canal</th>
                <th className="pb-3 font-medium text-muted-foreground">Quand</th>
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
