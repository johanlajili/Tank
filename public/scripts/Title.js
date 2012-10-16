var Title = function(x,y,text,fontHeight,CTX){
	this.x = x;
	this.y = y;
	this.text = text;
	this.fontHeight = fontHeight;
	this.CTX = CTX;
}

Title.prototype.render = function() {
	this.CTX.textBaseline = "alphabetic";
	this.CTX.textAlign = "center";
	this.CTX.font = this.fontHeight+"px Arial";
	this.CTX.fillStyle = "black";
	this.CTX.fillText(this.text,this.x,this.y);
};