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
    constructor (edgeEndId, weight, sibling) {
        this.edgeEndId = edgeEndId; // 一条边的终点标识（就是顶点表结点结构的id）
        this.sibling = sibling || null //指向的下一个邻接点的对象（和当前边结点的开始结点相同） ，EdgeNode 类型
        this.weight = weight|| 1; // 表示边上的权值信息， 网络中使用
    }
}

// 顶点表结点结构      (头结点)
class VertexNode {
    /**
     * id 顶点标识
     * data 顶点数据
     * */
    constructor (id, data) {
        this.id = id || 0; // 顶点标识
        this.data = data || null; // 顶点的数据域
        this.inDegree = 0; //顶点入度
        this.position = -1; // 顶点在邻接表数组中的位置
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
    }
    /**
     * vertexArr 顶点数据（顶点号）数组 {id: '图结点标识', data: '图结点数据'}
     * edgeArr 边的数组， {startVertex(边的起始结点标识)， endVertex（边的结束结点标识）, weight（边的权重）}
     * */
    createGraph(vertexArr, edgeArr) {
        let i;
        this.vNum = vertexArr.length;
        //初始邻接矩阵
        for(i = 0; i < this.vNum; i++) {
            this.adjList[i] = new VertexNode(vertexArr[i].id, vertexArr[i].data);
            this.adjList[i].position = i;
        }
        this.createEdge(edgeArr);
    }
    /**
     * edgeArr 边的数组， {startVertex(边的起始结点标识)， endVertex（边的结束结点标识）, weight（边的权重）}
     * */
    createEdge(edgeArr) {
        this.eNum = edgeArr.length;
        let edgeNode, k;

        for(k = 0; k < this.eNum; k++) {
            let tempNode = edgeArr[k];
            let startVertexObj = this.findEdgeStartVertex(tempNode.startVertex);
            let endVertexObj = this.findEdgeStartVertex(tempNode.endVertex);
            edgeNode = new EdgeNode(tempNode.endVertex, tempNode.weight);
            edgeNode.sibling = startVertexObj.firstEdge;
            startVertexObj.firstEdge = edgeNode;
            endVertexObj.inDegree++;
            if(this.gType === GraphType.UN) {
                edgeNode = new EdgeNode(tempNode.startVertex, tempNode.weight);
                edgeNode.next = endVertexObj.firstEdge;
                endVertexObj.firstEdge = edgeNode;
                startVertexObj.inDegree++;
            }
        }
    }
    /**
     * 通过边的起始点标识从邻接表中获得起始的顶点对象
     * startVertex: 边的起始点标识
     * */
    findEdgeStartVertex (startVertex) {
        for(let i = 0; i < this.vNum; i++) {
            let vObj = this.adjList[i];
            if(vObj.id === startVertex ) {
                return vObj;
            }
        }
        return null;
    }
    /**
     * depth first 7-search
     * 深度优先遍历 （数的先序遍历， 借用堆栈）
     * i： 从结点i开始遍历 , 以顶点Vi为出发点对邻接表存储的图G进行DFS搜索
     * */
    DFS (i) {
        let k = this;
        // let 3-stack = new Stack();
        console.log(i+'顶点 = '+this.adjList[i].vertex);
        this.visited[i] = true;
        for (let nextNode = this.adjList[i].firstEdge; nextNode; nextNode= nextNode.next ) {
            if(this.visited[nextNode.adjV] !== true) {
                k.DFS(nextNode.adjV);
            }
        }
    }
    /**
     * broadcast first 7-search
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

}

