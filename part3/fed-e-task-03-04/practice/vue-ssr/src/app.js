// 应用程序的「通用 entry」
import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

Vue.use(VueMeta)

Vue.mixin({
    metaInfo: {
        titleTemplate: '%s - hello world'
    }
})

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp () {
    const router = createRouter()
    const store = createStore()
    const app = new Vue({
        router,  // 将路由挂载到 Vue 根实例中
        store,  // 将容器挂载到 Vue 根实例中
        // 根实例简单的渲染应用程序组件。
        render: h => h(App)
    })
    return { app, router, store }
}