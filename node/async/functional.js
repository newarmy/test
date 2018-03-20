/**
 * 函数式编程
 *
 *
 * 1.高阶函数：可以把函数作为参数，或将函数作为返回值的函数
 * */

function gaojieFunc() {
    return function (arg) {
        console.log(arg);
    }

}

/***
 * 通过指定部分参数来产生一个新的定制函数的形式就是偏函数
 *
 * */

var isType = function (type) {
    return function (obj) {
        console.log(Object.prototype.toString.call(obj));
        return Object.prototype.toString.call(obj) === '[object ' +type +']';
    }
}
var isNumber = isType('Number');
console.log(isNumber(1))

/**
 * 异步编程的优点和难点
 * 1 优点： 充分发挥cpu 和 i/o资源的优势
 *
 * 2.难点
 * 2.1 异常处理 - node的约定，将异常作为回调函数的第一个实参返回， 如果为空置，则
 * 表明异步调用没有异常抛出
 *
 * 2.2 函数嵌套过深 - promise等
 *
 * 2.3 阻塞代码 - 统一规划业务逻辑之后，调用setTimeout的效果会更好。
 *
 * 2.4 多线程编程 - child_process
 *
 * 2.5 异步转同步 - 通过良好的流程控制
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * */