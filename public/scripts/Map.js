game.Map = function(level, theme, name){

	this.width  = 15;
	this.height = 15;

	this.imgWidth = 96;
	this.imgHeight = 96;
	this.randomCoeff = 15;
	this.nearRandomCoeff = 4;
	this.tempMap =
	   [["o","=","=","=","=","=","=","=","=","=","=","=","=","=","o"],
		["u",".",".",".",".","v",".",".","v",".",".",".",".",".","u"],
		["u",".",".",".",".","v",".",".","v",".",".",".",".",".","u"],
		["u",".",".",".",".","v",".",".","v",".",".",".",".",".","u"],
		["u",".",".",".",".","v",".",".","v",".",".",".",".",".","u"],
		["u",".",".",".",".","x","e","e","x",".",".",".",".",".","u"],
		["u",".",".",".",".",".",".",".",".",".",".",".",".",".","u"],
		["u",".",".","z",".",".",".",".",".",".","z",".",".",".","u"],
		["u",".",".","u",".",".",".",".",".",".","u",".",".",".","u"],
		["u",".",".","u",".",".",".",".",".",".","u",".",".",".","u"],
		["u",".",".","u",".",".",".",".",".",".","u",".",".",".","u"],
		["u",".",".","u",".",".",".",".",".",".","u",".",".",".","u"],
		["u",".",".","u",".",".",".",".",".",".","u",".",".",".","u"],
		["u",".",".","v",".",".",".",".",".",".","v",".",".",".","u"],
		["o","=","=","=","=","=","=","=","=","=","=","=","=","=","o"]];

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
				if (l.visible)game.camera.drawImage(this.theme, l.theme.x, l.theme.y, l.theme.w, l.theme.h, l.realX, l.realY, l.w, l.h);
				if (l.solid && l.visible) game.minimap.draw({type:"block", x:l.realX, y:l.realY, w:l.w, h:l.h})
			}
		}
		
	}
}