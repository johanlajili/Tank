game.init = function(){
	define_INPUTS(keys_list);
	//this.bomb = new game.Bomb(0,0,800,600,4);
	game.physics = new game.Physics();
	this.players = {};
	var name = Math.floor(Math.random() * 99999999);
	this.players[name] = new game.Player(name, "Orange", name );
	game.player = this.players[name];
	
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
	game.ready = false;
	game.init();
	CONTEXT = loader;
	resizeScreen();
	game.socket = io.connect('http://localhost:1337');
	game.initSockets();
	game.ready = true;
	run();
}