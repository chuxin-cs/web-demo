const Koa = require('koa');
const bodyParser = require('koa-bodyparser');


function createApp() {
  const app = new Koa();
  // 中间件
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