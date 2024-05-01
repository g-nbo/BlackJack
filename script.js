// Main deck Variables
let deckOfCards = [];
const suits = ['spade', 'heart', 'diamond', 'club'];

// Players hand Variables
const playersHand = [];

// Dealer hand Variables
const dealersHand = [];

// Element Variables
// Player Buttons
const startButton = document.getElementById("startButton");
const playerButtons = document.querySelectorAll(".playerButtons");
const hitButton = document.getElementById("hitButton");
const standButton = document.getElementById("standButton");
const doubleDownButton = document.getElementById("doubleDownButton");
const restartGameButton = document.getElementById("restartGameButton")
const gameControlsDiv = document.getElementById("gameControlsDiv");


// Info Display Variables
const displayInfo = document.getElementById("displayInfo")

const gameOutcome = document.getElementById("gameOutcome");
const playersCards = document.getElementById("playersCards");
const dealersCards = document.getElementById("dealersCards");

const playersPoints = document.getElementById("playersPoints");
const dealersPoints = document.getElementById("dealersPoints");




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
    // Hide restart Game button
    restartGameButton.style.display = 'none'

    // Create a function that takes hand as a parameter and does the same thing
    const dealerHandDisplay = showCards(dealersHand);
    const playerHandDisplay = showCards(playersHand);

    const playersValue = getHandValue(playersHand);
    const dealersValue = getHandValue(dealersHand);

    playersCards.innerHTML = playerHandDisplay;
    playersPoints.innerHTML = playersValue;

    dealersCards.innerHTML = dealerHandDisplay;
    dealersPoints.innerHTML = dealersValue;
    displayInfo.style.display = "block";
    // Add Game Controls Buttons
    gameControlsDiv.style.display = 'block'

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
    console.log('Ace prompt is running');
    if (parseInt(valueOfAce) === 1 || parseInt(valueOfAce) === 11) {
        alert(`Good choice! You picked ${valueOfAce}`);
        return valueOfAce;
    } else {
        alert("ERROR: Pick either 1 or 11!")
        // Loop back through promptIfAce function until user gives 1 or 11
        return promptIfAce();
    }
}

function getHandValue(hand, i) {
    let totalValue = 0;
    hand.forEach(card => {
        let value = Object.keys(card);
        switch (value[0]) {
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
                value[0] = 10;
                break;
            default:
                value[0] = value[0];

        }
        totalValue += parseInt(value[0]);

    });
    return totalValue;
}

function addGameControls() {
    console.log("Game controls is running!");
    // Show Users game control buttons (hit stand and double down)
    

    // Give player a new card everytime they click this button then check if bust or not
    hitButton.addEventListener("click", (event) => {
        dealToPlayer();
        console.log("We've been hit!");
        const dealerHandDisplay = showCards(dealersHand);
        const playerHandDisplay = showCards(playersHand);

        const playersValue = getHandValue(playersHand);
        const dealersValue = getHandValue(dealersHand);

        playersCards.innerHTML = playerHandDisplay;
        playersPoints.innerHTML = playersValue;

        dealersCards.innerHTML = dealerHandDisplay;
        dealersPoints.innerHTML = dealersValue;
        console.log("Players Hand: ", playersHand)

        // If the value of players hand is greater than 21 end the game and tell the player they've bust
        if (playersValue > 21) {
            console.log(playersHand);
            gameOutcome.textContent = "You Bust! You lose!"
            createRestartButton();

            // If the value of players hand is equal to 21 end the game and tell the player they've won
        } else if (playersValue === 21) {
            console.log(playersHand);
            gameOutcome.textContent = "BlackJack! You win!";
            createRestartButton();
        }

    })

    standButton.addEventListener("click", (event) => {
        hitButton.style.display = 'none'

        const playersValue = getHandValue(playersHand);
        let dealersValue = getHandValue(dealersHand);

        const dealerHandDisplay = showCards(dealersHand);
        const playerHandDisplay = showCards(playersHand);

        playersCards.innerHTML = playerHandDisplay;
        playersPoints.innerHTML = playersValue;

        dealersCards.innerHTML = dealerHandDisplay;
        dealersPoints.innerHTML = dealersValue;

        if (dealersValue <= playersValue && dealersValue < 21) {
            dealToDealer();
            dealersValue = getHandValue(dealersHand);
            dealersCards.innerHTML = dealerHandDisplay;
            dealersPoints.innerHTML = dealersValue;
        } else if (playersValue >= dealersValue) {

            gameOutcome.textContent = "You win!";
            createRestartButton();
        }


        if (dealersValue > 21) {

            gameOutcome.textContent = "Dealer Bust! You Win!";
            createRestartButton();
        } else if(playersValue < dealersValue){

            gameOutcome.textContent = "You lose!!"
            createRestartButton();
        }

    })
}

// Reset all game values and info back to default
function createRestartButton() {
    gameControlsDiv.style.display = 'none'
    restartGameButton.style.display = 'block';
    restartGameButton.addEventListener("click", (event) => {
        // Empty deckOfCards array.
        deckOfCards.splice(0)

        // Empty player and dealers hands
        playersHand.splice(0)
        dealersHand.splice(0)

        // push a new set of 52 cards back in to deckOfCards.
        createDeck();


        gameOutcome.textContent = ''
        hitButton.style.display = 'inline'

        displayInfo.style.display = 'none'
        gameControlsDiv.style.display = 'none'
        restartGameButton.style.display = 'none'
        startButton.style.display = "block"
    })



}


//
function showCards(hand) {
    let titleOfCard = "<hr/>";
    hand.forEach((card) => {
        titleOfCard += Object.keys(card);
        titleOfCard += " of " + Object.values(card) + '<br/>';

    })
    return titleOfCard;
}



console.log("Deck Of Cards: ", createDeck());
startButton.addEventListener("click", startGame);
addGameControls();



