/**
 * 散列表
 *
 * hash函数key取模
 * 解决冲突：平方探测法 +1的平方， 减1的平方 +2的平方 -2的平方 。。。
 * */
class HashTable {
    constructor (tableSize) {
        this.tableSize = tableSize;
        this.table = new Array(tableSize);
        this.initializeTable();
    }
    hash(key) {
        return key%this.tableSize;
    }
    initializeTable() {
      for( let i = 0; i < this.tableSize; i++) {
          this.table[i] = {
                              data: null, // 数据域
                              flag: 0 // 0表示空，， 1表示填充，2表示删除
                          };
      }
    }
    // find key's position in table
    find(key) {
        let currentPos, newPos;
        let cNum = 0; //记录冲突次数
        newPos = currentPos = this.hash(key);

        // 解决冲突
        while(this.table[newPos].flag !== 0 && this.table[newPos].data !== key) {
            if(++cNum % 2) { //判断冲突的奇偶次
                newPos = currentPos + Math.round((cNum+1)/2*(cNum+1)/2);
                while(newPos > this.tableSize) {
                    newPos -= this.tableSize;
                }
            } else {
                newPos = currentPos - Math.round(cNum/2*cNum/2);
                while(newPos < 0) {
                    newPos += this.tableSize;
                }
            }
        }
        return newPos;
    }

    insert(key) {
        let pos = this.find(key);
        if(this.table[pos].flag !== 1) {
            this.table[pos].data = key;
            this.table[pos].flag = 1;
        }
    }
    delete (key) {
        let pos = this.find(key);
        if(this.table[pos].flag === 1) {
            this.table[pos].flag = 2;
        }
    }

}

// test
let arr = [47,7,29,11,9,84,54,20,30];

let hashTable = new HashTable(11);
arr.forEach(e => {
    hashTable.insert(e);
});
console.log(hashTable);
console.log(hashTable.find(30));
