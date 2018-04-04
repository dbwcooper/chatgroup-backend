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

module.exports = {
    _createUser,
    _findUserByName
}