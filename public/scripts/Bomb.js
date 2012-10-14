game.Bomb = function(pId, x,y,angle, velocity){

	this.x = x;
	this.y = y;
	this.pId = pId;
	this.angle = angle
	this.type = "bomb";

	this.speed = 0.01;
	this.nb = 0;

	this.img = "Bomb";
	this.image = imageManager.getImage(this.img);
	this.width = this.image.width;
	this.height = this.image.height;
	this.destroyed = false;
	this.life = 2;
	this.start = Date.now();
	// rotate around that point, converting our 
	// angle from degrees to radians
	
	//this.collider = collider;
	this.rigidBody = game.physics.createBullet(this.x, this.y, this.width/2, this).GetBody();
	this.rigidBody.SetLinearVelocity(velocity)
	this.rigidBody.ApplyImpulse ({x: this.speed*Math.cos(this.angle), y: this.speed*Math.sin(this.angle)}, {x:0,y:0});
}

game.Bomb.prototype.onCollision = function(other)
{
	console.log("Bomb collision");
	this.life--;
	if (this.life ==0){
		this.destroyed = true;
	}
	if (other.m_userData.type == "player"){
		other.m_userData.getHit(this.pId);
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
	game.camera.drawImage(this.img, -(this.image.width/2), -(this.image.height/2));
 
	// and restore the co-ords to how they were when we began
	game.camera.restore(); 
	
};
game.Bomb.prototype.update = function() {
	this.rigidBody.SetAngularVelocity(0);
	this.angle = this.rigidBody.GetAngle();
	this.x = pixels(this.rigidBody.GetPosition().x); // idem
	this.y = pixels(this.rigidBody.GetPosition().y);// idem
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
game.Bomb.prototype.destroy = function(){
	game.physics.world.DestroyBody(this.rigidBody);
	var p = CONTEXT.players[this.pId];
	p.destroyBomb(this.bid);

}
