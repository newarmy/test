let Koa = require('koa');
let Router = require('koa-router');
let bodyParser = require('koa-bodyparser'); //post request
let path = require('path');
const {appendFile} = require('fs/promises');
let app = new Koa();
let router = new Router({
    //prefix: '/good'
});

async function writeLog(data) {
    let pathStr = path.join(__dirname, './my-uploads/performance.txt');
    let dataStr = '|';
    for(let k in data) {
        dataStr += k+'='+data[k]+";";
    }
   await appendFile(pathStr, dataStr);
} 
router.get('/frontP', async (ctx, next) => {
    
    setHeaders(ctx);
    const query = ctx.request.query;
    await writeLog(query);
    console.log('get');
    ctx.body = {state: 'ok'};
});
router.post('/frontP', async (ctx, next) => {
    
    setHeaders(ctx);
    const query = ctx.request.body;
    console.log(query);
    await writeLog(query);
    ctx.body = {state: 'ok'};
});
router.get('/backP', async (ctx, next) => {
	setHeaders(ctx);
    ctx.body =focus
});

function setHeaders( ctx) {
    ctx.set('Access-Control-Allow-Origin', '*');//http://localhost:63343
    ctx.set('Access-Control-Allow-Credentials', true);	
}
app.use(bodyParser());
app.use(router.routes());
app.listen(3003)