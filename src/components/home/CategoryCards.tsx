import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { categories } from "@/lib/data";

export default function CategoryCards() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Trouvez votre matelas idéal</h2>
          <p className="mt-2 text-muted-foreground">Explorez nos différentes gammes</p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link to="/shop" className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
                <motion.span
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-blue/10 text-3xl"
                >
                  {cat.icon}
                </motion.span>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count} modèles</p>
                </div>
                <span className="text-primary transition-transform group-hover:translate-x-2">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
