const Koa = require('koa');
const path = require('path');
const cors = require('@koa/cors');
const KoaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');

const Config = require('./config');
const initRouter = require('./router');

function createApp() {
  // 实例化koa
  const app = new Koa();
  // 设置静态资源目录
  app.use(KoaStatic(path.join(__dirname, Config.STATIC_PATH)));
  // 跨域
  app.use(cors());
  // 解析请求体
  app.use(bodyParser());
  // 初始化路由
  initRouter(app);
  // 返回实例
  return app;
}

const run = async () => {
  const app = await createApp()
  app.listen(Config.APP_PORT, () => {
    console.log(`项目已启动，访问地址: http://${Config.APP_HOST}:${Config.APP_PORT}`);
  })
};

// 启动应用
run();