
/**
 * 堆排序
 * */
function round (num) {
    return Math.round(num);
}
// arr数组的前len个数据调整成最大堆
function createMaxHeap (arr, len) {

    let changeOrderIndex = round(len/2);
    while(changeOrderIndex >= 0) {
        let parent;
        let child;
        for(parent = changeOrderIndex; parent*2+1 < len; parent = child) {
            let tempItem = arr[parent];
            child = parent*2+1; //左孩子
            if ((child !== len-1) && (arr[child] < arr[child+1])) { //有右孩子， 且左孩子小于右孩子
                child++;
            }
            if(tempItem >= arr[child]) { //找到了temp插入的位置
                break;
            } else {
                // 父子元素互换
                arr[parent] = arr[child];
                arr[child] = tempItem;
            }

        }
        changeOrderIndex--;
    }
}

function heapSort (arr) {
    let len = arr.length;
    createMaxHeap(arr, len);
    for(let i = len -1; i > 0; i--) {
        let tmp = arr[0];
        arr[0] = arr[i];
        arr[i] = tmp;
        createMaxHeap(arr, i);
    }
    return arr;
}


// 测试
function generateRandomArr (num) {
    let arr = [];
    for(let i = 1; i <= num; i++) {
        arr.push(Math.round(num*Math.random()));
    }
    return arr;
}

let arr1 = generateRandomArr(20000);
localStorage.setItem('arr', JSON.stringify(arr1));
console.log(heapSort(arr1));