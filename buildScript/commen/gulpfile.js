const gulp = require('gulp');
/**
* 如果要支持ie8，要用"gulp-uglify": "^2.0.0",
 *配置：uglify({
 *       compress: { "screw_ie8": false },
  *      mangle: { "screw_ie8": false },
  *      output: { "screw_ie8": false }
  *    })
 *
 */
const uglify = require('gulp-uglify');
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
const webpackDevConfig = require('./webpack.dev');
const clean = require('gulp-clean');


/**
 * gulp4问题：
 *
 * 1. 任务改为异步任务。
 * 2. series(顺序执行)，parallel(并行执行) 会返回一个组合任务的的任务。
 *
 * https://segmentfault.com/a/1190000017511053
 * */

gulp.task('clean', async function () {
    await src(['test', 'build'], {allowEmpty: true})
        .pipe(clean({ force: true }));
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

gulp.task('webpackDevTask', async function() {
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
gulp.task('uglify', async function () {
    await src(['dist/*.js']).pipe(uglify({
        ie8: true,
    })).pipe(dest('dist'));
})
gulp.task('copy', function () {
   return src(['./dist/*.*', './test/**/*.*'])
        .pipe(dest(['build'], {cwd: '.'})); //cwd设置工作目录根目录
});

gulp.task('prod', series( 'clean', 'webpackProdTask', 'uglify', 'copy'));
gulp.task('dev' ,series('webpackDevTask'));