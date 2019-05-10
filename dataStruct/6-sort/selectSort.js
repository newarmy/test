/**
 * 选择排序
 *
 * */

function selectionSort (arr) {
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

let arr = generateRandomArr(20);

console.log(selectionSort(arr));