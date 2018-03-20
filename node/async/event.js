/**
 * 异步编程解决方案 之 事件发布/订阅模式
 * 回调函数的事件化
 *
 * 解决 雪崩问题（在高访问量， 大并发量的情况下缓存失效的情境）
 *
 *
 * */
 var events = require('events');
 var proxy = new events.EventEmitter();
 var status = "ready";
 var select = function (cb) {
     proxy.once('selected', cb);
     if(status === 'ready') {
         status = "pending";
         db.select('SQL', function (results) {
             proxy.emit("selected", results);
             status = "ready";
         })
     }
 }

 /**
  * 多异步之间的协作方案
  *
  * 并行异步： 用一个哨兵变量（计算进入回调的次数）
  *
  * 串行回调：（会出现回调过深 promise来处理）
  *
  * */