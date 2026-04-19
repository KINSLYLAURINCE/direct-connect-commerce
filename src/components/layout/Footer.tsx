import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <footer className="border-t border-border bg-card pb-24 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-blue">
                <span className="text-sm font-bold text-white">DR</span>
              </div>
              <span className="text-lg font-bold text-foreground">DreamRest</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t("footer.tagline")}</p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@dreamrest.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+221 77 000 00 00</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Dakar, Sénégal</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">{t("footer.mattresses")}</h3>
            <ul className="mt-4 space-y-3">
              {["Mémoire de forme", "Ressorts ensachés", "Latex naturel", "Hybride premium"].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="text-sm text-muted-foreground transition-colors hover:text-primary">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">{t("footer.company")}</h3>
            <ul className="mt-4 space-y-3">
              {[
                { label: t("nav.about"), to: "/about" as const },
                { label: t("nav.contact"), to: "/contact" as const },
                { label: t("footer.careers"), to: "/about" as const },
                { label: t("footer.blog"), to: "/about" as const },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">{t("footer.newsletter")}</h3>
            <p className="mt-4 text-sm text-muted-foreground">{t("footer.newsletterDesc")}</p>
            <form onSubmit={handleSubscribe} className="mt-4">
              {subscribed ? (
                <p className="text-sm font-medium text-success">{t("footer.subscribed")}</p>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                  <button type="submit" className="rounded-lg bg-gradient-blue px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105">
                    OK
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © 2026 DreamRest. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
