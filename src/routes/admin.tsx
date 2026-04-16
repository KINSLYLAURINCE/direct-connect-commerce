import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Package, Grid3X3, Users, MessageCircle, BarChart3, Mail, Settings, ChevronLeft, Menu } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — NexScale" },
      { name: "description", content: "NexScale admin dashboard." },
    ],
  }),
  component: AdminLayout,
});

const navItems = [
  { to: "/admin" as const, icon: LayoutDashboard, label: "Overview", exact: true },
  { to: "/admin/products" as const, icon: Package, label: "Products", exact: false },
  { to: "/admin/categories" as const, icon: Grid3X3, label: "Categories", exact: false },
  { to: "/admin/users" as const, icon: Users, label: "Users", exact: false },
  { to: "/admin/messages" as const, icon: MessageCircle, label: "Messages", exact: false },
  { to: "/admin/analytics" as const, icon: BarChart3, label: "Analytics", exact: false },
  { to: "/admin/newsletter" as const, icon: Mail, label: "Newsletter", exact: false },
  { to: "/admin/settings" as const, icon: Settings, label: "Settings", exact: false },
];

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && <span className="font-bold text-foreground">Admin Panel</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="hidden rounded-lg p-1.5 text-muted-foreground hover:bg-accent lg:block">
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="flex min-h-screen pt-16">
      {/* Desktop sidebar */}
      <aside className={`hidden border-r border-border bg-card transition-all lg:block ${collapsed ? "w-16" : "w-60"}`}>
        {sidebar}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute top-0 left-0 h-full w-60 bg-card pt-16">
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden">
        <div className="flex h-14 items-center gap-3 border-b border-border px-4 lg:hidden">
          <button onClick={() => setMobileOpen(true)} className="text-muted-foreground">
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-foreground">Admin Panel</span>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
