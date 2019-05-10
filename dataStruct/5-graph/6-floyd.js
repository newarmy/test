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
 * 图的表示：
 * 邻接矩阵G[N][N ] -n个顶点从0到N-1编号
 * G[I][J]
 *
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

// 图的类型定义
class Graph {
    constructor (GType, vNum, eNum) {
        this.gType = GType || GraphType.DN; //图的类型
        this.vNum = vNum || 0; // 点的数量
        this.eNum = eNum || 0; //边的数量
        this.vertices = new Array(MAXVERTEXNUM); // 顶点表，
        this.edges = [];// 二维数组，邻接矩阵，即边表
        this.stack = null; //深度优先遍历辅助堆栈；
        this.queue = null; //广度优先遍历辅助队列
        this.visited = []; //是否被访问过。访问过为true
        this.dist = [] ;// 存放最短路径值
        this.path = [] ;// 存放经过的点
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
        for(i = 0; i < this.vNum; i++) {
            this.edges[i] = [];
            for(j =0; j < this.vNum; j++) {
                this.edges[i][j] = MAXVALUE;
            }
        }
        for (k = 0; k < this.eNum; k++) {
            let edge = edgeArr[k];
            this.edges[edge.startVertex][edge.endVertex] = edge.weight;
            if(this.gType === GraphType.UN) {
                this.edges[edge.endVertex][edge.startVertex] = edge.weight;
            }
        }
    }
    //多源最短路算法 稠密图，邻接矩阵, this.dist[i][j]存放的是最短距离，this.path[i][j]是最短距经过的顶点
    floyd() {
        for(let i = 0; i < this.vNum; i++) {
            this.dist[i] = [];
            this.path[i] = [];
            for(let j =0; j < this.vNum; j++) {
                this.dist[i][j] = this.edges[i][j];
                this.path[i][j] = -1;
            }
        }
        for(let k = 0; k < this.vNum; k++) { //新加的顶点k
            for(let i =0; i < this.vNum; i++) { // i, j 上一步存好的
                for(let j =0; j < this.vNum; j++) {
                    if(this.dist[i][k]+this.dist[k][j] < this.dist[i][j]){
                        //console.log(i, j, '=', k)
                        this.dist[i][j] = this.dist[i][k]+this.dist[k][j];
                        this.path[i][j] = k;
                    }
                }
            }
        }

    }
    //打印最短路上经过的结点：
    printPath (from, to) {
        let middle = this.path[from][to];
        if(middle === -1){
            return;
        }
        this.printPath(from, middle);
        console.log('最短路上经过的结点： '+middle);
        this.printPath(middle, to);

    }
}

let vertexArr = [0,1,2,3,4,5,6];
let edgeArr = [
    {startVertex:1, endVertex:2, weight:3},
    {startVertex:1, endVertex:6, weight:2},
    {startVertex:1, endVertex:5, weight:1},
    {startVertex:2, endVertex:3, weight:3},
    {startVertex:4, endVertex:3, weight:1},
    {startVertex:0, endVertex:3, weight:12},
    {startVertex:6, endVertex:3, weight:11},
    {startVertex:6, endVertex:4, weight:12},
    {startVertex:5, endVertex:4, weight:1},
    {startVertex:6, endVertex:5, weight:1},
];
let graph = new Graph(GraphType.UG);
graph.createGraph(vertexArr, edgeArr);
graph.floyd();
console.dir(graph);
graph.printPath(1, 3);
