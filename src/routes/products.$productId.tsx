import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { products, formatFCFA } from "@/lib/data";
import { useState } from "react";
import Footer from "@/components/layout/Footer";
import ProductInquiryForm from "@/components/shop/ProductInquiryForm";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const product = products.find((p) => p.id === params.productId);
    return {
      meta: [
        { title: product ? `${product.name} — DreamRest` : "Matelas — DreamRest" },
        { name: "description", content: product?.description || "" },
        { property: "og:title", content: product ? `${product.name} — DreamRest` : "Matelas" },
        { property: "og:description", content: product?.description || "" },
        ...(product ? [{ property: "og:image", content: product.image }] : []),
      ],
    };
  },
  component: ProductDetailPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Matelas introuvable</h1>
        <Link to="/shop" className="mt-4 inline-block text-primary">Retour</Link>
      </div>
    </div>
  ),
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const { t, lang } = useLang();
  const product = products.find((p) => p.id === productId);
  const [imgIdx, setImgIdx] = useState(0);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">{t("prod.notFound")}</h1>
          <Link to="/shop" className="mt-4 inline-block text-primary">{t("prod.back")}</Link>
        </div>
      </div>
    );
  }

  const name = lang === "fr" ? product.name : (product.nameEn ?? product.name);
  const description = lang === "fr" ? product.description : (product.descriptionEn ?? product.description);
  const features = lang === "fr" ? product.features : (product.featuresEn ?? product.features);
  const badge = product.badge ? (lang === "fr" ? product.badge : (product.badgeEn ?? product.badge)) : null;
  const priceLabel = formatFCFA(product.price);

  const images = [product.image, product.image, product.image];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <Link to="/shop" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {t("prod.back")}
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <motion.img
                key={imgIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={images[imgIdx]}
                alt={name}
                className="aspect-[4/3] w-full object-cover"
              />
              <button onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)} className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-card/80 p-2 shadow backdrop-blur">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => setImgIdx((i) => (i + 1) % images.length)} className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-card/80 p-2 shadow backdrop-blur">
                <ChevronRight className="h-4 w-4" />
              </button>
              {badge && (
                <span className="absolute top-4 left-4 rounded-full bg-gradient-blue px-4 py-1.5 text-sm font-semibold text-white shadow-lg">{badge}</span>
              )}
            </div>
            <div className="mt-4 flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`overflow-hidden rounded-lg border-2 transition-colors ${i === imgIdx ? "border-primary" : "border-border"}`}
                >
                  <img src={img} alt="" className="h-16 w-20 object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="text-xs font-medium uppercase tracking-wider text-primary">{product.category}</div>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">{name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>

            <div className="mt-6 text-4xl font-bold text-gradient">{priceLabel}</div>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${product.available ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                {product.available ? t("prod.inStock") : t("prod.soon")}
              </span>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground">{t("prod.features")}</h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" /> {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground">{t("prod.specs")}</h3>
              <div className="mt-3 divide-y divide-border rounded-xl border border-border">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between px-4 py-3 text-sm">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium text-foreground">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <ProductInquiryForm product={product} />
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
