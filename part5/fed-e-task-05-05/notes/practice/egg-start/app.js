module.exports = (app) => {
  app.cache = new Cache()

  app.beforeStart(async () => {
    const ctx = app.createAnonymousContext()
    // preload before app start
    await ctx.service.posts.load()
  })
}
