/**
 * 查看垃圾回收日志
 *
 * node --trace_gc --trace_gc_verbose  test_trace_gc.js
 *  --trace_gc 简单日志
 *  --trace_gc_verbose 每次 GC 结束后输出各个区域的分配情况
 *   [12568:0000025265FCD420] 33 ms: Scavenge 3.5 (6.4) -> 3.2 (7.4) MB, 0.7 / 0.0 ms  allocation failure

 *  日志格式解释
 *  [pid] <time_since_start> <Phase> <heap_used_before (old+young)> (<allocated_heap_before>)
 *  -> <heap_used_after (old+young)> (<allocated_heap_after>) MB, <time_spent_gc> [<reason_of_gc>]
 *
 *
 *
 *  查看内存使用情况
 *  1. 查看进程的内存占用
 *  process.memoryUsage();
 *  2.查看系统的内存占用
 *  os.totalmem();
 *  os.freemem() 闲置内存;
 *
 * */

/*let a = [];
for(let i = 0; i < 100000; i++) {
    a.push(new Array(100))
}*/
//查看进程的内存占用
let showMem = function () {
    var mem = process.memoryUsage();
    var format = function (bytes) {
        return (bytes/ 1024/ 1024).toFixed(2)+ "MB";
    }
    console.log('process: heapTotal '+format(mem.heapTotal)+ " heapUsed "+format(mem.heapUsed) + " rss "+ format(mem.rss));
}
showMem()

//查看系统的内存占用
let os = require('os');

function osMem() {
    var format = function (bytes) {
        return (bytes/ 1024/ 1024/1024).toFixed(2)+ "GB";
    }
    console.log('total mem '+format(os.totalmem()) +" free mem "+format(os.freemem()))
}
osMem();