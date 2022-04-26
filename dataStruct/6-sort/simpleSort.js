/**
 * 简单排序：每次只消除一个逆序对， 相邻的两个数比较
 * 1. 冒泡排序
 * 2. 插入排序
 *
 * 稳定性：任意两个相等的数据，排序前后的相对位置不发生改变
 *
 * 讨论内部排序
 *
 *
 * 逆序对： 对于下标i<j，如果A[i] > A[j], 则（i,j）是一对逆序对
 *
 *
 * 要提高算法效率，我们必须：
 * 1.1 每次消去不止1个逆序对
 * 1.2 每次交换相隔较远的2个元素
 *
 * */



/**
 * 冒泡排序
 * 从小到大排序
 * 每次只消除一个逆序对
 * 相邻的两个数比较
 * 每次找到 没有排序的最大值
 *
 * 最好：顺序 T =O(N);
 * 最坏： 逆序 T = O(N*N)
 * */
let testArr = [35, 8, 64, 51, 32, 21];
function bubbleSort(arr) {
    let len = arr.length;
    for(let p = len -1; p > 0; p--) {
        let isSorted = 0; //是否排序好了
        for (let i = 0; i < p; i++) { // 一趟冒泡
            if (arr[i] > arr[i + 1]) {
                let tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
                isSorted = 1; // 执行到这里， 发生了交换，表示没有排好，
            }
        }
        if(isSorted === 0) { //isSorted 为true，全程无交换，表示排好了
            break;
        }

    }
    return arr;
}
/**
 * 冒泡排序
 * 从大到小排序
 * 每次只消除一个逆序对
 * 相邻的两个数比较
 * 每次找到 没有排序的最大值
 *
 * 最好：顺序 T =O(N);
 * 最坏： 逆序 T = O(N*N)
 * */
function from_big_to_small_bubble_Sort(arr) {
    let len = arr.length;
    for(let p = len -1; p > 0; p--) {
        let isSorted = 0; //是否排序好了
        for (let i = 0; i < p; i++) { // 一趟冒泡
            if (arr[i] < arr[i + 1]) {
                let tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
                isSorted = 1; // 执行到这里， 发生了交换，表示没有排好，
            }
        }
        if(isSorted === 0) { //isSorted 为true，全程无交换，表示排好了
            break;
        }

    }
    return arr;
}
console.log(from_big_to_small_bubble_Sort(testArr));



/**
 * 插入排序
 * 从小到大排序
 * 每次只消除一个逆序对
 * 相邻的两个数比较
 *
 * 用新数组存放排序结果
 * 最好：顺序 T =O(N);
 * 最坏： 逆序 T = O(N*N)
 * */
let testArr1 = [35, 8, 64, 51, 32, 21];
function insertSort (arr) {
  let len = arr.length;
  let res = new Array(len);// 用新数组存放排序结果
  for (let i = 0; i < len; i++) {
      let tmp = arr[i]; // 新插入的

      if(i === 0) { // 插入第一个，不用比较
          res[0] = tmp;
      } else {
          let j = i;
          // j-1 是已经在res数组中的最后一个数的索引。
          for (; j > 0 && res[j-1] > tmp; j--) {
              res[j] = res[j-1]; // 移除空位
          }
          res[j] = tmp; //插入
      }

  }
  return res;
}
// console.log(insertSort(testArr1));

/**
 * 在原数组上排序
 * */
function insertSortWithSourceArray (arr) {
   let len = arr.length;
   for(let i = 1; i < len; i++) {
       let tmp = arr[i]; //新来的要排序的
       let j = i;
       for (; j > 0 && arr[j-1] > tmp; j--) { // arr[j-1] 是在上一次的排序结果的最后一个数
           arr[j] = arr[j-1];
       }
       arr[j] = tmp;
   }
   return arr;
}
console.log(insertSortWithSourceArray(testArr1));