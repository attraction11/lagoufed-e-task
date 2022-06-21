const fp = require('lodash/fp')
const fs = require('fs')

class IO {
    static of (x) {
        return new IO(() => x)
    }
    constructor(fn) {
        this._value = fn
    }
    map (fn) {
        return new IO(fp.flowRight(fn, this._value))
    }
    join () {
        return this._value()
    }
    flatMap (fn) { // 相当于先后调用map join方法,简称"IO扁平化"
        return this.map(fn).join()
    }
}

let readFile = function (filename) {
    return new IO(() => {
        return fs.readFileSync(filename, 'utf-8')
    })
}
let print = function (x) {
    return new IO(() => {
        console.log(x)
        return x
    })
}

// let cat = fp.flowRight(print, readFile)
// // IO(IO(x)) 存在问题:IO嵌套  api调用不优雅 
// let r = cat('package.json')
// console.log(r.join())

let r = readFile('package.json')
        .flatMap(print)
    .join()
console.log(r)
