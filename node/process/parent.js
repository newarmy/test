var cp = require('child_process');
var c = cp.fork(__dirname+'/child');
c.on('message', function(m) {
    console.log('parent get message: ', m);
});

c.send({hello: 'world'});