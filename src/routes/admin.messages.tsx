import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Mail, Reply, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import AdminModal from "@/components/admin/AdminModal";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
});

const initialMessages = [
  { id: 1, client: "Marie Dupont", email: "marie@email.fr", product: "CloudRest Mémoire 24cm", productId: "mat-001", via: "WhatsApp", time: "16/04/2026 09:32", message: "Bonjour, je voudrais savoir si ce matelas est disponible en 160x200 ?" },
  { id: 2, client: "Pierre Martin", email: "pierre@email.fr", product: "OrthoSpring Premium", productId: "mat-002", via: "Email", time: "16/04/2026 08:15", message: "Combien de temps pour la livraison à Lyon ?" },
  { id: 3, client: "Léa Bernard", email: "lea@email.fr", product: "BioLatex Nature", productId: "mat-003", via: "WhatsApp", time: "15/04/2026 17:45", message: "Avez-vous une garantie sur ce modèle ?" },
  { id: 4, client: "Thomas Petit", email: "thomas@email.fr", product: "HybridLuxe Royal", productId: "mat-004", via: "Email", time: "15/04/2026 14:20", message: "Possibilité d'essai à domicile ?" },
];

function AdminMessages() {
  const [messages, setMessages] = useState(initialMessages);
  const [replyOpen, setReplyOpen] = useState(false);
  const [current, setCurrent] = useState<typeof initialMessages[0] | null>(null);
  const [reply, setReply] = useState("");

  const sendReply = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Réponse envoyée à ${current?.client}`);
    setReplyOpen(false);
    setReply("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Messages Clients</h1>
        <p className="text-muted-foreground">{messages.length} demandes reçues</p>
      </div>

      <div className="space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
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
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span>Matelas : <strong className="text-foreground">{msg.product}</strong></span>
                  <span>Réf : {msg.productId}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-xs text-muted-foreground">{msg.time}</div>
                <div className="flex gap-2">
                  <button onClick={() => { setCurrent(msg); setReplyOpen(true); }} className="rounded-lg bg-gradient-blue px-3 py-1.5 text-xs font-medium text-white">
                    <Reply className="inline h-3 w-3" /> Répondre
                  </button>
                  <button onClick={() => confirm("Supprimer ?") && setMessages(messages.filter((m) => m.id !== msg.id))} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AdminModal open={replyOpen} onClose={() => setReplyOpen(false)} title={`Répondre à ${current?.client ?? ""}`}>
        <form onSubmit={sendReply} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Destinataire</label>
            <input disabled value={current?.email ?? ""} className="w-full rounded-lg border border-input bg-muted px-4 py-2.5 text-sm text-muted-foreground" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Votre réponse</label>
            <textarea required rows={5} value={reply} onChange={(e) => setReply(e.target.value)} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Bonjour..." />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setReplyOpen(false)} className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent">Annuler</button>
            <button type="submit" className="flex-1 rounded-lg bg-gradient-blue px-4 py-2.5 text-sm font-semibold text-white">Envoyer</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
