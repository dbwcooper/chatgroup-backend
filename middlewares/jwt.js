const jwt = require('jsonwebtoken');
const SECRET = require('../config').secret;

const jwtsign = (userName) => {
    //设置 token 的日期 加密方式 RS256
    let token = jwt.sign({username: name}, SECRET, {expiresIn: '3 days'});
    return {token}
}

//解密出来包括三部分   加密的用户名 ，token生成时间 token到期时间
// { username: 'testName', iat: 1494061742, exp: 1494320942 }
const jwtVerify = (req,res,next) => {
    // 从body或query或者header中获取token
    // req.query get方式  req.headers[''] post 方式
    let token = req.body.token || req.query.token || req.headers["x-access-token"];
    try {
        let decode = jwt.verify(token, SECRET);
        // console.log(decode);
        req.body.jwtName = decode.username;
        next();
    } catch (e) {
        console.log("身份异常----\n " + e.toString());
        let result = {};
        result.code = 400;
        result.msg = "用户信息错误";
        res.end(JSON.stringify(result));
    }
}
module.exports = {
    jwtSign,
    jwtVerify
};