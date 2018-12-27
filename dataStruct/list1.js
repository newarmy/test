// 线性表(链式存储)
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


// 链式存储
/**
 * position: 0     1  2  3
 * element   head  f  s  t
 *
 * */

// 链式节点结构类
class Item {
    constructor (data, nextItem, preItem) {
        this.data = data;
        this.next = nextItem || null;
        this.pre = preItem || null;
    }
}

class List {
   constructor () {
       this.head = {
           data: null,
           next: null,
           pre: null,
       };
       this.len = 0;
       this.max = 10;
   }
   length () {
       return this.len;
   }
    insert (value, position) {
        if(position < 1 || position > this.max) {
            return 'no';
        }
        let node = new Item(value, null, null);
        let item = this.findIndex(position);

        if(item) {

            let preItem = item.pre;
            preItem.next = node;
            node.pre = preItem;
            node.next = item;
            item.pre = node;

            this.len++;
            return 'yes'
        } else {
            if(!this.head.next) {
                this.head.next = node;
                node.pre = this.head;
                this.len++;
            }
        }
        return 'no';
    }
   findElement(value) {
       let item =  this.head;
       while(item && item.data !== value) {
           item = item.next;
       }
       if(item.data !== null ) {
           return item;
       } else {
           return null;
       }
   }
   findIndex(position) {
       let i = 0;
       if(position < 1 || position > this.len) {
           return null;
       }
       let item = this.head;
       while (item && i < position) {
        item = item.next;
        i++;
       }
       if (position === i) return item;
       return null;
   }

   delete(i) {
       if(i < 1 || i > this.len) {
           return 'error';
       }
       let item = this.findIndex(i);
       let preItem = item.pre;
       let nextItem = item.next;
       if (nextItem) {
           preItem.next = nextItem;
           nextItem.pre = preItem;
       } else {
           preItem.next = null;
       }
       this.len--;
       return item;
   }
}

let listObj = new List();
listObj.insert(10, 1);
listObj.insert(20, 1);
listObj.insert(30, 2);
listObj.insert(300, 1);
console.dir(listObj);
console.dir(listObj.findIndex(2));
console.dir(listObj.delete(1));
console.dir(listObj);