var Game = function(){};

	Game.prototype.update = function(){

	};
	Game.prototype.animate = function(){

	};
	Game.prototype.render = function(){

	};
	Game.prototype.init = function(){

	};
var game = new Game();
var bomb = new Bomb(0,0,800,600,10);
game.render = function(){
	bomb.render(CTX);
}
game.animate = function(){
	bomb.animate();
}