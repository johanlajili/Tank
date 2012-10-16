function runMenu(){
	CONTEXT = menu;
	if(!CONTEXT.isInit){
		CONTEXT.init();
	}

	stats.begin();

	CONTEXT.inputs();
	CONTEXT.update();
	CONTEXT.animate();
	CONTEXT.render();

	stats.end();
	if(CONFIG.displayMenu)
		requestAnimationFrame(runMenu);
	else
		requestAnimationFrame(run);

}