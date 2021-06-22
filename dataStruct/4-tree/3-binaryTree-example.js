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

/**
 * 找出叶子结点的数据（改造先序遍历算法）
 * */

function getLeafNode (BT) {
    if(BT) {
        if(!BT.right && !BT.left) {
            console.log(BT.data);
        }
        getLeafNode(BT.left);
        getLeafNode(BT.right)
    }

}
console.log('-----------找出叶子结点-----------------');
getLeafNode(testTree);

/**
 * 求二叉树的高度 height = Max(hL, hr)+1;
 * */

function postOrderGetHeight(tree) {
    if(tree) {
        let hl = postOrderGetHeight(tree.left);
        let hr = postOrderGetHeight(tree.right);
        return (Math.max(hl, hr)+1)
    } else {
        return 0;
    }
}
console.log('-----------求二叉树的高度---------------');
console.log(postOrderGetHeight(testTree));

/**
 * 二元运算表达式树及其遍历
 * */

