exports.task = async (ctx) => {
  await ctx.service.posts.refresh()
}
