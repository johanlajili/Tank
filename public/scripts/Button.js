var Button = function(x,y,text,fontHeight,CTX){
	this.x = x;
	this.y = y;
	this.text = text;
	this.width = CTX.measureText(this.text).width;
	this.height = 50;
	this.fontHeight = fontHeight;
	this.CTX = CTX;
}
Button.prototype.render = function() {
	this.CTX.textBaseline = "bottom";
	this.CTX.textAlign = "center";
	this.CTX.font = this.fontHeight+"px Arial";
	this.width = CONTEXT.CTX.measureText(this.text).width;
	this.CTX.fillStyle = "black";
	//this.CTX.fillRect(this.x-this.width/2,this.y-this.height,this.width,this.height);
	this.CTX.fillText(this.text,this.x,this.y);
};
Button.prototype.checkClick = function(x,y) {

	if(x >= this.x-this.width/2 && x <= this.x-this.width/2+this.width && y <= this.y && y >= this.y-this.height){
		return true;
	}else{
		return false;
	}
};