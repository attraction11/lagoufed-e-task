import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'

// 1、导入模块
import { styleModule } from 'snabbdom/build/package/modules/style'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'

// 2、注册模块
var patch = init([
    styleModule, // 处理支持动画的元素样式
    eventListenersModule, // 附加事件监听器
])

// 3、模块使用
// 第一个参数：标签+选择器
// 第二个参数：如果是对象，就是传入模块中使用的数据
var vnode = h(
    'div#container.cls',
    [
        h('h1',
            {
                style: {
                    backgroundColor: 'red'
                }
            },
            'Hello World'
        ),
        h('p',
            {
                on: {
                    click: eventHandler
                }
            },
            'p 标签'
        )
    ]
)

function eventHandler () { 
    console.log('点我~~~~~')
}

var app = document.querySelector('#app')
patch(app, vnode)


// Snabbdom的核心
// init()设置模块，创建patch()函数
// 使用h()函数创建JavaScript对象（VNode）描述真实DOM
// patch()比较新旧两个Vnode
// 把变化的内容更新到真实DOM树