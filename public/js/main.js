// Bonus ++ 

function playSound() {
    audioPlayer.play();           // Joue le son
}

// DOM : Récupération des éléments
const grid = document.getElementById("game-grid");
const userInput = document.getElementById("user-input");
const submitButton = document.getElementById("submit-button");
const feedback = document.getElementById("feedback");
const crocmou = document.getElementById("crocmou")

// Liste de mots disponibles
let words = ["porte", "table", "fleur", "papier", "livre", "lapin", "taupe", "raton", "bible", "fibre"];
let GuessWord = words[Math.floor(Math.random() * words.length)];
console.log(GuessWord); // Debug : Afficher le mot à deviner

// Initialisation de l'affichage
let maxAttempts = 6; // Nombre d'essais maximum
let currentAttempt = 0; // Tentative actuelle
let AffichageGuess = Array(GuessWord.length).fill("[]");

// Création de la grille
function initializeGrid() {
    for (let i = 0; i < maxAttempts; i++) {
        for (let j = 0; j < GuessWord.length; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            grid.appendChild(cell);
        }
    }
}
initializeGrid();

// Gérer une tentative
function handleAttempt() {
    let GuessUser = userInput.value.toLowerCase();

    if (GuessUser.length !== GuessWord.length) {
        feedback.textContent = "Le mot doit contenir exactement 5 lettres.";
        return;
    }

    let WrongPlace = [];
    let rowStartIndex = currentAttempt * GuessWord.length;

    // Vérification des lettres
    for (let i = 0; i < GuessWord.length; i++) {
        const cell = grid.children[rowStartIndex + i];
        if (GuessUser[i] === GuessWord[i]) {
            AffichageGuess[i] = `[${GuessUser[i]}]`;
            cell.textContent = GuessUser[i];
            cell.classList.add("correct");
        } else if (GuessWord.includes(GuessUser[i])) {
            WrongPlace.push(GuessUser[i]);
            cell.textContent = GuessUser[i];
            cell.classList.add("wrong-place");
        } else {
            cell.textContent = GuessUser[i];
        }
    }

    feedback.textContent =
        WrongPlace.length > 0
            ? `Lettres correctes mais mal placées : ${WrongPlace.join(", ")}`
            : "";

    currentAttempt++;

    if (GuessUser === GuessWord) {
        feedback.textContent = "Bravo ! Vous avez trouvé le mot !";
        userInput.disabled = true;
        submitButton.disabled = true;
        playSound()
        crocmou.classList.remove("hidden");
    } else if (currentAttempt === maxAttempts) {
        feedback.textContent = `Perdu ! Le mot était "${GuessWord}".`;
        userInput.disabled = true;
        submitButton.disabled = true;
    }

    userInput.value = "";
}

// Gestion des événements
submitButton.addEventListener("click", handleAttempt);
userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        handleAttempt();
    }
});
