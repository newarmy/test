let Koa = require('koa');
let Router = require('koa-router');
let sceneObj = require('./data/scene');
let conditions = require('./data/conditions');
let order = require('./data/order');
let custom = require('./data/custom');
let video = require('./data/video');
let imgs1 = require('./data/imgs-1');
let imgs2 = require('./data/imgs-2');
let imgs3 = require('./data/imgs-3');
let comments = require('./data/comment');
let app = new Koa();
let router = new Router({
    prefix: '/good'
});
router.get('/scene', async (ctx, next) => {
    ctx.body =sceneObj
});
router.get('/conditions', async (ctx, next) => {
    ctx.body = conditions;
})

router.get('/order', async (ctx, next) => {
    ctx.body = order;
});

router.get('/custom', async (ctx, next) => {
    ctx.body = custom;
});
router.get('/video', async (ctx, next) => {
    ctx.body = video;
});
router.get('/imgs', async (ctx, next) => {
   let query = ctx.request.query;
   let picId = query.picId;
   let picGroupId = query.picGroupId;
   ctx.set('Access-Control-Allow-Origin', '*');
   if(picGroupId == 1) {
       if(picId) {
           ctx.body = imgs3;
       } else {
           ctx.body = imgs1;
       }

   } else {
       ctx.body = imgs2;
   }
});
router.get('/comments', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.body = comments;
})


app.use(router.routes());
app.listen(3000)