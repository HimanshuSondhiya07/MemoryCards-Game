// Array containing card values
const cardsArray = [
    'HTML', 'HTML', 'CSS', 'CSS', 'JS', 'JS', 'React', 'React', 
    'NodeJS', 'NodeJS', 'MongoDB', 'MongoDB'
];

let firstCard = null;
let secondCard = null;
let attempts = 0;
let matchedPairs = 0;

// Function to shuffle the cards array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to create the game board
function createBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    shuffle(cardsArray);

    // Create each card element
    cardsArray.forEach((value) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const frontFace = document.createElement('div');
        frontFace.classList.add('card-face', 'card-front');

        const backFace = document.createElement('div');
        backFace.classList.add('card-face', 'card-back');
        backFace.innerText = value;

        cardInner.appendChild(frontFace);
        cardInner.appendChild(backFace);
        card.appendChild(cardInner);
        card.addEventListener('click', handleCardClick);
        board.appendChild(card);
    });

    // Reset attempts and matched pairs
    attempts = 0;
    matchedPairs = 0;
    document.getElementById('attempts').innerText = attempts;
}

// Function to handle card click
function handleCardClick(event) {
    const clickedCard = event.currentTarget;

    // Ignore if the same card is clicked or if the card is already matched or flipped
    if (clickedCard === firstCard || clickedCard.classList.contains('matched') || clickedCard.classList.contains('flipped')) {
        return;
    }

    clickedCard.classList.add('flipped');

    if (!firstCard) {
        // If this is the first card of the pair being clicked
        firstCard = clickedCard;
    } else {
        // If this is the second card of the pair being clicked
        secondCard = clickedCard;
        attempts++;
        document.getElementById('attempts').innerText = attempts;

        // Check if the two cards match
        if (firstCard.dataset.value === secondCard.dataset.value) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            resetTurn();
            matchedPairs++;

            // Check if all pairs have been matched
            if (matchedPairs === cardsArray.length / 2) {
                setTimeout(() => alert(`Congratulations! You completed the game in ${attempts} attempts.`), 300);
            }
        } else {
            // If the cards do not match, flip them back after a short delay
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetTurn();
            }, 1000);
        }
    }
}

// Function to reset the turn
function resetTurn() {
    firstCard = null;
    secondCard = null;
}

// Event listener for the restart button
document.getElementById('restart').addEventListener('click', createBoard);

// Initialize the game on page load
createBoard();
