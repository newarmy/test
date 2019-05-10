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
    }
    /**
     * vertexArr 顶点数据（顶点号）数组，顶点号从0开始
     * */
    createGraph(vertexArr) {
        let i, j, k;
        this.vNum = vertexArr.length;

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
        this.createEdge();
    }
    createEdge() {

        for (let k = 0; k < this.vNum; k++) {
            let v1 = this.vertices[k];
            for(let x = 0; x < this.vNum; x++) {
                let v2 = this.vertices[x];
                if(k !== x && this.compute(v1, v2)) {
                    this.edges[k][x] = 1;
                    this.eNum++;
                }
            }
        }
    }
    compute(e1, e2) {
       let x =  Math.abs(e1.x - e2.x);
       let y = Math.abs(e1.y - e2.y);
      // console.log(Math.sqrt(x*x+y*y));
       return Math.sqrt(x*x+y*y) <= Math.sqrt(2);
    }
    isSave(e) {
        return Math.abs(e.x)>=4 || Math.abs(e.y) >= 4;
    }
    /**
     * depth first 7-search
     * 深度优先遍历 （数的先序遍历， 借用堆栈）
     * i： 从结点i开始遍历 , 以顶点Vi为出发点对邻接表存储的图G进行DFS搜索
     * */
    DFS (i) {
        let k = this;
        // 访问
        let vertex = this.vertices[i];
        if(this.isSave(vertex)) {
            return 'yes';
        }
        this.visited[i] = true;
        let arr = this.edges[i];
        for(var j = 0; j < this.vNum; j++) {
            if(arr[j] !== MAXVALUE && !this.visited[j]) {
               let res = k.DFS(j);
               if(res === 'yes') {
                   return res;
               }
            }
        }
        return 'no';
    }
    //
    searchAllVertex() {
        for(let i = 0; i < this.vNum; i++) {
            if(this.visited[i] !== true) {
                let res = this.DFS(i);
                if(res === 'yes') {
                    return 'yes';
                }
            }
        }
        return 'no';
    }
}

let vertexArr = [
    {
        x:0,
        y:0
    },
    {
        x:1,
        y:1
    },
    {
        x:2,
        y:1
    },
    {
        x:1,
        y:2
    },
    {
        x:0,
        y:2
    },
    {
        x:-1,
        y:2
    },
    {
        x:-2,
        y:2
    },
    {
        x:-1,
        y:-3
    },
    {
        x:-3,
        y:1
    },
    {
        x:-4,
        y:0
    },
    {
        x:-1,
        y:-4
    },
    {
        x:4,
        y:-1
    },
    {
        x:-2,
        y:-4
    },



];

let graph = new Graph(GraphType.UG);
graph.createGraph(vertexArr);
console.log(graph);
console.log(graph.DFS(0));