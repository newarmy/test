
/**
 * 排好序的数据数组 来 生成完全二叉搜索树
 * */

// 排好序的数据数组
let arr = [1,2,3,4,5,6,7];
// 存放树结点的数组
let treeArr = new Array(arr.length);
// 计算出n个结点的完全二叉树其左子树有多少个结点
function getLeftLength(n) {
    //
    let treeHeight = Math.ceil(Math.log(n+1)/Math.log(2));
    console.log('treeHeight = '+treeHeight);
    let lastLayerNodeNum = n+1 - Math.pow(2, treeHeight);
    let leftTreeLength = Math.pow(2, treeHeight-1) -1 + Math.min(lastLayerNodeNum, Math.pow(2, treeHeight-1));
    console.log(leftTreeLength);
    return leftTreeLength;
}

function createCompleteSearchTree(leftPos, rightPos, treeRootPos) {
    // 初始调用为createCompleteSearchTree(0, arr.length-1, 0);
    let num = rightPos-leftPos+1;
    console.log();
    if(num === 0) return; //arr数据处理完了
    let leftTreeNum = getLeftLength(num); // 计算出num个结点的数其左子树有多少个结点
    treeArr[treeRootPos] = arr[leftPos+leftTreeNum];
    let leftTreeRootPos = treeRootPos*2+1; //左子树在数组中的位置
    let rightTreeRootPos = leftTreeRootPos + 1;//右子树在数组中的位置
    // left sub 4-tree
    createCompleteSearchTree(leftPos, leftPos+leftTreeNum-1, leftTreeRootPos);
    createCompleteSearchTree(leftPos+leftTreeNum+1, rightPos, rightTreeRootPos);

}

createCompleteSearchTree(0, arr.length-1, 0);

console.log(treeArr);