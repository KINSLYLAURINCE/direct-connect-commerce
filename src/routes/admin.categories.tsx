import { createFileRoute } from "@tanstack/react-router";
import { categories } from "@/lib/data";
import { Plus, Edit, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

function AdminCategories() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categories Manager</h1>
          <p className="text-muted-foreground">{categories.length} categories</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <div className="font-medium text-foreground">{cat.name}</div>
                <div className="text-sm text-muted-foreground">{cat.count} products</div>
              </div>
            </div>
            <div className="flex gap-1">
              <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent"><Edit className="h-4 w-4" /></button>
              <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
