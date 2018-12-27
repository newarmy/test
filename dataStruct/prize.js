function get(selector) {
    return document.querySelector(selector);
}
function gets(selector) {
    return document.querySelectorAll(selector);
}
class prizeClass {
    /**
     * {{param}}
     * peopleArr: {{Array}} 参与抽奖的人或物的数据数组
     * prizedNum: {{Number}} 中奖的数量
     * */
    constructor(peopleArr, prizedNum) {
        this.peopleArr = peopleArr; //
        this.prizedNum = prizedNum;
        this.domArr = [];
        this.flagArr = []; // clearInterval用，清除动画定时
        this.resultArr = []; //存放中奖的人或物
        this.startPrized = false;// 是否开始抽奖
        this.endPrized = false; //是否结束抽奖
        this.initPrizedEvent();
    }
    /**
     *
     * 初始抽奖事件
     **/
    initPrizedEvent() {

        document.addEventListener('keydown',  (e) => {
            if(e.keyCode === 32 || e.keyCode === 13) {
                if(!this.startPrized) {
                    this.createPrizedDom(get('ul'));
                    this.startPrized = true;
                } else {
                    if(this.endPrized) {
                        return;
                    }
                    this.endPrized = true;
                    this.flagArr.forEach(function (e) {
                        clearInterval(e);
                        e = null;
                    });
                    this.getPrizedRusult();
                }
            }

        })
    }
    /***
     * 初始dom结构，并开始抽奖动画
     * dom: dom结点对象
     * */
    createPrizedDom (dom) {
        let k = this;
        let pLen = this.peopleArr.length;
        let html = '';
        for(let i = 1; i <= this.prizedNum; i++) {
            html += '<li class="item">0</li>';
        }
        dom.innerHTML = html;
        setTimeout( ()=> {
            let list = gets('.item');
            list.forEach( e => {
                k.domArr.push(e);
                k.animation(e, pLen);
            })
        })
    }
    /**
     * 抽奖动画
     * dom 显示中奖信息的dom
     * length: 参与抽奖的人或物的个数
     * */
    animation (dom, length) {
        let flag = setInterval(function () {
            dom.innerHTML = arr[Math.floor(Math.random()*length)];
        }, 100);
        this.flagArr.push(flag);
    }

    /**
     * 得奖结果
     * */
    getPrizedRusult() {
        let k = this;
        let pLen = k.peopleArr.length;
        for(let i = 0; i < k.prizedNum; i++) {
            let index = Math.floor(Math.random()*pLen);
            let tempArr = k.peopleArr.splice(index, 1);
            pLen--;
            k.resultArr.push(tempArr[0]);
        }
        k.resultArr.forEach(function (e, j) {
            k.domArr[j].innerHTML = e;
        })

    }
}