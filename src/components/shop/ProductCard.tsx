import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/data";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6 }}
    >
      <Link to="/products/$productId" params={{ productId: product.id }}>
        <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {product.badge}
              </span>
            )}
            {!product.available && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/40">
                <span className="rounded-full bg-card px-4 py-1 text-sm font-semibold text-foreground">Coming Soon</span>
              </div>
            )}
          </div>
          <div className="p-5">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{product.category}</div>
            <h3 className="mt-1 font-semibold text-foreground">{product.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-primary">${product.price}/mo</span>
              <div className="flex gap-1">
                {product.features.slice(0, 2).map((f) => (
                  <span key={f} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{f}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
