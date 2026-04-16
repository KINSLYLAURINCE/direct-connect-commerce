import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { categories } from "@/lib/data";

export default function CategoryCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Browse by Category</h2>
          <p className="mt-2 text-muted-foreground">Find the perfect solution for your needs</p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <Link to="/shop" className="card-hover group flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl transition-transform group-hover:scale-110">
                  {cat.icon}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count} products</p>
                </div>
                <span className="text-muted-foreground transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
