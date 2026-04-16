import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — NexScale" },
      { name: "description", content: "Create your NexScale account to get started." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-16">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <span className="text-lg font-bold text-primary-foreground">NS</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Join NexScale to explore enterprise solutions</p>
        </div>

        <form className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-8">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
            <input type="text" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="John Doe" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
            <input type="email" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@company.com" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Phone Number</label>
            <input type="tel" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+1 (555) 000-0000" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
            <input type="password" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
