class Container {
    // 定义一个静态方法返回类的实例，避免在外部使用new来创建类的实例
    static of (value) {
        return new Container(value)
    }
    // 在构造函数的内部定义一个私有属性，只允许容器内部对它进行操作
    constructor(value) {
        this._value = value
    }
    // map方法接收一个函数作为参数，修改内部容器中的私有属性_value
    map (fn) {
        return Container.of(fn(this._value))
    }
    // join方法返回函数内部的值
    join () {
        return this._value
    }
}

class Maybe {
    // 定义一个静态方法返回类的实例，避免在外部使用new来创建类的实例
    static of (value) {
        return new Maybe(value)
    }
    // 在构造函数的内部定义一个私有属性，只允许容器内部对它进行操作
    constructor(value) {
        this._value = value
    }
    // map方法接收一个函数作为参数，修改内部容器中的私有属性_value，同时将新值传递给新的容器
    map (fn) {
        // 对空值情况直接返回null给新的容器（目的：将副作用控制在允许的范围内）
        return this.isEmpty () ? Maybe.of(null) : Maybe.of(fn(this._value))
    }
    // 判断外部传入空值的处理
    isEmpty () { 
        return this._value === null || this._value === undefined
    }
    // join方法返回函数内部的值
    join () {
        return this._value
    }
}

module.exports = { Container, Maybe }