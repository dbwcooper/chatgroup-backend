const Koa = require('koa2');
//koa无法解析http请求体中的数据，这时我们需要引入另外一个模块叫做koa-bodyparser
const koaBody = require('koa-body');
// 跨域模块 如果不设置 使用fetch 将会报错为 type: "opaque"
const cors = require('koa2-cors');
// 后台api 路由 
const router = require('./controller');
// mysql 配置
const app = new Koa();

app.use(cors())
  .use(koaBody())
  // 打入router  这是必须使用的
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8001, () => {
  console.log('app start at port 8001...');
});
