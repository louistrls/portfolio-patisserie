/**
 * Données des créations du portfolio.
 *
 * Pour AJOUTER une nouvelle création : copie un objet ci-dessous, colle-le
 * dans le tableau, et modifie ses valeurs. Rien d'autre à toucher : la page
 * (filtres, grille, compteur, modale) se met à jour automatiquement.
 *
 * - id          : identifiant unique, sans espace (sert à ouvrir la modale)
 * - tags        : tableau de catégories. Une création peut en avoir plusieurs
 *                 (ex. ["Entremets", "Textures"]). Réutilise un tag existant
 *                 pour rejoindre un filtre déjà présent, ou invente-en un
 *                 nouveau : il apparaîtra automatiquement dans la barre de
 *                 filtres. Pour la couleur du badge, ajoute aussi une entrée
 *                 dans TAG_COLORS (js/script.js) sinon il prendra la couleur
 *                 par défaut.
 * - date        : à préciser toi-même pour montrer ta progression dans le
 *                 temps (mois en minuscule, ex. "avril 2025").
 * - images      : tableau d'objets {src, alt}. L'alt est obligatoire sur
 *                 CHAQUE image (y compris la 2e, 3e...), pas seulement la
 *                 première : c'est ce que lit un lecteur d'écran et ce qui
 *                 s'affiche si l'image ne charge pas.
 * - reflection  : la partie "bilan" — remplace les textes d'exemple par
 *                 ton propre retour d'expérience sur CETTE pièce.
 */

const CREATIONS = [
  {
    id: "macaronframboise",
    title: "Le Macaron Framboise Cardamome",
    tags: ["Entremets", "Créations fruitées"],
    date: "octobre 2026",
    images: [
      {
        src: "images/macaron_framboise2.webp",
        alt: "Visuel à la découpe"
      },
      {
        src: "images/macaron_framboise1.webp",
        alt: "Focus sur l'ensemble de l'entremets."
      }
    ],
    description:
      "",
    technique: [
      { label: "", value: "" },
      { label: "", value: "" },
      { label: "", value: "" }
    ],
    reflection: {
      positif: "",
      axes: ""
    }
  },
  {
    id: "buffetLHIL",
    title: "De retour au LHIL ! Préparation du buffet pour la finale des MOF !",
    tags: ["Apprentissage", "Gâteaux de voyage", "Petits fours"],
    date: "octobre 2026",
    images: [
      {
        src: "images/brownies.webp",
        alt: "Focus sur les brownies noix de pécan noisette."
      },
      {
        src: "images/rochers_coco.webp",
        alt: "Focus sur les rochers coco, recouverts de couverture noire sur la base."
      },
      {
        src: "images/sables_nougatine.webp",
        alt: "Focus sur les sablés diamants nougatine."
      },
      {
        src: "images/mini_entremets_choc.webp",
        alt: "Focus sur les mini entremets brownies ganache chocolat."
      },
      {
        src: "images/brownies.webp",
        alt: "Focus sur les brownies noix de pécan noisette"
      },
    ],
    description:
      "Pour ma deuxième semaine au LHIL, nous étions chargés de préparer les divers buffets destinés au candidat, élèves et jurys présents sur place à l'occasion de la finale des MOF en cuisine, services des arts de la table, sommellerie et barman. Des chaussons au pommes et aux tartes au sucre pour le petit déjeuner jusqu'à de minis entremets et gâteaux de voyage pour le reste de la journée !",
    technique: [
      { label: "", value: "" },
      { label: "", value: "" },
      { label: "", value: "" }
    ],
    reflection: {
      positif: "",
      axes: ""
    }
  },
  {
    id: "tuttifraise2",
    title: "Les tartes Tutti et Fraise 1 mois plus tard...",
    tags: ["Apprentissage", "Créations fruitées"],
    date: "octobre 2026",
    images: [
      {
        src: "images/tuttifraise.webp",
        alt: "Vue d'ensemble des tartes tutti et fraise de 6 personnes."
      },
      {
        src: "images/tarte_fraise.webp",
        alt: "Focus sur la tarte fraise"
      },
      {
        src: "images/tutti3.webp",
        alt: "Focus sur la tarte tutti"
      }
    ],
    description:
      "Après plus d'un mois d'apprentissage, voici ma progression sur le dressage et la décoration des tartes tutti et fraise.",
    technique: [
      { label: "Garnissage du fond de tarte", value: "Je tapisse généreusement le fond de crème pâtissière." },
      { label: "Entreposer les fruits", value: "Pour un meilleur rendu, je commence à entreposer les fruits de couleurs chaudes (abricot, pêche, clémentine, ananas) puis j'ajoute les fruits plus colorés (kiwi, fraise, pamplemousse) afin d'apporter un contraste visuel qui attire l'oeil." },
      { label: "Décoration", value: "Après avoir nappé, je saupoudre le tour de la tarte de neige décor, et entrepose divers fruits rouges sur le dessus de la tarte en finissant par le décor chocolat et l'écusson de l'enseigne !" }
    ],
    reflection: {
      positif: "Je commence à maîtriser plus amplement l'entreposage des fruits. Je trouve mes tartes encore plus belles qu'il y a un mois.",
      axes: "Il ne reste plus qu'à devenir plus efficace et rapide dans le dressage des tartes. Je suis sur la bonne voie !"
    }
  },
  {
    id: "tartepom",
    title: "La Tarte Aux Pommes Cannelle-Vanille",
    tags: ["Fonçage", "Créations fruitées"],
    date: "octobre 2026",
    images: [
      {
        src: "images/tarte_pom1.webp",
        alt: "Tarte aux pommes nappée et sucrée"
      },
    ],
    description:
      "Une tarte aux pommes parfumée à la cannelle et à la vanille, où le fond de pâte et la garniture doivent rester bien distincts : une pâte cuite et croustillante, une compote de pomme à la cannelle et des pommes fondantes qui gardent leur tenue. L'enjeu principal est un fonçage net et une cuisson homogène.",
    technique: [
      { label: "Fonçage", value: "Abaisse régulière de la pâte, puis fonçage dans le cercle en tassant bien les angles pour éviter tout pli et toute épaisseur irrégulière." },
      { label: "Garniture", value: "Pommes taillées de façon régulière et parfumées à la cannelle et à la vanille, pour une cuisson homogène sur toute la tarte." },
      { label: "Finition", value: "Nappage après cuisson pour un aspect brillant, puis saupoudrage de sucre pour le contraste visuel." }
    ],
    reflection: {
      positif: "La tarte est bien dorée et les pommes ont gardé leur tenue à la cuisson. Le parfum de cannelle et de vanille est présent sans masquer le goût du fruit.",
      axes: "Je trouve avoir réussi l'ensemble de la recette avec briau. C'est à ce jour mon meilleur fonçage et je suis très content du résultat final, gustativement et visuellement."
    }
  },
  {
    id: "tarteprun",
    title: "La Tarte Amandine aux Prunes Rouges",
    tags: ["Fonçage", "Créations fruitées"],
    date: "octobre 2026",
    images: [
      {
        src: "images/tarte_prun1.webp",
        alt: "Tarte amandine aux prunes nappée et sucrée"
      },
    ],
    description:
      "Une tarte amandine : une crème d'amandes cuite sur un fond de pâte, garnie ici de prunes rouges dont l'acidité vient équilibrer la douceur de l'amande. L'enjeu est de cuire la crème à cœur sans dessécher les fruits.",
    technique: [
      { label: "Fonçage", value: "Pâte foncée et piquée, puis garnie de crème d'amandes lissée pour une épaisseur régulière." },
      { label: "Disposition", value: "Prunes coupées en quartiers et disposées de façon régulière, légèrement enfoncées dans la crème pour qu'elles ne glissent pas à la cuisson." },
      { label: "Finition", value: "Nappage après cuisson et sucre pour un aspect brillant et gourmand." }
    ],
    reflection: {
      positif: "La crème d'amandes a bien gonflé et doré. Le contraste entre le doré de la crème et le rouge des prunes rend la tarte très appétissante, et l'acidité du fruit équilibre la douceur de l'amande.",
      axes: "Je trouve avoir réalisé un sans faute. Mon fonçage se perfectionne au fil du temps, je suis content de voir une once d'amélioration sur cet aspect."
    }
  },
  {
    id: "choucitrgian",
    title: "Les Énormes choux Citron-Gianduja",
    tags: ["Pâte à choux"],
    date: "septembre 2026",
    images: [
      {
        src: "images/chou_citrgian2.webp",
        alt: "Choux Citron-Gianduja, décorés et sucrés"
      },
      {
        src: "images/chou_citgian1.webp",
        alt: "Visuel des choux Citron-gianduja à la découpe"
      },
    ],
    description:
      "De gros choux garnis de citron et de gianduja, pour un mariage entre l'acidité du citron et la rondeur de la noisette chocolatée. L'enjeu est d'obtenir des choux bien gonflés, réguliers et croustillants malgré leur grand format.",
    technique: [
      { label: "Pâte à choux", value: "Dessèchement de la panade puis incorporation progressive des œufs jusqu'à une pâte lisse et brillante. Pochage de gros choux réguliers et entreposage d'un cercle de craquelin sur le dessus." },
      { label: "Cuisson", value: "Cuisson à four chaud sans ouvrir la porte pour un bon développement, puis séchage pour garder un chou croustillant." },
      { label: "Garniture", value: "Garnissage généreux au citron et au gianduja, puis décor et sucre pour la finition." }
    ],
    reflection: {
      positif: "Les choux sont bien gonflés et réguliers, et la coupe montre une garniture généreuse. L'association de l'acidité du citron et de la douceur du gianduja fonctionne bien.",
      axes: "Le calibre des choux reste un peu inégal d'une pièce à l'autre, la recette étant effectuée de base sur des choux au calibre plus petit. Tracer des cercles repères sur le papier cuisson permettrait de garantir un diamètre identique."
    }
  },
  {
    id: "tartepomrhu",
    title: "La Tarte Amandine Pomme Rhubarbe",
    tags: ["Fonçage", "Créations fruitées"],
    date: "septembre 2026",
    images: [
      {
        src: "images/tarte_pomrhu1.webp",
        alt: "Tarte amandine pomme rhubarbe nappée et sucrée"
      },
    ],
    description:
      "Une tarte amandine qui associe la douceur de la pomme à l'acidité franche de la rhubarbe, sur une crème d'amandes dorée. L'enjeu est de trouver l'équilibre entre le sucré et l'acide, et de cuire correctement deux fruits aux textures très différentes.",
    technique: [
      { label: "Fonçage", value: "Pâte foncée et piquée dans le cercle, puis garnie d'une couche régulière de crème d'amandes." },
      { label: "Garniture", value: "Pommes et rhubarbe taillées à la même épaisseur pour que la cuisson soit homogène malgré leurs textures différentes." },
      { label: "Cuisson", value: "Cuisson assez longue pour que la crème d'amandes soit cuite à cœur, tout en gardant la rhubarbe ferme, puis nappage et sucre en finition." }
    ],
    reflection: {
      positif: "L'équilibre entre le sucre de la pomme et l'acidité de la rhubarbe est réussi. Les teintes rosées et dorées donnent une tarte très appétissante.",
      axes: "La rhubarbe a un peu relâché d'eau à la cuisson. Il aurait fallu la faire dégorger avec un peu de sucre au préalable pour limiter l'humidité dans la tarte. Cela a un peu embêté sur la cuisson de la crème d'amande."
    }
  },
  {
    id: "babarhum",
    title: "Les Baba au Rhum",
    tags: ["Apprentissage"],
    date: "septembre 2026",
    images: [
      {
        src: "images/baba_rhum1.webp",
        alt: "Babas au Rhum imbibés, garnis et décorés de fruits rouges"
      },
    ],
    description:
      "Un grand classique de la pâtisserie : une pâte levée très aérée, imbibée d'un sirop au rhum, puis garnie de crème et de fruits rouges. L'enjeu est d'obtenir une mie alvéolée capable d'absorber le sirop sans s'effondrer.",
    technique: [
      { label: "Pâte levée", value: "Pétrissage long jusqu'à une pâte lisse et élastique qui se détache de la cuve, puis pointage et apprêt pour un bon développement." },
      { label: "Imbibage", value: "Babas trempés dans un sirop chaud parfumé au rhum, puis égouttés : la mie est gorgée de sirop mais garde sa tenue." },
      { label: "Garniture", value: "Un dernier imbibage au rhum, puis on garnit de crème pâtissière, d'ananas, de crème chantilly sans oublier la décoration finale aux fruits rouges et à la pipette." }
    ],
    reflection: {
      positif: "Les babas ont bien levé et se sont imbibés de façon homogène : la mie est moelleuse et parfumée, sans être détrempée.",
      axes: "Le pochage à la chantilly doit gagner en précision. Il doit être un poil plus large pour cacher les morceaux d'ananas à l'intérieur."
    }
  },
  {
    id: "cakestartcitr",
    title: "Les Cakes et Tartelettes Citron Meringuées",
    tags: ["Apprentissage", "Fonçage", "Gâteaux de voyage"],
    date: "septembre 2026",
    images: [
      {
        src: "images/cakes_citr1.webp",
        alt: "Cakes citrons meringués"
      },
      {
        src: "images/tart_citr1.webp",
        alt: "Tartelettes citron meringuées"
      },
    ],
    description:
      "Deux déclinaisons autour du citron meringué : un cake moelleux et des tartelettes garnies de crème au citron, toutes deux surmontées de meringue. L'enjeu est de maîtriser l'acidité de la crème et de réussir une meringue bien montée, colorée juste ce qu'il faut.",
    technique: [
      { label: "Fonçage", value: "Fonçage des tartelettes dans leurs cercles avec une pâte fine et régulière, cuite à blanc pour garder un fond croustillant." },
      { label: "Crème citron", value: "Crème au citron cuite et émulsionnée pour une texture lisse, bien acidulée et qui tient à la découpe." },
      { label: "Meringue", value: "Meringue italienne montée et pochée en vagues, puis colorée au chalumeau pour apporter du relief et du contraste." }
    ],
    reflection: {
      positif: "Le contraste entre la crème acidulée et la meringue sucrée est très réussi, et les vagues dorées attirent l'œil.",
      axes: "J'ai eu beaucoup de mal sur les fonçage des tartelettes. Il faut bien garder à l'esprit de travailler la pâte sucrée rapidement pour ne pas trop chauffer le beurre qui la compose, mais également de ne pas trop la fariner lors de l'abaisse pour ne pas la rendre cassante."
    }
  },
  {
    id: "fraisiers",
    title: "Les Fraisiers",
    tags: ["Apprentissage", "Entremets"],
    date: "septembre 2026",
    images: [
      {
        src: "images/fraisiers4.webp",
        alt: "Focus sur la déco du fraisier"
      },
      {
        src: "images/fraisiers1.webp",
        alt: "Fraisiers individuels"
      },
      {
        src: "images/fraisiers2.webp",
        alt: "Fraisiers de 4, 6 et 8 personnes"
      }
    ],
    description:
      "Le grand classique de l'entremets : biscuit, crème mousseline et fraises, réalisé en plusieurs formats (individuels, 4, 6 et 8 personnes). Il demande un montage précis, un bord régulier et un décor soigné.",
    technique: [
      { label: "Montage", value: "Fraises coupées en deux et plaquées contre le cercle, face coupée visible, pour un pourtour régulier et appétissant à la découpe." },
      { label: "Crème", value: "Crème mousseline lissée entre les couches de biscuit, sans vide ni bulle d'air, pour un entremets moelleux et bien rempli." },
      { label: "Décor", value: "Finitions soignées et décor adapté à chaque format, des individuels aux grands fraisiers." }
    ],
    reflection: {
      positif: "Les coupes sont propres et les fraises bien alignées sur le pourtour, ce qui donne un visuel très régulier. L'équilibre entre la crème, le biscuit et le fruit est agréable.",
      axes: "Le temps de montage reste long, surtout sur les grands formats. Pour gagner en rapidité, je dois mieux organiser mon poste : préparer toutes les fraises à l'avance et enchaîner les étapes dans le même ordre à chaque fois."
    }
  },
  {
    id: "flancoco",
    title: "Le Flan Pâtissier Coco",
    tags: ["Fonçage"],
    date: "septembre 2026",
    images: [
      {
        src: "images/flan_coco2.webp",
        alt: "autre point de vue du flan coco"
      },
      {
        src: "images/flan_coco1.webp",
        alt: "Flan coco"
      }
    ],
    description:
      "Un classique des vitrines de boulangerie-pâtisserie revisité à la noix de coco : un appareil onctueux cuit dans un fond de pâte. L'enjeu est d'obtenir une crème qui tient à la découpe sans être trop ferme, avec un dessus bien coloré..",
    technique: [
      { label: "Fonçage", value: "Fond de pâte foncé et piqué, cuit à blanc pour éviter qu'il ne s'humidifie sous l'appareil." },
      { label: "Appareil", value: "Lait parfumé à la noix de coco, lié aux œufs et à la poudre à crème, pour un appareil lisse et onctueux." },
      { label: "Cuisson", value: "Cuisson jusqu'à une belle coloration du dessus, puis refroidissement complet avant la découpe pour une tenue parfaite." }
    ],
    reflection: {
      positif: "La texture est onctueuse et bien prise, et le goût de coco est présent. Le dessus a pris une belle coloration.",
      axes: "Le fonçage laisse à désirer. Ce fut mon premier véritable fonçage à la maison. J'en relève de nombreux ajustements pour la suite : Réserver le cercle foncé au frais pour une belle tenue à la cuisson, appuyer un peu plus sur les bords avec la pâte pour éviter qu'elle ne se décolle."
    }
  },
  {
    id: "eclairschantilly",
    title: "Les Éclairs Vanille-Chantilly",
    tags: ["Pâte à choux"],
    date: "septembre 2026",
    images: [
      {
        src: "images/eclairs_chantilly.webp",
        alt: "Les Éclairs Chantilly fourrés à la crème pâtissière"
      }
    ],
    description:
      "Un classique de la pâte à choux : des éclairs fourrés à la crème pâtissière vanille et à la chantilly. L'enjeu est un pochage bien droit et régulier, un développement uniforme à la cuisson et un remplissage généreux.",
    technique: [
      { label: "Pochage", value: "Pochage d'éclairs de même longueur et de même épaisseur, pour une cuisson homogène." },
      { label: "Cuisson", value: "Cuisson à four chaud sans ouvrir la porte, puis séchage pour obtenir une coque fine et croustillante." },
      { label: "Garnissage", value: "Fourrage à la crème pâtissière vanille et à la chantilly, avec un remplissage généreux pour éviter les vides." }
    ],
    reflection: {
      positif: "Les éclairs sont bien gonflés avec une coque dorée. Le mélange de crème pâtissière et de chantilly donne un résultat à la fois onctueux et léger.",
      axes: "Je trouve avoir fait un sans faute sur le produit fini. J'ai dû quand même m'y reprendre à plusieurs fois à la cuisson pour obtenir un résultat satisfaisant."
    }
  },
  {
    id: "batonsmarechaux",
    title: "Les Bâtons de Maréchaux",
    tags: ["Gâteaux de voyage"],
    date: "septembre 2026",
    images: [
      {
        src: "images/batons_marechaux.webp",
        alt: "Les Bâtons de Maréchaux enrobés au chocolat noir tempéré."
      }
    ],
    description:
      "Un petit gâteau sec aux amandes, poché en bâtons puis enrobés de chocolat noir tempéré.",
    technique: [
      { label: "Pochage", value: "Pochage de bâtons de même longueur et de même épaisseur, recouverts d'amandes pour la texture et le visuel." },
      { label: "Cuisson", value: "Cuisson douce pour un biscuit sec et légèrement doré, sans coloration excessive." },
      { label: "Tempérage", value: "Chocolat noir tempéré pour l'enrobage : il doit être brillant et cassant. pour une tenue parfaite sur les bâtons." }
    ],
    reflection: {
      positif: "Le chocolat noir est bien tempéré : il est brillant et casse net. Le contraste entre le biscuit aux amandes et l'enrobage est très gourmand.",
      axes: "Mon pochage présentait quelques irrégularités. Certains bâtons étaient un poil plus long et fin que d'autres."
    }
  },
  {
    id: "tartelettesfruits",
    title: "Les Tartelettes Fraises et Tutti",
    tags: ["Apprentissage", "Créations fruitées"],
    date: "septembre 2026",
    images: [
      {
        src: "images/tutti2.webp",
        alt: "Tutti 4 personnes"
      },
      {
        src: "images/tartelettes1.webp",
        alt: "Résultat des tartelettes fraises et tutti en plateau"
      },
      {
        src: "images/tartelettes2.webp",
        alt: "Focus sur les tutti"
      },
      
      {
        src: "images/tartelettes3.webp",
        alt: "Focus sur les fraises"
      },
      {
        src: "images/detail1.webp",
        alt: "Point de vue sur le détail"
      }
    ],
    description:
      "Voici mes premières créations fruitées réalisées durant mon apprentissage en entreprise.",
    technique: [
      { label: "Garnissage du fond de tarte", value: "Pour les tartelettes individuelles, je garnis le fond de pâte à glacer ivoire. Ensuite, je tapisse généreusement le fond de crème pâtissière." },
      { label: "Entreposer les fruits", value: "Pour un meilleur rendu, je commence à entreposer les fruits de couleurs chaudes (abricot, pêche, clémentine, ananas) puis j'ajoute les fruits plus colorés (kiwi, fraise, pamplemousse) afin d'apporter un contraste visuel qui attire l'oeil." },
      { label: "Décoration", value: "Après avoir nappé, je saupoudre le tour de la tarte de neige décor, et entrepose divers fruits rouges sur le dessus de la tarte en finissant par le décor chocolat et l'écusson de l'enseigne !" }
    ],
    reflection: {
      positif: "J'ai su rapidement maîtriser l'exercice. Mes tartes sont belles et donnent envie d'être dévorées !",
      axes: "Au début, je mettais un temps fou à finir ce qui m'était demandé. Je ne savais pas trop jauger la quantité de fruit qu'il me fallait pour le détail, donc je coupais les fruits au compte-goutte. Je prenais également trop de temps à réfléchir à l'agencement parfait des fruits. Mon maître d'apprentissage m'a ainsi montré comment faire confiance à sa fibre artistique plutôt qu'à son cerveau pour garnir les tartes rapidement et joliement."
    }
  },
  {
    id: "sablesdiamantcacao",
    title: "Les Sablés Diamant au Cacao",
    tags: ["Gâteaux de voyage"],
    date: "septembre 2026",
    images: [
      {
        src: "images/sables_diamant.webp",
        alt: "Sablés Diamant Cacao avec leur croûte de cassonade."
      }
    ],
    description:
      "Un petit four sec classique exigeant une texture ultra-friable en bouche. L'enjeu principal réside dans le façonnage régulier des boudins et la maîtrise de la découpe pour obtenir des cylindres parfaits.",
    technique: [
      { label: "Façonnage", value: "Réalisation d'un boudin parfaitement cylindrique et régulier, sans inclusion d'air, après un fraisage de la pâte contrôlé (pas plus de 2 fraisages)." },
      { label: "Froid", value: "Passage impératif au grand froid pour raidir la structure avant le détaillage au couteau." },
      { label: "Finition", value: "Dorure légère et roulage dans la cassonade pour l'aspect « diamant », puis découpe nette." }
    ],
    reflection: {
      positif: "La texture interne est excellente : la pâte n'a pas été trop corsée, le biscuit est très friable et fondant. Le contraste visuel et gustatif apporté par le sucre sur le pourtour est bien réparti.",
      axes: "La forme manque de régularité (aspect légèrement ovale). Le boudin s'est un peu écrasé lors de la découpe : il aurait fallu le laisser reposer plus longtemps au congélateur et tourner le boudin d'un quart de tour après chaque coup de couteau pour préserver sa rondeur parfaite."
    }
  },
  {
    id: "cakecitronpavot",
    title: "Le Fabuleux Cake Citron Pavot",
    tags: ["Gâteaux de voyage"],
    date: "septembre 2026",
    images: [
      {
        src: "images/cake_citron_pavot.webp",
        alt: "Cake Citron Pavot"
      }
    ],
    description:
      "L'incontournable gâteau de voyage, axé sur la conservation du moelleux dans le temps et le développement caractéristique d'une belle fente centrale.",
    technique: [
      { label: "Émulsion", value: "Incorporation des œufs dans la matière grasse sans trancher l'appareil." },
      { label: "Finition", value: "Imbibage au sirop à chaud pour garantir l'humidité et la longue conservation." }
    ],
    reflection: {
      positif: "L'imbibage au sirop de citron a parfaitement fonctionné, rendant la texture ultra-moelleuse tout en rehaussant le profil acide. Les graines de pavot sont bien suspendues dans la pâte.",
      axes: "J'aurais dû intégrer quelques graines de pavot sur la décoration finale afin de rappeler son intégration dès le premier coup d'oeil."
    }
  },
  {
    id: "nidabeille",
    title: "Le Nid d'Abeille",
    tags: ["Pâtes levées"],
    date: "août 2026",
    images: [
      {
        src: "images/nid_abeille2.webp",
        alt: "Nid d'Abeille"
      },
      {
        src: "images/nid_abeille1.webp",
        alt: "Nid d'Abeille, vue supplémentaire"
      }
    ],
    description:
      "Une pâte levée briochée riche, surmontée d'un croustillant miel amandes et d'un poudrage minutieux. Pochage à la crème diplomate entre les deux couches de pâte levée",
    technique: [
      { label: "Pétrissage", value: "Développement de la pâte pour une mie filante, moelleuse et bien alvéolée." },
      { label: "Fermentation", value: "Maîtrise des temps de pointage et d'apprêt à température contrôlée." },
      { label: "Garniture", value: "Intégration du topping croustillant sans dégazer ni faire retomber la pâte." }
    ],
    reflection: {
      positif: "Le moelleux de la mie a été préservé, et le mélange d'amandes effilées avec le sucre glace a apporté le contraste de texture, ainsi que l'aspect visuel classique recherchés.",
      axes: "La caramélisation de la couche aux amandes a été très rapide, c'est vite devenu très solide lors de la découpe. Elle n'est également pas répartie harmonieusement. La crème diplomate a un aspect visuel \"granuleux\" car j'ai monté ma crème liquide un poil trop longtemps. Je n'en ai pas fait assez pour garantir un résultat bien plus aérien à la dégustation."
    }
  },
  {
    id: "miniparisbrest",
    title: "Le Mini Paris-Brest revisité",
    tags: ["Pâte à choux"],
    date: "août 2026",
    images: [
      {
        src: "images/mini_pbrest1.webp",
        alt: "Mini Paris-Brest"
      },
      {
        src: "images/mini_pbrest2.webp",
        alt: "Mini Paris-Brest, vue supplémentaire"
      }
    ],
    description:
      "Le grand classique de la pâte à choux en format individuel. L'accent est mis sur le développement régulier du chou au four et le foisonnement optimal de la crème mousseline praliné. J'ai garni l'intérieur du chou de crème pâtissière, ajouté des noisettes concassées par dessus, puis terminé le montage par la rosace en crème mousseline praliné.",
    technique: [
      { label: "Pâte à choux", value: "Dessèchement de la panade et ajout de l'œuf pour une texture filante. Un peu de lait frais en finition pour une pâte onctueuse, brillante et lisse." },
      { label: "Crème", value: "Émulsion et foisonnement de la mousseline praliné pour un maximum de légèreté." },
      { label: "Montage", value: "Découpe régulière de la couronne et pochage généreux à la douille cannelée." }
    ],
    reflection: {
      positif: "Le pochage de la mousseline était régulier et texturé, offrant un beau volume visuel sans écraser la base du chou.",
      axes: "Le développement de la pâte lors de la cuisson a été un peu asymétrique. Il faudra veiller à pocher des couronnes d'épaisseur parfaitement égale et vérifier la répartition de la chaleur du four."
    }
  },
  {
    id: "mignardiseschocfraicitr",
    title: "L'Assortiment de Mignardises",
    tags: ["Petits fours"],
    date: "août 2026",
    images: [
      {
        src: "images/migna2.webp",
        alt: "Assortiment de Mignardises"
      },
      {
        src: "images/migna1.webp",
        alt: "Assortiment de Mignardises, vue supplémentaire"
      },
      {
        src: "images/tartelettes_citron.webp",
        alt: "Tartelettes au citron de l'assortiment de mignardises"
      }
    ],
    description:
      "Un travail de précision sur la miniature. La difficulté principale est d'obtenir une cuisson homogène et un pochage strictement identique pour chaque pièce afin d'assurer un rendu « vitrine ».",
    technique: [
      { label: "Pochage", value: "Maîtrise de la poche à douille pour un calibrage strict au millimètre." },
      { label: "Cuisson", value: "Gestion des temps de cuisson très courts et des chocs thermiques propres aux petits fours." },
      { label: "Finition", value: "Glaçage et décoration appliqués avec régularité sur l'ensemble de la production." }
    ],
    reflection: {
      positif: "La variété des textures et des goûts offre une belle dégustation. Les cuissons étaient parfaitement dorées et uniformes sur la plaque. J'ai également fait preuve d'adaptation sur le montage des fraisiers. N'ayant pas de petits cercles, j'ai utilisé les moules des 2 autres mignardises pour effectuer un montage alternatif (crème diplomate, fraises hachées à l'intérieur, génoise sur le dessus)",
      axes: "Le calibrage au pochage doit encore être perfectionné : certaines pièces présentaient une différence de diamètre, ce qui casse légèrement l'uniformité de l'assortiment. Mon glaçage pour les fraisiers présentait une texture de chewing-gum, ce qui n'était pas du tout le résultat attendu."
    }
  },
  {
    id: "watermeloncake",
    title: "Le Gâteau de Pastèque et ses fruits de saison",
    tags: ["Créations fruitées"],
    date: "juillet 2026",
    images: [
      {
        src: "images/watermelon.webp",
        alt: "Watermelon cake"
      }
    ],
    description:
      "Une approche rafraîchissante de l'assemblage fruitier, nécessitant une découpe chirurgicale.",
    technique: [
      { label: "Taille", value: "Découpe géométrique et régulière du cylindre de pastèque servant de base." },
      { label: "Décor", value: "Disposition minutieuse des fruits frais pour un volume harmonieux." }
    ],
    reflection: {
      positif: "La netteté de la découpe du fruit central a donné un visuel très régulier, sublimant la fraîcheur globale du dessert.",
      axes: "À compléter : qu'est-ce qui pourrait encore être amélioré sur cette réalisation ?"
    }
  },
  {
    id: "pannacotta",
    title: "La Panna Cotta mûres-myrtilles",
    tags: ["Verrines & Desserts à l'assiette"],
    date: "juillet 2026",
    images: [
      {
        src: "images/panna_cotta2.webp",
        alt: "Panna Cotta mûres-myrtilles"
      },
      {
        src: "images/panna_cotta1.webp",
        alt: "Panna Cotta mûres-myrtilles, vue supplémentaire"
      }
    ],
    description:
      "Un dessert à l'assiette jouant sur la légèreté de la crème et l'acidité des fruits rouges. L'enjeu technique réside dans l'obtention d'une texture tremblotante et fondante, sans excès de gélatine.",
    technique: [
      { label: "Appareil", value: "Crème infusée et collée avec précision pour éviter une texture caoutchouteuse." },
      { label: "Garniture", value: "Compotée mûres-myrtilles avec un équilibre sucre/acidité maîtrisé." },
      { label: "Visuel", value: "Coulage propre en verrine, sans traces sur les parois, et montage bicolore net. Décor myrtilles, fraises et feuilles de menthe." }
    ],
    reflection: {
      positif: "Excellente gestion du gélifiant, offrant une texture onctueuse qui ne fige pas en bouche. Le contraste visuel est très esthétique.",
      axes: "Le coulis aurait gagné à être très légèrement plus texturé (avec une pointe de pectine) pour éviter qu'il ne se mélange trop vite à la crème lors de la dégustation."
    }
  },
  {
    id: "cheesecake",
    title: "Le Cheesecake Contemporain Spéculoos",
    tags: ["Entremets"],
    date: "janvier 2026",
    images: [
      {
        src: "images/cheesecake1.webp",
        alt: "Cheesecake Spéculoos"
      },
      {
        src: "images/cheesecake2.webp",
        alt: "Cheesecake Spéculoos, vue supplémentaire"
      }
    ],
    description:
      "Une recherche d'équilibre en bouche basée sur l'opposition des textures, demandant une manipulation rigoureuse des températures de prise.",
    technique: [
      { label: "Base", value: "Biscuit sablé croustillant et compact." },
      { label: "Appareil", value: "Crème de fromage au spéculoos lissée, dense et parfaitement homogène." },
      { label: "Visuel", value: "Découpe nette témoignant de la bonne gestion du froid." }
    ],
    reflection: {
      positif: "Un régal ! Le jeu de texture est très agréable en bouche.",
      axes: "Le glaçage à la pâte de spéculoos est très inégal. J'aurais clairement dû le faire dans le moule pour éviter qu'il ne coule et le réserver juste après pour qu'il tienne."
    }
  },
  {
    id: "layer-cake",
    title: "Le Layer Cake d'anniversaire de couple !",
    tags: ["Entremets"],
    date: "avril 2025",
    images: [
      {
        src: "images/layer_cake_1_1.webp",
        alt: "Vue d'ensemble du Layer Cake, montage multi-couches et lissage des contours"
      }
    ],
    description:
      "Mon premier réel entremets. Composé de couches de génoises, d'une crème mascarpone vanille, d'une compotée de framboises, de fraises et framboises fraîches et masqué d'une crème au beurre chocolat blanc.",
    technique: [
      { label: "Maîtrise clé", value: "Montage et équilibre structurel."},
      { label: "Finition", value: "Lissage net des contours à la spatule coudée. Écriture et détails au cornet."}
    ],
    reflection: {
      positif: "Gustativement parlant, le layer cake était très harmonieux. Le chocolat blanc et les fruits rouges se marient très bien ensemble. Structurellement, l'entremet était solidement monté et assez compact pour qu'il tienne en place",
      axes: "Le lissage est à revoir. Par manque de matériel (cercle à entremets, rhodoïd) je n'ai pu assurer un lissage propre. La décoration du layer cake est très pauvre. Une décoration de fruits frais et de chocolat blanc sur le tour aurait été judicieux pour montrer visuellement la composition de l'entremet sans avoir à le découper."
    }
  }  
];