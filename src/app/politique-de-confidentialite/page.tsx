import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "Sweetly - Politique de confidentialité" };

const sections = [
  {
    title: "Vos données",
    content: "Sweetly ne propose ni compte visiteur, ni formulaire, ni inscription : aucune information personnelle ne vous est demandée pour consulter les recettes.",
  },
  {
    title: "Cookies",
    content: "Ce site n'utilise aucun cookie publicitaire ni de mesure d'audience. Le seul cookie utilisé sert à la connexion de l'administratrice à son espace de gestion : il n'est pas déposé chez les visiteurs.",
  },
  {
    title: "Hébergement",
    content: "Le site et ses photos sont hébergés par Vercel. Comme tout hébergeur, Vercel peut traiter des données techniques, comme votre adresse IP, pour assurer le fonctionnement et la sécurité du site. Une tentative de connexion à l'espace de gestion enregistre également une empreinte de l'adresse IP, afin de limiter les essais répétés.",
  },
  {
    title: "Liens vers les réseaux sociaux",
    content: "Les liens vers Instagram, LinkedIn et TikTok vous mènent vers ces services, qui appliquent leurs propres règles de confidentialité.",
  },
];

export default function PrivacyPage() {
  return <>
    <SiteHeader />
    <main className="site-shell !py-16 md:!py-24">
      <div className="max-w-3xl">
        <h1 className="display text-[clamp(2.5rem,12.5vw,3rem)] font-semibold md:text-6xl">Politique de confidentialité</h1>
        {sections.map((section) => <section key={section.title} className="mt-10">
          <h2 className="display text-3xl font-semibold">{section.title}</h2>
          <p className="mt-3 leading-7 text-[var(--ink-soft)]">{section.content}</p>
        </section>)}
        <section className="mt-10">
          <h2 className="display text-3xl font-semibold">Contact</h2>
          <p className="mt-3 leading-7 text-[var(--ink-soft)]">Pour toute question, vous pouvez me joindre via la page <Link href="/contact" className="font-bold text-[var(--rose-dark)] underline">Contact</Link>.</p>
        </section>
      </div>
    </main>
    <SiteFooter />
  </>;
}
