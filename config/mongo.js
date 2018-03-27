import mongoose from 'mongoose';
import config from './index';

mongoose.Promise = global.Promise;

const db = mongoose.connection;
const Schema = mongoose.Schema;
mongoose.connect(config.mongodb);

db.on('error',function () {
    console.log("connect failed!");
});

db.once('open', function () {
   console.log('connect success !');
});
/** 用户model 模型
 * require 将当前字段设置为必须拥有值 即是不能为空。
 * unique: true,  设置当前字段 username 在users 集合里面具有唯一性
 */

exports.User = mongoose.model('User', new Schema({
    // 登录名非空
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    moment: {
        type: Date,
        default: Date.now,
    },
}, { moment:1 }));

/**
 * ChatRoom 聊天室model模型 
 * name: 聊天室名
 * moment: 创建时间
 * originalOwner: 创建者
 * onlineUsers: 在线人数 -> { username, avatar: {} }
 * 
 */
exports.ChatRoom = mongoose.model('ChatRoom', new Schema({
    // 登录名非空
    roomname: {
        type: String,
        unique: true,
        require: true
    },
    originalowner: {
        type: String,
        require: true
    },
    onlineusers: {
        type: Array,
        require: true,
        default: [],
    },
    moment: {
        type: Date,
        default: Date.now,
    },
},{ roomname:1 }));

/**
 * Comment 用户消息model模型 
 * name: 聊天室名
 * moment: 创建时间
 * originalOwner: 创建者
 * onlineUsers: 在线人数 -> { username, avatar: {} }
 * 
 */
exports.Comment = mongoose.model('Comment', new Schema({
    // 登录名非空
    username: {
        type: String,
        require: true
    },
    roomname: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    moment: {
        type: Date,
        default: Date.now,
    },
    md: {
        type: Boolean,
        default: false
    }
},{roomname:1}));