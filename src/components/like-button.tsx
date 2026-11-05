"use client";

import { useState } from "react";

export function LikeButton({ slug, initialLikes }: { slug: string; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [busy, setBusy] = useState(false);
  async function like() {
    if (busy) return;
    setBusy(true);
    const response = await fetch(`/api/recipes/${slug}/like`, { method: "POST" });
    if (response.ok) setLikes((await response.json()).likes);
    setBusy(false);
  }
  return <button type="button" onClick={like} disabled={busy} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-bold text-[var(--rose-dark)] disabled:opacity-60" aria-label="J'aime cette recette">♡ {likes} j'aime{likes > 1 ? "s" : ""}</button>;
}
