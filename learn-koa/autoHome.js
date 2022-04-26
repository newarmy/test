let Koa = require('koa');
let Router = require('koa-router');
let ad = require('./data/autoHome/ad');
let focus = require('./data/autoHome/focus');
let headlines = require('./data/autoHome/headlines');
let hotCar = require('./data/autoHome/hotCar');
let salesCar = require('./data/autoHome/salesCar');
let tags = require('./data/autoHome/tags');
let tagsData = require('./data/autoHome/tagsData');
let articledata = require('./data/article');
let app = new Koa();
let router = new Router({
    //prefix: '/good'
});
router.get('/homepage/homepage-promotions', async (ctx, next) => {
    
    setHeaders(ctx);
    ctx.body = ad;
});
router.get('/homepage/focus-pictures', async (ctx, next) => {
	setHeaders(ctx);
    ctx.body =focus
});
router.get('/homepage/headlines', async (ctx, next) => {
	setHeaders(ctx);
    ctx.body = headlines;
})

router.get('/columns', async (ctx, next) => {
	setHeaders(ctx);
    ctx.body = tags;
});

router.get('/homepage/recommend-brands', async (ctx, next) => {
	setHeaders(ctx);
    ctx.body = hotCar;
});
router.get('/homepage/hot-models', async (ctx, next) => {
	setHeaders(ctx);
    ctx.body = salesCar;
});
router.get('/column/streams', async (ctx, next) => {
	setHeaders(ctx);
    ctx.body = tagsData;
})

router.get('/articles/feed', async (ctx, next) => {
	setHeaders(ctx);
    ctx.body = articledata;
})

function setHeaders( ctx) {
    ctx.set('Access-Control-Allow-Origin', '*');//http://localhost:63343
    ctx.set('Access-Control-Allow-Credentials', true);	
}

app.use(router.routes());
app.listen(3002)