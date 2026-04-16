import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { products, categories } from "@/lib/data";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const [search, setSearch] = useState("");
  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products Manager</h1>
          <p className="text-muted-foreground">{products.length} products total</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 font-medium text-muted-foreground">Product</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Category</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Price</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((product, i) => (
              <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div>
                      <div className="font-medium text-foreground">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground capitalize">{product.category}</td>
                <td className="px-4 py-3 font-medium text-foreground">${product.price}/mo</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${product.available ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                    {product.available ? "Active" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"><Edit className="h-4 w-4" /></button>
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
