let Koa = require('koa');
let app = new Koa();

app.use(ctx => {
    ctx.body = "Hello koa2";
});
app.listen(3000);