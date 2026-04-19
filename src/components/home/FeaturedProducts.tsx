import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { products, formatFCFA } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function FeaturedProducts() {
  const { t, lang } = useLang();
  const featured = products.filter((p) => p.badge);
  const loop = [...featured, ...featured, ...featured];

  return (
    <section className="overflow-hidden bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{t("feat.title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("feat.subtitle")}</p>
          </div>
          <Link to="/shop" className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:opacity-80 md:flex">
            {t("feat.viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {/* Infinite marquee carousel of featured products */}
      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-secondary to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-secondary to-transparent" />
        <div className="flex w-max gap-6 animate-marquee">
          {loop.map((product, i) => (
            <Link
              key={`${product.id}-${i}`}
              to="/products/$productId"
              params={{ productId: product.id }}
              className="block w-[300px] shrink-0"
            >
              <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={lang === "fr" ? product.name : (product.nameEn ?? product.name)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 rounded-full bg-gradient-blue px-3 py-1 text-xs font-semibold text-white shadow-lg">
                      {lang === "fr" ? product.badge : (product.badgeEn ?? product.badge)}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground">{lang === "fr" ? product.name : (product.nameEn ?? product.name)}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{lang === "fr" ? product.description : (product.descriptionEn ?? product.description)}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-base font-bold text-primary">{formatFCFA(product.price)}</span>
                    <span className="text-sm text-muted-foreground">{t("common.viewMore")}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
