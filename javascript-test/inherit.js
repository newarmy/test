// js 继承，寄生组合式继承
function objectFunc(obj) {
    function F() {}
    F.prototype = obj;
    return F;
}

function inheritPrototype(subType,superType){
    var prototype = objectFunc(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;

}
function SuperType(name){
    this.fname = name;
    this.color = ['red','blue','green'];
}
SuperType.prototype.sayName = function(){
    alert(this.fname);
}
function SubType(name, age){
    SuperType.call(this, name); // 只在这调用了一次超类型的构造函数
    this.age = age;
}

inheritPrototype(SubType , SuperType);

SubType.prototype.sayAge = function(){
    console.log(this.age);
}

var instance = new SubType('nicholas' , 29);

console.log('-----------------------------------------------------');

console.dir(instance);