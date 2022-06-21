module.exports = (app) => {
  // app 是 Egg.js 的应用实例
  const { router, controller } = app

  // 配置路由规则
  router.get('/', controller.home.index)
  router.get('/foo', controller.home.foo)
  router.get('/list', controller.home.list)
}
