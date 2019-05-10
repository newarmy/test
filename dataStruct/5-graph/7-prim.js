/**
 *Prim算法求最小生成树的时候和边数无关，和顶点树有关，所以适合求解稠密网的最小生成树。

 Prim算法的步骤包括：

 1. 将一个图分为两部分，一部分归为点集U，一部分归为点集V，U的初始集合为{V1}，V的初始集合为{ALL-V1}。

 2. 针对U开始找U中各节点的所有关联的边的权值最小的那个，然后将关联的节点Vi加入到U中，并且从V中删除（注意不能形成环）。

 3. 递归执行步骤2，直到V中的集合为空。

 4. U中所有节点构成的树就是最小生成树。
 *
 * */

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
        this.dist = []; // 每个顶点到最小生成树的距离
        this.parent = []; // 存放最小生成树的数组，数组值值是下标的父结点编号
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
            this.dist[i] = MAXVALUE; // 初始化dist
            this.parent[i] = -1; //初始化parent
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
    /**
     *PRIM,最小生成树算法
     * Prim算法实质就是每在最小生成树集合中加入一个点就需要把这个点与集合外的点比较，不断的寻找两个集合之间最小的边
     * */
    prim() {
        this.parent[0] = -1;
        let isFirstRun = true;
        let collected = [];//收录在树上的点
        while(1) {
            let minIndex = -1;
            if(!isFirstRun) {
              let minDistToTree = MAXVALUE;
              for(let i = 0; i < this.vNum; i++) {
                  if(minDistToTree > this.dist[i] && this.dist[i] !== 0) {
                      minDistToTree = this.dist[i];
                      // 当前到树的最小距离就是结点编号 i
                      minIndex = i;
                  }
              }
              if(minIndex === -1) {
                  break;
              }
            } else {
                isFirstRun = false;
                minIndex = 0; //第一次运行到循环， 当前到树的最小距离就是结点编号是0；
            }
            collected.push(minIndex);
            this.dist[minIndex] = 0;
            //console.log('----------'+minIndex+'--------------');
            for(let treeIndex = 0, treeLength = collected.length; treeIndex < treeLength; treeIndex++){
                let row = collected[treeIndex];
                //console.log('row = '+row);
                for(let i = 0; i< this.vNum; i++) {
                    if(this.dist[i] !== 0) {
                        console.log(row, i ,this.edges[row][i] +'<'+ this.dist[i]);
                        if(this.edges[row][i] < this.dist[i]) {

                            this.dist[i] = this.edges[row][i]; // this.dist[i] 存 顶点i到树的最短距离
                            this.parent[i] = row;
                        }
                    }
                }
            }

        }
        if(collected.length === this.vNum) {
            return 'ok'
        } else {
            return 'error'
        }
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
let graph = new Graph(GraphType.UN);
graph.createGraph(vertexArr, edgeArr);

graph.prim();
console.log(graph.parent);