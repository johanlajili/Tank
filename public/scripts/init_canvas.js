game.CANVAS;
game.CTX;
function initCanvas(width,height,id,game,parent){
	canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	canvas.id = id;
	parent.appendChild(canvas);
	//document.title = gameName;
	game.CANVAS = canvas;
	canvas.onmousemove = function(event)
	{
		mouseMove(event);
	}
	game.CTX = canvas.getContext('2d');
}