const PENGING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(execute) {
        try {
            execute(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }
    status = PENGING
    value = undefined
    reason = undefined
    successCallFn = []
    failureCallFn = []
    resolve = (value) => {
        if (this.status !== PENGING) return
        this.status = FULFILLED
        this.value = value
        while (this.successCallFn.length) this.successCallFn.shift()()
        // this.successCallFn && this.successCallFn(this.value)
    }
    reject = (reason) => {
        if (this.status !== PENGING) return
        this.status = REJECTED
        this.reason = reason
        while (this.failureCallFn.length) this.failureCallFn.shift()()
        // this.failureCallFn && this.failureCallFn(this.reason)
    }
    then (successCallFn, failureCallFn) {
        successCallFn = successCallFn ? successCallFn : value => value
        failureCallFn = failureCallFn ? failureCallFn : reason => { throw reason }
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = successCallFn(this.value)
                        // 这里的回调函数返回值可能是普通值或MyPromise对象, REJECTED同样需要处理
                        // resolve(x)
                        paserPomiseX(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = failureCallFn(this.reason)
                        // 这里的回调函数返回值可能是普通值或MyPromise对象, REJECTED同样需要处理
                        // resolve(x)
                        paserPomiseX(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
                // paserPomiseY (y, resolve, reject)
            } else if (this.status === PENGING) {
                this.successCallFn.push(() => {
                    setTimeout(() => {
                        try {
                            let x = successCallFn(this.value)
                            // 这里的回调函数返回值可能是普通值或MyPromise对象, REJECTED同样需要处理
                            // resolve(x)
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
                            // 这里的回调函数返回值可能是普通值或MyPromise对象, REJECTED同样需要处理
                            // resolve(x)
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
    finally (callfn) {
        // 通过this.then拿到实例对象的状态
        return this.then(value => {
            return MyPromise.resolve(callfn()).then(() => value)
        }, reason => {            
            return MyPromise.resolve(callfn()).then(() => { throw reason })
        })
    }
    catch (failureCallFn) { 
        return this.then(undefined, failureCallFn)
    }
    static all (array) {
        let index = 0
        let result = []
        return new MyPromise((resolve, reject) => {
            function addData (key, value) {
                result[key] = value
                index++
                if (index === array.length) {
                    resolve(result)
                }
            }
            for (let i = 0; i < array.length; i++) {
                const current = array[i]
                if (current instanceof MyPromise) {
                    current.then(value => addData(i, value), reason => reject(reason))
                } else {
                    // 普通值
                    addData(i, array[i])
                }
            }
        })
    }
    static resolve (value) {
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }
}

function paserPomiseX (promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
        return
    }
    if (x instanceof MyPromise) {
        // value.then(value => resolve(value), reason => reject(reason))
        x.then(resolve, reject)
    } else {
        resolve(x) // 普通值
    }
}

module.exports = MyPromise