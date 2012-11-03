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

				this.level[i][j] = new Block({x:i, y:j, w:this.imgWidth, h:this.imgHeight}) 
				this.level[i][j].updateWithLetter(this.tempMap[i][j]);
				this.level[i][j].createBody();
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

				var l = this.level[i][j];
				game.camera.drawImage(this.theme, l.theme.x, l.theme.y, l.theme.w, l.theme.h, l.realX, l.realY, l.w, l.h);
				if (l.solid) game.minimap.draw({type:"block", x:l.realX, y:l.realY, w:l.w, h:l.h})
			}
		}
		
	}
}