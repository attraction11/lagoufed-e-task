// console.log('hello world')
const { log } = console

// ------------------数组解构---------------------
// const arr = [100, 200, 300]
// // es6获取数组的元素, 可以按照位置相同赋值，也可以添加默认值
// const [foo, bar, baz, car = 400] = arr
// const [bas, ...rest] = arr
// log(foo, bar, baz, car)
// log(bas, rest)

// ------------------对象解构---------------------
// const obj = { name: 'Tom', age: 20 }
// const name = 'Jack'
// // 结构对象的属性，出现变量重名后需要重命名，也可以设置默认值
// const { name: objName = 'default' } = obj
// log(objName)

// ------------------模板字符串---------------------
// const name = 'peek'
// // 模板字符串支持变量，反引号转义、换行、插值运算
// log(`hello es2015
// my name is ${name + 1} \`\string\``)
// // 带标签的模板字符串可以对字符串进行加工
// const gender = true
// function myTagFunc (string, name, gender) {
//     return string[0] + name + string[1] + gender + string[2]
// }
// const result = myTagFunc`hey, ${name} is a ${gender}`
// console.log(result)
// // 字符串的扩展方法
// const message = 'Error: foo is not defined'
// log(message.includes('foo'))  // true
// log(message.startsWith('error'))  // false
// log(message.endsWith('defined'))  // true

// ------------------剩余运算符---------------------
// const hello = (sum, ...rest) => {
//     log(sum)  // 100
//     log(rest)  // [ 1, 2, 3 ]
// }
// hello(100, 1, 2, 3)


// ------------------扩展运算符---------------------
// const arr = ['1', '2', '3']
// console.log(...arr)


// ------------------Object对象字面量增强--------------------
// const x = '11'
// const family = {
//     x,
//     y () { // 推荐写法，简洁
//         console.log(this) // this指向family
//     },
//     z: () => { // 推荐写法，方便理解
//         log(this.y) // this指向window
//         log(family.y) // 调用family对象的属性
//         return null
//     },
//     // 计算属性名作为属性名
//     [Math.random()]: '33'
// }

// console.log(family)


// ----------------Object对象新方法----------------------
// log(Object.assign({ a: 1, b: 2 }, { a: 3, c: 4 })) // 对象合并
// log(Object.assign({}, { a: 3, c: 4 })) // 浅拷贝
// log(-0 === +0)
// log(null === null)
// log(Object.is(-0, +0)) // 判断对象是否相等
// log(Object.is(null, null))


// ----------------Proxy对象(俗称：门卫)----------------------
// const person = {
//     name: 'Tom',
//     age: 24
// }
// const personProxy = new Proxy(person, {
//     get (target, prop) {
//         // 1、对对象属性的取值操作，添加默认值，最后返回属性值
//         return target[prop] ? target[prop] : 'default'
//     },
//     set (target, prop, value) { // 小知识：vscode提示的代码不是我们所需要的，按下Esc键即可
//         // 2、对对象属性的赋值操作，添加校验以及异常处理
//         if (prop === 'age') {
//             if (!Number.isInteger(value)) {
//                 throw new Error('this value must be a integer')
//             }
//         }
//         // 3、给对象属性赋值
//         target[prop] = value
//     }
// })

// personProxy.age = '20'
// log(personProxy.name)
// log(personProxy.xxx)


// ----------------Proxy对象----------------------
// // 诞生的意义：Proxy采用的是非侵入的方式劫持整个对象, 对整个对象进行监管
// // Object.defineProperty仅支持对对象的读写进行劫持，defineProperty是侵入式写法，需要改造对象
// // Proxy是对整个对象进行监管, Proxy采用非侵入的方式劫持整个对象
// const person = {
//     name: 'Tom',
//     age: 24
// }
// const personProxy = new Proxy(person, {
//     set (target, prop, value) {
//         target[prop] = value
//     },
//     deleteProperty (target, prop) {
//         console.log('delete', prop)
//         delete target[prop]
//     }
// })

// delete personProxy.age
// personProxy.gender = 'man'
// log(person) // { name: 'Tom', gender: 'man' }
// // 对数组操作更友好的监视，以往都是采用重写数组的方法（vue2+）
// const list = []
// const listProxy = new Proxy(list, {
//     set (target, prop, value) {
//         target[prop] = value
//         return true // 标记数组元素添加成功
//     }
// })

// listProxy.push('11')
// log(list) // [ '11' ]


// ----------------Reflect静态类----------------------
// // 诞生的意义： Reflect静态类提供了统一的操作对象的方法
// // 以前我们操作对象的方法很杂，比如 delete、in、Object.keys(), 未来要废弃的

// const person = {
//     name: 'Tom',
//     age: 24
// }

// log('name' in person)
// // 判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。
// log(Reflect.has(person, 'name'))
// log(delete person.name)
// // 作为函数的delete操作符，相当于执行 delete target[name]
// log(Reflect.deleteProperty(person, 'name'))
// log(Object.keys(person))
// // 返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受enumerable影响).
// log(Reflect.ownKeys(person))

// const personProxy = new Proxy(person, {
//     get (target, prop, value) {
//         log('watch ...')
//         return Reflect.get(target, prop)
//     }
// })

// console.log(personProxy.age)


// ----------------Promise对象----------------------


// ----------------class关键词----------------------
// 诞生的意义：让Javascript类的定义, 简洁易懂
// // 以往我们定义一个类是采用构造函数的方式
// function Person (value) {
//     this.name = value
// }
// Person.create = function (value) { // ES5定义类的静态方法
//     return new Person(value)
// }
// Person.prototype.say = function () {
//     log(`hi, my name is ${this.name}`)
// }

// // const person = new Person()
// const person = Person.create('Tom')
// person.say()

// // 现在我们采用class关键词定义类, 简洁易懂
// class Person {
//     constructor(value) {
//         this.name = value
//     }
//     say () {
//         log(`hi, my name is ${this.name}`)
//     }
//     static create (value) { // ES6定义类的静态方法
//         return new Person(value)
//     }
// }

// // const person = new Person('Tom')
// const person = Person.create('Tom')
// person.say()


// ----------------extends类的继承----------------------
// 诞生的意义：让类的继承更加简洁易懂
// class Person {
//     constructor(value) {
//         this.name = value
//     }
//     say () {
//         log(`hi, my name is ${this.name}`)
//     }
// }

// class Student extends Person {
//     constructor(name, number) {
//         super(name) // super对象始终指向父类，调用它即调用父类构造函数
//         this.number = number
//     }
//     hello () {
//         super.say()
//         log(`my school number is ${this.number}`)
//     }
// }

// // extends实现类的继承，相比于ES5中原型继承，更简洁易懂
// const student = new Student('jack', 101)
// console.log(student.hello())


// ----------------Set 数据结构----------------------
// 诞生的意义：Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。
// const list = new Set() // 数据集合中的元素不存在重复
// list.add(1).add(2).add(2).add(4) // add方法会返回集合本身，因此可以链式调用

// for (i of list) {
//     log(i)
// }

// log(list.delete(4))
// log(list.size)
// log(list.has(4))
// // 常用的场景是数组去重
// const arr = [1, 1, 4, 4, 5, 6]
// log(Array.from(new Set(arr)))
// log([...new Set(arr)])


// ----------------Map 数据结构----------------------
// // 定义:以多种数据类型作为键值的对象
// const obj1 = {
//     [123]: '123',
//     [true]: 'true',
//     [{ a: 1 }]: 'a',
//     [{ b: 1 }]: 'b',
// }

// // 问题：键值默认被Object.prototype.toString.call(key) 转为字符串
// log(Object.keys(obj1)) // [ '123', 'true', '[object Object]' ]
// log(obj1['[object Object]']) // b

// // 定义：严格意义上的键值对的集合,可以以任意数据类型作为键
// const obj2 = new Map()
// const tom = { name: 'tom' }
// obj2.set(tom, 'c')
// log(obj2)
// obj2.forEach((value, key) => log(value, key))
// log(obj2.get(tom))
// log(obj2.has(tom))
// log(obj2.delete(tom))
// log(obj2.clear())


// ----------------Symbol原始数据类型----------------------
// const cache = {}
// /* -----------------a.js--------------------- */
// cache['foo'] = '111'
// /* ----------------b.js--------------------- */
// cache['foo'] = '222'
// log(cache) // { foo: '222' } 1、不同文件重复定义全局对象的同一个属性出现覆盖问题

// const s = Symbol('foo')
// log(typeof s) // Symbol
// log(Symbol('foo')) // Symbol(foo) 2、添加对Symbol数据的描述
// log(Symbol('bar'))
// log(Symbol('fpp'))

// const name = Symbol('name')
// const person = {
//     [name]: 'Tom', // 3、定义对象的私有属性,以前都是约定的如：_name : 'Tom'
//     say () {
//         log(`${this[name]}`)
//     }
// }
// log(person.name) // undefined
// log(person.say()) // Tom
// // 4、Symbol类型的数据最主要的作用就是为对象添加一个独一无二的属性名

// log(Symbol() === Symbol(), Symbol('foo') === Symbol('foo')) // false false
// log(Symbol.for('foo') === Symbol.for('foo')) // true  5、Symbol内部维护了一个描述符到Symbol的映射表
// log(Symbol.for(true) === Symbol.for('true')) // true  6、Symbol.for()内部调用了toString()方法

// const obj1 = {
//     [Symbol()]: 'Symbol value',
//     [Symbol()]: 'Symbol value',
//     foo: 'value'
// }
// for (key in obj1) { // foo
//     log(key)
// }
// log(Object.keys(obj1)) // [ 'foo' ]
// log(JSON.stringify(obj1)) // {"foo":"value"}
// // 7、由以上可见Symbol()属性更适合作为对象的私有属性
// log(Object.getOwnPropertySymbols(obj1)) // [ Symbol(), Symbol() ] 获取对象所有Symbol类型的键值


// ----------------ES6 可迭代接口----------------------
// // 1、JavaScript中的循环遍历
// // 普通的for...循环    对象属性遍历for...in      可迭代数据类型遍历for...of
// // 对象的Object.keys()、Object.entries()、
// // 理论上for...of可以遍历任何一种数据结构（数组、伪数组、Set、Map）
// const list1 = [1, 2, 3, 4, 5]
// // const list1 = new Set([1, 2, 3, 4, 5])
// for (const value of list1) {
//     log(value)
//     if (value > 2) {
//         break
//     }
// }

// // list1.some()
// // list1.every()

// const list2 = new Map()
// list2.set({ a: 1 }, 1)
// list2.set({ b: 2 }, 2)
// for (const [key, value] of list2) {
//     log(key, value)
// }

// // 2、以下数组的方法针对特定需求使用的，for...of为通用的遍历方法
// list2.forEach(item => log(item)) // 不能跳出循环

// // const obj1 = { a: 1 }
// // for (const item of obj1) {
// //     log(item) // TypeError: obj1 is not iterable  3、普通对象没有可迭代接口
// // }

// // 4、数据接口含有可迭代接口--Symbol(Symbol.iterator)
// // const arr = [1, 2, 3, 4]
// const arr = new Set([1, 2, 3, 4])
// log(arr[Symbol.iterator]) // [Function: values]  5、数组原型对象上定义了可迭代函数，返回对象
// log(arr[Symbol.iterator]().next()) // { value: 1, done: false }  调用对象的next() 方法

// // 6、如何实现对象的可迭代接口，采用迭代器模式（设计模式）
// const obj2 = {
//     study: ['吃饭', '睡觉', '大豆豆'],
//     life: ['出行', '旅游', '美食'],
//     work: ['摸鱼'],
//     each (callFn) {
//         let list = [...this.study, ...this.life, ...this.work]
//         for (const item of list) {
//             callFn(item)
//         }
//     },
//     [Symbol.iterator] () {
//         const list = Object.entries(obj2)
//         let index = 0
//         return {
//             next () {
//                 return { value: list[index], done: index++ >= list.length }
//             }
//         }
//     }
// }
// obj2.each(value => log(value))
// // 通过自定义对象的[Symbol.iterator]，实现了对象的可迭代接口，就可使用for...of
// for (const [key, value] of obj2) {
//     log(key, value)
// }


// ----------------ES6 生成器----------------------
// function* fn () {
//     log('111...')
//     yield 100
//     log('222...')
//     yield 200
// }

// const result = fn()
// log(result.next())  // 111... 返回 { value: 100, done: false }
// log(result.next())  // 111... 返回 { value: 200, done: false }
// log(result.next())  // 返回 { value: undefined, done: true }

// // 1、场景需求：实现一个发号器
// function* createIdMaker () {
//     let id = 1
//     while (true) {
//         yield id++
//     }
// }

// const maker = createIdMaker()
// log(maker.next().value)  // 依次递增
// log(maker.next().value)
// log(maker.next().value)

// // 2、如何实现对象的可迭代接口，采用生成器
// const obj2 = {
//     study: ['吃饭', '睡觉', '大豆豆'],
//     life: ['出行', '旅游', '美食'],
//     work: ['摸鱼'],
//     [Symbol.iterator]: function* () {
//         const list = Object.entries(obj2)
//         for (const item of list) {
//             yield item
//         }
//     }
// }

// for (const item of obj2) {
//     log(item)
// }


// ----------------ES7 新增方法----------------------
// const arr = [1, true, null, Symbol(), 'str']
// log(arr.includes(null))  // true
// log(2 ** 10)  // 1024

// ----------------ES8 新增方法----------------------
// const p1 = {
//     firsetName: 'Yon',
//     lastName: 'zhang',
//     get fullName () {
//         return this.firsetName + ' ' + this.lastName
//     }
// }

// log(Object.values(p1))  // [ 'Yon', 'zhang', 'Yon zhang' ]  获取对象属性值的集合
// log(Object.entries(p1))  //  获取对象属性与值的集合
// const descriptors = Object.getOwnPropertyDescriptors(p1)
// log(descriptors)
// const p2 = Object.defineProperties({}, descriptors)
// p2.firsetName = 'ton'
// log(p2.fullName)

// const books = {
//     html: 3,
//     css: 10,
//     javaScript: 103,
// }

// for (const [key, value] of Object.entries(books)) {
//     log(`${key.padEnd(16, '-')} | ${value.toString().padStart(3, '0')}`)
// }
// // html------------ | 003
// // css------------- | 010
// // javaScript------ | 103





