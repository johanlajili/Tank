function run(){

	CONTEXT.lastdate = CONTEXT.currdate;
	CONTEXT.currdate = Date.now();
	CONTEXT.deltaTime = CONTEXT.currdate - CONTEXT.lastdate;

	CONTEXT.inputs();
	CONTEXT.update();
	CONTEXT.animate();
	CONTEXT.render();
	
	requestAnimationFrame(run);

}