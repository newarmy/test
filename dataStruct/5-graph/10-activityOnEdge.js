/**
 * 关键路径问题
 * AOE（Activity On Edge）网络, 事件发生在边的情况
 *
 * 一般用于安排项目的工序
 * 图的边表示活动
 * 图的结点表示一个活动结束
 *
 * */

/**
 * 结点的数据结构
 * */

class VertexNode {
    constructor (id) {
        this.id = id; //结点边号
        this.earliest = -1; // 某一活动的最早完成时间
        this.latest = -1; // 某一活动的最晚完成时间
        this.preEdges = []; //存放以当前结点为终点的边对象
    }
}

/**
 * 边的数据结构
 * */

class EdgeNode {
    constructor (startId, endId, duration) {
        this.startId = startId; // 起始结点id
        this.endId = endId; //结束结点id
        this.duration = duration; // 活动的持续时间
        this.floatTime = 0; // 机动时间
    }
}

class Graph {
    constructor () {
        this.list = [];
        this.vNum = 0;
        this.eNum = 0;
    }
    createGraph(vertexArr, edgeArr) {
        let k = this;
        this.vNum = vertexArr.length;
        this.eNum = edgeArr.length;
        vertexArr.forEach(e => {
            k.list.push(new VertexNode(e));
        });

        edgeArr.forEach(e => {
            let sId = e.startId;
            let eId = e.endId;
            let duration = e.duration;
            let edgeNode = new EdgeNode(sId, eId, duration);
            let vertexNode = k.findVertex(eId);
            vertexNode.preEdges.push(edgeNode);
        })

    }
    findVertex (id) {
        for (let i = 0; i < this.vNum; i++) {
            if(id === this.list[i].id) {
                return this.list[i];
            }
        }
        return null;
    }
    findEdgesByStartId (startId) {
        let res = [];
        for(let i = 0; i < this.vNum; i++) {
            let preEdges = this.list[i].preEdges;
            for (let j = 0, len = preEdges.length; j < len; j++) {
                let edge = preEdges[j];
                if(edge.startId === startId) {
                    res.push(edge);
                }
            }
        }
        return res;
    }
    findEdgesByEndId (endId) {
        let res = [];
        for(let i = 0; i < this.vNum; i++) {
            let preEdges = this.list[i].preEdges;
            for (let j = 0, len = preEdges.length; j < len; j++) {
                let edge = preEdges[j];
                if(edge.endId === endId) {
                    res.push(edge);
                }
            }
        }
        return res;
    }
    // 计算每个顶点的lastest值（先计算earliest值）
    computeLatest (endId) {
        let latestVertexObj = this.findVertex(endId);
        let preEdges = latestVertexObj.preEdges;
        this.recursionComputeLatest(latestVertexObj, preEdges);
    }
    recursionComputeLatest(endVertex, preEdges) {
        if(!preEdges ) {
            return;
        }
        if(preEdges.length === 0) {
            return;
        }

        preEdges.forEach( e => {
            let startVertex = this.findVertex(e.startId);
            if(startVertex.latest === -1) {
                startVertex.latest = endVertex.latest - e.duration;
            } else if ( startVertex.latest > endVertex.latest - e.duration) {
                startVertex.latest = endVertex.latest - e.duration;
            }

            this.recursionComputeLatest(startVertex, startVertex.preEdges);
        })
    }
    // 计算每个顶点的earliest值
    computeEarliest (startId) {
        let vertexObj = this.findVertex(startId);
        vertexObj.earliest = 0;
        vertexObj.latest = 0;
        let edges = this.findEdgesByStartId(startId);
        this.goComputeEarliest(edges);
        let lateNode = this.list[this.vNum-1];
        lateNode.latest = lateNode.earliest;
    }
    goComputeEarliest(edges) {
        let k = this;
        let endArr = [];
        edges.forEach(e => {
            let sV = k.findVertex(e.startId);
            let eV = k.findVertex(e.endId);
            endArr.push(e.endId);
            if(eV.earliest < sV.earliest + e.duration) {
                eV.earliest = sV.earliest + e.duration;
            }

        })
        endArr.forEach( e => {
            k.goComputeEarliest(k.findEdgesByStartId(e));
        });
    }
    // 计算每条边的机动时间
    computeEdgesFloatTime () {
        this.list.forEach(vertex => {
            vertex.preEdges.forEach(e => {
                let sV = this.findVertex(e.startId);
                let eV = this.findVertex(e.endId);
                e.floatTime = eV.latest - sV.earliest - e.duration;
            })
        })
    }

}

let vertexArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let edgeArr = [
    {
        startId: 0,
        endId: 1,
        duration: 6
    },
    {
        startId: 0,
        endId: 2,
        duration: 4
    },
    {
        startId: 0,
        endId: 3,
        duration: 5
    },
    {
        startId: 1,
        endId: 4,
        duration: 1
    },
    {
        startId: 2,
        endId: 4,
        duration: 1
    },
    {
        startId: 3,
        endId: 5,
        duration: 2
    },
    {
        startId: 4,
        endId: 6,
        duration: 9
    },
    {
        startId: 4,
        endId: 7,
        duration: 7
    },
    {
        startId: 5,
        endId: 7,
        duration: 4
    },
    {
        startId: 6,
        endId: 8,
        duration: 2
    },
    {
        startId: 7,
        endId: 8,
        duration: 4
    }

];

let graph = new Graph();
graph.createGraph(vertexArr, edgeArr);
graph.computeEarliest(0);
graph.computeLatest(8);
graph.computeEdgesFloatTime();
console.log(graph);