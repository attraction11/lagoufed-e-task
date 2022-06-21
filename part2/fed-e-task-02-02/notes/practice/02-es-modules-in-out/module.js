var name = 'jack'
var age = 17

// 导出的并不是字面量对象，而是形式如此
export { name, age }
setTimeout(() => {
    name = 'ben'
}, 1000)