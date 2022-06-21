// // 组合函数的使用
// const _ = require('lodash')
const toUpper = s => s.toUpperCase()
const reverse = arr => arr.reverse()
const first = arr => arr[0]

// flowRight组合函数的模拟
// function compose (...args) {
//     return function (value) {
//         // 从右向左依次执行函数，并将执行结果作为下个函数的参数传入, 最后将结果返回     
//         return args.reverse().reduce(function (acc, fn) {
//             return fn(acc)
//         }, value) // 设置初始值为传入的参数
//     }
// }

const compose = (...args) => value => args.reverse().reduce((acc, fn) => { return fn(acc) }, value)
const f = compose(toUpper, first, reverse)
console.log(f(['one', 'two', 'three'])) // THREE