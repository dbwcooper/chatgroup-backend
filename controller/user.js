
const { _createUser, _findUserByName } = require('../models/user');
const { jwtSign } = require('../middlewares/jwt');
const sha1 = require('sha1');
/**
 * 用户注册
 * post 请求的body被封装在ctx.request.body中 request是koa封装的请求对象， req是node封装的请求对象
 */
const register = async (ctx) => {
    let user = JSON.parse(ctx.request.body);
    let result = {}
    
    if (!user.userName || !user.pwd || user.pwd !== user.rpwd) {
        result.code = 400;
        result.msg = "请检查您的用户名和密码";
        ctx.response.body = result;
    }
    user.pwd = sha1(user.pwd);
    delete user.rpwd;
    // 返回的code 200/400
    result.code = await _createUser(user);
    if (result.code === 200) {
        let token = jwtSign(user.userName);
        result.msg = '恭喜你注册成功!';
        result.data = { token }
    } else {
        result.msg = '用户名已被注册';
    }
    ctx.response.body = result;
}

/**
 * 用户登陆
 */
const login = async (ctx, next) => {
    let user = JSON.parse(ctx.request.body);
    let result = {
        code: 200
    }

    if (!user.userName || user.pwd ) {
        result.code = 400;
        result.msg = "请检查您的用户名和密码";
        ctx.response.body = result;
    }
    user.pwd = sha1(user.pwd);

    let data = await _findUserByName(user.userName);
    if (data === 400) {
        // 用户名不存在
        result.code = data;
        result.msg = "用户名不存在";
    } else if(data.pwd === user.pwd) {
        result.code = 200;
        result.msg = "登录成功";
        result.data = {
            token: jwtSign(user.userName),
            roomIdList: data.roomIdList
        };
    } else{
        result.code = 400;
        result.msg = "密码错误";
    }
    ctx.response.body = result;
}

/**
 * 用户注销 
 * 这里我的注销操作是 重新生成一个token 但并不返回
 */
const logout = async (ctx, next) => {
    let user = JSON.parse(ctx.request.body);
    await jwtSign(user.userName);
    let result = {
        "code": 200,
        "msg": "注销成功"
    }
    ctx.response.body = result;
}

module.exports = {
    register,
    login,
    logout,
}