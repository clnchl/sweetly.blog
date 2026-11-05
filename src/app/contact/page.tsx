import { SiteHeader } from "@/components/site-header";
import { FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa6";

export const metadata = { title: "Sweetly - Contact" };

const socials = [
    { name: "Instagram", handle: "@celxne_khh", href: "https://instagram.com/celxne_khh", icon: FaInstagram },
    { name: "LinkedIn", handle: "Céline C.", href: "https://www.linkedin.com/in/c%C3%A9line-c-78bb73266/", icon: FaLinkedinIn },
    { name: "TikTok", handle: "@celxne_kh", href: "https://tiktok.com/@celxne_kh", icon: FaTiktok },
    { name: "Instagram", handle: "@sweetly_cln", href: "https://instagram.com/sweetly_cln", icon: FaInstagram },
];

export default function ContactPage() {
    return <><SiteHeader /><main className="site-shell min-h-[calc(100vh-76px)] py-16 md:py-24"><div className="mx-auto max-w-3xl text-center"><p className="eyebrow">Mes réseaux</p><h1 className="display mt-4 text-6xl font-semibold text-[var(--rose)] md:text-7xl">Contactez-moi</h1><p className="mt-8 text-lg text-[var(--ink-soft)]">Vous pouvez me suivre via mes réseaux sociaux :</p></div><div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{socials.map((social) => { const Icon = social.icon; return <a key={social.handle} href={social.href} target="_blank" rel="noreferrer" className="group flex min-h-60 flex-col items-center justify-center rounded-[22px] bg-white p-8 text-center soft-shadow transition hover:-translate-y-1 hover:bg-[#fff8f6]"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#ffe3e3] text-xl font-bold text-[var(--rose)] transition group-hover:bg-[var(--rose)] group-hover:text-white"><Icon aria-hidden="true" className="h-6 w-6" /></span><h2 className="mt-6 text-2xl font-bold text-[var(--rose)]">{social.name}</h2><p className="mt-7 text-lg font-semibold text-[var(--foreground)]">{social.handle}</p></a>; })}</div></main></>;
}
