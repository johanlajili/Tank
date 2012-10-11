game.Bomb = function(x,y,xTarget,yTarget){
	this.x = x;
	this.y = y;
	this.xTarget = xTarget;
	this.yTarget = yTarget;
	this.speed = 4;
	this.nb = 0;
	this.xr = this.xTarget - this.x;
	this.yr = this.yTarget - this.y;
	this.rayon = 2* Math.atan(this.yr/(this.xr + Math.sqrt( Math.pow(this.xr,2) + Math.pow(this.yr,2)))) ;


	/*this.image = image;
	this.width = this.image.width;
	this.height = this.image.height;*/	
	//this.collider = collider;
}

game.Bomb.prototype.render = function(CTX) {
	// if(this.image){
	// 	CTX.drawImage(image,x,y);
	// }
	CTX.fillStyle = "black";
	CTX.fillRect(this.x,this.y,10,10);
	
};
game.Bomb.prototype.update = function() {

	//this.nb += this.speed;
	this.x = this.speed * Math.cos(this.rayon) + this.x;
	this.y = this.speed * Math.sin(this.rayon) + this.y;
};
