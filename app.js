var express = require('express');
var app = express();
var server = require('http').createServer(app);
var client = require('socket.io').listen(server).sockets;

server.listen(process.env.PORT || 3000);
console.log('Server running...');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/index.html")
});

client.on('connection', function(socket){
	console.log('Connected...');
});