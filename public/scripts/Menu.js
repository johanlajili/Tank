var menu = new Game();

menu.init = function(){
	initCanvas(CONFIG.canvasWidth, CONFIG.canvasHeight, CONFIG.canvasName, menu, document.body);
	this.listButtons = [];
	this.listButtons.push(new Button(this.CANVAS.width/2,2*this.CANVAS.height/4,"Play",50,this.CTX));
	this.isInit = true;
	this.title = new Title(this.CANVAS.width/2,this.CANVAS.height/4,"TANK",200,this.CTX)
	menu.CANVAS.addEventListener("click",menu.actions,false);
	loader.CANVAS = menu.CANVAS;
	loader.CTX = menu.CTX;
}
menu.render = function(){
	this.CTX.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);

	for(var i = 0; i < this.listButtons.length; i++){
		this.listButtons[i].render();

	}
	this.title.render();
}
menu.actions = function(){
	var x = INPUTS.mousePosition.x;
	var y = INPUTS.mousePosition.y;
	for(var i = 0; i < menu.listButtons.length; i++){
		var button = menu.listButtons[i];

		switch (i){
			case 0:
				if(button.checkClick(x,y)){
					CONFIG.displayMenu = false;
					game.init();
					CONTEXT = game;
				}
				break;
		}
	}
}