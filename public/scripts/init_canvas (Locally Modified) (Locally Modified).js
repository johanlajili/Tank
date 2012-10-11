var canvas;
var ctx;
function initCanvas(width,height,id,gameName){
	canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	canvas.id = id;
	document.body.appendChild(canvas);
	document.title = gameName;
	ctx = canvas.getContext('2d');
}