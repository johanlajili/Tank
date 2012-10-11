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


io.sockets.on('connection', function(socket){
	socket.emit('message', {hello: 'world'});
	socket.on('message', function(data){
		console.log(data);
	});
});