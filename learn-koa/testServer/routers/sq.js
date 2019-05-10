/**
 * ajax 服务路由集合
 */

const router = require('koa-router')({
    prefix: '/sq'
})

const controllers = require('../controllers');

router.get('/test', controllers.test);
router.get('/sq/hello', controllers.sq.hello);
module.exports = router