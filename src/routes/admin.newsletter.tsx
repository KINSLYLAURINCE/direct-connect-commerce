import { createFileRoute } from "@tanstack/react-router";
import { Mail, Trash2, Send } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import AdminModal from "@/components/admin/AdminModal";
import NewsletterForm from "@/components/admin/NewsletterForm";

export const Route = createFileRoute("/admin/newsletter")({
  component: AdminNewsletter,
});

const initialSubs = [
  { email: "alice@email.fr", date: "15/04/2026", source: "Accueil" },
  { email: "bob@email.fr", date: "14/04/2026", source: "Footer" },
  { email: "carole@email.fr", date: "13/04/2026", source: "Accueil" },
  { email: "david@email.fr", date: "12/04/2026", source: "Footer" },
  { email: "eve@email.fr", date: "10/04/2026", source: "Accueil" },
  { email: "francois@email.fr", date: "08/04/2026", source: "Footer" },
];

function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState(initialSubs);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSend = (data: { subject: string; content: string }) => {
    alert(`Newsletter "${data.subject}" envoyée à ${subscribers.length} abonnés !`);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Newsletter</h1>
          <p className="text-muted-foreground">{subscribers.length} abonnés actifs</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold text-foreground">{subscribers.length}</div>
              <div className="text-xs text-muted-foreground">Abonnés</div>
            </div>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-blue px-4 py-2.5 text-sm font-medium text-white shadow-md hover:scale-105 transition-transform"
          >
            <Send className="h-4 w-4" /> Envoyer
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
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
            {subscribers.map((sub, i) => (
              <motion.tr key={sub.email} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <td className="px-4 py-3 font-medium text-foreground">{sub.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{sub.date}</td>
                <td className="px-4 py-3 text-muted-foreground">{sub.source}</td>
                <td className="px-4 py-3">
                  <button onClick={() => setSubscribers(subscribers.filter((s) => s.email !== sub.email))} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title="Envoyer une newsletter">
        <NewsletterForm onSubmit={handleSend} onCancel={() => setModalOpen(false)} />
      </AdminModal>
    </div>
  );
}
