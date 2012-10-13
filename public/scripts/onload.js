game.init = function(){
	define_INPUTS(keys_list);
	//this.bomb = new game.Bomb(0,0,800,600,4);
	this.players = {};
	this.players["Malharhak"] = new game.Player(13456, "Orange", "Malharhak", 400, 400);
	game.player = this.players["Malharhak"];
	game.map = new game.Map();
	initCanvas(800, 600, "main_canvas", game, document.body);

	//gestion de la minimap
	game.minimap = new Minimap({width: 250, height: 250, virtualWidth: 1440, virtualHeight: 1440, x: 550, ctx: game.CTX, backgroundColor: "gray"});
	game.minimap.createType("block", "square", "green", false, false);
	game.minimap.createType("player", "round", "orange", false, false);
	
	game.camera = new game.Camera(game.CANVAS.width, game.CANVAS.height, game.player, game.CTX);
	game.CANVAS.addEventListener("click", clickToShoot, false);
}
window.onload = function(){

	CONTEXT = game;
	CONTEXT.init();
	run();
}