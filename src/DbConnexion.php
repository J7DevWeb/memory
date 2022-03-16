<?php

class DbConnexion 
{

    protected function connect() // Protected car seul les classes qui en hérite peuvent l'utiliser
    {
        //Constantes
        define('DBHOST', 'localhost');
        define('DBNAME', 'memory_poo');
        define('DBUSER', 'root');
        define('DBPASS', '');

        //DSN de connexion (dsn = data source name)
        $dsn = "mysql:dbname=" . DBNAME .";host=" . DBHOST; 

        //Assurer la connexion
        try {
            $db = new PDO($dsn, DBUSER, DBPASS); // On instancie la classe PDO
            return $db;
           
        } catch(PDOException $e) {
            print "Erreur : " . $e->getMessage() . "<br/>"; //Affiche un message d'erreur si echec de la connexion
        }
    }

}
