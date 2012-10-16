var Button = function(x,y,text,fontHeight,CTX){
	this.x = x;
	this.y = y;
	this.text = text;
	this.width = CTX.measureText(this.text).width;
	this.height = 100;
	this.fontHeight = fontHeight;
	this.CTX = CTX;
}
Button.prototype.render = function() {
	this.CTX.textBaseline = "alphabetic";
	this.CTX.textAlign = "center";
	this.CTX.font = this.fontHeight+"px Arial";
	this.CTX.fillStyle = "black";
	this.CTX.fillText(this.text,this.x,this.y);
};
Button.prototype.checkClick = function(x,y) {

	if(x >= this.x && x <= this.x+this.width && y <= this.y && y >= this.y-this.height){
		return true;
	}else{
		return false;
	}
};