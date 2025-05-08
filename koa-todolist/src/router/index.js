const KoaRouter = require('koa-router');

function initRouter(app) {
  const router = new KoaRouter();

  router.get('/index', async (ctx, next) => {
    ctx.body = 'hello koa2';
  });

  app.use(router.routes())
}

module.exports = initRouter;