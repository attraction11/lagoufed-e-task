class Observer {
    constructor(data) {
        this.walk(data)
    }

    walk (data) {
        // 1. 判断data 是否是对象
        if (!data || typeof data !== 'object') return
        // 2. 遍历data对象的所有属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }

    // 为啥,要传递第三个参数--为了防止堆栈溢出(使用obj[key])
    defineReactive (obj, key, val) {
        let that = this
        // 负责收集依赖,并发送通知
        let dep = new Dep()
        // 若val为对象,则会把val内部的属性转换成响应式数据
        this.walk(val)
        Object.defineProperty(obj, key, {
            enumerable: true, // 可遍历
            configurable: true, // 可枚举
            get () { // 这里形成了闭包,延长了val的作用域
                // Dep.target 就是观察者,收集依赖
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set (newValue) {
                if (newValue === val) return
                val = newValue
                that.walk(newValue)
                // 发送通知
                dep.notify()
            }
        })

    }
}