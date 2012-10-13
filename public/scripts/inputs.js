var keys_list = [

	["left", 37],
	["up", 38],
	["right", 39],
	["down", 40],
	["space", 32],
	["z", 90],
	["q", 81],
	["s", 83],
	["d", 68],
	["a", 65]
];

var INPUTS = {
	mousePosition : {x: 400, y:300}
};
var KEYS = [];
function define_INPUTS(keys){

	for (var i in keys){
		
		var p = keys[i];
		INPUTS[p[0]] = [p[1], 0];
		KEYS[p[1]] = p[0];

	}
}

window.onkeydown = function(event){

	var key = event.keyCode;
	if (KEYS[key] != undefined){

		var p = KEYS[key];
		INPUTS[p][1] = 1;
	}
	if (key == 8 || key == 9 || key == 13 || key == 32){
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
}

window.onkeyup = function(event){

	var key = event.keyCode;
	if (KEYS[key] != undefined){

		var p = KEYS[key];
		INPUTS[p][1] = 0;
	}

}
function clickToShoot(event)
{
	game.player.shoot();
}
function mouseMove(event){
	INPUTS.mousePosition = getMouseCoords(event);

}

INPUTS.getKey = function(key){

	return INPUTS[key][1] || false;
}

function getMouseCoords(event){

	var pos = {x : (event.offsetX || event.layerX), y : (event.offsetY || event.layerY)};
	return {x : pos.x * CONTEXT.widthRatio, y : pos.y * CONTEXT.heightRatio};
}
function resizeScreen(){

	var screenWidth	= (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
	var screenHeight	= (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 5;

	var canvasWidth = CONTEXT.CANVAS.width;
	var canvasHeight = CONTEXT.CANVAS.height;
	if (CONTEXT.resizeMode == "css ratio" && Date.now() - CONTEXT.lastResize > CONTEXT.resizeTimer){
		var widthRatio = screenWidth / canvasWidth;

		if (widthRatio * canvasHeight <= screenHeight){
			CONTEXT.CANVAS.style.width = screenWidth + "px";
			CONTEXT.CANVAS.style.height = Math.floor(canvasHeight * widthRatio) + "px";
			CONTEXT.realWidth = screenWidth;
			CONTEXT.realHeight = Math.floor(canvasHeight * widthRatio);
		}else{
			var heightRatio = screenHeight / canvasHeight;
			
			CONTEXT.CANVAS.style.width = Math.floor(canvasWidth * heightRatio) + "px";
			CONTEXT.CANVAS.style.height = screenHeight + "px";
			CONTEXT.realWidth = Math.floor(canvasWidth * heightRatio);
			CONTEXT.realHeight = screenHeight;
		}

		if (CONTEXT.realWidth < screenWidth){
			CONTEXT.CANVAS.style.marginLeft = Math.floor((screenWidth - CONTEXT.realWidth) / 2) + "px";
		}
		if (CONTEXT.realHeight < screenHeight){
			CONTEXT.CANVAS.style.marginTop = Math.floor((screenHeight - CONTEXT.realHeight) / 2) + "px";
		}
		CONTEXT.lastResize = Date.now();

		CONTEXT.widthRatio = CONTEXT.CANVAS.width / CONTEXT.realWidth;
		CONTEXT.heightRatio = CONTEXT.CANVAS.height / CONTEXT.realHeight
	}
}
window.onresize = function(event){
	resizeScreen();
}
