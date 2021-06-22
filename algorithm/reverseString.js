//反正字符串算法
function reverseStr(str) {
    let len = str.length;
    let arr = new Array(len);
    console.log(len);
    for(let i = 0; i < len/2; i++) {
        arr[i] = str[len-i-1];
        arr[len-i-1] = str[i];
    }
    return arr.join('');
}

console.log(reverseStr('abcde'));