import { useState } from "react";
import type { Category } from "@/lib/data";

interface CategoryFormProps {
  initial?: Partial<Category>;
  onSubmit: (data: Partial<Category>) => void;
  onCancel: () => void;
}

export default function CategoryForm({ initial, onSubmit, onCancel }: CategoryFormProps) {
  const [data, setData] = useState<Partial<Category>>({
    name: initial?.name ?? "",
    nameEn: initial?.nameEn ?? "",
    image: initial?.image ?? "",
    count: initial?.count ?? 0,
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(data); }} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Nom de la catégorie (FR)</label>
        <input
          required
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Ex: Mémoire de Forme"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Nom (EN)</label>
        <input
          value={data.nameEn}
          onChange={(e) => setData({ ...data, nameEn: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Ex: Memory Foam"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">URL de l'image</label>
        <input
          required
          value={data.image}
          onChange={(e) => setData({ ...data, image: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="https://images.unsplash.com/..."
        />
        {data.image && (
          <img src={data.image} alt="" className="mt-2 h-24 w-full rounded-lg object-cover" />
        )}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Nombre de produits</label>
        <input
          type="number"
          value={data.count}
          onChange={(e) => setData({ ...data, count: Number(e.target.value) })}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent">
          Annuler
        </button>
        <button type="submit" className="flex-1 rounded-lg bg-gradient-blue px-4 py-2.5 text-sm font-semibold text-white shadow-md">
          {initial?.name ? "Modifier" : "Ajouter"}
        </button>
      </div>
    </form>
  );
}
