/**
 * 内存泄漏排查
 *
 * 用node-heapdump  在书131页
 *
 *  1.npm install heapdump
 *
 *  2. chrome （Take Heap Snapshot） 加载.1521451863812.heapsnapshot, 来查看快照，分析问题
 *堆快照提供了不同的视角来进行查看：

 Summary 该视图按照构造函数进行分组，用它可以捕获对象和它们使用的内存情况，对于跟踪定位DOM节点的内存泄漏特别有用。
 Comparison 对比两个快照的差别，用它可以对比某个操作前后的内存快照。分析操作前后的内存释放情况以及它的引用计数，便于你确认内存是否存在泄漏以及造成的原因。
 Containment 该视图可以探测堆的具体内容，它提供了一个更适合的视图来查看对象结构，有助于分析对象的引用情况，使用它可以分析闭包和进行更深层次的对象分析。
 Statistics 统计视图。


 Summary视图
 * 图中的各列的具体含义如下：

 Constructor 显示所有的构造函数，点击每一个构造函数可以查看由该构造函数创建的所有对象。
 Distance 显示通过最短的节点路径到根节点的距离。
 Objects Count 显示对象的个数和百分比。
 Shallow size 显示由特定的构造函数创建的所有对象的本身的内存总数。
 Retained size 显示由该对象及其它所引用的对象的总的内存总数。
 Shallow size和Retained size的区别？Shallow size是对象本身占用内存的大小，不包含它所引用的对象。Retained size是该对象本身的Shallow size，
 加上能从该对象直接或者间接访问到对象的Shallow size之和。也就是说Retained size是该对象被GC之后所能回收到内存的总和。
 *
 *
 * Comparison视图

 通过比较多个快照之间的差异来找出内存泄露的对象，为了验证某个程序的操作不会引起内存泄露（通常会执行一个操作后再执行一个对应的相反操作，比如打开一个文档后再关闭它，应该是没有产生内存泄露问题的），你可以执行如下步骤：

 在执行一个操作之前拍一个快照。
 执行一个操作，通过你认为可能会引起内存泄露的一次页面交互操作。
 执行一个相反的操作。
 拍第二个快照，切换到Comparison视图，并与第一个快照进行对比。
 * */
let heapdump = require('heapdump');
let http = require('http');
let leakArr = [];

let leak = function () {
    leakArr.push('leak '+Math.random());
}
//查看进程的内存占用
let showMem = function () {
    var mem = process.memoryUsage();
    var format = function (bytes) {
        return (bytes/ 1024/ 1024).toFixed(2)+ "MB";
    }
    console.log('process: heapTotal '+format(mem.heapTotal)+ " heapUsed "+format(mem.heapUsed) + " rss "+ format(mem.rss));
}

http.createServer(function (req, res) {
    leak();
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
    showMem()
    //堆快照必须.heapsnapshot，否则在后面使用chrome的时候，会报错。
    heapdump.writeSnapshot('d:/log/' + Date.now() + '.heapsnapshot');
}).listen(1337);

console.log('Server running at http://127.0.0.1:1337/');