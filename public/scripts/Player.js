game.Player = function(id, color, name, main){

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

	if (main !== undefined)
		this.main = main;
	else
		this.main = false;

	this.sprite = "player.png";
	this.anims = {
		"walk" : {
			"keys" : 5,
			"time" : 30
		}
	}
	this.angle = 0;
	this.aimAngle = 0; // angle de tir, en radian
	this.aimPoint = {x: 0, y:0}
	this.speed = 0;
	this.accel = 0.5;
	this.angleTick = 0.05;
	this.maxSpeed = 2;
	this.minSpeed = -2;

	this.x = 10;
	this.y = 10;
	this.w = 83;
	this.h = 72;

	this.bombs = [];
	this.bombsTimer = 100;
	this.lastBomb = Date.now();
	this.inputs = function(){

		if (INPUTS.getKey("up")){
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
		//game.CANVAS.addEventListener("click", this.shoot, false); 
	
	this.update = function(){
	this.aimPoint = game.camera.fromScreenToPoint(INPUTS.mousePosition.x - (this.x + this.w/2), INPUTS.mousePosition.y - (this.y + this.h/2))
	this.aimAngle = Math.atan2(this.aimPoint.y, this.aimPoint.x);
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
		this.drawCanon(CTX);

	}
	this.drawPlayer = function(CTX)
	{
		game.camera.save()
		game.camera.translate(this.x , this.y);
		CTX.rotate(this.angle)
		game.camera.drawImage("tank" + this.color,-this.w/2, -this.h/2,this.w,this.h);
		game.camera.restore();
	}

	this.drawCanon = function(CTX)
	{
		game.camera.save()
		game.camera.translate(this.x , this.y);
		CTX.rotate(this.aimAngle)
		game.camera.drawImage("canon" + this.color,-this.w/2, -this.h/2,this.w,this.h);
		game.camera.restore();
	}
	this.shoot = function(){
		
		if (game.currdate - this.lastBomb > this.bombsTimer){
			this.bombs.push(new game.Bomb(this.x, this.y, this.aimAngle, this.aimPoint.x, this.aimPoint.y,'Bomb'));
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