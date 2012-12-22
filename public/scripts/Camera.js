game.Camera = function(width, height, gameObject, CTX){

	this.x = 0;
	this.y = 0;
	this.width = width;
	this.height = height;
	this.gameObject = gameObject;
	this.CTX = CTX;
	this.debugCounter = 0;
	this.saved = false;
	this.background = imageManager.getImage("background")
	this.pattern = this.CTX.createPattern(this.background, "repeat")
	this.giantCanvas = document.createElement("canvas");
	this.giantCanvas.width = game.map.width*game.map.imgWidth;
	this.giantCanvas.height= game.map.height*game.map.imgHeight;
	this.giantCtx = this.giantCanvas.getContext("2d")
	this.giantCtx.rect(0, 0, this.giantCanvas.width, this.giantCanvas.height);		
  	this.giantCtx.fillStyle = this.pattern;
  	this.giantCtx.fill();
	this.drawCanvas = function(canvas)
	{
    	var pos = {x: this.x, y: this.y, w:this.width, h:this.height};
    	var decalage = {x: 0, y: 0}
    	if (pos.x < 0) 
    		{
    			decalage.x = 0 - pos.x;
    			pos.x = 0;

    		}
    	if (pos.y < 0) 
    		{
    			decalage.y = 0 - pos.y;
    			pos.y = 0;
    		}
    	if (pos.x + pos.w > game.map.width*game.map.imgWidth) 
    		{
    			decalage.x = game.map.width*game.map.imgWidth - pos.x - pos.w;
    			pos.x = (game.map.width*game.map.imgWidth) - this.width;
    		}
    	if (pos.y + pos.h > game.map.height*game.map.imgHeight) 
    		{
    			decalage.y = game.map.width*game.map.imgWidth - pos.y - pos.h; 
    			pos.y = (game.map.height*game.map.imgHeight) - this.height;
    		}
		this.CTX.drawImage(this.giantCanvas, pos.x , pos.y , this.width, this.height, 0+decalage.x, 0+decalage.y, this.width, this.height)
		//this.CTX.fillRect(100,100,100,100)
	//	console.log(this.x, this.y, this.width, this.height)
	}
	this.drawImage = function(img, sx, sy, sw, sh, dx, dy, dw, dh){

		if (arguments.length == 3){

			var dw = imageManager.getImageSize(img).x;
			var dy = imageManager.getImageSize(img).y;
			var dx = sx;
			var dy = sy;
			if (dx + dw > this.x && dx < this.x + this.width && dy + dh > this.y && dy< this.y + this.height || this.saved){

				if (this.saved)
					this.CTX.drawImage(imageManager.getImage(img), sx, sy);
				else
					this.CTX.drawImage(imageManager.getImage(img), sx - this.x, sy - this.y);
			}			

		}else if (arguments.length == 5){

			var dw = imageManager.getImageSize(img).x;
			var dy = imageManager.getImageSize(img).y;
			var dx = sw;
			var dy = sh;
			if (dx + dw > this.x && dx < this.x + this.width && dy + dh > this.y && dy< this.y + this.height || this.saved){

				if (this.saved)
					this.CTX.drawImage(imageManager.getImage(img), sx, sy, sw, sh);
				else
					this.CTX.drawImage(imageManager.getImage(img), sx - this.x, sy - this.y, sw, sh);
			}
		}else if (arguments.length == 9){


			if (dx + dw > this.x && dx < this.x + this.width && dy + dh > this.y && dy< this.y + this.height || this.saved){

				this.CTX.drawImage(imageManager.getImage(img), sx, sy, sw, sh, dx - this.x, dy - this.y, dw, dh);
			}			
		}else{

			if (this.debugCounter >= 300){
				console.log(arguments);
				this.debugCounter = 0;
			}else
				this.debugCounter++;
		}

	}

	this.translate = function(x, y){
		this.CTX.translate(x - this.x, y - this.y);
	}
	this.rotate = function(angle){
		this.CTX.rotate(angle);
	}
	this.save = function(){
		this.saved = true;
		this.CTX.save();
	}
	this.restore = function(){
		this.saved = false;
		this.CTX.restore();
	}
	this.update = function(){
		this.x = Math.floor(gameObject.x - this.width / 2);
		this.y = Math.floor(gameObject.y - this.height / 2);
	}
	this.fromScreenToPoint = function(x, y){
 	return {x : x + this.x, y : y + this.y};
	}
}