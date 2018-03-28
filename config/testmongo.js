const mongoose =  require('mongoose');
const config = require('./index');
const UserModel = require('../models/user');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird')

var options = {  
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
    
    // var UserModel = db.model('User',new Schema({
    //     username: {
    //         type: String,
    //         unique: true,
    //         require: true,
    //     },
    //     password: {
    //         type: String,
    //         require: true,
    //     },
    //     avatar: Schema.Types.Mixed, // 混合类型
    //     moment: {
    //         type: Date,
    //         default: Date.now(),
    //     },
    // }));
});

var UserModels = conn.model('User');

const user = {
    username: 'cooper',
    password: '123456'
}
UserModels.create(user,function (err) {
    if(err){
        console.log(err); 
    }else{
        console.log(" 哈哈哈 成功了");
    }
});

module.exports = conn;
