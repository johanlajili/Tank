game.init = function(){
	game.ready = false;
	define_INPUTS(keys_list);
	//this.bomb = new game.Bomb(0,0,800,600,4);
	game.physics = new game.Physics();
	this.players = {};
	var pId= Math.floor(Math.random() * 99999999);
	var pseudo = CONFIG.randomPseudos[Math.floor(Math.random() * CONFIG.randomPseudos.length)];
	game.map = new game.Map();
	this.players[pId] = new game.Player(pId, "Orange", pseudo );
	game.player = this.players[pId];
	
	game.CANVAS = CONTEXT.CANVAS;
	game.CTX = CONTEXT.CTX;
	//initCanvas(CONFIG.canvasWidth, CONFIG.canvasHeight, CONFIG.canvasName, game, document.body);
	
	//gestion de la minimap
	game.minimap = new Minimap({width: 100, height: 100, virtualWidth: 1440, virtualHeight: 1440, x: 690, y: 10, ctx: game.CTX, backgroundColor: "gray"});
	game.minimap.createType("block", "square", "green", false, false);
	game.minimap.createType("player", "round", "orange", false, false);
	
	game.camera = new game.Camera(CONTEXT.CANVAS.width, CONTEXT.CANVAS.height, game.player, game.CTX);
	game.CANVAS.addEventListener("click", clickToShoot, false);
	game.camera = new game.Camera(CONTEXT.CANVAS.width, CONTEXT.CANVAS.height, game.player, game.CTX)
	game.socket = io.connect('http://localhost:1337');
	game.initSockets();
	game.ready = true;
}
window.onload = function(event){
	
	menu.init();
	CONTEXT = loader;
	resizeScreen();

	socketLoop();
	run();
}