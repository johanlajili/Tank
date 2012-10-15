console.log ("Poney");

var express = require('express');

var app = express();

var server	= require('http').createServer(app);
var io = require('Socket.io').listen(server);

server.listen(1337);

app.use(express.logger());
app.use(express.static(__dirname + '/public'));
app.set("views", __dirname + "/views");

app.get ('/test', function(req, res){

	res.send("Coucou, tu veux être mon ami ?");
});

app.get('/', function(req, res){

	res.render('home.jade');
});


var players = {};

var lastLog = Date.now();
var logTimer = 1000;

var playerTimeout = 5000;
var CURRDATE = Date.now();
io.sockets.on('connection', function(socket){
	socket.emit('message', {hello: 'world'});
	socket.on('playerPing', function(data){
		if (Date.now() - lastLog > logTimer){
			console.log(data);
			lastLog = Date.now();
		}
		players[data.id] = data;
		players[data.id].lastPing = CURRDATE;
	});
});

var sendDatas = function(){

	CURRDATE = Date.now();
	io.sockets.emit('serverPing', players);
		if (Date.now() - lastLog > logTimer){
			console.log("Datas sent to clients");
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