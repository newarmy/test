/*
*
* 分治算法是一种化繁为简的算法思想。分治算法往往应用于计算步骤比较复杂的问题，通过将问题简化而逐步得到结果。

基本算法思想
分治算法的基本思想是将一个计算复杂的问题分为规模较小，计算简单的小问题求解，然后综合各个小问题，得到最终问题的答案。分治算法的执行过程如下：
(1)对于一个规模为N 的问题，若该问题可以容易地解决（比如说规模>^较小），则直接解决,否则执行下面的步骤。
(2)将该问题分解为” 个规模较小的子问题，这些子问题互相独立，并且原问题形式相同。
(3)递归地解子问题。
(4)然后，将各子问题的解合并得到原问题的解。

【注意】使用分治算法需要待求解问题能够化简为若干个小规模的相同问题，通过逐步划分，达到一个易于求解的阶段而直接进行求解。然后，程序中可以使用递归算法来进行求解。

经典例子
【寻找假币问题】
一个袋子里有30个硬币，其中一枚是假币，并且假币和真币一模- 样，肉眼很难分辨，目前只知道假币比真币重量轻一点。请问如何区分出假币？
* */
//low = 0;
//hight = length -1;
function falseCoin( coin, low, high){
    let i,sum1,sum2,sum3;
    let re;
    sum1=sum2=sum3=0;
//若只有两个硬币
    if(low+1 == high){
        if(coin[low] < coin[high]){//第一个硬币是假币
            re = low+1;
            return re;
        }else{//第二个硬币是假币
            re= high+1;
            return re;
        }
    }
//硬币个数大于2
    if((high-low+1)%2==0){//偶数个硬币
        // 0 1 2 3 5 6
        let center = Math.round((high-low)/2);
        console.log('偶数center  ', center);
        for(i = low;i <= low + center;i++){//前半段重量
            sum1= sum1 + coin[i];
        }
        for(i=low+center+1;i<=high;i++){//后半段重量
            sum2=sum2+coin[i];
        }
        if(sum1>sum2){//后半段轻，假币在后半段
            re=falseCoin(coin,low+center+1,high);
            return re;
        }else if(sum1<sum2){//前半段轻，假币在前半段
            re=falseCoin(coin,low,low+center/2);
            return re;
        }
    }else{//奇数个硬币
        // 0 1 2 3 5
        let center = Math.round((high-low)/2);
        console.log('奇数center ', center);
        for(i=low;i<=low+center-1;i++){//前半段重量
            sum1=sum1+coin[i];
        }
        for(i=low+center+1;i<=high;i++){//后半段重量
            sum2=sum2+coin[i];
        }
        //中间的数
        sum3=coin[low+center];
        if(sum1>sum2){//后半段轻，假币在后半段
            re=falseCoin(coin,low+center+1,high);
            return re;
        }else if(sum1<sum2){//前半段轻，假币在前半段
            re=falseCoin(coin,low,low+center-1);
            return re;
        }
        if(sum1+sum3==sum2+sum3){//前半段+中间硬币和后半段+中间硬币重量相等，说明中间硬币是假币
            re=low+(high-low)/2+1;
            return  re;
        }

    }
}

    let n=12,i;
    let a = [];
    for(i=0;i<n;i++){
        a[i]=2;
    }
    a[7]=1;//设置第八个为假币
    console.log("假币是第%d个\n", falseCoin(a, 0, n-1));
