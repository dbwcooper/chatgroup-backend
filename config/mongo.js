const mongoose =  require('mongoose');
const config = require('./index');

const UserSchema = require('../schema/user');
const CommentSchema = require('../schema/comment');
const ChatRoomSchema = require('../schema/chatRoom');

mongoose.Promise = require('bluebird')

const options = {  
    server: {
        auto_reconnect: true,
        minSize: 10
    },
    auth:{
        user: 'dbwcooper',
        password: 'dbwcooper',
    }
};


const conn = mongoose.createConnection(config.mongodb, options)

conn.on('error',function (error) {
    console.log("connect failed!");
});

conn.once('open', function () {
    console.log('connect success !');
});

module.exports = {
    UserModel: conn.model('User', UserSchema),
    CommentModel: conn.model('Comment', CommentSchema),
    ChatRoomModel: conn.model('ChatRoom', ChatRoomSchema),
};
