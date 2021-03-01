const _ = require("lodash");

const suits = [...Array(4).keys()];
const values = [...Array(9).keys()];
const pokerDeck = suits.reduce(
	(arr, suit) => arr.concat(values.map((val) => [suit, val])),
	[]
);

class Deck {
	constructor() {
		this.deck = pokerDeck;
	}
	deal() {
		// deal 5 initially
		if (this.deck.length < 5) {
			this.refresh();
		}
		const cardsDealed = _.sampleSize(this.deck, 5);
		_.pull(this.deck, cardsDealed);
		return cardsDealed;
	}
	refresh() {
		this.deck = pokerDeck;
		console.log("The deck is refreshed.");
	}
}

module.exports = Deck;

