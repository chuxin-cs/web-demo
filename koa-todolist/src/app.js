const Koa = require('koa');
const path = require('path');
const KoaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

function createApp() {
  // 实例化koa
  const app = new Koa();
  console.log(path.join(__dirname, '../static'),"path.join(__dirname, '../static')")
  // 设置静态资源目录
  app.use(KoaStatic(path.join(__dirname, '../static')));
  // 跨域
  app.use(cors());
  // 解析请求体
  app.use(bodyParser());
  // 返回实例
  return app;
}

const run = async () => {
  const app = await createApp()
  const APP_PORT = process.env.APP_PORT || 3000;
  app.listen(APP_PORT, () => {
    console.log(`项目已启动，访问地址: http://localhost:${APP_PORT}`);
  })
};

// 启动应用
run();