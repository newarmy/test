
// https://www.jianshu.com/p/2ab5743ad9a4
// https://www.zhihu.com/question/37585246
//https://gtmetrix.com/

//http://fex.baidu.com/blog/2014/05/build-performance-monitor-in-7-days/

let time = performance.timing;

//重定向次数
function redirectCount() {
    return performance.navigation.redirectCount;
}

//重定向耗时
function redirectInterval() {
    return time.redirectEnd - time.redirectStart;
}

//DNS 解析耗时

function lookupDNSTimeConsuming() {
    return time.domainLookupEnd - time.domainLookupStart;
}

// TCP 连接耗时

function TCPConnectionTimeConsuming() {
    return time.connectEnd - time.connectStart
}

// SSL 安全连接耗时

function sslConnectionTimeConsuming() {
    return time.connectEnd - time.secureConnectionStart;
}

// 网络请求耗时 (TTFB)

function networkRequestTimeConsuming() {
    return time.responseEnd - time.requestStart;
}

//数据传输耗时
function dataTransmissionTimeConsuming() {
    return time.responseEnd - time.responseStart;
}

//DOM 解析耗时
function parseDomTimeConsuming() {
    return time.domInteractive - time.responseEnd;
}

//资源加载耗时

function loadAssetsTimeConsuming() {
    return time.loadEventStart - time.domContentLoadedEventEnd;
}

//首包时间
function FirstPackageTimeConsuming() {
    return time.responseStart - time.domainLookupStart;
}

// 白屏时间

function whiteScreenTimeConsuming() {
    return time.responseEnd - time.fetchStart;
}

// 首次可交互时间

function firstInteractiveTimeConsuming() {
    return time.domInteractive - time.fetchStart;
}

//DOM Ready 时间
function domReadyTimeConsuming() {
    return time.domContentLoadedEventEnd - time.fetchStart;
}

//页面完全加载时间

function pageLoadFinishTimeConsuming() {
    return time.loadEventStart - time.fetchStart;
}


// 返回当前网页自从performance.timing.navigationStart到当前时间之间的毫秒数。

function getCurrentTimeConsuming() {
    return performance.now();
}

/**
 * 浏览器获取网页时，会对网页中每一个对象（脚本文件、样式表、图片文件等等）
 * 发出一个HTTP请求。performance.getEntries方法以数组形式，
 * 返回这些请求的时间统计信息，有多少个请求，返回数组就会有多少个成员。
 * */

function getResourceLoadInfo() {
    return performance.getEntries();
}

/**
 * performance.memory
 描述内存多少，是在Chrome中添加的一个非标准属性。


 jsHeapSizeLimit: 内存大小限制
 totalJSHeapSize: 可使用的内存
 usedJSHeapSize: JS对象(包括V8引擎内部对象)占用的内存，
 不能大于totalJSHeapSize，如果大于，有可能出现了内存泄漏
 * */