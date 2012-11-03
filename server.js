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


var players = {};

var lastLog = Date.now();
var logTimer = 1000;

var playerTimeout = 5000;
var CURRDATE = Date.now();
io.sockets.on('connection', function(socket){ // Connection est envoyé automatiquement quand un client se connecte à socket.io, elle donne le socket de la personne en paramètre.
	console.log("New player");
	socket.on('playerPing', function(data){
		if (Date.now() - lastLog > logTimer){
			//console.log(data);
			lastLog = Date.now();
		}
		players[data.id] = data;
		players[data.id].lastPing = CURRDATE;
	});

	socket.on('chatMsg', function(data){
		console.log(data);
		io.sockets.emit('newMsg', data);
	});

	socket.on('touched', function(data){
		console.log(data);
	})
});

var sendDatas = function(){

	CURRDATE = Date.now();
	io.sockets.emit('serverPing', players);
		if (Date.now() - lastLog > logTimer){
			//console.log("Datas sent to clients");
			lastLog = Date.now();
		}

	for (var i in players){
		if (CURRDATE - players[i].lastPing > playerTimeout){
			console.log("Destroyed : " + i);
			io.sockets.emit('destroyPlayer', i);
			delete players[i];
		}
	}
	setTimeout(sendDatas, 60);
}

sendDatas();