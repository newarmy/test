/**
 *
 * 通过先序序列和中序序列退出后序序列
 * */

/**
 * 二叉树 （链式存储）
 *
 * */

function TreeNode (opt) {
    this.data = opt.data;
    this.left = opt.left;
    this.right = opt.right;
    this.parent = null;
    this.isTraversal = false; // 非递归后序遍历使用的标记位
}
// let arr = [1,2,3,4,5,6,7];
function createTree(arr){
    let treeArr = [];
    arr.forEach(function (e) {
        treeArr.push(new TreeNode({data: e}));
    });
    let root;
    treeArr.forEach(function (tree) {
        if(!root) {
            root = tree;
        } else {
            createSubTree(root, tree);
        }

    })

    return root;
}
function createSubTree(p, c) {
    if(!p.left) {
        p.left = c;
        c.parent = p;
    } else if(!p.right) {
        p.right = c;
        c.parent = p;
    } else {
        if(p.left && (!p.left.left || !p.left.right)){
            createSubTree(p.left, c);
        } else if(p.right && (!p.right.left || !p.right.right)) {
            createSubTree(p.right, c);
        }

    }
}
/**
 * ------ 堆栈------------
 * */
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
 * 中序非递归遍历算法 （借助堆栈）
 * **/

function centerOrderTraversalByStack(BT) {
    let stack = new Stack(); // 创建空栈
    let arr = [];
    while(BT || !stack.isEmpty()) {

        while(BT){// 一直向左并将沿途结点压入堆栈
            stack.push(BT); // ---第一次碰到这个结点-----
            BT = BT.left;
        }

        if(!stack.isEmpty()) {
            BT = stack.pop(); // 结点弹出堆栈  // ---第二次碰到这个结点-----
            //console.log(BT.data);// 访问
            arr.push(BT);
            BT = BT.right;// 转向右子树
        }
    }
    return arr;
}

/**
 * 先序非递归遍历算法（借助堆栈）
 * */

function preOrderTraversalByStack(BT) {
    let stack = new Stack(); // 创建空栈
    let arr = [];
    while(BT || !stack.isEmpty()) {

        while(BT){// 一直向左并将沿途结点压入堆栈
            stack.push(BT); // ---第一次碰到这个结点-----
            //console.log(BT.data);// 访问
            arr.push(BT);
            BT = BT.left;
        }

        if(!stack.isEmpty()) {
            BT = stack.pop(); // 结点弹出堆栈  // ---第二次碰到这个结点-----
            BT = BT.right;// 转向右子树
        }
    }
    return arr;
}


function postOrderTraversal (BT) {
    let preArr = preOrderTraversalByStack(BT);
    let inArr = centerOrderTraversalByStack(BT);
    let arrLength = preArr.length;
    let postArr = new Array(arrLength);
   // console.dir(inArr, preArr);
    /**
     * 参数说明：
     * prePos {{Number}} 先序结果数组的第一个元素的索引
     * centerPos {{Number}} 中序结果数组的第一个元素的索引
     * postPos {{Number}} 后序结果数组的第一个元素的索引， 默认 0
     * arrLen {{Number}} 树结点个数
     * */
    function getPostOrder(prePos, centerPos, postPos, arrLen) {

        if(arrLen === 0) return;
        if(arrLen === 1) {
            postArr[postPos] = preArr[prePos];
            return;
        }
        let root = preArr[prePos];
        postArr[postPos+arrLen-1] = root;
        //console.log(prePos, arrLen);
       // console.dir('root.data = '+root.data);
        let i = 0;
        for(;i < arrLen; i++) {
           // console.log(i +"'data = "+inArr[centerPos+i].data);
            if(inArr[centerPos+i].data === root.data) break;
        }
        console.log('i = '+ i);
        let leftChildTreeNum = i;
        let rightChildTreeNum = arrLen - leftChildTreeNum -1;
        // left child 4-tree recursion
        getPostOrder(prePos+1, centerPos, postPos, leftChildTreeNum);
        //right child 4-tree recursion
        getPostOrder(prePos+leftChildTreeNum+1, centerPos+leftChildTreeNum+1, postPos+leftChildTreeNum, rightChildTreeNum);
    }
    getPostOrder(0,0,0,arrLength);
    return postArr;
}
let testTree = createTree([1,2,3,4,5,6,7]);
console.dir(testTree);
console.log(postOrderTraversal(testTree));