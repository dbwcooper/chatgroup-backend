const { ChatRoomModel, UserModel } = require('../config/mongo');
const { _insertRoomToUser } = require('../models/user');

/**
 * 创建一个聊天室， 创建成功后在对应的用户表的roomList增加一个room对象 包括{ roomLink, title }
 * @param {} model 
 */
const createRoom = (model) => {
    let room = {
        roomLink: model.roomLink,
        title: model.title
    }
    let userName = model.userName;
    let createRoom_ = new Promise(function (resolve, reject) {
        ChatRoomModel.create(model, function (err) {
            if (err && err.errmsg.match('E11000 duplicate key')) {
                reject('该聊天室已存在');
            }
            resolve()
        });
    });
    let insertRoomToUser_ = new Promise(function (resolve, reject) {
        UserModel.findOne({ userName }, function (err, user) {
            if (err || !user){
                reject('用户不存在');
            }
            else {
                user.roomList.push(room);
                user.save(function (err, user) {
                    if (err) reject('用户数据库异常');
                    resolve()
                })
            }
        });
    });
    return Promise.all([createRoom_, insertRoomToUser_])
        .then(() => 200)
        .catch(msg => msg)
}

const _findRoomsByTitle = (title) => {
    // { title: { $regex: title }模糊查询
    let _filter = {
        title: { $regex: title },
    };
    // 指定返回的列
    let rows = 'title roomLink annoucement';
    return new Promise((resolve, reject) => {
        ChatRoomModel.find(_filter, rows, function (err, list) {
            if (err) resolve(400);
            resolve(list);
        });
    }).then(list => list);
}

/**
 * 根据roomLink 返回room信息
 * @param {*} roomLink
 */
const _findRoomByLink = (roomLink) => {
    return new Promise((resolve, reject) => {
        ChatRoomModel.findOne({ roomLink }, function (err, chatroom) {
            if (err) resolve(400);
            resolve(chatroom);
        });
    }).then(chatroom => chatroom)
}

/**
 * 根据用户名返回roomList
 * @param {*} userName 
 */
const _getRoomMenuByName = (userName) => {
    // 默认用户
    if(!userName) userName = "cooper";
    console.log('userName', userName);
    return new Promise((resolve, reject) => {
        UserModel.find({ userName }, 'roomList', function (err, roomMenu) {
            if (err) resolve(400);
            if (roomMenu[0].roomList.length === 0) {
                UserModel.find({ userName: 'cooper' }, 'roomList', function (err, roomMenu) {
                    if (err) resolve(400);
                    resolve(roomMenu[0].roomList);
                });
            } else {
                resolve(roomMenu[0].roomList);
            }
        });
    }).then(roomMenu => roomMenu)
}

module.exports = {
    createRoom,
    _findRoomsByTitle,
    _findRoomByLink,
    _getRoomMenuByName
}