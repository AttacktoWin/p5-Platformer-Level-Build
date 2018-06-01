var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var levelsArray = [[], [], [], []];

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
        levelsArray[0].push(level);
        if (levelsArray[0].length > 25) {
            levelsArray[1].push(levelsArray[0][levelsArray[0].length - 1]);
            levelsArray[0].splice(levelsArray[0].length - 1, 1);
        }
        if (levelsArray[1].length > 25) {
            levelsArray[2].push(levelsArray[1][levelsArray[1].length - 1]);
            levelsArray[1].splice(levelsArray[1].length - 1, 1);
        }
        if (levelsArray[2].length > 25) {
            levelsArray[3].push(levelsArray[2][levelsArray[2].length - 1]);
            levelsArray[2].splice(levelsArray[2].length - 1, 1);
        }
        if (levelsArray[3].length > 25) {
            levelsArray[3].splice(levelsArray[3].length - 1, 1);
        }
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});