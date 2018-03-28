const Schema = require('mongoose').Schema;

/** 用户Schema
 * require 将当前字段设置为必须拥有值 即是不能为空。
 * unique: true,  设置当前字段 username 在users 集合里面具有唯一性
 */

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,  //主键
    username: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    avatar: Schema.Types.Mixed, // 混合类型
    moment: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = UserSchema;