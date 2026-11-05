"use client";

import { RecipeImage } from "@/components/recipe-image";
import { upload } from "@vercel/blob/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { prepareImage } from "@/lib/prepare-image";
import { recipePlaceholderImage, slugify, type AdminRecipe } from "@/lib/recipe";

type Category = { id: string; name: string };
type ListField = "ingredients" | "utensils" | "instructions";

export function RecipeForm({ recipe, categories }: { recipe?: AdminRecipe; categories: Category[] }) {
  const router = useRouter();
  const [title, setTitle] = useState(recipe?.title ?? "");
  const [categoryId, setCategoryId] = useState(recipe?.categoryId ?? categories[0]?.id ?? "");
  const [description, setDescription] = useState(recipe?.description ?? "");
  const [prep, setPrep] = useState(recipe?.prep ?? "");
  const [bake, setBake] = useState(recipe?.bake ?? "");
  const [servings, setServings] = useState(recipe?.servings ?? "");
  const [published, setPublished] = useState(recipe?.published ?? true);
  const [lists, setLists] = useState<Record<ListField, string[]>>({
    ingredients: recipe?.ingredients.length ? recipe.ingredients : [""],
    utensils: recipe?.utensils.length ? recipe.utensils : [""],
    instructions: recipe?.instructions.length ? recipe.instructions : [""],
  });
  const [image, setImage] = useState<string | null>(recipe?.image ?? null);
  const [photo, setPhoto] = useState<{ file: File; preview: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState("");
  const [error, setError] = useState("");

  const preview = photo?.preview;
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function change<T>(setter: (value: T) => void) {
    return (value: T) => { setter(value); setDirty(true); };
  }

  function updateList(field: ListField, update: (items: string[]) => string[]) {
    setLists((current) => ({ ...current, [field]: update(current[field]) }));
    setDirty(true);
  }

  async function choosePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError("");
    try {
      const prepared = await prepareImage(file);
      setPhoto({ file: prepared, preview: URL.createObjectURL(prepared) });
      setDirty(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Cette photo ne peut pas être lue.");
    }
  }

  function removePhoto() {
    setPhoto(null);
    setImage(null);
    setDirty(true);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      let imageUrl = image;
      if (photo) {
        setSaving("Envoi de la photo...");
        const blob = await upload(`recettes/${slugify(title) || "recette"}.jpg`, photo.file, { access: "public", handleUploadUrl: "/api/upload", contentType: photo.file.type });
        imageUrl = blob.url;
        // En cas d'échec à l'étape suivante, la photo déjà envoyée n'est pas renvoyée.
        setImage(imageUrl);
        setPhoto(null);
      }
      setSaving("Enregistrement...");
      const payload = {
        title, categoryId, description, prep, bake, servings, published, image: imageUrl,
        ingredients: lists.ingredients.map((item) => item.trim()).filter(Boolean),
        utensils: lists.utensils.map((item) => item.trim()).filter(Boolean),
        instructions: lists.instructions.map((item) => item.trim()).filter(Boolean),
      };
      const response = await fetch(recipe ? `/api/recipes/${recipe.slug}` : "/api/recipes", { method: recipe ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error ?? "Enregistrement impossible. Réessaie.");
        setSaving("");
        return;
      }
      setDirty(false);
      router.push(`/admin?ok=${recipe ? "updated" : "created"}`);
      router.refresh();
    } catch {
      setError("Enregistrement impossible. Vérifie ta connexion internet et réessaie.");
      setSaving("");
    }
  }

  const shownImage = photo?.preview ?? image;

  return <main className="site-shell !py-10 md:!py-12">
    <Link href="/admin" className="!text-sm !font-bold text-[var(--rose-dark)]">← Retour aux recettes</Link>
    <form onSubmit={save} className="mt-6 rounded-[28px] bg-white p-6 md:p-10">
      <p className="eyebrow">{recipe ? "Modifier la recette" : "Nouvelle recette"}</p>
      <h1 className="display mt-2 text-4xl font-semibold md:text-5xl">{recipe ? recipe.title : "Raconte-nous ta recette"}</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_.8fr]">
        <div className="space-y-5">
          <label className="block text-sm font-bold">Nom de la recette
            <input required maxLength={160} value={title} onChange={(event) => change(setTitle)(event.target.value)} placeholder="Ex. Tarte aux fraises" className="admin-input" />
          </label>
          <label className="block text-sm font-bold">Catégorie
            <select required value={categoryId} onChange={(event) => change(setCategoryId)(event.target.value)} className="admin-input">
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
          </label>
          <label className="block text-sm font-bold">Description
            <textarea maxLength={2000} value={description} onChange={(event) => change(setDescription)(event.target.value)} rows={3} className="admin-input" />
          </label>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="text-sm font-bold">Préparation
              <input required maxLength={120} value={prep} onChange={(event) => change(setPrep)(event.target.value)} placeholder="20 min" className="admin-input" />
            </label>
            <label className="text-sm font-bold">Cuisson
              <input maxLength={120} value={bake} onChange={(event) => change(setBake)(event.target.value)} placeholder="30 min" className="admin-input" />
            </label>
            <label className="text-sm font-bold">Quantité
              <input required maxLength={120} value={servings} onChange={(event) => change(setServings)(event.target.value)} placeholder="6 parts" className="admin-input" />
            </label>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold">Photo</p>
          <RecipeImage src={shownImage ?? recipePlaceholderImage} alt="Aperçu de la recette" className="mx-auto mt-2 aspect-[3/4] w-full max-w-[280px] rounded-2xl border border-[var(--line)]" />
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <label className="cursor-pointer rounded-full border border-[var(--line)] px-4 py-2 text-sm font-bold focus-within:border-[var(--rose)]">
              {shownImage ? "Changer la photo" : "Ajouter une photo"}
              <input type="file" accept="image/*" onChange={choosePhoto} className="sr-only" />
            </label>
            {shownImage && <button type="button" onClick={removePhoto} className="!text-sm !font-bold text-[var(--rose-dark)]">Retirer la photo</button>}
          </div>
          <p className="mt-2 text-xs text-[var(--ink-soft)]">Depuis ton téléphone ou ton ordinateur. La photo est allégée automatiquement.</p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <ListEditor title="Ingrédients" field="ingredients" items={lists.ingredients} update={updateList} placeholder="Ex. 200 g de farine" hint="Pour un groupe, écris par exemple « Glaçage: 100 g de sucre »." />
        <ListEditor title="Ustensiles" field="utensils" items={lists.utensils} update={updateList} placeholder="Ex. Moule à tarte" />
        <ListEditor title="Étapes" field="instructions" items={lists.instructions} update={updateList} placeholder="Décris cette étape..." multiline />
      </div>

      <label className="mt-10 flex cursor-pointer items-start gap-3 rounded-2xl bg-[#ffe3e3] p-4 text-sm">
        <input type="checkbox" checked={published} onChange={(event) => change(setPublished)(event.target.checked)} className="mt-1 h-4 w-4 accent-[var(--rose-dark)]" />
        <span><strong>Publier sur le site</strong><span className="mt-1 block text-[var(--ink-soft)]">Décoché, la recette reste un brouillon visible uniquement ici.</span></span>
      </label>

      {error && <p role="alert" className="mt-6 rounded-xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-800">{error}</p>}
      <div className="mt-8 flex flex-wrap justify-end gap-3">
        <Link href="/admin" onClick={(event) => { if (dirty && !window.confirm("Quitter sans enregistrer tes modifications ?")) event.preventDefault(); }} className="rounded-full border border-[var(--line)] px-5 py-3 !text-sm !font-bold">Annuler</Link>
        <button disabled={!!saving} className="rounded-full bg-[var(--rose-dark)] px-6 py-3 !text-sm !font-bold !text-white hover:bg-[var(--foreground)] disabled:opacity-60">{saving || "Enregistrer la recette"}</button>
      </div>
    </form>
  </main>;
}

function ListEditor({ title, field, items, update, placeholder, hint, multiline = false }: { title: string; field: ListField; items: string[]; update: (field: ListField, change: (items: string[]) => string[]) => void; placeholder: string; hint?: string; multiline?: boolean }) {
  const setItem = (index: number, value: string) => update(field, (current) => current.map((item, position) => position === index ? value : item));
  const move = (index: number, offset: number) => update(field, (current) => {
    const next = [...current];
    [next[index], next[index + offset]] = [next[index + offset], next[index]];
    return next;
  });

  return <div>
    <h2 className="display text-2xl font-semibold">{title}</h2>
    {hint && <p className="mt-1 text-xs text-[var(--ink-soft)]">{hint}</p>}
    <div className="mt-3 space-y-3">
      {items.map((item, index) => <div key={index} className="flex items-start gap-1">
        <div className="min-w-0 flex-1">
          <textarea value={item} onChange={(event) => setItem(index, event.target.value)} onKeyDown={(event) => { if (!multiline && event.key === "Enter") event.preventDefault(); }} aria-label={`${title} ${index + 1}`} placeholder={multiline ? `${index + 1}. ${placeholder}` : placeholder} rows={multiline ? 3 : 2} className="admin-input !mt-0" />
        </div>
        <div className="flex flex-none items-center">
          <button type="button" disabled={index === 0} onClick={() => move(index, -1)} aria-label={`Monter ${title} ${index + 1}`} className="h-9 w-7 text-[var(--ink-soft)] disabled:opacity-30">↑</button>
          <button type="button" disabled={index === items.length - 1} onClick={() => move(index, 1)} aria-label={`Descendre ${title} ${index + 1}`} className="h-9 w-7 text-[var(--ink-soft)] disabled:opacity-30">↓</button>
          <button type="button" onClick={() => update(field, (current) => current.filter((_, position) => position !== index))} aria-label={`Supprimer ${title} ${index + 1}`} className="h-9 w-7 !text-lg text-[var(--rose-dark)]">×</button>
        </div>
      </div>)}
    </div>
    <button type="button" onClick={() => update(field, (current) => [...current, ""])} className="mt-3 !text-sm !font-bold text-[var(--rose-dark)]">+ Ajouter</button>
  </div>;
}
