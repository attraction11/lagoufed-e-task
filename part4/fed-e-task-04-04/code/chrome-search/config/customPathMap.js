/****
 * 规则：
 * 中文页面，会根据 page 目录自动生成路由
 * --------  [mapConfig] ---------
 * key 为产品名
 * [rename] 中文产品更名 (实际目录名以英文为标准)
 * [transform] 产品或页面转化为其他语言
 *
 * --------- [include] ---------
 * [include] 手动追加路由表
 *
 * --------- [exclude] ---------
 * [exclude] 手动删除路由表

*/
const glob = require('glob')

const map = {
  mapConfig: { // 在此编辑产品名称即可
    m6: {
      rename: 'meilan6',
      transform: ['en']
    },
    "16s": {
      transform: ['en']
    },
    "16xs": {
      transform: ['en']
    }
  },
  include: {  // 可以手动新增
    '/': { page: '/' }
  },
  exclude: [] // 可以手动新增
}

/** ------------------  以下为 map 表的格式转换处理   ---------------------- **/

let defaultPathMap = {}

const pathList = glob.sync('./pages/**/!(_)*.js').map(c => c.replace('./pages', '').replace(/\.js$/, '.html'))

const mapConfig = map.mapConfig

pathList.forEach(c => {
  //首页
  if (c === '/' || c === '/index.html') return false

  // 目录下的index.html
  if (/\/index\.html$/.test(c)) {
    defaultPathMap[c] = { page: c.replace(/\/index\.html$/, '') }

    // 目录下的index.html
  } else {
    defaultPathMap[c] = { page: c.replace(/\.html$/, '') }
  }

})

// 这一步是针对产品中英文重命名。比如国内 meilan6，国外为m6，由 customPathMap.js 配置
for (let key in defaultPathMap) {
  let pageName = ''
  for (let configKey in mapConfig) {
    /* eslint-disable */
    const pageReg = new RegExp(`/${configKey}[\/|\.]`)
    /* eslint-enable */
    if (pageReg.test(key)) {
      // step-1 新增中文重命名
      if (mapConfig[configKey].rename !== undefined) {
        pageName = key.replace(pageReg, `/${mapConfig[configKey].rename}/`)
        defaultPathMap[pageName] = defaultPathMap[key]
      }
      //step-2 转变国家
      if (mapConfig[configKey].transform !== undefined && mapConfig[configKey].transform.length > 0) {
        mapConfig[configKey].transform.forEach(c => {
          defaultPathMap[`/${c}${key}`] = { ...defaultPathMap[key], pageLang: c }
        })
      }
      //step-3 删除中文已经被重命名的路由
      if (mapConfig[configKey].rename !== undefined) {
        delete defaultPathMap[key]
      }
    }
  }
}

map.exclude.forEach(c => {
  delete defaultPathMap[c]
})

module.exports = {
  ...map.include,
  ...defaultPathMap
}