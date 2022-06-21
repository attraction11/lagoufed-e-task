import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'

const patch = init([])

// 第一个参数：标签+选择器
// 第二个参数：如果是字符串就是标签中的文本内容
var vnode = h('ul', [
    h('li', { key: 'a' }, '首页'),
    h('li', { key: 'b' }, '视频'),
    h('li', { key: 'c' }, '微博'),
])
var app = document.querySelector('#app')
// 第一个参数：旧的 VNode, 可以是 DOM 元素
// 第二个参数：新的 VNode
// 返回新的 VNode
let oldVnode = patch(app, vnode)

vnode = h('ul', [
    h('li', { key: 'a' }, '首页'),
    h('li', { key: 'c' }, '微博'),
    h('li', { key: 'b' }, '视频'),
])
patch(oldVnode, vnode)