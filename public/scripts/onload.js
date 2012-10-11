game.init = function(){
	define_INPUTS(keys_list);
	//this.bomb = new game.Bomb(0,0,800,600,4);
	this.players = {};
	this.players["Malharhak"] = new game.Player(13456, "Orange", "Malharhak");
	game.player = this.players["Malharhak"];
	game.map = new game.Map();
	initCanvas(800, 600, "main_canvas", game, document.body);
	game.camera = new game.Camera(game.CANVAS.width, game.CANVAS.height, game.player, game.CTX)
}
window.onload = function(){

	CONTEXT = game;
	CONTEXT.init();
	run();
}