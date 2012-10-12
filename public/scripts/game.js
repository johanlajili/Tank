var Game = function(){};

	Game.prototype.inputs = function(){

	}
	Game.prototype.update = function(){

	};
	Game.prototype.animate = function(){

	};
	Game.prototype.render = function(){

	};
	Game.prototype.init = function(){

	};
var game = new Game();
game.render = function(){
	this.CTX.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);
	this.map.render(this.CTX);

	for (var i in this.players){
		this.players[i].render(this.CTX);
	}
}
game.animate = function(){
}
game.update = function(){

	//this.bomb.update();
	for (var i in this.players){
		this.players[i].update(); 
	}
	this.camera.update();
}
game.inputs = function(){

	for (var i in this.players){

		this.players[i].inputs();
	}
}