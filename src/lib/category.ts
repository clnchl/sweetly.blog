import { z } from "zod";
import { slugify } from "@/lib/recipe";

// "Toutes" est le filtre affiché sur le site public : ce n'est pas une vraie catégorie.
export const categoryInput = z.object({
  name: z.string().trim().min(1).max(80).refine((name) => slugify(name) !== "" && slugify(name) !== "toutes"),
});
