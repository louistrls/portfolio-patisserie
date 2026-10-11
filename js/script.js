/* Longueur maximale de l'aperçu de description affiché sur une carte,
   avant de basculer sur "Découvrir ma création" pour lire la suite. */
const APERCU_MAX_LONGUEUR = 110;

/* Couleur de badge par tag. Ajoute une ligne ici quand tu inventes un
   nouveau tag dans js/creations-data.js si tu veux qu'il ait sa propre
   couleur ; sinon il prendra --color-accent par défaut. Les valeurs
   pointent vers les variables déclarées dans :root (css/style.css). */
const TAG_COLORS = {
  "Entremets": "var(--badge-entremets)",
  "Pâte à choux": "var(--badge-choux)",
  "Verrines & Desserts à l'assiette": "var(--badge-verrines)",
  "Créations fruitées": "var(--badge-fruitees)",
  "Gâteaux de voyage": "var(--badge-voyage)",
  "Pâtes levées": "var(--badge-levees)",
  "Petits fours": "var(--badge-petits-fours)",
  "Fonçage": "var(--badge-foncage)",
  "Apprentissage": "var(--badge-apprentissage)"
};
const DEFAULT_BADGE_COLOR = "var(--color-accent)";

/* Tags dont la couleur de fond est claire : le texte du badge passe en
   foncé (classe .badge--light) pour rester lisible. Si tu ajoutes une
   couleur claire dans TAG_COLORS, ajoute aussi son tag ici. */
const LIGHT_BADGE_TAGS = [
  "Pâte à choux",
  "Créations fruitées",
  "Gâteaux de voyage",
  "Petits fours",
  "Fonçage"
];

function colorForTag(tag) {
  return TAG_COLORS[tag] || DEFAULT_BADGE_COLOR;
}

/* Fabrique un badge de tag (utilisé par les cartes de créations ET par
   les cartes de l'accueil, pour que les deux restent identiques). */
function createBadge(tag) {
  const badge = document.createElement("span");
  badge.className = "badge";
  if (LIGHT_BADGE_TAGS.includes(tag)) badge.classList.add("badge--light");
  badge.textContent = tag;
  badge.style.backgroundColor = colorForTag(tag);
  return badge;
}

/* Réglages de l'accueil — voir la section "Accueil" plus bas. */
const HOME_TEASER_COUNT = 4;   // nombre de cartes "Mes dernières créations"
const HOME_HERO_COUNT = 3;     // nombre de photos qui défilent dans le hero
const HOME_HERO_DELAY = 6500;  // durée d'affichage d'une photo (ms)
/* Pour choisir toi-même les créations mises en avant (au lieu des plus
   récentes), liste leurs id ici, ex. ["fraisiers", "flancoco"].
   Laisse [] pour le mode automatique. */
const HOME_FEATURED_IDS = [];

/* Section "Ma progression" : laisse vide pour un choix automatique (première
   création vs plus récente de la même famille), ou force des id précis. */
const PROGRESS_FROM_ID = "";
const PROGRESS_TO_ID = "";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initHamburger();
  renderGallery();
  renderTimeline();
  renderHighlights();
  renderHero();
  renderCreationsTeaser();
  renderProgress();
  initFadeIn();
  initDetailsModal();
  initCopyEmail();
});

/* ----------------------------------------------------------------------
 * En-tête : ombre + avatar réduit dès qu'on défile, et barre de progression
 * de lecture. Tout est injecté ici : aucun changement de HTML nécessaire.
 * (La hauteur de l'en-tête ne change pas, donc la page ne "saute" pas.)
 * ------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector("header");
  if (!header) return;

  const bar = document.createElement("span");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  header.appendChild(bar);

  let waiting = false;
  const update = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("is-scrolled", y > 24);
    bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    waiting = false;
  };

  window.addEventListener("scroll", () => {
    if (!waiting) {
      waiting = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ----------------------------------------------------------------------
 * Menu mobile (hamburger)
 * Reste compatible avec le markup existant (div.hamburger) présent sur
 * les autres pages du site : aucune modification de index.html /
 * parcours.html n'est nécessaire pour que ce script continue de marcher.
 * ------------------------------------------------------------------- */
function initHamburger() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (!hamburger || !navLinks) return;

  // Amélioration progressive de l'accessibilité sans toucher au HTML existant.
  hamburger.setAttribute("role", "button");
  hamburger.setAttribute("tabindex", "0");
  hamburger.setAttribute("aria-expanded", "false");

  const toggle = () => {
    const isOpen = navLinks.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  };

  hamburger.addEventListener("click", toggle);
  hamburger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  });
}

/* ----------------------------------------------------------------------
 * Galerie : filtres + cartes, générés depuis CREATIONS (js/creations-data.js)
 * ------------------------------------------------------------------- */
function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid || typeof CREATIONS === "undefined") return;

  updateCount();
  renderFilters();

  grid.innerHTML = "";
  CREATIONS.forEach((creation) => grid.appendChild(buildCard(creation)));
}

function updateCount() {
  const countEl = document.getElementById("gallery-count");
  if (!countEl) return;
  const n = CREATIONS.length;
  countEl.textContent = `${n} création${n > 1 ? "s" : ""} documentée${n > 1 ? "s" : ""}`;
}

function renderFilters() {
  const filterBar = document.getElementById("filter-bar");
  if (!filterBar) return;

  const allTags = CREATIONS.flatMap((c) => c.tags || []);
  const uniqueTags = [...new Set(allTags)];

  filterBar.innerHTML = "";
  filterBar.appendChild(createFilterButton("Tout voir", "all", true));
  uniqueTags.forEach((tag) => filterBar.appendChild(createFilterButton(tag, tag, false)));

  filterBar.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter-btn");
    if (!btn) return;
    filterBar.querySelectorAll(".filter-btn").forEach((b) => {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    applyFilter(btn.dataset.filter);
  });
}

function createFilterButton(label, value, active) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "filter-btn" + (active ? " is-active" : "");
  btn.dataset.filter = value;
  btn.setAttribute("aria-pressed", String(active));
  btn.textContent = label;
  return btn;
}

function applyFilter(value) {
  document.querySelectorAll(".creation-card").forEach((card) => {
    const cardTags = card.dataset.tags.split("|");
    const show = value === "all" || cardTags.includes(value);
    card.style.display = show ? "" : "none";
  });
}

function buildCard(creation) {
  const article = document.createElement("article");
  article.className = "creation-card fade-in";
  article.dataset.tags = creation.tags ? creation.tags.join("|") : "";

  article.appendChild(buildMedia(creation));
  article.appendChild(buildBody(creation));

  return article;
}

function buildMedia(creation) {
  const mediaBtn = document.createElement("button");
  mediaBtn.type = "button";
  mediaBtn.className = "creation-media";
  mediaBtn.dataset.creationId = creation.id;
  mediaBtn.setAttribute("aria-label", `Voir les détails de ${creation.title}`);

  const img = document.createElement("img");
  img.src = creation.images[0].src;
  img.alt = creation.images[0].alt || creation.title;
  img.loading = "lazy";
  mediaBtn.appendChild(img);

  if (creation.images.length > 1) {
    const count = document.createElement("span");
    count.className = "media-count";
    count.textContent = `+${creation.images.length - 1}`;
    mediaBtn.appendChild(count);
  }

  return mediaBtn;
}

function buildBody(creation) {
  const body = document.createElement("div");
  body.className = "creation-body";

  const meta = document.createElement("div");
  meta.className = "creation-meta";

  if (creation.tags) {
    creation.tags.forEach((tag) => meta.appendChild(createBadge(tag)));
  }

  const date = document.createElement("span");
  date.className = "creation-date";
  date.textContent = creation.date;
  meta.append(date);

  const title = document.createElement("h2");
  title.textContent = creation.title;

  const desc = document.createElement("p");
  desc.className = "creation-desc";
  desc.textContent = previewText(creation.description, APERCU_MAX_LONGUEUR);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn-decouvrir";
  btn.textContent = "Découvrir ma création";
  btn.setAttribute("aria-label", `Découvrir « ${creation.title} »`);
  btn.dataset.creationId = creation.id;

  body.append(meta, title, desc, btn);
  return body;
}

/* Tronque un texte à ~limit caractères sans couper au milieu d'un mot. */
function previewText(text, limit) {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return cut.slice(0, lastSpace > 0 ? lastSpace : limit) + "…";
}

/* ----------------------------------------------------------------------
 * Timeline (parcours.html) : rendue depuis TIMELINE (js/parcours-data.js).
 * Ne fait rien sur les pages qui n'ont pas ce conteneur (creations.html).
 * ------------------------------------------------------------------- */

/* Icônes par type d'étape. Trait simple, une seule couleur (currentColor)
   pour rester cohérent quel que soit l'accent choisi dans :root. */
const ICONS = {
  coeur:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 5c-2.5 4.65-9.5 9-9.5 9z"/></svg>',
  toque:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 9a4 4 0 0 1 2-6.5A4 4 0 0 1 12 3a4 4 0 0 1 3 -0.5A4 4 0 0 1 17 9"/><path d="M6 9h12v3a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9z"/><path d="M9 16v4h6v-4"/></svg>',
  ordinateur:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></svg>',
  travail:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="7" width="18" height="13" rx="1.5"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  diplome:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>'
};

function renderTimeline() {
  const container = document.getElementById("timeline-container");
  if (!container || typeof TIMELINE === "undefined") return;

  container.innerHTML = "";
  TIMELINE.forEach((step, index) => container.appendChild(buildTimelineItem(step, index)));
}

function buildTimelineItem(step, index) {
  const item = document.createElement("div");
  item.className = "timeline-item fade-in";
  // Apparition en cascade : chaque étape suit la précédente avec un léger
  // décalage plutôt que d'apparaître toutes en même temps au scroll.
  item.style.transitionDelay = `${Math.min(index * 100, 400)}ms`;

  if (step.icon && ICONS[step.icon]) {
    const icon = document.createElement("span");
    icon.className = "timeline-icon";
    icon.innerHTML = ICONS[step.icon];
    icon.setAttribute("aria-hidden", "true");
    item.appendChild(icon);
  }

  const date = document.createElement("div");
  date.className = "timeline-date";
  date.textContent = step.date;

  const content = document.createElement("div");
  content.className = "timeline-content";

  if (step.logo) {
    const logo = document.createElement("img");
    logo.className = "timeline-logo";
    logo.src = step.logo.src;
    logo.alt = step.logo.alt || "";
    content.appendChild(logo);
  }

  const title = document.createElement("h3");
  title.textContent = step.title;

  const subtitle = document.createElement("h4");
  subtitle.textContent = step.subtitle;

  const desc = document.createElement("p");
  desc.textContent = step.description;

  content.append(title, subtitle, desc);
  item.append(date, content);
  return item;
}

/* Chiffres clés (parcours.html ET accueil). Ne fait rien si le conteneur
   ou les données n'existent pas (creations.html, par exemple). Sur
   l'accueil (variante .highlights-bar--home), chaque chiffre apparaît en
   cascade au scroll. */
function renderHighlights() {
  const bar = document.getElementById("highlights");
  if (!bar || typeof HIGHLIGHTS === "undefined") return;

  const isHome = bar.classList.contains("highlights-bar--home");

  bar.innerHTML = "";
  HIGHLIGHTS.forEach((h, index) => {
    const item = document.createElement("div");
    item.className = "highlight-item";
    if (isHome) {
      item.classList.add("fade-in");
      item.style.transitionDelay = `${index * 120}ms`;
    }

    const value = document.createElement("span");
    value.className = "highlight-value";
    value.textContent = h.value;

    const label = document.createElement("span");
    label.className = "highlight-label";
    label.textContent = h.label;

    item.append(value, label);
    bar.appendChild(item);
  });
}

/* ----------------------------------------------------------------------
 * Accueil (index.html) : diaporama du hero + teaser des dernières créations.
 *
 * "Dernières" = les plus récentes PAR DATE (champ `date` de chaque création,
 * ex. "septembre 2026"), et non par position dans le tableau CREATIONS :
 * tu peux donc ranger js/creations-data.js dans l'ordre que tu veux (ex.
 * plus récentes en premier, pour la page Créations) sans fausser l'accueil.
 * Quand plusieurs créations ont le même mois, c'est leur ordre dans le
 * fichier qui départage : la plus haute dans le fichier passe en premier.
 * Pour forcer un choix à la main, remplis HOME_FEATURED_IDS (en haut).
 * ------------------------------------------------------------------- */
const MOIS_FR = {
  "janvier": 1, "février": 2, "fevrier": 2, "mars": 3, "avril": 4, "mai": 5,
  "juin": 6, "juillet": 7, "août": 8, "aout": 8, "septembre": 9,
  "octobre": 10, "novembre": 11, "décembre": 12, "decembre": 12
};

/* "septembre 2026" -> nombre comparable (année * 12 + mois). 0 si illisible. */
function dateToNumber(text) {
  if (!text) return 0;
  const parts = String(text).toLowerCase().trim().split(/\s+/);
  const year = parseInt(parts[parts.length - 1], 10);
  if (Number.isNaN(year)) return 0;
  const month = parts.length > 1 ? MOIS_FR[parts[0]] || 0 : 0;
  return year * 12 + month;
}

function getHomeCreations(count) {
  if (typeof CREATIONS === "undefined" || CREATIONS.length === 0) return [];

  const withPhoto = (c) => c.images && c.images.length > 0;

  if (HOME_FEATURED_IDS.length > 0) {
    return HOME_FEATURED_IDS
      .map((id) => CREATIONS.find((c) => c.id === id))
      .filter((c) => c && withPhoto(c))
      .slice(0, count);
  }

  return CREATIONS
    .map((creation, index) => ({ creation, index, score: dateToNumber(creation.date) }))
    .filter((entry) => withPhoto(entry.creation))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, count)
    .map((entry) => entry.creation);
}

function renderHero() {
  const frame = document.getElementById("hero-frame");
  const slidesBox = document.getElementById("hero-slides");
  const caption = document.getElementById("hero-caption");
  const dotsBox = document.getElementById("hero-dots");
  if (!frame || !slidesBox) return;

  const items = getHomeCreations(HOME_HERO_COUNT);
  if (items.length === 0) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const auto = HOME_FEATURED_IDS.length === 0;

  const slides = items.map((creation, i) => {
    const photo = creation.images[0];
    const img = document.createElement("img");
    img.className = "hero-slide";
    img.src = photo.src;
    img.alt = photo.alt || creation.title;
    img.decoding = "async";
    if (i > 0) img.loading = "lazy";
    slidesBox.appendChild(img);
    return img;
  });

  const dots = [];
  let current = -1;
  let timer = null;

  function show(index) {
    if (index === current) return;
    const previous = slides[current];
    if (previous) {
      previous.classList.remove("is-active");
      previous.classList.add("is-leaving");
      setTimeout(() => previous.classList.remove("is-leaving"), 1400);
    }
    const next = slides[index];
    next.classList.remove("is-leaving");
    next.classList.add("is-active");
    slides.forEach((s, i) => s.setAttribute("aria-hidden", String(i !== index)));
    dots.forEach((d, i) => d.setAttribute("aria-current", String(i === index)));

    const creation = items[index];
    if (caption) {
      const label = auto && index === 0 ? "Dernière création" : "À la une";
      caption.replaceChildren();
      const labelEl = document.createElement("span");
      labelEl.className = "hero-caption-label";
      labelEl.textContent = label;
      caption.append(labelEl, document.createTextNode(creation.title));
      caption.href = `creations.html#${creation.id}`;
    }
    current = index;
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function start() {
    if (slides.length < 2 || reduceMotion) return;
    stop();
    timer = setInterval(() => {
      if (!document.hidden) show((current + 1) % slides.length);
    }, HOME_HERO_DELAY);
  }

  if (slides.length > 1 && dotsBox) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero-dot";
      dot.setAttribute("aria-label", `Voir la photo ${i + 1} sur ${slides.length}`);
      // Un clic manuel arrête le défilement automatique (accessibilité).
      dot.addEventListener("click", () => {
        stop();
        show(i);
      });
      dots.push(dot);
      dotsBox.appendChild(dot);
    });
  }

  if (slides.length === 1) frame.classList.add("hero-frame--single");

  show(0);
  start();
}

function renderCreationsTeaser() {
  const grid = document.getElementById("creations-teaser");
  if (!grid) return;

  grid.innerHTML = "";
  getHomeCreations(HOME_TEASER_COUNT).forEach((creation, index) => {
    const card = buildTeaserCard(creation);
    card.style.setProperty("--stagger", `${index * 90}ms`);
    grid.appendChild(card);
  });
}

function buildTeaserCard(creation) {
  const link = document.createElement("a");
  link.className = "teaser-card fade-in";
  // Le lien cible LA création cliquée : creations.html ouvre sa fiche.
  link.href = `creations.html#${creation.id}`;
  link.setAttribute("aria-label", `Découvrir « ${creation.title} »`);

  const media = document.createElement("div");
  media.className = "teaser-media";
  const img = document.createElement("img");
  img.src = creation.images[0].src;
  img.alt = creation.images[0].alt || creation.title;
  img.loading = "lazy";
  media.appendChild(img);

  const body = document.createElement("div");
  body.className = "teaser-body";

  const meta = document.createElement("div");
  meta.className = "teaser-meta";
  if (creation.tags && creation.tags[0]) meta.appendChild(createBadge(creation.tags[0]));
  if (creation.date) {
    const date = document.createElement("span");
    date.className = "creation-date";
    date.textContent = creation.date;
    meta.appendChild(date);
  }

  const title = document.createElement("h3");
  title.textContent = creation.title;

  body.append(meta, title);
  link.append(media, body);
  return link;
}

/* ----------------------------------------------------------------------
 * Accueil : "Ma progression" — compare ta toute première création à la
 * plus récente de la même famille (même tag), avec le temps écoulé.
 *
 * Choix automatique :
 *   - départ  = la création la plus ancienne (par date) ;
 *   - arrivée = la plus récente qui partage au moins un tag avec elle
 *               (ex. ton premier entremets -> ton dernier entremets),
 *               sinon la plus récente tout court.
 * Pour forcer un choix, renseigne PROGRESS_FROM_ID / PROGRESS_TO_ID en haut
 * du fichier. Si aucune paire n'est possible, la section disparaît.
 * ------------------------------------------------------------------- */
function sharesTag(a, b) {
  return (a.tags || []).some((tag) => (b.tags || []).includes(tag));
}

/* Ignore les textes vides ou encore à écrire ("///", "À compléter…"). */
function usableText(text) {
  const t = String(text || "").trim();
  if (t.length < 12 || t.includes("///") || /^à compléter/i.test(t)) return "";
  return t;
}

function formatDuration(months) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} an${years > 1 ? "s" : ""}`);
  if (rest) parts.push(`${rest} mois`);
  return parts.join(" et ");
}

function getProgressPair() {
  if (typeof CREATIONS === "undefined") return null;

  const entries = CREATIONS
    .map((creation, index) => ({ creation, index, score: dateToNumber(creation.date) }))
    .filter((e) => e.score > 0 && e.creation.images && e.creation.images.length > 0);
  if (entries.length < 2) return null;

  const byId = (id) => entries.find((e) => e.creation.id === id);

  // Les plus anciennes d'abord ; à date égale, la plus basse dans le fichier
  // (le fichier range les plus récentes en premier).
  const oldestFirst = [...entries].sort((a, b) => a.score - b.score || b.index - a.index);
  const newestFirst = [...entries].sort((a, b) => b.score - a.score || a.index - b.index);

  const from = (PROGRESS_FROM_ID && byId(PROGRESS_FROM_ID)) || oldestFirst[0];

  let to = PROGRESS_TO_ID && byId(PROGRESS_TO_ID);
  if (!to) {
    const later = newestFirst.filter((e) => e !== from && e.score > from.score);
    to = later.find((e) => sharesTag(e.creation, from.creation)) || later[0];
  }
  if (!to || to.score <= from.score) return null;

  return { from, to, months: to.score - from.score };
}

function renderProgress() {
  const section = document.getElementById("progress");
  const box = document.getElementById("progress-compare");
  if (!section || !box) return;

  const pair = getProgressPair();
  if (!pair) {
    section.remove(); // pas assez de données : on n'affiche pas de bloc vide
    return;
  }

  const gap = document.createElement("div");
  gap.className = "progress-gap fade-in";
  gap.setAttribute("aria-hidden", "true");
  const pill = document.createElement("span");
  pill.className = "progress-pill";
  pill.textContent = formatDuration(pair.months);
  gap.appendChild(pill);

  box.append(
    buildProgressCard(pair.from.creation, "from"),
    gap,
    buildProgressCard(pair.to.creation, "to")
  );

  const note = document.getElementById("progress-note");
  if (note) {
    note.textContent = `${formatDuration(pair.months)} séparent ces deux créations. Chaque pièce de la galerie raconte une étape de ce chemin.`;
  }
}

function buildProgressCard(creation, role) {
  const link = document.createElement("a");
  link.className = `progress-card progress-card--${role} fade-in`;
  link.href = `creations.html#${creation.id}`;
  link.setAttribute("aria-label", `Découvrir « ${creation.title} »`);

  const media = document.createElement("div");
  media.className = "progress-media";
  const img = document.createElement("img");
  img.src = creation.images[0].src;
  img.alt = creation.images[0].alt || creation.title;
  img.loading = "lazy";
  const chip = document.createElement("span");
  chip.className = "progress-chip";
  chip.textContent = role === "from" ? "Au début" : "Aujourd'hui";
  media.append(img, chip);

  const body = document.createElement("div");
  body.className = "progress-body";

  const date = document.createElement("span");
  date.className = "progress-date";
  date.textContent = creation.date;

  const title = document.createElement("h3");
  title.textContent = creation.title;

  body.append(date, title);

  // Citation du bilan : ce qui restait à travailler au départ, ce qui
  // fonctionne aujourd'hui. Omise tant que le texte n'est pas rédigé.
  const reflection = creation.reflection || {};
  const quote = usableText(role === "from" ? reflection.axes : reflection.positif);
  if (quote) {
    const q = document.createElement("p");
    q.className = "progress-quote";
    const label = document.createElement("strong");
    label.textContent = role === "from" ? "À travailler à l'époque : " : "Ce qui fonctionne aujourd'hui : ";
    q.append(label, document.createTextNode(previewText(quote, 150)));
    body.appendChild(q);
  }

  link.append(media, body);
  return link;
}

/* ----------------------------------------------------------------------
 * Apparition douce au scroll. Respecte prefers-reduced-motion via le CSS.
 * ------------------------------------------------------------------- */
function initFadeIn() {
  const els = document.querySelectorAll(".fade-in");

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  els.forEach((el) => observer.observe(el));
}

/* ----------------------------------------------------------------------
 * Modale de détails : ouverte par un clic sur la photo (.creation-media)
 * OU sur le bouton "Découvrir ma création" (.btn-decouvrir) — les deux
 * pointent vers la même modale (l'ancienne lightbox séparée faisait
 * doublon avec cette pop-up, elle a été retirée).
 * ------------------------------------------------------------------- */
function initDetailsModal() {
  const modal = document.getElementById("details-modal");
  if (!modal || typeof CREATIONS === "undefined") return;

  const modalContent = document.getElementById("modal-body-content");
  const closeBtn = modal.querySelector(".modal-close");
  let lastFocused = null;

  function open(creation, triggerEl) {
    const imagesHtml = creation.images
      .map((img) => `<img src="${img.src}" alt="${img.alt || creation.title}" class="modal-gallery-img">`)
      .join("");

    const techHtml = creation.technique
      .map((t) => `<li><strong>${t.label} : </strong>${t.value}</li>`)
      .join("");

    modalContent.innerHTML = `
      <div class="modal-layout">
        <div class="modal-media">
          ${imagesHtml}
        </div>
        <div class="modal-text">
          <h2 style="margin-top:0;">${creation.title}</h2>
          <p class="creation-desc">${creation.description}</p>
          <ul class="tech-list">${techHtml}</ul>
          <div class="creation-reflection" style="margin-top: 20px;">
            <h3>Bilan & axes de progression</h3>
            <p><strong>Ce qui a fonctionné : </strong>${creation.reflection.positif}</p>
            <p><strong>À travailler la prochaine fois : </strong>${creation.reflection.axes}</p>
          </div>
        </div>
      </div>
    `;

    lastFocused = triggerEl;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    // Déclenche la transition d'ouverture au repaint suivant (on ne peut
    // pas animer depuis "hidden", donc on retire l'attribut avant d'ajouter
    // la classe qui porte la transition).
    requestAnimationFrame(() => modal.classList.add("is-open"));
    closeBtn.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function close() {
    modal.classList.remove("is-open");
    document.removeEventListener("keydown", onKeydown);
    document.body.style.overflow = "";
    // On attend la fin de la transition CSS (200ms) avant de vraiment
    // masquer la modale, pour que la fermeture soit animée elle aussi.
    setTimeout(() => {
      modal.hidden = true;
    }, 200);
    if (lastFocused) lastFocused.focus();
  }

  function onKeydown(event) {
    if (event.key === "Escape") close();
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".creation-media, .btn-decouvrir");
    if (trigger) {
      const creation = CREATIONS.find((c) => c.id === trigger.dataset.creationId);
      if (creation) open(creation, trigger);
      return;
    }

    if (event.target.classList.contains("modal-close") || event.target === modal) {
      close();
    }
  });

  // Lien direct depuis l'accueil (creations.html#id) : on ouvre la fiche.
  const hashId = decodeURIComponent(window.location.hash.slice(1));
  if (hashId) {
    const creation = CREATIONS.find((c) => c.id === hashId);
    const trigger = document.querySelector(`.creation-media[data-creation-id="${CSS.escape(hashId)}"]`);
    if (creation && trigger) {
      trigger.scrollIntoView({ block: "center" });
      open(creation, trigger);
    }
  }
}
/* ----------------------------------------------------------------------
 * Bouton "Copier l'adresse" (bande contact de l'accueil).
 * Utile quand aucun logiciel de messagerie n'est configuré : le lien
 * mailto: ne fait alors rien. Fonctionne en HTTPS (GitHub Pages) ; repli
 * sur execCommand si l'API Clipboard n'est pas disponible.
 * -------------------------------------------------------------------- */
function initCopyEmail() {
  const button = document.querySelector(".btn-copy");
  if (!button) return;
  const status = button.parentElement.querySelector(".copy-status");
  const label = button.textContent;
  let timer;

  function legacyCopy(text) {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    field.remove();
    return ok;
  }

  function feedback(ok) {
    clearTimeout(timer);
    button.textContent = ok ? "Copié !" : "Sélectionnez l'adresse";
    button.classList.toggle("is-copied", ok);
    if (status) status.textContent = ok ? "Adresse copiée dans le presse-papiers" : "";
    timer = setTimeout(() => {
      button.textContent = label;
      button.classList.remove("is-copied");
      if (status) status.textContent = "";
    }, 2200);
  }

  button.addEventListener("click", async () => {
    const text = button.dataset.copy;
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch (e) {
      ok = legacyCopy(text);
    }
    feedback(ok);
  });
}