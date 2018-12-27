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

let testTree = createTree([1,2,3,4,5,6,7]);
/***
 * 先序遍历 递归
 *
 * */

function preOrderTraversal (BT) {
    if(BT) {
        console.log(BT.data);
        preOrderTraversal(BT.left);
        preOrderTraversal(BT.right);
    }
}
preOrderTraversal(testTree);
console.log('------------------------------');
/**
 * 中序遍历 递归
 * */
function centerOrderTraversal(BT) {
    if(BT) {
        centerOrderTraversal(BT.left);
        console.log(BT.data);
        centerOrderTraversal(BT.right);
    }
}
centerOrderTraversal(testTree);
console.log('------------------------------');

/**
 * 后序遍历 递归
 * */
function postOrderTraversal(BT) {
    if(BT) {
        postOrderTraversal(BT.left);
        postOrderTraversal(BT.right);
        console.log(BT.data);
    }
}
postOrderTraversal(testTree);
console.log('------------------------------');

//------------------------------------------------------------------------
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
    while(BT || !stack.isEmpty()) {

        while(BT){// 一直向左并将沿途结点压入堆栈
            stack.push(BT); // ---第一次碰到这个结点-----
            BT = BT.left;
        }

        if(!stack.isEmpty()) {
            BT = stack.pop(); // 结点弹出堆栈  // ---第二次碰到这个结点-----
            console.log(BT.data);// 访问
            BT = BT.right;// 转向右子树
        }
    }
}

console.log('----非递归中序遍历----');
centerOrderTraversalByStack(testTree);

/**
 * 先序非递归遍历算法（借助堆栈）
 * */

function preOrderTraversalByStack(BT) {
    let stack = new Stack(); // 创建空栈
    while(BT || !stack.isEmpty()) {

        while(BT){// 一直向左并将沿途结点压入堆栈
            stack.push(BT); // ---第一次碰到这个结点-----
            console.log(BT.data);// 访问
            BT = BT.left;
        }

        if(!stack.isEmpty()) {
            BT = stack.pop(); // 结点弹出堆栈  // ---第二次碰到这个结点-----
            BT = BT.right;// 转向右子树
        }
    }
}
console.log('----非递归先序遍历----');
preOrderTraversalByStack(testTree);

/**
 * 后序非递归遍历算法（借助堆栈）
 * */

function postOrderTraversalByStack (BT) {
    let stack = new Stack(); // 创建空栈
    while((BT && !BT.isTraversal) || !stack.isEmpty()) {
        //console.log(BT);
        while(BT && !BT.isTraversal){// 一直向左并将沿途结点压入堆栈
            stack.push(BT); // ---第一次碰到这个结点-----
            BT = BT.left;
        }
        let temp = null;
        if(!stack.isEmpty()) {
            BT = stack.pop(); // 结点弹出堆栈  // ---第二次碰到这个结点-----
            temp = BT;
            BT = BT.right;// 转向右子树
            if(BT && !BT.isTraversal) {
                stack.push(temp);
            } else {
                console.log(temp.data); // 第三次碰到这个结点
                temp.isTraversal = true;
            }
        }

    }
}
console.log('----非递归后序遍历----');
postOrderTraversalByStack(testTree);
/**
 * 队列
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
            return 'queue fulled';
        this.list[this.rear] = item;
        this.rear = (this.rear+1)%this.maxSize;
    }
    deleteQ() {
        if(this.front === this.rear) {
            return 'queue empty'
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
/**
 * 层次遍历， 用队列
 * */

function levelOrderTraversal(BT) {
    if(!BT)
        return;
    let queue = new Queue(10); // create empty queue
    queue.addQ(BT);
    while (!queue.isEmptyQ()) {
        let item = queue.deleteQ();
        console.log(item.data);

        if(item.left) {
            queue.addQ(item.left);
        }
        if(item.right) {
            queue.addQ(item.right);
        }
    }
}
console.log('--------层次遍历----------');
levelOrderTraversal(testTree);