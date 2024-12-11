// Bonus ++ 

// Fonction pour changer la source et jouer le son
function playSound(soundFile) {
    audioSource.src = soundFile; // Change la source du son
    audioPlayer.load();           // Recharge l'élément audio avec la nouvelle source
    audioPlayer.play();           // Joue le son
}

// Fonction pour afficher ou non 

function hiddenOff(idName){
    idName.classList.remove("hidden");
}

function hiddenOn(idName){
    idName.classList.add("hidden");
}

// DOM : Récupération des éléments
const grid = document.getElementById("game-grid");
const userInput = document.getElementById("user-input");
const submitButton = document.getElementById("submit-button");
const feedback = document.getElementById("feedback");
const crocmou = document.getElementById("crocmou")
const lose = document.getElementById("lose")
const tryAgainButton = document.getElementById("try-again");

// Liste de mots disponibles
let wordsFive = [
    "porte", "table", "fleur", "livre", "lapin", "taupe", "raton", "bible", "fibre",
    "titan", "quete", "verre", "plage", "rouge", "noire", "plume", "terre", "image",
    "crime", "hiver", "poule", "vache", "franc", "aimer", "lampe", "coeur", "sable",
    "arbre", "ranch", "banal", "bleue", "doute", "fuite", "grive", "jante", "linge",
    "musee", "neige", "ombre", "point", "quais", "rival", "sauce", "veste", "zeste"
];

let GuessWord; // Mot à deviner
let maxAttempts = 6; // Nombre d'essais maximum
let currentAttempt; // Tentative actuelle
let AffichageGuess; // État des lettres devinées

// Création de la grille
function initializeGrid() {
    grid.innerHTML = ""; // Réinitialiser la grille
    for (let i = 0; i < maxAttempts; i++) {
        for (let j = 0; j < GuessWord.length; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            grid.appendChild(cell);
        }
    }
}

// Fonction principale pour démarrer ou redémarrer le jeu
function startGame() {
    // Réinitialisation des variables de jeu
    GuessWord = wordsFive[Math.floor(Math.random() * wordsFive.length)];
    console.log(GuessWord); // Debug : Afficher le mot généré
    currentAttempt = 0;
    AffichageGuess = Array(GuessWord.length).fill("[]");

    // Réinitialiser l'interface
    feedback.textContent = "";
    crocmou.classList.add("hidden");
    lose.classList.add("hidden");
    userInput.disabled = false;
    submitButton.disabled = false;
    userInput.value = "";

    // Réinitialiser la grille
    initializeGrid();
}

function handleAttempt() {
    let GuessUser = userInput.value.toLowerCase();

    if (GuessUser.length !== GuessWord.length) {
        feedback.textContent = "Le mot doit contenir exactement 5 lettres.";
        return;
    }

    let WrongPlace = [];
    let rowStartIndex = currentAttempt * GuessWord.length;

    // Créer une copie du mot pour gérer les occurrences
    let tempWord = GuessWord.split("");

    // Étape 1 : Vérification des lettres correctes (bien placées)
    for (let i = 0; i < GuessWord.length; i++) {
        const cell = grid.children[rowStartIndex + i];
        if (GuessUser[i] === GuessWord[i]) {
            AffichageGuess[i] = `[${GuessUser[i]}]`;
            cell.textContent = GuessUser[i];
            cell.classList.add("correct");
            tempWord[i] = null; // Marquer cette lettre comme utilisée
        }
    }

    // Étape 2 : Vérification des lettres mal placées
    for (let i = 0; i < GuessWord.length; i++) {
        const cell = grid.children[rowStartIndex + i];
        if (GuessUser[i] !== GuessWord[i] && tempWord.includes(GuessUser[i])) {
            WrongPlace.push(GuessUser[i]);
            cell.textContent = GuessUser[i];
            cell.classList.add("wrong-place");
            // Retirer la première occurrence de cette lettre
            tempWord[tempWord.indexOf(GuessUser[i])] = null;
        } else if (GuessUser[i] !== GuessWord[i]) {
            cell.textContent = GuessUser[i];
        }
    }

    feedback.textContent =
        WrongPlace.length > 0 ? `Lettres correctes mais mal placées : ${WrongPlace.join(", ")}` : "";

    currentAttempt++;

    if (GuessUser === GuessWord) {
        feedback.textContent = "Bravo ! Vous avez trouvé le mot !";
        userInput.disabled = true;
        submitButton.disabled = true;
        playSound("./public/music/Toothless.mp3");
        hiddenOff(crocmou)
    } else if (currentAttempt === maxAttempts) {
        feedback.textContent = `Perdu ! Le mot était "${GuessWord}".`;
        userInput.disabled = true;
        submitButton.disabled = true;
        playSound("./public/music/lose.mp3");
        hiddenOff(lose)
    }

    userInput.value = "";
}


// Ajouter l'événement pour recommencer
tryAgainButton.addEventListener("click", startGame);

// Gestion des événements
submitButton.addEventListener("click", handleAttempt);
userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        handleAttempt();
    }
});

// Démarrage initial
startGame();
