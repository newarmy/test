/**
 * promise/deferred
 *
 * Deferred 主要是用于内部， 用于维护异步模型的状态，
 * Promise则作用域外部，通过then方法暴露给外部以添加自定义逻辑
 * */

const EventEmitter = require('events');
const fs = require('fs');

class Promise extends EventEmitter {
    then (fulfilledHander, errorHandler, progressHandler) {
        if(typeof fulfilledHander === 'function') {
            this.once('success', fulfilledHander);
        }
        if(typeof errorHandler === "function") {
            this.once('error', errorHandler);
        }
        if(typeof progressHandler === "function") {
            this.on('progress', progressHandler);
        }
        return this;
    }
}

class Deferred {
    constructor () {
        this.state = 'unfulfilled';
        this.promise = new Promise();
    }

    resolve(obj) {
        this.state = 'fulfilled';
        this.promise.emit('success', obj);
    }

    reject (err) {
        this.state = 'failed';
        this.promise.emit("error", err);
    }

    progress(data) {
        this.promise.emit('progress', data);
    }
    callback() {
        const that = this;
        return function (err, file) {
            if(err) {
                return that.reject(err);
            }
            that.resolve(file);
        }
    }
}

const smooth = function (methods) {
    return function () {
        const deferred = new Deferred();
        const args = Array.prototype.slice.call(arguments, 0);
        args.push(deferred.callback());
        console.log(args);
        methods.apply(null, args);
        return deferred.promise;
    }
}

const readFile = smooth(fs.readFile);

readFile('./event.js', 'utf8').then(function(data) {
    console.log(data);
}, function(err) {
    console.log(err.message);
})