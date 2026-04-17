import { createFileRoute } from "@tanstack/react-router";
import { Edit, Ban, Eye } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

const users = [
  { id: 1, name: "Marie Dupont", email: "marie@email.fr", phone: "+33 6 12 34 56 78", joined: "15/01/2026", inquiries: 12, status: "Actif" },
  { id: 2, name: "Pierre Martin", email: "pierre@email.fr", phone: "+33 6 23 45 67 89", joined: "20/02/2026", inquiries: 8, status: "Actif" },
  { id: 3, name: "Léa Bernard", email: "lea@email.fr", phone: "+33 6 34 56 78 90", joined: "05/03/2026", inquiries: 15, status: "Actif" },
  { id: 4, name: "Thomas Petit", email: "thomas@email.fr", phone: "+33 6 45 67 89 01", joined: "18/03/2026", inquiries: 3, status: "Désactivé" },
  { id: 5, name: "Camille Roux", email: "camille@email.fr", phone: "+33 6 56 78 90 12", joined: "01/04/2026", inquiries: 6, status: "Actif" },
];

function AdminUsers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gestion des Clients</h1>
        <p className="text-muted-foreground">{users.length} clients inscrits</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 font-medium text-muted-foreground">Client</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Téléphone</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Inscrit le</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Demandes</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Statut</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user, i) => (
              <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <td className="px-4 py-3">
                  <div className="font-medium text-foreground">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{user.phone}</td>
                <td className="px-4 py-3 text-muted-foreground">{user.joined}</td>
                <td className="px-4 py-3 text-foreground">{user.inquiries}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === "Actif" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent"><Eye className="h-4 w-4" /></button>
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent"><Edit className="h-4 w-4" /></button>
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Ban className="h-4 w-4" /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
