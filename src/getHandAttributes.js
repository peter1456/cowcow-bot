const _ = require("lodash");

function k_combinations(arr, k) {
	// arr needs to be unique
	if (k === 0) {
		return [];
	}
	if (arr.length === k) {
		return [arr];
	}
	let sol = [];
	for (let val of _.dropRight(arr, k - 1)) {
		const sub_combis = k_combinations(
			_.takeRightWhile(arr, (o) => o != val),
			k - 1
		);
		const val_combi = sub_combis.length
			? sub_combis.map((combi) => [val].concat(combi))
			: [[val]];
		sol = sol.concat(val_combi);
	}
	return sol;
}

const fiveCThree = k_combinations([...Array(5).keys()], 3);

const HAND_CATEGORY_RANK = ["GoldCow", "CowCow", "Cow", "NoCow"];

function getMaxCard(hand) {
	return _.maxBy(hand, (card) => card[1] * 10 + (4 - card[0]));
}

function getHandCategory(hand) {
	if (_.every(hand, (card) => card[1] + 1 === 10)) {
		return ["GoldCow", 0];
	}
	let possibleCategories = [];
	for (let combination of fiveCThree) {
		const splittedHand = _.partition(hand, (card) =>
			_.includes(
				_.map(combination, (idx) => hand[idx]),
				card
			)
		);
		const hasCow =
			_.sumBy(splittedHand[0], (card) => card[1] + 1) % 10 === 0;
		const pairSum = _.sumBy(splittedHand[1], (card) => card[1] + 1) % 10;
		if (!hasCow) {
			possibleCategories.push(["NoCow", 0]);
		} else if (pairSum === 0) {
			possibleCategories.push(["CowCow", 0]);
		} else {
			possibleCategories.push(["Cow", pairSum]);
		}
	}
	return _.maxBy(
		possibleCategories,
		(cat) => 4 - _.indexOf(HAND_CATEGORY_RANK, cat[0]) + cat[1]
	);
}

function getHandAttributes(hand) {
	const handNoJQK = hand.map((card) => [card[0], _.clamp(card[1], 0, 9)]);
	const maxCard = getMaxCard(hand);
	const handCategory = getHandCategory(handNoJQK);
	return {
		handCategory: handCategory,
		maxCardSuit: maxCard[0],
		maxCardValue: maxCard[1],
	};
}

module.exports = getHandAttributes;
