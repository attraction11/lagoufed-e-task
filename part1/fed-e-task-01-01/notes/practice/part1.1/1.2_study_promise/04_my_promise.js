new Promise((resolve, reject) => {
  resolve()
})

const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

class myPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  status = PENDING
  value = undefined
  reason = undefined
  successCallFn = []
  failCallFn = []

  resolve = (value) => {
    if (this.status !== PENDING) return
    this.status = FULLFILLED
    this.value = value
    while (this.successCallFn.length) {
      this.successCallFn.shift()(this.value)
    }
  }

  reject = (reason) => {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.reason = reason
    while (this.failCallFn.length) {
      this.failCallFn.shift()(this.reason)
    }
  }

  then = (successCall, failCall) => {
    successCall = successCall ? successCall : value => value
    failCall = failCall ? failCall : (reason) => { throw reason}
    const promise2 = new myPromise((resolve, reject) => {
      if (this.status === FULLFILLED) {
        setTimeout(() => {
          try {
            let x = successCall(this.value)
            paserPromiseX(x, promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCall(this.reason)
            paserPromiseX(x, promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else if(this.status === PENDING) {
        this.successCallFn.push(() => {
          setTimeout(() => {
            try {
              let x = successCall(this.value)
              paserPromiseX(x, promise2, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.failCallFn.push(() => {
          setTimeout(() => {
            try {
              let x = failCall(this.reason)
              paserPromiseX(x, promise2, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })

    return promise2
  }

  finally = (callback) => {
    return this.then(
      (value) => {
        return myPromise.resolve(callback()).then(() => value)
      },
      (reason) => {
        return myPromise.resolve(callback()).then(() => {
          throw reason
        })
      }
    )
  }

  catch = (failCallFn) => {
    return this.then(undefined, failCallFn)
  }

  static all(array) {
    let index = 0
    let result = []
    return new myPromise((resolve, reject) => {
      function addFn(i, value) {
        result[i] = value
        index++
        if (index === array.length) {
          resolve(result)
        }
      }

      for (let i = 0; i < array.length; i++) {
        const current = array[i]
        if (current instanceof myPromise) {
          current.then(
            (value) => {
              addFn(i, value)
            },
            (reason) => {
              reject(reason)
            }
          )
        } else {
          addFn(i, current)
        }
      }
    })
  }

  static resolve(value) {
    if (value instanceof myPromise) return value
    return new myPromise((resolve) => {
      resolve(value)
    })
  }
}

function paserPromiseX(x, promise2, resolve, reject) {
  if (x === promise2) {
    reject(new TypeError('then promise repeat'))
    return
  }

  if (x instanceof myPromise) {
    x.then(
      (value) => {
        resolve(value)
      },
      (reason) => {
        reject(reason)
      }
    )
  } else {
    resolve(x)
  }
}
