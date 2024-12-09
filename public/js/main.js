// DOM : Get Element :


// Liste de mot dispo :

let word = ["porte", "table", "fleur", "papier","livre", "lapin", "taupe", "raton", "bible", "fibre"]
let GuessWord = word[Math.floor(Math.random() * word.length)];

console.log(GuessWord)

// Logique :

    // Affichage [] :

    let AffichageGuess = []

    for (let i = 0; i< GuessWord.length; i++) {
        AffichageGuess.push("[]")
    }

    console.log(AffichageGuess)

    // Début du jeu

    let GuessUser = ""; 

    // Utilisateur Guess : 

    do {
        GuessUser = prompt("Donne ton mot")

        GuessUser = GuessUser.toLowerCase()

        let WrongPlace = []

        for (let i = 0; i < GuessWord.length; i++) {
            
            if (GuessUser[i] == GuessWord[i]){
                AffichageGuess[i] = (`[${GuessUser[i]}]`)
            }
            else if (GuessWord.includes(GuessUser[i])){
                WrongPlace.push(GuessUser[i])
            }
            
        }

        
        if (WrongPlace.length >= 1){
            console.log(AffichageGuess)
            console.log(`Lettre comprise mais pas a la bonne place : ${WrongPlace}`)
        }else{
            console.log(AffichageGuess)
        } 

    } while (GuessUser !== GuessWord);

    console.log('Tu as trouvé bravo')

    