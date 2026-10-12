/* ==========================================================================
   Mode clair / mode nuit

   Ce fichier est chargé dans le <head> de chaque page (sans defer) : il pose
   data-theme="light" ou "dark" sur <html> AVANT l'affichage, pour éviter un
   éclair blanc quand le visiteur est en mode nuit. Les couleurs de chaque
   thème sont dans css/style.css (variables light-dark() dans :root).

   Règle de choix :
     1. le choix mémorisé par le visiteur (bouton soleil/lune), s'il existe ;
     2. sinon le réglage de son appareil (prefers-color-scheme).
   Tant qu'il n'a pas cliqué sur le bouton, le site suit l'appareil en direct.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "theme";
  var THEME_COLORS = { light: "#fcf8f1", dark: "#16100c" }; // barre du navigateur sur mobile
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  // Le stockage peut être bloqué (navigation privée, réglages) : on ne plante jamais.
  function readChoice() {
    try {
      var value = window.localStorage.getItem(STORAGE_KEY);
      return value === "light" || value === "dark" ? value : null;
    } catch (e) {
      return null;
    }
  }

  function saveChoice(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* pas grave : le choix vaudra pour cette page seulement */
    }
  }

  function currentTheme() {
    return readChoice() || (media.matches ? "dark" : "light");
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLORS[theme]);
    updateButton(theme);
  }

  /* ---------------- Bouton soleil / lune ---------------- */
  var button = null;

  var ICONS =
    '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>' +
    '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="4"/>' +
    '<path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>';

  function updateButton(theme) {
    if (!button) return;
    var label = theme === "dark" ? "Activer le mode clair" : "Activer le mode nuit";
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  }

  function buildButton() {
    var nav = document.querySelector("header nav");
    if (!nav || document.querySelector(".theme-toggle")) return;

    button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.innerHTML = ICONS;
    nav.appendChild(button);
    updateButton(root.getAttribute("data-theme") || currentTheme());

    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      saveChoice(next);

      // Fondu doux, sauf si le visiteur a demandé moins d'animations.
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) {
        root.classList.add("theme-switching");
        window.setTimeout(function () {
          root.classList.remove("theme-switching");
        }, 400);
      }
      apply(next);
    });
  }

  /* ---------------- Mise en route ---------------- */
  apply(currentTheme());

  // Le menu n'existe pas encore quand ce script s'exécute dans le <head>.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildButton);
  } else {
    buildButton();
  }

  // Tant que le visiteur n'a rien choisi, on suit son appareil en direct
  // (ex. passage automatique en mode nuit le soir).
  var onSystemChange = function () {
    if (!readChoice()) apply(media.matches ? "dark" : "light");
  };
  if (media.addEventListener) media.addEventListener("change", onSystemChange);
  else if (media.addListener) media.addListener(onSystemChange);

  // Deux onglets ouverts : un choix fait dans l'un s'applique à l'autre.
  window.addEventListener("storage", function (event) {
    if (event.key === STORAGE_KEY) apply(currentTheme());
  });
})();