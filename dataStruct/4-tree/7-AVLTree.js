/**
 * 平衡二叉树 （链式存储）
 * 左右子树高度差的绝对值不超过1，也是查找树
 *
 * 平衡二叉树的调整
 *
 * rr插入，RR旋转（右单旋）
 * ll
 * lr
 * rl
 * */
function getHeight(tree) {
    if(tree) {
        let hl = getHeight(tree.left);
        let hr = getHeight(tree.right);
        return (Math.max(hl, hr)+1)
    } else {
        return 0;
    }
}
// left left rotation
function singleLeftRotation(ATree) {
    let BTree = ATree.left;
    let BRightTree = BTree.right;
    BTree.right = ATree;
    ATree.left = BRightTree;
    ATree.height = Math.max(getHeight(ATree.left), getHeight(ATree.right))+1;
    BTree.height = Math.max(getHeight(BTree.left), getHeight(ATree))+1;
    return BTree;
}
// left right rotation
function doubleLeftRightRotation(A) {
    let B = A.left;
    let C = B.right;
    let CLeft = C.left;
    let CRight = C.right;
    C.left = B;
    C.right = A;
    A.left = CRight;
    B.right = CLeft;
    B.height = Math.max(getHeight(B.left), getHeight(CLeft))+1;
    A.height = Math.max(getHeight(CRight), getHeight(A.right))+1;
    C.height = Math.max(getHeight(B), getHeight(A))+1;
    return C;
}

// right right rotation
function singleRightRotation(A) {
    let B = A.right;
    let BLeft = B.left;
    B.left = A;
    A.right = BLeft;
    A.height = Math.max(getHeight(A.left), getHeight(BLeft))+1;
    B.height = Math.max(getHeight(A), getHeight(B.right))+1;
    return B;
}

// right left rotation
function doubleRightLeftRotation(A) {
    let B = A.right;
    let C = B.left;
    let CL = C.left;
    let CR = C.right;
    C.left = A;
    C.right = B;
    A.right = CL;
    B.left = CR;
    B.height = Math.max(getHeight(B.left), getHeight(B.right))+1;
    A.height = Math.max(getHeight(A.left), getHeight(A.right))+1;
    C.height = Math.max(getHeight(A), getHeight(B))+1;
    return C;

}

function AVLTreeNode (opt) {
    this.data = opt.data;
    this.left = opt.left;
    this.right = opt.right;
    this.height = 0;
    this.isTraversal = false; // 非递归后序遍历使用的标记位
}

function avl_insert(x, tree) {
    if(!tree) {
        tree = new AVLTreeNode({data:x});
    } else if(x < tree.data) {
        tree.left = avl_insert(x, tree.left);
        if(getHeight(tree.left)-getHeight(tree.right) === 2) {
            if(x < tree.left.data) {
                tree = singleLeftRotation(tree); // ll
            } else {
                tree = doubleLeftRightRotation(tree);// lr
            }
        }
    } else if(x > tree.data) {
        tree.right = avl_insert(x, tree.right);
        if(getHeight(tree.left) - getHeight(tree.right) === -2) {
            if(x > tree.right.data) {
                tree = singleRightRotation(tree);
            } else {
                tree = doubleRightLeftRotation(tree);
            }
        }
    } else {
        // x === 4-tree.data 无需插入
    }
    tree.height = Math.max(getHeight(tree.left), getHeight(tree.right))+1;
    return tree;

}

let tree = null;
[2,3,12,55,56,12].forEach(e => {
   if(!tree) {
      tree = avl_insert(e)
    } else {
      tree = avl_insert(e, tree);
    }
});
console.dir(tree);
