class Node {
    constructor (isLeaf, MaxKeyNum, MaxChildNum) {
        this.isLeaf = isLeaf || false;//是否是叶子节点
        this.maxKeyNum = MaxKeyNum;
        this.maxChildNum = MaxChildNum;
        this.keyNum = 0;              //节点包含的关键字数量
        this.keyArr = [];     //关键字的值数组
        this.childArr = []; //子树指针数组
    }
    addKey(key) {
        let k = this;
        let index = k.keyArr.length - 1;
        for(; k.keyArr[index] > key && index > 0; index--) {
            k.keyArr[index+1] = k.keyArr[index];
        }
        k.keyArr[index] = key;
        k.keyNum = k.keyArr.length;
    }
    removeKey(key) {
        let k = this;
        let index = k.keyArr.length - 1;
        for(;  index > 0; index--) {
            if(k.keyArr[index] === key) {
                k.keyArr.splice(index, 1, 0);
            }
        }
        k.keyNum = k.keyArr.length;
    }
    setKeyArr() {

    }
    addChild(node) {

    }
    removeChild() {

    }
}

class BTree {
    constructor() {
        this.M = 3; // //B树的最小度数
        this.KEY_MAX = 2*this.M-1;        //节点包含关键字的最大个数
        this.KEY_MIN = this.M-1;          //非根节点包含关键字的最小个数
        this.CHILD_MAX = this.KEY_MAX+1;  //孩子节点的最大个数
        this.CHILD_MIN = this.KEY_MIN+1;  //孩子节点的最小个数
        this.ROOT = null;
    }
    insert (key) {
        let k = this;
        if(k.search(k.ROOT, key)) {
           return false;
        } else {
          if(k.ROOT == null) {
              k.ROOT = new Node(false, k.KEY_MAX, k.CHILD_MAX);
          }
          if(k.ROOT.keyNum === k.KEY_MAX){
              let newNode = new Node(false, k.KEY_MAX, k.CHILD_MAX);
              newNode.childArr[0] = k.ROOT;
              k.splitChild(newNode, 0, k.ROOT);
              k.ROOT = newNode;
          }
          k.insertNonFull(k.ROOT, key)
        }
    }
    search(Node, key) {
        let k = this;
        if(Node === null) {
            return false;
        } else {
            let i;
            for(i = 0; i < Node.keyNum && key > Node.keyArr[i]; ++i) {

            }
            if(i < Node.keyNum && key === Node.keyArr[i]) {
                return true;
            } else {
                if(Node.isLeaf) {
                    return false;
                } else {
                    return k.search(node.childArr[i], key);
                }
            }
        }
    }
    splitChild(parentTree, childIndex, childTree) {
        let k = this;
        //将pChild分裂成pLeftNode和pChild两个节点
        let rightTree = new Node(false, k.KEY_MAX, k.CHILD_MAX);
        rightTree.isLeaf = childTree.isLeaf;
        rightTree.keyNum = k.KEY_MIN;
        let i ;
        for(i = 0; i < k.KEY_MIN; ++i) {
            rightTree.keyArr[i] = childTree.keyArr[i+k.CHILD_MIN]
        }
        if (!childTree.isLeaf)  //如果不是叶子节点，拷贝孩子节点指针
        {
            for (i=0; i<k.CHILD_MIN; ++i)
            {
                rightTree.childArr[i] = childTree.childArr[i+k.CHILD_MIN];
            }
        }
        childTree.keyNum = k.KEY_MIN;//更新左子树的关键字个数

        for (i= parentTree.keyNum; i> childIndex; --i)//将父节点中的childIndex后的所有关键字的值和子树指针向后移一位
        {
            parentTree.childArr[i+1] = parentTree.childArr[i];
            parentTree.keyArr[i] = parentTree.keyArr[i-1];
        }
        ++parentTree.keyNum;  //更新父节点的关键字个数
        parentTree.childArr[childIndex+1] = rightTree;  //存储右子树指针
        parentTree.keyArr[childIndex] = childTree.keyArr[k.KEY_MIN];//把节点的中间值提到父节点

    }
    insertNonFull(pNode, key) {
        let k = this;
        let i = pNode.keyNum;  //获取节点内关键字个数
        if (pNode.isLeaf)      //pNode是叶子节点
        {
            while (i>0 && key < pNode.keyArr[i-1])   //从后往前，查找关键字的插入位置
            {
                pNode.keyArr[i] = pNode.keyArr[i-1];  //向后移位
                --i;
            }
            pNode.keyArr[i] = key;  //插入关键字的值
            ++pNode.keyNum; //更新节点关键字的个数
        }
        else//pNode是内节点
        {
            while(i>0&& key<pNode.keyArr[i-1])   //从后往前，查找关键字的插入的子树
            --i;
            let pChild = pNode.childArr[i];  //目标子树结点指针
            if (pChild.keyNum==k.KEY_MAX)  //子树节点已满
            {
                k.splitChild(pNode, i, pChild);//分裂子树节点
                if(key>pNode.keyArr[i])   //确定目标子树
                pChild = pNode.childArr[i+1];
            }
            k.insertNonFull(pChild, key);  //插入关键字到目标子树节点
        }
    }
}