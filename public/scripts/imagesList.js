var gameImages = [
	
	["chaton_walk", "chaton.jpg"],
	["tankBleu", "Tank/bleu.png"],
	["tankJaune", "Tank/jaune.png"],
	["tankOrange", "Tank/orange.png"],
	["tankVert", "Tank/vert.png"],
	["tankRouge", "Tank/rouge.png"],
	["tankRose", "Tank/rose.png"],
	//lol

	["canonBleu", "Canon/bleu.png"],
	["canonJaune", "Canon/jaune.png"],
	["canonOrange", "Canon/orange.png"],
	["canonVert", "Canon/vert.png"],
	["canonRouge", "Canon/rouge.png"],
	["canonRose", "Canon/rose.png"],

	["crossHairBleu", "CrossHair/bleu.png"],
	["crossHairOrange", "CrossHair/rouge.png"],
	["crossHairJaune", "CrossHair/jaune.png"],
	["crossHairVert", "CrossHair/vert.png"],
	["crossHairRouge", "CrossHair/rouge.png"],
	["crossHairRose", "CrossHair/rose.png"],
	["background", "tiles_Background.png"],

	["Bomb", "Bomb.png"],
	// Map spritesheet
	["theme1", "tiles_Block.png"],
	["logo", "Logo.png"],
	["backgroundMenu", "backgroundMenu.png"],
	["button", "Button.png"],
	["Bombv2", "Bombv2.png"]
];
var imageManager = new NLImages;
imageManager.imagesPath = CONFIG.rImagesPath;
imageManager.pushImages(gameImages);