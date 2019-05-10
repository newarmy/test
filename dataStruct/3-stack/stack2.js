// 堆栈
// 单向链表 和 数组

/*
* 堆栈的应用：
* 1. 函数调用及递归
* 2. 深度优先搜索
* 3. 回溯算法
* */

export default class Stack {
    constructor () {
        this.list = [];
        this.top = 0;
        this.maxSize = 10;
    }
    push(element) {
        if(this.top > this.maxSize) {
            return;
        }
        this.list[this.top] = element;
        this.top++;
    }
    pop () {
        if(this.top === 0) {
            return null;
        }
        let element = this.list[this.top-1];

        this.top--;
        this.list.length = this.top;
        return element;
    }
    isEmpty() {
        return this.top === 0 ? true : false;
    }
}


//算数操作符优先级
var opt = {
    '-': 1,
    '+': 1,
    '*': 2,
    "/": 2,
   // '(': 3,
   // ')': 4
};

// 中缀表达式转后缀表达式
function middleToBack(tempArr) {
    let result = [];

    let stack = new Stack(); // 存算数操作符的辅助栈
    let preOp; //栈顶操作符

//
    tempArr.forEach((e, index, arr) => {
        if(typeof e === 'number'){
            result.push(e);
        } else if(e !== '(' && e !== ')') {
            preOp = stack.pop();
            if(preOp) {
                if(opt[preOp] >= opt[e]) {
                    result.push(preOp);
                    let top = stack.pop();
                    while(top && opt[top] >= opt[e]) {
                        result.push(top);
                        top = stack.pop();
                    }
                    if(top) {
                        stack.push(top);
                    }
                    stack.push(e);
                } else {
                    stack.push(preOp);
                    stack.push(e);
                }
            } else {
                stack.push(e);
            }
        } else if(e === '(') {
            stack.push(e);
        } else if(e === ')') {
            preOp = stack.pop();
            while(preOp && preOp !== '(') {
                result.push(preOp);
                preOp = stack.pop();
            }
        }


    });

    // 把操作符栈中的操作符全部push到result中
    preOp = stack.pop();
    while (preOp) {
        result.push(preOp);
        preOp = stack.pop();
    }

    result = result.reverse();
    return result;
}


//--------------后缀入栈（辅助计算）---------------------------
// 后缀入栈数组顺序从0开始   
function pushToBackStack (result) {
    // 后缀表达式栈
    let backStack = new Stack();
    result.forEach(e => {
        backStack.push(e)
    });
    return backStack;
}


//-----------计算函数--------------
function opFunc(bS) {
    // 操作数栈
    let NumStack = new Stack();
    let op = bS.pop();
    let firstNum, secondNum;
    while (op) {
        if(typeof op === 'number') {
            NumStack.push(op);
        } else {
            switch (op) {
                case '-':
                    secondNum = NumStack.pop();
                    firstNum = NumStack.pop();
                    NumStack.push(firstNum-secondNum);

                    break;
                case '+':
                    secondNum = NumStack.pop();
                    firstNum= NumStack.pop();
                    NumStack.push(firstNum+secondNum);
                    break;
                case '*':
                    secondNum = NumStack.pop();
                    firstNum = NumStack.pop();
                    NumStack.push(firstNum*secondNum);
                    break;
                case '/':
                    secondNum = NumStack.pop();
                    firstNum = NumStack.pop();
                    NumStack.push(firstNum/secondNum);
                    break;
            }
        }
        op = bS.pop();
    }

    return NumStack.pop();
}

//-------计算-----------
function calculation(mathArr) {
    let result = middleToBack(mathArr);
    //console.log(result);
    let backStack = pushToBackStack(result);
    let res = opFunc(backStack);
    return res;
}

console.log('-----------------------------------------------')
// 中缀运算数组
let mathArr1 = [10, '-', 4, '*', 2, '+',5];
//console.log(calculation(mathArr1));
console.log('-----------------------------------------------')

let mathArr = ['(', 10, '-', 4, ')','*', 2, '+', 5, '*', 8];

console.log(calculation(mathArr));

let mathArr2 = ['(', 10, '-', 4, ')','*','(' , 2, '+', 5, ')' , '*', 8];

console.log(calculation(mathArr2));