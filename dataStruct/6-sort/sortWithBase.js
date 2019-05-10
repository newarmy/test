/**
 * 桶排序
 *
 *
 *假设我们有 N 个学生，他们的成绩是0到10之间
 的整数（于是有 M = 11 个不同的成绩值）。如
 何在线性时间内将学生按成绩排序？
 * */

function bucketSort (arr) {
    let len = arr.length;
    //初始化11桶
    let buckets = [];
    for(let i = 0; i <= 10; i++) {
        buckets.push([]);
    }
    let x = 0;
    // 放到桶里
    while(x < len) {
        buckets[arr[x]].push(arr[x]);
        x++;
    }
    //输出排好的
    arr = [];
    for (let j = 0; j <= 10; j++) {
        let barr = buckets[j];
        for(let y = 0, len1 = barr.length; y < len1; y++) {
            arr.push(barr[y]);
        }
    }
    return arr;
}

// 测试
function generateRandomArr (num) {
    let arr = [];
    for(let i = 1; i <= num; i++) {
        arr.push(Math.round(10*Math.random()));
    }
    return arr;
}
bucketSort(generateRandomArr(30));


/**
 * 基数排序
 * 假设我们有 N = 10 个整数，每个整数的值在0到
 999之间（于是有 M = 1000 个不同的值）。还有
 可能在线性时间内排序吗？

 输入序列: 64, 8, 216, 512, 27, 729, 0, 1, 343, 125
 用“次位优先”（Least Significant Digit）
 T = O(P(N+B)) P表示pass， B表示进制，N 表示多少个数。
 * */
let testArr = [64, 8, 216, 512, 27, 729, 0, 1, 343, 125];
function baseSort (arr) {
    let len = arr.length;

    //获取数组中的最大数
    let maxNum = 729;
    //获取最大数的位数，次数也是再分配的次数。
    let loopTimes = getLoopTimes(maxNum);
    let i;
    //对每一位进行桶分配
    console.log(loopTimes);
    for(i = 1; i <= loopTimes; i++)
    {
       arr = sort2(arr, len, i);
    }
   return arr;
}

//获取数字的位数
function getLoopTimes(num)
{
    let count = 1;
    let temp = Math.floor(num / 10);

    while(temp > 0)
    {
        count++;
        console.log(temp);
        temp = Math.floor(temp / 10);
    }
    return count;
}

//将数字分配到各自的桶中，然后按照桶的顺序输出排序结果
/**
 * arr:要排序的arr
 * length: arr的长度
 * loop: 1, 2, 3 (个位，十位，百位)
 * */
function sort2(arr, length, loop)
{

    //初始化10桶
    let buckets = [];
    for(let i = 0; i < 10; i++) {
        buckets.push([]);
    }
    //求桶的index的除数
    //如798个位桶index=(798/1)%10=8
    //十位桶index=(798/10)%10=9
    //百位桶index=(798/100)%10=7
    //tempNum为上式中的1、10、100
    let tempNum = Math.pow(10, loop - 1);
    let i;
    for(i = 0; i < length; i++) {
        let row_index = Math.floor(arr[i]/tempNum) % 10;
        //console.log(row_index);
        buckets[row_index].push(arr[i]);
    }
    //将桶中的数，倒回到原有数组中
    //输出排好的
    arr = [];
    for (let j = 0; j < 10; j++) {
        let barr = buckets[j];
        for(let y = 0, len1 = barr.length; y < len1; y++) {
            arr.push(barr[y]);
        }
    }
    return arr;
}
console.log(baseSort(testArr));
console.log(testArr);