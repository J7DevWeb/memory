<?php
// Include necessaire afin d'instancier l'objet ScoreController
include_once '../src/DbConnexion.php';
include_once '../src/ScoreManager.php';
include_once '../src/ScoreController.php';

if (isset($_POST['name'], $_POST['time'], $_POST['score']) && !empty($_POST['name']) && strlen($_POST['name']) < 50 && strlen($_POST['name']) > 0) {
    //Recuperation des données des champs du formulaire
    (string) $name = strip_tags($_POST['name']); //strip_tags protége des injections de code
    $score = (int) $_POST['score']; // On caste en integer la donnée reçus depuis le formulaire par la super globale $_POST.
    $time = (int) $_POST['time'];

    if ($score >= 0 && $score <= 14 && $time > 0){
        $newScore = new ScoreController($name, $score, $time); // On instancie l'objet (methode magique __construct() automatiquement appelée)
        $newScore->newScore(); // On appelle la methode qui ajoute un enregistrement en BDD.
    }
    header('Location: /'); //Renvoyer l'utilisateur vers l'accueil après l'ajout en BDD.

}else{
    header('Location: /'); // Si une erreur lors de la soumission du formulaire a lieu l'utilisateur est renvoyé vers l'accueil sans message d'erreur
}
