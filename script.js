const passwordInput = document.getElementById("passwordInput");
const errorMessage = document.getElementById("errorMessage");
const passwordScreen = document.getElementById("password-screen");
const coverPage = document.getElementById("cover-page");
const bookContent = document.getElementById("book-content");

// --- Ajoutez cette ligne pour définir votre mot de passe ---
const correctPassword = "2803"; // Remplace "tonmotdepasseici" par le vrai mot de passe

const startInteractiveBtn = document.getElementById("start-interactive-btn");
const interactiveStorySection = document.getElementById("interactive-story-section");
const interactivePages = document.querySelectorAll('.interactive-page');
const finalMessage = document.getElementById('final-message');
let currentPageIndex = 0;

function checkPassword() {
    if (passwordInput.value === correctPassword) {
        passwordScreen.style.display = "none"; // Cache l'écran du mot de passe
        coverPage.style.display = "flex"; // Affiche la page de couverture
        document.body.style.overflow = "hidden"; // S'assure que le corps n'a pas de scroll
    } else {
        errorMessage.textContent = "Mot de passe incorrect. Réessaie, mon amour..."; // Message personnalisé
    }
}

// Écoute le clic sur la page de couverture pour lancer l'animation
document.getElementById("turn-page-button").addEventListener("click", function() {
    coverPage.classList.add("hidden"); // Ajoute la classe pour l'animation de rotation
    setTimeout(() => {
        coverPage.style.display = "none"; // Cache la couverture après l'animation
        bookContent.style.display = "block"; // Affiche le contenu du livre (PDF)
        startInteractiveBtn.style.display = "block"; // Affiche le bouton "Commencer une surprise !"
        document.body.style.overflow = "auto"; // Réactive les barres de défilement si le PDF en a besoin
    }, 1200); // Attend que l'animation de 1.2s soit terminée
});

// Permet d'appuyer sur la touche Entrée pour valider le mot de passe
passwordInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
});

// --- Fonctionnalité des pages interactives ---

// Affiche la page interactive actuelle
function showCurrentPage() {
    interactivePages.forEach((page, index) => {
        if (index === currentPageIndex) {
            page.style.display = 'flex'; // Affiche la page actuelle
        } else {
            page.style.display = 'none'; // Cache les autres pages
        }
    });
    finalMessage.style.display = 'none'; // Cache le message final au cas où
}

// Gère le clic sur le bouton "Commencer une surprise !"
startInteractiveBtn.addEventListener("click", function() {
    bookContent.style.display = "none"; // Cache le conteneur du PDF
    startInteractiveBtn.style.display = "none"; // Cache le bouton lui-même
    interactiveStorySection.style.display = "flex"; // Affiche la section des pages interactives
    document.body.style.overflow = "hidden"; // Cache les barres de défilement pour cette section
    currentPageIndex = 0; // Réinitialise à la première page
    showCurrentPage(); // Affiche la première page
});

// Gère le clic sur les boutons "Suivant"
document.querySelectorAll('.next-page-btn').forEach(button => {
    button.addEventListener("click", function() {
        currentPageIndex++;
        if (currentPageIndex < interactivePages.length) {
            showCurrentPage(); // Passe à la page suivante
        } else {
            // Fin de toutes les pages interactives
            interactivePages.forEach(page => page.style.display = 'none'); // Cache toutes les pages
            finalMessage.style.display = 'block'; // Affiche le message final
            // Vous pouvez ajouter une redirection ici, ou un autre comportement
            // Par exemple: setTimeout(() => window.location.href = "merci.html", 3000);
        }
    });
});
