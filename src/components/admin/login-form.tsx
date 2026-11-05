"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error ?? "Connexion impossible pour le moment.");
        setBusy(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Connexion impossible. Vérifie ta connexion internet.");
      setBusy(false);
    }
  }

  return <main className="grid min-h-screen place-items-center px-6 py-10">
    <form onSubmit={handleLogin} className="w-full max-w-md rounded-[28px] border border-[var(--line)] bg-white p-8 soft-shadow">
      <Link href="/" className="eyebrow">Retour au site</Link>
      <h1 className="display mt-5 text-5xl font-semibold">Bonjour, créatrice.</h1>
      <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">Connecte-toi pour gérer tes recettes et préparer les prochaines fournées.</p>
      <label className="mt-8 block text-sm font-bold">Email
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="username" required className="admin-input" />
      </label>
      <label className="mt-5 block text-sm font-bold">Mot de passe
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" required className="admin-input" />
      </label>
      {error && <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{error}</p>}
      <button disabled={busy} className="mt-6 w-full rounded-full bg-[var(--foreground)] px-5 py-3.5 !text-sm !font-bold !text-white hover:bg-[var(--rose-dark)] disabled:opacity-60">{busy ? "Connexion..." : "Se connecter"}</button>
    </form>
  </main>;
}
