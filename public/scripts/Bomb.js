game.Bomb = function(x,y,angle,xTarget, yTarget, img){
	this.x = x;
	this.y = y;
	this.xTarget = xTarget;
	this.yTarget = yTarget;
	this.speed = 4;
	this.nb = 0;
	this.xr = this.xTarget - this.x;
	this.yr = this.yTarget - this.y;
	this.rayon = angle ;
	this.img = img;
	this.image = imageManager.getImage(this.img);
	this.width = this.image.width;
	this.height = this.image.height;

	// rotate around that point, converting our 
	// angle from degrees to radians
	
	this.angle = angle
	//this.collider = collider;
}

game.Bomb.prototype.render = function(CTX) {
	// save the current co-ordinate system 
	// before we screw with it
	game.camera.save(); 
 
	// move to the middle of where we want to draw our image
	game.camera.translate(this.x, this.y);
 
	//var angle = Math.atan2(this.y - this.y, this.x+100 - this.x) - Math.atan2(this.yTarget - this.y, this.xTarget - this.x);
	//Math.atan2(B.getY() - A.getY(), B.getX() - A.getX()) - Math.atan2(N.getY() - M.getY(), N.getX() - M.getX())
	CTX.rotate(this.angle);
 
	// draw it up and to the left by half the width
	// and height of the image 
	game.camera.drawImage(this.img, -(this.image.width/2), -(this.image.height/2));
 
	// and restore the co-ords to how they were when we began
	game.camera.restore(); 
	
};
game.Bomb.prototype.update = function() {

	//this.nb += this.speed;
	this.x = this.speed * Math.cos(this.rayon) + this.x;
	this.y = this.speed * Math.sin(this.rayon) + this.y;
};
