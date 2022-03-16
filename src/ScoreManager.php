<?php

class ScoreManager extends DbConnexion //extends correspond à l'heritage.
{

    /**
     * Ajoute en BDD un enregistrement contenant le nom, le temps et le score d'un joueur.
     */
    protected function setScore(string $name, int $score, int $time): void 
    {
        $sqlC = "INSERT INTO `best_scores`(`name`, `score`, `time`) VALUES (:playerName, :score, :playTime);"; //Requête en sql avec des paramétres nommés
        $request = $this->connect()->prepare($sqlC); // On prépare la requête
        $request->bindValue(":playerName", $name, PDO::PARAM_STR); //On associe un paramètre nommé à sa valeur
        $request->bindValue(":score", $score, PDO::PARAM_INT); 
        $request->bindValue(":playTime", $time, PDO::PARAM_INT); 
        $request->execute(); // On execute la requête
    }

    /**
     * Retourne les 5 meilleurs enregistrements de la BDD en se basant sur le score(ou le temps en cas d'égalité du score). On retourne un tableau au final.
     */
    public function getScores(): array 
    {
        $sqlR = "SELECT `name`, `score`, `time` FROM `best_scores` ORDER BY `score` DESC, `time` LIMIT 5;"; //Requete en sql 
        $request = $this->connect()->prepare($sqlR); // On prépare la requete
        $request->execute(); // On execute la requête
        $scores = $request->fetchAll();
        return $scores;
    }
}
