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
        this.vertices = new Array(MAXVERTEXNUM); // 顶点表
        this.edges = [];// 二维数组，邻接矩阵，即边表
    }
    /**
     * vertexArr 顶点数据（顶点号）数组
     * edgeArr 边的数组， {startVertex(边的起始结点)， endVertex（边的结束结点）, weight（边的权重）}
     * */
    createGraph(vertexArr, edgeArr) {
        let i, j, k;
        this.vNum = vertexArr.length;
        this.eNum = edgeArr.length;
        // 顶点号
        vertexArr.forEach( (e, i) => {
            this.vertices[i] = e;
        });
        //初始邻接矩阵
        for(i = 0; i < this.vNum; i++) {
            this.edges[i] = [];
            for(j =0; j < this.vNum; j++) {
                this.edges[i][j] = MAXVALUE;
            }
        }
        console.dir(this.edges);
        for (k = 0; k < this.eNum; k++) {
            let edge = edgeArr[k];
            this.edges[edge.startVertex][edge.endVertex] = edge.weight;
            if(this.gType === GraphType.UN) {
                this.edges[edge.endVertex][edge.startVertex] = edge.weight;
            }
        }
    }
}

let vertexArr = [0,1,2,3,4,5,6];
let edgeArr = [
    {startVertex:1, endVertex:2, weight:3},
    {startVertex:2, endVertex:6, weight:3},
    {startVertex:4, endVertex:3, weight:5},
    {startVertex:6, endVertex:3, weight:1},
];
let graph = new Graph();
graph.createGraph(vertexArr, edgeArr);

console.dir(graph);