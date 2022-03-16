<section class="modal-container" id="score-container">
    <div class="modal">
        <h2>Tableau des scores</h2>
        <table>
            <thead>
                <tr>
                    <td>Joueurs</td>
                    <td>Scores</td>
                    <td>Temps</td>
                </tr>
            </thead>
            <tbody>
                <?php 
                $scores = new ScoreManager(); // On instancie l'objet ce qui nous permet d'appeler juste après une de ses méthodes
                $scores = $scores->getScores(); // On stock dans une variable le tableau renvoyer par la méthode. Celui ci contient 5 enregistrements que l'on va afficher juste après
                foreach ($scores as $score) { // Pour chaque element [correspondant à un enregistrement (une ligne) de la BDD] dans le tableau on crée une ligne à l'affichage
                ?>
                    <tr>
                        <td><?= $score['name'] ?></td>
                        <td><?= $score['score'] ?></td>
                        <td><?= $score['time'] ?></td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
        <button class="btn" id="start">Jouer</button>
    </div>
</section>
