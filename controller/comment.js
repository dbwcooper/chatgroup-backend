
const { _findRoomByLink } = require('../models/room');

const { _createComment, _getRoomDetailByLink } = require('../models/comment');


/**
 * 增加一条评论
 *  userName: 'George James',
 *  roomLink: 
 *  avatar: { color: '#1890ff', alif: 'C' },
 *  moment: 1521300207000,
 *  content: '<span style="color: red">12321332</span>',
 *  md: true
 * @param {*} ctx 
 */
const createComment = async (ctx) => {
  
  let roomLink = ctx.params.roomLink; //拿到房间名
  let model = ctx.request.body;
  let result = {};
  model.roomLink = roomLink;
  // 先查询看是否存在roomLink

  console.log('createComment');
  let data = await _findRoomByLink(roomLink);
  if (data === 400 || !data.roomLink) {
    result.code = 400;
    result.msg = "聊天室不存在!";
    ctx.response.body = result;
  }

  let code = await _createComment(model);
  if(code === 400) {
    result.code = 400;
    result.msg = "评论失败!";
  } else {
    result.code = 200;
    result.msg = "评论成功";
  }
  ctx.response.body = result;
}

// 根据roomLink 找到所有的评论 以时间降序
const getRoomDetailByLink = async (ctx) => {
  let roomLink = ctx.params.roomLink; //拿到房间名
  let data = await _getRoomDetailByLink(roomLink);
  let result = {};
  if (data === 400) {
    result.code = 400;
    result.msg = "获取失败";
  } else {
    result.code = 200;
    result.msg = "获取成功";
    result.data = data;
  }
  ctx.response.body = result;
}

module.exports = {
  createComment,
  getRoomDetailByLink
}

