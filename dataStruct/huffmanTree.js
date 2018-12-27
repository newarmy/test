/***
 * 哈夫曼树
 * 带权路径长度（wpl）： 设二叉树有n个叶子结点，每个叶子结点带有权值Wk，
 * 从根结点到每个叶子结点的长度为lk， 则每个叶子结点的带权路径长度之和就是： WPL
 * 最优二叉树或哈夫曼树：WPL最小的二叉树。
 *
 * 哈夫曼树的构造
 * 每次把权值最小的两棵二叉树合并
 * */

//import MinHeap from './minHeap';

//取整
function round (num) {
    return Math.round(num);
}
class MinHeap {
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
        for(; i > 1 && this.list[round(i/2)].weight > element.weight; i = round(i/2)) {
            this.list[i] = this.list[round(i/2)];
        }
        this.list[i] = element;
    }
    //删除最小值
    deleteMin () {
        let parent, child;
        if(this.isEmpty()) {
            return '堆空了';
        }
        let minItem = this.list[1];
        let tempItem = this.list[this.size]; //把最后一个元素插到位置1，然后调整 temp的位置
        this.list[this.size] = undefined;
        this.size--;
        //this.list.length = this.size;
        for(parent = 1; parent*2 <= this.size; parent = child) {
            child = parent*2; //左孩子
            if ((child != this.size) && (this.list[child].weight > this.list[child+1].weight)) { //有右孩子， 且左孩子小于右孩子
                child++;
            }
            if(tempItem.weight <= this.list[child].weight) { //找到了temp插入的位置
                break;
            } else {
                this.list[parent] = this.list[child];
            }
        }
       // console.log('child = '+ child);
        this.list[parent] = tempItem;
        return minItem;
    }
    /***
     * 建立最小堆
     * 方法（0（n））：
     * 将n个元素安输入顺序存入，先满足完全二叉树的结构特性
     * 调整各结点位置，以满足最大堆的有序特性
     *
     * arr {array} 要建立最大堆的数据序列
     * */
    createMinHeap (arr) {
        if(!Array.isArray(arr)) {
            return;
        }
        this.list.length = 0;
        this.list[1] = Number.MAX_VALUE;
        this.size = 0;
        arr.forEach((e, i) => {
            this.list[++this.size] = e;
        });
        // 调整最小堆， 得到开始调整子树结点的索引
        let changeOrderIndex = round(this.size/2);
        while(changeOrderIndex >= 1) {
            let parent;
            let child;
            for(parent = changeOrderIndex; parent*2 <= this.size; parent = child) {
                let tempItem = this.list[parent];
                child = parent*2; //左孩子
                if ((child != this.size) && (this.list[child].weight > this.list[child+1].weight)) { //有右孩子， 且左孩子小于右孩子
                    child++;
                }
                if(tempItem.weight <= this.list[child].weight) { //找到了temp插入的位置
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

//哈夫曼树结点
function HuffmanTreeNode (weight) {
    this.weight = weight;
    this.left = null;
    this.right = null;
}




/**
 * 哈夫曼树的构造
 *
 * 参数 {MinHeap} 结点权值的最小堆排序
 * */
function createHuffmanTree(data) {
    let minHeap = new MinHeap(12);
    minHeap.createMinHeap(data);
    let heapSize = minHeap.size;
    //console.dir(minHeap)
    //return ;
    let huffmanTree = null;
    for (let i = 1; i < heapSize; i++) {
        console.log(minHeap.size);
        huffmanTree = new HuffmanTreeNode(0);
        huffmanTree.left = minHeap.deleteMin();
        huffmanTree.right = minHeap.deleteMin();
        console.log(huffmanTree.left.weight , huffmanTree.right.weight);
        huffmanTree.weight = huffmanTree.left.weight + huffmanTree.right.weight;
        minHeap.insert(huffmanTree);
    }
    huffmanTree = minHeap.deleteMin();
    console.dir(minHeap);
    return huffmanTree;
}
// 测试数据
let testData = [
    new HuffmanTreeNode(1),
    new HuffmanTreeNode(2),
    new HuffmanTreeNode(45),
    new HuffmanTreeNode(22),
    new HuffmanTreeNode(12),
    new HuffmanTreeNode(5)];
let hfTree = createHuffmanTree(testData);
console.log(hfTree);