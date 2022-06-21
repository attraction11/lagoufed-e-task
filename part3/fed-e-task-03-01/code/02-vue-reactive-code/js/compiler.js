class Compiler {
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }

    // 编译模板,处理文本节点和元素节点
    compile (el) {
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            // 处理文本节点
            if (this.isTextNode(node)) {
                this.compileText(node)
            } else if (this.isElementNode(node)) {
                this.compileElement(node)
            }

            // 判断node节点,是否有子节点,如果有子节点,要递归调用compile
            if (node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })
    }

    // 编译元素节点,处理指令
    compileElement (node) {
        console.log(node.attributes)
        // 遍历所有的属性节点,并判断是否是指令
        Array.from(node.attributes).forEach(attr => {
            // 判断是否是指令
            let attrName = attr.name
            if (this.isDirective(attrName)) {
                // v-text ---> text
                let onRE = /^@|^v-on:/
                if (onRE.test(attrName)) {
                    //获取绑定的事件类型 
                    const exp = attr.value
                    const type = attrName.replace(onRE, '');
                    this.addHandler(node, exp, type);
                } else {
                    const key = attr.value
                    attrName = attrName.substr(2)
                    this.update(node, key, attrName)
                }
            }
        })
    }

    update (node, key, attrName) {
        let updateFn = this[attrName + 'Updater']
        updateFn && updateFn.call(this, node, this.vm[key], key)
    }

    // 处理 v-text 指令
    textUpdater (node, value, key) {
        node.textContent = value
        // 创建watcher对象,当数据改变更新视图
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
    }

    // v-model
    modelUpdater (node, value, key) {
        node.value = value
        // 创建watcher对象,当数据改变更新视图
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue
        })

        node.addEventListener('input', () => {
            this.vm[key] = node.value
        })
    }

    // 处理 v-html 指令
    htmlUpdater (node, value, key) {
        node.innerHTML = value
        // 创建watcher对象,当数据改变更新视图
        new Watcher(this.vm, key, (newValue) => {
            node.innerHTML = newValue
        })
    }

    // 处理 v-on 指令
    addHandler (node, exp, type) {
        const fn = this.vm.$options.methods && this.vm.$options.methods[exp]
        if (type && fn) {
            node.addEventListener(type, fn.bind(this.vm))
            new Watcher(this.vm, exp, newFn => {
                node.removeEventListener(type, fn)
                node.addEventListener(type, newFn)
            })
        }
    }

    // 编译文本节点,处理差值表达式
    compileText (node) {
        // console.dir(node)
        // {{ msg }} 正则匹配差值表达式  提取变量
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if (reg.test(value)) {
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])

            // 创建watcher对象,当数据改变更新视图
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }

    // 判断元素的属性是否是指令
    isDirective (attrName) {
        return attrName.startsWith('v-') || attrName.startsWith('@')
    }

    // 判断节点是否是文本节点
    isTextNode (node) {
        return node.nodeType === 3
    }

    // 判断节点是否是元素节点
    isElementNode (node) {
        return node.nodeType === 1
    }
}