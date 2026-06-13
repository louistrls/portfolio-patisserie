document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       1. MENU MOBILE (HAMBURGER)
       ========================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    // Ouvre/Ferme le menu au clic sur le hamburger
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Ferme le menu mobile automatiquement quand on clique sur un lien
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* ==========================================
       2. ANIMATIONS AU DÉFILEMENT (INTERSECTION OBSERVER)
       ========================================== */
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15, // L'animation se déclenche quand 15% de l'élément est visible
        rootMargin: "0px 0px -50px 0px" // Décale légèrement le déclenchement avant le bas de l'écran
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            // Si l'élément n'est pas dans la vue, on ne fait rien
            if (!entry.isIntersecting) {
                return;
            } else {
                // On ajoute la classe CSS qui déclenche la transition
                entry.target.classList.add('appear');
                // On arrête d'observer l'élément une fois qu'il est apparu (pour les perfs)
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    // On applique l'observateur sur chaque élément ayant la classe .fade-in
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

});