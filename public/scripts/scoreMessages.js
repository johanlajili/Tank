game.scoreMessages = {};
game.scoreMessages.list = [];
game.scoreMessages.show = function(){

	for (var i in this.list){
		console.log(this.list[i]);
	}
}
game.scoreMessages.add = function(message){

	this.list.push(message);
	this.show();
}