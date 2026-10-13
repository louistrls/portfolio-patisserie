/**
 * Étapes du parcours, de la plus récente (ou la plus lointaine dans le futur)
 * à la plus ancienne. L'ordre du tableau = l'ordre d'affichage.
 *
 * Pour ajouter une étape : copie un objet ci-dessous et modifie ses valeurs.
 *
 * CHAMPS OBLIGATOIRES
 * - date, title, subtitle, description : tes textes, affichés tels quels.
 *
 * CHAMPS OPTIONNELS (omets-les si tu n'en as pas besoin)
 * - id        : identifiant sans espace. Sert aux liens depuis la frise
 *               (parcours.html#etape-<id>).
 * - icon      : coeur | toque | ordinateur | travail | diplome.
 * - logo      : { src, alt }.
 * - tags      : ["Formation"], ["Expérience"], ["Apprentissage", "Expérience"]…
 *               Chaque tag devient un badge ET un filtre. Le PREMIER tag
 *               décide de la couleur de l'étape dans la frise et de sa piste
 *               ("Formation" = piste Études, les autres = piste Travail).
 * - start/end : "AAAA-MM". Précisent la place de l'étape sur la frise. Si tu
 *               les omets, le site lit le champ `date` ("Août 2026 - Août 2027",
 *               "2024 - 2026"…). `open: true` = étape sans fin connue (objectif
 *               lointain, la barre s'estompe).
 * - duration  : écrase la durée calculée automatiquement ("1 an", "3 ans"…).
 * - place     : lieu, affiché sous le titre.
 * - short     : libellé court sur la frise ("BUT Info", "CAP"…).
 * - takeaway  : « Ce que j'en retiens » (« Ce que j'en attends » pour une
 *               étape à venir). Une ou deux phrases.
 * - creations : liste d'id de js/creations-data.js. Affiche les vignettes
 *               « Réalisations liées », qui ouvrent la fiche de la création.
 * - testimonial : { text, author, role } — le témoignage de ton maître
 *               d'apprentissage. S'affiche UNIQUEMENT s'il est rempli.
 * - photos    : [{ src, alt }] — photos de l'étape (3 max). S'affichent
 *               UNIQUEMENT si elles sont renseignées.
 *
 * ÉTAPES À VENIR : une étape dont le début est postérieur à aujourd'hui passe
 * toute seule en pointillés (« Objectif »), et le repère « Vous êtes ici »
 * se place automatiquement entre le futur et le présent. Rien à mettre à jour
 * à la main quand le temps passe.
 *
 * Les lignes marquées BROUILLON sont des textes provisoires à réécrire.
 */

const TIMELINE = [
  // ===== ÉTAPES À VENIR (objectifs : dates indicatives) =====
  {
    id: "btm",
    date: "À partir de 2029",
    title: "Le Brevet Technique des Métiers",
    subtitle: "Brevet technique des métiers (BTM) - établissement à définir",
    icon: "diplome",
    tags: ["Formation"],
    start: "2029-09",
    open: true,
    short: "BTM",
    // BROUILLON : à réécrire avec tes mots
    description:
      "Une fois mes certificats de spécialisation en poche, je vise le brevet technique des métiers pour consolider l'ensemble de mes acquis et atteindre le niveau de maîtrise d'un artisan accompli. La suite reste volontairement ouverte : je préfère bien faire chaque étape avant de me projeter plus loin.",
    takeaway: "Devenir un artisan complet, capable un jour de diriger un laboratoire et de transmettre à son tour." // BROUILLON
  },
  {
    id: "cs-paris",
    date: "2027 - 2029",
    title: "Les Certificats de Spécialisation à Paris",
    subtitle: "Dessert de restaurant & pâtisserie de boutique - grandes maisons parisiennes",
    icon: "toque",
    tags: ["Formation"],
    start: "2027-09",
    end: "2029-06",
    duration: "2 ans",
    place: "Paris",
    short: "CS",
    // BROUILLON : à réécrire avec tes mots
    description:
      "Une fois le CAP en poche, cap sur Paris pour viser de grandes boutiques et emmagasiner un maximum de compétences. Deux spécialisations complémentaires : le dessert de restaurant, pour le dressage et la création à l'assiette, et la pâtisserie de boutique, pour la rigueur, la régularité et le volume.",
    takeaway: "Me confronter aux meilleures maisons pour apprendre vite, du dessert à l'assiette à la vitrine de boutique." // BROUILLON
  },
  // ===== PRÉSENT ET PASSÉ =====
    {
    date: "Septembre 2026",
    id: "choix-cap",
    tags: ["Formation"],
    start: "2026-09",
    end: "2027-06",
    duration: "1 an",
    place: "Lille (59)",
    short: "CAP",
    creations: ["buffetLHIL", "cakestartcitr"], // BROUILLON : à ajuster
    takeaway: "On peut changer de voie sans renier d'où l'on vient : la rigueur de l'informaticien est devenue mon meilleur outil en laboratoire.", // BROUILLON
    title: "Le choix de l'artisanat",
    subtitle: "Le virage vers le CAP Pâtissier - Lycée Hôtelier International de Lille (59)",
    icon: "coeur",
    logo: {src: "images/logo_lhil-lille.webp", alt: "Logo LHIL"},
    description:
      "C'est sur le terrain qu'est née ma certitude : j'ai besoin du lien humain direct, de créer de mes mains et d'apporter une satisfaction immédiate à travers un produit concret. La pâtisserie combine cet amour du partage avec mon besoin permanent d'amélioration technique."
    },
    {
    date: "Août 2026 - Août 2027",
    id: "apprentissage",
    tags: ["Apprentissage", "Expérience"],
    start: "2026-08",
    end: "2027-08",
    duration: "1 an",
    place: "Wavrin (59)",
    short: "Apprentissage",
    creations: ["tuttifraise2", "fraisiers", "tartelettesfruits", "babarhum"], // BROUILLON : à ajuster
    takeaway: "La régularité vient de la répétition : une semaine en vitrine m'apprend plus que n'importe quelle théorie.", // BROUILLON
    // testimonial: { text: "…", author: "…", role: "Maître d'apprentissage, Boulangerie Pâtisserie MAËS" }, // À remplir vers la fin du CAP (le bloc n'apparaît que s'il est renseigné)
    title: "Apprentissage",
    subtitle: "Boulangerie Pâtisserie MAËS - Wavrin (59)",
    icon: "toque",
    description:
      "Depuis fin août 2026, j'apprends le métier sur le terrain, entouré d'une équipe formidable qui me transmet ses techniques pour gagner en rapidité et en précision. Je m'occupe de la mise en vitrine (tartelettes, éclairs, religieuses, tartes cuites) et je me perfectionne progressivement sur le montage de certains entremets — fraisier, lady, merveilleux — ainsi que sur leur décor : nappage de fruits, finitions en chocolat. Un quotidien exigeant que je vis avec un vrai épanouissement."
  },
  {
    date: "Avril 2026 - Juillet 2026",
    id: "erasmus",
    tags: ["Formation", "Expérience"],
    start: "2026-04",
    end: "2026-07",
    place: "Coimbra et Porto, Portugal",
    short: "Erasmus",
    takeaway: "Une solution n'a de valeur que si elle sert vraiment sur le terrain : en informatique comme en pâtisserie, tout se juge à l'usage.", // BROUILLON
    title: "Le Stage Erasmus de Deuxième Année",
    subtitle: "Instituto Superior de Engenharia de Coimbra, Portugal",
    icon: "ordinateur",
    logo: { src: "images/isec_logo.webp", alt: "Logo de l'ISEC" },
    description:
      "Dans le cadre de mon stage à l'étranger, j'ai eu la chance de travailler pour un entrepôt de maintenance ferroviaire situé à Porto. Ma mission consistait à développer un modèle de deep-learning depuis mon université d'accueil à Coimbra capable de détecter en temps réel des composants de pantographes, afin de réduire les erreurs de supervision humaines. L'enjeu principal était de trouver un compromis entre puissance de calcul et poids du modèle afin de pouvoir l'implémenter sur smartphone, puis sur lunettes à réalité augmentée à l'avenir."
  },
  {
    date: "2024 - 2026",
    id: "but",
    tags: ["Formation"],
    start: "2024-09",
    end: "2026-07",
    duration: "2 ans",
    place: "Villeneuve d'Ascq (59)",
    short: "BUT Info",
    takeaway: "Décomposer, tester, corriger : la méthode que j'applique aujourd'hui à chaque recette.", // BROUILLON
    title: "La rigueur algorithmique",
    subtitle: "BUT Informatique - IUT A de Lille, Villeneuve d'Ascq (59)",
    icon: "ordinateur",
    logo: { src: "images/IUTA_logo.webp", alt: "Logo de l'IUT A de Lille" },
    description:
      "L'apprentissage de la logique de programmation m'a transmis une compétence fondamentale : la méthode. Concevoir une architecture logicielle ou structurer une recette de pâtisserie demande la même précision chirurgicale, où chaque étape influe directement sur le résultat final."
  },
  {
    date: "Octobre 2022 - Août 2026",
    id: "mcdo",
    tags: ["Expérience"],
    start: "2022-10",
    end: "2026-08",
    place: "Hallennes-lez-Haubourdin (59)",
    short: "McDonald's",
    takeaway: "Tenir le rythme, rester rigoureux et transmettre : c'est là que j'ai compris que j'aimais transmettre autant que faire.", // BROUILLON
    title: "Mon premier contact avec le monde du travail",
    subtitle: "Équipier polyvalent & Formateur - McDonald's Hallennes-Lez-Haubourdin (59)",
    icon: "travail",
    logo: { src: "images/mcdo_logo.webp", alt: "Logo McDonald's" },
    description:
      "Plus de trois années passées à gérer le stress des périodes de forte affluence, l'endurance physique et le respect absolu des normes d'hygiène strictes. En tant que formateur, j'y ai développé un sens aigu de la cohésion d'équipe et de la transmission. Cette étape de ma carrière a joué un rôle décisif dans mon choix d'orientation future."
  },
  {
    date: "2021 - 2024",
    id: "bac",
    tags: ["Formation"],
    start: "2021-09",
    end: "2024-06",
    duration: "3 ans",
    place: "Beaucamps-Ligny (59)",
    short: "Bac",
    takeaway: "Une culture scientifique solide, et l'anglais comme porte ouverte sur le monde.", // BROUILLON
    title: "Lycée Privé Sainte-Marie Beaucamps-Ligny",
    subtitle: "Baccalauréat Général - Mention Bien & Mention Européenne",
    icon: "diplome",
    logo: { src: "images/SMB_logo.webp", alt: "Logo du Lycée Sainte-Marie Beaucamps-Ligny" },
    description:
      "Spécialités : Sciences de la Vie et de la Terre - Mathématiques - Numérique et Sciences de l'Informatique - Section Euro Anglais Physique Chimie"
  }
];

/**
 * Chiffres clés affichés en haut de la page parcours.html.
 * Purement éditorial (pas de calcul automatique) : mets à jour les
 * valeurs toi-même si ta situation change.
 */
const HIGHLIGHTS = [
  { value: "3 ans", label: "d'expérience terrain en restauration rapide" },
  { value: "1 an", label: "pour décrocher le CAP pâtissier" },
  { value: "2 univers", label: "informatique et pâtisserie, une même exigence" }
];