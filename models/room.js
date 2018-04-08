const { ChatRoomModel, UserModel, CommentModel } = require('../config/mongo');
const { _insertRoomToUser } = require('../models/user');

/**
 * 创建一个聊天室， 创建成功后在对应的用户表的roomList增加一个room对象 包括{ roomLink, title }
 * @param {} model 
 */
const createRoom = (model) => {
    let userName = model.userName;
    let createRoom_ = new Promise(function (resolve, reject) {
        ChatRoomModel.create(model, function (err) {
            if (err && err.errmsg.match('E11000 duplicate key')) {
                reject('该聊天室已存在');
            } else {
                resolve()
            }
        });
    });
    let insertRoomToUser_ = new Promise(function (resolve, reject) {
        UserModel.findOne({ userName }, function (err, user) {
            if (err || !user){
                reject('用户不存在');
            } else {
                let userModel = user.toObject();
                user.roomList.push(model.roomLink);
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

const _findRoomsByTitle = (reg) => {
    // { title: { $regex: title }模糊查询
     // let _filter = {
    //     roomLink: { $regex: reg },
    // };
    // 多条件模糊查找 
    let _filter = {
        $or: [ //多条件，数组
            { roomLink: { $regex: reg } },
            { title: { $regex: reg } }
        ]
    }
    // 指定返回的列
    let rows = 'title roomLink';
    return new Promise((resolve, reject) => {
        ChatRoomModel.find(_filter, rows, function (err, list) {
            err ? resolve(400) : resolve(list);
        });
    }).then(list => list);
}

/**
 * 根据roomLink 返回room信息
 * @param {*} roomLink
 */
const _findRoomByLink = (roomLink) => {
    return new Promise((resolve, reject) => {
        // chatroom仍然有schema限制
        ChatRoomModel.findOne({ roomLink }, function (err, chatroom) {
            if (err || !chatroom){
                resolve(400)
            }else {
                CommentModel.find({ roomLink }, 'avatar content md moment userName').sort({ _id: 1 }).exec(function (err, converseList) {
                    if (err) resolve(400);
                    // 转换为一个新的不受Schema约束的对象
                    let result = chatroom.toObject();
                    result.converseList = converseList;
                    delete result._id;
                    delete result.__v;
                    delete result.userName;
                    // 删除不必要的信息
                    resolve(result);
                });
            }
        });
    }).then(chatroom => chatroom)
}

/**
 * 根据用户名返回roomList
 * @param {*} userName 
 */
const _getRoomMenu = (userName) => {
    // 默认用户 admin
    if(!userName) userName = "admin";
    return new Promise((resolve, reject) => {
        UserModel.findOne({ userName }, 'roomList', function (err, data) {
            if (err || !data) {
                reject(400);
            }else{
                data.roomList ? resolve(data.roomList) : resolve([])
            }
        });
    }).then(roomList => roomList)
}

module.exports = {
    createRoom,
    _findRoomsByTitle,
    _findRoomByLink,
    _getRoomMenu
}