import { name, age } from './module.js'
console.log(name, age) // jack 17
// 模块向外暴露的变量是只读的
name = 'tom'
// 模块向外暴露是引用关系
setTimeout(() => {
    console.log(name, age) // ben 17
}, 1500)



import { Button } from './components/button.js'
import { Avartar } from './components/avatar.js'

console.log(Button)
console.log(Avartar)