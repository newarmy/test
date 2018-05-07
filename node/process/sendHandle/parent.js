var p = require('child_process');
var child = p.fork('child.js');
var child1 = p.fork('child1.js');

var server = require('net').createServer();
server.on('connection', function(socket) {
    socket.end('handler by parent\n');
})

server.listen(1337, function () {
    child.send('server', server);
    child1.send('server', server);
})