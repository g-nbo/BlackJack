// Main deck Variables
let deckOfCards = [];
const suits = ['spade', 'heart', 'diamond', 'club'];

// Players hand Variables
const playersHand = [];
let playerNumOfAces = 0;
let playerMoney = 10000;
let betAmount = 0;
let originalBet = betAmount;

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
const continueGameButton = document.getElementById("continueGameButton")
const gameControlsDiv = document.getElementById("gameControlsDiv");
const restartGameButton = document.getElementById("restartGameButton");



// Display Variables
const displayInfo = document.getElementById("displayInfo");
const gameOutcome = document.getElementById("gameOutcome");
const playersCards = document.getElementById("playersCards");
const dealersCards = document.getElementById("dealersCards");
const playersPoints = document.getElementById("playersPoints");
const dealersPoints = document.getElementById("dealersPoints");
const moneyAmount = document.getElementById("moneyAmount");
const mainHeader = document.getElementById("mainHeader");
const bettingScreen = document.getElementById("bettingScreen");
const betInput = document.querySelector("#bettingScreen input");
const betForm = document.querySelector("#bettingScreen form");



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



    betAmount = originalBet;

    // Hide Start Game button from user
    startButton.style.display = "none";
    // Hide restart Game button
    continueGameButton.style.display = 'none'
    // Hide value of Dealrs hand
    dealersPoints.style.display = 'inline';
    // Show player their money
    moneyAmount.textContent = playerMoney;
    // Hide Main Header
    mainHeader.style.display = 'none'
    // Show betting screen
    bettingScreen.style.display = 'flex'

    const dealerHandDisplay = showCards(dealersHand);
    const playerHandDisplay = showCards(playersHand);

    const playersValue = getHandValue(playersHand);
    const dealersValue = getHandValue(dealersHand);

    playersPoints.innerHTML = playersValue;
    dealersPoints.innerHTML = '?';

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

// Calculates the "value" of the hand that is passed into this function
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
                // Ace = 11 until hand value is over 21
                value[0] = 11;
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

            playerMoney -= betAmount;
            createContinueButton();
            if (playerMoney <= 0) {
                console.log("you went bankrupt!");
                restartGameButton.style.display = 'block';
                continueGameButton.style.display = 'none';
            }
            moneyAmount.textContent = playerMoney;


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

            playerMoney += betAmount;
            moneyAmount.textContent = playerMoney;
            createContinueButton();
        }
    })


    // If player hits the stand button it is now the dealers turn to try and "beat" the player and keep dealing itself cards until it wins
    standButton.addEventListener("click", (event) => {
        // Take away the ability for the player to continue hitting after hitting the stand button.
        hitButton.style.display = 'none'

        let playersValue = getHandValue(playersHand);
        let dealersValue = getHandValue(dealersHand);

        // Evaluate the dealers hand and display it for the users eyes.
        dealersPoints.innerHTML = dealersValue;




        // While dealers hand is not blackjack and is less than or equal to players value keep dealing cards to the dealer
        // Player wins if dealers value is equal to theirs
        while (dealersValue < 21 && dealersValue <= playersValue && playersValue !== 21) {
            dealToDealer();

            // Evaluate the dealers value after getting dealt a card
            dealersValue = getHandValue(dealersHand);

            // If the dealers value is over 21 (losing), and the dealer has aces, 
            // take away 10 value points for each ace that is making the dealer be over 21
            // This essentially makes each ace that is making dealer "bust" worth 1 value point.
            for (i = 0; i < dealerNumOfAces && dealersValue > 21; i++) {
                dealersValue -= 10;
            }
            // Display this new info the user
            showCards(dealersHand);
            dealersPoints.innerHTML = dealersValue;
        }



        if (playersValue >= dealersValue) {
            gameOutcome.textContent = "You win!";
            playerMoney += betAmount;
            moneyAmount.textContent = playerMoney;
            createContinueButton();
        }



        if (dealersValue > 21) {

            gameOutcome.textContent = "Dealer Bust! You Win!";
            playerMoney += betAmount;
            moneyAmount.textContent = playerMoney;
            createContinueButton();
        } else if (playersValue < dealersValue) {

            gameOutcome.textContent = "You lose!!"
            playerMoney -= betAmount;

            moneyAmount.textContent = playerMoney;
            createContinueButton();
            if (playerMoney <= 0) {
                console.log("you went bankrupt!");

                restartGameButton.style.display = 'block';
                continueGameButton.style.display = 'none';
                gameOutcome.textContent = 'You went bankrupt!'
            }
        }
        showCards(dealersHand);
        dealersPoints.style.display = 'inline';

    })

    // Double users bet and give them a card
    doubleDownButton.addEventListener("click", (event) => {
        if (betAmount * 2 <= playerMoney) {
            betAmount = betAmount * 2
            console.log("looks good to me: ", "betAmount: ", betAmount, "playerMoney: ", playerMoney);
            hitButton.click();
        } else if (betAmount * 2 > playerMoney) {
            console.log("You don't have enough to do this! ", "betAmount: ", betAmount, "playerMoney: ", playerMoney);
        }



    })
}

// Reset all game values and info back to default
function createContinueButton() {
    gameControlsDiv.style.display = 'none'
    continueGameButton.style.display = 'block';
    continueGameButton.addEventListener("click", (event) => {
        // Empty deckOfCards array.
        deckOfCards.splice(0);

        // Empty player and dealers hands
        playersHand.splice(0);
        dealersHand.splice(0);

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
        continueGameButton.style.display = 'none';
        startButton.style.display = "block";
        startButton.innerText = 'Play Again!'
        startButton.style.top = ''
        mainHeader.style.display = 'block'
    })
}


// Show a visual representation of hand's value to the user
function showCards(hand) {

    let titleOfCard = "card_images/";

    // Clears hand before before showing udpated set of cards
    if (hand === playersHand) {
        playersCards.innerHTML = '';
    } else if (hand === dealersHand) {
        dealersCards.innerHTML = '';
    }

    // For each card in hand create an image representing its value and append to DOM
    hand.forEach((card) => {
        titleOfCard = "card_images/";
        let valueOfCard = JSON.stringify(Object.keys(card))
        let suitOfCard = JSON.stringify(Object.values(card));

        titleOfCard += valueOfCard[2].toUpperCase();
        titleOfCard += suitOfCard[2].toUpperCase();
        titleOfCard += ".png";

        let image = document.createElement('img');

        // Check which hand we should be appending the image too
        if (hand === playersHand) {
            playersCards.appendChild(image);
        } else if (hand === dealersHand) {
            dealersCards.appendChild(image);
        }

        image.setAttribute("src", titleOfCard)

        // If this card is the first card the dealer has been dealt, 
        // hide it from the user temporarily by making the image the back of a card
        if (hand === dealersHand && firstDealerCard) {
            firstDealerCard = false;
            image.setAttribute("src", "card_images/red_back.png");

        }

    })
    return;
}

// Restarts the entire game to complete default, even resetting the "money" or "coins"
function createRestartButton() {
    restartGameButton.addEventListener("click", (event) => {
        console.log("restarting")
        continueGameButton.style.display = 'block';
        continueGameButton.click();
        continueGameButton.style.display = 'none';
        playerMoney = 10000;
        moneyAmount.textContent = playerMoney;
        restartGameButton.style.display = 'none';
        mainHeader.style.display = 'block'
    })
}

// Allows the player to use the betScreen and input how much they would like to bet each round
function getBet() {
    betForm.addEventListener("submit", (event) => {

        if (Number(betInput.value) && Number(betInput.value) <= playerMoney) {
            betAmount = Number(betInput.value);
            bettingScreen.style.display = 'none';
            gameControlsDiv.style.display = 'block';
            displayInfo.style.display = 'block';
        } else if (Number(betInput.value) > playerMoney) {
            console.log("You can't bet more coins than you own!");
        }

    })
}






createDeck();
startButton.addEventListener("click", startGame);
addGameControls();
getBet();
createRestartButton();



// Requirements go here:

// Iterate over a collection of elements to accomplish some task.
playerButtons.forEach((button) => {
    console.log('this is a button');
})
// Use at least two Browser Object Model (BOM) properties or methods.
setInterval(() => {
    setTimeout(() => {
        console.log("very slow console log");
    }, 0);
    
}, 10000000);
// Use the parent-child-sibling relationship to navigate between elements at least once (firstChild, lastChild, parentNode, nextElementSibling, etc.).
console.log(startButton.parentNode)
// Use the DocumentFragment interface or HTML templating with the cloneNode method to create templated content. 
const template = document.querySelector("#requirement");
const clone = template.content.cloneNode(true);
console.log(clone);


