// // 导入模块成员
// import _ from 'lodash-es'
// import { log } from './logger'
// import messages from './messages'
// import { name, version } from '../package.json'
// import cjs from './cjs-module'

// // 使用模块成员
// const msg = messages.hi

// log(name)
// log(version)
// log(_.camelCase('hello world'))
// log(cjs)



// import('./logger').then(({ log }) => {
//     log('code splitting~')
// })



import fetchApi from './fetch'
import { log } from './logger'

fetchApi('/posts').then(data => {
  data.forEach(item => {
    log(item)
  })
})
