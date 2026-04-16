import { Search, SlidersHorizontal, X } from "lucide-react";
import { categories } from "@/lib/data";

interface FilterSidebarProps {
  category: string;
  setCategory: (v: string) => void;
  available: boolean;
  setAvailable: (v: boolean) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

interface SearchBarProps {
  search: string;
  setSearch: (v: string) => void;
  onOpenFilters: () => void;
}

export function SearchBar({ search, setSearch, onOpenFilters }: SearchBarProps) {
  return (
    <div className="mb-6 flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-xl border border-input bg-card py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <button onClick={onOpenFilters} className="rounded-xl border border-border bg-card px-4 text-muted-foreground lg:hidden">
        <SlidersHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}

export function FilterSidebar({ category, setCategory, available, setAvailable, open, setOpen }: FilterSidebarProps) {
  const filterContent = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Category</h3>
        <div className="space-y-2">
          <button
            onClick={() => setCategory("")}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${!category ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id === category ? "" : c.id)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${c.id === category ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
            >
              <span>{c.icon}</span> {c.name}
              <span className="ml-auto text-xs opacity-60">{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Availability</h3>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} className="rounded accent-primary" />
          Show available only
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Filters</h2>
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          </div>
          {filterContent}
        </div>
      </div>

      {/* Mobile filter sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-72 overflow-y-auto border-r border-border bg-background p-5">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Filters</h2>
              <button onClick={() => setOpen(false)} className="text-muted-foreground"><X className="h-5 w-5" /></button>
            </div>
            {filterContent}
          </div>
        </div>
      )}
    </>
  );
}
