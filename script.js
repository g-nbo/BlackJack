console.log("hello world!");

function startGame() {

}

function createDeck() {
    deckOfCards = [];
    suits = ['spade', 'heart', 'diamond', 'club'];
    
    // For every suit create 13 cards from Ace to King
    suits.forEach(suit => {
        const createCards = [
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

        ];
        deckOfCards.push(createCards);
    });

    console.log(deckOfCards);
}

createDeck();

