const { MessageEmbed } = require("discord.js");
const mergeCards = require("./mergeCards");
const _ = require("lodash");

const suitsToPNGName = {
	0: "SPADE",
	1: "HEART",
	2: "CLUB",
	3: "DIAMOND",
};

const suitsToAttributeName = _.mapValues(suitsToPNGName, (suit) =>
	_.capitalize(suit)
);

const valuesToPNGName = {
	0: "1",
	1: "2",
	2: "3",
	3: "4",
	4: "5",
	5: "6",
	6: "7",
	7: "8",
	8: "9",
	9: "10",
	10: "11-JACK",
	11: "12-QUEEN",
	12: "13-KING",
};

const valuesToAttributeName = _.merge(
	_.pickBy(valuesToPNGName, (__, key) => key < 10),
	{ 10: "J", 11: "Q", 12: "K" }
);

console.log(JSON.stringify(valuesToAttributeName));

function handCategoryToAttributeName(handCategory) {
	const handCategoryName = {
		GoldCow: "金牛",
		CowSky: "牛天",
		CowGround: "牛地",
		FourOfAKind: "四條",
		CowCow: "牛牛",
		NoCow: "冇牛",
	};
	const numToChinese = [
		"零",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六",
		"七",
		"八",
		"九",
	];
	if (handCategory[1] != 0) {
		return "牛" + numToChinese[handCategory[1]];
	} else {
		return handCategoryName[handCategory[0]];
	}
}

function cardToPNGPath(card) {
	const suit = suitsToPNGName[card[0]];
	const value = valuesToPNGName[card[1]];
	return `${process.cwd()}/assets/${suit}-${value}.png`;
}

async function formatHand(hand, handAttributes, player) {
	const handToPNGPath = hand.map((card) => cardToPNGPath(card));
	let handImagePath, handImageName;
	[handImagePath, handImageName] = await mergeCards(handToPNGPath);
	const handEmbed = new MessageEmbed()
		.setColor("#fc6404")
		.setTitle(`${player.username}'s Hand`)
		.addFields(
			{
				name: "Category",
				value: handCategoryToAttributeName(
					handAttributes["handCategory"]
				),
				inline: true,
			},
			{
				name: "Suit of the Largest Card",
				value: suitsToAttributeName[handAttributes["maxCardSuit"]],
				inline: true,
			},
			{
				name: "Value of the Largest Card",
				value: valuesToAttributeName[handAttributes["maxCardValue"]],
				inline: true,
			}
		)
		.attachFiles([handImagePath])
		.setImage(`attachment://${handImageName}`);
	return handEmbed;
}

module.exports = formatHand;
