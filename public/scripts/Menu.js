var menu = new Game();

menu.init = function(){
	initCanvas(CONFIG.canvasWidth, CONFIG.canvasHeight, CONFIG.canvasName, menu, document.body);
	menu.CANVAS.addEventListener("click", canvasClick, false);

	this.listButtons = [];
	this.listButtons.push(new Button(this.CANVAS.width/2,2*this.CANVAS.height/3,"",35,this.CTX,imageManager.getImage("button"),14));
	this.isInit = true;
	this.title = new Title(this.CTX,imageManager.getImage("logo"));
	loader.CANVAS = menu.CANVAS;
	loader.CTX = menu.CTX;
}
menu.render = function(){
	this.CTX.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);
	this.CTX.drawImage(imageManager.getImage("backgroundMenu"),0,0);
	for(var i = 0; i < this.listButtons.length; i++){
		this.listButtons[i].render();

	}
	this.title.render();
}

menu.onClick = function()
{
	menu.actions();
}
menu.actions = function(){
	var x = INPUTS.mousePosition.x;
	var y = INPUTS.mousePosition.y;
	console.log(x, y);
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