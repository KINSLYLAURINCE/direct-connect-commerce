import { useState } from "react";
import { categories, type Product } from "@/lib/data";
import ImagePicker from "./ImagePicker";
import MultiImagePicker from "./MultiImagePicker";

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
    salePrice: initial?.salePrice,
    category: initial?.category ?? categories[0]?.id ?? "",
    image: initial?.image ?? "",
    images: initial?.images ?? [],
    badge: initial?.badge ?? "",
    available: initial?.available ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.image) { alert("Veuillez ajouter une image principale."); return; }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Nom du produit</label>
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
          placeholder="Description du produit..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Prix (FCFA)</label>
          <input
            type="number"
            required
            min={0}
            value={data.price}
            onChange={(e) => setData({ ...data, price: Number(e.target.value) })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Prix de solde (FCFA) <span className="text-xs text-muted-foreground">(optionnel)</span>
          </label>
          <input
            type="number"
            min={0}
            value={data.salePrice ?? ""}
            onChange={(e) => setData({ ...data, salePrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Ex: 199000"
          />
        </div>
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

      <ImagePicker
        label="Image principale"
        value={data.image ?? ""}
        onChange={(url) => setData({ ...data, image: url })}
      />

      <MultiImagePicker
        label="Sous-images (galerie)"
        values={data.images ?? []}
        onChange={(urls) => setData({ ...data, images: urls })}
      />

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
