## TP final DOM : Wordle

### Etape 1 : Création du projet

1. stocker un liste de mot dans un tableau 
2. selectionner un mot aléatoirement dans le tableau
3. mettre le nombre d'essay a 5
4. recuperer les appuis de touche de l'utilisateur avec l'eventlisterner "keydown"
5. stoquer les lettres entrée par le joueur
6. lors de l'appuis de la touche Entrer si le mot contient le bon nombre de caractres correspond au mot ettendu, verifier si le mot entrer corrrespond au mots attendu afficher le resultat dans la console
7. lorsque le mot a ete verifié et faux diminution du nopmbre d'essay de 1

### Etape 2 : Ajout de l'affichage

1. Ajout de l'affichage des case correspondant au nombre de lettres dans le mot
2. le stoquage des lettres du joueur ne peuvent pas etre supperieur au nombre de lettre du mot
3. la touche "backspace" efface la derniere lettre stoquée
4. A chaque pression d'une touche de l'utilisateur afficher la valeur dans une case
5. une fois le mot verifié si il est incorrecte le joueur passe a la ligne suivante
6. apres la verification du mot les lettres bien placé sont mise en verte les lettre mal placée en jaune

### Etape 3 : Ajout du clavier virtuel

1. ajout de l'ensemble des boutons servant pour le clavier
2. ajout de l'ecoute des boutons pour ajouter / supprimer les lettres et valider le mot
3. ajout des couleur sur les boutons du clavier en fonction du placment des lettre lors des essais precedants

### Etape 4 : Ajout de l'api exeterne et de la verification des mots dans un dictionaire

1. Ajout de la recuperation du mot a deviner via une API externe tel que : https://random-word-api.herokuapp.com/
2. AJout de la verification des mot entrer par l'utilisateur via un dictionaire (via une API/une bibliotheque/ un JSON)