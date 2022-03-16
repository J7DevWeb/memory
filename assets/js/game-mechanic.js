// Pour comprendre la logique du jeu commencer par la fin de ce fichier. [Si une variable n'est pas défini dans la fonction il faut venir voir au début de ce fichier pour la retrouver (comprendre la portée des variables)]
// Déclaration des constantes
const board = document.querySelector('#gameBoard'); // On selectionne le plateau de jeu via son id
const choosenTimeToCompleteGame = 60; // Temps donné par le chronométre pour completer le jeu. Exercice : Laisser l'utilisateur choisir lui même le temps du chronométre.
const displayResult = document.querySelector('#result');
const displayScore = document.querySelector('#score');
const endgameContainer = document.querySelector('#endgame-container');
const progressBar = document.querySelector('#progress-bar');
const restart = document.querySelector('#restart');
const start = document.querySelector('#start');
const timeToComplete = document.querySelector('#time-to-complete');
// Déclaration des variables
let timer = null;
let choosenCards = []; // Contiendra les 2 cartes retournées par l'utilisateur et leur identifiant unique nous permettant de les trouver sur le plateau de jeu.
let score = 0;
let disableGame = false; // Booléen qui permet de bloquer le jeu lorsque 2 cartes sont face visible le temps de la résolution qui consiste à savoir si les cartes sont identiques ou non
let chrono;
// Déclaration des fonctions
function startTimer(time){
    chrono = time;
    timer = setInterval(() => { // Lance le chronométre
        chrono--;
        progressBar.style.width = (chrono*100)/time + '%'; //Permet de calculer et d'afficher la diminution de la barre de progression du chronométre.
        if(chrono === 0){
            clearInterval(timer);
            endgame(false); //Partie perdu
        }
    }, 1000);
};

function createBoard(){
    let shuffledCards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]; // Correspond aux cartes du memory
    while(shuffledCards.length > 14){ // Seul 14 cartes sont utiles. On en retire 4 aléatoirements.
        shuffledCards.splice(Math.floor( Math.random()*shuffledCards.length ), 1);
    }
    shuffledCards = shuffledCards.concat(shuffledCards); // On Cré une copie de chaque carte pour obtenir le plateau de 28 cartes.
    shuffledCards.sort(()=> 0.5 - Math.random()); // On trie aléatoirement le tableau.
    for(let i = 0; i < 28 ; i++){ // On génére le plateau
        let card = document.createElement('img');
        card.setAttribute('src', 'assets/images/back.png'); // Les cartes sont toutes face cachée
        card.setAttribute('class', 'card');
        card.setAttribute('data-id', i); // Permet d'identifier les cartes de façon unique
        card.setAttribute('data-value', shuffledCards[0]); //Indique quel fruit se trouvera sur la carte.
        shuffledCards.shift(); // On supprime le premier élément du tableau car on a déposé cette carte sur la plateau à la ligne précédente 
        board.appendChild(card); // On affiche la carte face cachée sur le plateau
        card.addEventListener('click', flipCard); // On ajoute l'écouteur dévénement qui nous permet de savoir si un utilisateur clique sur la carte.
    }
}

function checkIfCardsMatches(){
    card1 = document.querySelector(`[data-id='${choosenCards[0]}']`); // On stock notre carte dans une variable
    card2 = document.querySelector(`[data-id='${choosenCards[2]}']`); // On stock notre carte dans une variable
    card1.classList.remove('shake'); // Supprime la classe qui ajoute une animation lors du clique de l'utilisateur sur une carte
    card2.classList.remove('shake'); // Supprime la classe qui ajoute une animation lors du clique de l'utilisateur sur une carte
    if(choosenCards[1] !== choosenCards[3]){
        card1.setAttribute('src', 'assets/images/back.png'); // Les cartes retournées sont différentes on les retourne face cachées
        card2.setAttribute('src', 'assets/images/back.png'); // Les cartes retournées sont différentes on les retourne face cachées
    }else{
        card1.removeEventListener('click', flipCard); // Les cartes retournées sont identiques. On retire l'ecouteur d'évenement.
        card2.removeEventListener('click', flipCard); // Les cartes retournées sont identiques. On retire l'ecouteur d'évenement.
        score++; // On ajoute +1 au score de l'utilisateur
    }
    choosenCards = []; // On vide le tableau

    if (score === 14){ 
        endgame(true); // Partie gagnée [14 est le score maximum que l'on peut obtenir (Nombre de carte sur le plateau/2)]
    }
}

function flipCard(){
    let clickedCardId = this.getAttribute('data-id'); // On récupere l'identifiant de la carte sur laquelle l'utilisateur a cliqué
    if(clickedCardId !== choosenCards[0] && disableGame === false){ // On empeche que l'utilisateur clique 2 fois sur la même carte ou sur plus de 2 cartes par tour de jeu.
        this.classList.add('shake'); // On ajoute une classe à la carte ce qui permet de lui ajouter une animation
        let clickedCardValue = this.getAttribute('data-value'); // On récupére la valeur de la carte qui correspond au fruit.
        choosenCards.push(clickedCardId); // On ajoute l'identifiant de la carte dans le tableau.
        choosenCards.push(clickedCardValue); // On ajoute la valeur de la carte si qui nous permettra de la comparer avec la valeur d'une autre carte.
        this.setAttribute('src', 'assets/images/'+clickedCardValue+'.png'); // On affiche le fruit grace à la valeur de la carte.
        if(choosenCards.length === 4){ // Quand on a choisit 2 cartes
            disableGame = true; // On empeche que pendant la demi-seconde de latence ou les 2 cartes choisies sont face visible le joueur continu de jouer.
            setTimeout(() => {
                checkIfCardsMatches(); //On vérifie si les 2 cartes retournées sont identique ou non.
                disableGame = false; // On Indique qu'on change de tour
            }, 500);
 
        }
    }
}

function endgame(win){
    let msg = 'Partie avortée';
    if (win=== true){
        msg = 'Victoire !!!';
    }else{
        msg = 'Défaite !!!';
    }
    endgameContainer.classList.remove('hide'); // On affiche la modal qui permet à l'utilisateur de stocker sont score en BDD et/ou de rejouer.
    timeToComplete.setAttribute('value', choosenTimeToCompleteGame - chrono); // On affiche le temps mis par l'utilisateur dans le formulaire
    displayScore.setAttribute('value', score); // On affiche le nombre de paires trouvées par l'utilisateur dans le formulaire
    displayResult.innerText = msg; // On affiche le message à l'utilisateur
}

function reset(){
    score = 0;
    clearInterval(timer); // Arreter définitivement le chronométre
    board.innerHTML=''; // Supprimer l'ancien plateau de jeu avant d'en créer un nouveau
    createBoard(); // Créer un plateau de jeu
    startTimer(choosenTimeToCompleteGame); // Lancer le chronométre (le paramétre permet de régler la durée de ce dernier sur 60sec)
}
// Ajout des écouteurs d'évenement (C'est ici que la logique commence pour lancer une partie)
start.addEventListener('click', () => {
    reset();
});

restart.addEventListener('click', () => {
    endgameContainer.classList.add('hide');
    reset();

});
