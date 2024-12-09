// DOM : Get Element :


// Liste de mots disponibles
let word = ["porte", "table", "fleur", "papier", "livre", "lapin", "taupe", "raton", "bible", "fibre"];
let GuessWord = word[Math.floor(Math.random() * word.length)];

console.log(GuessWord); // Debug : Afficher le mot à deviner

// Initialisation de l'affichage
let AffichageGuess = [];
for (let i = 0; i < GuessWord.length; i++) {
    AffichageGuess.push("[]");
}

console.log(AffichageGuess); // Affichage initial

// Début du jeu
let GuessUser = ""; 

// Jeu en cours
do {
    GuessUser = prompt("Donne ton mot"); // Entrée utilisateur
    GuessUser = GuessUser.toLowerCase(); // Convertir en minuscule pour éviter les erreurs de casse

    let WrongPlace = [];

    // Vérifier chaque lettre
    for (let i = 0; i < GuessWord.length; i++) {
        // Si la lettre est correcte et bien placée
        if (GuessUser[i] === GuessWord[i]) {
            AffichageGuess[i] = `[${GuessUser[i]}]`;
        }
    }

    // Identifier les lettres correctes mais mal placées
    WrongPlace = [];
    for (let i = 0; i < GuessUser.length; i++) {
        if (GuessWord.includes(GuessUser[i]) && GuessWord[i] !== GuessUser[i]) {
            WrongPlace.push(GuessUser[i]);
        }
    }

    if (WrongPlace.length >= 1){
        console.log(AffichageGuess)
        console.log(`Lettre comprise mais pas a la bonne place : ${WrongPlace}`)
    }else{
        console.log(AffichageGuess)
    } 

} while (GuessUser !== GuessWord);

console.log("Tu as trouvé, bravo !");
