game.Map = function(level, theme, name){

	this.width  = 15;
	this.height = 15;

	this.imgWidth = 96;
	this.imgHeight = 96;

	if (level !== undefined)
		this.level = level;
	else{
		this.level = [];

		// Génération d'une map bidon
		for (var i = 0; i < this.width; i++){
			this.level[i] = [];
			for (var j = 0; j < this.height; j++){

				this.level[i][j] = "o";
				if (Math.floor(Math.random() *  20) == 2){
					this.level[i][j] = "w";
					game.physics.createFixeBlock(i*this.imgWidth+this.imgWidth/2, j*this.imgHeight+this.imgHeight/2, this.imgWidth/2, this.imgHeight/2)
				}
				else
				if (i == 0 || j == 0 || i == this.width - 1 || j == this.height - 1){
					this.level[i][j] = "x";
					game.physics.createFixeBlock(i*this.imgWidth+this.imgWidth/2, j*this.imgHeight+this.imgHeight/2, this.imgWidth/2, this.imgHeight/2)
				}
			}
		}
	}

	// Spritesheet pour le look du level
	if (theme !== undefined)
		this.theme = theme;
	else
		this.theme = CONFIG.defaultTheme;

	if (name !== undefined)
		this.name = name;
	else
		this.name = "Anonymousse";

	this.update = function(){

	}

	this.render = function(CTX){

		for (var i = 0; i < this.width; i++){
			for (var j = 0; j < this.height; j++){

				var x = 0;
				var y = 0;
				if (this.level[i][j] == "x" || this.level[i][j] == "w"){
					x = this.imgWidth;
					y = 0;
				}
				game.camera.drawImage(this.theme, x, y, this.imgWidth, this.imgHeight, i * this.imgWidth, j * this.imgHeight, this.imgWidth, this.imgHeight);
				if (x!=0) game.minimap.draw({type:"block", x:i * this.imgWidth, y:j * this.imgHeight, w:this.imgWidth, h:this.imgHeight})
			}
		}
	}
}