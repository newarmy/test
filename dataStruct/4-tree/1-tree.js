/**
 * 树 层次结构管理
 * 树结构 查找 高效
 * 静态查找
 *
 * 1. 顺序查找（用哨兵） 0（n）
 * 2. 二分查找 （前提：有序存储， 放到数组里）0（logn）  （二分查找判断树）
 *
 * 动态查找
 *
 *
 * */

// 二分查找(在arr中查找k的位置)
function BinarySearch (arr, k) {
   let left, right, mid, NoFound = -1;
   left = 0;
   right = arr.length-1;
   while (left <= right) {
       mid = Math.round((left+right)/2);
       if(k < arr[mid]) {
           right = mid -1;
       } else if( k > arr[mid]) {
           left = mid + 1;
       } else {
           return mid;
       }
   }
   return NoFound;
}

let arr = [1,22,33,55,56,66,67,90];

console.log(BinarySearch(arr, 333));
console.log(BinarySearch(arr, 67));
console.log(BinarySearch(arr, 90));


/**
 * 树的一般结构表示
 *
 * 儿子兄弟表示法
 *
 * */

 function TreeNode(data, firstChild, nextSibling) {
     this.data = data;
     this.firstChild = firstChild || null;
     this.nextSibling = nextSibling || null;
}

/**
 * 顺序存储结构
 * 完全二叉树
 * 非跟节点的父节点 Math.round(i/2);
 * 结点的左孩子为 2i
 * 结点的右孩子为 2i+1
 *
 * */

 function TreeArray () {
     //从位置1开始存储树的结点
     this.list = [undefined];
}
