const Schema = require('mongoose').Schema;

/**
 * ChatRoom 聊天室 Schema
 * roomLink: 聊天室名 只能为英文
 * moment: 创建时间
 * userName: 创建者
 * onlineUsers: 在线人数 -> { username, avatar: {} }
 * 
 */
const ChatRoomSchema = new Schema({
    roomLink: {
        type: Schema.Types.String,
        unique: true,
        require: true,
    },
    userName: {
        type: Schema.Types.String,
        require: true,
    },
    title: {
        type: Schema.Types.String,
    },
    onlineList:[
        {
            userName: Schema.Types.String,
            avatar: Schema.Types.Mixed,
        }
    ],
    annoucement: {
        type: Schema.Types.String,
    },
    moment: {
        type: Schema.Types.Date,
        default: Date.now(),
    },
});

module.exports = ChatRoomSchema;