/*
尽可能还原 Promise 中的每一个 API, 并通过注释的方式描述思路和原理.
*/
/*
    从Promise的用法中剖析Promise的实现过程
    1、Promise 是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
    2、Promise 中有三种状态，分别是fulfilled 成功   rejected 失败    pending 等待 
       pending -> fulfilled 成功
       pending -> rejected 失败
    3、resolve 和 reject 是用来更改状态的; 设置对象的结果的
    resolve: fulfilled 
    reject: rejected
    4、then 方法内部做的的事情就是判断状态 如果调用的状态是成功 调用成功的回调函数 如果状是失败 调用失败的回调
    5、then 成功回调有一个参数 表示成功之后的值 then失败回调有一个参数 表示失败后的原因
    6、当resolve 和 reject 是异步更改状态的时候，执行方法时状态为pending，并状态将如何改变，因此需要将成功、失败的回调函数存储在实例属性中
    7、resolve 和 reject 清楚异步操作何时回调，因此可以在 resolve 和 reject 中执行成功、失败的回调函数
    8、当多次调用 MyPromise 实例的 then 方法时，如果是resolve 和 reject 是同步更改状态没问题，但如果是异步更改状态，就需要依次存储多个成功、失败的回调函数
    9、then方法是可以被链式调用，要实现链式调用，then需要返回一个新的MyPromise，同时需要将上一个then方法中回调函数的返回值，传递给下一个then方法中的回调函数
    10、then方法返回的值，可能是普通值，也可能是一个MyPromise，当为MyPromise时需要调用它的then方法，根据不同的状态执行resolve, reject，将value, reason传给下一个then方法
    11、当then方法中返回的值为一个MyPromise，并且这个MyPromise就是该then方法的返回值时，会发生MyPromise的循环调用，这种情况在执行中会报错的。
    12、这里要处理两个异常，一个是构造函数中执行器的代码执行异常 另一个是then方法回调中的异常
    13、处理then方法中不同的状态下兼容异步操作
    14、then 方法的参数是可选的，当传递一个参数或者什么都不传，该怎样处理呢？
    15、promise 对象上有一个静态方法all，用于批量执行promise ，并接收返回的结果数组，若其中一个失败，则调用失败回调函数，只有全部执行成功，才调用成功回调函数。
*/

// 2、Promise 中有三种状态，分别是fulfilled 成功   rejected 失败    pending 等待 
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 1.1、Promise是一个类
class MyPromise {
    // 1.2、在执行类的时候需要传入一个执行器，执行器会立即执行
    constructor(exexcutor) {
        // 12.1、处理两个异常之一：构造函数中执行器的代码执行异常
        try {
            // 3.1、resolve 和 reject 的作用是更改对象的状态; 设置对象的结果
            exexcutor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }
    status = PENDING
    value = undefined
    reason = undefined
    // 13.2、如果是异步更改状态，就需要依次存储多个成功、失败的回调函数(同步也兼容)
    successCallFn = []
    failureCallFn = []
    // 7.1、resolve 和 reject 清楚异步操作何时回调，因此可以在 resolve 和 reject 中执行成功、失败的回调函数
    resolve = (value) => {
        // 3.2、由于pending -> fulfilled 成功   pending -> rejected 失败
        if (this.status !== PENDING) return
        this.status = FULFILLED
        this.value = value
        // 13.4、异步操作完成后，依次调用之前储存的回调函数
        while (this.successCallFn.length) this.successCallFn.shift()()
    }
    reject = (reason) => {
        if (this.status !== PENDING) return
        this.status = REJECTED
        this.reason = reason
        while (this.failureCallFn.length) this.failureCallFn.shift()()
    }
    // 13.1、处理then方法中不同的状态下兼容异步操作
    then = (successCallFn, failureCallFn) => {
        // 14、then 方法的参数是可选的，当传递一个参数或者什么都不传，该怎样处理呢？
        successCallFn = successCallFn ? successCallFn : value => value
        failureCallFn = failureCallFn ? failureCallFn : reason => { throw reason }
        // 9.1、then方法是可以被链式调用，要实现链式调用，then需要返回一个新的MyPromise
        let promise2 = new MyPromise((resolve, reject) => {
            // 4.1、then 方法内部做的的事情就是判断状态
            // 4.2、如果调用的状态是FULFILLED,调用成功回调函数 如果状态是REJECTED，调用失败回调函数
            if (this.status === FULFILLED) {
                // 13.3、 异步执行获取promise2实例
                setTimeout(() => {
                    // 12.1、处理两个异常之二：then方法回调中的异常
                    try {
                        // 5.1、成功回调有一个参数是this.value，它是resolve设置的对象结果
                        // 10.1、then方法返回的值，可能是普通值，也可能是一个MyPromise,封装一个函数paserPomiseX处理
                        let x = successCallFn(this.value)
                        paserPomiseX(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)

            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        // 5.2、失败回调有一个参数是this.reason，它是reject设置的原因结果
                        let x = failureCallFn(this.reason)
                        paserPomiseX(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)

            } else if (this.status === PENDING) { // 当前状态为pending，状态该如何改变？
                this.successCallFn.push(() => {
                    // 6.1、当resolve 和 reject 是异步更改状态的时候，执行方法时状态为pending
                    setTimeout(() => {
                        try {
                            let x = successCallFn(this.value)
                            paserPomiseX(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.failureCallFn.push(() => {
                    setTimeout(() => {
                        try {
                            let x = failureCallFn(this.reason)
                            paserPomiseX(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }
    // 17、不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。
    finally = (callFn) => {
        // 17.1、通过this.then拿到实例对象的状态
        return this.then(value => {
            return this.resolve(callFn()).then(() => value)
        }, reason => {
            return this.reject(callFn()).then(() => reason)
        })
    }
    // 18、用于指定发生错误时的回调函数，Promise对象具有’冒泡‘性质，会一直向后传递，直到被捕获为止。即错误总会被下一个catch语句捕获。
    catch = (failureCallFn) => {
        return this.then(undefined, failureCallFn)
    }
    // 15、promise 对象上有一个静态方法all，用于批量执行promise ，并接收返回的结果数组，若其中一个失败，则调用失败回调函数，只有全部执行成功，才调用成功回调函数。
    static all(array) {
        let index = 0
        let result = []
        // 15.2、Mypromise.all 返回结果是一个Mypromise对象
        return new MyPromise((resolve, reject) => {
            // 15.3、定义一个变更结果数组的函数
            function addData(key, value) {
                result[key] = value
                index++
                // 15.4、判断数组中promise对象都执行结束
                if (index === array.length) {
                    resolve(result)
                }
            }
            for (let i = 0; i < array.length; i++) {
                const current = array[i]
                // 15.1、判断数组中单个元素是否为MyPromise
                if (current instanceof MyPromise) {
                    current.then(value => addData(i, value), reason => reject(reason))
                } else {
                    // 普通值
                    addData(i, array[i])
                }
            }
        })
    }
    // 16、Promise对象上有一个静态方法resolve，用于将现有对象转换为Promise对象，从而控制异步流程。
    static resolve(value) {
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }

    static reject(value) {
        if (value instanceof MyPromise) return value;
        return new Mypromise(undefined, reject => reject(value))
    }
}

function paserPomiseX(promise2, x, resolve, reject) {
    // 11.1、当then方法中返回的值为一个MyPromise，并且这个MyPromise就是该then方法的返回值时，会发生MyPromise的循环调用，这种情况在执行中会报错的。
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
        return
    }
    if (x instanceof MyPromise) {
        // 10.2、当为MyPromise时需要调用它的then方法，根据不同的状态执行resolve, reject，将value, reason传给下一个then方法
        x.then(resolve, reject)
    } else {
        // 10.3、then方法返回的值是普通值
        resolve(x)
    }
}









// 测试MyPromise功能
// let p1 = new MyPromise((resolve, reject) => {
//     // setTimeout(() => {
//     //     resolve('成功')
//     //     // reject('失败')
//     // }, 1000)
//     // resolve('成功')
//     reject('失败')
// })

// let p2 = new MyPromise((resolve, reject) => {
//     // setTimeout(() => {
//     //     resolve('成功')
//     //     // reject('失败')
//     // }, 1000)
//     resolve('成功')
//     // reject('失败')
// })

// p2.then(value => {
//     console.log('value1', value)
//     return p1
// }, reason => {
//     console.log('reason1', reason)
// }).then(value => {
//     console.log('value2', value)
// }, reason => {
//     console.log('reason2', reason)
// })

// MyPromise.all([p1, p2, 'c']).then(result => console.log(result))



















