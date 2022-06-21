// -------------------1、模块导入区别-------------------------
// ES Module中可以导入CommonJS模块
// import mod from './common.js'
// console.log(mod)

// 不能直接提取成员 注意import不是结构导出对象
// CommonJS does not support named exports
// import { foo } from './common.js'
// console.log(foo)

// export const foo = 'es module module value'


// -------------------2、使用差异-------------------------
// 加载模块函数
// import 'xxx'

// 导出对象别名
// export var yy = 'xxx'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

// 当前文件的绝对路径
const __filename = fileURLToPath(import.meta.url)
console.log(__filename) 

// 当前文件所在目录
const __dirname = dirname(__filename)
console.log(__dirname) 
