// // 回顾lodash中curry方法的使用
// // const _ = require('lodash')
// // 需要柯里化的函数
// function sum (a, b, c) {
//     return a + b + c
// }
// // 柯里化后的函数
// let curried = curry(sum)
// console.log(curried(1, 2, 3)) // 6
// console.log(curried(1, 2)(3)) // 6
// console.log(curried(1)(2)(3)) // 6
// // curry函数可以将任意多元函数转化为一元函数


// 模拟实现curry方法
function curry (func) {
    return function curriedFn(...args) {
        // 判断实参的个数（args.length）是否小于形参的各个数（func.length）
        // 当条件不满足时，说明func需要的参数已经满足，执行func(...args)
        if (args.length < func.length) {
            return function () {                
                // args是闭包中的变量，它保存了函数上一次的传参
                // arguments则是本次调用的传参，两者合并就是累计传参
                // 这里内层函数需要调用外层函数，传入合并后的累计参数
                // 因此给外层函数定义名称为curriedFn，方便调用
                return curriedFn(...args.concat(Array.from(arguments)))
            }
        }
        return func(...args)
    }
}
// 测试功能（通过）
let curried = curry(sum)
console.log(curried(1, 2, 3)) // 6
console.log(curried(1, 2)(3)) // 6