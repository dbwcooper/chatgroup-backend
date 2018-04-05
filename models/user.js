const { UserModel } = require('../config/mongo');
const Mongoose = require('mongoose');

const _createUser = (model) => {
    // console.log('user', model);
    // model._id = Mongoose.Types.ObjectId();
    // console.log('model', model);
    return new Promise((resolve, reject) => {
        UserModel.create(model, function (err) {
            if (err && err.toString().match('E11000 duplicate key')) {
                resolve(400);
            }
            console.log('err', err);
            resolve(200)
        })
    }).then(code => code);
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

module.exports = {
    _createUser,
    _findUserByName,
    _insertRoomToUser
}