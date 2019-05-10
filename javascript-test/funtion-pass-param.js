// 值传递 不管是基本类型还是引用类型

var num = 10;

function addNum(num) {
    num++;
    console.log('in function : ', num);
}
addNum(num);
console.log('in global : ', num);

var person = new Object();
person.age = 12;

function changePerson (obj) {
    obj.name = 'xin - xin';
    obj = new Object();
    obj.name = 's - xin - xin';
    console.log('in function : ');
    console.dir(obj);
}
changePerson(person);
console.log('in global : ');
console.dir(person);