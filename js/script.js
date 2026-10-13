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
  renderFrise();
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
 * Parcours (parcours.html) : frise « En un coup d'œil » + timeline détaillée,
 * rendues depuis TIMELINE (js/parcours-data.js). Ne font rien sur les pages
 * qui n'ont pas ces conteneurs. Tout ce qui dépend de la date du jour
 * (étapes à venir, « Vous êtes ici », durées) est calculé automatiquement.
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

/* Petites icônes de la ligne « durée · lieu » */
const META_ICONS = {
  duree:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  lieu:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>'
};

/* Nombre maximal de vignettes « Réalisations liées » par étape. */
const TIMELINE_MAX_VIGNETTES = 5; // réalisations liées affichées par étape

/* Ordre des filtres ; les tags inconnus passent après. */
const TIMELINE_FILTER_ORDER = ["Formation", "Expérience", "Apprentissage"];

/* Couleurs des tags du parcours (en plus de celles des créations). */
TAG_COLORS["Formation"] = "var(--badge-formation)";
TAG_COLORS["Expérience"] = "var(--badge-experience)";

/* --- Dates : tout est converti en « indice de mois » (année * 12 + mois - 1) --- */
function monthIndex(year, month) {
  return year * 12 + (month - 1);
}

function parseYearMonth(text) {
  const m = /^(\d{4})-(\d{1,2})$/.exec(String(text || "").trim());
  return m ? monthIndex(Number(m[1]), Number(m[2])) : null;
}

/* Repli quand start/end sont absents : lit le texte ("Août 2026", "2024").
   Une année seule désigne une année scolaire : septembre → juin. */
function parseDatePart(part, asEnd) {
  const words = String(part || "").toLowerCase().trim().split(/\s+/);
  const year = parseInt(words[words.length - 1], 10);
  if (Number.isNaN(year)) return null;
  const month = words.length > 1 ? MOIS_FR[words[0]] : null;
  return monthIndex(year, month || (asEnd ? 6 : 9));
}

function getStepRange(step) {
  const parts = String(step.date || "").split(/\s+[-–—→]\s+/);
  const open = Boolean(step.open);
  let start = parseYearMonth(step.start);
  if (start === null) start = parseDatePart(parts[0], false);
  let end = open ? null : parseYearMonth(step.end);
  if (end === null && !open) end = parseDatePart(parts[parts.length - 1], true);
  if (start === null) return null;
  if (!open && (end === null || end < start)) end = start;
  return { start, end, open };
}

function getStepStatus(range, nowIdx) {
  if (range.start > nowIdx) return "future";
  if (range.open || range.end >= nowIdx) return "current";
  return "past";
}

function getStepDuration(step, range) {
  if (step.duration) return step.duration;
  if (range.open) return "";
  const months = range.end - range.start + 1;
  return months >= 2 ? formatDuration(months) : "";
}

function getYearLabel(range) {
  const first = Math.floor(range.start / 12);
  if (range.open) return `${first} →`;
  const last = Math.floor(range.end / 12);
  return first === last ? String(first) : `${first} – ${last}`;
}

function stepId(step, index) {
  return `etape-${step.id || index + 1}`;
}

function currentMonthIndex() {
  const now = new Date();
  return monthIndex(now.getFullYear(), now.getMonth() + 1);
}

/* Les données enrichies : une seule fois, partagées par frise et timeline. */
function getTimelineSteps() {
  if (typeof TIMELINE === "undefined") return [];
  const nowIdx = currentMonthIndex();
  return TIMELINE.map((step, index) => {
    const range = getStepRange(step);
    return {
      step,
      index,
      range,
      domId: stepId(step, index),
      status: range ? getStepStatus(range, nowIdx) : "past",
      tags: step.tags && step.tags.length ? step.tags : []
    };
  });
}

function formatMonthYear(monthIdx) {
  const names = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  return `${names[monthIdx % 12]} ${Math.floor(monthIdx / 12)}`;
}

function cssTagColor(tag) {
  return TAG_COLORS[tag] || DEFAULT_BADGE_COLOR;
}

/* ----------------------------------------------------------------------
 * Frise « En un coup d'œil » : deux pistes (études / travail) sur un même
 * axe du temps. Horizontale sur ordinateur, verticale sur mobile (la même
 * structure, la mise en page est faite en CSS).
 * ------------------------------------------------------------------- */
function renderFrise() {
  const host = document.getElementById("frise");
  if (!host) return;
  const steps = getTimelineSteps().filter((s) => s.range);
  if (steps.length === 0) {
    host.closest(".frise-section")?.remove();
    return;
  }

  const nowIdx = currentMonthIndex();
  const OPEN_SPAN = 12; // une étape sans fin est dessinée sur 12 mois, estompée
  const bars = steps.map((s) => {
    const first = s.tags[0] || "Expérience";
    const endExcl = (s.range.open ? s.range.start + OPEN_SPAN : s.range.end) + 1;
    return { ...s, track: first === "Formation" ? "etudes" : "travail", color: cssTagColor(first), first, from: s.range.start, to: endExcl };
  });

  // Axe : de janvier de la 1re année à décembre de la dernière
  const minIdx = Math.min(...bars.map((b) => b.from));
  const maxIdx = Math.max(...bars.map((b) => b.to), nowIdx);
  const axisStart = Math.floor(minIdx / 12) * 12;
  const axisEnd = (Math.floor((maxIdx - 1) / 12) + 1) * 12;
  const span = axisEnd - axisStart;
  const pct = (idx) => ((idx - axisStart) / span) * 100;

  // Couloirs : deux étapes qui se chevauchent de plus d'un mois ne partagent pas la même ligne
  function assignLanes(list) {
    const lanes = [];
    list.sort((a, b) => a.from - b.from).forEach((bar) => {
      let lane = lanes.findIndex((end) => bar.from >= end - 1);
      if (lane === -1) { lane = lanes.length; lanes.push(0); }
      lanes[lane] = bar.to;
      bar.lane = lane;
    });
    return Math.max(lanes.length, 1);
  }
  const tracks = [
    { key: "etudes", label: "Études", items: bars.filter((b) => b.track === "etudes") },
    { key: "travail", label: "Travail", items: bars.filter((b) => b.track === "travail") }
  ].filter((t) => t.items.length > 0);

  const chart = document.createElement("div");
  chart.className = "frise-chart";
  chart.style.setProperty("--years", span / 12);

  // Axe des années
  const axis = document.createElement("div");
  axis.className = "frise-axis";
  axis.setAttribute("aria-hidden", "true");
  for (let year = axisStart / 12; year < axisEnd / 12; year++) {
    const tick = document.createElement("span");
    tick.className = "frise-tick";
    tick.style.setProperty("--p", pct(year * 12).toFixed(3));
    tick.textContent = year;
    axis.appendChild(tick);
  }
  const nowTag = document.createElement("span");
  nowTag.className = "frise-now-tag";
  nowTag.style.setProperty("--p", pct(nowIdx + 0.5).toFixed(3));
  nowTag.textContent = "Aujourd'hui";
  axis.appendChild(nowTag);
  chart.appendChild(axis);

  tracks.forEach((track) => {
    const laneCount = assignLanes(track.items);
    const wrap = document.createElement("div");
    wrap.className = `frise-track frise-track--${track.key}`;

    const label = document.createElement("span");
    label.className = "frise-track-label";
    label.textContent = track.label;

    const lanes = document.createElement("div");
    lanes.className = "frise-lanes";
    lanes.style.setProperty("--lanes", laneCount);
    lanes.style.setProperty("--now", pct(nowIdx + 0.5).toFixed(3));

    track.items.forEach((bar) => {
      const link = document.createElement("a");
      link.className = `frise-bar is-${bar.status}`;
      if (bar.range.open) link.classList.add("is-open");
      link.href = `#${bar.domId}`;
      link.dataset.target = bar.domId;
      link.style.setProperty("--bar", bar.color);
      link.style.setProperty("--s", pct(bar.from).toFixed(3));
      link.style.setProperty("--w", (pct(bar.to) - pct(bar.from)).toFixed(3));
      link.style.setProperty("--lane", bar.lane);
      link.dataset.lane = bar.lane;
      const name = bar.step.short || bar.step.title;
      const period = bar.step.date;
      const state = bar.status === "future" ? " (objectif)" : bar.status === "current" ? " (en cours)" : "";
      link.setAttribute("aria-label", `${bar.step.title}, ${period}${state}. Aller à l'étape.`);
      link.title = `${bar.step.title} · ${period}`;
      const text = document.createElement("span");
      text.className = "frise-bar-text";
      text.textContent = name;
      link.appendChild(text);
      lanes.appendChild(link);
    });

    wrap.append(label, lanes);
    chart.appendChild(wrap);
  });

  // Légende : une pastille par catégorie présente + pointillés + trait du jour
  const legend = document.createElement("ul");
  legend.className = "frise-legend";
  const seen = [...new Set(bars.map((b) => b.first))];
  seen.forEach((tag) => {
    const li = document.createElement("li");
    const sw = document.createElement("span");
    sw.className = "frise-swatch";
    sw.style.setProperty("--bar", cssTagColor(tag));
    li.append(sw, document.createTextNode(tag));
    legend.appendChild(li);
  });
  if (bars.some((b) => b.status === "future")) {
    const li = document.createElement("li");
    const sw = document.createElement("span");
    sw.className = "frise-swatch frise-swatch--future";
    li.append(sw, document.createTextNode("Objectif (dates indicatives)"));
    legend.appendChild(li);
  }
  const liNow = document.createElement("li");
  const swNow = document.createElement("span");
  swNow.className = "frise-swatch frise-swatch--now";
  liNow.append(swNow, document.createTextNode("Aujourd'hui"));
  legend.appendChild(liNow);

  host.replaceChildren(chart, legend);

  // Un clic sur une barre : on lève les filtres puis on glisse jusqu'à l'étape
  chart.addEventListener("click", (event) => {
    const link = event.target.closest(".frise-bar");
    if (!link) return;
    event.preventDefault();
    goToTimelineStep(link.dataset.target);
  });
}

/* ----------------------------------------------------------------------
 * Timeline détaillée (zig-zag sur ordinateur, une colonne sur mobile)
 * ------------------------------------------------------------------- */
let timelineFilter = "all";

function renderTimeline() {
  const container = document.getElementById("timeline-container");
  if (!container || typeof TIMELINE === "undefined") return;

  const steps = getTimelineSteps();
  container.innerHTML = "";

  // Trait qui se remplit au scroll
  const line = document.createElement("div");
  line.className = "tl-line";
  line.setAttribute("aria-hidden", "true");
  const fill = document.createElement("span");
  fill.className = "tl-line-fill";
  line.appendChild(fill);
  container.appendChild(line);

  steps.forEach((s) => container.appendChild(buildTimelineItem(s)));
  container.appendChild(buildHereMarker());

  renderTimelineFilters(steps);
  layoutTimeline();

  initTimelineScroll(container);
  window.addEventListener("resize", debounce(updateReadMoreAll, 150));
  window.addEventListener("load", updateReadMoreAll);

  // Lien direct (parcours.html#etape-xxx) : la page est générée après le
  // chargement, le navigateur n'a donc pas pu défiler tout seul.
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (hash && document.getElementById(hash)) {
    setTimeout(() => goToTimelineStep(hash), 150);
  }
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function buildHereMarker() {
  const here = document.createElement("div");
  here.className = "tl-here";
  here.id = "tl-here";
  const dot = document.createElement("span");
  dot.className = "tl-here-dot";
  dot.setAttribute("aria-hidden", "true");
  const text = document.createElement("span");
  text.textContent = `Vous êtes ici · ${formatMonthYear(currentMonthIndex())}`;
  here.append(dot, text);
  return here;
}

function buildTimelineItem(s) {
  const { step, range, status, tags } = s;
  const item = document.createElement("article");
  item.className = `tl-item is-${status} fade-in`;
  item.id = s.domId;
  item.tabIndex = -1;
  item.dataset.tags = tags.join("|");
  item.dataset.status = status;

  // Côté « date » : année en grand + libellé exact
  const when = document.createElement("div");
  when.className = "tl-when";
  if (range) {
    const year = document.createElement("span");
    year.className = "tl-year";
    year.textContent = getYearLabel(range);
    when.appendChild(year);
  }
  // Le libellé exact n'apparaît que s'il apporte quelque chose de plus que l'année en grand
  const yearText = range ? getYearLabel(range) : "";
  if (step.date.replace(/\s*[-–—]\s*/, " – ") !== yearText) {
    const dates = document.createElement("span");
    dates.className = "tl-dates";
    dates.textContent = step.date;
    when.appendChild(dates);
  }

  // Pastille sur la ligne
  const node = document.createElement("span");
  node.className = "tl-node";
  node.setAttribute("aria-hidden", "true");
  if (step.icon && ICONS[step.icon]) node.innerHTML = ICONS[step.icon];

  const card = document.createElement("div");
  card.className = "tl-card";

  // Badges + statut
  const top = document.createElement("div");
  top.className = "tl-top";
  tags.forEach((tag) => top.appendChild(createBadge(tag)));
  if (status !== "past") {
    const chip = document.createElement("span");
    chip.className = `tl-status tl-status--${status}`;
    chip.textContent = status === "future" ? "Objectif" : "En cours";
    top.appendChild(chip);
  }
  if (top.children.length) card.appendChild(top);

  if (step.logo) {
    const logo = document.createElement("img");
    logo.className = "tl-logo";
    logo.src = step.logo.src;
    logo.alt = step.logo.alt || "";
    logo.loading = "lazy";
    card.appendChild(logo);
  }

  const title = document.createElement("h3");
  title.textContent = step.title;
  const subtitle = document.createElement("h4");
  subtitle.textContent = step.subtitle;
  card.append(title, subtitle);

  // Durée calculée + lieu
  const duration = range ? getStepDuration(step, range) : "";
  if (duration || step.place) {
    const facts = document.createElement("ul");
    facts.className = "tl-facts";
    if (duration) facts.appendChild(buildFact(META_ICONS.duree, duration));
    if (step.place) facts.appendChild(buildFact(META_ICONS.lieu, step.place));
    card.appendChild(facts);
  }

  // Description repliable
  const desc = document.createElement("p");
  desc.className = "tl-desc is-clamped";
  desc.id = `${s.domId}-desc`;
  desc.textContent = step.description;
  card.appendChild(desc);

  const more = document.createElement("button");
  more.type = "button";
  more.className = "tl-more";
  more.hidden = true;
  more.textContent = "Lire la suite";
  more.setAttribute("aria-expanded", "false");
  more.setAttribute("aria-controls", desc.id);
  more.addEventListener("click", () => {
    const open = more.getAttribute("aria-expanded") !== "true";
    desc.classList.toggle("is-clamped", !open);
    more.setAttribute("aria-expanded", String(open));
    more.textContent = open ? "Réduire" : "Lire la suite";
  });
  card.appendChild(more);

  // « Ce que j'en retiens »
  if (usableText(step.takeaway)) {
    const take = document.createElement("p");
    take.className = "tl-takeaway";
    const label = document.createElement("span");
    label.className = "tl-takeaway-label";
    label.textContent = status === "future" ? "Ce que j'en attends" : "Ce que j'en retiens";
    take.append(label, document.createTextNode(step.takeaway));
    card.appendChild(take);
  }

  // Témoignage (n'apparaît que s'il est rempli)
  const t = step.testimonial;
  if (t && usableText(t.text)) {
    const fig = document.createElement("figure");
    fig.className = "tl-testimonial";
    const quote = document.createElement("blockquote");
    quote.textContent = t.text;
    fig.appendChild(quote);
    const who = [t.author, t.role].filter(Boolean).join(" · ");
    if (who) {
      const cap = document.createElement("figcaption");
      cap.textContent = who;
      fig.appendChild(cap);
    }
    card.appendChild(fig);
  }

  // Photos de l'étape (n'apparaissent que si elles sont renseignées)
  const photos = (step.photos || []).filter((p) => p && p.src).slice(0, 3);
  if (photos.length) {
    const row = document.createElement("div");
    row.className = "tl-photos";
    photos.forEach((p) => {
      const img = document.createElement("img");
      img.src = p.src;
      img.alt = p.alt || "";
      img.loading = "lazy";
      row.appendChild(img);
    });
    card.appendChild(row);
  }

  // Réalisations liées : vignettes qui ouvrent la fiche de la création
  const works = buildLinkedWorks(step.creations);
  if (works) card.appendChild(works);

  item.append(when, node, card);
  return item;
}

function buildFact(iconSvg, text) {
  const li = document.createElement("li");
  const icon = document.createElement("span");
  icon.className = "tl-fact-icon";
  icon.innerHTML = iconSvg;
  li.append(icon, document.createTextNode(text));
  return li;
}

function buildLinkedWorks(ids) {
  if (!Array.isArray(ids) || typeof CREATIONS === "undefined") return null;
  const found = ids
    .map((id) => CREATIONS.find((c) => c.id === id))
    .filter((c) => c && c.images && c.images.length > 0);
  if (found.length === 0) return null;

  const box = document.createElement("div");
  box.className = "tl-works";
  const label = document.createElement("span");
  label.className = "tl-works-label";
  label.textContent = found.length > 1 ? "Réalisations liées" : "Réalisation liée";
  const list = document.createElement("ul");
  list.className = "tl-works-list";

  found.slice(0, TIMELINE_MAX_VIGNETTES).forEach((creation) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `creations.html#${creation.id}`;
    a.setAttribute("aria-label", `Voir « ${creation.title} »`);
    a.title = creation.title;
    const img = document.createElement("img");
    img.src = creation.images[0].src;
    img.alt = "";
    img.loading = "lazy";
    a.appendChild(img);
    li.appendChild(a);
    list.appendChild(li);
  });
  if (found.length > TIMELINE_MAX_VIGNETTES) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "tl-works-more";
    a.href = "creations.html";
    a.textContent = `+${found.length - TIMELINE_MAX_VIGNETTES}`;
    a.setAttribute("aria-label", "Voir toutes les créations");
    li.appendChild(a);
    list.appendChild(li);
  }

  box.append(label, list);
  return box;
}

/* --- Filtres (Tout / Formation / Expérience…) --- */
function renderTimelineFilters(steps) {
  const bar = document.getElementById("tl-filter-bar");
  if (!bar) return;

  const all = [...new Set(steps.flatMap((s) => s.tags))];
  all.sort((a, b) => {
    const ia = TIMELINE_FILTER_ORDER.indexOf(a);
    const ib = TIMELINE_FILTER_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
  if (all.length === 0) {
    bar.remove();
    return;
  }

  bar.innerHTML = "";
  bar.appendChild(createFilterButton("Tout", "all", true));
  all.forEach((tag) => bar.appendChild(createFilterButton(tag, tag, false)));

  bar.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter-btn");
    if (btn) setTimelineFilter(btn.dataset.filter);
  });
}

function setTimelineFilter(value) {
  timelineFilter = value;
  const bar = document.getElementById("tl-filter-bar");
  if (bar) {
    bar.querySelectorAll(".filter-btn").forEach((b) => {
      const active = b.dataset.filter === value;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
  }
  layoutTimeline();
}

/* Affiche/masque selon le filtre, ré-alterne gauche/droite sur les étapes
   visibles, et replace le repère « Vous êtes ici ». */
function layoutTimeline() {
  const container = document.getElementById("timeline-container");
  if (!container) return;

  const items = [...container.querySelectorAll(".tl-item")];
  let visibleCount = 0;
  items.forEach((item) => {
    const show = timelineFilter === "all" || item.dataset.tags.split("|").includes(timelineFilter);
    item.hidden = !show;
    item.classList.remove("is-left", "is-right");
    if (show) {
      item.classList.add(visibleCount % 2 === 0 ? "is-left" : "is-right");
      visibleCount++;
    }
  });

  // « Vous êtes ici » : juste avant la 1re étape visible qui n'est pas à venir
  const here = document.getElementById("tl-here");
  if (here) {
    const firstNow = items.find((i) => !i.hidden && i.dataset.status !== "future");
    if (firstNow) {
      container.insertBefore(here, firstNow);
      here.hidden = false;
    } else {
      here.hidden = true;
    }
  }

  const status = document.getElementById("tl-count");
  if (status) {
    status.textContent = timelineFilter === "all"
      ? ""
      : `${visibleCount} étape${visibleCount > 1 ? "s" : ""} affichée${visibleCount > 1 ? "s" : ""}`;
  }

  requestAnimationFrame(() => {
    updateReadMoreAll();
    updateTimelineScroll();
  });
}

/* « Lire la suite » n'apparaît que si le texte est réellement coupé. */
function updateReadMoreAll() {
  document.querySelectorAll(".tl-item:not([hidden])").forEach((item) => {
    const desc = item.querySelector(".tl-desc");
    const more = item.querySelector(".tl-more");
    if (!desc || !more) return;
    if (more.getAttribute("aria-expanded") === "true") return;
    desc.classList.add("is-clamped");
    more.hidden = desc.scrollHeight <= desc.clientHeight + 1;
  });
}

function goToTimelineStep(domId) {
  if (timelineFilter !== "all") setTimelineFilter("all");
  const target = document.getElementById(domId);
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Le temps que la mise en page se refasse après la levée du filtre
  requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    target.focus({ preventScroll: true });
    target.classList.remove("is-flash");
    void target.offsetWidth; // relance l'animation
    target.classList.add("is-flash");
    history.replaceState(null, "", `#${domId}`);
  });
}

/* --- Trait qui se remplit + étape active, selon le défilement --- */
let updateTimelineScroll = () => {};

function initTimelineScroll(container) {
  const fill = container.querySelector(".tl-line-fill");
  const line = container.querySelector(".tl-line");
  let waiting = false;

  updateTimelineScroll = () => {
    waiting = false;
    const readY = window.innerHeight * 0.55; // la « ligne de lecture »
    const lineRect = line.getBoundingClientRect();
    const filled = Math.min(Math.max(readY - lineRect.top, 0), lineRect.height);
    fill.style.height = `${filled}px`;

    let best = null;
    let bestDist = Infinity;
    container.querySelectorAll(".tl-item:not([hidden])").forEach((item) => {
      const r = item.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) {
        item.classList.remove("is-active");
        return;
      }
      const dist = readY >= r.top && readY <= r.bottom ? 0 : Math.min(Math.abs(readY - r.top), Math.abs(readY - r.bottom));
      if (dist < bestDist) {
        bestDist = dist;
        best = item;
      }
    });
    container.querySelectorAll(".tl-item.is-active").forEach((i) => {
      if (i !== best) i.classList.remove("is-active");
    });
    if (best) best.classList.add("is-active");
  };

  const schedule = () => {
    if (!waiting) {
      waiting = true;
      requestAnimationFrame(updateTimelineScroll);
    }
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  updateTimelineScroll();
}

/* Chiffres clés (parcours.html ET accueil). Ne fait rien si le conteneur
   ou les données n'existent pas (creations.html, par exemple). Sur
   l'accueil (variante .highlights-bar--home), chaque chiffre apparaît en
   cascade au scroll. Sur le parcours, les chiffres « comptent » jusqu'à
   leur valeur quand ils entrent à l'écran. */
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

  if (document.getElementById("timeline-container")) initCountUp(bar);
}

/* Compte de 0 à la valeur : "3 ans" -> 0 ans, 1 ans… 3 ans. Le texte final
   est toujours celui du fichier de données ; sans animation possible
   (mouvement réduit, vieux navigateur), il reste affiché tel quel. */
function initCountUp(bar) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  const targets = [];
  bar.querySelectorAll(".highlight-value").forEach((el) => {
    const m = /^(\d+)(.*)$/.exec(el.textContent.trim());
    if (!m) return;
    targets.push({ el, to: Number(m[1]), suffix: m[2], final: el.textContent });
    el.textContent = `0${m[2]}`;
  });
  if (targets.length === 0) return;

  const run = ({ el, to, suffix, final }) => {
    const duration = 1100;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const n = Math.round(to * eased);
      // "1 an" / "2 ans" : le pluriel suit le nombre pendant le décompte
      const word = suffix.replace(/^(\s*)ans?(?![\wÀ-ÿ])/, (_, sp) => `${sp}${n > 1 ? "ans" : "an"}`);
      el.textContent = p < 1 ? `${n}${word}` : final;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const t = targets.find((x) => x.el === entry.target);
      if (t) run(t);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  targets.forEach((t) => observer.observe(t.el));
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