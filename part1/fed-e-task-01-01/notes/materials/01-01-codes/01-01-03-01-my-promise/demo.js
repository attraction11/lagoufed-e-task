const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function paserPomiseX(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
        return
    }
    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}

class MyPromise {
    constructor(executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }

    status = PENDING
    value = undefined
    reason = undefined
    successCallFn = []
    failureCallFn = []

    resolve = (value) => {
        // console.log('this: ', this);
        if (this.status === PENDING) {
            this.status = FULFILLED
            this.value = value
        }
        while (this.successCallFn.length) this.successCallFn.shift()()
    }

    reject = (reason) => {
        // console.log('this: ', this);
        if (this.status === PENDING) {
            this.status = REJECTED
            this.reason = reason
        }
        while (this.failureCallFn.length) this.failureCallFn.shift()()
    }

    then = (successCallFn, failureCallFn) => {
        successCallFn = successCallFn ? successCallFn : value => value
        failureCallFn = failureCallFn ? failureCallFn : value => value
        let promise2 = new MyPromise((resolve, reject) => {
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

            } else { // 当前状态为pending，状态该如何改变？
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

    finally = (callFn) => {
        return this.then(value => {
            return this.resolve(callFn()).then(() => value)
        }, reason => {
            return this.reject(callFn()).then(() => reason)
        })
    }
    catch = (failureCallFn) => {
        return this.then(undefined, failureCallFn)
    }

    static all(array) {
        let index = 0
        let result = []
        return new MyPromise((resolve, reject) => {
            function addData(key, data) {
                result[key] = data
                index++
                if (index === array.length) {
                    resolve(result)
                }
            }
            for (let i = 0; i < array.length; i++) {
                const current = array[i];
                if (current instanceof MyPromise) {
                    current.then(value => addData(i, value), reason => reject(reason));
                } else {
                    addData(i, array[i]);
                }
            }
        })
    }

    static resolve(value) {
        if (value instanceof MyPromise) return value;
        return new MyPromise(resolve => resolve(value))
    }

    static reject(value) {
        if (value instanceof MyPromise) return value;
        return new MyPromise((resolve, reject) => reject(value))
    }
}


// 测试MyPromise功能
let p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功')
        // reject('失败')
    }, 1000)
    // resolve('成功')
    // reject('失败')
})

let p2 = new MyPromise((resolve, reject) => {
    // setTimeout(() => {
    //     resolve('成功')
    //     // reject('失败')
    // }, 1000)
    resolve('成功')
    // reject('失败')
})


let p3 = MyPromise.resolve('成功')
let p4 = MyPromise.reject('失败')

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

MyPromise.all([p1, p2, p3, 'c'])
    .then(result => console.log(result), reason => console.log(reason))
