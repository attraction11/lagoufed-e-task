// 在实际应用中，Controller 一般不会自己产出数据，也不会包含复杂的逻辑，
// 复杂的过程应抽象为业务逻辑层 Service。
const Service = require('egg').Service

class NewsService extends Service {
  async list(page = 1) {
    // read config
    // const { serverUrl, pageSize } = this.config.list

    // use build-in http client to GET hacker-news api
    // const newsList = await this.ctx.curl(`${serverUrl}/topstories.json`)
    const newsList = [
      {
        url: 'xx',
        title: '22',
        time: 1641018060000,
      },
      {
        url: 'yy',
        title: '22',
        time: 1641018060000,
      },
      {
        url: 'zz',
        title: '33',
        time: 1641018060000,
      },
    ]

    return newsList
  }
}

module.exports = NewsService
