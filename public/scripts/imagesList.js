var gameImages = [
	
	["chaton_walk", "chaton.jpg"],
	["tankOrange", "Tank/orange.png"],
	["tankPurple", "Tank/purple.png"],
	["tankGreen", "Tank/green.png"],
	["tankBlue", "Tank/blue.png"],
	["tankRed", "Tank/red.png"],
	["canonOrange", "Canon/orange.png"],
	["canonRed", "Canon/red.png"],
	["canonPurple", "Canon/purple.png"],
	["canonGreen", "Canon/green.png"],
	["canonBlue", "Canon/blue.png"],
	["Bomb", "Bomb.png"],
	// Map spritesheet
	["theme1", "theme1.png"]
];
var imageManager = new NLImages;
imageManager.imagesPath = game.rImagesPath;
imageManager.pushImages(gameImages);