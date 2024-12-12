# Molengeek-Projet-Motus

## Déroulement du jeu :

Un mot est choisie aléatoirement parmi une liste de mot (ATTENTION: tout les mot doivent avoir la même taille! par défaut mettez 5 lettres )

Afficher le mot cacher pour que l’utilisateur puisse voir combien de lettre contient le mot:
Exemple : si le mot à trouver est “frite” on verra à l’écran : “[ ] [ ] [ ] [ ] [ ]”
[ ] représente une lettre

Le joueur pourra tenter d’entrer un mot. faite en sorte de valider la proposition uniquement si le mot entrée à la même taille que le mot demandé

Ensuite, vérifiez lettre par lettre si le mot entrée est identique à celui qui est caché.

Indiquez, après, combien de lettre sont à la bonne place en changeant l’affichage
Exemple: le mot cherché est “frite” et l’utilisateur écrit “flute”. on affiche alors:
“[F] [ ] [ ] [T] [E]”

puisque il n’a pas trouvé le mot, il perd UNE tentative

On recommence jusque à ce que le joueur trouve le mot exacte ou que sont nombre de tentative atteint 0

Afficher un message selon si le joueur gagner ou perd
 

## Consigne :

- Coder ce jeu en respectant les consignes sité plus haut.
- Fait en sorte de supporter les cas où l’utilisateur entre n’importe quoi (par exemple quand il écrit un mot trop petit ou trop long)
- Fait en sorte que l’affichage sur le terminale soit clair et agréable
- le joueur doit voir à tout moment l’affichage du mot recherché et le nombre de tentative restante
- Mettez des commentaires dans votre code. explique ce que fait vos fonction et vos boucle.
- rendez votre projet dans un dossier nom_prenom_motus à l'heure indiqué, **PAS APRÈS !!**

- Faites en sorte qu’avant le début de la partie, le joueur puisse choisir la taille du mot parmi ceux disponible et le nombre de tentative.
- Ajouté dans l’affichage les caractères qui sont dans le mot mais pas la bonne place
- ATTENTION: il ne faut prendre en compte les lettres qui sont déjà placé au bonne endroit
- fait en sorte de conservé le score du joueur et de lui redemander si il veut rejouer après chaque partie

## Feature : 

Presente : 

- [x] Fait en sorte de supporter les cas où l’utilisateur entre n’importe quoi (par exemple quand il écrit un mot trop petit ou trop long)
- [x] Fait en sorte que l’affichage sur le terminale soit clair et agréable
- [x] le joueur doit voir à tout moment l’affichage du mot recherché et le nombre de tentative restante
- [x] Mettez des commentaires dans votre code. explique ce que fait vos fonction et vos boucle.
- [x] Ajouté dans l’affichage les caractères qui sont dans le mot mais pas la bonne place
- [X] ATTENTION: il ne faut prendre en compte les lettres qui sont déjà placé au bonne endroit
- [x] Faites en sorte qu’avant le début de la partie, le joueur puisse choisir la taille du mot parmi ceux disponible et le nombre de tentative.

Non-Presente :

- [x] fait en sorte de conservé le score du joueur et de lui redemander si il veut rejouer après chaque partie
