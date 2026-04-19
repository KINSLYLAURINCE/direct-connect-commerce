import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/data";
import { formatFCFA } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const { lang } = useLang();
  const name = lang === "fr" ? product.name : (product.nameEn ?? product.name);
  const description = lang === "fr" ? product.description : (product.descriptionEn ?? product.description);
  const features = lang === "fr" ? product.features : (product.featuresEn ?? product.features);
  const badge = product.badge ? (lang === "fr" ? product.badge : (product.badgeEn ?? product.badge)) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.6), duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <Link to="/products/$productId" params={{ productId: product.id }}>
        <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={product.image}
              alt={name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {badge && (
              <span className="absolute top-3 left-3 rounded-full bg-gradient-blue px-3 py-1 text-xs font-semibold text-white shadow-lg">
                {badge}
              </span>
            )}
            {!product.available && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
                <span className="rounded-full bg-card px-4 py-1 text-sm font-semibold text-foreground">
                  {lang === "fr" ? "Bientôt" : "Soon"}
                </span>
              </div>
            )}
          </div>
          <div className="p-5">
            <div className="text-xs font-medium uppercase tracking-wider text-primary">{product.category}</div>
            <h3 className="mt-1 font-semibold text-foreground">{name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{description}</p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="text-base font-bold text-primary">{formatFCFA(product.price)}</span>
              <div className="flex gap-1">
                {features.slice(0, 1).map((f) => (
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
