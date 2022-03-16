const showScore = document.querySelector('#show-score');
const scoreContainer = document.querySelector('#score-container');

showScore.addEventListener('click', () => {
    scoreContainer.classList.remove('hide');
    clearInterval(timer);
});

start.addEventListener('click', () => {
    scoreContainer.classList.add('hide');
});
