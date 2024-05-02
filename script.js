// Main deck Variables
let deckOfCards = [];
const suits = ['spade', 'heart', 'diamond', 'club'];

// Players hand Variables
const playersHand = [];
let playerNumOfAces = 0;
let playerMoney = 1000;
let betAmount = 100;

// Dealer hand Variables
const dealersHand = [];
let dealerNumOfAces = 0;
let firstDealerCard = true;

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

const moneyAmount = document.getElementById("moneyAmount");


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


    // Hide Start Game button from user
    startButton.style.display = "none";
    // Hide restart Game button
    restartGameButton.style.display = 'none'
    // Hide value of Dealrs hand
    dealersPoints.style.display = 'none';

    // Create a function that takes hand as a parameter and does these same things
    const dealerHandDisplay = showCards(dealersHand);
    const playerHandDisplay = showCards(playersHand);

    const playersValue = getHandValue(playersHand);
    const dealersValue = getHandValue(dealersHand);

    // playersCards.innerHTML = playerHandDisplay;
    playersPoints.innerHTML = playersValue;

    // dealersCards.innerHTML = dealerHandDisplay;
    dealersPoints.innerHTML = dealersValue;
    displayInfo.style.display = "block";

    // Show Game Controls Buttons to the user
    gameControlsDiv.style.display = 'block'

    // Show cards to the user

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
                // if an ace appears store that info with the hand that has it
                if (hand === dealersHand) {
                    dealerNumOfAces = 0;
                    
                    hand.forEach((card) => {
                        if (JSON.stringify(Object.keys(card)) === '["Ace"]') {

                            dealerNumOfAces++;
                        }
                    })
                }
                if (hand === playersHand) {
                    playerNumOfAces = 0;

                    hand.forEach((card) => {
                        if (JSON.stringify(Object.keys(card)) === '["Ace"]') {

                            playerNumOfAces++;
                        }
                    })
                }
                value[0] = 11;
                // Ace = 11 until hand value is over 21
                break;
            default:
                value[0] = value[0];

        }
        totalValue += parseInt(value[0]);


    });
    return totalValue;
}

function addGameControls() {


    // Give player a new card everytime they click this button then check if bust (lose) or Blackjack (win)
    hitButton.addEventListener("click", (event) => {
        dealToPlayer();


        let playersValue = getHandValue(playersHand);
        let dealersValue = getHandValue(dealersHand);

        
        for (i = 0; i < playerNumOfAces && playersValue > 21; i++) {
            playersValue -= 10;
        }
        showCards(playersHand)
        playersPoints.innerHTML = playersValue;

        
        dealersPoints.innerHTML = dealersValue;

        // If the value of players hand is greater than 21 end the game and tell the player they've bust
        if (playersValue > 21) {
            gameOutcome.textContent = "You Bust! You lose!";

            dealersValue = getHandValue(dealersHand);
            for (i = 0; i < dealerNumOfAces && dealersValue > 21; i++) {
                dealersValue -= 10;
            }
            showCards(dealersHand);
            dealersPoints.innerHTML = dealersValue;
            dealersPoints.style.display = 'inline';
            createRestartButton();

            // If the value of players hand is equal to 21 end the game and tell the player they've won
        } else if (playersValue === 21) {
            gameOutcome.textContent = "BlackJack! You win!";

            dealersValue = getHandValue(dealersHand);
            for (i = 0; i < dealerNumOfAces && dealersValue > 21; i++) {
                dealersValue -= 10;
            }
            showCards(dealersHand);
            dealersPoints.innerHTML = dealersValue;
            dealersPoints.style.display = 'inline';
            createRestartButton();
        }
    })


    // 
    standButton.addEventListener("click", (event) => {
        hitButton.style.display = 'none'

        let playersValue = getHandValue(playersHand);
        let dealersValue = getHandValue(dealersHand);

        dealersPoints.innerHTML = dealersValue;





        while (dealersValue < 21 && dealersValue <= playersValue && playersValue !== 21) {
            dealToDealer();

            dealersValue = getHandValue(dealersHand);
            for (i = 0; i < dealerNumOfAces && dealersValue > 21; i++) {
                dealersValue -= 10;
            }
            showCards(dealersHand);
            dealersPoints.innerHTML = dealersValue;
        }



        if (playersValue >= dealersValue) {
            gameOutcome.textContent = "You win!";

            createRestartButton();
        }



        if (dealersValue > 21) {

            gameOutcome.textContent = "Dealer Bust! You Win!";

            createRestartButton();
        } else if (playersValue < dealersValue) {

            gameOutcome.textContent = "You lose!!"

            createRestartButton();
        }
        showCards(dealersHand);
        dealersPoints.style.display = 'inline';

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


        firstDealerCard = true;
        dealersPoints.style.display = 'none';

        playerNumOfAces = 0;
        dealerNumOfAces = 0;

        playersCards.innerHTML = '';
        dealersCards.innerHTML = '';
        gameOutcome.textContent = '';
        hitButton.style.display = 'inline';

        displayInfo.style.display = 'none';
        gameControlsDiv.style.display = 'none';
        restartGameButton.style.display = 'none';
        startButton.style.display = "block";
    })
}


// Show a visual representation of hand's value to the user
function showCards(hand) {

    let titleOfCard = "images/";

    // Clears hand before before showing udpated set of cards
    if (hand === playersHand) {
        playersCards.innerHTML = '';
    } else if (hand === dealersHand) {
        dealersCards.innerHTML = '';
    }

    // For each card in hand create an image representing its value and append to DOM
    hand.forEach((card) => {
        titleOfCard = "images/";
        let valueOfCard = JSON.stringify(Object.keys(card))
        let suitOfCard = JSON.stringify(Object.values(card));

        titleOfCard += valueOfCard[2].toUpperCase();
        titleOfCard += suitOfCard[2].toUpperCase();
        titleOfCard += ".png";

        let image = document.createElement('img');

        if (hand === playersHand) {
            playersCards.appendChild(image);
        } else if (hand === dealersHand) {
            dealersCards.appendChild(image);
        }

        image.setAttribute("src", titleOfCard)

        // If this card is the first card the dealer has been dealt, hide it from the user temporarily by making the image the back of a card
        if (hand === dealersHand && firstDealerCard) {
            firstDealerCard = false;
            image.setAttribute("src", "images/red_back.png");

        }
        
    })
    return;
}

function betting() {
    let bet = prompt("How much would you like to bet?");

    moneyAmount.textContent = playerMoney;
}



createDeck();
startButton.addEventListener("click", startGame);
addGameControls();




