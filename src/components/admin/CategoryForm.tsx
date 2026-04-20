import { useState } from "react";
import type { Category } from "@/lib/data";
import ImagePicker from "./ImagePicker";

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
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!data.image) { alert("Veuillez ajouter une image."); return; }
        onSubmit(data);
      }}
      className="space-y-4"
    >
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

      <ImagePicker
        label="Image de la catégorie"
        value={data.image ?? ""}
        onChange={(url) => setData({ ...data, image: url })}
      />

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
