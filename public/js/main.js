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

const setupSection = document.getElementById("setup-section");
const gameSection = document.getElementById("game-section");
const wordLengthSelector = document.getElementById("word-length");
const attemptsInput = document.getElementById("attempts");
const startGameButton = document.getElementById("start-game-button");

const scoreboard = document.getElementById("scoreboard");

// Liste de mots disponibles
let wordsByLength = {
    5: ["porte", "table", "fleur", "livre", "lapin", "taupe", "raton", "bible", "fibre","titan", "quete", "verre", "plage", "rouge", "noire", "plume", "terre", "image","crime", "hiver", "poule", "vache", "franc", "aimer", "lampe", "coeur", "sable","arbre", "ranch", "banal", "bleue", "doute", "fuite", "grive", "jante", "linge","musee", "neige", "ombre", "point", "quais", "rival", "sauce", "veste", "zeste"],
    6: ["renard", "bancal", "sombre", "glisse", "charme", "paille"],
    7: ["lapines", "garages", "horizon", "marques", "abysses", "abattre", "aborder", "ARMURES", "arnaque"]
};

let GuessWord; // Mot à deviner
let maxAttempts = 6; // Nombre d'essais maximum
let currentAttempt; // Tentative actuelle
let score = 0;

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
    grid.style.width = ((GuessWord.length * 50) + 35) + "px";
    grid.style.gridTemplateColumns = `repeat(${GuessWord.length}, 50px)`;
}

// Fonction principale pour démarrer ou redémarrer le jeu
function startGame() {
    // Récupérer la taille et le nombre d'essais choisis par l'utilisateur
    const wordLength = parseInt(wordLengthSelector.value, 10);
    maxAttempts = parseInt(attemptsInput.value, 10);

    // Vérification de la validité des paramètres
    if (!wordsByLength[wordLength]) {
        feedback.textContent = "Taille de mot invalide.";
        return;
    }

    // Initialisation du mot et des variables de jeu
    const wordList = wordsByLength[wordLength];
    userInput.setAttribute("min", wordLength);
    userInput.setAttribute("max", wordLength);
    GuessWord = wordList[Math.floor(Math.random() * wordList.length)];
    GuessWord = GuessWord.toLowerCase();
    console.log(`Debug : ${GuessWord}`); // Debug
    currentAttempt = 0;

    // Réinitialiser l'interface
    feedback.textContent = "";
    crocmou.classList.add("hidden");
    lose.classList.add("hidden");
    userInput.disabled = false;
    submitButton.disabled = false;
    userInput.value = "";
    userInput.setAttribute("maxlength", wordLength);

    // Réinitialiser la grille
    initializeGrid();

    // Basculer l'affichage des sections
    hiddenOn(setupSection);
    hiddenOff(gameSection);
    hiddenOff(scoreboard)
}

function handleAttempt() {
    let GuessUser = userInput.value.toLowerCase();

    if (GuessUser.length !== GuessWord.length) {
        feedback.textContent = `Le mot doit contenir exactement ${GuessWord.length} lettres.`;
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
            tempWord[i] = null; // Marquer cette lettre comme utilisée
             // Ajouter un délai pour l'apparition de la lettre
             setTimeout(() => {
                cell.textContent = GuessUser[i];
                cell.classList.add("correct");
                // test mais comment devenir sourd en 2 etape .... et pas trouvé le sond quand pas a la bonne place
                // playSound("./public/music/motus-lettre-bonne.mp3") 
            }, i * 200); // Délai de 200ms entre chaque lettre
        }
    }

    // Étape 2 : Vérification des lettres mal placées
    for (let i = 0; i < GuessWord.length; i++) {
        const cell = grid.children[rowStartIndex + i];
        if (GuessUser[i] !== GuessWord[i] && tempWord.includes(GuessUser[i])) {
            WrongPlace.push(GuessUser[i]);
            setTimeout(() => {
                cell.textContent = GuessUser[i];
                cell.classList.add("wrong-place");
                tempWord[tempWord.indexOf(GuessUser[i])] = null; // Retirer l'occurrence
            }, i * 200);
        } else if (GuessUser[i] !== GuessWord[i]) {
            setTimeout(() => {
                cell.textContent = GuessUser[i];
                // test mais comment devenir sourd en 2 etape .... et pas trouvé le sond quand pas a la bonne place
                // playSound("./public/music/mauvaise.mp3") 
            }, i * 200);
        }
    }

    feedback.textContent =
        WrongPlace.length > 0 ? `Lettres correctes mais mal placées : ${WrongPlace.join(", ")}` : "";

    currentAttempt++;

    // Victory or Lose :

    if (GuessUser === GuessWord) {
        feedback.textContent = "Bravo ! Vous avez trouvé le mot !";
        userInput.disabled = true;
        submitButton.disabled = true;
        playSound("./public/music/Toothless.mp3");
        hiddenOff(crocmou);
        hiddenOff(tryAgainButton)
        score += (maxAttempts - currentAttempt);
        scoreboard.textContent = `Ton score est de ${score} point(s)`
    } else if (currentAttempt === maxAttempts) {
        feedback.textContent = `Perdu ! Le mot était "${GuessWord}".`;
        userInput.disabled = true;
        submitButton.disabled = true;
        playSound("./public/music/lose.mp3");
        hiddenOff(lose);
        hiddenOff(tryAgainButton)
        if (score >= 5){
            score -= 5
            scoreboard.textContent = `Ton score est de ${score} point(s)`
        }
        else{
            score = 0
            scoreboard.textContent = `Ton score est de ${score} point(s)`
        }     
    }

    userInput.value = "";
}

// l'événement pour recommencer
tryAgainButton.addEventListener("click", function () {
    hiddenOff(setupSection);
    hiddenOn(gameSection);
    hiddenOn(crocmou);
    hiddenOn(lose);
    hiddenOn(tryAgainButton);
    hiddenOn(scoreboard);
    audioPlayer.pause()
});

// Gestion des événements
submitButton.addEventListener("click", handleAttempt);
userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        handleAttempt();
    }
});

// Démarrage initial
startGameButton.addEventListener("click", startGame);
