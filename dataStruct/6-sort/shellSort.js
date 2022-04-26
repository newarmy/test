/**
 * 希尔排序
 * 是在插入序列基础上改进
 *
 * 定义增量序列 DK>DK-1>...>D1>1;
 * 对每个DK进行DK间隔的插入排序(K= M,M-1,...1)
 *
 * 原始的希尔增量序列为
 * DM = N/2, DK = DK+1/2;
 * 
 * https://baijiahao.baidu.com/s?id=1631531130010150845&wfr=spider&for=pc
 * */
function round (N) {
    return Math.floor(N/2);
}
let num = 0;
function shellSort (arr) {
    let len = arr.length;
    for (let D = round(len); D > 0; D = round(D)) {// 增量序列
        console.log(++num, D);
        for(let i = D; i < len; i++) {// 插入排序
            let tmp = arr[i];
            let j = i;
            for(; j > 0 && arr[j-D] > tmp; j-=D) {
                arr[j] = arr[j-D];
            }
            arr[j] = tmp;
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

let arr1 = generateRandomArr(20);

console.log(shellSort(arr1));