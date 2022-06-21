/*
  将下面异步代码使用 Promise 的方法改进
  尽量用看上去像同步代码的方式
  setTimeout(function () {
    var a = 'hello'
    setTimeout(function () {
      var b = 'lagou'
      setTimeout(function () {
        var c = 'I ♥ U'
        console.log(a + b +c)
      }, 10)
    }, 10)
  }, 10)
*/

// **答:**  
let p1 = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello')
    }, 10)
})
let p2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('lagou')
        }, 10)
    })
}
let p3 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('I ♥ U')
        }, 10)
    })
}

Promise.all([p1(), p2(), p3()])
    .then(result => {
        const sum = result.reduce((prev, curr) => prev + curr, '')
        console.log(sum) // 打印 hellolagouI ♥ U
    })
    .catch(reason => console.log(reason))