
game.initSockets = function(){
game.socket.on('serverPing', function (data) {
   // console.log(data);
    for (var i in data){
    	
    	var p = data[i];
    	if (p.id != CONTEXT.player.id){

    		if (CONTEXT.players[p.id] !== undefined){
    			game.updatePlayer(p);
    		}else{
    			game.addNewPlayer(p);
    		}

    		for (var j in p.bombs){
    			var q = p.bombs[j];
    			if (CONTEXT.players[p.id].bombs[q.bid] !== undefined){
    				game.updateBomb(q);
    			}else{
    				game.addNewBomb(q);
    			}
    		}
    	}
    }
});	
game.socket.on('destroyPlayer', function(id) {
	console.log("Destroying : " + id);
	CONTEXT.players[id].destroy();
});

}
game.addNewPlayer = function(playerDatas){
	CONTEXT.players[playerDatas.id] = new game.Player(
		playerDatas.id,
		playerDatas.color,
		playerDatas.name,
		playerDatas.x,
		playerDatas.y,
		true
	);
	console.log("New player added : " + playerDatas.id);

}
game.addNewBomb = function(bombData){

	console.log("Adding bomb to " + bombData.pId + " : " + bombData.bid);
	var p = CONTEXT.players[bombData.pId];

	console.log(bombData.pId + " - " + bombData.x
	+ " - " + bombData.y + " - " + bombData.angle + " - " 
	+ bombData.velocity + " - " + bombData.bid);

	p.bombs[bombData.bid] = new game.Bomb(
		bombData.pId, 
		bombData.x,
		bombData.y,
		bombData.angle,
		bombData.velocity,
		bombData.bid
	);
	console.log("New bomb added to " + bombData.pId + " : " + bombData.bid);
}

game.updatePlayer = function(playerDatas){
	//console.log ("Updating player : " + playerDatas.id);
	for (var i in playerDatas){
		if (i != "bombs"){
			CONTEXT.players[playerDatas.id][i] = playerDatas[i];
		}
	}
	if (CONTEXT.currdate - playerDatas["lastBeat"] > 200){
		console.log('allo');
		CONTEXT.players[playerDatas.id].speed = 0;
	}else{
		console.log(playerDatas["lastBeat"]);
	}
	CONTEXT.players[playerDatas.id].getRigidBody().SetPositionAndAngle({x : metre(playerDatas.x), y : metre(playerDatas.y)}, playerDatas.angle);

}

game.updateBomb = function(bombData){

	//console.log("Updating bomb : " + bombData.bid + " from " + bombData.pId);
	var pBall = CONTEXT.players[bombData.pId].bombs[bombData.bid];
	for (var i in bombData){
	//	pBall[i] = bombData[i];
	}

}
