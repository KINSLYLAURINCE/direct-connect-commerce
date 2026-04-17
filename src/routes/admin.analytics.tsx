import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/admin/analytics")({
  component: AdminAnalytics,
});

const monthlyData = [
  { month: "Jan", inquiries: 120, users: 45 },
  { month: "Fév", inquiries: 150, users: 62 },
  { month: "Mar", inquiries: 180, users: 78 },
  { month: "Avr", inquiries: 220, users: 95 },
  { month: "Mai", inquiries: 195, users: 110 },
  { month: "Juin", inquiries: 260, users: 135 },
];

const topCategories = [
  { name: "Mémoire de Forme", percentage: 35 },
  { name: "Ressorts Ensachés", percentage: 25 },
  { name: "Hybride Premium", percentage: 20 },
  { name: "Latex Naturel", percentage: 12 },
  { name: "Orthopédique", percentage: 8 },
];

function AdminAnalytics() {
  const maxInq = Math.max(...monthlyData.map((d) => d.inquiries));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Centre d'Analyse</h1>
        <p className="text-muted-foreground">Statistiques détaillées de votre activité</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-6 font-semibold text-foreground">Demandes mensuelles</h3>
          <div className="flex h-56 items-end gap-3">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs font-medium text-foreground">{d.inquiries}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.inquiries / maxInq) * 100}%` }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="w-full rounded-t-md bg-gradient-blue"
                />
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-6 font-semibold text-foreground">Croissance des inscriptions</h3>
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

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-6 font-semibold text-foreground">Catégories populaires</h3>
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
                    className="h-full rounded-full bg-gradient-blue"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-6 font-semibold text-foreground">Activité hebdomadaire</h3>
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
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
