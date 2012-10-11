var gameImages = [
	
	["chaton_walk", "chaton.jpg"],
	["tankOrange", "Tank/orange.png"],
	["tankPurple", "Tank/purple.png"],
	["tankGreen", "Tank/green.png"],
	["canon", "Canon/generic.png"],
	["Bomb", "Bomb.png"]
	["canon", "Canon/generic.png"]


	// Map spritesheet
	["theme1", "theme1.png"]
];
var imageManager = new NLImages;
imageManager.imagesPath = game.rImagesPath;
imageManager.pushImages(gameImages);