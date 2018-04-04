const { ChatRoomModel } = require('../config/mongo');

const createRoom = (model) => {
    return new Promise((resolve, reject) => {
        ChatRoomModel.create(model, function (err) {
            if (err && err.errmsg.match('E11000 duplicate key')) {
                resolve(400);
            }
            resolve(200)
        });
    }).then(code => code);
}

const _findRoomsByTitle = (title) => {
    // { title: { $regex: title }模糊查询
    let _filter = {
        title: { $regex: title },
    };
    // 指定返回的列
    let rows = 'title roomLink';
    return new Promise((resolve, reject) => {
        ChatRoomModel.find(_filter, rows, function (err, list) {
            if (err) resolve(400);
            resolve(list);
        });
    }).then(list => list);
}

/**
 * 根据_id 返回room信息
 * @param {*} _id 
 */
const _findRoomByLink = (roomLink) => {
    console.log('_findRoomByLink', roomLink);
    return new Promise((resolve, reject) => {
        ChatRoomModel.findOne({ roomLink }, function (err, chatroom) {
            if (err) resolve(400);
            resolve(chatroom);
        });
    }).then(chatroom => chatroom)
}

module.exports = {
    createRoom,
    _findRoomsByTitle,
    _findRoomByLink
}