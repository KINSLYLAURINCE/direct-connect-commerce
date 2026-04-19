import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { categories } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function CategoryCards() {
  const { t, lang } = useLang();
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{t("cat.title")}</h2>
          <p className="mt-2 text-muted-foreground">{t("cat.subtitle")}</p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link to="/shop" search={{ category: cat.id }} className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
                <div className="relative aspect-[5/3] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={lang === "fr" ? cat.name : cat.nameEn}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-lg font-semibold text-white">{lang === "fr" ? cat.name : cat.nameEn}</h3>
                    <p className="text-sm text-white/80">{cat.count} {t("cat.models")}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
