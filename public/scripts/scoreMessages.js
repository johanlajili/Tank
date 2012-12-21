game.scoreMessages = {};
game.scoreMessages.list = [];
game.scoreMessages.currentStr = "";
game.scoreMessages.show = function(){

	game.scoreMessages.pos = {x:CONTEXT.CANVAS.width - 450,y:CONTEXT.CANVAS.height - 240, w:430, h:180};
	CONTEXT.CTX.fillStyle = "rgba(50, 50, 50, 0.5)";
	CONTEXT.CTX.fillRect(this.pos.x, this.pos.y, this.pos.w, this.pos.h);
	CONTEXT.CTX.fillStyle = "rgb(250, 250, 250)";
	CONTEXT.CTX.fillRect(this.pos.x, this.pos.y + 200, this.pos.w, 20);
	CONTEXT.CTX.fillStyle = "rgb(0, 0, 0)";
	CONTEXT.CTX.fillText(this.currentStr, this.pos.x + 20, this.pos.y + 200 + 20);
	while (this.list.length > 9){
		for (var i = 0; i < this.list.length - 1; i++){				
			console.log(this.list[i], this.list[i + 1]);
			this.list[i] = this.list[i + 1];
		}
		this.list.pop();
	}
	CONTEXT.CTX.fillStyle = "rgb(0, 0, 0)";
	CONTEXT.CTX.font = "16px Helvetica";
	CONTEXT.CTX.textAlign = "left";
	for (var i in this.list){
		CONTEXT.CTX.fillText(this.list[i], this.pos.x + 20, this.pos.y + 20 + (i * 20));
	}

}
game.scoreMessages.add = function(message){

	this.list.push(message);
	this.show();
}
game.scoreMessages.tap = function(str){
	this.currentStr+=str;
}
game.scoreMessages.send = function(){
	if (this.currentStr != "")
		CONTEXT.socket.emit('chatMsg', {id : game.player.id, msg : game.player.name + ": " + this.currentStr});
	this.currentStr = "";
}
game.scoreMessages.bckspc = function(){
	console.log("test");
	this.currentStr = this.currentStr.slice(0, this.currentStr.length - 2);
}