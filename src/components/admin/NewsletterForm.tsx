import { useState } from "react";

interface NewsletterFormProps {
  onSubmit: (data: { subject: string; content: string }) => void;
  onCancel: () => void;
}

export default function NewsletterForm({ onSubmit, onCancel }: NewsletterFormProps) {
  const [data, setData] = useState({ subject: "", content: "" });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(data); }} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Sujet</label>
        <input
          required
          value={data.subject}
          onChange={(e) => setData({ ...data, subject: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Ex: Nouvelle collection printemps"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Contenu</label>
        <textarea
          required
          rows={6}
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Votre message..."
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent">
          Annuler
        </button>
        <button type="submit" className="flex-1 rounded-lg bg-gradient-blue px-4 py-2.5 text-sm font-semibold text-white shadow-md">
          Envoyer
        </button>
      </div>
    </form>
  );
}
