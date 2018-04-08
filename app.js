const Koa = require('koa2');
const WebSocket = require('ws');
//koa无法解析http请求体中的数据，这时我们需要引入另外一个模块叫做koa-bodyparser
const koaBody = require('koa-body');
// 跨域模块 如果不设置 使用fetch 将会报错为 type: "opaque"
const cors = require('koa2-cors');
// 后台api 路由 
const router = require('./controller');
const { createComment } = require('./controller/comment');
const app = new Koa();


app.use(cors())
  .use(koaBody())
  // 打入router  这是必须使用的
  .use(router.routes())
  .use(router.allowedMethods())

let server = app.listen(8001, () => {
  console.log('app start at port 8001...');
});

const wss = new WebSocket.Server({ server, path: '/comment'});

//广播所有websocket用户

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
// 还未做权限
wss.on('connection', function connection(ws) {
  ws.on('message', async function incoming(comment) {
    let result = await createComment(comment);
    if(result.code === 200) {
      // 传递给所有连接的客户端
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(comment);
        }
      });
    } else {
      // 返回状态码
      ws.send(JSON.stringify(result), () => {
        console.log('发送成功', result);
      });
    }
  });
});
wss.on('open', (req) => {
  console.log('服务端启动成功');
})





















