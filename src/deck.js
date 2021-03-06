const _ = require("lodash");

const suits = [...Array(4).keys()];
const values = [...Array(9).keys()];
const pokerDeck = suits.reduce(
	(arr, suit) => arr.concat(values.map((val) => [suit, val])),
	[]
);

class Deck {
	constructor() {
		this.deck = [...pokerDeck];
	}
	deal() {
		console.log(`Deck size: ${this.deck.length}`);
		// deal 5 initially
		if (this.deck.length < 5) {
			this.refresh();
		}
		const cardsDealed = _.sampleSize(this.deck, 5);
		console.log("Cards dealt:" + JSON.stringify(cardsDealed));
		_.pull(this.deck, ...cardsDealed);
		console.log("Resultant deck: " + JSON.stringify(this.deck));
		return cardsDealed;
	}
	refresh() {
		this.deck = [...pokerDeck];
		console.log("The deck is refreshed.");
	}
	size() {
		return _.size(this.deck);
	}
}

module.exports = Deck;
