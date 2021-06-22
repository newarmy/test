//把数组中重复的数字打印出来
function printRepetitionNumber(arr) {
   let obj = {};
   for(let i = arr.length; i >=0; i--) {
       if(!obj['flag_'+arr[i]]) {
        obj['flag_'+arr[i]] = true;
       }  else {
           console.log(arr[i]);
       }
   }
}

printRepetitionNumber([23,33,22,222,333,22,33]);

// 去重

function removeDuplicate(arr) {
   let set = new Set();
   for(let i = 0, len = arr.length; i < len; i++) {
       set.add(arr[i]);
   }
   return Array.from(set);
}

let arr1 = removeDuplicate([23,33,22,222,333,22,33]);
console.log(arr1);