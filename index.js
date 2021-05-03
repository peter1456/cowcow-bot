const { Client, MessageEmbed } = require("discord.js");
const { token } = require("./token.json");
const Deck = require("./src/deck");
const formatHand = require("./src/formatHand");
const getHandAttributes = require("./src/getHandAttributes");
const clearCache = require("./utils/clearCache")

const client = new Client();
const deck = new Deck();

const refreshEmbed = new MessageEmbed()
						.setColor("#fc6404")
						.setTitle("Deck refreshed!")
const refreshAlertEmbed =  new MessageEmbed()
							.setColor("#fc6404")
							.setTitle("Less than 5 cards left. Deck will be refreshed!")

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
		await message.channel.send(formattedHand);
		if (deck.size() < 5) {
			message.channel.send(refreshAlertEmbed);
		}
		await clearCache()
	}
	if (message.content === ">>refresh") {
		deck.refresh();
		message.channel.send(refreshEmbed);
	}
});

client.login(token);
