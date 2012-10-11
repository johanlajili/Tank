game.Map = function(level, theme, name){

	this.width  = 15;
	this.height = 15;

	if (level !== undefined)
		this.level = level;
	else{
		this.level = [];

		// Génération d'une map bidon
		for (var i = 0; i < this.width; i++){
			this.level[i] = [];
			for (var j = 0; j < this.height; j++){

				var place = this.level[i][j];
				place = "o";
				if (i == 0 || j == 0 || i == this.width - 1 || j == this.height - 1){
					place = "x";
				}
				if (Math.floor(Math.random() *  50) == 2){
					place = "w";
				}
			}
		}
	}

	// Spritesheet pour le look du level
	if (theme !== undefined)
		this.theme = theme;
	else
		this.theme = defaultTheme;
}