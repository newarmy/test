// 快速排序


function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
/***
 *选主元
 * 取头，中，尾的中位值
 * 8 12 3 的中位值是8
 * */
function median3(arr, leftIndex, rightIndex) {

    let centerIndex = Math.floor((leftIndex+rightIndex)/2);
    console.log(leftIndex, centerIndex, rightIndex);
    if(arr[leftIndex] > arr[centerIndex]) {
        swap(arr, leftIndex, centerIndex);
    }
    if(arr[leftIndex] > arr[rightIndex]) {
        swap(arr, leftIndex, rightIndex);
    }
    if(arr[centerIndex] > arr[rightIndex]) {
        swap(arr, centerIndex, rightIndex)
    }
    // arr[leftIndex] < arr[centerIndex] < arr[rightIndex]
    swap(arr, centerIndex, rightIndex-1) // 将pivot藏在右边
    // 只需要考虑arr[leftIndex+1] arr[rightIndex-2]
    return arr[rightIndex-1]
}
function insertionSort (arr) {
    let len = arr.length;
    for(let i = 1; i < len; i++) {
        let tmp = arr[i];
        let j = i;
        for (; j > 0 && arr[j-1] > tmp; j--) { // arr[j-1] 是在上一次的排序结果的最后一个数
            arr[j] = arr[j-1];
        }
        arr[j] = tmp;
    }
}

// left的初始值为 0 ； right的初始值为arr.length-1;  left 和right表示arr中的索引
function quickSort(arr, left, right) {
    if(left >= right) {
        insertionSort(arr);
        return;
    }
    let pivot = median3(arr, left, right);
    console.log(pivot);
    let i = left;
    let j = right -1;
    for(; ; ) {
        while(arr[++i] < pivot) {}
        while(arr[--j] > pivot) {}
        if(i < j) {
            swap(arr, i, j);
        } else {
            break;
        }
    }
    swap(arr, i, right-1);
    quickSort(arr, left, i-1);
    quickSort(arr, i+1, right);
}

function enterQuickSort(arr) {
    quickSort(arr, 0, arr.length -1);
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

enterQuickSort([1111, 35, 8, 64, 51, 33, 2, 344, 23, 24, 211, 3, 11, 4, 332,21, 32, 21]);