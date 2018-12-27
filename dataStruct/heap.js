/**
 * heap:堆
 *
 * 最大堆：
 * 数据对象集： 完全二叉树， 每个结点的元素值不小于其子节点的元素值。
 * 操作：
 * create(int MaxSize)
 *
 * isFull(Heap) 是否满了
 * insert(Heap, item), 将item 插入最大堆Heap
 * isEmpty ()
 * deleteMax(Heap) 返回Heap中最大元素
 * */
//取整
function round (num) {
    return Math.round(num);
}
class MaxHeap {
    constructor(capacity) {
        // 用数组存树的结构（完全二叉树）
        this.list = new Array(capacity+1); //存放堆元素的数组, 从1开始存放元素；
        this.size = 0; // 堆的当前元素个数
        this.capacity = capacity // 堆的最大容量
        this.list[0] = Number.MAX_VALUE // 存放最大值 ，哨兵
    }
    isFull () {
        return this.size === this.capacity;
    }
    isEmpty() {
        return this.size === 0;
    }
    insert (element) {
        let i;
        if(this.isFull()) {
            return '堆满了';
        }
        i = ++this.size;
        for(; i > 1 && this.list[round(i/2)] < element; i = round(i/2)) {
            this.list[i] = this.list[round(i/2)];
        }
        this.list[i] = element;
    }
    deleteMax () {
        let parent, child;
        if(this.isEmpty()) {
            return '堆空了';
        }
        let MaxItem = this.list[1];
        let tempItem = this.list[this.size]; //把最后一个元素插到位置1，然后调整 temp的位置
        this.list[this.size] = undefined;
        this.size--;
        //this.list.length = this.size;
        for(parent = 1; parent*2 <= this.size; parent = child) {
            child = parent*2; //左孩子
            if ((child != this.size) && (this.list[child] < this.list[child+1])) { //有右孩子， 且左孩子小于右孩子
                child++;
            }
            if(tempItem >= this.list[child]) { //找到了temp插入的位置
                break;
            } else {
                this.list[parent] = this.list[child];
            }
        }
        console.log('child = '+ child);
        this.list[parent] = tempItem;
        return MaxItem;
    }
    /***
     * 建立最大堆
     * 方法（0（n））：
     * 将n个元素安输入顺序存入，先满足完全二叉树的结构特性
     * 调整各结点位置，以满足最大堆的有序特性
     *
     * arr {array} 要建立最大堆的数据序列
     * */
    createMaxHeap (arr) {
        if(!Array.isArray(arr)) {
            return;
        }
        this.list.length = 0;
        this.list[1] = Number.MAX_VALUE;
        this.size = 0;
        arr.forEach((e, i) => {
            this.list[++this.size] = e;
        });
        // 调整最大堆
        let changeOrderIndex = round(this.size/2);
        while(changeOrderIndex >= 1) {
            let parent;
            let child;
            for(parent = changeOrderIndex; parent*2 <= this.size; parent = child) {
                let tempItem = this.list[parent];
                child = parent*2; //左孩子
                if ((child != this.size) && (this.list[child] < this.list[child+1])) { //有右孩子， 且左孩子小于右孩子
                    child++;
                }
                if(tempItem >= this.list[child]) { //找到了temp插入的位置
                    break;
                } else {
                    // 父子元素互换
                    this.list[parent] = this.list[child];
                    this.list[child] = tempItem;
                }

            }
            changeOrderIndex--;
        }
    }
}
//test
let testArr = [2,22,43,21,14,46,11];

let maxHeap = new MaxHeap(12);
/*testArr.forEach( e => {

    maxHeap.insert(e);
})*/
maxHeap.createMaxHeap(testArr);
console.dir(maxHeap);
console.log(maxHeap.deleteMax());
console.dir(maxHeap);