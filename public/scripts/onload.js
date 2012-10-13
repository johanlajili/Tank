game.init = function(){
	define_INPUTS(keys_list);
	//this.bomb = new game.Bomb(0,0,800,600,4);
	this.players = {};
	this.players["Malharhak"] = new game.Player(13456, "Orange", "Malharhak", 400, 400);
	game.player = this.players["Malharhak"];
	game.map = new game.Map();

	initCanvas(CONFIG.canvasWidth, CONFIG.canvasHeight, CONFIG.canvasName, game, document.body);
	loader.CANVAS = game.CANVAS;
	loader.CTX = game.CTX;
	//gestion de la minimap
	game.minimap = new Minimap({width: 100, height: 100, virtualWidth: 1440, virtualHeight: 1440, x: 690, y: 10, ctx: game.CTX, backgroundColor: "gray"});
	game.minimap.createType("block", "square", "green", false, false);
	game.minimap.createType("player", "round", "orange", false, false);
	
	game.camera = new game.Camera(game.CANVAS.width, game.CANVAS.height, game.player, game.CTX);
	game.CANVAS.addEventListener("click", clickToShoot, false);
	game.camera = new game.Camera(game.CANVAS.width, game.CANVAS.height, game.player, game.CTX)
}
window.onload = function(event){

	game.init();
	CONTEXT = loader;
	resizeScreen();
	run();
}