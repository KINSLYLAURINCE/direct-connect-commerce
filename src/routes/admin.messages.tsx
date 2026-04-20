import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Mail, Trash2, ExternalLink, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
});

interface Msg {
  id: number;
  client: string;
  email: string;
  phone: string;
  product: string;
  productId: string;
  via: "WhatsApp" | "Email";
  time: string;
  message: string;
  read: boolean;
}

const initialMessages: Msg[] = [
  { id: 1, client: "Marie Dupont",  email: "marie@email.fr",  phone: "+221771234567", product: "CloudRest Mémoire 24cm", productId: "mat-001", via: "WhatsApp", time: "16/04/2026 09:32", message: "Bonjour, je voudrais savoir si ce matelas est disponible en 160x200 ?", read: false },
  { id: 2, client: "Pierre Martin", email: "pierre@email.fr", phone: "+33612345678",  product: "OrthoSpring Premium",    productId: "mat-002", via: "Email",    time: "16/04/2026 08:15", message: "Combien de temps pour la livraison à Lyon ?", read: false },
  { id: 3, client: "Léa Bernard",   email: "lea@email.fr",    phone: "+237655555555", product: "BioLatex Nature",        productId: "mat-003", via: "WhatsApp", time: "15/04/2026 17:45", message: "Avez-vous une garantie sur ce modèle ?", read: true },
  { id: 4, client: "Thomas Petit",  email: "thomas@email.fr", phone: "+225070000000", product: "HybridLuxe Royal",       productId: "mat-004", via: "Email",    time: "15/04/2026 14:20", message: "Possibilité d'essai à domicile ?", read: true },
];

function AdminMessages() {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = messages.filter((m) => filter === "all" || !m.read);
  const unread = messages.filter((m) => !m.read).length;

  const toggleRead = (id: number) => setMessages(messages.map((m) => m.id === id ? { ...m, read: !m.read } : m));
  const remove = (id: number) => { if (confirm("Supprimer ce message ?")) setMessages(messages.filter((m) => m.id !== id)); };

  const directLink = (m: Msg) =>
    m.via === "WhatsApp"
      ? `https://wa.me/${m.phone.replace(/\D/g, "")}`
      : `mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.product}`)}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Messages clients</h1>
          <p className="text-muted-foreground">{messages.length} demandes · <span className="font-medium text-primary">{unread} non lues</span></p>
        </div>
        <div className="inline-flex rounded-lg border border-border bg-card p-0.5 text-xs">
          <button onClick={() => setFilter("all")} className={`rounded-md px-3 py-1.5 font-medium transition-colors ${filter === "all" ? "bg-gradient-blue text-white shadow-sm" : "text-muted-foreground"}`}>Tous</button>
          <button onClick={() => setFilter("unread")} className={`rounded-md px-3 py-1.5 font-medium transition-colors ${filter === "unread" ? "bg-gradient-blue text-white shadow-sm" : "text-muted-foreground"}`}>Non lus ({unread})</button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((msg, i) => {
          const Icon = msg.via === "WhatsApp" ? MessageCircle : Mail;
          const accent = msg.via === "WhatsApp" ? "bg-[#25D366]" : "bg-primary";
          return (
            <motion.article
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
              className={`relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all ${msg.read ? "border-border" : "border-primary/30 ring-1 ring-primary/10"}`}
            >
              <span className={`absolute left-0 top-0 h-full w-1 ${accent}`} aria-hidden />
              <div className="flex flex-col gap-4 p-5 pl-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-foreground">{msg.client}</span>
                    {!msg.read && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">Nouveau</span>}
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${msg.via === "WhatsApp" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
                      <Icon className="h-3 w-3" /> {msg.via}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                    <span>{msg.email}</span>
                    <span>·</span>
                    <span>{msg.phone}</span>
                  </div>
                  <blockquote className="mt-3 rounded-lg border-l-2 border-border bg-secondary/40 px-3 py-2 text-sm text-foreground">
                    {msg.message}
                  </blockquote>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>Produit : <strong className="text-foreground">{msg.product}</strong></span>
                    <span>Réf : {msg.productId}</span>
                    <span>· {msg.time}</span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-row gap-2 sm:flex-col">
                  <a
                    href={directLink(msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-md transition-transform hover:scale-105 ${msg.via === "WhatsApp" ? "bg-[#25D366]" : "bg-gradient-blue"}`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {msg.via === "WhatsApp" ? "Ouvrir WhatsApp" : "Répondre par email"}
                  </a>
                  <button
                    onClick={() => toggleRead(msg.id)}
                    className="inline-flex items-center justify-center gap-1 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-accent"
                    title={msg.read ? "Marquer non lu" : "Marquer lu"}
                  >
                    <Check className="h-3.5 w-3.5" /> {msg.read ? "Non lu" : "Lu"}
                  </button>
                  <button
                    onClick={() => remove(msg.id)}
                    className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          );
        })}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center text-sm text-muted-foreground">
            Aucun message {filter === "unread" ? "non lu" : ""}.
          </div>
        )}
      </div>
    </div>
  );
}
