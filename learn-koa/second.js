//级联代码（Cascading）

var koa = require('koa');
var app = new koa();

//x-response-time
app.use(async function (ctx, next) {
    //(1) 进入路由
    let start = new Date;
    await next();
    //(5) 再进入x-response-time中间件， 记录2此通过的时间间隔
    var ms = new Date - start;
    ctx.set('X-Response-Time', ms+"ms");
    //(6) return this.body;
});
//logger
app.use(async function (ctx, next){
    //(2)进入logger中间件
    var start = new Date;
    await next();
    //(4) 再次进入loger， 记录2次的时间间隔
    var ms = new Date -start;
    console.log(`${ctx.method} ${ctx.url}-${ms}`);
});

app.use(async function (ctx){
    //(3) 进入response，没有捕获到下一个符合条件的中间件， 传递到upstream
    ctx.body = "Hello koa 2";
});

app.listen(3000);