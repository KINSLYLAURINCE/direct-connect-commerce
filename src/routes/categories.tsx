import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { categories } from "@/lib/data";
import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — NexScale" },
      { name: "description", content: "Browse NexScale product categories." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Categories</h1>
        <p className="mt-2 text-muted-foreground">Browse our enterprise solution categories</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to="/shop" className="card-hover group block rounded-2xl border border-border bg-card p-8 text-center">
                <span className="text-5xl">{cat.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{cat.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cat.count} products</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
