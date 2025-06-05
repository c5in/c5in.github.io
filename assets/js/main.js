document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for internal anchor links (si vous en avez encore sur certaines pages)
    // Cette partie ne s'appliquera plus aux liens de la navbar principale.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Vérifier si le lien est bien un lien interne à la page et non un onglet Bootstrap ou similaire
            const href = this.getAttribute('href');
            if (href.length > 1 && document.querySelector(href)) { // S'assure que la cible existe sur la page
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Counter animation
    function animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 1500;
        const increment = target / (duration / 30);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 30);
    }

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Active navigation highlighting based on current page URL
    function highlightActiveNavLink() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        let currentPath = window.location.pathname.split('/').pop(); // Obtient le nom du fichier (e.g., "index.html")

        // Si currentPath est vide (racine du site), on assume que c'est index.html
        if (currentPath === '' || currentPath === '/') {
            currentPath = 'index.html';
        }

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            link.classList.remove('active'); // Enlève 'active' de tous les liens d'abord
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
        });
    }

    highlightActiveNavLink(); // Appeler la fonction au chargement de la page



    // À la fin de votre fichier contact.html, avant </body>, après le script de validation Bootstrap

const contactForm = document.querySelector('.contact-form'); // Assurez-vous que c'est la bonne classe

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche la soumission HTML classique

        if (!contactForm.checkValidity()) {
          event.stopPropagation();
          contactForm.classList.add('was-validated');
          return;
        }

        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Envoi...';

        fetch(contactForm.action, { // Utilise l'action définie dans le HTML
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json' // Important pour Formspree pour une réponse JSON
            }
        })
        .then(response => {
            if (response.ok) { // response.ok est true si le statut est 2xx
                // Si le service redirige (comme Formspree sans _next et sans AJAX),
                // cette partie ne sera pas atteinte si la redirection a lieu.
                // Si _next est utilisé, la redirection se fait par le serveur Formspree.
                // Si Formspree détecte une requête AJAX (grâce à l'entête Accept), il renvoie JSON.
                return response.json(); // Ou response.text() si pas de JSON attendu
            } else {
                // Tenter de lire le corps de la réponse d'erreur
                return response.json().then(data => {
                    throw new Error(data.error || 'Une erreur est survenue.');
                }).catch(() => { // Si le corps n'est pas JSON ou est vide
                    throw new Error(`Erreur HTTP ${response.status}`);
                });
            }
        })
        .then(data => { // "data" ici est la réponse JSON de Formspree si tout va bien avec AJAX
            // Afficher un message de succès
            // Par exemple, remplacer le formulaire par un message
            contactForm.innerHTML = `<div class="alert alert-success" role="alert">Merci ! Votre message a été envoyé avec succès.</div>`;
            // Ou si vous avez une URL de redirection dans _next, vous pourriez rediriger ici via JS
            // if (formData.get('_next')) { window.location.href = formData.get('_next'); }
        })
        .catch(error => {
            console.error('Erreur lors de la soumission:', error);
            // Afficher un message d'erreur à l'utilisateur
            // Par exemple, ajouter un message d'erreur au-dessus du bouton
            const errorDiv = document.createElement('div');
            errorDiv.className = 'alert alert-danger mt-3';
            errorDiv.role = 'alert';
            errorDiv.textContent = `Erreur : ${error.message || "Impossible d'envoyer le message. Veuillez réessayer."}`;
            contactForm.prepend(errorDiv); // Ajoute le message d'erreur au début du formulaire

            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        });
    });
}

}); // Fin de DOMContentLoaded