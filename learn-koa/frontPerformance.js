// https://web.dev/fcp/
// https://web.dev/user-centric-performance-metrics/#in-the-field
// https://blog.csdn.net/LittleRoundFace/article/details/113892145
// https://zhuanlan.zhihu.com/p/82981365
/**
 * First Paint 发生在导航阶段完成之后的第一次渲染. 不包含默认背景色
 * （比如默认背景色的body）但是包含非默认背景色（设置背景色的body）
 * 
 * 首次内容绘制 (FCP) 指标测量页面从开始加载到页面内容的任何部分在屏幕上完成渲染的时间。
 * 对于该指标，"内容"指的是文本、图像（包括背景图像）、<svg>元素或非白色的<canvas>元素。
 * < 1.8s 很好
 * 1.8-3.0s 可以
 * > 3.0s 很差
*/

/**
 * 最大内容绘制 (LCP) 指标会根据页面首次开始加载的时间点来报告
 * 可视区域内可见的最大图像或文本块完成渲染的相对时间。
 * < 2.5s 好
 * 2.5-4.0 一般
 * > 4.0 差
 * 
*/

let fpValue = 0;
let fcpValue = 0;
let lcpValue = 0;
function getFPAndFCP() {
    const observer = new PerformanceObserver(function(list) {
        const perfEntries = list.getEntries();
        console.log(1111111);
        for (let i = 0; i < perfEntries.length; i++) {
            let pItem = perfEntries[i];
            if(pItem.name === 'first-paint') {
               fpValue = pItem.startTime;
            } else if(pItem.name === 'first-contentful-paint') {
               fcpValue = pItem.startTime;
            }
        }
    });
    observer.observe({entryTypes: ['paint']});
}

function getLCP() {
    const observer = new PerformanceObserver(function(list) {
        const perfEntries = list.getEntries();
      
        for (let i = 0; i < perfEntries.length; i++) {
            let pItem = perfEntries[i];
           console.log(pItem);
           lcpValue = pItem.startTime;
        }
    });
    observer.observe({type: 'largest-contentful-paint', buffered: true});
}

//白屏时间
console.log(performance);
const timeObj = window.performance.timing;
let blankTime = 0;
let firstScreenTime = 0;
function getBlankTime() {
    
    if(timeObj) {
       blankTime = timeObj.domLoading - timeObj.fetchStart;
    }
}
// 首屏时间
function getFirstScreenTime() {
    if(timeObj) {
        firstScreenTime = timeObj.domContentLoadedEventEnd - timeObj.fetchStart;
     }
}

function enterPerformance() {
    getLCP();
    getFPAndFCP();
    window.addEventListener('load', function() {
        console.log(timeObj);
        getBlankTime();
        getFirstScreenTime();
    })
}



function reportPerformanceToServer() {
    window.addEventListener('unload', function () {
        let params = new URLSearchParams({
            fp: fpValue,
            fcp: fcpValue,
            lcp: lcpValue,
            blankT: blankTime,
            firstScreenT: firstScreenTime
        })

        if(navigator.sendBeacon) {
              this.navigator.sendBeacon('http://localhost:3003/frontP', params)
        } else {
            const img = new Image;
            img.src="http://localhost:3003/frontP?"+params.toString();
        }
    }, false);
}
enterPerformance();
reportPerformanceToServer();