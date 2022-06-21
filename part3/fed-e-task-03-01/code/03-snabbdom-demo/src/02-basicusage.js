import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'

const patch = init([])

// 第一个参数：标签+选择器
// 第二个参数：如果是数组，就是子元素
var vnode = h('div#container.cls', [h('h1', 'Hello Snabbdom'), h('p', 'p 标签')])

// 第一个参数：旧的 VNode, 可以是 DOM 元素
// 第二个参数：新的 VNode
// 返回新的 VNode
var app = document.querySelector('#app')
let oldVode = patch(app, vnode)


setTimeout(() => { 
    // vnode = h('div#container', [h('h1', 'Hello World'), h('p', 'Hello P')])
    // patch(oldVode, vnode)
    // 清除div内容
    patch(oldVode, h('!'))
}, 2000)
