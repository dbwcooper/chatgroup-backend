const { UserModel, ChatRoomModel } = require('../config/mongo');
const Mongoose = require('mongoose');

const _createUser = (model) => {
    // model._id = Mongoose.Types.ObjectId();
    // 先找到默认用户admin 所拥有的群组
    let userName = 'admin';
    return new Promise((resolve, reject) => {
        UserModel.findOne({ userName }, 'roomList', (err, data) => {
            if (err || !data){
                resolve(400)
            } else {
                model.roomList = data.roomList;
                UserModel.create(model, function (err) {
                    if (err && err.toString().match('E11000 duplicate key')) {
                        resolve(400);
                    } else {
                        // 然后给默认显示的群组 groupchat 增加一个用户 
                        ChatRoomModel.findOne({ roomLink: 'groupchat' }, (err, chatroom) => {
                            chatroom.onlineList.push({ userName: model.userName, avatar: model.avatar });
                            chatroom.save((err, user) => {
                                if (err) {
                                    resolve(400);
                                } else {
                                    // 注册成功返回roomList, 返回groupchat的onlineList
                                    let result = { onlineList: chatroom.onlineList, roomList: model.roomList }
                                    resolve(result)
                                }
                            })
                        })
                    }
                })
            }
        })
        
    }).then(data => data);
}
const _findUserByName = (userName) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ userName }, function (err, user) {
            //如果err==null，则person就能取到数据
            if(err)  resolve(400);
            resolve(user);
        });
    }).then(data => data)
}

const _insertRoomToUser = (room, userName) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ userName }, function (err, user) {
            //如果err==null，则person就能取到数据
            if (err) resolve(400);
            user.roomList.push(room);
            user.save(function(err, user){
                if (err) reject(400);
                resolve(200)
            })
        });
    }).then(code => code)
}

const _getUserList = (userName) => {
    let _filter = {
        userName: { $regex: userName },
    }
    let rows = 'userName';
    return new Promise((resolve, reject) => {
        UserModel.find(_filter, rows, function (err, list) {
            err ? reject(400) : resolve(list);
        });
    }).then(list => list)
}

const _inviteUser = (model) => {

    return new Promise((resolve, reject) => {
        UserModel.findOne({ userName: model.userName }, function (err, user) {
            if(err) {
                resolve(400);
            }
            // 查询此用户是否在此聊天室内
            let flag = user.roomList.some(item => item === model.roomLink);
            if(!flag) {
                // 用户未在此群组内
                user.roomList.push(model.roomLink);
                user.save((err) => {
                    if(err) {
                        resolve(400)
                    } else {
                        ChatRoomModel.findOne({ roomLink: model.roomLink }, (err, chatroom) => {
                            chatroom.onlineList.push({ username: model.userName, avatar: user.avatar });
                            console.log('chatroom', chatroom)
                            chatroom.save((err) => {
                                err ? resolve(400) : resolve(chatroom.onlineList)
                            });
                        });
                    }
                });
            } else {
                resolve('用户已在群内');
            }
        });
    })
    
}

module.exports = {
    _createUser,
    _findUserByName,
    _insertRoomToUser,
    _getUserList,
    _inviteUser
}