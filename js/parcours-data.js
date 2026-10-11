/**
 * Étapes du parcours, de la plus récente à la plus ancienne.
 *
 * Pour ajouter une étape : copie un objet ci-dessous et modifie ses valeurs.
 * - logo est optionnel : omets-le si l'étape n'a pas de logo associé.
 */

const TIMELINE = [
    {
    date: "Septembre 2026",
    title: "Le choix de l'artisanat",
    subtitle: "Le virage vers le CAP Pâtissier - Lycée Hôtelier International de Lille (59)",
    icon: "coeur",
    logo: {src: "images/logo_lhil-lille.webp", alt: "Logo LHIL"},
    description:
      "C'est sur le terrain qu'est née ma certitude : j'ai besoin du lien humain direct, de créer de mes mains et d'apporter une satisfaction immédiate à travers un produit concret. La pâtisserie combine cet amour du partage avec mon besoin permanent d'amélioration technique."
    },
    {
    date: "Août 2026 - Août 2027",
    title: "Apprentissage",
    subtitle: "Boulangerie Pâtisserie MAËS - Wavrin (59)",
    icon: "toque",
    description:
      "Depuis fin août 2026, j'apprends le métier sur le terrain, entouré d'une équipe formidable qui me transmet ses techniques pour gagner en rapidité et en précision. Je m'occupe de la mise en vitrine (tartelettes, éclairs, religieuses, tartes cuites) et je me perfectionne progressivement sur le montage de certains entremets — fraisier, lady, merveilleux — ainsi que sur leur décor : nappage de fruits, finitions en chocolat. Un quotidien exigeant que je vis avec un vrai épanouissement."
  },
  {
    date: "Avril 2026 - Juillet 2026",
    title: "Le Stage Erasmus de Deuxième Année",
    subtitle: "Instituto Superior de Enghenaria de Coimbra, Portugal",
    icon: "ordinateur",
    logo: { src: "images/IUTA_logo.webp", alt: "Logo de l'IUT A de Lille" },
    description:
      "Dans le cadre de mon stage à l'étranger, j'ai eu la chance de travailler pour un entrepôt de maintenance ferroviaire situé à Porto. Ma mission consistait à développer un modèle de deep-learning capable de détecter en temps réel des composants de pantographes, afin de réduire les erreurs de supervision humaines. L'enjeu principal était de trouver un compromis entre puissance de calcul et poids du modèle afin de pouvoir l'implémanter sur smartphone, puis sur lunettes à réalité augmentée à l'avenir."
  },
  {
    date: "2024 - 2026",
    title: "La rigueur algorithmique",
    subtitle: "BUT Informatique - IUT A de Lille, Villeneuve d'Ascq (59)",
    icon: "ordinateur",
    logo: { src: "images/IUTA_logo.webp", alt: "Logo de l'IUT A de Lille" },
    description:
      "L'apprentissage de la logique de programmation m'a transmis une compétence fondamentale : la méthode. Concevoir une architecture logicielle ou structurer une recette de pâtisserie demande la même précision chirurgicale, où chaque étape influe directement sur le résultat final."
  },
  {
    date: "Octobre 2022 - Août 2026",
    title: "Mon premier contact avec le monde du travail",
    subtitle: "Équipier polyvalent & Formateur - McDonald's Hallennes-Lez-Haubourdin (59)",
    icon: "travail",
    logo: { src: "images/mcdo_logo.webp", alt: "Logo McDonald's" },
    description:
      "Plus de trois années passées à gérer le stress des périodes de forte affluence, l'endurance physique et le respect absolu des normes d'hygiène strictes. En tant que formateur, j'y ai développé un sens aigu de la cohésion d'équipe et de la transmission. Cette étape de ma carrière a joué un rôle décisif dans mon choix d'orientation future."
  },
  {
    date: "2021 - 2024",
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