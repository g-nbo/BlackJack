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

// Removes a card from our deckOfCards array and gives that card to another array "hand".
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

// Improve this functionality later if you have time, Ace should have the ability to be 1 and 11 at the same time, whatever benefits the user more.
function promptIfAce() {
    const valueOfAce = prompt("Would you like your ace to be a 1 or an 11?");

    if(parseInt(valueOfAce) === 1 || parseInt(valueOfAce) === 11) {
        alert(`Good choice! You picked ${valueOfAce}`);
        return valueOfAce;
    } else {
        alert("ERROR: Pick either 1 or 11!")
        return promptIfAce();
    }
}

function getHandValue(hand, i) {
    let totalValue = 0;
    hand.forEach(card => {
        let value = Object.keys(card);
        switch(value[0]) {
            case "Jack":
                value[0] = 10;
                break;
            case "Queen":
                value[0] = 10;
                break;
            case "King":
                value[0] = 10;
                break;
            case "Ace":
                value[0] = promptIfAce();;
                break;
            default:
                value[0] = value[0];
            
        }
        console.log(value)
        totalValue += parseInt(value[0]);
        console.log(totalValue)

    });
}

function addGameControls() {

    // Show Users game control buttons (hit stand and double down)
    playerButtons.forEach(button => {
        button.style.display = 'block'
    });

    // Give player a new card everytime they click this button then check if bust or not
    hitButton.addEventListener("click", (event) => {
        dealToPlayer();
        console.log(playersHand);
        getHandValue(playersHand);
    })
}


console.log("Deck Of Cards: ", createDeck());
startButton.addEventListener("click", startGame);


