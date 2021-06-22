/*
* 1.穷举算法思想
穷 举 算 法 （ExhaustiveA ttack method)是 最 简 单 的 一 种 算 法 ，其依赖于计算机的强大计算能力来 穷 尽 每 一 种 可 能 的 情 况 ，从 而 达 到 求 解 问 题 的 目 的 。穷 举 算 法 效 率 并 不 高 ，但是适应于一 些没有明 显 规 律 可 循 的 场 合。

基本算法思想
穷举算法的基本思想就是从所有可能的情况中搜索正确的答案，其执行步骤如下：
(1)对于一种可能的情况，计算其结果。
(2) 判断结果是否满足要求，如果不满足则执行第（1 ) 步来搜索下一个可能的情况；如果满足要求，则表示寻找到一个正确的答案。

【注意】在使用穷举算法时，需要明确问题的答案的范围，这样才可以在指定范围内搜索答案。指定范围之后，
就可以使用循环语句和条件判断语句逐步验证候选答案的正确性，从而得到需要的正确答案。

经典例子
《孙子算经》【鸡兔同笼问题】
今有鸡兔同笼，上有三十五头，下有九十四足，问鸡兔各几何？
（在一个笼子里关着若干只鸡和若干只兔，从上面数共有35个头；从下面数共有94只脚。问笼中鸡和兔的数量各是多少？）

2 x + 4 y = 94;
x + y = 35;
最多23个兔子
最多45只鸡
* */

let chickenNum = 0;
let rabbitNum = 0;
function chickenRabbit( head, foot){
    let i,j;
    let  tag = 0;//标志是否有解
    for(i=0; i <= head; i++){//鸡的个数穷举
        j= head - i;//兔子的个数
        if(i*2+j*4 == foot){//判断是否满足条件
            tag=1;
            chickenNum =i;
            rabbitNum =j;
            console.log(i, j);
        }
    }
    return tag;
}
if(chickenRabbit(35,94) === 1){//如果有解输出
    console.log("chickens=%d,rabbits=%d\n", chickenNum, rabbitNum);
}else{//如果无解
    console.log("无解\n");
}