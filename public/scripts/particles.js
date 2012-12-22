game.Particles = function()
{
	this.canvas = document.createElement("canvas");
	this.canvas.width = game.map.width*game.map.imgWidth;
	this.canvas.height=game.map.height*game.map.imgHeight;
	this.ctx = this.canvas.getContext("2d")
	this.ctx.fillStyle = "green";
	this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
}

game.Particles.prototype.render = function()
{
	game.camera.drawCanvas(this.canvas);
}
