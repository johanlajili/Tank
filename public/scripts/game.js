var Game = function(){};
	
	Game.prototype.inputs = function(){

	}
	Game.prototype.update = function(){

	};
	Game.prototype.animate = function(){

	};
	Game.prototype.onClick = function(){

	};
	Game.prototype.render = function(){

	};
	Game.prototype.init = function(){

	};
var game = new Game();
game.render = function(){
	this.CTX.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);
	this.particles.render();
	this.map.render(this.CTX);
	for (var i in this.players){
		this.players[i].render(this.CTX);
	}
	this.minimap.render()
	CONTEXT.scoreMessages.show();
}
game.animate = function(){
	
}
game.onClick = function(){
	game.player.shoot();
}
game.update = function(){
	this.physics.update();
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

var loader = new Game();
loader.render = function(){
	this.CTX.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);
	var loading = imageManager.getLoadPercentage();
	this.CTX.font = "60px Arial";
	this.CTX.fillText("Loading : " + loading + "%", this.CANVAS.width / 2, this.CANVAS.height / 2);
}
loader.update = function(){

	if (imageManager.isLoaded()){
		CONTEXT = menu;

	}
}