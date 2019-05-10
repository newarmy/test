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