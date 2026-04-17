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
    icon: initial?.icon ?? "🛏️",
    count: initial?.count ?? 0,
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(data); }} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Nom de la catégorie</label>
        <input
          required
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Ex: Mémoire de Forme"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Icône (emoji)</label>
        <input
          value={data.icon}
          onChange={(e) => setData({ ...data, icon: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="🛏️"
        />
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
