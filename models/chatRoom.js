const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * ChatRoom 聊天室model模型 
 * name: 聊天室名
 * moment: 创建时间
 * originalOwner: 创建者
 * onlineUsers: 在线人数 -> { username, avatar: {} }
 * 
 */
const ChatRoom = mongoose.model('ChatRoom', new Schema({
    roomname: {
        type: String,
        unique: true,
        require: true,
    },
    originalowner: {
        type: String,
        require: true,
    },
    onlineusers: {
        type: Array,
        require: true,
        default: [],
    },
    moment: {
        type: Date,
        default: Date.now(),
    },
}));

module.exports = ChatRoom;