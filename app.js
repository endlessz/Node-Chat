var express = require('express');
var app = express();
var server = require('http').createServer(app);
var client = require('socket.io').listen(server).sockets;
var mongo = require('mongodb').MongoClient;

server.listen(process.env.PORT || 3000);
console.log('Server running...');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/index.html")
});

mongo.connect('mongodb://127.0.0.1/chat', function(err, db){
	if(err){
		throw err;
	}

	client.on('connection', function(socket){
	console.log('Connected...');

		var collection =  db.collection('messages');

		socket.on('input', function(data){
			var chat = {
				name: data.name,
				message: data.message
			}

			collection.insert(chat, function(){
				console.log('Insert Success')
			});
		});
	});

});