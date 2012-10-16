var menu = new Game();

menu.isInit = false;
menu.init = function(){
	this.listButtons = [];
	this.listButtons.push(new Button(this.CANVAS.width/2,2*this.CANVAS.height/4,"Play",50,this.CTX));
	this.isInit = true;
	this.title = new Title(this.CANVAS.width/2,this.CANVAS.height/4,"TANK",200,this.CTX)
	this.CANVAS.addEventListener("click",this.actions(),false);
}
menu.render = function(){
	this.CTX.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);

	for(var i = 0; i < this.listButtons.length; i++){
		this.listButtons[i].render();

	}
	this.title.render();
}
menu.actions = function(event){
	var x = (event.offsetX || event.layerX)*CONFIG.widthRatio;
	var y = (event.offsetY || event.layerY)*CONFIG.heightRatio;
	for(var i = 0; i < this.listButtons.length; i++){
		var button = this.listButtons[i];
		switch (i){
			case 0:
				if(button.checkClick(x,y)){
					CONFIG.displayMenu = false;
				}
				break;
		}
	}
}