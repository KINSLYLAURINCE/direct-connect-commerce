import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/layout/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — DreamRest" },
      { name: "description", content: "Contactez DreamRest pour toute question sur nos matelas." },
      { property: "og:title", content: "Contact — DreamRest" },
      { property: "og:description", content: "Notre équipe est à votre écoute." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Restons en <span className="text-gradient">contact</span></h1>
          <p className="mt-4 text-lg text-muted-foreground">Notre équipe vous répond sous 24h.</p>
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {sent ? (
              <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                  <Send className="h-8 w-8 text-success" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">Message envoyé !</h3>
                <p className="mt-2 text-muted-foreground">Nous vous répondrons sous 24h.</p>
                <button onClick={() => setSent(false)} className="mt-6 rounded-lg bg-gradient-blue px-6 py-2 text-sm font-medium text-white">Envoyer un autre</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Nom</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Votre nom complet" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="vous@email.fr" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Téléphone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+33 6 00 00 00 00" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
                  <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Comment pouvons-nous vous aider ?" />
                </div>
                <button type="submit" className="w-full rounded-lg bg-gradient-blue py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]">
                  Envoyer le message
                </button>
              </form>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "contact@dreamrest.fr", href: "mailto:contact@dreamrest.fr" },
                { icon: Phone, label: "Téléphone", value: "+33 1 23 45 67 89", href: "tel:+33123456789" },
                { icon: MessageCircle, label: "WhatsApp", value: "Discutez avec nous", href: "https://wa.me/33600000000" },
                { icon: MapPin, label: "Showroom", value: "10 rue de Rivoli, 75001 Paris", href: "#" },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  whileHover={{ x: 6 }}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-gradient-blue/5">
              <div className="text-center text-muted-foreground">
                <MapPin className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 text-sm">Notre showroom</p>
                <p className="text-xs">Paris, France</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
