/*
* 动态规划：
*
*
* */

let things = [
    {
        name: '吉他',
        value: 1500,
        weight: 1
    },
    {
        name: '音响',
        value: 3000,
        weight: 4
    },
    {
        name: '笔记本电脑',
        value: 2000,
        weight: 3
    }

];

let scenicSpots = [
    {
        name: 'w',
        value: 7,
        weight: 0.5
    },
    {
        name: 'h',
        value: 6,
        weight: 0.5
    },
    {
        name: 'y',
        value: 9,
        weight: 1
    },
    {
        name: 'd',
        value: 9,
        weight: 2
    },
    {
        name: 's',
        value: 8,
        weight: 0.5
    },
];

function createDynamicPlanTable(row, column) {
    // 第一行 第一列不用
    let table = [];
    for(let i = 0; i <= row; i++) {
        let rowArr = [];
        for(let j = 0; j <= column; j++) {
            rowArr.push(0);
        }
        table.push(rowArr);
    };
    return table;
}
//创建子问题（）
function createChildQuestion(intervalValue, column) {
    let childQuestion = [];
    for(let i = 0; i<= column; i++) {

        childQuestion.push(i*intervalValue);
    }
    return childQuestion;
}
function dynamicPlan (things, intervalWeight, maxWeight) {
    let row = things.length; //物品数量
    let column = maxWeight/intervalWeight;//容量分配
    let childQuestion = createChildQuestion(intervalWeight, column);
    let table = createDynamicPlanTable(row, column);
    let thingTable = createDynamicPlanTable(row, column);

    for(let i = 1; i <= row; i++) {
        //处理物品
        let thing = things[i-1];
        if(i === 1 ){
            //初始物品在各个容量（1,2，3， 4）中
            for(let j = 1; j <= column; j++) {
                let curWeight = childQuestion[j];//当前包的容量
                let curThingWeight = thing.weight;
                let curThingValue = thing.value;
                //console.log('curThingWeight <= curWeight ===', curThingWeight <= curWeight);
                if(curThingWeight <= curWeight) {
                    table[i][j] = curThingValue;
                   // console.dir(thing);
                    thingTable[i][j] = [thing];
                }
            }
        } else {
           // console.log(childQuestion);
           // console.log(thingTable);
            for(let j = 1; j <= column; j++) {
                let curWeight = childQuestion[j];//当前包的容量
                let curThingWeight = thing.weight;
                let curThingValue = thing.value;
                // 当前容量 大于等于 当前物品容量
                if(curThingWeight <= curWeight) {
                    let beforeMaxValue = table[i-1][j];
                    //curWeight-curThingWeight 放上当前物品后，剩余的容器容量；
                    let leftWeight = curWeight - curThingWeight;
                    // 当前容量 大于 当前物品容量
                    if(leftWeight > 0) {
                        //console.log(leftWeight);
                        // 剩余的容器容量所在的索引值
                        let index = childQuestion.indexOf(leftWeight);
                        let curMaxValue = curThingValue + table[i-1][index];
                       // console.log(beforeMaxValue, curMaxValue)
                        if(beforeMaxValue >= curMaxValue) {
                            table[i][j] = beforeMaxValue;
                            thingTable[i][j] = thingTable[i-1][j];
                        } else {
                            table[i][j] = curMaxValue;
                            let selectThings = thingTable[i-1][index];
                            //console.log(selectThings);
                            if(selectThings == 0) {
                                thingTable[i][j] = [thing];
                            } else {
                               // console.dir(selectThings);
                                let newArr = selectThings.slice(0);
                                newArr.push(thing);
                                thingTable[i][j] = newArr;
                            }
                        }
                    } else {// 当前容量 等于 当前物品容量
                        let curMaxValue = curThingValue;
                        if(beforeMaxValue >= curMaxValue) {
                            table[i][j] = beforeMaxValue;
                            thingTable[i][j] = thingTable[i-1][j];
                        } else {
                            table[i][j] = curMaxValue;
                            thingTable[i][j] = [thing];
                        }
                    }
                } else { // 当前容量 小于 当前物品容量
                    table[i][j] = table[i-1][j];
                    thingTable[i][j] = thingTable[i-1][j];
                }
            }
        }

    }
    //console.dir(table);
   // console.dir(thingTable);
    return {
        maxValue: table[row][column],
        selectArr: thingTable[row][column],
    };
};
let maxValue = dynamicPlan(things, 1, 4);
console.dir(maxValue);

console.log('----------------------------------');
let scenic = dynamicPlan(scenicSpots, 0.5, 2);
console.dir(scenic);