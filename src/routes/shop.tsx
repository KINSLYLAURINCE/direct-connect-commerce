import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { products } from "@/lib/data";
import ProductCard from "@/components/shop/ProductCard";
import { SearchBar, FilterSidebar } from "@/components/shop/ShopFilters";
import Footer from "@/components/layout/Footer";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — NexScale Enterprise Solutions" },
      { name: "description", content: "Browse enterprise cloud, security, DevOps and AI solutions." },
      { property: "og:title", content: "Shop — NexScale Enterprise Solutions" },
      { property: "og:description", content: "Browse enterprise cloud, security, DevOps and AI solutions." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [available, setAvailable] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (category && p.category !== category) return false;
      if (available && !p.available) return false;
      return true;
    });
  }, [search, category, available]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Our Solutions</h1>
          <p className="mt-2 text-muted-foreground">Enterprise-grade products for every need</p>
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
              <div className="py-20 text-center text-muted-foreground">No products found matching your criteria.</div>
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
