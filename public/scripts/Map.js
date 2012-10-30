game.Map = function(level, theme, name){

	this.width  = 15;
	this.height = 15;

	this.imgWidth = 96;
	this.imgHeight = 96;
	this.randomCoeff = 15;
	this.nearRandomCoeff = 4;
	this.tempMap = 	JSON.parse('[["x","x","x","x","x","x","x","x","x","x","x","x","x","w","x"],["x","o","o","o","o","o","o","o","o","o","o","o","w","o","x"],["x","w","o","o","o","o","o","o","o","e","o","o","e","w","w"],["x","w","o","o","o","o","o","o","o","o","o","o","o","o","x"],["x","w","w","w","w","e","o","o","o","o","o","o","o","o","w"],["x","o","o","o","o","o","o","o","o","e","o","o","o","o","x"],["x","o","o","o","o","o","o","o","o","o","o","o","o","o","x"],["x","o","o","o","o","o","o","o","o","o","o","o","o","o","x"],["x","o","o","w","o","o","o","o","o","w","o","o","o","o","x"],["x","w","o","o","o","w","o","w","w","o","o","o","o","o","x"],["x","o","o","o","o","o","o","o","o","w","w","w","o","o","w"],["w","o","o","o","o","o","o","o","o","o","o","o","o","o","x"],["w","o","o","o","o","o","o","o","o","o","o","o","o","o","x"],["x","o","o","o","o","o","o","o","o","o","w","o","o","o","w"],["x","x","x","x","x","x","x","x","x","x","x","w","x","w","w"]]');

	if (level !== undefined)
		this.level = level;
	else{
		this.level = [];

		// Génération d'une map bidon
		for (var i = 0; i < this.width; i++){
			this.level[i] = [];
			for (var j = 0; j < this.height; j++){

				// Temp code using pregenerated map :
				this.level[i][j] = this.tempMap[i][j];
				if (this.level[i][j] == "x" || this.level[i][j] == "w" || this.level[i][j] == "e")
					game.physics.createFixeBlock(i*this.imgWidth+this.imgWidth/2, j*this.imgHeight+this.imgHeight/2, this.imgWidth/2, this.imgHeight/2);
				/*
				this.level[i][j] = "o";
				var coeff = this.randomCoeff;
				if ((i > 0 && j > 0 )&& (this.level[i-1][j] == "w"|| this.level[i][j-1] == "w"))
					coeff = this.nearRandomCoeff
				if (Math.floor(Math.random() *  coeff) == 2){
					this.level[i][j] = "w";
					game.physics.createFixeBlock(i*this.imgWidth+this.imgWidth/2, j*this.imgHeight+this.imgHeight/2, this.imgWidth/2, this.imgHeight/2)
				}
				else
				if (i == 0 || j == 0 || i == this.width - 1 || j == this.height - 1){
					this.level[i][j] = "x";
					game.physics.createFixeBlock(i*this.imgWidth+this.imgWidth/2, j*this.imgHeight+this.imgHeight/2, this.imgWidth/2, this.imgHeight/2)
				}
				*/
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

	this.blocks = {
		"x" : {

			"x" : 96,
			"y" : 0
		},
		"o" : {

			"x" : 0,
			"y" : 0
		},
		"w" : {

			"x" : 96,
			"y" : 0
		},
		"e" : {
			"x" : 192,
			"y" : 0
		}
	};

	this.update = function(){

	}

	this.render = function(CTX){

		for (var i = 0; i < this.width; i++){
			for (var j = 0; j < this.height; j++){

				var l = this.level[i][j];
				var x = this.blocks[l].x;
				var y = this.blocks[l].y;

				game.camera.drawImage(this.theme, x, y, this.imgWidth, this.imgHeight, i * this.imgWidth, j * this.imgHeight, this.imgWidth, this.imgHeight);
				if (x!=0) game.minimap.draw({type:"block", x:i * this.imgWidth, y:j * this.imgHeight, w:this.imgWidth, h:this.imgHeight})
			}
		}
	}
}