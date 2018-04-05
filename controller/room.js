
const {
    createRoom,
    _findRoomsByTitle,
    _findRoomByLink,
    _getRoomMenuByName
} = require('../models/room');

/**
 * 创建一个群聊 x-access-token, 
 * body = { 
 *  title: 聊天室的描述信息
 *  roomLink: 聊天室链接只能英文
 *  annoucement: 聊天室公告，
 *  userName: 用户名
 * }
 */
const create =  async (ctx) => {
    let model = ctx.request.body;
    let result = {};
    if(!model.roomLink) {
        result.code = 400;
        result.msg = "请检查聊天室名";
        ctx.response.body = result;
    }

    let data = await createRoom(model);
    if (data === 200){
        result.code = 200;
        result.msg = '创建成功!';
    }
    else{
        result.code = 400;
        result.msg = data;
    }
    // ctx.response.statusCode = 200;
    ctx.response.body = result;
    // console.log(ctx.response);
}

/**
 * 根据输入额chatroom 进行模糊搜索并返回一个chatroom数组
 */
const findRoomsByTitle = async (ctx) => {
    let title = ctx.params.title;
    let result = {};
    if(!title) {
        result.code = 400;
        result.msg = "请输入title";
        ctx.response.body = result;
    }

    let data = await _findRoomsByTitle(title);
    if(data === 400) {
        result.code = 400;
        result.msg = "服务器异常";
    } else {
        result.code = 200;
        result.msg = "查询成功";
        result.data = data;
    }
    ctx.response.body = result;
}

/**
 * 根据roomLink 返回一条chatroom数据
 */
const findRoomByLink = async (ctx) => {
    let roomLink = ctx.params.roomLink;
    let result = {};
    if (!roomLink) {
        result.code = 400;
        result.msg = "请输入title";
        ctx.response.body = result;
    }
    
    let data = await _findRoomByLink(roomLink);
    if (data === 400) {
        result.code = 400;
        result.msg = "服务器异常";
    } else {
        result.code = 200;
        result.msg = "查询成功";
        result.data = data;
    }
    ctx.response.body = result;
}

const getRoomMenuByName = async (ctx) => {
    let userName = ctx.request.body.userName;
    let result = {};
    let data = await _getRoomMenuByName(userName);
    if (data === 400) {
        result.code = 400;
        result.msg = "服务器异常";
    } else {
        result.code = 200;
        result.msg = "查询成功";
        result.data = data;
    }
    ctx.response.body = result;
}

module.exports= {
    create,
    findRoomByLink,
    findRoomsByTitle,
    getRoomMenuByName
}

