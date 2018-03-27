const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** 用户model 模型
 * require 将当前字段设置为必须拥有值 即是不能为空。
 * unique: true,  设置当前字段 username 在users 集合里面具有唯一性
 */

const User = mongoose.model('User', new Schema({
    username: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: Object,
        require: true,
    },
    moment: {
        type: Date,
        default: Date.now(),
    },
}));

module.exports = User;