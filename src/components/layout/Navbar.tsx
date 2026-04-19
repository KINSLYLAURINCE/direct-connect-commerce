import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Search, User, Globe } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { lang, setLang, t } = useLang();

  const navLinks = [
    { to: "/" as const, label: t("nav.home") },
    { to: "/shop" as const, label: t("nav.shop") },
    { to: "/categories" as const, label: t("nav.categories") },
    { to: "/about" as const, label: t("nav.about") },
    { to: "/contact" as const, label: t("nav.contact") },
  ];

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: query, category: "" } });
    setSearchOpen(false);
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-blue shadow-lg shadow-primary/30"
          >
            <span className="text-sm font-bold text-white">DR</span>
          </motion.div>
          <span className="text-lg font-bold text-foreground">DreamRest</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-primary bg-accent" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground hover:bg-accent" }}
              className="rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            aria-label="Search"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            aria-label="Language"
            className="flex items-center gap-1 rounded-lg p-2 text-xs font-semibold uppercase text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Globe className="h-4 w-4" /> {lang}
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Theme"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/login"
            className="hidden items-center gap-1.5 rounded-lg bg-gradient-blue px-4 py-2 text-sm font-medium text-white shadow-md shadow-primary/20 transition-transform hover:scale-105 md:inline-flex"
          >
            <User className="h-4 w-4" /> {t("nav.login")}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-muted-foreground md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.form
            onSubmit={submitSearch}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-border bg-background/95 px-4 py-3 backdrop-blur"
          >
            <div className="mx-auto flex max-w-3xl gap-2">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("nav.search.placeholder")}
                className="flex-1 rounded-lg border border-input bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button type="submit" className="rounded-lg bg-gradient-blue px-4 py-2 text-sm font-medium text-white">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

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
            className="mt-2 block rounded-lg bg-gradient-blue px-3 py-2.5 text-center text-sm font-medium text-white"
          >
            {t("nav.login")}
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
