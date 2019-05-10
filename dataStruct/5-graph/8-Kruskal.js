/**
 * 稀疏图最小生成树算法，kruskal算法
 * 将森林合并成树
 * 用到了 最小堆 和 并查集
 *
 *
 * */
/**
 * 并查集元素结点数据表示
 * */

class UnionNode{
    constructor (data, pos) {
        this.data = data; //元素数据 在kruskal算法中，存vertex的序号
        this.parent = pos || -1; // 元素父结点在数据中的索引
    }
}

/**
 * 并查集数据结构
 *
 * */
class UnionCheckSet {
    constructor () {
        this.list = []; //存放集合的数据
    }
    // 查找某个元素所在集合 （用根结点表示）
    // x为顶点序号
    find (x) {
        let i ;
        let len = this.list.length;
        for(i = 0; i < len && this.list[i].data !== x; i++) {
            ;
        }
        if(i >= len) return -1; //没查到
        for (; this.list[i].parent >= 0; i = this.list[i].parent) {
            ;
        }
        return i; // 元素x所在结合的根结点的索引
    }

    // 两个元素所在集合的并运算
   // x1 是顶点序号， x2是顶点序号，
    union (index1, index2) {
        let root1, root2;
        root1 = this.find(index1); // 找顶点x1的根
        root2 = this.find(index2); // 找顶点x2的根

        let rootNode1 = this.list[root1];
        let rootNode2 = this.list[root2];

        if(rootNode1.parent <= rootNode2.parent) {
            let root2Num = rootNode2.parent;
            rootNode2.parent = index1; //
            rootNode1.parent += root2Num;
        } else {
            let root1Num = rootNode1.parent;
            rootNode1.parent = index2;
            rootNode2.parent += root1Num;
        }
    }

}

/**
 * heap:堆
 *
 * 最小堆：
 * 数据对象集： 完全二叉树， 每个结点的元素值不大于其子节点的元素值。
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
        for(; i > 1 && this.list[round(i/2)] > element; i = round(i/2)) {
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
        //this.1-list.length = this.size;
        for(parent = 1; parent*2 <= this.size; parent = child) {
            child = parent*2; //左孩子
            if ((child !== this.size) && (this.list[child].weight > this.list[child+1].weight)) { //有右孩子， 且左孩子大于右孩子
                child++;
            }
            if(tempItem.weight <= this.list[child].weight) { //找到了temp插入的位置
                break;
            } else {
                this.list[parent] = this.list[child];
            }
        }
        //console.log('child = '+ child);
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
                if ((child !== this.size) && (this.list[child].weight > this.list[child+1].weight)) { //有右孩子， 且左孩子大于右孩子
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

// 把顶点初始化为并查集
function initUnionCheckSet(vertexArr) {
    let unionObj = new UnionCheckSet();
    vertexArr.forEach(e => {
        unionObj.list.push(new UnionNode(e));
    });
    return unionObj;
}
//把边存为最小堆
function initEdgeWithMinHeap (edgeArr) {
    let minHeap = new MinHeap(20);
    minHeap.createMinHeap(edgeArr);
    return minHeap;
}
//稀疏图生成 最小生成树
function kruskal (vertexArr, edgeArr) {
    let unionObj = initUnionCheckSet(vertexArr);
    let minHeapEdge = initEdgeWithMinHeap(edgeArr);

    let treeEdges = 0;
    let vNum = vertexArr.length;
    while(treeEdges < vNum-1 && !minHeapEdge.isEmpty()) {
        let edgeObj = minHeapEdge.deleteMin();
        console.log('-----------------loop start--------------------');
        console.log('weight = '+edgeObj.weight);
        console.log('startV = '+edgeObj.startVertex);
        console.log('endV = '+edgeObj.endVertex);
        let root1 = unionObj.find(edgeObj.startVertex);
        let root2 = unionObj.find(edgeObj.endVertex);
        console.log('start root = ',root1, 'end root = ',root2);

        if(root1 !== root2) { //不是同一个集合
            unionObj.union(edgeObj.startVertex, edgeObj.endVertex);
            treeEdges++;
        }

    }
    if(treeEdges === vNum-1) {
        return unionObj;
    } else {
        return null;
    }

}

let vertexArr = [0,1,2,3,4,5,6];
let edgeArr = [
    {startVertex:0, endVertex:1, weight:2},
    {startVertex:0, endVertex:3, weight:1},
    {startVertex:0, endVertex:2, weight:4},
    {startVertex:1, endVertex:4, weight:10},
    {startVertex:1, endVertex:3, weight:3},
    {startVertex:2, endVertex:3, weight:2},
    {startVertex:2, endVertex:5, weight:5},
    {startVertex:3, endVertex:5, weight:8},
    {startVertex:3, endVertex:4, weight:7},
    {startVertex:3, endVertex:6, weight:4},
    {startVertex:4, endVertex:6, weight:6},
    {startVertex:5, endVertex:6, weight:1}
];
console.dir(kruskal(vertexArr, edgeArr));