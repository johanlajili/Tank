function randomColor(){

	var str = "rgb(" + Math.floor(Math.random() * 250) + ", " + Math.floor(Math.random() * 250) + ", " + Math.floor(Math.random() * 250) + ")";
	return str;
}
function metre(value){
	return (value / 100);
}
function pixels(value){
	return (value*100)
}