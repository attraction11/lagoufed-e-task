const fp = require('lodash/fp')
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
}

let r = IO.of([1, 2, 3])
    .map(fp.reverse)
    .map(fp.first)
console.log(r.join()) // 3