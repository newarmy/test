var http = require('http');

var port = Math.round((1+Math.random())*1000);
console.log(port);

http.createServer(function(req, res) {
    res.writeHead({'Content-Type': 'text/plain'});
    res.end('Hello World');
}).listen(port, '127.0.0.1');