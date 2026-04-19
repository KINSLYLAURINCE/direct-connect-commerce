import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { products } from "@/lib/data";
import ProductCard from "@/components/shop/ProductCard";
import { SearchBar, FilterSidebar } from "@/components/shop/ShopFilters";
import Footer from "@/components/layout/Footer";
import { useLang } from "@/lib/i18n";

const shopSearchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/shop")({
  validateSearch: zodValidator(shopSearchSchema),
  head: () => ({
    meta: [
      { title: "Boutique — DreamRest Matelas Premium" },
      { name: "description", content: "Découvrez tous nos matelas : mémoire de forme, ressorts, latex, hybride, orthopédique." },
      { property: "og:title", content: "Boutique — DreamRest Matelas Premium" },
      { property: "og:description", content: "Tous nos matelas premium." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { t } = useLang();
  const { q, category: catParam } = Route.useSearch();
  const [search, setSearch] = useState(q);
  const [category, setCategory] = useState(catParam);
  const [available, setAvailable] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // Sync external search-param changes (e.g. from navbar) into local state.
  useEffect(() => { setSearch(q); }, [q]);
  useEffect(() => { setCategory(catParam); }, [catParam]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const haystack = `${p.name} ${p.nameEn ?? ""} ${p.description} ${p.descriptionEn ?? ""}`.toLowerCase();
      if (search && !haystack.includes(search.toLowerCase())) return false;
      if (category && p.category !== category) return false;
      if (available && !p.available) return false;
      return true;
    });
  }, [search, category, available]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{t("shop.title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("shop.subtitle")}</p>
        </div>

        <SearchBar search={search} setSearch={setSearch} onOpenFilters={() => setFilterOpen(true)} />

        <div className="flex gap-8">
          <FilterSidebar
            category={category} setCategory={setCategory}
            available={available} setAvailable={setAvailable}
            open={filterOpen} setOpen={setFilterOpen}
          />

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">{t("shop.empty")}</div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
