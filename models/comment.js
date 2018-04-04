const { CommentModel } = require('../config/mongo');

const _createComment = (model) => {
  return new Promise((resolve, reject) => {
    CommentModel.create(model, function (err) {
      if (err) resolve(400);
      resolve(200);
    });
  }).then(code => code);
}

const _findComments = (roomLink) => {
  return new Promise((resolve, reject) => {
    // _id 是根据时间生成的，所以可以根据其来排序
    CommentModel.find({ roomLink }).sort({ _id: 1 }).exec(function (err, data) {
      if (err) resolve(400);
      resolve(data);
    });
  }).then(data => data);
}


module.exports = {
  _createComment,
  _findComments
}