
const { 
    _createUser,
    _findUserByName,
    _getUserList,
    _inviteUser
} = require('../models/user');
const { jwtSign } = require('../middlewares/jwt');
const sha1 = require('sha1');
/**
 * 用户注册
 * post 请求的body被封装在ctx.request.body中 request是koa封装的请求对象， req是node封装的请求对象
 */
const register = async (ctx) => {
    let user = ctx.request.body;
    console.log('user', user);
    let result = {}
    if (!user.userName || !user.pwd || user.pwd !== user.rpwd) {
        result.code = 400;
        result.msg = "请检查您的用户名和密码";
        ctx.response.body = result;
    }
    user.pwd = sha1(user.pwd);
    delete user.rpwd;
    
    result.data = await _createUser(user);
    if (result.data === 400) {
        result.msg = '用户名已被注册';
    } else  {
        let token = jwtSign(user.userName);
        result.msg = '恭喜你注册成功!';
        result.code = 200;
        result.data.token = token;
    }
    ctx.response.body = result;
}

/**
 * 用户登陆
 */
const login = async (ctx, next) => {
    let user = ctx.request.body;
    let result = {
        code: 200
    }

    if (!user.userName || !user.pwd ) {
        result.code = 400;
        result.msg = "请检查您的用户名和密码";
        ctx.response.body = result;
    }
    user.pwd = sha1(user.pwd);

    let data = await _findUserByName(user.userName);
    if (data === 400 || !data) {
        // 用户名不存在
        result.code = data;
        result.msg = "用户名不存在";
    } else if(data.pwd === user.pwd) {
        result.code = 200;
        result.msg = "登录成功";
        result.data = {
            token: jwtSign(user.userName),
            roomList: data.roomList,
            avatar: data.avatar
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

const getUserList = async (ctx, next) => {
    let userName = ctx.params.userName;
    let result = {};
    let data = await _getUserList(userName);
    
    if(data === 400) {
        result.code = 400;
        result.msg = '服务端错误';
    } else {
        result.code = 200;
        result.msg = '查询成功!';
        result.data = data;
    }
    ctx.response.body = result;
}

const inviteUser = async (ctx, next) => {
    let model = ctx.request.body;
    let result = {};
    let data = await _inviteUser(model);

    if (data === 400) {
        result.code = 400;
        result.msg = '服务端错误';
    } else {
        result.code = 200;
        result.msg = '查询成功!';
        result.data = data;
    }
    ctx.response.body = result;
}

module.exports = {
    register,
    login,
    logout,
    getUserList,
    inviteUser
}