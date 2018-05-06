const jwt = require('jsonwebtoken');
const SECRET = require('../config').secret;

// 加密 设置 token 的日期 加密方式 RS256
const jwtSign = (userName) => jwt.sign({ userName }, SECRET, { expiresIn: '3 days' })


//解密出来包括三部分   加密的用户名 ，token生成时间 token到期时间
// { userName: 'testName', iat: 1494061742, exp: 1494320942 }
const jwtVerify = async (ctx, next) => {
    try {
        let token = ctx.request.headers["x-access-token"];
        if (token) {
            let decode = jwt.verify(token, SECRET);
            ctx.request.body.userName = decode.userName;
            ctx.params.userName = decode.userName;
        }
        await next();
    } catch (e) {
        // 使用了jwt的更下一层中间件如果抱错将被此中间件截获
        let result = {
            "code": 400,
            "msg": "请重新登录"
        };
        ctx.response.body = result;
    }
}
module.exports = {
    jwtSign,
    jwtVerify
};