const Koa = require('koa')
const app = new Koa();
let port = 3000
const response = require('./middlewares/response');

// 使用响应处理中间件
app.use(response)

// 引入路由分发
const router = require('./routers')
const sqRouter = require('./routers/sq');
app.use(router.routes())
app.use(sqRouter.routes());

// 启动程序，监听端口
app.listen(port)