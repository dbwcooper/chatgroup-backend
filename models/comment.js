const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Comment 用户消息model模型 
 * name: 聊天室名
 * moment: 创建时间
 * originalOwner: 创建者
 * onlineUsers: 在线人数 -> { username, avatar: {} }
 * 
 */
const Comment = mongoose.model('Comment', new Schema({
    username: {
        type: String,
        require: true,
    },
    roomname: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    moment: {
        type: Date,
        default: Date.now(),
    },
    md: {
        type: Boolean,
        default: false,
    }
}));


module.exports = Comment;