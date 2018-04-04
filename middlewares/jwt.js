const jwt = require('jsonwebtoken');
const SECRET = require('../config').secret;

// 加密 设置 token 的日期 加密方式 RS256
const jwtSign = (userName) => jwt.sign({ userName }, SECRET, { expiresIn: '3 days' })


//解密出来包括三部分   加密的用户名 ，token生成时间 token到期时间
// { userName: 'testName', iat: 1494061742, exp: 1494320942 }
const jwtVerify = (ctx, next) => {
    try {
        let token = ctx.request.headers["x-access-token"];
        let decode = jwt.verify(token, SECRET);
        ctx.request.body.userName = decode.userName;
        next();
    } catch (e) {
        let result = {
            "code": 400,
            "msg": "用户信息错误请重新登录"
        };
        ctx.response.body = result;
    }
}
module.exports = {
    jwtSign,
    jwtVerify
};