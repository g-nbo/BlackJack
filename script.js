// Main deck Variables
const deckOfCards = [];
const suits = ['spade', 'heart', 'diamond', 'club'];

// Players hand Variables
const playersHand = [];

// Dealer hand Variables
const dealersHand = [];

// Element Variables
const startButton = document.getElementById("startButton");
const playerButtons = document.querySelectorAll(".playerButtons");
const hitButton = document.getElementById("hitButton");
const standButton = document.getElementById("standButton");
const doubleDownButton = document.getElementById("doubleDownButton");

// Creates a random number from 0 to our Max parameter.
function getRandNum(max) {
    return Math.floor(Math.random() * max)
}

// Creates a random number from 0 to the size of our deck.
function getRandCard(deck) {
    return deckOfCards[getRandNum(deck.length)]
}

function startGame() {
    // Deal 2 cards to the Dealer
    dealToDealer();
    dealToDealer();
    // and 2 cards to the Player
    dealToPlayer();
    dealToPlayer();
    console.log('Players Hand: ', playersHand, 'Dealers Hand: ', dealersHand)


    // Hide Start Game button from user
    startButton.style.display = "none";
    // Add Game Controls Buttons
    addGameControls();
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


function giveRandCard(hand) {
    const randCard = getRandCard(deckOfCards);
    hand.push(randCard);
    deckOfCards.splice(deckOfCards.indexOf(randCard), 1);
    return hand;
}

// Deal 1 Random Card within our Deck Of Cards array to the Player

function dealToPlayer() {
    return giveRandCard(playersHand);
}

// Deal 1 Random Card within our Deck Of Cards array to the Dealer
function dealToDealer() {
    return giveRandCard(dealersHand);
}

function addGameControls() {

    // Show Users game control buttons (hit stand and double down)
    playerButtons.forEach(button => {
        button.style.display = 'block'
    });

    hitButton.addEventListener("click", (event) => {
        dealToPlayer();
        console.log(playersHand);
        console.log(deckOfCards);
    })
}


console.log("Deck Of Cards: ", createDeck());
startButton.addEventListener("click", startGame);


