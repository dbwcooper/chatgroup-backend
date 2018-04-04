
// 导入router 设置默认的顶部是 /api 开头
const router = require('koa-router')({ prefix: '/api/' });
// 使用jwt中间件 
const { jwtVerify} = require('../middlewares/jwt');
const { register, login, logout } = require('./user');   // 引入用户模块逻辑层
const {
    create,
    findRoomsByTitle,
    findRoomByLink,
    addConverse
} = require('./room');


const {
    createComment,
    findComments
} = require('./comment');
router
    //  用户模块api
    .post('user/register', register)   
    .post('user/login', login)         // 用户登录
    .post('user/logout', jwtVerify, logout)     // 用户注销    

    // 聊天室相关api
    .post('chatroom/create', jwtVerify, create)   // 新建一个聊天室
    .get('chatroom/list/:title', findRoomsByTitle)  // 根据输入模糊查找chatroom列表
    .get('chatroom/:roomLink', findRoomByLink)

    .post('comment/:roomLink', jwtVerify, createComment)   // 新建一个聊天室
    .get('comment/:roomLink', findComments)   // 查找roomLink的comments



module.exports = router;
