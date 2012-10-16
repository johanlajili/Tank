CONFIG = {};
CONFIG.rImagesPath = "images/";
CONFIG.defaultTheme = "theme1";
CONFIG.resizeMode = "css ratio";
CONFIG.canvasName = "main_canvas";
CONFIG.canvasWidth = 800;
CONFIG.canvasHeight = 600;
CONFIG.resizeTimer = 100;
CONFIG.lastResize = 0;
CONFIG.widthRatio = 1;
CONFIG.heightRatio = 1;
CONFIG.debug = true;
CONFIG.wallBit = 0x0001;
CONFIG.tankBit = 0x0002;
CONFIG.bombBit = 0x0004;
CONFIG.displayMenu = true;

CONFIG.spawns = [];
for (var i = 1; i < 15; i++){
	for (var j = 1; j < 15; j++){
		CONFIG.spawns.push({x : i * 100, y : j * 100});
	}
}