function run(){
	if(CONFIG.displayMenu){
		CONTEXT = menu;
		if(!CONTEXT.isInit){
			CONTEXT.init();
		}
	}else{
		CONTEXT = game;
	}
	CONTEXT.lastdate = CONTEXT.currdate;
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