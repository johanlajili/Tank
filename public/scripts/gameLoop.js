function run(){

	CONTEXT.lastdate = CONTEXT.currdate || Date.now();
	CONTEXT.currdate = Date.now();
	CONTEXT.deltaTime = CONTEXT.currdate - CONTEXT.lastdate;

	stats.begin();

	CONTEXT.inputs();
	CONTEXT.update();
	CONTEXT.animate();
	CONTEXT.render();

	stats.end();
	
	requestAnimationFrame(run);

}
function socketLoop(){
	if (CONTEXT == game){
		CONTEXT.player.sendData();
	}

	setTimeout(socketLoop, 60);
}