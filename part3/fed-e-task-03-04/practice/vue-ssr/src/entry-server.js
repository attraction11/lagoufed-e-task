// 服务器 entry 
import { createApp } from './app'

export default async context => {
    // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，
    // 就已经准备就绪。
    const { app, router, store } = createApp()

    const meta = app.$meta()

    // 设置服务器端 router 的位置
    router.push(context.url)

    context.meta = meta

    new Promise((resolve, reject) => {
        router.onReady(resolve, reject)
    })

    // 等到 router 将可能的异步组件和钩子函数解析完
    await new Promise(router.onReady.bind(router))

    context.rendered = () => {
        // Renderer 会把 context.state 数据对象内联到页面模板中
        // 最终发送给客户端的页面中会包含一段脚本：window.__INITIAL_STATE__ = context.state
        // 客户端就要把页面中的 window.__INITIAL_STATE__ 拿出来填充到客户端 store 容器中
        context.state = store.state
    }

    return app

    // router.onReady(() => {
    //     const matchedComponents = router.getMatchedComponents()
    //     // 匹配不到的路由，执行 reject 函数，并返回 404
    //     if (!matchedComponents.length) {
    //         return reject({ code: 404 })
    //     }

    //     // Promise 应该 resolve 应用程序实例，以便它可以渲染
    //     resolve(app)
    // }, reject)
}

// 参考：https://ssr.vuejs.org/zh/guide/routing.html#%E4%BD%BF%E7%94%A8-vue-router-%E7%9A%84%E8%B7%AF%E7%94%B1