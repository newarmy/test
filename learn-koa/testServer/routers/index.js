/**
 * ajax 服务路由集合
 */

const router = require('koa-router')({
    prefix: '/json'
})

const controllers = require('../controllers');

router.get('/test', controllers.test);
router.get('/hello', controllers.hello);
module.exports = router