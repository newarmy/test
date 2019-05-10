var https = require('https');
var jsSHA = require('jssha');

// 随机字符串产生函数
var createNonceStr = function () {
    return Math.random().toString(36).substr(2, 15);
};

// 时间戳产生函数
var createTimeStamp = function () {
    return parseInt(new Date().getTime() / 1000) + '';
};
module.exports = async (ctx) => {
    var appid = 'wx17c7dc8c69a11cf2';
    var appsecret = 'dfcef55777bfc8c35ca1c85bdc293d8b';
    var url = ctx.request.href;
    if (url.indexOf('https') === -1) {
        url = url.replace('http', 'https');
    }
    var ticket;
    var test;
    if(!ctx.app.access_token && !ctx.app.ticket) {
        test = 'first';
        var aRes = await asyncFunc('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + appsecret);
        var tRes = await asyncFunc('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + aRes.access_token + '&type=jsapi');
        var ticket = tRes.ticket;
        ctx.app.access_token = aRes.access_token;
        ctx.app.ticket = ticket;
    } else {
        test = 'not first';
        ticket = ctx.app.ticket;
    }
    var nonceStr = 'abcdefg';//createNonceStr();
    var timeStamp = '123456789';//createTimeStamp();
    var source = 'jsapi_ticket=' + ticket + '&noncestr=' + nonceStr + '&timestamp=' + timeStamp + '&url=' + url;
    var shaObj = new jsSHA(source, 'TEXT');
    var sign = shaObj.getHash('SHA-1', 'HEX');
    let str = `
    <html>
      <head>
        <title>share</title>
        <meta charset="utf-8">
        <meta id="vp" name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, shrink-to-fit=no">
      </head>
      <body>
        <div id="share">分享</div>
        <div>${test}</div>
        <div>${url}</div>
        <div>${ticket}</div>
        <script src="//res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
        <script>
           wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: '${appid}', // 必填，公众号的唯一标识
            timestamp: '${timeStamp}', // 必填，生成签名的时间戳
            nonceStr: '${nonceStr}', // 必填，生成签名的随机串
            signature: '${sign}',// 必填，签名
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
        });
   
        wx.ready(function () {
             
                  wx.onMenuShareTimeline({
                      title: 'share test', // 分享标题
                      link: '${url}', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: '//5b0988e595225.cdn.sohucs.com/c_fill,w_150,h_100,g_faces,q_70/images/20180813/cc6c9fb2f7b740bd9284d0db05cf09e1.jpeg',
                      success: function () {
                       // 用户点击了分享后执行的回调函数
                       alert('share success');
                      }
                  })
                  //alert(23);
              document.getElementById('share').onclick = function () {
                alert('去分享');
              }

        });
        </script>
      </body>
    </html>
  `;
    ctx.body = str;
};

function asyncFunc (url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res1) => {
            var temp = '';
            res1.setEncoding('utf-8');
            res1.on('data', (d) => {
                temp += d;
            });
            res1.on('end', function () {
                let result = JSON.parse(temp);
                resolve(result);
            });
        });
    });
}