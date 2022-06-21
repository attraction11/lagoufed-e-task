// // 纯函数(有硬编码，将通过柯里化解决)
// function checkAge (age) {
//     let mini = 18
//     return age >= mini
// }

// 普通的纯函数
// function checkAge (min, age) {
//     return age >= min
// }
// console.log(checkAge(18, 20))
// console.log(checkAge(18, 22))
// console.log(checkAge(18, 24))
// 存在场景问题：以18岁为基准的函数调用经常使用，min = 18 需要重复定义

// 通过闭包和高阶函数解决场景问题
// function checkAge (min) {
//     return function (age) {
//         return age >= min
//     }
// }
// ES6实现上述函数
let checkAge = min => (age => age >= min)

// 基准值在闭包中只定义一次
let checkAge18 = checkAge(18) 
let checkAge20 = checkAge(20)
console.log(checkAge18(20))
// 总结：函数柯里化是当函数存在多个参数的时候，如：checkAge (min, age)，
// 通过闭包与高阶函数结合使用，调用一个函数只传递部分参数(这部分参数以后永远不变，如：18)
// 并且返回一个函数去接收剩余的参数，并且返回相应的结果