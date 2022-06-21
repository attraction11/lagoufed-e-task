// const _ = require('lodash')
// // 为了避免声明变量，直接将纯函数匿名后传递给curry
// const match = _.curry(function (reg, str) {
//     return str.match(reg)
// })
// // 通过函数柯里化生成了新函数
// const haveSpace = match(/\s+/g)
// const haveNumber = match(/\d+/g)
// // 测试
// console.log(haveSpace('hello world')) // [ ' ' ]
// console.log(haveNumber('1234abc')) // [ '1234' ]
// console.log(haveNumber('abc')) // null


// const _ = require('lodash')
// // 为了避免声明变量，直接将纯函数匿名后传递给curry
// const match = _.curry(function (reg, str) {
//     return str.match(reg)
// })
// // 通过函数柯里化生成了新函数
// const haveSpace = match(/\s+/g)
// const haveNumber = match(/\d+/g)
// // 定义lodash函数柯里化的纯函数
// const filter = _.curry(function (func, array) {
//     return array.filter(func)
// })
// // 给柯里化的纯函数传递2个参数
// console.log(filter(haveSpace, ['John Connor', 'Tom'])) // [ 'John Connor' ]
// console.log(filter(haveSpace, ['Hello World', 'Kate'])) // [ 'Hello World' ]


const _ = require('lodash')
// 为了避免声明变量，直接将纯函数匿名后传递给curry
const match = _.curry(function (reg, str) {
    return str.match(reg)
})
// 通过函数柯里化生成了新函数
const haveSpace = match(/\s+/g)
const haveNumber = match(/\d+/g)
// 定义lodash函数柯里化的纯函数
const filter = _.curry(function (func, array) {
    return array.filter(func)
})
const findSpace = filter(haveSpace)
console.log(findSpace(['John Connor', 'Tom'])) // [ 'John Connor' ]
console.log(findSpace(['Hello World', 'Kate'])) // [ 'Hello World' ]