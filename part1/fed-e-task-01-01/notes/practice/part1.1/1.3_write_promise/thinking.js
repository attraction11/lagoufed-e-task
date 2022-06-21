/*
    从Promise的使用，剖析Promise的实现过程
    1、Promise 是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
    2、Promise 中有三种状态，分别是fulfilled 成功   rejected 失败    pending 等待 
       pending -> fulfilled 成功
       pending -> rejected 失败
    3、resolve 和 reject 是用来更改状态的
    resolve: fulfilled 
    reject: rejected
    4、then 方法内部做的的事情就是判断状态 如果调用的状态是成功 调用成功的回调函数 如果状是失败 调用失败的回调
    5、then 成功回调有一个参数 表示成功之后的值 then失败回调有一个参数 表示失败后的原因
    6、当resolve 和 reject 是异步更改状态的时候，执行方法时状态为pending，并状态将如何改变，因此需要将成功、失败的回调函数存储在实例属性中
    7、resolve 和 reject 清楚异步操作何时回调，因此可以在 resolve 和 reject 中执行成功、失败的回调函数
    8、当多次调用 promise 实例的 then 方法时，如果是resolve 和 reject 是同步更改状态没问题，但如果是异步更改状态，就需要依次存储多个成功、失败的回调函数
    9、then方法是可以被链式调用，要实现链式调用，then需要返回一个新的promise，同时需要将上一个then方法中回调函数的返回值，传递给下一个then方法中的回调函数
    10、then方法返回的值，可能是普通值，也可能是一个promise，当为promise时需要调用它的then方法，根据不同的状态执行resolve, reject，将value, reason传给下一个then方法
    11、当then方法中返回的值为一个promise，并且这个promise就是该then方法的返回值时，会发生promise的循环调用，这种情况在执行中会报错的。
    12、这里要处理两个异常，一个是构造函数中执行器的代码执行异常 另一个是then方法回调中的异常
    13、then 方法的参数是可选的，当传递一个参数或者什么都不传，该怎样处理呢？
    14、promise 对象上有一个静态方法all，用于批量执行promise ，并接收返回的结果数组，若其中一个失败，则调用失败回调函数，只有全部执行成功，才调用成功回调函数。
        还有一点就是promise.all的返回值是promise
    15、promise 对象上有一个静态方法resolve, 用于将给定的值转换为promise对象, 然后将转换后的promise对象作为方法的返回值，最后可以调用 then 方法拿到返回值
    16、promise 对象上有一个实例方法finally, 用法是无论promise对象的执行结果是成功或失败，finally方法都会被执行。
        在finally方法后面可以链式的调用then方法，拿到promise对象的执行结果
    17、promise 对象上有一个实例方法catch, 用于处理当前的promise对象的失败回调，实现思路是通过then 方法间接实现catch 方法，then方法的第一个参数传递undefined,第二个传回调函数

*/
const MyPromise = require('./realize_promise.js')

// 测试：1~12
// let promise = new MyPromise((resolve, reject) => {
//     // setTimeout(() => {
//     //     resolve('成功')
//     //     // reject('失败')
//     // }, 3000)
//     throw new Error('execute error') // 构造函数中执行器的代码执行异常
//     // resolve('成功')
//     // reject('失败')
// })

// let other = function () { 
//     return new MyPromise((resolve, reject) => { 
//         resolve('other')
//     })
// }

// promise.then(value => {
//     console.log('value', value)
//     // throw new Error('value then error') // then方法回调中的异常
//     return 'aaa'
// }, reason => {    
//     console.log('reason', reason)
// }).then(value => {
//     console.log('value', value)
// }, reason => {
//     // console.log('aaa')
//     console.log('reason', reason)
// })


// 13、then 方法的参数是可选的
// promise.then().then().then(value => console.log(value), reason => console.log(reason.message))


// 14、promise all方法
function p1 () {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('p1 resolve')
        }, 2000)
    })
}

function p2 () {
    return new MyPromise((resolve, reject) => {
        // reject('p2 reject')
        resolve('p2 resolve')
    })
}
// MyPromise.all(['a', 'b', p1(), p2(), 'c']).then(result => console.log(result))


// 15、promise resolve方法
// MyPromise.resolve(100).then(value => console.log(value))
// MyPromise.resolve(p1()).then(value => console.log(value))


// 16、promise finally方法
p2().finally(() => {
    console.log('finally')
    return p1()
}).then(value => {
    console.log(value)
}, reason => {
    console.log(reason)
})

// 17、promise catch方法
p2().then(value => console.log(value))
    .catch(value => console.log(value))
