game.Particles = function()
{
	this.canvas = document.createElement("canvas");
	this.canvas.width = game.map.width*game.map.imgWidth;
	this.canvas.height=game.map.height*game.map.imgHeight;
	this.ctx = this.canvas.getContext("2d")
	this.smoke = imageManager.getImage("smoke");
}

game.Particles.prototype.render = function()
{
	game.camera.drawCanvas(this.canvas);
}

game.Particles.prototype.drawTrace = function(x, y, angle)
{
	this.ctx.save();
	this.ctx.translate(x, y);
	this.ctx.rotate(angle);
	var teinte = (Math.random()*255)
	this.ctx.fillStyle = "rgb(40,40,40)"
	this.ctx.fillRect(0 - 40, 0 - 30, 10, 20);
	this.ctx.fillRect(0 - 40, 0 + 10, 10, 20);
	this.ctx.restore();
}

game.Particles.prototype.drawSmoke = function(x, y)
{
  var size = 10;
  	this.ctx.drawImage(this.smoke, x-5, y-5)
 }
