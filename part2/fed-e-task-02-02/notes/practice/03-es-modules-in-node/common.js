// -------------------1、模块导入区别-------------------------
// CommonJS 模块始终只会导出一个默认成员
// 写法一
// module.exports = { foo: 'value' }
// 写法二
// exports.foo = 'CommonJS module value'

// 不能在 CommonJS 模块中通过require载入ES Module
// const mod = require('./es-module.mjs')
// console.log(mod)


// -------------------2、使用差异-------------------------
// 加载模块函数
console.log(require)

// 模块对象
console.log(module)

// 导出对象别名
console.log(exports)

// 当前文件的绝对路径
console.log(__filename)

// 当前文件所在目录
console.log(__dirname)

