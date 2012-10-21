game.Player = function(id, color, name, x, y, srv){

	
	this.update = function(){
		this.move();
			for (var i in this.bombs){
				this.bombs[i].update();
			}
		if (!this.srv)
			this.sendData();
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
		game.camera.save();
		game.camera.translate(this.x , this.y);
		game.camera.rotate(this.angle)
		game.camera.drawImage("tank" + this.color,-this.w/2, -this.h/2,this.w,this.h);
		game.camera.restore();
	}

	this.drawCanon = function()
	{
		game.camera.save();
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
			this.bombs[bombID] = new game.Bomb(this.id, this.x, this.y, this.aimAngle, {x: Math.cos(this.angle) * this.speed, y:Math.sin(this.angle) * this.speed}, bombID);
			this.lastBomb = game.currdate;
		}
	}
	this.checkCollision = function(){
		return true;
	}
	this.getHit = function(pId){
		var message = this.name + " a été touché par " + CONTEXT.players[pId].name;
		if (pId == this.id)
			message = this.name + " s'est suicidé";
		game.scoreMessages.add(message);
	}
	this.move = function(){

			this.getRigidBody().SetLinearVelocity({x: Math.cos(this.angle) * this.speed, y:Math.sin(this.angle) * this.speed})
			this.angle = this.getRigidBody().GetAngle(); // on met à jour avec les infos du moteur physique
			this.x = pixels(this.getRigidBody().GetPosition().x); // idem
			this.y = pixels(this.getRigidBody().GetPosition().y);// idem
	}
	this.destroyBomb = function(bid){
		console.log('ah');
		delete this.bombs[bid];
	}
	this.initPhysics = function(){
		game.physics.createTank(this.x+this.w/2, this.y+this.h/2, this.w/2, this.h/2, {"type" : "player", "id" : this.id});

	}
	this.getRigidBody = function(){
		return CONTEXT.physics.players[this.id];
	}

	this.sendData = function(){

		CONTEXT.socket.emit('playerPing', this.getPlayerDatas());
	}
	this.getPlayerDatas = function(){

		var datas = {

			"id" : this.id,
			"type" : "player",
			"bombs" : this.getBombs(),
			"speed" : this.speed,
			"angle" : this.angle,
			"color" : this.color,
			"name" : this.name,
			"aimAngle" : this.aimAngle,
			"aimPoint" : this.aimPoint,
			"x" : this.x,
			"y" : this.y,
			"angle" : this.angle,
			"lastBeat" : Date.now()
		};
		return datas;
	}

	this.getBombs = function(){

		var bom = {};
		for (var i in this.bombs){
			bom[i] = this.bombs[i].getBombDatas();
		}
		return bom;
	}
	this.initBombs = function(){

		for (var i in this.bombs){
			this.bombs[i] = new game.Bomb(
				this.bombs[i].pId, 
				this.bombs[i].x,
				this.bombs[i].y,
				this.bombs[i].angle, 
				this.bombs[i].velocity, 
				this.bombs[i].bid);
		}
	}

	this.destroy = function(){
		for (var i in this.bombs){
			this.bombs[i].destroy();
		}
		game.physics.world.DestroyBody(this.getRigidBody());
		var id = this.id;
		delete CONTEXT.players[id];
	}
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
	this.srv = false;
	if (srv !== undefined)
		this.srv = srv;

	this.angle = 0;
	this.aimAngle = 0; // angle de tir, en radian
	this.aimPoint = {x: 0, y:0}
	this.speed = 1;
	this.accel = 1;
	this.angleTick = 0.05;
	this.maxSpeed = 2;
	this.minSpeed = -2;
	this.type = "player";

	var spawn = {x:0,y:0};
	while (game.map.level[Math.floor(spawn.x / game.map.imgWidth)][Math.floor(spawn.y / game.map.imgHeight)] != "o"){
		var spawn = {x : Math.floor(Math.random() * game.map.width * game.map.imgWidth), y : Math.floor(Math.random() * game.map.height * game.map.imgHeight)};
		this.x = spawn.x;
		this.y = spawn.y;
	}

	if (x !== undefined)
		this.x = x;
	if (y !== undefined)
		this.y = y;
	this.w = 83;
	this.h = 72;

	this.bombs = {};
	this.bombsTimer = 100;
	this.lastBomb = Date.now();

	this.initPhysics();
	this.inputs = function(){

		if (!this.srv){
			this.aimPoint = game.camera.fromScreenToPoint(INPUTS.mousePosition.x - (this.x + this.w/2), INPUTS.mousePosition.y - (this.y + this.h/2))
			this.aimAngle = this.getAimAngle();
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
			this.getRigidBody().SetAngle (this.angle);
			this.getRigidBody().SetAngularVelocity(); // pour éviter que la rotation du tank parte en danseuse étoile

			if (INPUTS.getKey("space")){
				this.shoot();
			}
		}
	}


}