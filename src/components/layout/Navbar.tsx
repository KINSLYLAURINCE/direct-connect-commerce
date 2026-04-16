import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun, Search } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const navLinks = [
  { to: "/" as const, label: "Home" },
  { to: "/shop" as const, label: "Shop" },
  { to: "/about" as const, label: "About" },
  { to: "/contact" as const, label: "Contact" },
  { to: "/admin" as const, label: "Admin" },
];

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <span className="text-sm font-bold text-primary-foreground">NS</span>
          </div>
          <span className="text-lg font-bold text-foreground">NexScale</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-primary bg-accent" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground hover:bg-accent" }}
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/login"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 md:block"
          >
            Sign In
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-muted-foreground md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border bg-background px-4 pb-4 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
          >
            Sign In
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
