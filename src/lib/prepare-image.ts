const maxDimension = 1800;
const maxOriginalSize = 10 * 1024 * 1024;
const directlyUsable = ["image/jpeg", "image/png", "image/webp"];

/** Réduit une photo dans le navigateur avant l'envoi (une photo de téléphone pèse souvent plusieurs Mo). */
export async function prepareImage(file: File): Promise<File> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    if (directlyUsable.includes(file.type) && file.size <= maxOriginalSize) return file;
    throw new Error("Ce format de photo ne peut pas être lu ici. Essaie avec une photo JPG ou PNG.");
  }

  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
  if (!blob) throw new Error("Cette photo ne peut pas être préparée. Essaie avec une autre photo.");
  return new File([blob], "photo.jpg", { type: "image/jpeg" });
}
