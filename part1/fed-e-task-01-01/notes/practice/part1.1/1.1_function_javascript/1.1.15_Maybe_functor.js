class Maybe {
    static of (value) {
        return new Maybe(value)
    }
    constructor(value) {
        this._value = value
    }
    map (fn) {
        return this.isEmpty() ? Maybe.of(null) : Maybe.of(fn(this._value))
    }
    isEmpty () {
        return this._value === null || this._value === undefined
    }
    join () {
        return this._value
    }
}

let r = Maybe.of('aaa')
    .map(x => x.toUpperCase())
    .map(x => null)
    .map(x => x.split(' '))
console.log(r.join()) // null