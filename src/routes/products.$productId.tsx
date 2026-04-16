import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageCircle, Mail, ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/lib/data";
import { useState } from "react";
import Footer from "@/components/layout/Footer";

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const product = products.find((p) => p.id === params.productId);
    return {
      meta: [
        { title: product ? `${product.name} — NexScale` : "Product — NexScale" },
        { name: "description", content: product?.description || "" },
        { property: "og:title", content: product ? `${product.name} — NexScale` : "Product" },
        { property: "og:description", content: product?.description || "" },
      ],
    };
  },
  component: ProductDetailPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-primary">Back to shop</Link>
      </div>
    </div>
  ),
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const product = products.find((p) => p.id === productId);
  const [imgIdx, setImgIdx] = useState(0);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
          <Link to="/shop" className="mt-4 inline-block text-primary">Back to shop</Link>
        </div>
      </div>
    );
  }

  const images = [product.image, product.image, product.image];
  const userName = "Guest User";
  const userEmail = "guest@example.com";
  const timestamp = new Date().toISOString();

  const whatsappMsg = encodeURIComponent(
    `Hello NexScale!\n\nI'm interested in:\n- Product: ${product.name}\n- Product ID: ${product.id}\n- Name: ${userName}\n- Email: ${userEmail}\n- Timestamp: ${timestamp}`
  );

  const emailBody = encodeURIComponent(
    `Product Inquiry\n\nProduct: ${product.name}\nProduct ID: ${product.id}\nClient Name: ${userName}\nClient Email: ${userEmail}\nTimestamp: ${timestamp}`
  );

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <Link to="/shop" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative overflow-hidden rounded-2xl">
              <motion.img
                key={imgIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={images[imgIdx]}
                alt={product.name}
                className="aspect-[4/3] w-full object-cover"
              />
              <button onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)} className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-card/80 p-2 shadow backdrop-blur">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => setImgIdx((i) => (i + 1) % images.length)} className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-card/80 p-2 shadow backdrop-blur">
                <ChevronRight className="h-4 w-4" />
              </button>
              {product.badge && (
                <span className="absolute top-4 left-4 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
                  {product.badge}
                </span>
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

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{product.category}</div>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">{product.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-6 text-3xl font-bold text-primary">${product.price}<span className="text-base font-normal text-muted-foreground">/mo</span></div>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${product.available ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                {product.available ? "Available" : "Coming Soon"}
              </span>
            </div>

            {/* Features */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground">Key Features</h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" /> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground">Technical Specifications</h3>
              <div className="mt-3 divide-y divide-border rounded-xl border border-border">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between px-4 py-3 text-sm">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium text-foreground">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/15550001234?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-success py-3 text-sm font-semibold text-success-foreground shadow-lg transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-5 w-5" /> Contact via WhatsApp
              </a>
              <a
                href={`mailto:contact@nexscale.io?subject=Inquiry: ${product.name}&body=${emailBody}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02]"
              >
                <Mail className="h-5 w-5" /> Contact via Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
