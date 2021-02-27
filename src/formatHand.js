const { MessageEmbed } = require("discord.js");
const mergeCards = require("./mergeCards");

const suitsToEmojis = {
	0: "SPADE",
	1: "HEART",
	2: "CLUB",
	3: "DIAMOND",
};

const valuesToEmojis = {
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

function cardToPNGPath(card) {
	suit = suitsToEmojis[card[0]];
	value = valuesToEmojis[card[1]];
	return `${process.cwd()}/assets/${suit}-${value}.png`;
}

async function formatHand(hand, player) {
	const handToPNGPath = hand.map((card) => cardToPNGPath(card));
	let handImagePath, handImageName;
	[handImagePath, handImageName] = await mergeCards(handToPNGPath);
	const handEmbed = new MessageEmbed()
		.setColor("#fc6404")
		.setTitle(`${player.username}'s Hand`)
		.attachFiles([handImagePath])
		.setImage(`attachment://${handImageName}`);
	return handEmbed;
}

module.exports = formatHand;
