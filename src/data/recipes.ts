export type Recipe = {
    slug: string; title: string; category: string; image: string; description: string;
    prep: string; bake: string; servings: string;
    ingredients: string[]; utensils: string[]; instructions: string[];
};

export const categories = ["Toutes", "G\u00e2teaux & desserts", "Boissons", "P\u00e2tes", "Cr\u00e8mes", "Desserts asiatiques"];
const imageBase = "https://sweetlybyceline.vercel.app/";
const sourceRecipes = [
    {
        "id": 0,
        "nom": "Cupcake",
        "image": "images/cupcake.jpg",
        "prepTime": "15 min",
        "cookTime": "20-25 min",
        "quantité": "Environ 30 cupcakes",
        "categorie": "desserts",
        "pdf": "Recettes/recette_cupcake.pdf",
        "ingredientGroups": {
            "Ingrédients": [
                "150 g beurre",
                "50 cl de lait entier",
                "150 g sucre",
                "3 œufs",
                "175 g farine",
                "1 c. à café de levure"
            ]
        },
        "ustensiles": [
            "Moule à cupcakes",
            "ou Caissettes en papier",
            "Grand saladier",
            "Fouet ou batteur",
            "Spatule",
            "Bol micro-ondes ou casserole"
        ],
        "instructions": [
            "Préchauffer le four à 180°C (chaleur tournante). Placer des caissettes en papier dans les moules à cupcakes",
            "Faire fondre le beurre au micro-ondes par tranches de 20-30 secondes (ou à feu doux). Laisser tiédir 2-3 minutes pour qu'il ne soit pas trop chaud.",
            "Ajouter le sucre au beurre tiédi et fouetter vigoureusement 2 minutes jusqu'à obtenir une texture crémeuse et plus claire.",
            "Ajouter les oeufs un par un en fouettant bien entre chaque œuf afin que la pâte reste lisse.",
            "Tamiser la farine et la levure. Incorporer doucement pour éviter les grumeaux.",
            "Ajouter ensuite le lait en filet tout en mélangeant délicatement jusqu'à obtenir une pâte homogène. Le lait rend la pâte plus légère et moelleuse.",
            "Remplir chaque alvéole aux 2/3 seulement (environ 2 cuillères à soupe) car la pâte gonfle un peu à la cuisson. Lisser légèrement le dessus si besoin.",
            "Enfourner 20 à 25 minutes. Les cupcakes sont prêts quand ils sont dorés et qu'un cure-dent planté au centre ressort sec. Laisser refroidir complètement avant de décorer."
        ]
    },
    {
        "id": 1,
        "nom": "Roses des sables",
        "image": "images/roses_des_sables.jpg",
        "prepTime": "10 min",
        "cookTime": "40 min (repos)",
        "quantité": "Environ 25 pièces",
        "categorie": "desserts",
        "ingredientGroups": {
            "Ingrédients": [
                "200 g de chocolat (noir, au lait ou blanc)",
                "120 g de corn flakes nature",
                "1 c. à café gros sel"
            ]
        },
        "ustensiles": [
            "Bol résistant à la chaleur",
            "Casserole pour bain-marie ou micro-ondes",
            "Spatule ou grande cuillère",
            "Plaque et papier cuisson",
            "Cuillères à soupe"
        ],
        "instructions": [
            "Casser le chocolat en morceaux. Le faire fondre au bain-marie (dans un bol au-dessus d'une casserole d'eau frémissante sans que le bol touche l'eau) ou au micro-ondes (par tranches de 30 secondes en remuant entre chaque passage) jusqu'à ce qu'il soit complètement fondu et lisse.",
            "Verser le chocolat fondu dans un grand saladier suffisamment grand pour mélanger facilement.",
            "Ajouter les corn flakes et le gros sel dans le chocolat. Mélanger très délicatement avec une spatule ou une grande cuillère pour enrober tous les corn flakes de chocolat sans les écraser. Faire des mouvements doux et enveloppants.",
            "Préparer une plaque recouverte de papier cuisson. À l'aide de deux cuillères à soupe, former des petits tas de mélange sur la plaque (comme des petits rochers). Ne pas les aplatir, garder une forme irrégulière.",
            "Placer la plaque au réfrigérateur pendant 30 à 40 minutes jusqu'à ce que le chocolat soit complètement durci. Les roses des sables se conservent dans une boîte hermétique à température ambiante."
        ]
    },
    {
        "id": 2,
        "nom": "Madeleine",
        "image": "images/madeleine.jpg",
        "prepTime": "15 min",
        "cookTime": "12-15 min",
        "quantité": "Environ 20 madeleines",
        "categorie": "desserts",
        "ingredientGroups": {
            "Ingrédients": [
                "120 g de beurre",
                "2 gros œufs",
                "100 g sucre",
                "1 sachet de sucre vanillé",
                "150 g de farine",
                "1 sachet de levure chimique",
                "1 pincée de sel"
            ]
        },
        "ustensiles": [
            "Moules à madeleines",
            "Pinceau de cuisine",
            "Saladier",
            "Fouet",
            "Spatule",
            "Tamis",
            "Bol micro-ondes ou casserole",
            "Grille de refroidissement"
        ],
        "instructions": [
            "Préchauffer le four à 180°C. Beurrer les moules à madeleines avec un pinceau puis fariner légèrement (tapoter pour retirer l'excédent).",
            "Faire fondre le beurre au micro-ondes ou à feu doux et laisser tiédir 5 minutes (il doit être liquide mais pas chaud).",
            "Dans un saladier, fouetter les œufs, le sucre et le sucre vanillé 3 à 4 minutes jusqu'à ce que le mélange devienne mousseux et pâle (il doit blanchir).",
            "Dans un autre bol, mélanger la farine tamisée, la levure et le sel. Ajouter ce mélange sec en 2 ou 3 fois dans les œufs, en incorporant délicatement avec une spatule pour ne pas casser l'air.",
            "Verser le beurre fondu tiède en filet tout en mélangeant doucement jusqu'à obtenir une pâte lisse et homogène, sans grumeaux.",
            "Remplir chaque empreinte aux 2/3 (environ 1 c. à soupe de pâte). Pour favoriser la bosse, placer le moule 10-15 minutes au frais avant d'enfourner.",
            "Cuire 12 à 15 minutes. Les madeleines sont prêtes quand elles sont dorées avec une belle bosse et qu'elles se détachent facilement des bords. Démouler aussitôt et refroidir sur une grille."
        ]
    },
    {
        "id": 3,
        "nom": "Génoise",
        "image": "images/genoise.jpg",
        "prepTime": "20 min",
        "cookTime": "50 min",
        "quantité": "8-10 parts",
        "categorie": "desserts",
        "ingredientGroups": {
            "Ingrédients": [
                "6 œufs",
                "175 g de sucre",
                "1 c. à café d'arôme vanille",
                "175 g de farine"
            ]
        },
        "ustensiles": [
            "Moule rond 22-24 cm",
            "Batteur électrique ou robot",
            "Grand saladier",
            "Spatule souple",
            "Tamis",
            "Grille de refroidissement"
        ],
        "instructions": [
            "Préchauffer le four à 180°C. Beurrer et fariner un moule rond de 22-24 cm ou le chemiser de papier cuisson.",
            "Dans un grand bol (ou le bol d'un robot), casser les œufs, ajouter le sucre et l'arôme vanille. Fouetter au batteur à vitesse maximale pendant 10 minutes sans s'arrêter : le mélange doit tripler de volume, devenir très mousseux et former un ruban.",
            "Tamiser la farine au-dessus du bol pour éviter les grumeaux. Incorporer délicatement avec une spatule souple en soulevant la pâte (mouvements du bas vers le haut) afin de ne pas faire retomber l'air incorporé.",
            "Verser doucement la pâte dans le moule préparé, lisser la surface sans la tasser.",
            "Enfourner environ 50 minutes. Ne pas ouvrir le four avant 40 minutes. La génoise est cuite quand elle est dorée, se décolle légèrement des bords et qu'un couteau inséré ressort sec.",
            "Laisser reposer 5 minutes, démouler sur une grille et laisser refroidir complètement avant de couper ou garnir."
        ]
    },
    {
        "id": 4,
        "nom": "Mochi",
        "image": "images/mochi.jpg",
        "prepTime": "10 min",
        "cookTime": "10 min + repos",
        "quantité": "Environ 20 mochis",
        "categorie": "desserts_asiatiques",
        "ingredientGroups": {
            "Ingrédients": [
                "100 g farine de riz gluant",
                "30 g maïzena",
                "30 g sucre",
                "180 g lait",
                "20 g beurre"
            ]
        },
        "ustensiles": [
            "Bol compatible micro-ondes",
            "Film percé ou couvercle",
            "Fouet",
            "Spatule",
            "Balance de cuisine",
            "Plan de travail saupoudré de maïzena"
        ],
        "instructions": [
            "Dans un grand bol compatible micro-ondes, mélanger la farine de riz gluant et la maïzena au fouet pour bien répartir les poudres.",
            "Ajouter le sucre puis le lait petit à petit en fouettant jusqu'à obtenir une pâte lisse et sans grumeaux.",
            "Couvrir le bol d'un film percé ou d'un couvercle micro-ondes. Cuire 5 minutes à pleine puissance : la pâte devient épaisse et légèrement translucide.",
            "Vérifier la consistance : elle doit être épaisse et non liquide. Si besoin, recuire 1 minute par 1 minute jusqu'à ce qu'elle soit bien ferme et collante.",
            "Ajouter le beurre en morceaux. Mélanger puis pétrir avec une spatule (attention c'est chaud) jusqu'à ce que le beurre soit incorporé et que la pâte devienne élastique et brillante. Si elle colle trop, saupoudrer un peu de maïzena et pétrir encore.",
            "Laisser tiédir 10-15 minutes. Fariner vos mains et le plan de travail de maïzena, prélever des portions de pâte, les aplatir en disques.",
            "Peut être fourré avec de la pâte de haricot rouge, de la crème glacée, morceaux de fruits frais, Nutella  ou autre garniture de votre choix.",
            "Déposer la garniture choisie au centre, refermer en pinçant les bords et former une boule. Rouler dans un peu de maïzena pour que ça ne colle pas. Répéter jusqu'à épuisement de la pâte."
        ]
    },
    {
        "id": 5,
        "nom": "Moelleux au chocolat",
        "image": "images/moelleux_chocolat.jpg",
        "prepTime": "15 min",
        "cookTime": "25-30 min",
        "quantité": "8 parts",
        "categorie": "desserts",
        "ingredientGroups": {
            "Ingrédients": [
                "240 ml lait",
                "2 œufs",
                "100 g sucre",
                "100 g huile neutre ou beurre",
                "140 g farine",
                "1 sachet levure chimique",
                "100 g chocolat"
            ]
        },
        "ustensiles": [
            "Moule à gâteau",
            "Bol micro-ondes ou casserole",
            "Saladier",
            "Fouet",
            "Spatule",
            "Tamis"
        ],
        "instructions": [
            "Préchauffer le four à 180°C. Beurrer et fariner un moule à gâteau (ou utiliser un moule en silicone).",
            "Casser le chocolat en morceaux et le faire fondre au bain-marie ou au micro-ondes par intervalles de 30 secondes en remuant. Laisser tiédir 2-3 minutes.",
            "Dans un saladier, fouetter les œufs avec le sucre puis l'huile (ou beurre fondu) pendant 2-3 minutes jusqu'à ce que le mélange soit lisse et un peu mousseux.",
            "Tamiser la farine et la levure ensemble. Les ajouter au saladier et mélanger délicatement avec une spatule jusqu'à disparition des grumeaux.",
            "Verser le chocolat fondu tiède et mélanger jusqu'à obtenir une pâte homogène bien chocolatée.",
            "Transvaser la pâte dans le moule, lisser le dessus.",
            "Cuire 25 à 30 minutes. Le centre doit rester légèrement fondant : un cure-dent planté au milieu doit ressortir avec quelques miettes humides. Laisser tiédir avant de démouler."
        ]
    },
    {
        "id": 6,
        "nom": "Perles de tapioca (Bubble Tea)",
        "image": "images/perles_tapioca.jpg",
        "prepTime": "20 min",
        "cookTime": "15 min",
        "quantité": "Environ4 bubble tea",
        "categorie": "desserts_asiatiques",
        "ingredientGroups": {
            "Ingrédients": [
                "200 g fécule de tapioca",
                "70 g sucre de canne",
                "140 g eau",
                "Fécule pour former les billes"
            ]
        },
        "ustensiles": [
            "Casserole",
            "Cuillère en bois",
            "Assiette farinée",
            "Grande casserole d'eau",
            "Passoire ou écumoire",
            "Bol pour conserver les billes"
        ],
        "instructions": [
            "Dans une casserole, mélanger la fécule de tapioca, le sucre et l'eau froide avec une cuillère en bois jusqu'à obtenir un mélange homogène sans grumeaux.",
            "Chauffer à feu moyen en remuant constamment. La pâte épaissit rapidement : continuer à remuer jusqu'à ce qu'elle devienne très épaisse et souple (environ 3-5 minutes).",
            "Retirer du feu et laisser tiédir 5 minutes pour pouvoir manipuler la pâte sans se brûler.",
            "Fariner légèrement les mains avec un peu de fécule. Prélever de petits morceaux de pâte et rouler entre les paumes pour former des billes de la taille d'un petit pois. Les déposer sur une assiette farinée pour qu'elles ne collent pas.",
            "Porter une grande casserole d'eau à ébullition. Ajouter les billes une par une en remuant doucement pour éviter qu'elles ne se collent entre elles.",
            "Laisser cuire à frémissement 12 à 15 minutes jusqu'à ce que les billes deviennent translucides et légèrement rebondies. Égoutter et rincer rapidement à l'eau froide pour stopper la cuisson. Conserver dans un sirop ou de l'eau sucrée jusqu'au service."
        ]
    },
    {
        "id": 7,
        "nom": "Fluffy Pancakes",
        "image": "images/fluffy_pancakes.jpg",
        "prepTime": "15 min",
        "cookTime": "8 min",
        "quantité": "Environ 8 pancakes",
        "categorie": "desserts_asiatiques",
        "ingredientGroups": {
            "Ingrédients": [
                "180 g lait entier",
                "180 g jaune d’œuf",
                "120 g farine",
                "6 g arôme vanille",
                "130 g blanc d’œuf",
                "30 g sucre"
            ]
        },
        "ustensiles": [
            "Deux saladiers",
            "Fouet",
            "Spatule",
            "Batteur pour les blancs",
            "Poêle antiadhésive avec couvercle",
            "Louche"
        ],
        "instructions": [
            "Dans un saladier, mélanger au fouet le lait, les jaunes d'œufs, la farine et la vanille jusqu'à obtenir une pâte lisse sans grumeaux.",
            "Dans un second bol, monter les blancs en neige ferme en ajoutant le sucre petit à petit dès qu'ils commencent à mousser. Les blancs doivent former des pics fermes et brillants.",
            "Incorporer délicatement les blancs montés à la pâte en 3 fois, à l'aide d'une spatule, en soulevant la pâte du bas vers le haut pour ne pas les casser. La pâte doit rester très aérée.",
            "Chauffer une poêle antiadhésive à feu très doux avec un voile d'huile ou de beurre. Déposer des petites louches de pâte. Ajouter 1 cuillère à soupe d'eau dans la poêle et couvrir pour créer de la vapeur.",
            "Cuire 3 à 4 minutes, retourner délicatement avec une spatule large, ajouter à nouveau une cuillère d'eau, couvrir et cuire 3 à 4 minutes. Les pancakes doivent être épais, dorés et moelleux. Servir immédiatement."
        ]
    },
    {
        "id": 8,
        "nom": "Fondant au chocolat",
        "image": "images/fondant_chocolat.jpg",
        "prepTime": "15 min",
        "cookTime": "25 min",
        "quantité": "8-10 parts",
        "categorie": "desserts",
        "ingredientGroups": {
            "Ingrédients": [
                "200 g chocolat",
                "150 g beurre",
                "100 g sucre",
                "6 œufs",
                "60 g farine",
                "60 g maïzena",
                "1 pincée de sel"
            ]
        },
        "ustensiles": [
            "Moule à gâteau",
            "Bol bain-marie ou micro-ondes",
            "Fouet",
            "Spatule",
            "Tamis"
        ],
        "instructions": [
            "Préchauffer le four à 180°C. Beurrer et fariner un moule (ou utiliser un moule à charnière chemisé de papier cuisson).",
            "Faire fondre doucement le chocolat et le beurre ensemble au bain-marie ou au micro-ondes par intervalles de 30 secondes, en remuant jusqu'à ce que le mélange soit lisse. Laisser tiédir 2 minutes.",
            "Dans un saladier, fouetter les œufs et le sucre pendant 2-3 minutes jusqu'à ce que le mélange pâlisse légèrement et devienne mousseux.",
            "Ajouter le mélange chocolat-beurre tiédi et bien mélanger au fouet.",
            "Tamiser la farine et la maïzena directement au-dessus du saladier. Mélanger délicatement avec une spatule jusqu'à obtenir une pâte homogène sans grumeaux.",
            "Verser dans le moule, lisser la surface, puis enfourner 25 minutes. Le fondant doit rester moelleux au centre : un cure-dent doit ressortir avec quelques miettes. Laisser tiédir avant de démouler."
        ]
    },
    {
        "id": 9,
        "nom": "Tiramisu",
        "image": "images/tiramisu.jpg",
        "prepTime": "25 min",
        "cookTime": "3 h (repos)",
        "quantité": "Environ 8 parts",
        "categorie": "desserts",
        "ingredientGroups": {
            "Ingrédients": [
                "5 œufs",
                "100 g sucre",
                "500 g mascarpone",
                "Optionnel : 25 cl crème liquide 30%",
                "une vingtaine de boudoirs"
            ]
        },
        "ustensiles": [
            "Grands saladiers",
            "Fouet ou batteur",
            "Spatule",
            "Plat rectangulaire ou carré",
            "Assiette creuse pour le café",
            "Tamiseur pour le cacao (optionnel)"
        ],
        "instructions": [
            "Préparer un café fort et le laisser refroidir dans une assiette creuse. Séparer les blancs des jaunes d'œufs.",
            "Dans un grand saladier, fouetter les jaunes avec le sucre jusqu'à ce que le mélange blanchisse et devienne épais. Ajouter le mascarpone (et la crème liquide si option) puis fouetter jusqu'à une crème lisse et sans grumeaux.",
            "Dans un second bol, monter les blancs en neige ferme. Ils sont prêts quand ils forment des pics qui se tiennent et ne coulent pas.",
            "Incorporer délicatement les blancs montés dans la crème mascarpone en 3 fois, avec une spatule, en soulevant la masse pour garder l'air.",
            "Dans un plat, tremper rapidement chaque boudoir dans le café (1-2 secondes pour ne pas détremper) et faire une première couche au fond.",
            "Étaler une couche de crème mascarpone, puis refaire une couche de boudoirs imbibés, et ainsi de suite. Terminer par une couche de crème sur le dessus.",
            "Filmer et placer au réfrigérateur au moins 3 heures (idéalement une nuit) pour que le tiramisu prenne et que les biscuits s'imprègnent bien. Saupoudrer de cacao avant de servir."
        ]
    },
    {
        "id": 10,
        "nom": "Tarte au citron meringuée",
        "image": "images/tarte_citron.jpg",
        "prepTime": "Environ 1 heure",
        "cookTime": "20-30 min",
        "quantité": "8 parts",
        "categorie": "desserts",
        "ingredientGroups": {
            "Pâte": [
                "250 g farine",
                "125 g beurre",
                "100 g sucre glace",
                "30 g poudre d’amande",
                "1 œuf"
            ],
            "Crème": [
                "3 citrons (jus et zestes)",
                "120 g sucre",
                "3 œufs",
                "2 c. à soupe maïzena",
                "45 g beurre"
            ],
            "Meringue": [
                "3 blancs d’œufs",
                "150 g sucre",
                "30 ml eau"
            ]
        },
        "ustensiles": [
            "Moule à tarte 24 cm",
            "Rouleau à pâtisserie",
            "Papier cuisson et billes de cuisson",
            "Casserole",
            "Fouet",
            "Thermomètre sucre",
            "Poche à douille (optionnel)",
            "Chalumeau"
        ],
        "instructions": [
            "— Pâte sucrée —",
            "Dans un saladier, mélanger farine, sucre glace, poudre d'amande et une pincée de sel. Ajouter le beurre froid en dés et sabler du bout des doigts jusqu'à texture sableuse.",
            "Ajouter l'œuf, mélanger juste assez pour agglomérer. Former un disque, filmer, 30 min au réfrigérateur.",
            "Étaler entre deux feuilles (3-4 mm), foncer un moule 24 cm, piquer, refroidir 10 min.",
            "Cuisson à blanc : papier cuisson + billes, 20 min à 180°C, retirer billes/papier, encore 5 min pour sécher. Laisser tiédir.",
            "— Crème citron —",
            "Chauffer le jus + zestes + sucre jusqu'aux premiers frémissements.",
            "Fouetter à part œufs + maïzena jusqu'à lisse. Verser le liquide chaud en fouettant, reverser en casserole, cuire feu doux en remuant jusqu'à épaississement (crème pâtissière).",
            "Hors du feu, ajouter le beurre en dés, fouetter jusqu'à brillant. Verser la crème chaude dans le fond cuit, lisser, tiédir 10-15 min.",
            "— Meringue italienne —",
            "Porter eau + sucre à 118°C. Monter les blancs. Verser le sirop en filet sur les blancs en fouettant, continuer jusqu'à refroidissement : meringue ferme, brillante, bec d'oiseau.",
            "— Finition —",
            "Pocher ou étaler la meringue en volutes. Dorer au chalumeau ou sous le gril 2-3 min en surveillant. Laisser refroidir avant de couper."
        ]
    },
    {
        "id": 11,
        "nom": "Cinnamon Rolls",
        "image": "images/cinnamon_rolls.png",
        "prepTime": "25 min + 2 h de levée",
        "cookTime": "25 min",
        "quantité": "Environ 6 roulés",
        "categorie": "desserts",
        "ingredientGroups": {
            "Pâte": [
                "240 ml lait tiède",
                "21 g levure fraîche",
                "450 g farine T55",
                "60 g sucre",
                "8 g sel",
                "70 g beurre fondu"
            ],
            "Garniture": [
                "70 g beurre mou",
                "70 g sucre",
                "2 c. à soupe cannelle",
                "2 c. à soupe mascarpone"
            ],
            "Glaçage": [
                "20 g sucre glace",
                "3 c. à soupe lait"
            ]
        },
        "ustensiles": [
            "Pétrin ou batteur avec crochet",
            "Saladier",
            "Rouleau à pâtisserie",
            "Couteau ou fil pour trancher",
            "Plat ou moule beurré",
            "Pinceau de cuisine",
            "Pinceau de cuisine"
        ],
        "instructions": [
            "Dans le bol du pétrin, verser le lait tiède (pas chaud), ajouter la levure émiettée et le sucre. Mélanger et laisser reposer 5-10 minutes jusqu'à légère mousse : la levure s'active.",
            "Ajouter la farine et le sel, puis verser le beurre fondu tiède. Pétrir 8 à 10 minutes (crochet) jusqu'à obtenir une pâte souple et légèrement collante qui se décolle des parois.",
            "Former une boule, couvrir et laisser lever dans un endroit tiède 1h30 (ou jusqu'à ce que la pâte double de volume).",
            "Dégazer la pâte, l'étaler en grand rectangle. Tartiner la garniture (beurre, sucre, cannelle, mascarpone) de façon uniforme. Rouler serré dans la longueur pour former un boudin.",
            "Couper des tronçons réguliers (5-6 cm), les placer dans un plat beurré en les espaçant légèrement. Couvrir et laisser pousser 30 minutes. Pendant ce temps préchauffer le four à 180°C.",
            "Cuire 25 minutes à 180°C jusqu'à ce que les roulés soient bien dorés. Mélanger les ingrédients du glaçage, puis napper les roulés encore tièdes pour qu'il pénètre légèrement."
        ]
    },
    {
        "id": 12,
        "nom": "Flan",
        "image": "images/flan.png",
        "prepTime": "15 min",
        "cookTime": "35 min",
        "quantité": "8 parts",
        "categorie": "desserts",
        "ingredientGroups": {
            "Pâte sucrée": [
                "250 g de farine",
                "125 g de beurre coupé en dés",
                "100 g de sucre glace",
                "30 g de poudre d’amande",
                "1 pincée de sel",
                "1 œuf"
            ],
            "Crème": [
                "1 L de lait entier",
                "1 gousse de vanille (ou 2 cc extrait de vanille)",
                "150 g de sucre",
                "100 g de maïzena",
                "4 œufs entiers",
                "Optionnel : 20 cl de crème liquide (flan plus fondant)"
            ]
        },
        "ustensiles": [
            "Moule à tarte",
            "Saladier",
            "Fouet",
            "Casserole",
            "Pinceau de cuisine",
            "Film alimentaire"
        ],
        "instructions": [
            "Pâte sucrée : dans un saladier, mélanger farine, sucre glace, poudre d'amande et sel. Ajouter le beurre froid en dés et sabler du bout des doigts jusqu'à consistance sableuse.",
            "Ajouter l'œuf, mélanger rapidement sans trop travailler pour former une boule. Filmer et réserver 30 minutes au frais.",
            "Foncer un moule beurré avec la pâte, piquer le fond. Précuire 10 minutes à 180°C pour qu'elle se fige légèrement.",
            "Crème : chauffer le lait avec la gousse de vanille fendue et grattée, laisser infuser 5 minutes hors du feu.",
            "Dans un saladier, fouetter les œufs, le sucre et la maïzena jusqu'à ce que le mélange blanchisse. Verser le lait chaud en filet en fouettant sans cesse.",
            "Remettre le mélange dans la casserole et cuire à feu doux en remuant jusqu'à épaississement (texture crème pâtissière épaisse).",
            "Verser la crème chaude sur le fond de tarte précuit. Lisser et enfourner 35 à 40 minutes à 180°C jusqu'à ce que le flan soit doré sur le dessus et pris au centre.",
            "Laisser refroidir complètement dans le moule avant de démouler et couper."
        ]
    },
    {
        "id": 13,
        "nom": "Crème pâtissière",
        "image": "images/creme_patisserie.jpg",
        "prepTime": "15 min",
        "cookTime": "10 min",
        "quantité": "500 ml",
        "categorie": "cremes",
        "ingredientGroups": {
            "Ingrédients": [
                "500 ml lait",
                "4 jaunes d'œufs",
                "100 g sucre",
                "40 g maïzena",
                "1 gousse de vanille"
            ]
        },
        "ustensiles": [
            "Casserole",
            "Saladier",
            "Fouet",
            "Spatule",
            "Passoire fine (optionnel)",
            "Film alimentaire pour filmer au contact"
        ],
        "instructions": [
            "Chauffer le lait avec la gousse de vanille fendue et grattée jusqu'aux premiers frémissements, puis couvrir et laisser infuser 5 minutes hors du feu.",
            "Dans un saladier, fouetter les jaunes et le sucre jusqu'à ce que le mélange blanchisse. Ajouter la maïzena et fouetter pour dissoudre les éventuels grumeaux.",
            "Verser progressivement le lait chaud vanillé en fouettant en continu pour tempérer les jaunes sans les cuire.",
            "Reverser le tout dans la casserole. Cuire à feu doux en remuant constamment avec une spatule jusqu'à épaississement (texture crème épaisse et lisse).",
            "Retirer du feu, filmer au contact pour éviter la peau et laisser refroidir complètement avant utilisation."
        ]
    },
    {
        "id": 14,
        "nom": "Crème anglaise",
        "image": "images/creme_anglaise.jpg",
        "prepTime": "10 min",
        "cookTime": "10 min",
        "quantité": "500 ml",
        "categorie": "cremes",
        "ingredientGroups": {
            "Ingrédients": [
                "500 ml lait",
                "4 jaunes d'œufs",
                "70 g sucre",
                "1 gousse de vanille"
            ]
        },
        "ustensiles": [
            "Casserole",
            "Spatule en bois",
            "Fouet",
            "Thermomètre de cuisson (optionnel)",
            "Passoire fine",
            "Bol ou pichet"
        ],
        "instructions": [
            "Chauffer le lait avec la gousse de vanille fendue et grattée jusqu'à frémissement, puis retirer du feu et laisser infuser 5 minutes.",
            "Dans un saladier, fouetter les jaunes et le sucre jusqu'à ce qu'ils pâlissent légèrement.",
            "Verser le lait chaud en filet sur les jaunes en fouettant constamment pour éviter de les cuire.",
            "Reverser le mélange dans la casserole et cuire à feu doux en remuant sans cesse avec une spatule en bois jusqu'à 82°C : la crème nappe la spatule et laisse une trace quand on passe le doigt.",
            "Filtrer la crème anglaise, laisser refroidir en remuant de temps en temps puis réserver au frais."
        ]
    },
    {
        "id": 15,
        "nom": "Crème chantilly",
        "image": "images/creme_chantilly.jpg",
        "prepTime": "10 min",
        "cookTime": "0 min",
        "quantité": "400 ml",
        "categorie": "cremes",
        "ingredientGroups": {
            "Ingrédients": [
                "250 ml crème entière 30% MG",
                "30 g sucre glace",
                "1 sachet de sucre vanillé"
            ]
        },
        "ustensiles": [
            "Bol bien froid",
            "Fouet ou batteur",
            "Spatule"
        ],
        "instructions": [
            "Placer le bol, le fouet et la crème au réfrigérateur 15 à 30 minutes : tout doit être bien froid pour que ça monte.",
            "Verser la crème bien froide dans le bol et commencer à fouetter à vitesse moyenne jusqu'à ce qu'elle épaississe et forme des vagues souples.",
            "Ajouter le sucre glace et le sucre vanillé en pluie. Continuer à fouetter jusqu'à obtenir une texture ferme et aérienne (des pics qui se tiennent). Ne pas trop fouetter pour éviter de faire du beurre.",
            "Utiliser immédiatement pour garnir ou conserver au réfrigérateur jusqu'à 24 h."
        ]
    },
    {
        "id": 16,
        "nom": "Crème citron",
        "image": "images/creme_citron.jpg",
        "prepTime": "10 min",
        "cookTime": "10 min",
        "quantité": "300 ml",
        "categorie": "cremes",
        "ingredientGroups": {
            "Ingrédients": [
                "3 citrons (jus et zestes)",
                "100 g sucre",
                "3 œufs",
                "2 c. à soupe maïzena",
                "30 g beurre"
            ]
        },
        "ustensiles": [
            "Casserole",
            "Fouet",
            "Bol",
            "Zesteur ou râpe fine"
        ],
        "instructions": [
            "Dans une casserole hors du feu, fouetter les œufs avec le sucre, la maïzena, le jus et les zestes de citron jusqu'à obtenir un mélange lisse sans grumeaux.",
            "Placer sur feu doux et cuire en remuant constamment avec un fouet. La crème épaissit en quelques minutes : continuer jusqu'à consistance de crème pâtissière souple.",
            "Retirer du feu, ajouter le beurre en petits morceaux et fouetter jusqu'à ce qu'il soit complètement fondu et que la crème soit brillante.",
            "Verser dans un bol, filmer au contact pour éviter la peau et laisser refroidir complètement avant utilisation (fourrage, tartinage)."
        ]
    },
    {
        "id": 17,
        "nom": "Pâte brisée",
        "image": "images/pate_brisee.jpg",
        "prepTime": "15 min",
        "cookTime": "30 min",
        "quantité": "1 tarte",
        "categorie": "pates",
        "ingredientGroups": {
            "Ingrédients": [
                "250 g farine",
                "125 g beurre froid",
                "1 pincée de sel",
                "5 cl eau froide"
            ]
        },
        "ustensiles": [
            "Saladier",
            "Fourchette ou corne",
            "Film alimentaire",
            "Rouleau à pâtisserie",
            "Plan de travail fariné"
        ],
        "instructions": [
            "Dans un saladier, mélanger la farine et le sel. Ajouter le beurre froid en dés et frotter entre les doigts jusqu'à obtenir une texture sableuse (petits grains).",
            "Ajouter l'eau très froide en 2-3 fois en mélangeant avec une fourchette jusqu'à ce que la pâte commence à se rassembler. Ne pas trop travailler pour garder le sablage.",
            "Former rapidement une boule (ou un disque), filmer et laisser reposer 30 minutes au frais pour détendre le gluten et faciliter l'étalage.",
            "Étaler sur un plan légèrement fariné selon l'usage (fond de tarte, tourtes)."
        ]
    },
    {
        "id": 18,
        "nom": "Pâte sucrée",
        "image": "images/pate_sucree.jpg",
        "prepTime": "20 min",
        "cookTime": "30 min",
        "quantité": "1 tarte",
        "categorie": "pates",
        "ingredientGroups": {
            "Ingrédients": [
                "250 g farine",
                "125 g beurre mou",
                "30 g poudre d’amande",
                "70 g sucre glace",
                "1 œuf"
            ]
        },
        "ustensiles": [
            "Saladier",
            "Spatule",
            "Film alimentaire",
            "Rouleau à pâtisserie"
        ],
        "instructions": [
            "Dans un saladier, travailler le beurre mou et le sucre glace avec une spatule jusqu'à obtenir une crème lisse.",
            "Ajouter l'œuf et mélanger jusqu'à incorporation complète (la pâte peut sembler grumeleuse, c'est normal).",
            "Ajouter la farine d'un coup, mélanger rapidement sans trop pétrir jusqu'à ce que la pâte s'agglomère. Écraser légèrement avec la paume (fraisage) pour homogénéiser.",
            "Former un disque, filmer et placer 30 minutes au réfrigérateur avant d'étaler."
        ]
    },
    {
        "id": 20,
        "nom": "Sirop de fraise",
        "image": "images/sirop_fraise.jpg",
        "prepTime": "10 min",
        "cookTime": "30 min",
        "quantité": "750 ml",
        "ingredients": [
            "500 g de fraises fraîches",
            "400 g de sucre",
            "250 ml d'eau",
            "1 cuillère à soupe de jus de citron"
        ],
        "ustensiles": [
            "Planche et couteau",
            "Casserole",
            "Mixeur plongeant",
            "Passoire fine ou chinois",
            "Bouteille propre",
            "Entonnoir"
        ],
        "instructions": [
            "Laver, équeuter les fraises puis les couper en morceaux pour qu'elles cuisent plus vite.",
            "Mettre les fraises dans une casserole, ajouter l'eau et le sucre. Porter à ébullition en remuant pour dissoudre le sucre.",
            "Baisser sur feu doux et laisser mijoter 30 minutes en remuant de temps en temps : les fraises doivent être très tendres et le liquide sirupeux.",
            "Ajouter le jus de citron. Mixer finement au mixeur plongeant dans la casserole (hors du feu) jusqu'à texture lisse.",
            "Filtrer à travers une passoire fine ou un chinois pour retirer les graines et les fibres.",
            "Verser le sirop chaud dans une bouteille propre (prévoir entonnoir), laisser refroidir puis conserver au réfrigérateur."
        ]
    },
    {
        "id": 21,
        "nom": "Sirop de framboise",
        "image": "images/sirop_framboise.jpg",
        "prepTime": "10 min",
        "cookTime": "30 min",
        "quantité": "750 ml",
        "ingredients": [
            "500 g de framboises fraîches",
            "400 g de sucre",
            "250 ml d'eau",
            "1 cuillère à soupe de jus de citron"
        ],
        "ustensiles": [
            "Casserole",
            "Mixeur plongeant",
            "Passoire fine",
            "Bouteille propre",
            "Entonnoir"
        ],
        "instructions": [
            "Rincer délicatement les framboises et les mettre dans une casserole avec l'eau et le sucre. Porter à ébullition en remuant pour dissoudre le sucre.",
            "Baisser à feu doux et mijoter 30 minutes en remuant doucement : les framboises se défont et le liquide épaissit.",
            "Ajouter le jus de citron, mélanger, puis mixer finement au mixeur plongeant (hors du feu).",
            "Filtrer soigneusement à travers une passoire fine pour retirer toutes les graines.",
            "Verser le sirop chaud dans une bouteille propre, laisser refroidir puis conserver au frais."
        ]
    },
    {
        "id": 22,
        "nom": "Café glacé",
        "image": "images/cafe_glace.jpg",
        "prepTime": "5 min",
        "cookTime": "0 min",
        "quantité": "1 verre",
        "ingredients": [
            "1 ou 2 shot d'expresso",
            "50 ml de lait",
            "2 cuillères à café de sucre",
            "Glaçons"
        ],
        "ustensiles": [
            "Grand verre",
            "Cuillère longue",
            "Bac à glaçons"
        ],
        "instructions": [
            "Préparer un café bien serré (expresso ou café fort) puis le laisser refroidir complètement pour ne pas faire fondre la glace trop vite.",
            "Remplir un grand verre de glaçons.",
            "Verser le café refroidi sur les glaçons.",
            "Ajouter le lait (ou une boisson végétale) et sucrer selon votre goût. Mélanger avec une cuillère longue.",
            "Servir immédiatement pendant que c'est bien frais."
        ]
    },
    {
        "id": 23,
        "nom": "Pancake",
        "image": "images/pancake.jpg",
        "prepTime": "10 min",
        "cookTime": "15 min",
        "quantité": "Environ 10 pancakes",
        "categorie": "desserts",
        "ingredientGroups": {
            "Ingrédients": [
                "250 g de farine",
                "30 g de sucre",
                "2 œufs",
                "1 sachet de levure chimique",
                "30 cl de lait",
                "1 pincée de sel",
                "30 g de beurre fondu"
            ]
        },
        "ustensiles": [
            "Saladier",
            "Fouet",
            "Poêle antiadhésive",
            "Louche",
            "Spatule"
        ],
        "instructions": [
            "Dans un saladier, mélanger la farine, le sucre, la levure et le sel avec un fouet pour bien répartir les ingrédients secs.",
            "Ajouter les œufs, le lait et le beurre fondu tiédi. Fouetter juste assez pour obtenir une pâte homogène (quelques petits grumeaux peuvent rester).",
            "Laisser reposer la pâte 10 minutes : cela détend la farine et rend les pancakes plus moelleux.",
            "Chauffer une poêle antiadhésive avec un voile de beurre. Verser de petites louches de pâte. Cuire à feu moyen 1-2 minutes jusqu'à formation de bulles en surface et bords secs, retourner et cuire 1 minute de l'autre côté.",
            "Empiler et servir chaud avec le topping de votre choix."
        ]
    },
    {
        "id": 24,
        "nom": "Gaufre",
        "image": "images/gaufre.jpg",
        "prepTime": "10 min",
        "cookTime": "5-10 min",
        "quantité": "Environ 10 gaufres",
        "categorie": "desserts",
        "ingredientGroups": {
            "Ingrédients": [
                "250 g de farine",
                "2 œufs",
                "50 g de sucre",
                "1 sachet de levure chimique",
                "40 cl de lait",
                "100 g de beurre fondu",
                "1 pincée de sel"
            ]
        },
        "ustensiles": [
            "Grand bol",
            "Fouet",
            "Pinceau pour huiler",
            "Louche"
        ],
        "instructions": [
            "Dans un grand bol, mélanger la farine, le sucre, la levure et le sel au fouet.",
            "Ajouter les œufs, puis le lait et le beurre fondu tiédi. Fouetter jusqu'à obtenir une pâte lisse et assez fluide (ne pas trop travailler).",
            "Préchauffer le gaufrier et huiler légèrement les plaques avec un pinceau ou un essuie-tout huilé.",
            "Verser une louche de pâte par empreinte sans trop remplir (la pâte gonfle). Fermer et cuire jusqu'à ce que les gaufres soient bien dorées et croustillantes (le temps dépend du gaufrier).",
            "Déposer sur une grille pour garder le croustillant. Servir chaud avec sucre glace, chocolat, confiture ou ce que vous aimez."
        ]
    },
    {
        "id": 25,
        "nom": "Layer Cake Mangue",
        "image": "images/layer_cake_mangue.jpg",
        "prepTime": "2 heures",
        "cookTime": "50 min",
        "quantité": "10-12 parts",
        "categorie": "desserts",
        "ingredientGroups": {
            "Génoise": [
                "6 œufs",
                "175 g de sucre",
                "1 c. à café d'arôme vanille",
                "175 g de farine"
            ],
            "Crème mangue": [
                "1 mangue coupé en dés ou lamelles",
                "100g de purée de mangue (optionnel)",
                "250 g de mascarpone",
                "200 ml de crème liquide entière",
                "100 g de sucre",
                "1 c. à café d'arôme vanille"
            ],
            "Décor": [
                "Mangue fraîche pour la décoration"
            ]
        },
        "ustensiles": [
            "Deux moules de 18-20 cm",
            "Batteur électrique",
            "Spatule",
            "Tamis",
            "Couteau à génoise ou lyre",
            "Poche à douille (optionnel)",
            "Tourne-plat (optionnel)"
        ],
        "instructions": [
            "— Génoise —",
            "Préchauffer le four à 180°C. Beurrer et fariner deux moules de 18-20 cm (ou cuire en deux fournées dans le même moule).",
            "Dans un grand bol, fouetter œufs, sucre et vanille 10 minutes à pleine vitesse jusqu'à ce que le mélange triple de volume et forme un ruban très mousseux.",
            "Tamiser la farine au-dessus du bol puis l'incorporer délicatement à la spatule en soulevant la pâte pour ne pas faire retomber l'air.",
            "Répartir la pâte dans les deux moules (ou cuire la moitié, puis le reste). Lisser sans tasser. Cuire 25 à 30 minutes : les génoises doivent être dorées et un cure-dent doit ressortir sec.",
            "Démouler et laisser refroidir complètement sur grille. Si besoin, égaliser le dessus au couteau pour des disques bien plats.",
            "— Crème mascarpone mangue —",
            "Fouetter la crème très froide avec le mascarpone, le sucre et la vanille jusqu'à obtenir une texture ferme et aérienne (pics qui se tiennent).",
            "Incorporer délicatement la purée de mangue froide à la crème fouettée jusqu'à homogénéité. Réserver au frais.",
            "— Montage —",
            "Couper chaque génoise en deux disques si assez épaisse (ou garder entière si fine). Placer un premier disque sur un plat, étaler une couche de crème mangue, ajouter quelques dés ou lamelles de mangue fraîche.",
            "Répéter les couches génoise + crème + mangue jusqu'à épuisement, en gardant de la crème pour masquer le dessus et les côtés.",
            "Lisser à la spatule. Décorer avec des tranches de mangue. Réfrigérer au moins 1 heure avant de servir pour que le gâteau se tienne."
        ]
    },
    {
        "id": 26,
        "nom": "Crème Mascarpone",
        "image": "images/creme_mascarpone.jpg",
        "prepTime": "5 min",
        "cookTime": "0 min",
        "quantité": "300 ml",
        "categorie": "desserts",
        "ingredientGroups": {
            "Ingrédients": [
                "500 g de mascarpone",
                "130 g de sucre ou sucre glace",
                "1 c. à café d'arôme vanille"
            ]
        },
        "ustensiles": [
            "Bol",
            "Fouet ou batteur",
            "Spatule"
        ],
        "instructions": [
            "Dans un bol, déposer le mascarpone bien froid, le sucre et l'arôme vanille.",
            "Fouetter 1 à 2 minutes jusqu'à obtenir une crème lisse et homogène, sans grumeaux.",
            "Utiliser immédiatement pour garnir, napper ou fourrer un gâteau, ou réserver au frais jusqu'au service."
        ]
    },
    {
        "id": 27,
        "nom": "Gâteau Chocolat Blanc",
        "image": "images/gateau_choco_blanc.jpg",
        "prepTime": "20 min",
        "cookTime": "35 min",
        "quantité": "8-10 parts",
        "categorie": "desserts",
        "ingredientGroups": {
            "Ingrédients": [
                "200 g de chocolat blanc",
                "120 g de beurre",
                "100 g de sucre",
                "3 œufs",
                "100 g de farine",
                "1 sachet de levure chimique"
            ],
            "Glaçage": [
                "100 g de chocolat blanc fondu",
                "2 c. à s. de crème liquide"
            ]
        },
        "ustensiles": [
            "Moule",
            "Bol bain-marie ou micro-ondes",
            "Fouet",
            "Spatule",
            "Tamis"
        ],
        "instructions": [
            "Préchauffer le four à 180°C. Beurrer et fariner un moule (ou chemiser de papier cuisson).",
            "Faire fondre doucement le chocolat blanc avec le beurre au bain-marie ou au micro-ondes par intervalles de 30 secondes. Mélanger jusqu'à lisse et laisser tiédir 2 minutes.",
            "Dans un saladier, fouetter le sucre et les œufs jusqu'à ce que le mélange blanchisse légèrement. Ajouter le mélange chocolat-beurre tiédi et mélanger.",
            "Ajouter la farine et la levure tamisées, mélanger délicatement jusqu'à obtention d'une pâte homogène sans grumeaux.",
            "Verser dans le moule, lisser. Cuire 35 minutes à 180°C : un cure-dent doit ressortir propre. Laisser refroidir avant de napper du glaçage au chocolat blanc."
        ]
    },
    {
        "id": 28,
        "nom": "Gâteaux aux Pommes",
        "image": "images/gateau_pommes.jpg",
        "prepTime": "15 min",
        "cookTime": "40 min",
        "quantité": "8 parts",
        "categorie": "desserts",
        "ingredientGroups": {
            "Ingrédients": [
                "3 pommes",
                "200 g de farine",
                "100 g de sucre",
                "3 œufs",
                "1 sachet de levure chimique",
                "100 g de beurre fondu"
            ]
        },
        "ustensiles": [
            "Moule à gâteau",
            "Saladier",
            "Fouet",
            "Éplucheur et couteau",
            "Spatule"
        ],
        "instructions": [
            "Dans un grand bol, mélanger la farine, le sucre, la levure, les œufs, le lait et le beurre fondu jusqu'à obtenir une pâte lisse. Ne pas trop battre.",
            "Peler et couper les pommes en petits dés ou en lamelles. Les incorporer délicatement à la pâte.",
            "Beurrer et fariner un moule, verser la pâte. Lisser.",
            "Cuire 40 minutes à 180°C jusqu'à ce que le gâteau soit doré et qu'un cure-dent planté au centre ressorte propre."
        ]
    },
    {
        "id": 29,
        "nom": "Cake au Citron",
        "image": "images/cake_citron.jpg",
        "prepTime": "15 min",
        "cookTime": "45 min",
        "quantité": "8-10 parts",
        "categorie": "desserts",
        "ingredientGroups": {
            "Ingrédients": [
                "3 œufs",
                "150 g de sucre",
                "100 g de beurre fondu",
                "150 g de farine",
                "1 sachet de levure chimique",
                "2 citrons (jus et zeste)"
            ],
            "Glaçage": [
                "100 g de sucre glace",
                "Jus de citron"
            ]
        },
        "ustensiles": [
            "Moule à cake",
            "Saladier",
            "Fouet",
            "Zesteur ou râpe",
            "Spatule"
        ],
        "instructions": [
            "Préchauffer le four à 180°C. Beurrer et fariner un moule à cake.",
            "Fouetter les œufs et le sucre jusqu'à ce que le mélange blanchisse. Ajouter le beurre fondu tiède et bien mélanger.",
            "Ajouter la farine, la levure, le zeste et le jus de citron. Mélanger juste assez pour obtenir une pâte homogène.",
            "Verser dans le moule, lisser le dessus et cuire 45 minutes à 180°C. Vérifier la cuisson avec un cure-dent (il doit ressortir propre).",
            "Laisser refroidir complètement puis napper du glaçage citron (sucre glace + jus de citron) pour une finition brillante."
        ]
    },
    {
        "id": 30,
        "nom": "Gâteaux Boudoirs / Crèmes",
        "image": "images/gateau_boudoirs.jpg",
        "prepTime": "25 min",
        "cookTime": "0 min",
        "quantité": "6-8 parts",
        "categorie": "desserts",
        "ingredientGroups": {
            "Version Chocolat Blanc": [
                "Boudoirs",
                "Crème mascarpone",
                "130 g de sucre",
                "100 g chocolat blanc fondu"
            ],
            "Version Citron": [
                "Boudoirs",
                "Crème citron",
                "Crème mascarpone",
                "100 g de sucre"
            ]
        },
        "ustensiles": [
            "Moule à charlotte ou entremets",
            "Saladier",
            "Spatule",
            "Poche à douille (optionnel)"
        ],
        "instructions": [
            "Chemiser le moule de boudoirs (sucrés ou cuillers) en les serrant bien. Si souhaité, les imbiber très légèrement de sirop ou de jus pour plus de moelleux.",
            "Dans un saladier, mélanger la mascarpone et le sucre jusqu'à obtenir une crème lisse.",
            "Pour la version citron, ajouter la crème citron et mélanger délicatement. Pour la version chocolat blanc, incorporer le chocolat blanc fondu légèrement tiédi.",
            "Verser la préparation sur les boudoirs, lisser la surface. Ajouter en finition une fine coque ou filure de chocolat fondu selon la version choisie.",
            "Couvrir et réfrigérer au moins 2 heures (idéalement une nuit) pour que le dessert prenne bien avant de démouler et servir."
        ]
    },
    {
        "id": 31,
        "nom": "Crêpes",
        "image": "images/crepes.jpg",
        "prepTime": "10 min",
        "cookTime": "20 min",
        "quantité": "Environ 15-20 crêpes",
        "categorie": "desserts",
        "ingredientGroups": {
            "Ingrédients": [
                "290 g de farine",
                "4 œufs",
                "700 ml de lait froid",
                "1 pincée de sel",
                "80 g de sucre",
                "2 sachets de sucre vanillé",
                "2 c. à s. d’huile",
                "40 ml d'eau tiède (optionnel, pour une pâte plus fluide)"
            ]
        },
        "ustensiles": [
            "Saladier",
            "Fouet",
            "Poêle à crêpes",
            "Louche",
            "Spatule",
            "Mixeur plongeant (optionnel)"
        ],
        "instructions": [
            "Dans un saladier, mélanger la farine, le sucre et le sel. Ajouter les œufs et fouetter en incorporant progressivement le lait pour éviter les grumeaux.",
            "Ajouter l'huile et l'eau et fouetter jusqu'à obtenir une pâte lisse et fluide. Si des grumeaux persistent, passer un coup de mixeur plongeant.",
            "Laisser reposer 30 minutes à température ambiante : la pâte se détend et les crêpes seront plus souples.",
            "Chauffer une poêle à crêpes avec une noisette de beurre. Verser une louche de pâte, incliner la poêle pour bien la répartir en fine couche.",
            "Cuire 1 à 2 minutes jusqu'à ce que les bords se décollent et que le dessous soit doré, retourner et cuire encore 30-60 secondes. Empiler les crêpes et couvrir de papier alu pour les garder moelleuses."
        ]
    },
    {
        "id": 32,
        "nom": "Matcha Brown Sugar",
        "image": "images/matcha_brown_sugar.jpg",
        "prepTime": "5 min",
        "cookTime": "0 min",
        "quantité": "1 verre",
        "categorie": "boissons",
        "ingredientGroups": {
            "Ingrédients": [
                "1 c. à c. de matcha",
                "2 c. à s. de sucre brun",
                "lait",
                "Glace (optionnel)"
            ]
        },
        "ustensiles": [
            "Petite casserole",
            "Bol pour le matcha",
            "Fouet à matcha ou mini fouet",
            "Grand verre",
            "Cuillère"
        ],
        "instructions": [
            "Dans une petite casserole, chauffer le sucre brun avec 1 à 2 cuillères à soupe d'eau jusqu'à obtenir un sirop épais et brillant. Laisser tiédir.",
            "Tamiser le matcha dans un bol pour éviter les grumeaux. Ajouter quelques cuillères d'eau chaude (non bouillante) et fouetter jusqu'à obtenir une pâte lisse sans grumeaux.",
            "Dans un grand verre, verser le matcha dilué, ajouter 1 à 2 cuillères de sirop brun selon votre goût sucré, puis compléter avec le lait bien froid.",
            "Mélanger à la cuillère ou au fouet à lait. Ajouter des glaçons si souhaité et servir immédiatement."
        ]
    },
    {
        "id": 33,
        "nom": "Cookies",
        "image": "images/cookies.jpg",
        "prepTime": "10 min",
        "cookTime": "12 min",
        "quantité": "Environ 15-20 cookies",
        "categorie": "dessert",
        "ingredientGroups": {
            "Ingrédients": [
                "120 g beurre mou",
                "100 g sucre blanc",
                "80 g sucre roux",
                "1 œuf",
                "220 g farine",
                "1 c. à café levure chimique",
                "1 pincée de sel",
                "150 g pépites de chocolat"
            ]
        },
        "ustensiles": [
            "Saladier",
            "Fouet ou spatule",
            "Plaque de cuisson",
            "Papier cuisson",
            "Cuillère à glace ou cuillère à soupe"
        ],
        "instructions": [
            "Préchauffer le four à 180°C. Tapisser une plaque de papier cuisson.",
            "Dans un bol, mélanger le beurre mou et les deux sucres au fouet ou à la spatule jusqu'à texture crémeuse et plus claire (2-3 minutes).",
            "Ajouter l'œuf et mélanger jusqu'à ce qu'il soit bien incorporé.",
            "Ajouter la farine, la levure et le sel. Mélanger juste jusqu'à ce qu'on ne voie plus de farine (ne pas trop travailler pour garder le moelleux).",
            "Incorporer les pépites de chocolat en quelques tours de spatule.",
            "Former des boules de pâte (30-40 g), les déposer espacées sur la plaque et les aplatir légèrement avec la paume.",
            "Cuire 10 à 12 minutes : les bords doivent à peine dorer et le centre rester pâle. Ils durcissent en refroidissant. Laisser sur la plaque 5 minutes puis transférer sur grille."
        ]
    },
    {
        "id": 34,
        "nom": "Crème au Beurre",
        "image": "images/creme_au_beurre.jpg",
        "prepTime": "10 min",
        "cookTime": "0 min",
        "quantité": "400 ml",
        "categorie": "crème",
        "ingredientGroups": {
            "Ingrédients": [
                "200 g beurre mou",
                "300 g sucre glace",
                "1 c. à café vanille",
                "2 c. à soupe de lait"
            ]
        },
        "ustensiles": [
            "Bol",
            "Batteur ou fouet",
            "Spatule"
        ],
        "instructions": [
            "Placer le beurre mou dans un bol et le fouetter 2-3 minutes jusqu'à ce qu'il devienne pâle et très crémeux.",
            "Ajouter le sucre glace en plusieurs fois en fouettant à vitesse moyenne pour l'incorporer sans faire voler de poudre.",
            "Ajouter la vanille et le lait, puis fouetter encore 2 minutes jusqu'à texture légère, lisse et brillante.",
            "Utiliser immédiatement pour garnir/napper ou conserver au frais (ramollir quelques minutes avant usage)."
        ]
    },
    {
        "id": 35,
        "nom": "Meringue Suisse",
        "image": "images/meringue_suisse.jpg",
        "prepTime": "10 min",
        "cookTime": "5 min",
        "quantité": "200 ml",
        "categorie": "crème",
        "ingredientGroups": {
            "Ingrédients": [
                "2 blancs d’œufs",
                "120 g sucre"
            ]
        },
        "ustensiles": [
            "Casserole pour bain-marie",
            "Bol inox ou verre",
            "Thermomètre de cuisson",
            "Batteur",
            "Spatule"
        ],
        "instructions": [
            "Mettre les blancs d'œufs et le sucre dans un bol résistant à la chaleur (inox ou verre).",
            "Poser le bol sur une casserole d'eau frémissante sans que le fond touche l'eau. Fouetter sans arrêt jusqu'à 50-55°C : le sucre doit être totalement dissous (frotter entre les doigts, plus de grains).",
            "Retirer du bain-marie et fouetter au batteur électrique à vitesse moyenne puis rapide jusqu'à refroidissement complet. La meringue doit être brillante, ferme et former des pics qui se tiennent."
        ]
    },
    {
        "id": 36,
        "nom": "Pâte à Choux",
        "image": "images/pate_a_choux.jpg",
        "prepTime": "10 min",
        "cookTime": "25 min",
        "quantité": "Environ 20-25 choux",
        "categorie": "pâte",
        "ingredientGroups": {
            "Ingrédients": [
                "125 ml eau",
                "125 ml lait",
                "100 g beurre",
                "1 pincée de sel",
                "150 g farine",
                "4 œufs"
            ]
        },
        "ustensiles": [
            "Casserole",
            "Spatule en bois",
            "Poche à douille",
            "Plaque et papier cuisson"
        ],
        "instructions": [
            "Dans une casserole, porter à ébullition l'eau, le lait, le beurre et le sel.",
            "Retirer du feu, ajouter la farine en une seule fois et mélanger énergiquement avec une spatule jusqu'à ce qu'une boule se forme.",
            "Remettre sur feu doux 1 minute en écrasant la pâte pour la dessécher : un léger film se forme au fond de la casserole.",
            "Transférer dans un bol, laisser tiédir 5 minutes. Ajouter les œufs un à un en mélangeant bien entre chaque jusqu'à obtenir une pâte lisse, brillante et qui retombe en ruban de la spatule.",
            "Mettre en poche, dresser les choux sur plaque, dorer si souhaité. Cuire 25 minutes à 180°C sans ouvrir le four pour éviter qu'ils ne retombent."
        ]
    },
    {
        "id": 38,
        "nom": "Coques de Macarons",
        "image": "images/macarons.jpg",
        "prepTime": "20 min",
        "cookTime": "15 min",
        "quantité": "Environ 30-40 coques",
        "categorie": "dessert",
        "ingredientGroups": {
            "Ingrédients": [
                "150 g sucre glace",
                "150 g poudre d’amandes",
                "2 blancs d’œufs",
                "120 g sucre",
                "Colorant alimentaire (optionnel)"
            ]
        },
        "ustensiles": [
            "Mixeur ou robot",
            "Tamis",
            "Casserole pour bain-marie",
            "Bol",
            "Spatule",
            "Poche à douille lisse",
            "Plaques et tapis silicone ou papier cuisson"
        ],
        "instructions": [
            "Mixer ensemble sucre glace et poudre d'amandes, puis tamiser pour obtenir une poudre fine.",
            "Réaliser une meringue suisse : chauffer les blancs et le sucre au bain-marie à 50-55°C en fouettant jusqu'à dissolution du sucre, puis monter au batteur jusqu'à pics fermes et brillants. Ajouter le colorant si souhaité.",
            "Incorporer en 2-3 fois le tant pour tant tamisé à la meringue. Macaronner : mélanger en écrasant et soulevant la pâte jusqu'à obtenir un ruban lisse et brillant qui retombe en traçant une nappe.",
            "Mettre en poche avec douille lisse. Dresser des cercles réguliers sur une plaque recouverte de papier cuisson ou tapis silicone.",
            "Tapoter légèrement la plaque pour lisser, puis laisser croûter 20 à 30 minutes à l'air libre jusqu'à ce que la surface ne colle plus au doigt.",
            "Cuire 13 à 15 minutes à 150°C (chaleur tournante). Laisser refroidir complètement avant de décoller."
        ]
    },
    {
        "id": 39,
        "nom": "Ganache Framboise pour Macarons",
        "image": "images/ganache_framboise.jpg",
        "prepTime": "10 min",
        "cookTime": "2 min",
        "quantité": "Pour environ 15-20 macarons",
        "categorie": "crème",
        "ingredientGroups": {
            "Ingrédients": [
                "120 g chocolat blanc",
                "60 g crème liquide",
                "40 g purée de framboise",
                "10 g beurre (optionnel)"
            ]
        },
        "ustensiles": [
            "Casserole",
            "Bol",
            "Spatule",
            "Mixeur plongeant (optionnel)",
            "Film alimentaire"
        ],
        "instructions": [
            "Chauffer la crème jusqu'aux premiers frémissements (sans faire bouillir).",
            "La verser en trois fois sur le chocolat blanc haché en mélangeant bien à chaque ajout jusqu'à obtenir une ganache lisse.",
            "Ajouter la purée de framboise, mélanger jusqu'à homogénéité.",
            "Incorporer le beurre mou pour apporter du fondant et de la brillance.",
            "Filmer au contact et réfrigérer au moins 1 heure avant de garnir les macarons."
        ]
    },
    {
        "id": 40,
        "nom": "Gâteau Marbré Moelleux",
        "image": "images/gateau_marbre.jpg",
        "prepTime": "15 min",
        "cookTime": "45 min",
        "quantité": "8-10 parts",
        "categorie": "dessert",
        "ingredientGroups": {
            "Ingrédients": [
                "150 g beurre",
                "150 g sucre",
                "3 œufs",
                "200 g farine",
                "1 sachet levure",
                "1 c. à café vanille",
                "100 g de chocolat fondu"
            ]
        },
        "ustensiles": [
            "Moule à cake",
            "Saladier",
            "Fouet",
            "Spatule",
            "Couteau pour marbrage"
        ],
        "instructions": [
            "Préchauffer le four à 180°C. Beurrer et fariner un moule à cake.",
            "Fouetter le beurre mou et le sucre jusqu'à texture crémeuse. Ajouter les œufs un à un en fouettant bien entre chaque pour garder un mélange lisse.",
            "Ajouter la farine et la levure tamisées, mélanger juste assez pour homogénéiser.",
            "Diviser la pâte en deux. Parfumer une moitié à la vanille, ajouter le chocolat fondu ou cacao dans l'autre moitié et bien mélanger.",
            "Alterner les couches de pâte vanille et cacao dans le moule. Passer une lame de couteau en zigzag dans la pâte pour créer le motif marbré.",
            "Cuire 40 à 45 minutes. Un cure-dent doit ressortir propre. Laisser tiédir 10 minutes puis démouler sur grille."
        ]
    },
    {
        "id": 41,
        "nom": "Gâteau Yaourt",
        "image": "images/gateaux_yaourt.jpg",
        "prepTime": "5 min",
        "cookTime": "30-40 min",
        "quantité": "6-8 parts",
        "categorie": "desserts",
        "ingredientGroups": {
            "Ingrédients": [
                "3 œufs",
                "2 pots de yaourt",
                "2 pots de sucre",
                "2 pots de farine",
                "1 pot d'huile neutre",
                "2/3 du pot de lait",
                "1 sachet levure chimique",
                "1 sachet sucre vanillé (optionnel)",
                "Beurre pour beurrer le moule",
                "Sucre glace pour la décoration"
            ]
        },
        "ustensiles": [
            "Saladier",
            "Fouet",
            "1 pot de yaourt vide pour les mesures",
            "Moule à gâteau"
        ],
        "instructions": [
            "Préchauffer le four à 180°C. Beurrer le moule à gâteau.",
            "Dans un saladier, mélanger les œufs avec les 2 pots de yaourt, ajoutez 2 pots de sucre et fouetter jusqu'à obtenir un mélange clair et mousseux.",
            "Verser 1 pot d'huile neutre et mélanger pour l'incorporer.",
            "Ajouter 2/3 du pot de lait et mélanger délicatement.",
            "Rajouter 2 pots de farine, le sachet de levure chimique, puis le sachet de sucre vanillé (optionnel) mélanger bien.",
            "Verser la pâte dans le moule beurré.",
            "Enfourner 35 minutes à 180°C jusqu'à ce qu'un cure-dent planté au centre ressort sec ou légèrement humide.",
            "Laisser refroidir le gâteau avant de le démouler.",
            "Une fois refroidi, saupoudrer généreusement de sucre glace pour la décoration."
        ]
    },
    {
        "id": 42,
        "nom": "Pain perdu",
        "image": "images/pain_perdu.png",
        "prepTime": "10 min",
        "cookTime": "10 min",
        "quantité": "6-8 tranches",
        "categorie": "desserts",
        "ingredientGroups": {
            "Ingrédients": [
                "6 à 8 tranches de pain rassis (pain, pain de mie ou brioche)",
                "2 œufs",
                "25 cl de lait",
                "40 g de sucre",
                "1 sachet de sucre vanillé (ou 1 c. à café d'extrait de vanille)",
                "20 g de beurre pour la cuisson",
                "Optionnel : cannelle, sucre glace, sirop d'érable"
            ]
        },
        "ustensiles": [
            "Saladier",
            "Fouet",
            "Poêle",
            "Spatule",
            "Assiette"
        ],
        "instructions": [
            "Dans un saladier, fouetter les œufs avec le sucre, le sucre vanillé et le lait jusqu'à obtenir un mélange homogène.",
            "Tremper rapidement chaque tranche de pain dans le mélange (ne pas les laisser se déliter).",
            "Faire chauffer une poêle à feu moyen avec un peu de beurre.",
            "Cuire les tranches 2 à 3 minutes par face jusqu'à ce qu'elles soient dorées et légèrement caramélisées.",
            "Servir chaud avec sucre glace, cannelle ou sirop d'érable selon vos envies."
        ]
    }
];

function slugify(value: string) { return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
function categoryFor(value: string) {
    const category = value.toLowerCase();
    if (category.includes("asiatique")) return "Desserts asiatiques";
    if (category.includes("boisson") || category.includes("sirop") || category.includes("caf\u00e9 glac\u00e9") || category.includes("cafe glace") || category.includes("matcha brown sugar") || category.includes("tapioca")) return "Boissons";
    if (category.includes("boudoir")) return "G\u00e2teaux & desserts";
    if (category.includes("pate") || category.includes("p\u00e2te")) return "P\u00e2tes";
    if (category.includes("cr\u00e8me") || category.includes("creme") || category.includes("mascarpone")) return "Cr\u00e8mes";
    return "G\u00e2teaux & desserts";
}
function flattenIngredients(recipe: { ingredientGroups?: Record<string, string[] | undefined>; ingredients?: string[] }) {
    if (recipe.ingredientGroups) return Object.entries(recipe.ingredientGroups).flatMap(([group, items]) => !items ? [] : group === "Ingr\u00e9dients" ? items : items.map((item) => group + ": " + item));
    return recipe.ingredients ?? [];
}

export const recipes: Recipe[] = sourceRecipes.map((recipe) => ({
    slug: slugify(recipe.nom), title: recipe.nom, category: categoryFor(recipe.nom + " " + (recipe.categorie ?? "desserts")),
    image: imageBase + recipe.image, description: "Une recette maison Sweetly \u00e0 d\u00e9couvrir dans la cat\u00e9gorie " + categoryFor(recipe.nom + " " + (recipe.categorie ?? "desserts")).toLowerCase() + ".",
    prep: recipe.prepTime ?? "Non indiqu\u00e9", bake: recipe.cookTime ?? "Non indiqu\u00e9", servings: recipe["quantit\u00e9"] ?? "Non indiqu\u00e9",
    ingredients: flattenIngredients(recipe), utensils: recipe.ustensiles ?? [], instructions: recipe.instructions ?? [],
}));

export function getRecipe(slug: string) { return recipes.find((recipe) => recipe.slug === slug); }
