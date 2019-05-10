
function time() {
    return Date.now();
}

class Record {
    constructor () {
        this.startTime = 0;
        this.endTime = 0;
    }
    start () {
        this.startTime = Date.now();
    }
    end(sort) {
        this.endTime = Date.now();
        console.log(sort+'的持续时间 = '+ (this.endTime - this.startTime));
    }
}

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
function bubbleSort(arr) {
    let record = new Record();
    record.start();
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
    record.end('冒泡排序')
    return arr;
}
/**
 * 插入排序
 * 在原数组上排序，
 * */
function insertSort (arr) {
    let record = new Record();
    record.start();
    let len = arr.length;
    for(let i = 1; i < len; i++) {
        let tmp = arr[i];
        let j = i;
        for (; j > 0 && arr[j-1] > tmp; j--) { // arr[j-1] 是在上一次的排序结果的最后一个数
            arr[j] = arr[j-1];
        }
        arr[j] = tmp;
    }
    record.end('插入排序')
    return arr;
}

/**
 * 希尔排序
 * 是在插入序列基础上改进
 *
 * 定义增量序列 DK>DK-1>...>D1>1;
 * 对每个DK进行DK间隔的插入排序(K= M,M-1,...1)
 *
 * 原始的希尔增量序列为
 * DM = N/2, DK = DK+1/2;
 * */
function round (N) {
    return Math.floor(N/2);
}
function shell(i) {
   // console.log(i);
    let num =  Math.round( Math.pow(4,i)-3*(Math.pow(2,i)) +1 );
    //let num = Math.round(Math.pow(2, i) -1);
   // console.log('shell = '+num);
    return num;
}
// 定义增量序列
function getShellList() {
    let arr = [];
    for(let i = 0; shell(i) < 20000; i++) {
        let r = shell(i);
        if(r < 0)
            r = 1;
        arr.push(r);
    }
   // console.log(arr);
    return arr;
}
function shellSort (arr) {
    let list = getShellList();
    list = list.reverse();
    list = list.slice(0, list.length-1);
    console.log(list);
    let record = new Record();
    record.start();
    let len = arr.length;
    for (let D = list.length -1; D > 0; D--) {// 增量序列
       // console.log('D = '+D);
        let interval = list[D];
        for(let i = interval; i < len; i++) {// 插入排序
            let tmp = arr[i];
            let j = i;
            for(; j >= 0 && arr[j-interval] > tmp; j-=interval) {
                arr[j] = arr[j-interval];
            }
            arr[j] = tmp;
        }
    }
    record.end('希尔排序')
    return arr;
}

/**
 * 选择排序
 *
 * */

function selectionSort (arr) {
    let record = new Record();
    record.start();
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let minDataIndex = i;
        // 从 arr[i] 到arr[len-1]中找最小元，并将其位置赋值给minDataIndex
        let minData = -1;
        for (let j = i; j < len; j++) {
            if (minData !== -1 && minData > arr[j]) {
                minData = arr[j];
                minDataIndex = j;
            } else if(minData === -1) {
                minData = arr[j];
                minDataIndex = j;
            }
        }
        // 将未排序部分的最小元换到有序部分的最后位置
        if(arr[i] > arr[minDataIndex]) {
            let tmp = arr[i];
            arr[i] = arr[minDataIndex];
            arr[minDataIndex] = tmp;
        }

    }
    record.end('选择排序')
    return arr;
}

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
    let record = new Record();
    record.start();
    let len = arr.length;
    createMaxHeap(arr, len);
    for(let i = len -1; i > 0; i--) {
        let tmp = arr[0];
        arr[0] = arr[i];
        arr[i] = tmp;
        createMaxHeap(arr, i);
    }
    record.end('堆排序')
    return arr;
}
// -------------------测试--------------------------
function read() {
    let arr = localStorage.getItem('arr');
    if(!arr) {
        arr = generateRandomArr(20000);
        localStorage.setItem('arr', JSON.stringify(arr));
        return arr;
    } else {
        return JSON.parse(arr);
    }

}

function generateRandomArr (num) {
    let arr = [];
    for(let i = 1; i <= num; i++) {
        arr.push(Math.round(num*Math.random()));
    }
    return arr;
}


//测试
function testEnter() {

   console.log(selectionSort(read())) ;
    console.log(bubbleSort(read())) ;
   console.log(shellSort(read())) ;
    console.log(heapSort(read())) ;
   console.log(insertSort(read()));

}
testEnter();
