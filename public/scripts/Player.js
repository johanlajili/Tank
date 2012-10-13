game.Player = function(id, color, name, x, y){

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
	this.angle = 0;
	this.aimAngle = 0; // angle de tir, en radian
	this.aimPoint = {x: 0, y:0}
	this.speed = 0;
	this.accel = 0.5;
	this.angleTick = 0.05;
	this.maxSpeed = 2;
	this.minSpeed = -2;

	var spawn = CONFIG.spawns[Math.floor(Math.random() * CONFIG.spawns.length)];
	this.x = spawn.x;
	this.y = spawn.y;
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
	
	this.update = function(){
	this.aimPoint = game.camera.fromScreenToPoint(INPUTS.mousePosition.x - (this.x + this.w/2), INPUTS.mousePosition.y - (this.y + this.h/2))
	this.aimAngle = this.getAimAngle();
		this.move();
		for (var i in this.bombs){
			this.bombs[i].update();
		}
	}

	this.getAimAngle = function(){

		return Math.atan2(INPUTS.mousePosition.y - CONTEXT.CANVAS.height / 2, INPUTS.mousePosition.x - CONTEXT.CANVAS.width / 2);
	}
	this.animate = function(){

	}
	this.render = function(CTX){

		this.drawPlayer();
		for (var i in this.bombs){
			this.bombs[i].render(CTX);
		}
		this.drawCanon(CTX);
		game.minimap.draw({type:"player", x:this.x, y:this.y, w:this.w/2, h:this.h})
		this.drawTarget(CTX);
	}
	this.drawPlayer = function()
	{
		game.camera.save()
		game.camera.translate(this.x , this.y);
		game.camera.rotate(this.angle)
		game.camera.drawImage("tank" + this.color,-this.w/2, -this.h/2,this.w,this.h);
		game.camera.restore();
	}

	this.drawCanon = function()
	{
		game.camera.save()
		game.camera.translate(this.x , this.y);
		game.camera.rotate(this.aimAngle)
		game.camera.drawImage("canon" + this.color,-this.w/2, -this.h/2,this.w,this.h);
		game.camera.restore();
	}
	this.drawTarget = function(CTX){
		
		CTX.drawImage(imageManager.getImage("crossHair" + this.color), INPUTS.mousePosition.x - imageManager.getImageSize("crossHair" + this.color).x / 2, INPUTS.mousePosition.y - imageManager.getImageSize("crossHair" + this.color).y / 2);

	}
	this.shoot = function(){
		
		if (game.currdate - this.lastBomb > this.bombsTimer){
			var bombID = Math.floor(Math.random() * 9999);
			this.bombs[bombID] = new game.Bomb(this.id, this.x, this.y, this.aimAngle);
			this.bombs[bombID].id = bombID;
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
	this.destroyBomb = function(bid){
		delete this.bombs[bid];
	}


}