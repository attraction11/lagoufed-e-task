import Vue from 'vue'
import VueRouter from '../vuerouter'
import Index from '../views/Index.vue'
// 1. 注册路由插件
Vue.use(VueRouter)

// 路由规则
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    // 开启 props，会把 URL 中的参数传递给组件
    // 在组件中通过 props 来接收 URL 参数
    props: true,
    component: Index
  },
  {
    path: '/blog',
    name: 'Blog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "blog" */ '../views/Blog.vue')
  },
  {
    path: '/photo',
    name: 'Photo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "photo" */ '../views/Photo.vue')
  }
]
// 2. 创建 router 对象
const router = new VueRouter({
  mode: 'hash',
  //   mode: 'history',
  routes
})

export default router
