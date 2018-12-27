/**
 * 队列 先进先出
 *
 * 顺序存储
 * 链式存储
 *
 *
 * */
// （循环数组来表示队列）存maxSize-1个元素时，就满员了
class Queue {
    constructor (maxSize) {
        //循环使用array空间
        this.list = new Array(maxSize);
        this.maxSize = maxSize;
        this.front = 0; //头元素位置
        this.rear = 0; // 尾元素位置
    }
    addQ(item) {
        if((this.rear+1)%this.maxSize === this.front)
            return 'queue fulled';
        this.list[this.rear] = item;
        this.rear = (this.rear+1)%this.maxSize;
    }
    deleteQ() {
        if(this.front === this.rear) {
            return 'queue empty'
        }

        let item = this.list[this.front];
        this.list[this.front] = undefined;
        this.front = (this.front+1)%this.maxSize;
        return item;
    }
    isEmptyQ() {
        if(this.front === this.rear) {
            return true;
        } else {
            return false;
        }
    }
    isFullQ() {
        if((this.rear+1)%this.maxSize === this.front)
            return true;
        else
            return false;
    }
}

let queue = new Queue(5);
queue.addQ(2);
queue.addQ(3);
console.log(queue.deleteQ());
queue.addQ(4);
queue.addQ(5);
console.log(queue.deleteQ());
queue.addQ(6);
console.log(queue);
console.log(queue.isFullQ());
queue.addQ(7);
console.log(queue.deleteQ());
console.log(queue.deleteQ());
console.log(queue.deleteQ());
console.log(queue.deleteQ());
console.log(queue);
console.log(queue.isEmptyQ());