
'use strict'
const router = require('koa-router')(); 
const User = require('./user');   // 引入用户模块逻辑层
const router = new Router({
    prefix: '/api'
})

router
    //  用户模块api
    .post('/api/user/signin', User.signin)         // 用户登录
    .post('/api/user/register', User.register)   // 用户注册      
    .get('/api/user/logout', User.logout)     // 用户退出      
    .put('/api/user', User.put)               // 修改用户资料

module.exports = router;
