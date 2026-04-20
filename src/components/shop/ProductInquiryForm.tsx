import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useLang } from "@/lib/i18n";
import type { Product } from "@/lib/data";
import { formatFCFA } from "@/lib/data";

// WhatsApp brand icon (since lucide doesn't ship one consistently styled)
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

const COUNTRIES = [
  "Sénégal", "Côte d'Ivoire", "Mali", "Burkina Faso", "Guinée", "Bénin", "Togo",
  "Cameroun", "Gabon", "Congo", "Niger", "Tchad", "France", "Maroc", "Algérie",
  "Tunisie", "Mauritanie", "Autre",
];

const WHATSAPP_NUMBER = "221770000000"; // change as needed

const schema = z.object({
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  country: z.string().trim().min(1),
  phone: z.string().trim().min(6).max(25).regex(/^[+\d\s().-]+$/),
  email: z.string().trim().email().max(120),
});

interface Props {
  product: Product;
}

export default function ProductInquiryForm({ product }: Props) {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ firstName: "", lastName: "", country: "Sénégal", phone: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    const productName = lang === "fr" ? product.name : (product.nameEn ?? product.name);
    const intro = lang === "fr" ? "Bonjour ETCG ! Je souhaite commander :" : "Hello ETCG! I would like to order:";
    const labels = lang === "fr"
      ? { p: "Produit", r: "Réf.", pr: "Prix", n: "Nom", pn: "Prénom", c: "Pays", t: "Téléphone", e: "Email" }
      : { p: "Product", r: "Ref.", pr: "Price", n: "Last name", pn: "First name", c: "Country", t: "Phone", e: "Email" };

    const msg =
`${intro}

• ${labels.p} : ${productName}
• ${labels.r} : ${product.id}
• ${labels.pr} : ${formatFCFA(product.price)}

— ${labels.pn} : ${parsed.data.firstName}
— ${labels.n} : ${parsed.data.lastName}
— ${labels.c} : ${parsed.data.country}
— ${labels.t} : ${parsed.data.phone}
— ${labels.e} : ${parsed.data.email}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const labels = lang === "fr"
    ? { title: "Commander ce produit", sub: "Remplissez vos coordonnées — nous vous contactons sur WhatsApp.", first: "Prénom", last: "Nom", country: "Pays", phone: "Numéro de téléphone", email: "Email", send: "Envoyer sur WhatsApp" }
    : { title: "Order this product", sub: "Fill your details — we'll reach out on WhatsApp.", first: "First name", last: "Last name", country: "Country", phone: "Phone number", email: "Email", send: "Send on WhatsApp" };

  const inputCls = "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-sm"
    >
      <h3 className="text-base font-semibold text-foreground">{labels.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{labels.sub}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <input className={inputCls} placeholder={labels.first} value={form.firstName} onChange={update("firstName")} />
          {errors.firstName && <p className="mt-1 text-xs text-destructive">{errors.firstName}</p>}
        </div>
        <div>
          <input className={inputCls} placeholder={labels.last} value={form.lastName} onChange={update("lastName")} />
          {errors.lastName && <p className="mt-1 text-xs text-destructive">{errors.lastName}</p>}
        </div>
        <div>
          <select className={inputCls} value={form.country} onChange={update("country")}>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <input className={inputCls} placeholder={labels.phone} value={form.phone} onChange={update("phone")} inputMode="tel" />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div className="sm:col-span-2">
          <input className={inputCls} placeholder={labels.email} value={form.email} onChange={update("email")} type="email" />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-shadow hover:shadow-xl"
      >
        <WhatsAppIcon className="h-5 w-5" />
        {labels.send}
      </motion.button>

      <p className="mt-3 text-center text-[11px] text-muted-foreground">{t("prod.inStock") /* keeps i18n usage */ ? "" : ""}🔒 {lang === "fr" ? "Vos informations restent confidentielles." : "Your information stays confidential."}</p>
    </motion.form>
  );
}
