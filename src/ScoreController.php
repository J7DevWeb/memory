<?php

class ScoreController extends ScoreManager //Quand la classe sera instanciée on obtiendra un objet
{

    private string $name; //Propriété (=variable dans une classe)
    private int $score;
    private int $time;
    
    public function __construct(string $name, int $score, int $time)
    {
        $this->name = $name; //On affecte la valeur en parametre à la propriété (On fait référence à la propriété avec $this->$ropriété)
        $this->score = $score;
        $this->time = $time;
    }

    public function newScore(): void
    {
        $this->setScore($this->name, $this->score, $this->time);
    }

}
