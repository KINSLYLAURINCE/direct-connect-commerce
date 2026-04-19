import { useState } from "react";
import { categories, type Product } from "@/lib/data";

interface ProductFormProps {
  initial?: Partial<Product>;
  onSubmit: (data: Partial<Product>) => void;
  onCancel: () => void;
}

export default function ProductForm({ initial, onSubmit, onCancel }: ProductFormProps) {
  const [data, setData] = useState<Partial<Product>>({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    price: initial?.price ?? 0,
    category: initial?.category ?? categories[0]?.id ?? "",
    image: initial?.image ?? "",
    badge: initial?.badge ?? "",
    available: initial?.available ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Nom du matelas</label>
        <input
          required
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Ex: CloudRest Mémoire 24cm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
        <textarea
          required
          rows={3}
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Description du matelas..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Prix (FCFA)</label>
          <input
            type="number"
            required
            value={data.price}
            onChange={(e) => setData({ ...data, price: Number(e.target.value) })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Catégorie</label>
          <select
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">URL de l'image</label>
        <input
          value={data.image}
          onChange={(e) => setData({ ...data, image: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Badge (optionnel)</label>
        <input
          value={data.badge}
          onChange={(e) => setData({ ...data, badge: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Ex: Best-Seller, Nouveau..."
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          checked={data.available}
          onChange={(e) => setData({ ...data, available: e.target.checked })}
          className="rounded accent-primary"
        />
        Disponible à la vente
      </label>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent">
          Annuler
        </button>
        <button type="submit" className="flex-1 rounded-lg bg-gradient-blue px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-[1.02] transition-transform">
          {initial?.name ? "Modifier" : "Ajouter"}
        </button>
      </div>
    </form>
  );
}
