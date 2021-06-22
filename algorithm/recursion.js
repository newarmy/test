/**
 * 3.递归算法思想
 递归算法是非常常用的算法思想。使用递归算法，往往可以简化代码编写，提高程序的可读性。但是，不合适的递归会导致程序的执行效率变低。

 基本算法思想
 递归算法就是在程序中不断反复调用自身来达到求解问题的方法。这里的重点是调用自身，这就要求待求解的问题能够分解为相同问题的一个子问题。这样 ，通过多次递归调用，便可以完成求解。
 递归调用是一个函数在它的函数体内调用它自身的函数调用方式，这种函数也称为“递归函数”。在递归函数中，主调函数又是被调函数。执行递归函数将反复调用其自身，每调用一次就进入新的一层。
 函数的递归调用分两种情况：直接递归和间接递归。
 • 直接递归：即在函数中调用函数本身。
 • 间接递归：即间接地调用一个函数，如出如func_a调 用 func_b, func_b 又调用func_a。间接递归用得不多。

 【注意】编写递归函数时，必须使用if语句强制函数在未执行递归调用前返回。否则，在调用函数后，它永远不会返回，这是一个很容易犯的错误。

 经典例子
 【阶乘】

 n!=n*(n-1)*(n-2)*……*2*1
 *
 * */
function fact(n){
    if(n<=1) return 1;
    else
        return n*fact(n-1);
}

    let n=11;
    console.log("%d的阶乘是%d\n",n,fact(n));
