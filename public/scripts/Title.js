var Title = function(CTX,image){
	this.CTX = CTX;
	this.image = image;
	this.height = this.image.height;
	this.width = this.image.width;
}

Title.prototype.render = function() {
	this.CTX.drawImage(this.image,(CONTEXT.CANVAS.width/2)-(this.width/2),(CONTEXT.CANVAS.height/4)-(this.height/2));
};