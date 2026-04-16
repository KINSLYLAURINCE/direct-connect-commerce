import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/lib/data";

export default function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const featured = products.filter((p) => p.badge);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % featured.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featured.length]);

  return (
    <section ref={ref} className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-end justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Featured Products</h2>
            <p className="mt-2 text-muted-foreground">Discover our most popular enterprise solutions</p>
          </div>
          <Link to="/shop" className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:opacity-80 md:flex">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Carousel */}
        <div className="relative mt-12">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${current * (100 / 3)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {featured.concat(featured).map((product, i) => (
                <motion.div
                  key={`${product.id}-${i}`}
                  className="w-full min-w-[calc(100%-1rem)] sm:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(33.333%-1rem)]"
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
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-foreground">{product.name}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">${product.price}/mo</span>
                          <span className="text-sm text-muted-foreground">Learn more →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button onClick={() => setCurrent((c) => (c - 1 + featured.length) % featured.length)} className="rounded-full border border-border bg-card p-2 text-foreground transition-colors hover:bg-accent">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-primary" : "w-2 bg-border"}`}
                />
              ))}
            </div>
            <button onClick={() => setCurrent((c) => (c + 1) % featured.length)} className="rounded-full border border-border bg-card p-2 text-foreground transition-colors hover:bg-accent">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
