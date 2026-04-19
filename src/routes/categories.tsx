import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/lib/data";
import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Catégories — DreamRest" },
      { name: "description", content: "Toutes les catégories de matelas DreamRest." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { lang, t } = useLang();
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{lang === "fr" ? "Catégories" : "Categories"}</h1>
        <p className="mt-2 text-muted-foreground">{t("cat.subtitle")}</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -10 }}
            >
              <Link to="/shop" search={{ category: cat.id }} className="card-hover group block overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-foreground">{lang === "fr" ? cat.name : cat.nameEn}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{cat.count} {t("cat.models")}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
