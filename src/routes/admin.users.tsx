import { createFileRoute } from "@tanstack/react-router";
import { Edit, Ban, Eye } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 555-0101", joined: "2026-01-15", inquiries: 12, status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 555-0102", joined: "2026-02-20", inquiries: 8, status: "Active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "+1 555-0103", joined: "2026-03-05", inquiries: 15, status: "Active" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", phone: "+1 555-0104", joined: "2026-03-18", inquiries: 3, status: "Disabled" },
  { id: 5, name: "Alex Brown", email: "alex@example.com", phone: "+1 555-0105", joined: "2026-04-01", inquiries: 6, status: "Active" },
];

function AdminUsers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Users Manager</h1>
        <p className="text-muted-foreground">{users.length} registered users</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 font-medium text-muted-foreground">User</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Phone</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Joined</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Inquiries</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3">
                  <div className="font-medium text-foreground">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{user.phone}</td>
                <td className="px-4 py-3 text-muted-foreground">{user.joined}</td>
                <td className="px-4 py-3 text-foreground">{user.inquiries}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === "Active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent"><Eye className="h-4 w-4" /></button>
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent"><Edit className="h-4 w-4" /></button>
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Ban className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
