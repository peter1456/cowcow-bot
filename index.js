const { Client } = require("discord.js");
const { token } = require("./token.json");
const Deck = require("./src/deck");
const formatHand = require("./src/formatHand");
const getHandAttributes = require("./src/getHandAttributes");

const client = new Client();
const deck = new Deck();

client.on("ready", () => {
	console.log("I am ready!");
});

client.on("message", async (message) => {
	if (message.author.bot) return;
	if (message.content === ">>deal") {
		let hand = deck.deal();
		const handAttributes = getHandAttributes(hand);
		const formattedHand = await formatHand(
			hand,
			handAttributes,
			message.author
		);
		message.channel.send(formattedHand);
	}
});

client.login(token);
