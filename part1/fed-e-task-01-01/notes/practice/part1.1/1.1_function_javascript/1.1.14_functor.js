// 普通函子
class Container {
    // 定义一个静态方法返回类的实例,避免在外部使用new来创建对象
    static of (value) { 
        return new Container(value)
    }
    // 在构造函数中定义私有属性_value,只允许容器内部进行操作
    constructor(value) {        
        this._value = value
    }
    // map方法通过传入函数fn,修改私有属性_value的值
    map (fn) { 
        return Container.of(fn(this._value))
    }
    // join方法返回函数内部的值
    join () { 
        return this._value
    }
}
// 采用loadsh/fp模块测试, 需求:获取数组最后一个元素的大写
const fp = require('lodash/fp')
const getFirst = array => array[0]
let r = Container.of(['aa', 'bb', 'cc'])
        .map(fp.reverse)
        .map(getFirst)
        .map(fp.toUpper)
console.log(r.join()) // 'CC'