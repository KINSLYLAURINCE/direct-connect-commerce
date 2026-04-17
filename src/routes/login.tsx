import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, User } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Connexion — DreamRest" },
      { name: "description", content: "Connectez-vous à votre compte DreamRest." },
    ],
  }),
  component: LoginPage,
});

const ADMIN_EMAIL = "admin@demo.com";
const ADMIN_PASSWORD = "admin123";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      if (typeof window !== "undefined") localStorage.setItem("dr_role", "admin");
      navigate({ to: "/admin" });
    } else if (email && password) {
      if (typeof window !== "undefined") localStorage.setItem("dr_role", "client");
      navigate({ to: "/dashboard" });
    } else {
      setError("Veuillez remplir tous les champs");
    }
  };

  const useDemoAdmin = () => {
    setEmail(ADMIN_EMAIL);
    setPassword(ADMIN_PASSWORD);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-16 pb-24 md:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-blue shadow-lg shadow-primary/30">
            <span className="text-lg font-bold text-white">DR</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">Bienvenue</h1>
          <p className="mt-1 text-sm text-muted-foreground">Connectez-vous à votre compte DreamRest</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-8 shadow-lg">
          {error && (
            <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="vous@email.fr"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-blue py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
          >
            <User className="h-4 w-4" /> Se connecter
          </button>

          <button
            type="button"
            onClick={useDemoAdmin}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            <Shield className="h-4 w-4" /> Utiliser les identifiants admin démo
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Démo admin : <code className="font-mono">admin@demo.com</code> / <code className="font-mono">admin123</code>
          </p>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Pas encore de compte ? <Link to="/register" className="font-medium text-primary hover:underline">Créer un compte client</Link>
        </p>
      </motion.div>
    </div>
  );
}
