let Koa = require('koa');
let Route = require('koa-router');
let bodyParser = require('koa-bodyparser'); //post request
let multer = require('koa-multer'); // upload file
let static = require('koa-static'); // static resource
let render = require('koa-ejs'); // 模板
let logger = require('koa-logger');
let fs = require('fs');
let app = new Koa();
let router = new Route();

app.use(logger());
app.use(static(__dirname +"/publish"));
render(app, {
    root: __dirname+"/template",
    layout: 'layout', //布局文件
    viewExt: 'html',
    cache: false,
    debug: true
})
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'my-uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.filename+'_'+Date.now());
    }
});

let upload = multer({storage: storage});

router.post('/upload', upload.single('file'), async (ctx) => {
    console.log(ctx.req.file);
    let {originalname, path, filename} = ctx.req.file;
    fs.copyFileSync(path, 'publish/'+originalname);
    fs.unlink(path);
    await ctx.render('upload', {originalname: originalname})
});
app.use(bodyParser());
router.get('/', async (ctx, next) => {
   await ctx.render('home/home');
});

router.get('/template', async (ctx, next) => {
   await  ctx.render('main', {user: '董新军'})
});
router.get('/about', async (ctx, next) => {
    await ctx.render('about');
});
router.post('/7-search', async (ctx, next) => {
    let name = ctx.request.body.name;
   await ctx.render('search', {name: name});
});

router.post('/login', async(ctx, next) => {
    let name = ctx.request.body.name;
    ctx.body= {
       msg: "你好，"+name+", 登录成功!"
    };
});


app.use(router.routes());
app.listen(3000)