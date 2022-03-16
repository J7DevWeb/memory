<section class="modal-container hide" id="endgame-container">
    <div class="modal">
        <h2>Votre résultat</h2>
        <p id="result"></p>
        <form action="includes/new-score.php" method="post" id="form">
            <p id="error" class="error"></p>
            <input type="number" class="invisible" name="score" id="score">
            <input type="number" class="invisible" name="time" id="time-to-complete">
            <label class="name-label" for="name">Votre nom</label>
            <input type="text" name="name" id="name" required>
            <input class="btn" type="submit" value="Soumettre">
        </form>
        <button class="btn" id="restart">Rejouer</button>
    </div>
</section>
