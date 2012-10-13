game.init = function(){
	define_INPUTS(keys_list);
	//this.bomb = new game.Bomb(0,0,800,600,4);
	this.players = {};
	this.players["Malharhak"] = new game.Player(13456, "Orange", "Malharhak");
	game.player = this.players["Malharhak"];
	game.map = new game.Map();
	initCanvas(game.canvasWidth, game.canvasHeight, game.canvasName, game, document.body);
	game.CANVAS.addEventListener("click", clickToShoot, false);
	game.camera = new game.Camera(game.CANVAS.width, game.CANVAS.height, game.player, game.CTX)
}
window.onload = function(event){


	CONTEXT = game;
	CONTEXT.init();

	resizeScreen();
	run();
}