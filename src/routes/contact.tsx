import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/layout/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — NexScale" },
      { name: "description", content: "Get in touch with NexScale for enterprise cloud and DevOps solutions." },
      { property: "og:title", content: "Contact Us — NexScale" },
      { property: "og:description", content: "Get in touch with NexScale for enterprise cloud and DevOps solutions." },
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
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Get in <span className="text-gradient">Touch</span></h1>
          <p className="mt-4 text-lg text-muted-foreground">We'd love to hear from you. Reach out via any channel below.</p>
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {sent ? (
              <div className="rounded-2xl border border-border bg-card p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                  <Send className="h-8 w-8 text-success" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">Message Sent!</h3>
                <p className="mt-2 text-muted-foreground">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="mt-6 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-8">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your full name" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
                  <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="How can we help?" />
                </div>
                <button type="submit" className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90">
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info + Map */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "contact@nexscale.io", href: "mailto:contact@nexscale.io" },
                { icon: Phone, label: "Phone", value: "+1 (555) 000-1234", href: "tel:+15550001234" },
                { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/15550001234" },
                { icon: MapPin, label: "Office", value: "123 Innovation Dr, San Francisco, CA 94105", href: "#" },
              ].map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-accent">
              <div className="text-center text-muted-foreground">
                <MapPin className="mx-auto h-8 w-8" />
                <p className="mt-2 text-sm">Google Maps Integration</p>
                <p className="text-xs">San Francisco, CA</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
