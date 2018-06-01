var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var levelsArray = [];

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('requestLevels', function() {
        socket.emit('sendLevels', levelsArray);
    });

    socket.on('uploadLevel', function(level) {
        levelsArray.push(level);
        if (levelsArray.length > 100) {
            levelsArray.splice(0, 1);
        }
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});