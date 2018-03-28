const { UserModel } = require('../config/mongo');

const createUser = (user) => {
    return UserModel.create(user,function (err) { 
        if(err && err.toString().match('E11000 duplicate key')){
            console.log('用户名已存在');
            return 400;
        }else{
            console.log("insert user success");
        }
    }).then(data => data);
}

module.exports = {
    createUser
}