/**
 * 平衡二叉树 （链式存储）
 * 左右子树高度差的绝对值不超过1，也是查找树
 *
 * 平衡二叉树的调整
 *
 * rr插入，RR旋转（右单旋）
 * */

function TreeNode (opt) {
    this.data = opt.data;
    this.left = opt.left;
    this.right = opt.right;
    this.parent = null;
    this.isTraversal = false; // 非递归后序遍历使用的标记位
}
//递归
function findByRecursion(x, tree) {
    if(!tree) {
        return null;
    }
    if(x > tree.data) {
        return findByRecursion(x, tree.right); //尾递归 ==》 循环
    } else if(x < tree.data) {
        return findByRecursion(x, tree.left)//尾递归 ==》 循环
    } else {
        return tree;
    }
}

//循环
function findByLoop(x, tree) {
    while(tree) {
        if(x < tree.data) {
            tree = tree.left;
        } else if(x > tree.data) {
            tree = tree.right;
        } else {
            return tree;
        }
    }
    return null;
}
// 最小值
function findMin(tree) {
    if(!tree) {
        return null;
    } else {
        while(tree) {
            if(tree.left) {
                tree = tree.left;
            } else {
                return tree;
            }
        }
        return null;
    }
}

// 最大值

function findMax(tree) {
    if(!tree) {
        return null;
    }
    if(tree.right) {
        return findMax(tree.right);
    } else {
        return tree;
    }
}


function insert(x, tree) {
    if(!tree) {
        tree = new TreeNode({data: x});
    } else {
        if(x < tree.data) {
            tree.left = insert(x, tree.left);
        } else if (x > tree.data) {
            tree.right = insert(x, tree.right);
        }
    }
    return tree;
}

var tArr = [2, 4, 1, 6, 333, 22, 3334];
let treeObj = null;
tArr.forEach(e => {
    if(!treeObj) {
    treeObj = insert(e);
    } else {
    treeObj = insert(e, treeObj);
    }
});

console.dir(treeObj);

// delete(x, 4-tree) 将x从tree删除

function deleteTreeNode(x, tree){
    let tmp;
    if(!tree) {
        return null;
    } else if(x < tree.data) {
        tree.left = deleteTreeNode (x, tree.left);
    } else if(x > tree.data) {
        tree.right = deleteTreeNode (x, tree.right);
    } else {
        if (tree.left && tree.right) {
            tmp = findMax(tree.left); // 查找左子树的最大值
            tree.data = tmp.data; //左子树的最大值替换掉当前结点的值
            tree.left = deleteTreeNode (tree.data, tree.left);// 删除左子树的最大值
        } else {
            if(!tree.left) {
                tree = tree.right
            } else if(!tree.right) {
                tree = tree.left;
            } else {
                tree = null;
            }
        }
    }
    return tree;
}

console.log(deleteTreeNode(6, treeObj));