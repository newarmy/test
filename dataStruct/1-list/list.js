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
        this.next = 0; // 当前容量（0 表示 1， 。。。）
        this.maxSize = 10;
    }
    // 根据index 找 element
    findItem (pos) {
        if(pos < 0 && pos >= this.list.length) {
            console.log('不合法');
            return;
        }
        return this.list[pos];
    }
    // 根据 element 找 index
    findIndex (item) {
        let i = 0;
        while (i < this.next && ( this.list[i] && (this.list[i].value !== item.value) )) {
            i++;
        }
        if(i > this.next) return -1;
        return i;
    }
    insertItem(item) {
        this.insert(item, this.next);
    }
    // 先移动， 再插入
    insert (item, pos) {
        let j;
        if(this.next === this.maxSize) {
            console.log('满表');
            return;
        }
        if(pos < 0 || pos > this.next) {
            console.log('不合法');
            return;
        }
        for(j = this.next; j >= pos; j--){
            this.list[j+1] = this.list[j];

        }

        this.list[pos] = item;
        this.next++;
      //  console.log(this.next);
    }
    // 后面的元素依次前移
    remove (pos) {

        if(pos < 0 || pos >= this.next) {
            return null;
        }

        let item = this.list[pos];

        for (let j = pos; j < this.next; j++) {
            this.list[j] = this.list[j+1];
        }
        this.next--;
        return item;
    }
}

let kongList = new ArrayList();
//insert
kongList.insertItem({value: 23});
kongList.insertItem({value: 223});
kongList.insertItem({value: 233});
kongList.insertItem({value: 243});
kongList.insertItem({value: 43000});
kongList.insertItem({value: 43000});
kongList.insertItem({value: 43000});
kongList.insertItem({value: 43000});
kongList.insertItem({value: 43000});
kongList.insertItem({value: 43008});
console.log(kongList);
// find
console.log(kongList.findIndex({value:233}), kongList.next);
// remove
console.log(kongList.remove(2));

kongList.insert({value: 30000}, 1);
console.log(kongList);