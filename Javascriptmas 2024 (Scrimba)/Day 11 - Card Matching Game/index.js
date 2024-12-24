const emojis = ["🎄", "🎁", "🎅", "☃️"]; // Your set of emojis

/**
 *🎄 Requirements:
 * - This is a classic "Find the Pair" game with a christmas theme.
 * - The player should be able to reveal cards by clicking on them.
 * - When the player reveals one card, it should stay revealed until a second card is revealed.
 * - When the player reveals two cards:
 *   - If they are the same, they should remain revealed for the rest of the game.
 *   - If they are different, they should be flipped back to hidden.
 * - The cards should be shuffled at the start of each game.
 */

/**
 * 🎅 Stretch Goals:
 * - Add a point system where points are awarded for each correctly revealed pair
 *   and deducted for each incorrect pair (you decide the exact points for each action).
 * - Implement a high-score system using the browser's local storage.
 * - Add a "Restart Game" button that appears when the game ends so the user can start over.
 */

/* start, end inclusive */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const arrayLength = emojis.length;

/*
coolaj86
license CC BY-SA 4.0
https://stackoverflow.com/a/2450976
 */
function shuffleArray(originalArray) {
    const array = [...originalArray];

    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

/*
coolaj86
license CC BY-SA 4.0
https://stackoverflow.com/a/2450976
 */
function shuffleArrayInPlace(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
}

const Card = (value) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.textContent = value ? value + " ?" : "?";
    return div;
};

const gameBoard = document.querySelector("#game-board");

const cardsMatrix = {};
const cardValues = {};
const solvedCards = new Set();
const state = {
    "last-card": undefined,
};

const toggleCard = (element, key) => {
    element.classList.add("revealed");
    element.textContent = cardValues[key];
};

const untoggleCard = (element) => {
    element.classList.remove("revealed");
    element.textContent = "?";
};

const clearLastTarget = () => (state["last-card"] = undefined);

const onClick = (e) => {
    const { currentTarget: target } = e;
    const lastTarget = state["last-card"];

    const key = target.getAttribute("data-index");

    if (solvedCards.has(key)) return;

    console.log({
        target: cardValues[key],
        lastTarget: lastTarget
            ? cardValues[lastTarget.getAttribute("data-index")]
            : undefined,
    });

    if (lastTarget === undefined) {
        toggleCard(target, key);
        state["last-card"] = target;
        return;
    }

    const secondKey = lastTarget.getAttribute("data-index");

    /* match */
    if (cardsMatrix[key] === secondKey) {
        toggleCard(target, key);
        solvedCards.add(target);
        solvedCards.add(lastTarget);
    } else {

    /* no match */
        toggleCard(target, key);
        setTimeout(() => {
            untoggleCard(target);
            untoggleCard(lastTarget);
        }, 500);
    }

    clearLastTarget();
};

const makeCards = () => {
    const allCards = [...emojis, ...emojis].map((value) => Card());

    for (const [index, value] of emojis.entries()) {
        const secondIndex = index + 4;

        const card = allCards[index];
        const secondCard = allCards[secondIndex];

        const [key, secondKey] = [`data-${index}`, `data-${secondIndex}`];

        card.setAttribute("data-index", key);
        secondCard.setAttribute("data-index", secondKey);

        /* crux of solution */

        cardValues[key] = value;
        cardValues[secondKey] = value;

        cardsMatrix[key] = secondKey;
        cardsMatrix[secondKey] = key;

        card.addEventListener("click", onClick);
        secondCard.addEventListener("click", onClick);
    }

    shuffleArrayInPlace(allCards);

    allCards.forEach((element) => gameBoard.append(element));
};

makeCards();
console.log(cardValues);

// console.log(shuffleArray(emojis));
