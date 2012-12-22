console.log ("Poney");

var express = require('express');

var app = express();

var server	= require('http').createServer(app);
var io = require('socket.io').listen(server);
io.set('log level', 1);
server.listen(1337);

//app.use(express.logger());
app.use(express.static(__dirname + '/public'));
app.set("views", __dirname + "/views");

app.get('/', function(req, res){

	res.render('home.jade');
});
app.get('/game', function(req, res){

	res.render('game.jade');
});
app.get('/code', function(req, res){

	res.render('code.jade');
});

var gamesID = 0;
var games = [];

var Game = function (id) {

	this.players = {};
	this.maxSize = 6;
	this.nbPlayers = 0;
	this.lastLog = Date.now();
	this.logTimer = 1000;
	this.playerTimeout = 5000;
	this.room = "game" + id;

	console.log('New game : ' + this.room);

	this.isPlayerIn = function (id) {
		for (var i in this.players) {
			if (this.players[i].id == id) {
				return true;
			}
		}
		return false;
	}
	this.hasPlace = function() {
		if (this.nbPlayers < this.maxSize) {
			console.log('Has place');
			return true;
		} else {
			console.log('No place');
			return false;
		}
	}

	this.addPlayer = function(player) {
		this.players[player.id] = player;
		this.nbPlayers++;
		console.log('new player : ' + player.id + ' NB players : ' + this.nbPlayers);
	}
	this.destroyPlayer = function (id) {
		if (this.players[id] !== undefined) {
			delete this.players[id];
			this.nbPlayers--;
			return true;
		} else {
			return false;
		}
	}
}

function playerExists(id) {
	for (var i in games) {
		if (games[i].isPlayerIn(id)) {
			return games[i].room;
		}
	}
	return false;
}
function addPlayer(player) {

	for (var i in games) {
		console.log('huh');
		if (games[i].hasPlace()) {
			games[i].addPlayer(player);
			return games[i].room;
		}
	}
	games.push(new Game(gamesID));
	gamesID++;
	games[games.length - 1].addPlayer(player);
	return games[games.length - 1].room;
}
function updatePlayer(player) {
	for (var i in games) {
		if (games[i].isPlayerIn(player.id)) {
			games[i].players[player.id] = player;
			games[i].players[player.id].lastPing = CURRDATE;
		}
	}
}

games.push(new Game(gamesID));
gamesID++;

io.sockets.on('connection', function(socket) {
	console.log('New Player');
	socket.on('playerPing', function (data) {
		if (!playerExists(data.id)) {
			var room = addPlayer(data);
			socket.join(room);
		} else {
			updatePlayer(data);
		}
	});

	socket.on('chatMsg', function(data) {
		var room = playerExists(data.id);
		io.sockets.in(room).emit('newMsg', data.msg);
	});

	socket.on('touched', function (data) {
		console.log(data);
	});
});

var sendDatas = function () {

	CURRDATE = Date.now();
	for (var i in games) {
		io.sockets.in(games[i].room).emit('serverPing', games[i].players);

		if (Date.now() - lastLog > logTimer) {
			lastLog = Date.now();
		}

		for (var j in games[i].players) {
			if (CURRDATE - games[i].players[j].lastPing > games[i].playerTimeout) {
				console.log('Destroyed : ' + j);
				io.sockets.in(games[i].room).emit('destroyPlayer', j);
				games[i].destroyPlayer(j);
			}
		}

		if (games[i].nbPlayers <= 0) {
			delete games[i];
			console.log('Destroyed game : ' + i);
		}
	}

	setTimeout(sendDatas, 60);
};

sendDatas();
var lastLog = Date.now();
var logTimer = 1000;
var CURRDATE = Date.now();