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
	INPUTS.mousePosition = {x : (event.offsetX || event.layerX), y : (event.offsetY || event.layerY)};
}

INPUTS.getKey = function(key){

	return INPUTS[key][1] || false;
}