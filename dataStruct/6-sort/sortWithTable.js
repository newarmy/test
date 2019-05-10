/**
 * 表排序
 * 针对大文件的排序
 *
 * 间接排序
 * 定义一个指针数组作为“表”（table）
 * 新建一个array（表）存放原数组的索引
 * */
 let sourceArr = ['f', 'd', 'c', 'a', 'g', 'b', 'h', 'e'];

function tableSort (arr) {
    let len = arr.length;
    let table = new Array(len);

    for(let i = 0; i < len; i++) {

        if(i === 0) {
            table[0] = i;
        } else {
            let j = i;
            let insertItem = arr[i];
            for(; j > 0 && insertItem < arr[table[j-1]]; j--) {
                table[j] = table[j-1];
            }
            table[j] = i;
        }

    }
    console.log(table);
    return table;
}


let keyArr = tableSort(sourceArr);

keyArr.forEach(e => {
    console.log(sourceArr[e]);
})

/**
 * 物理排序
 * N个数字的排列由若干个独立的环组成
 *
 *
 * 最好情况：初始即有序
  最坏情况：
  有 N / 2个环，每个环包含2个元素
  需要 3N / 2 次元素移动
 T = O( m N ) ，m 是每个A元素的复制时间。
 * */

function sortBigFile(sourceArr, table) {
    let len = table.length;
    for (let i = 0; i < len; i++) {
        let tmp = sourceArr[i];
        let j = i;
        let startCircleIndex = j;
        console.log('---------------------------');
        if(typeof table[j] === 'number') {
            while(table[j] !== startCircleIndex) { // 环
                console.log(j, table[j]);
                sourceArr[j] = sourceArr[table[j]];
                let nextIndex = table[j];
                table[j] = false;
                j = nextIndex;
            }
            table[j] = false;
            sourceArr[j] = tmp;

        }

    }
    console.log(sourceArr);
    console.log(table);
}

sortBigFile(sourceArr, keyArr);