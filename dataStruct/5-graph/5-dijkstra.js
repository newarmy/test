
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
            return '2-queue fulled';
        this.list[this.rear] = item;
        this.rear = (this.rear+1)%this.maxSize;
    }
    deleteQ() {
        if(this.front === this.rear) {
            return '2-queue empty'
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
// 堆栈
class Stack {
    constructor () {
        this.list = [];
        this.top = 0;
        this.maxSize = 10;
    }
    push(element) {
        if(this.top > this.maxSize) {
            return;
        }
        this.list[this.top] = element;
        this.top++;
    }
    pop () {
        if(this.top === 0) {
            return null;
        }
        let element = this.list[this.top-1];

        this.top--;
        this.list.length = this.top;
        return element;
    }
    isEmpty() {
        return this.top === 0 ? true : false;
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
        for(; i > 1 && this.list[round(i/2)].data > element.data; i = round(i/2)) {
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
            if ((child !== this.size) && (this.list[child].data > this.list[child+1].data)) { //有右孩子， 且左孩子大于右孩子
                child++;
            }
            if(tempItem <= this.list[child].data) { //找到了temp插入的位置
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
     * arr {array} 要建立最小堆的数据序列
     * */
    createMinHeap (arr) {
        if(!Array.isArray(arr)) {
            return;
        }
        this.list.length = 0;
        this.list[1] = Number.MAX_VALUE;
        this.size = 0;
        arr.forEach((e, i) => {
            this.list[++this.size] = {index:i, data:e};
        });
        // 调整最小堆， 得到开始调整子树结点的索引
        let changeOrderIndex = round(this.size/2);
        while(changeOrderIndex >= 1) {
            let parent;
            let child;
            for(parent = changeOrderIndex; parent*2 <= this.size; parent = child) {
                let tempItem = this.list[parent];
                child = parent*2; //左孩子
                if ((child !== this.size) && (this.list[child].data > this.list[child+1].data)) { //有右孩子， 且左孩子大于右孩子
                    child++;
                }
                if(tempItem.data <= this.list[child].data) { //找到了temp插入的位置
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


/**
 * 图的表示：
 * 邻接表 表示图的数据结构
 * 无向图
 *
 * 有向图
 *
 * 边的权重
 *
 * 带权重的图是网络
 * */

const MAXVERTEXNUM = 100;// 最大顶点数设为100
const MAXVALUE = 10000;//Number.MAX_VALUE; //最大数值
// 图的类型
const GraphType ={
    DG: 1, // 有向图
    UG: 2, // 无向图
    DN: 3, // 有向网图
    UN: 4, // 无向网图
};

// 边表结点数据结构
class EdgeNode {
    constructor (AdjV, weight, next) {
        this.adjV = AdjV || MAXVALUE; // 邻接点域
        this.next = next || null //指向的下一个邻接点的对象 ，EdgeNode 类型
        this.weight = weight|| 1; // 表示边上的权值信息， 网络中使用

    }
}

// 顶点表结点结构      (头结点)
class VertexNode {
    constructor (vertex) {
        this.vertex = vertex || 0; // 顶点域
        this.firstEdge = null // 边表头的下一个边表结点， EdgeNode 类型
    }
}
// 图的类型定义
class Graph {
    constructor (GType, vNum, eNum) {
        this.gType = GType || GraphType.DN; //图的类型
        this.vNum = vNum || 0; // 点的数量
        this.eNum = eNum || 0; //边的数量
        this.adjList = new Array(MAXVERTEXNUM); //邻接表
        this.visited = [];//标注顶点是否被访问
        this.queue = new Queue(12); //广度优先遍历用的队列
        this.dist = [];
        this.path = [];
        this.collected = [];
        this.minHeap = new MinHeap(20);// 服务于dijkstra算法
    }
    /**
     * vertexArr 顶点数据（顶点号）数组
     * edgeArr 边的数组， {startVertex(边的起始结点)， endVertex（边的结束结点）, weight（边的权重）}
     * */
    createGraph(vertexArr, edgeArr) {
        let i, j, k;
        this.vNum = vertexArr.length;
        this.eNum = edgeArr.length;
        this.visited = new Array(this.vNum); //标注顶点是否被访问

        //初始邻接矩阵
        for(i = 0; i < this.vNum; i++) {
           this.adjList[i] = new VertexNode(vertexArr[i]);
           this.dist[i] = MAXVALUE;
           this.path[i] = -1;
           this.collected[i] = false;
        }
        let edgeNode;
        for(k = 0; k < this.eNum; k++) {
            let tempNode = edgeArr[k];
            edgeNode = new EdgeNode(tempNode.endVertex, tempNode.weight);
            edgeNode.next = this.adjList[tempNode.startVertex].firstEdge;
            this.adjList[tempNode.startVertex].firstEdge = edgeNode;
            if(this.gType === GraphType.UN) {
                edgeNode = new EdgeNode(tempNode.startVertex, tempNode.weight);
                edgeNode.next = this.adjList[tempNode.endVertex].firstEdge;
                this.adjList[tempNode.endVertex].firstEdge = edgeNode;
            }
        }
    }
    // 单个点 有权图最短路径算法， dijkstra算法
    dijkstra (i) {
        this.dist[i] = 0;
        this.path[i] = -1;

        let isFirst = true;
      while (1) {
          let min = MAXVALUE;
          let minIndex = -1;
          if(!isFirst) {
              // 稠密图 的做法
              for (let x = 0; x < this.vNum; x++) {
                  if (!this.collected[x]) {
                      let pre = this.dist[x];
                      for (let j = 0; j < this.vNum; j++) {
                          if (!this.collected[j]) {
                              let next = this.dist[j];
                              if (pre < next) {
                                  if (pre < min) {
                                      min = pre;
                                      minIndex = x;
                                  }

                              } else {
                                  if (next < min) {
                                      min = next;
                                      minIndex = j;
                                  }
                              }
                          }
                      }
                  }
              }

              if ( min === MAXVALUE) {
                  return;
              }
          } else {
              minIndex = i;
              isFirst = false;

          }
          this.collected[minIndex] = true;
          let tempNode = this.adjList[minIndex];
          for (let nextNode = tempNode.firstEdge; nextNode; nextNode= nextNode.next ) {
              if(this.collected[nextNode.adjV] === false) {
                  let preVertex = tempNode.vertex;
                  if(this.dist[preVertex]+nextNode.weight < this.dist[nextNode.adjV]) {
                      this.dist[nextNode.adjV] = this.dist[preVertex]+nextNode.weight;
                      this.path[nextNode.adjV] = preVertex;
                  }

              }
          }
      }

    }
    // 用最小堆存储dist
    dijkstra_forMinHeap(i) {
        this.dist[i] = 0;
        this.path[i] = -1;

        let isFirst = true;
        while (1) {
            let min = MAXVALUE;
            let minIndex = -1;
            if(!isFirst) {
                // 稀疏图 的做法'
                this.minHeap.createMinHeap(this.dist);
                let obj = this.minHeap.deleteMin();
                min = obj.data;
                minIndex = obj.index;
                if ( min === MAXVALUE) {
                    return;
                }
            } else {
                minIndex = i;
                isFirst = false;

            }
            //console.log('minIndex = '+minIndex);
            this.collected[minIndex] = true;
            let tempNode = this.adjList[minIndex];
            for (let nextNode = tempNode.firstEdge; nextNode; nextNode= nextNode.next ) {
                if(this.collected[nextNode.adjV] === false) {
                    let preVertex = tempNode.vertex;
                    if(this.dist[preVertex]+nextNode.weight < this.dist[nextNode.adjV]) {
                        this.dist[nextNode.adjV] = this.dist[preVertex]+nextNode.weight;
                        this.path[nextNode.adjV] = preVertex;
                    }
                }
            }

        }
    }
    // 打印单个点到dest点的最短路径
    printPath (dest) {
        let arr = [];
        arr.push(dest);
        while(this.path[dest] !== -1) {
            arr.push(this.path[dest])
            dest = this.path[dest];
        }
        console.log(arr.reverse());
    }

}

let vertexArr = [0,1,2,3,4,5,6];
let edgeArr = [
    {startVertex:1, endVertex:2, weight:3},
    {startVertex:1, endVertex:6, weight:2},
    {startVertex:2, endVertex:3, weight:3},
    {startVertex:4, endVertex:3, weight:1},
    {startVertex:0, endVertex:3, weight:12},
    {startVertex:6, endVertex:3, weight:11},
    {startVertex:6, endVertex:4, weight:1},
    {startVertex:6, endVertex:5, weight:100},
];
let graph = new Graph(GraphType.DG);
graph.createGraph(vertexArr, edgeArr);
console.dir(graph);
//5-graph.dijkstra(1);
graph.dijkstra_forMinHeap(1);
console.log(graph);
graph.printPath(3);
graph.printPath(4);