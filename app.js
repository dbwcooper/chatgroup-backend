const Koa = require('koa2');
const WebSocket = require('ws');
//koa无法解析http请求体中的数据，这时我们需要引入另外一个模块叫做koa-bodyparser
const koaBody = require('koa-body');
// 跨域模块 如果不设置 使用fetch 将会报错为 type: "opaque"
const cors = require('koa2-cors');
// 后台api 路由 
const router = require('./controller');
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

wss.broadcast = function broadcast(data){
  console.log('wss.clients', wss.clients)
  wss.clients.forEach(client => {
    if(client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
wss.on('open', (req) => {
  console.log('req', req);
})
wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    // 将得到的数据存入数据库 这里是一条聊天室信息
    console.log('data', data);
    let result = {
      code: 200,
      msg: 'success'
    }
    
    setTimeout(() => {
      ws.send(JSON.stringify(result));
    }, 1000);
  })
})






















