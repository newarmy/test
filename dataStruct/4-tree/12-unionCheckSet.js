/**
 * 并查集：集合并， 查某元素属于什么集合。
 *
 * 并查集的表示方式：
 * 1. 双亲表示法， 孩子指向双亲
 *
 * 2. 最好用数组存储，
 * 数据中每个元素存一个对象
 * {
 *   data：元素数据
 *   parent: 元素父结点在数组中的索引
 * }
 *
 * 每一个集合是一棵树， 树根的parent为这个集合个数的负值。
 *
 *
 *
 * */

/**
 * 并查集元素结点数据表示
 * */

class UnionNode{
   constructor (data, pos) {
        this.data = data; //元素数据
        this.parent = pos || -1; // 元素父结点在数据中的索引
    }
}

/**
 * 并查集数据结构
 *
 * */
class UnionCheckSet {
    constructor () {
        this.list = []; //存放集合的数据
    }
    // 查找某个元素所在集合 （用根结点表示）
    find (x) {
        let i ;
        let len = this.list.length;
        for(i = 0; i < len && this.list[i].data !== x; i++) {
            ;
        }
        if(i >= len) return -1; //没查到
        for (; this.list[i].parent >= 0; i = this.list[i].parent) {
            ;
        }
        return i; // 元素x所在结合的根结点的索引
    }

    // 两个元素所在集合的并运算

    union (x1, x2) {
        let root1, root2;
        root1 = this.find(x1);
        root2 = this.find(x2);

        let rootNode1 = this.list[root1];
        let rootNode2 = this.list[root2];

        if(rootNode1.parent <= rootNode2.parent) {
            let root2Num = rootNode2.parent;
            rootNode2.parent = root1;
            rootNode1.parent += root2Num;
        } else {
            let root1Num = rootNode1.parent;
            rootNode1.parent = root2;
            rootNode2.parent += root1Num;
        }
    }

}

//并查集测试

let arr1 = [5, 66, 34, 78, 767, 12, 2, 1];

let unionObj = new UnionCheckSet();
arr1.forEach(e => {
    unionObj.list.push(new UnionNode(e));
});

unionObj.union(66, 34);
unionObj.union(34, 5);
unionObj.union(767,2);
unionObj.union(1, 2);
console.log(unionObj);
console.log('1\'s root = '+unionObj.find(1));
console.log('12\'s root = '+ unionObj.find(12));

let setNum = 0;
for(let i = 0, len = unionObj.list.length; i < len; i++) {
    if(unionObj.list[i].parent < 0) {
        setNum++;
    }
}
console.log('子集合个数 = '+ setNum);