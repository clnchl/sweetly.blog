import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa6";

const socials = [
  { name: "Instagram", href: "https://www.instagram.com/sweetly_cln/", icon: FaInstagram, tile: "bg-[linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)]" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/c%C3%A9line-c-78bb73266/", icon: FaLinkedinIn, tile: "bg-[#0077b5]" },
  { name: "TikTok", href: "https://www.tiktok.com/@celxne_kh", icon: FaTiktok, tile: "bg-black" },
];

export function SiteFooter() {
  return <footer className="bg-[var(--header)] px-6 py-8 text-center text-white">
    <p className="text-lg font-bold">©2025 Sweetly</p>
    <ul className="mt-5 flex justify-center gap-6 md:gap-8">
      {socials.map((social) => {
        const Icon = social.icon;
        return <li key={social.name}>
          <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} className={`grid h-11 w-11 place-items-center rounded-lg transition hover:-translate-y-0.5 ${social.tile}`}>
            <Icon aria-hidden="true" className="h-6 w-6 text-white" />
          </a>
        </li>;
      })}
    </ul>
    <Link href="/politique-de-confidentialite" className="mt-5 inline-block font-bold hover:underline">Politique de confidentialité</Link>
  </footer>;
}
