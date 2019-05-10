// 线性表  顺序存储  链式存储
/*
*   makeEmpty
*   fundIndex
*   findElement
*   insert
*   delete
*   Length
*
*   element struct
*
*   let obj = {
*       data: [],
*       last:0
*   }
* */

// 顺序存储 array

class ArrayList {
    constructor () {
        this.list = [];
        this.next = -1;
        this.maxSize = 10;
    }
    // 根据index 找 element
    findItem (pos) {
        if(pos < 0 && pos > this.list.length) {
            console.log('不合法');
            return;
        }
        return this.list[pos];
    }
    // 根据 element 找 index
    findIndex (item) {
        let i = 0;
        while (i < this.next && this.list[i].value !== item.value ) {
            i++;
        }
        if(i > this.next) return -1;
        return i;
    }
    // 先移动， 再插入
    insert (i, item) {
        let j;
        if(this.last === this.maxSize-1) {
            console.log('满表');
            return;
        }
        if(i < 1 || i>this.next+2) {
            console.log('不合法');
            return;
        }
        for(j = this.next; j >=i-1; j--){
            this.list[j+1] = this.list[j];

        }

        this.list[i-1] = item;
        this.next++;
        return;
    }
    // 后面的元素依次前移
    remove (i) {
        if(i<1 || i>this.next) {
            return null;
        }
        let item = this.list[i-1];
        for (let j = i-1; j < this.next; j++) {
            this.list[j] = this.list[j+1];
        }
        this.next--;
        this.list.length = this.next+1;
        return item;
    }
}

let kongList = new ArrayList();
//insert
kongList.insert(1, {value: 23});
kongList.insert(1, {value: 223});
kongList.insert(1, {value: 233});
kongList.insert(1, {value: 243});
console.log(kongList);
// find
console.log(kongList.findIndex({value:23}));
// remove
console.log(kongList.remove(2));
console.log(kongList);