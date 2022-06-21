## Vue.js 源码剖析-响应式原理、虚拟 DOM、模板编译和组件化

### 简答题

#### 1、请简述 Vue 首次渲染的过程。
- 在首次渲染之前,首先进行`Vue`初始化,初始化实例成员和静态成员
- 当初始化结束之后,要调用`Vue`的构造函数`new Vue()`,在构造函数中调用了`_init()`方法,这个方法相当于我们整个`Vue`的入口
- 在`_init`方法中,最终调用了`$mount`,一共有两个`$mount`,
    - 第一个定义在`entry-runtime-with-compiler.js`文件中,也就是我们的入口文件`$mount`,这个`$mount()`的核心作用是帮我们把模板编译成`render`函数，但它首先会判断一下当前是否传入了`render`选项，如果没有传入的话，它会去获取我们的`template`选项，如果`template`选项也没有的话，他会把`el`中的内容作为我们的模板，然后把模板编译成`render`函数，它是通过`compileToFunctions()`函数，帮我们把模板编译成`render`函数的,当把`render`函数编译好之后，它会把`render`函数存在我们的`options.render`中。
    - 接着会调用`src/platforms/web/runtime/index.js`文件中的`$mount`方法,在这个中首先会重新获取`el`，因为如果是运行时版本的话，是不会走`entry-runtime-with-compiler.js`这个入口中获取`el`，所以如果是运行时版本的话，我们会在`runtime/index.js的`$mount()`中重新获取`el`。
- 接下来调用`mountComponent()`,这个方法在`src/core/instance/lifecycle.js`中定义的，在`mountComponent()`中，首先会判断`render`选项，如果没有`render`选项，但是我们传入了模板，并且当前是开发环境的话会发送一个警告，目的是如果我们当前使用运行时版本的`Vue`,而且我们没有传入`render`,但是传入了模版,告诉我们运行时版本不支持编译器。接下来会触发`beforeMount`这个生命周期中的钩子函数，也就是开始挂载之前。
- 然后定义了`updateComponent()`，在这个函数中，调用`vm._render`和`vm._update`，`vm._render`的作用是生成虚拟`DOM`，`vm._update`的作用是将虚拟`DOM`转换成真实`DOM`，并且挂载到页面上
- 创建`Watcher`对象，在创建`Watcher`时，传递了`updateComponent`这个函数，这个函数最终是在`Watcher`内部调用的。在`Watcher`内部会用了`get`方法，当`Watcher`创建完成之后,会触发生命周期中的`mounted`钩子函数,在`get`方法中，会调用`updateComponent()`
- 挂载结束，最终返回`Vue`实例。

图解过程：
![first-render.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a593a5a127ac43cc89820ab1d01c1a9e~tplv-k3u1fbpfcp-watermark.image?)
#### 2、请简述 Vue 响应式原理。
- `Vue`的响应式是从`Vue`的实例`init()`方法中开始的
- 在`init()`方法中先调用`initState()`初始化`Vue`实例的状态，在`initState`方法中调用了`initData()`，`initData()`是把`data`属性注入到`Vue`实例上，并且调用`observe(data)`将`data`对象转化成响应式的对象
- `observe`是响应式的入口
    - 在`observe(value)`中，首先判断传入的参数`value`是否是对象，如果不是对象直接返回
    - 再判断`value`对象是否有`__ob__`这个属性，如果有说明做过了响应式处理，则直接返回
    - 如果没有，创建`observer`对象，然后返回`observer`对象
- 在创建`observer`对象时，给当前的`value`对象定义不可枚举的`__ob__`属性，记录当前的`observer`对象，然后再进行数组的响应式处理和对象的响应式处理
    - 数组的响应式处理，就是设置数组的几个特殊的方法，`push`、`pop`、`sort`等，这些方法会改变原数组，所以这些方法被调用的时候需要发送通知
        - 找到数组对象中的`__ob__`对象中的`dep`,调用`dep`的`notify()`方法
        - 再遍历数组中每一个成员，对每个成员调用`observe()`，如果这个成员是对象的话，也会转换成响应式对象
    - 对象的响应式处理，就是调用`walk`方法，`walk`方法就是遍历对象的每一个属性，对每个属性调用`defineReactive`方法
- `defineReactive`会为每一个属性创建对应的`dep`对象，让`dep`去收集依赖，如果当前属性的值是对象，会调用`observe`，`defineReactive`中最核心的方法是`getter` 和 `setter`
    - `getter `的作用是收集依赖，收集依赖时，为每一个属性收集依赖，如果这个属性的值是对象，那也要为子对象收集依赖，最后返回属性的值
    - 在`setter` 中，先保存新值，如果新值是对象，也要调用 `observe` ，把新设置的对象也转换成响应式的对象，然后派发更新（发送通知），调用`dep.notify`()
- 收集依赖时
    - 在`watcher`对象的`get`方法中调用`pushTarget`, 记录`Dep.target`属性
    - 访问`data`中的成员的时候收集依赖，`defineReactive`的`getter`中收集依赖
    - 把属性对应的 `watcher` 对象添加到`dep`的`subs`数组中，也就是为属性收集依赖
    - 如果属性的值也是对象，给`childOb`收集依赖，目的是子对象添加和删除成员时发送通知
- 在数据发生变化的时候
    - 调用`dep.notify()`发送通知，`dep.notify()`会调用`watcher`对象的`update()`方法
    - `update()`中的调用`queueWatcher()`，会去判断`watcher`是否被处理，如果这个`watcher`对象没有被处理的话，添加到`queue`队列中，并调用`flushScheduleQueue()`
    - 在`flushScheduleQueue()`中触发`beforeUpdate`钩子函数
    - 调用`watcher.run()` : `run()`-->`get()` --> `getter()` --> `updateComponent()`
    - 然后清空上一次的依赖
    - 触发`actived`的钩子函数
    - 触发`updated`钩子函数


#### 3、请简述虚拟 DOM 中 Key 的作用和好处。
- 作用：追踪列表中哪些元素被添加、被修改、被移除的辅助标志。可以快速对比两个虚拟`DOM`对象，找到虚拟`DOM`对象被修改的元素，然后仅仅替换掉被修改的元素，然后再生成新的真实`DOM`
- 好处：可以优化 `DOM` 的操作，减少`Diff`算法和渲染所需要的时间，提升性能。
　

#### 4、请简述 Vue 中模板编译的过程。
- 模版编译入口函数`compileToFunctions`
    - 内部首先从缓存加载编译好的`render`函数，如果缓存中没有，调用`compile`开始编译
- 在 `compile` 函数中，首先合并选项`options`，调用 `baseCompile` 编译模版
- `compile`的核心是合并选项`options`， 真正处理是在`basCompile`中完成的，把模版和合并好的选项传递给`baseCompile`, 这里面完成了模版编译的核心三件事情
    - `parse()`: 把模版字符串转化为`AST` 对象，也就是抽象语法树
    - `optimize()`: 对抽象语法树进行优化，标记静态语法树中的静态根节点(静态根节点是标签中除了文本内容以外，还需要包含其它标签)。检测到静态子树，设置为静态，不需要在每次重新渲染的时候重新生成节点。`patch`的过程中会跳过静态根节点
    - `generator()`: 把优化过的`AST`对象，转化为字符串形式的代码
- 执行完成之后，会回到入口函数`complieToFunctions`
    - `compileToFunction`会继续把字符串代码转化为函数
    - 调用`createFunction`
    - 当 `render` 和 `staticRenderFns`初始化完毕，最终会挂在到`Vue`实例的`options`对应的属性中
　

　

　