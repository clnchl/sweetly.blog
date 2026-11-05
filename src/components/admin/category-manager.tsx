"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

type Category = { id: string; name: string; recipeCount: number };

export function CategoryManager({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [newName, setNewName] = useState("");
  const [names, setNames] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function run(action: () => Promise<Response>, success: string, onSuccess?: () => void) {
    setError("");
    setMessage("");
    try {
      const response = await action();
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error ?? "L'opération a échoué. Réessaie.");
        return;
      }
      setMessage(success);
      onSuccess?.();
      startTransition(() => router.refresh());
    } catch {
      setError("Connexion impossible. Vérifie ta connexion internet.");
    }
  }

  function send(url: string, method: string, name: string) {
    return () => fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
  }

  function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void run(send("/api/categories", "POST", newName), `Catégorie « ${newName.trim()} » ajoutée.`, () => setNewName(""));
  }

  function rename(event: FormEvent<HTMLFormElement>, category: Category) {
    event.preventDefault();
    const name = names[category.id] ?? category.name;
    void run(send(`/api/categories/${category.id}`, "PATCH", name), `Catégorie renommée en « ${name.trim()} ».`);
  }

  function remove(category: Category) {
    if (!window.confirm(`Supprimer la catégorie « ${category.name} » ?`)) return;
    void run(() => fetch(`/api/categories/${category.id}`, { method: "DELETE" }), `Catégorie « ${category.name} » supprimée.`);
  }

  return <main className="site-shell !py-10 md:!py-12">
    <p className="eyebrow">Espace créateur</p>
    <h1 className="display mt-3 text-5xl font-semibold md:text-6xl">Les catégories</h1>
    <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--ink-soft)]">Elles servent de filtres sur le site, dans l&apos;ordre affiché ici. Une catégorie ne peut être supprimée que si elle ne contient plus de recette.</p>

    {message && <p role="status" className="mt-6 rounded-xl bg-green-100 px-4 py-3 text-sm font-semibold text-green-800">{message}</p>}
    {error && <p role="alert" className="mt-6 rounded-xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-800">{error}</p>}

    <section className="mt-8 rounded-[24px] bg-white p-5 md:p-6">
      <form onSubmit={add} className="flex flex-col gap-3 sm:flex-row">
        <input required maxLength={80} value={newName} onChange={(event) => setNewName(event.target.value)} aria-label="Nom de la nouvelle catégorie" placeholder="Nouvelle catégorie..." className="min-w-0 flex-1 rounded-full border border-[var(--line)] px-5 py-3 text-sm outline-none focus:border-[var(--rose)]" />
        <button disabled={pending} className="rounded-full bg-[var(--foreground)] px-5 py-3 !text-sm !font-bold !text-white hover:bg-[var(--rose-dark)] disabled:opacity-60">+ Ajouter</button>
      </form>

      <ul className="mt-5 divide-y divide-[var(--line)]">
        {categories.map((category) => {
          const name = names[category.id] ?? category.name;
          return <li key={category.id} className="py-4">
            <form onSubmit={(event) => rename(event, category)} className="flex flex-col gap-3 md:flex-row md:items-center">
              <input required maxLength={80} value={name} onChange={(event) => setNames((current) => ({ ...current, [category.id]: event.target.value }))} aria-label={`Nom de la catégorie ${category.name}`} className="admin-input !mt-0 min-w-0 md:flex-1" />
              <span className="flex-none text-sm text-[var(--ink-soft)]">{category.recipeCount} recette{category.recipeCount > 1 ? "s" : ""}</span>
              <div className="flex flex-none items-center gap-3">
                <button disabled={pending || name.trim() === category.name} className="rounded-full border border-[var(--line)] px-4 py-2 !text-sm !font-bold disabled:opacity-40">Renommer</button>
                <button type="button" disabled={pending || category.recipeCount > 0} onClick={() => remove(category)} className="!text-sm !font-bold text-[var(--rose-dark)] disabled:opacity-40">Supprimer</button>
              </div>
            </form>
          </li>;
        })}
      </ul>
    </section>
  </main>;
}
