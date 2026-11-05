import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sweetly - Espace créateur",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#ffe3e3]">{children}</div>;
}
