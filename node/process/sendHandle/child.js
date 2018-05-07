process.on('message', function (m, server) {
    if(m === 'server'){
        server.on('connection', function(socket) {
            socket.end('handled by child---0\n '+'pid = '+ process.pid);
        })
    }
})