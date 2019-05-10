/**
 * 归并排序（一般用于外排序, 他用到了一个临时数组）
 * 是稳定的
 *
 * 用递归实现
 *
 * */

/**
 * 有序子列的归并(核心算法)
 * arr: 要排序的数组
 * tmpArr: 临时数据
 * leftIndex: 左边起始位置，
 * rightIndex: 右边起始位置，
 * rightEndIndex：右边终点位置
 * */
function round (N) {
    return Math.floor(N);
}
function coreMergeSort(arr, tmpArr, leftIndex, rightIndex, rightEndIndex) {
     let leftEndIndex = rightIndex -1; // 左边终点位置，左右两列挨着
     let tmpIndex = leftIndex; // 存放结果数组的初始位置
     let itemNum = rightEndIndex - leftIndex + 1; // 要处理的元素个数

    while(leftIndex <= leftEndIndex && rightIndex <= rightEndIndex) {
        if(arr[leftIndex] <= arr[rightIndex]) {
            tmpArr[tmpIndex++] = arr[leftIndex++]
        } else {
            tmpArr[tmpIndex++] = arr[rightIndex++]
        }
    }
    while (leftIndex <= leftEndIndex) {// 左边剩下的
        tmpArr[tmpIndex++] = arr[leftIndex++]
    }
    while (rightIndex <= rightEndIndex) {// 右边剩下的
        tmpArr[tmpIndex++] = arr[rightIndex++]
    }
    // 吧结果放到arr中
    for (let i = 0; i < itemNum; i++, rightEndIndex--) {
        arr[rightEndIndex] = tmpArr[rightEndIndex];
    }
}
// 分而治之
// arr: 要处理的， tmpArr 临时数组, leftIndex 左边起始位置, rightEndIndex：右边终点位置
function sort(arr, tmpArr, leftIndex, rightEndIndex) {
    let centerIndex = round((leftIndex+rightEndIndex)/2);
    console.log(leftIndex , rightEndIndex);
    if(leftIndex < rightEndIndex) {
        sort(arr, tmpArr, leftIndex, centerIndex);
        sort(arr, tmpArr, centerIndex+1, rightEndIndex);
        coreMergeSort(arr, tmpArr, leftIndex, centerIndex+1, rightEndIndex);
    }
}
// 递归归并算法
// arr: 要处理的， tmpArr 临时数组
function mergeSortByRecursion (arr, tmpArr) {
    let leftIndex = 0;
    let rightEndIndex = arr.length-1;
    sort(arr, tmpArr, leftIndex, rightEndIndex);
    console.log(arr);
}

// 测试
function generateRandomArr (num) {
    let arr = [];
    for(let i = 1; i <= num; i++) {
        arr.push(Math.round(num*Math.random()));
    }
    return arr;
}

mergeSortByRecursion(generateRandomArr(20), new Array(20));