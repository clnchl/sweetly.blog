import { recipePlaceholderImage } from "@/lib/recipe";

type RecipeImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  loading?: "lazy" | "eager";
};

/** Photo affichée en entier dans un cadre de taille fixe, sur un fond flouté tiré de la même photo. */
export function RecipeImage({ src, alt, className = "", imageClassName = "", loading }: RecipeImageProps) {
  return <div className={`relative overflow-hidden bg-[var(--cream)] ${className}`}>
    {src !== recipePlaceholderImage && <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" aria-hidden="true" loading={loading} className="absolute inset-0 h-full w-full scale-125 object-cover blur-2xl" />
    </>}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={alt} loading={loading} className={`relative h-full w-full object-contain ${imageClassName}`} />
  </div>;
}
