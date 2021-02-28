const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const _ = require("lodash");

const CARD_WIDTH = 233;
const CARD_HEIGHT = 312;
const CARD_PADDING = 20;
const CANVAS_WIDTH = CARD_WIDTH * 5 + CARD_PADDING * 4;
const CANVAS_HEIGHT = CARD_HEIGHT;

async function addCardToCanvas(card, position, ctx) {
	const image = await loadImage(card);
	ctx.drawImage(
		image,
		position * (CARD_WIDTH + CARD_PADDING),
		0,
		CARD_WIDTH,
		CARD_HEIGHT
	);
}

function writeImageToCache(canvas) {
	const cacheImageName = `${_.now()}.png`;
	const cacheImagePath = `${process.cwd()}/cache/${cacheImageName}`;
	const buffer = canvas.toBuffer("image/png");
	fs.writeFileSync(cacheImagePath, buffer);
	return [cacheImagePath, cacheImageName];
}

async function mergeCards(cards) {
	const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	const ctx = canvas.getContext("2d");
	await Promise.all(
		cards.map((card, idx) => addCardToCanvas(card, idx, ctx))
	);
	return writeImageToCache(canvas);
}

module.exports = mergeCards;
