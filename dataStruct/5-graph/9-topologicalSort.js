/**
 * 拓扑排序
 * 拓扑序： 如果图中从V到W有一条有向路径，
 * 则V一定排在W之前，满足此条件的顶点序列称为一个拓扑序
 *
 * 获得一个拓扑序的过程就是拓扑排序
 * AOV （activity on vertex, 行为在顶点上）如果有合理的拓扑序，则必定是
 * 有向无环图（directed acyclic Graph, DAG）
 * */

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
        this.vertexPostion = -1; // 对应的顶点在邻接表的位置
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
            edgeNode.vertexPostion = endVertexObj.position;
            startVertexObj.firstEdge = edgeNode;
            endVertexObj.inDegree++;
            if(this.gType === GraphType.UN) {
                edgeNode = new EdgeNode(tempNode.startVertex, tempNode.weight);
                edgeNode.next = endVertexObj.firstEdge;
                edgeNode.vertexPostion = startVertexObj.position;
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
    //拓扑排序
    topologicalSort () {
        let queue = new Queue(100);
        for(let i = 0; i < this.vNum; i++) {
            if(this.adjList[i].inDegree === 0) {
                queue.addQ(this.adjList[i]);
            }
        }
        let result = [];
        let count = 0;
        while (!queue.isEmptyQ()) {
            let vObj = queue.deleteQ();
            result.push(vObj.data);
            count++;
            for(let next = vObj.firstEdge; next; next = next.sibling) {
                let  vertexFromEdge = this.adjList[next.vertexPostion];
                vertexFromEdge.inDegree--;
                if(vertexFromEdge.inDegree === 0) {
                    queue.addQ(vertexFromEdge);
                }
            }
        }
        if(count !== this.vNum) {
            return '图中有回路';
        }

        return result;
    }

}

let edgeArr = [
    {
        startVertex: 'c1',
        endVertex: 'c3',
        weight: 1
    } ,
    {
        startVertex: 'c2',
        endVertex: 'c3',
        weight: 1
    },
    {
        startVertex: 'c4',
        endVertex: 'c5',
        weight: 1
    },
    {
        startVertex: 'c5',
        endVertex: 'c6',
        weight: 1
    },
    {
        startVertex: 'c3',
        endVertex: 'c7',
        weight: 1
    },
    {
        startVertex: 'c8',
        endVertex: 'c9',
        weight: 1
    },
    {
        startVertex: 'c7',
        endVertex: 'c10',
        weight: 1
    },
    {
        startVertex: 'c9',
        endVertex: 'c10',
        weight: 1
    },
    {
        startVertex: 'c7',
        endVertex: 'c11',
        weight: 1
    },
    {
        startVertex: 'c9',
        endVertex: 'c11',
        weight: 1
    },
    {
        startVertex: 'c7',
        endVertex: 'c12',
        weight: 1
    },
    {
        startVertex: 'c2',
        endVertex: 'c13',
        weight: 1
    },
    {
        startVertex: 'c10',
        endVertex: 'c14',
        weight: 1
    },
    {
        startVertex: 'c6',
        endVertex: 'c15',
        weight: 1
    }
];

let vertexArr =[
    {
        id: 'c1',
        data: '程序设计基础'
    },
    {
        id: 'c2',
        data: '离散数学'
    },
    {
        id: 'c3',
        data: '数据结构'
    },{
        id: 'c4',
        data: '微积分1'
    },{
        id: 'c5',
        data: '微积分2'
    },{
        id: 'c6',
        data: '线性代数'
    },{
        id: 'c7',
        data: '算法'
    },{
        id: 'c8',
        data: '逻辑与计算机基础'
    },{
        id: 'c9',
        data: '计算机组成'
    },{
        id: 'c10',
        data: '操作系统'
    },{
        id: 'c11',
        data: '编译原理'
    },{
        id: 'c12',
        data: '数据库'
    },{
        id: 'c13',
        data: '计算理论'
    },
    {
        id: 'c14',
        data: '计算机网络'
    },
    {
        id: 'c15',
        data: '数值分析'
    }
];

let graph = new Graph(GraphType.DN);
graph.createGraph(vertexArr, edgeArr);

let res = graph.topologicalSort();

console.dir(res);