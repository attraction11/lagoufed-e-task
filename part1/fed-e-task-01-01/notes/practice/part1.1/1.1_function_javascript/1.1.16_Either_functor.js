// 处理异常的函子,返回自身实例,不再返回新的函子
class Left {
    static of (value) {
        return new Left(value)
    }
    constructor(value) {
        this._value = value
    }
    map () {
        return this
    }
    join () {
        return this._value
    }
}
// 普通函子,正常返回新的函子
class Right {
    static of (value) {
        return new Right(value)
    }
    constructor(value) {
        this._value = value
    }
    map (fn) {
        return Right.of(fn(this._value))
    }
    join () {
        return this._value
    }
}

function parseJSON (str) {
    try {
        return Right.of(JSON.parse(str))
    } catch (e) {
        return Left.of({ error: e.message })
    }
}

let l = parseJSON("{ name: tom }")
        .map(x => x.name.toUpperCase())
console.log(l.join()) // { error: 'Unexpected token n in JSON at position 2' }
let r = parseJSON('{ "name": "tom" }')
        .map(x => x.name.toUpperCase())
console.log(r.join()) // TOM