// Le but de la validation JS est d'empecher de surcharger le serveur de requetes qui renverront au final une erreur. [Rappel: validation coté client en JS + coté serveur en PHP (la sécurité coté client peut être supprimée par l'utilisateur)]
const form = document.querySelector('#form');
const displayError = document.querySelector('#error');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Empeche la soumission du formulaire
    let messages = [];
    let error = false;

    //Information entrée par l'utilisateur
    const playerName = document.querySelector('#name').value;
    //Informations qu'une personne mal intentionnée pourrait modifier via l'inspecteur(normalement ces champs sont cachés à l'affichage)
    const playerScore = document.querySelector('#score').value;
    const playerTime = document.querySelector('#time-to-complete').value;

    // Vérification des valeurs saisies
    if(playerName.length > 50){
        messages.push('Nom trop Long. Le nom doit contenir moins de 50 lettres, chiffres ou symboles');
        error = true;
    }

    if(playerName.length <= 0){
        messages.push('Veuillez saisir un nom');
        error = true;
    }

    if(playerScore < 0 || playerScore > 14 || playerTime <= 0){
        messages.push('Erreur! Soumission du formulaire impossible. Veuillez recommencer une partie');
        error = true;
    }

    //Utilisation du booléen error pour savoir si on retourne une erreur ou si on soumet le formulaire au serveur
    if(error){
        displayError.innerText = messages.join(', ') + '.';
    }else{
        form.submit();
    }
})


