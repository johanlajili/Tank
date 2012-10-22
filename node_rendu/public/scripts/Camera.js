game.Camera = function(width, height, gameObject, CTX){

	this.x = 0;
	this.y = 0;
	this.width = width;
	this.height = height;
	this.gameObject = gameObject;
	this.CTX = CTX;
	this.debugCounter = 0;
	this.saved = false;

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