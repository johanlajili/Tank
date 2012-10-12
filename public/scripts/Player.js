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

	}
	if (main)
	{
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
		game.CANVAS.addEventListener("click", this.shoot, false); 
	}
	this.update = function(){
	this.aimAngle = Math.atan2(INPUTS.mousePosition.y - (this.y + this.h/2), INPUTS.mousePosition.x - (this.x + this.w/2));
		this.move();
		for (var i in this.bombs){
			this.bombs[i].update();
		}
	}
	this.animate = function(){

	}
	this.render = function(CTX){

		this.drawPlayer(CTX);
		this.drawCanon(CTX);
		for (var i in this.bombs){
			this.bombs[i].render(CTX);
		}

	}
	this.drawPlayer = function(CTX)
	{
		CTX.save()
		CTX.translate(this.x , this.y);
		CTX.rotate(this.angle)
		CTX.drawImage(imageManager.getImage("tank"+this.color),-this.w/2, -this.h/2,this.w,this.h);
		CTX.restore();
	}

	this.drawCanon = function(CTX)
	{
		CTX.save()
		CTX.translate(this.x , this.y);
		CTX.rotate(this.aimAngle)
		CTX.drawImage(imageManager.getImage("canon"),-this.w/2, -this.h/2,this.w,this.h);
		CTX.restore();
	}
	this.shoot = function(){
		
		if (game.currdate - this.lastBomb > this.bombsTimer){
			this.bombs.push(new game.Bomb(this.x, this.y, this.aimAngle, INPUTS.mousePosition.x, INPUTS.mousePosition.y,imageManager.getImage('Bomb')));
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