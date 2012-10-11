var gameImages = [
	
	["chaton_walk", "chaton.jpg"],
	["tankOrange", "Tank/orange.png"],
	["tankPurple", "Tank/purple.png"],
	["tankGreen", "Tank/green.png"],
	["Bomb", "Bomb.png"]
];
var imageManager = new NLImages;
imageManager.imagesPath = game.rImagesPath;
imageManager.pushImages(gameImages);