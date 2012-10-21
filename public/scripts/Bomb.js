game.Bomb = function(pId, x,y,angle, velocity, bid){

	this.x = x;
	this.y = y;
	this.pId = pId;
	this.angle = angle
	this.type = "bomb";
	this.bid = bid;
	this.speed = 0.01;
	this.nb = 0;

	this.img = "Bombv2";
	//this.image = imageManager.getImage(this.img);
	this.width = imageManager.getImageSize(this.img).x;
	this.height = imageManager.getImageSize(this.img).y;
	this.destroyed = false;
	this.life = 2;
	this.start = Date.now();
	this.ghostLife = 200;
	this.velocity = velocity;
	this.ghost = true;
	// rotate around that point, converting our 
	// angle from degrees to radians
	
	//this.collider = collider;
	this.initPhysics();
	this.getRigidBody().SetLinearVelocity(velocity)
	this.getRigidBody().SetAngle(this.angle);
	this.getRigidBody().ApplyImpulse ({x: this.speed*Math.cos(this.angle), y: this.speed*Math.sin(this.angle)}, {x:0,y:0});
}

game.Bomb.prototype.getBombDatas = function(){
	var b = {

		"x" : this.x,
		"y" : this.y,
		"pId" : this.pId,
		"bid" : this.bid,
		"angle" : this.getRigidBody().GetAngle(),
		"type" : this.type,
		"speed" : this.speed,
		"life" : this.life,
		"destroyed" : this.destroyed,
		"start" : this.start,
		"ghostMode" : this.ghostMode,
		"velocity" : this.velocity
	};
	//console.log(this.angle);
	return b;
}
game.Bomb.prototype.onCollision = function(other)
{

	this.life--;
	if (this.life ==0){
		this.destroyed = true;
	}
	if (other.m_userData.type == "player"){
		CONTEXT.players[other.m_userData.id].getHit(this.pId);
	}
}
game.Bomb.prototype.render = function(CTX) {
	// save the current co-ordinate system 
	// before we screw with it
	game.camera.save(); 
 
	// move to the middle of where we want to draw our image
	game.camera.translate(this.x, this.y);
 
	//var angle = Math.atan2(this.y - this.y, this.x+100 - this.x) - Math.atan2(this.yTarget - this.y, this.xTarget - this.x);
	//Math.atan2(B.getY() - A.getY(), B.getX() - A.getX()) - Math.atan2(N.getY() - M.getY(), N.getX() - M.getX())
	game.camera.rotate(this.angle);
 
	// draw it up and to the left by half the width
	// and height of the image 
	game.camera.drawImage(this.img, -(this.width/2), -(this.height/2));
 
	// and restore the co-ords to how they were when we began
	game.camera.restore(); 
	
};
game.Bomb.prototype.update = function() {

	if (this.ghost && CONTEXT.currdate - this.start > this.ghostLife)
	{
		var filter = this.getRigidBody().GetFixtureList().GetFilterData();
		filter.categoryBits   = CONFIG.bombBit;
		this.getRigidBody().GetFixtureList().SetFilterData(filter);
		this.ghost = false;
		console.log("o hai");
	}

	this.getRigidBody().SetAngularVelocity(0);
	this.angle = this.getRigidBody().GetAngle();
	this.x = pixels(this.getRigidBody().GetPosition().x); // idem
	this.y = pixels(this.getRigidBody().GetPosition().y);// idem
	if (this.destroyed)
	{
		this.destroy();
	}
	/*
	//this.nb += this.speed;
	this.x += this.speed * Math.cos(this.angle);
	this.y += this.speed * Math.sin(this.angle);
	if (CONTEXT.currdate - this.start > this.life)
		this.destroy();
	*/
};

game.Bomb.prototype.initPhysics = function(){
	game.physics.createBomb(this.x, this.y, this.width/2, {"type" : "bomb", "bid" : this.bid, "pId" : this.pId, "onCollision" : this.onCollision});

}

game.Bomb.prototype.getRigidBody = function(){
	return CONTEXT.physics.players[this.pId].bombs[this.bid];
}
game.Bomb.prototype.destroy = function(){
	game.physics.world.DestroyBody(this.getRigidBody());
	var p = CONTEXT.players[this.pId];
	p.destroyBomb(this.bid);

}
