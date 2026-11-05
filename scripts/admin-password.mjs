// Génère la valeur de ADMIN_PASSWORD_HASH_B64 à partir d'un mot de passe saisi au clavier.
import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { hash } from "bcryptjs";

const prompt = createInterface({ input: stdin, output: stdout });
const password = await prompt.question("Nouveau mot de passe (12 caractères minimum) : ");
prompt.close();

if (password.length < 12) {
  console.error("Mot de passe trop court.");
  process.exit(1);
}

const encoded = Buffer.from(await hash(password, 12)).toString("base64");
console.log("\nValeur à enregistrer dans ADMIN_PASSWORD_HASH_B64 :\n");
console.log(encoded);
