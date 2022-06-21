// var test = () => {
//     let obj = new Object() // 调用了Object函数
//     obj.name = 'aaa'
//     obj.age = 20
//     obj.slogan = 'xxxxxxxxxxxx'
//     return obj
// }

var test = () => {
    let obj = {
        name: 'aaa',
        age: 20,
        slogan: 'xxxxxxxxxxxx'
    }
    return obj
}

console.log(test())


// 基本数据类型，
var str1 = 'xxxxxxxxxxxx'
var str2 = new String('xxxxxxxxxxxx')

console.log(str1)
console.log(str2)

// 在执行方法前会将str1转为一个对象
// 即使不转它也是String对象的一个实例，按照原型链也可以找到scice方法
str1.slice()