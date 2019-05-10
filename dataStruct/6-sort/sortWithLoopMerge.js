/**
 * 归并排序（一般用于外排序, 他用到了一个临时数组）
 * 是稳定的
 *
 * 用非递归实现
 *
 * */

function round (N) {
    return Math.floor(N);
}
/**
 * 有序子列的归并(核心算法)
 * arr: 要排序的数组
 * tmpArr: 临时数据
 * leftIndex: 左边起始位置，
 * rightIndex: 右边起始位置，
 * rightEndIndex：右边终点位置
 * */
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
/***
 * arr: 要排序的数组
 * tmpArr: 临时数据
 * N: 要排序的个数，
 * childListLength: 当前有序子列的长度，
 * */
function mergePass(arr, tmpArr, N, childListLength) {
   let i = 0;
    for(; i <= N-2*childListLength; i += 2*childListLength) {
        coreMergeSort(arr, tmpArr, i, i+childListLength, i+2*childListLength-1)
    }
    if(i + childListLength < N) { // 归并最后2个子列
        coreMergeSort(arr, tmpArr, i, i+childListLength, N-1)
    } else {// 最后只剩下1个子列
        for(let j = i; j < N; j++)
            tmpArr[j] = arr[j];
    }
}

function mergeSort(arr, tmpArr) {
    let childListLength = 1;
    let len = arr.length;
    while (childListLength < len) {
        mergePass(arr, tmpArr, len, childListLength);
        childListLength *=2;
        mergePass(arr, tmpArr, len, childListLength);
        childListLength *=2;
    }
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

mergeSort(generateRandomArr(20), new Array(20));