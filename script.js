// Main deck Variables
const deckOfCards = [];
const suits = ['spade', 'heart', 'diamond', 'club'];

// Players hand Variables
const playersHand = [];

// Dealer hand Variables
const dealersHand = [];

// Element Variables
const startButton = document.getElementById("startButton");

// Creates a random number from 0 to our Max parameter.
function getRandNum(max) {
    return Math.floor(Math.random() * max)
}

// Creates a random number from 0 to the size of our deck.
function getRandCard(deck) {
    return deckOfCards[getRandNum(deck.length)]
}

function startGame() {
    // console.log("Dealers Hand: ", dealToDealer());
    console.log("Players Hand: ", dealToPlayer());

}

// Creates 4 suits, 13 cards for each suit and 52 total cards.
function createDeck() {

    // For every suit create 13 cards from Ace to King.
    suits.forEach(suit => {

        // Push all cards into our deckOfCards array.
        deckOfCards.push(
            { Ace: suit },
            { 2: suit },
            { 3: suit },
            { 4: suit },
            { 5: suit },
            { 6: suit },
            { 7: suit },
            { 8: suit },
            { 9: suit },
            { 10: suit },
            { Jack: suit },
            { Queen: suit },
            { King: suit },
        );
    });
    return deckOfCards;
}


// Deal 1 Random Card within our Deck Of Cards array to the Player

function dealToPlayer() {
    const randCard = getRandCard(deckOfCards);
    playersHand.push(randCard)
    return playersHand;
}

// Deal 1 Random Card within our Deck Of Cards array to the Dealer
function dealToDealer() {
    const randCard = getRandCard(deckOfCards);
    dealersHand.push(randCard);
    return dealersHand;
}


console.log("Deck Of Cards: ", createDeck());
startButton.addEventListener("click", startGame);


