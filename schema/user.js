const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

/** 用户Schema
 * require 将当前字段设置为必须拥有值 即是不能为空。
 * unique: true,  设置当前字段 userName 在users 集合里面具有唯一性
 */

const UserSchema = new Schema({
    userName: {
        type: Schema.Types.String,
        unique: true,
        require: true,
    },
    pwd: {
        type: Schema.Types.String,
        require: true,
    },
    avatar: Schema.Types.Mixed, // 混合类型
    roomIdList:[
        {
            roomLink: Schema.Types.String,
            msgCount: Schema.Types.Number
        }
    ],
    moment: {
        type: Schema.Types.Date,
        default: Date.now,
    },
});

module.exports = UserSchema;