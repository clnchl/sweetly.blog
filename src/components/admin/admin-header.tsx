"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    router.push("/admin");
    router.refresh();
    setBusy(false);
  }

  const linkClass = (active: boolean) => `!text-sm !font-semibold hover:!text-white ${active ? "underline underline-offset-4" : ""}`;

  return <header className="border-b border-[var(--line)] bg-[var(--header)]">
    <div className="site-shell flex min-h-[76px] flex-wrap items-center justify-between gap-x-6 gap-y-2 !py-3">
      <Link href="/admin" className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo_sweetly.png" alt="" className="h-11 w-11 rounded-full object-cover" />
        <span className="display text-2xl font-semibold tracking-tight">Sweetly</span>
      </Link>
      <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <Link href="/admin" className={linkClass(pathname === "/admin" || pathname.startsWith("/admin/recettes"))}>Recettes</Link>
        <Link href="/admin/categories" className={linkClass(pathname === "/admin/categories")}>Catégories</Link>
        <Link href="/" className={linkClass(false)}>Voir le site</Link>
        <button type="button" onClick={logout} disabled={busy} className="!text-sm !font-bold hover:!text-white disabled:opacity-60">Déconnexion</button>
      </nav>
    </div>
  </header>;
}
