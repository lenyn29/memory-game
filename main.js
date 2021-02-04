const cards = document.querySelectorAll('.memory-card')

let hasFlippedCard = false;
let lookBoard = false;
let firstCard, secondCard;

function clear () {
    cards.forEach( card => card.addEventListener('click', flipCard));
    cards.forEach( card => card.classList.remove('flip'));
    setTimeout(() => {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
            resetBoard();
        });
    },1000);
}


document.getElementById("boton").onclick = function() {
    clear();
}

function flipCard () {
    if (lookBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
    }

function checkForMatch() {
    let isMatch = firstCard.dataset.color === secondCard.dataset.color

    isMatch ? disableCard() : unflipCard();
}

function disableCard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCard() {
    lookBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    },1500);
}

function resetBoard() {
    [hasFlippedCard, lookBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
