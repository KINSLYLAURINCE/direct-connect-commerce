import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Truck, RotateCcw, Shield, Check } from "lucide-react";
import { api, type Product } from "@/lib/api";
import { useLang } from "@/lib/i18n";
import ProductInquiryForm from "@/components/shop/ProductInquiryForm";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetailPage,
});

const formatFCFA = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    maximumFractionDigits: 0
  }).format(price);
};

// Descriptions statiques des produits
const staticFeatures = {
  fr: [
    "Mousse à mémoire de forme haute densité",
    "Tissu respirant anti-acariens",
    "Support lombaire renforcé",
    "Certifié Oeko-Tex Standard 100",
    "Garantie 10 ans"
  ],
  en: [
    "High-density memory foam",
    "Breathable anti-dust mite fabric",
    "Reinforced lumbar support",
    "Oeko-Tex Standard 100 certified",
    "10-year warranty"
  ]
};

const staticDescription = {
  fr: "Découvrez un confort exceptionnel avec ce matelas premium. Conçu avec des matériaux de haute qualité pour un sommeil réparateur nuit après nuit. La technologie avancée de soutien s'adapte parfaitement à votre morphologie.",
  en: "Experience exceptional comfort with this premium mattress. Designed with high-quality materials for restorative sleep night after night. Advanced support technology perfectly adapts to your body shape."
};

function ProductDetailPage() {
  const { productId } = useParams({ from: "/products/$productId" });
  const { t, lang } = useLang();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await api.getProduct(productId);
      setProduct(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const images = product
    ? [product.main_image, ...(product.sub_images || [])].filter(Boolean)
    : [];

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  const features = staticFeatures[lang as keyof typeof staticFeatures] || staticFeatures.fr;
  const fallbackDescription = staticDescription[lang as keyof typeof staticDescription] || staticDescription.fr;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-16">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-16">
        <h1 className="text-2xl font-bold text-foreground">Produit introuvable</h1>
        <p className="mt-2 text-muted-foreground">Ce produit n'existe pas ou a été supprimé.</p>
        <Link to="/shop" className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const name = product.name;
  const description = product.description || fallbackDescription;
  const originalPrice = product.sold_price && product.sold_price > product.price ? product.sold_price : null;
  const discount = originalPrice ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 0;

  const getImageUrl = (path: string) => {
    if (!path) return 'https://via.placeholder.com/600x600?text=No+Image';
    if (path.startsWith('http')) return path;
    return `http://localhost:5000${path}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Accueil</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-foreground">Boutique</Link>
        <span>/</span>
        <span className="text-foreground">{name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary/20">
            <img
              src={getImageUrl(images[activeImage])}
              alt={name}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x600?text=No+Image';
              }}
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md backdrop-blur-sm transition hover:bg-background"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md backdrop-blur-sm transition hover:bg-background"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            {product.tag && (
              <span className="absolute top-3 left-3 rounded-full bg-gradient-blue px-3 py-1 text-xs font-semibold text-white shadow-lg">
                {product.tag === 'best seller' 
                  ? (lang === "fr" ? "Meilleure vente" : "Best Seller")
                  : product.tag === 'new' 
                  ? (lang === "fr" ? "Nouveau" : "New")
                  : product.tag === 'sale'
                  ? (lang === "fr" ? "En solde" : "Sale")
                  : product.tag}
              </span>
            )}
            {discount > 0 && (
              <span className="absolute top-3 right-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                -{discount}%
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    i === activeImage ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={getImageUrl(img)}
                    alt={`${name} ${i + 1}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=No+Image';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <div className="text-sm font-medium text-primary">{product.category_name || 'Sans catégorie'}</div>
            <h1 className="mt-2 text-3xl font-bold text-foreground">{name}</h1>
            <p className="mt-3 text-muted-foreground">{description}</p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">{formatFCFA(product.price)}</span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">{formatFCFA(originalPrice)}</span>
            )}
          </div>

          <div className="space-y-3 border-y border-border py-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <Check className="h-5 w-5 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 border-b border-border pb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>Livraison gratuite</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              <span>Retours faciles</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Garantie 10 ans</span>
            </div>
          </div>

          <ProductInquiryForm product={product} />
        </motion.div>
      </div>
    </div>
  );
}