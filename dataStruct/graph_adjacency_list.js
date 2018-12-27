
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
    /**
     * depth first search
     * 深度优先遍历 （数的先序遍历， 借用堆栈）
     * i： 从结点i开始遍历 , 以顶点Vi为出发点对邻接表存储的图G进行DFS搜索
     * */
    DFS (i) {
         let k = this;
      // let stack = new Stack();
       console.log(i+'顶点 = '+this.adjList[i].vertex);
       this.visited[i] = true;
       for (let nextNode = this.adjList[i].firstEdge; nextNode; nextNode= nextNode.next ) {
           if(this.visited[nextNode.adjV] !== true) {
               k.DFS(nextNode.adjV);
           }
       }
    }
    /**
     * broadcast first search
     * 广度优先遍历 （树的层次遍历， 借用队列）
     * i： 从结点i开始遍历 , 以顶点Vi为出发点对邻接表存储的图G进行BFS搜索
     * */
    BFS (i) {
        this.queue.addQ(this.adjList[i]);

        while (!this.queue.isEmptyQ()) {
            let tempNode = this.queue.deleteQ();
            if(this.visited[tempNode.vertex] !== true) {
                console.log(tempNode.vertex + '顶点 = ' + tempNode.vertex);
                this.visited[tempNode.vertex] = true;
            }
            for (let nextNode = tempNode.firstEdge; nextNode; nextNode= nextNode.next ) {
                if(this.visited[nextNode.adjV] !== true) {
                    this.queue.addQ(this.adjList[nextNode.adjV]);
                }
            }
        }



    }
    //
    searchAllVertex() {
        for(let i = 0; i < this.vNum; i++) {
            if(this.visited[i] !== true) {
                this.DFS(i);
            }
        }
    }

}

let vertexArr = [0,1,2,3,4,5,6];
let edgeArr = [
    {startVertex:1, endVertex:2, weight:3},
    {startVertex:1, endVertex:6, weight:3},
    {startVertex:4, endVertex:3, weight:5},
    {startVertex:0, endVertex:3, weight:12},
    {startVertex:6, endVertex:3, weight:11},
    {startVertex:6, endVertex:4, weight:123},
    {startVertex:6, endVertex:5, weight:100},
];
let graph = new Graph(GraphType.UG);
graph.createGraph(vertexArr, edgeArr);

console.dir(graph);

//graph.DFS(0);
//console.log('========find all vertex========');
//graph.searchAllVertex();
graph.BFS(1);