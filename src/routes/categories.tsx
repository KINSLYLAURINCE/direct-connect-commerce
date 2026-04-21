import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Footer from "@/components/layout/Footer";
import { useLang } from "@/lib/i18n";
import { api, type Category } from "@/lib/api";

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await api.getCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath: string | null): string => {
    if (!imagePath) return 'https://via.placeholder.com/400x300?text=No+Image';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  if (loading) {
    return (
      <>
        <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{t("cat.title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("cat.subtitle")}</p>
          <div className="mt-12 flex h-64 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-muted-foreground">Chargement des catégories...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{t("cat.title")}</h1>
          <div className="mt-12 flex h-64 items-center justify-center">
            <div className="text-center text-destructive">
              <p>Erreur lors du chargement des catégories</p>
              <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (categories.length === 0) {
    return (
      <>
        <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{t("cat.title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("cat.subtitle")}</p>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">Aucune catégorie disponible pour le moment.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{t("cat.title")}</h1>
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
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img 
                    src={getImageUrl(cat.image)} 
                    alt={cat.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-foreground">{cat.name}</h3>
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