let _Vue = null
export default class VueRouter {
  static install (Vue) {
    // 1、判断当前插件是否已经被安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 2、把 Vue 构造函数记录到全局变量
    _Vue = Vue
    // 3、把创建 Vue 实例的时候传入的 router 对象注入 Vue 实例上
    // 混入
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor (options) {
    this.options = options
    this.mode = options.mode || 'hash'
    this.routeMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }

  init () {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initCurrent()
    this.initEvents()
  }

  createRouteMap () {
    // 遍历所有的路由规则，把路由规则解析成键值对的形式，储存到 routeMap 中
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponents (Vue) {
    const Link = {
      name: 'RouterLink',
      props: {
        to: {
          type: String,
          required: true
        }
      },
      methods: {}
    }
    if (this.mode === 'history') {
      Link.render = function (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, this.$slots.default)
      }
      Link.methods.clickHandler = function (e) {
        e.preventDefault()
        history.pushState({}, '', this.to)
        this.$router.data.current = this.to
      }
    } else {
      Link.render = function (h) {
        return h('a', {
          attrs: {
            href: '/#' + this.to
          }
        }, this.$slots.default)
      }
    }

    const View = {
      render: h => h(this.routeMap[this.data.current])
    }

    Vue.component('router-link', Link)
    Vue.component('router-view', View)
  }

  // 第一次加载页面初始化
  initCurrent () {
    // history模式
    if (this.mode === 'history') {
      this.data.current = location.pathname
      return
    }
    // hash模式
    if (location.hash === '') {
      window.location.hash = '#/'
    }
    this.data.current = location.hash.slice(1)
  }

  initEvents () {
    // 监听hash改变
    window.addEventListener('hashchange', () => {
      this.data.current = location.hash.slice(1)
    })
    // 监听浏览器的的历史记录  当历史记录条目更改时，将触发popstate事件
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
