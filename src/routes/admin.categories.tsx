import { createFileRoute } from "@tanstack/react-router";
import { categories as initialCategories, type Category } from "@/lib/data";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import AdminModal from "@/components/admin/AdminModal";
import CategoryForm from "@/components/admin/CategoryForm";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const handleSubmit = (data: Partial<Category>) => {
    if (editing) {
      setCategories(categories.map((c) => c.id === editing.id ? { ...c, ...data } : c));
    } else {
      setCategories([...categories, { id: `cat-${Date.now()}`, ...data } as Category]);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Catégories</h1>
          <p className="text-muted-foreground">{categories.length} catégories</p>
        </div>
        <button
          onClick={() => { setEditing(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-blue px-4 py-2.5 text-sm font-medium text-white shadow-md hover:scale-105 transition-transform"
        >
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <img src={cat.image} alt={cat.name} className="h-12 w-12 rounded-lg object-cover" />
              <div>
                <div className="font-medium text-foreground">{cat.name}</div>
                <div className="text-sm text-muted-foreground">{cat.count} matelas</div>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => { setEditing(cat); setModalOpen(true); }} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent"><Edit className="h-4 w-4" /></button>
              <button onClick={() => confirm("Supprimer ?") && setCategories(categories.filter((c) => c.id !== cat.id))} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          </motion.div>
        ))}
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Modifier la catégorie" : "Ajouter une catégorie"}>
        <CategoryForm initial={editing ?? undefined} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} />
      </AdminModal>
    </div>
  );
}
