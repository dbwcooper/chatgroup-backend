// /server/router.js     // 组织api的接口层

 const router = require('koa-router')(); 
 const UserController = require('./user');   // 引入用户模块逻辑层

 router
        //  用户模块api
       .post('/api/user/signin',UserController.signin)         // 用户登录
       .post('/api/user/register',UserController.register)   // 用户注册      
       .get('/api/user/logout',UserController.logout)     // 用户退出      
       .put('/api/user',UserController.put)               // 修改用户资料

module.exports = router;