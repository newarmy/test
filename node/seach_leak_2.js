/**
 * 内存泄漏排查
 *
 * 用node-memwatch  在书131页
 *
 *  1.npm install memwatch (用memwatch-next来代替)
 *   https://www.npmjs.com/package/memwatch
 *   https://github.com/marcominetti/node-memwatch
 *
 *
 * */
var memwatch = require('memwatch-next');
let http = require('http');
let leakArr = [];

let leak = function () {
    leakArr.push('leak '+Math.random());
}
memwatch.on('leak', function(info) {
    console.log('leak: ');
    console.log(info);
});
memwatch.on('stats', function(stats) {
    console.log('stats: ');
    console.log(stats);
})
http.createServer(function (req, res) {
    leak();
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
    //触发memwatch监控
    memwatch.gc();
}).listen(1337);

console.log('Server running at http://127.0.0.1:1337/');