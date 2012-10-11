game.Player = function(id, color, name){

	if (id !== undefined)
		this.id = id;
	else
		this.id = Math.floor(Math.random() * 9999);

	if (color !== undefined){
		this.color = color;
	}else{
		this.color = randomColor();
	}

	if (name !== undefined)
		this.name = name;
	else
		this.name = "Kévin";

	this.sprite = "player.png";
	this.anims = {
		"walk" : {
			"keys" : 5,
			"time" : 30
		}
	}
	this.angle = 0.2;
	this.speed = 0;
	this.accel = 1;
	this.angleTick = 0.1;
	this.maxSpeed = 10;
	this.minSpeed = -10;

	this.x = 10;
	this.y = 10;
	this.w = 72;
	this.h = 83;

	this.bombs = [];
	this.bombsTimer = 100;
	this.lastBomb = Date.now();

	this.inputs = function(){

		if (INPUTS.getKey("up")){
			console.log("accel" + this.speed);
			this.speed += this.accel;
			if (this.speed > this.maxSpeed)
				this.speed = this.maxSpeed;
		}
		else if (INPUTS.getKey("down")){
			this.speed -= this.accel;
			if (this.speed < this.minSpeed)
				this.speed = this.minSpeed;
		}
		else if (Math.abs(this.speed) < this.accel){
			this.speed = 0;
		}
		else{
			if (this.speed > 0){
				this.speed -= this.accel;
			}
			if (this.speed < 0){
				this.speed += this.accel;
			}
		}
		if (INPUTS.getKey("left")){
			this.angle -= this.angleTick;
		}
		if (INPUTS.getKey("right")){
			this.angle += this.angleTick;
		}
		this.angle %= Math.PI * 2;

		if (INPUTS.getKey("space")){
			this.shoot();
		}

	}
	this.update = function(){

		this.move();
		for (var i in this.bombs){
			this.bombs[i].update();
		}
	}
	this.animate = function(){

	}
	this.render = function(CTX){

		this.drawPlayer(CTX);
		for (var i in this.bombs){
			this.bombs[i].render(CTX);
		}

	}
	this.drawPlayer = function(CTX)
	{
		CTX.drawImage(
			imageManager.getImage("tank"+this.color),
			 this.x,
			 this.y,
			 this.w,
			 this.h);
	}
	this.shoot = function(){
		
		if (game.currdate - this.lastBomb > this.bombsTimer){
			this.bombs.push(new game.Bomb(this.x, this.y, this.x + 50, this.y + 50));
			this.lastBomb = game.currdate;
		}
	}
	this.checkCollision = function(){
		return true;
	}
	this.move = function(){

		if (this.speed != 0 && this.checkCollision()){

			this.x += Math.cos(this.angle) * this.speed;
			this.y += Math.sin(this.angle) * this.speed;
		}
	}


}