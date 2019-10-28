const gulp = require('gulp');
const {series, parallel, src, dest } = require('gulp');
//要有的webpack版本
const webpack = require('webpack');
// webpack gulp plugin
/**
 * webapck-stream的参数：
 * 第一个是webpack的配置信息
 * 第二个， 可选，webpack对象，可以使用自己的webpack版本
 * */
const gulpWebpack = require('webpack-stream');
const webpackProdConfig = require('./webpack.prod');
const webpackDevConfig = require('./webpack.config');
const webpackDllConfig = require('./webpack.dll.config');
const clean = require('gulp-clean');
const rename = require('gulp-rename');


/**
 * gulp4问题：
 *
 * 1. 任务改为异步任务。
 * 2. series(顺序执行)，parallel(并行执行) 会返回一个组合任务的的任务。
 *
 * https://segmentfault.com/a/1190000017511053
 * */

gulp.task('clean', async function () {
    await src(['dist'], {allowEmpty: true})
        .pipe(clean({ force: true }));
});
gulp.task('cleanDev', async function () {
    await src(['dev'], {allowEmpty: true})
        .pipe(clean({ force: true }));
});
gulp.task('webpackDevTask',  async function() {

    await  new Promise(function (resolve, reject) {
        webpack(webpackDevConfig, function (err) {
            if(err) {
                console.log(err);
                reject();
                return;
            }
            setTimeout(function () {
                resolve();
            },500);

        })
    });

});
gulp.task('webpackProdTask',  async function() {
    /*await src('./src/enter/main.js')
       .pipe(gulpWebpack(webpackconfig, webpack))
       .pipe(dest('test/'));*/
    await  new Promise(function (resolve, reject) {
                webpack(webpackProdConfig, function (err) {
                    if(err) {
                        console.log(err);
                        reject();
                        return;
                    }
                    setTimeout(function () {
                        resolve();
                    },500);

                })
            });

});

/*gulp.task('webpackDevTask', async function() {
    await new Promise((resolve, reject) => {
        webpack(webpackDevConfig, (err) => {
            if(err) {
                reject();
                return;
            }
            setTimeout(() => {
                resolve();
            }, 500)

        })
    })
});
gulp.task('webpackDllTask',   function() {
         console.log('----------------------------------------------------------');
    return webpack(webpackDllConfig, (err) => {
            if(err) {

                return;
            }
            setTimeout(() => {

            }, 500)

        }).run(function() {});
});*/

/*gulp.task('copyjs', function () {
   return src(['./dist/js/*.js'])
        .pipe(dest(['statics/js/carImageClub'], {cwd: '../../'})); //cwd设置工作目录根目录
});
*/

//=====================================================================
/*
 * rename:
 * {
 *  dirname: "main/text/ciao",
    basename: "aloha",
    prefix: "bonjour-",
    suffix: "-hola",
    extname: ".md"
 * }
 *
 * dirname is the relative path from
 * the base directory set by gulp.src to the filename.
 gulp.src() uses glob-stream which sets the base to the parent
 of the first directory glob (*, **, [], or extglob). dirname is
 the remaining directories or ./ if none. glob-stream versions >= 3.1.0
 (used by gulp >= 3.2.2) accept a base option, which can be used to
 explicitly set the base.
 gulp.dest() renames the directories between process.cwd() and
 dirname (i.e. the base relative to CWD). Use dirname to rename the
 directories matched by the glob or descendents of the base of option.
 basename is the filename without the extension like path.basename(filename,
 path.extname(filename)).
 extname is the file extension including the '.' like path.extname(filename).
 when using a function, a second file argument is provided with the whole context
 and original file val
 **/

//gulp.task('copycss', function () {
//    return src(['./dist/css/style.css'])
//        .pipe(rename({
//            basename: "style_carpic",
//        }))
//        .pipe(dest(['statics/style/'], {cwd: '../../'})); //cwd设置工作目录根目录
//});
gulp.task('copyimage', function () {
    return src(['./public/images/fish/*.*'])
        .pipe(dest(['dist/public/fish/'], {cwd: './'})); //cwd设置工作目录根目录
});
gulp.task('copyimageDev', function () {
    return src(['./public/images/fish/*.*'])
        .pipe(dest(['dev/public/fish/'], {cwd: './'})); //cwd设置工作目录根目录
});
gulp.task('prod', series( 'clean', 'webpackProdTask', 'copyimage'));
gulp.task('dev', series( 'cleanDev', 'webpackDevTask', 'copyimageDev'));