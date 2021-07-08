/***
 * 图：表示多对多的关系
 * 顶点： vertex V
 * 边 edge E
 * 边是顶点对：（v，w）E 无向边
 * <v,w>E 有向边
 *
 * 数据类型： 图
 * 数据对象集： G（V,E）由一个非空的有限顶点集合V和一个有限边集合E做成
 * 操作集：
 * create
 * insertVertex（v）
 * insertEdge(e)
 * DFS(G, V)从顶点v触发深度优先遍历图G
 * BFS(G, V)从顶点v触发宽度优先遍历图G
 * ShortestPath(G, v, int Dist[]) 计算图G中顶点v到任意其他顶点的最短距离
 *
 * MST(g) 计算图G的最小生成树
 *
 * 无向图
 *
 * 有向图
 *
 * 边的权重
 *
 * 带权重的图是网络
 *
 * 图的表示：
 *
 * 邻接矩阵G[N][N ] -n个顶点从0到N-1编号
 * G[I][J]
 *
 * 邻接表
 ****/

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




/*

有向图 array
用一维数组维护两个顶点之间的关系
*/

const MAXVERTEXNUM = 100;// 最大顶点数设为100
const MAXVALUE = 10000;//Number.MAX_VALUE; //最大数值
// 图的类型
const GraphType ={
    DG: 1, // 有向图
    UG: 2, // 无向图
    DN: 3, // 有向网图
    UN: 4, // 无向网图
};

// 图的类型定义
class Graph {
    constructor (GType, vNum, eNum) {
        this.gType = GType || GraphType.DN; //图的类型
        this.vNum = vNum || 0; // 点的数量
        this.eNum = eNum || 0; //边的数量
        this.vertices = new Array(7); // 顶点表，
        this.edges = new Array(7*8/2);// 一维数组，邻接矩阵，即边表
        this.stack = null; //深度优先遍历辅助堆栈；
        this.queue = null; //广度优先遍历辅助队列
        this.visited = []; //是否被访问过。访问过为true

        //2^y-1+x
    }
    positionInEdges(x, y) {
       return Math.round( x*(x+1)/2 + y);
    }
    /**
     * vertexArr 顶点数据（顶点号）数组，顶点号从0开始
     * edgeArr 边的数组， {startVertex(边的起始结点)， endVertex（边的结束结点）, weight（边的权重）}
     * */
    createGraph(vertexArr, edgeArr) {
        let i, j, k;
        this.vNum = vertexArr.length;
        this.eNum = edgeArr.length;

        // 顶点号
        vertexArr.forEach( (e, i) => {
            this.vertices[i] = e;
            this.visited[i] = false;
        });
        //初始邻接矩阵

       
        for (k = 0; k < this.eNum; k++) {
            let edge = edgeArr[k];
            this.edges[this.positionInEdges(edge.startVertex,edge.endVertex)] = edge.weight;
        }
    }
    /**
     * broadcast first 7-search
     * 广度优先遍历 （树的层次遍历， 借用队列）
     * i： 从结点i开始遍历 , 以顶点Vi为出发点对邻接表存储的图G进行BFS搜索
     * */
    BFS (i) {
        this.queue = new Queue(20);
        this.queue.addQ(i);

        while (!this.queue.isEmptyQ()) {
            let visitedIndex = this.queue.deleteQ();
            console.log('visitedIndex = ', visitedIndex);
            if(this.visited[visitedIndex] !== true) {
                // 访问
                console.log('访问'+visitedIndex+'顶点 = '+this.vertices[visitedIndex]);
                this.visited[visitedIndex] = true;
            }
            for (let j = 0; j < this.vNum; j++ ) {
                if(j !== i ) {
                    let pos = this.positionInEdges(i, j);
                   // console.log(i, j);
                    if(this.edges[pos] !== undefined && this.visited[j] !== true ) {
                        this.queue.addQ(j);
                    }
                }
               
            }
        }
    }
    /**
     * depth first 7-search
     * 深度优先遍历 （树的先序遍历， 借用堆栈）
     * i： 从结点i开始遍历 , 以顶点Vi为出发点对邻接表存储的图G进行DFS搜索
     * */
    DFS (i) {
        // 访问
        let k = this;
        console.log('访问'+i+'顶点 = '+this.vertices[i]);
        this.visited[i] = true;
        // 标记访问过的顶点
        for(var j = 0; j < this.vNum; j++) {
          
            if(j !== i ) {
                let pos = this.positionInEdges(i, j);
                if(this.edges[pos] !== undefined && this.visited[j] !== true ) {
                    k.DFS(j);
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

//
class VertexNode {
    constructor (id, data) {
        this.id = id; //顶点标识
        this.data = data; // 顶点的数据
        this.position = -1; // 顶点在vertices数组中的位置
    }
}

class EdgeNode {
    constructor (sid, eid, weight) {
        this.startId = sid; //起始结点标识
        this.endId = eid; // 结束结点标识
        this.weight = weight; // 边的权重
        this.sPosition = -1; // 边在edges数组中的第一层index
        this.ePosition = -1;// 边在edges数组中的第二层index
    }
}

let vertexArr = [0,1,2,3,4,5,6];
let edgeArr = [
    {startVertex:1, endVertex:2, weight:333},
    {startVertex:1, endVertex:5, weight:32},
    {startVertex:1, endVertex:4, weight:31},
    {startVertex:2, endVertex:6, weight:3},
    {startVertex:3, endVertex:4, weight:5},
    {startVertex:6, endVertex:3, weight:1},
    {startVertex:4, endVertex:0, weight:10},
];
let graph = new Graph();
graph.createGraph(vertexArr, edgeArr);

console.dir(graph.edges);

//graph.DFS(1);
graph.BFS(1);