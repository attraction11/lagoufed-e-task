// app/controller/home.js
const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    console.log(this.app.foo)
    console.log(this.ctx.app.foo)
    await this.ctx.render('index.tpl', {
      message: 'World',
    })
  }

  async foo() {
    this.ctx.body = 'foo demo'
  }

  async list() {
    const ctx = this.ctx
    const page = ctx.query.page || 1
    const newsList = await ctx.service.news.list(page)
    await ctx.render('list.tpl', { list: newsList })
  }

  async fetch() {
    const { app, ctx } = this
    const id = ctx.request.query.id
    ctx.response.body = app.cache.get(id)
  }
  
}

module.exports = HomeController
