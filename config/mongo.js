const mongoose =  require('mongoose');
const config = require('./index');

mongoose.Promise = require('bluebird')


const db = mongoose.connection;
mongoose.connect(config.mongodb, {
    auth:{
        user: 'dbwcooper',
        password: 'dbwcooper',
    }}, function (err, db) {
        console.log('err:' , err)
        db.close();
    });

db.on('error',function () {
    console.log("connect failed!");
});

db.once('open', function () {
   console.log('connect success !');
});

