
const { createUser } = require('../models/user');

class UserController {
    static async register(ctx,next) {
        // 用户注册
        const user = { username: 'cooperduan', password: '123456' }
        const data = await createUser(user);
        console.log(data);
        next();
    }
    static async signin(ctx) {
        // 用户登录
    }
    static async logout(ctx) {
        // 用户退出
    }
    static async put(ctx) {
        // 修改用户信息
    }
}