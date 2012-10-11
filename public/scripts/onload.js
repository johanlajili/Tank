game.init = function(){
	define_INPUTS(keys_list);
	//this.bomb = new game.Bomb(0,0,800,600,4);
	this.players = {};
	this.players["Malharhak"] = new game.Player(13456, "Orange", "Malharhak");
}
window.onload = function(){

	CONTEXT = game;
	CONTEXT.init();
	initCanvas(800, 600, "main_canvas", game, document.body);
	run();
}