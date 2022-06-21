# 一、简答题

#### 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
`webpack`的概述：  
`webpack`是一个模块打包工具，它将一切文件都视为模块，通过`loader`编译转换文件，通过`plugin`注入钩子，最后
将输出的资源模块组合成文件。主要的配置信息有`entry`、`output`、`module`、`plugins`

构建流程：
- 创建`compiler`实例，用于控制构建流程，`compiler`实例包含`webpack`基本环境信息
- 根据配置项转换成对应的内部插件，并初始化`options`配置项
- 执行`compiler.run`
- 创建`comppilation`实例，每次构建都会新建一个`comppilation`实例，包含了这次构建的基本信息
- 从`entry`开始递归分析依赖，对每个依赖模块会进行`buildModule`,通过`Loader`将不同类型的模块转换成`webpack`模块
- 通过`Parser.parse`将上面的结果转换成AST树
- 遍历`AST`树，收集依赖`dependency`,并保存在`compilation`实例的`dependiencies`属性中
- 生成`chunks`,不同`entry`生成不同`chunk`, 动态导入也会生成自己的`chunk`,生成`chunk`后还会进行优化
- 使用`template`基于`compilation`的数据生成结果代码

总结：  
`webpack`打包输出的文件其实就是一个闭包，传入的参数是一个对象，键值为所有输出文件的路径，内容为`eval`包裹的文件内容；闭包内重写了模块的加载方式，自己定义了`__webpack_require__`方法，来实现模拟的`common.js`规范模块加载机制。  
`webpack`实际是基于事件流的，通过一系列的插件运行。`webpack`利用`tapable`库提供各种钩子来实现对于整个构建流程各个步骤的控制。

#### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
`Loader`：  
用于对模块文件进行编译转换和加载处理，在`modules.rules`数组中进行配置，它用于告诉`webpack`在遇到什么类型的文件，应该采用哪些`Loader`进行加载和转换，`loader`可以通过`querystring`或`object`的方式指定选项参数。处理一类文件可以使用多个`loader`,`loader`的执行顺序类似出栈的方式（从后向前执行）  

`Plugin`:  
主要是通过`webpack`内部的钩子机制，在`webpack`构建的不同阶段执行一些额外的工作。从打包 优化和压缩，到从新定义环境变量，功能强大到可以用来处理各种各样的任务。`plugin`让`webpack`的机制更加灵活，他的编译过程中留下的一系列生命周期钩子，通过调用这些钩子来实现在不同编译结果时对源模块进行处理。它的插件是一个函数或者一个包含`apply`方法的对象，接收一个`compile`对象，通过`webpack`的钩子来处理资源

开发`Loader`的思路:
- 通过module.export 导出一个函数
- 函数的默认参数为要处理的文件source
- 函数体中处理资源
- 返回处理后结果（交给下一个loader 进行处理）
```js
const marked = require('marked')

module.exports = source => { 
    // console.log(source)
    const html = marked(source)
    // 返回一段js代码
    // return `export default ${JSON.stringify(html)}`
    return html
}
```

开发`Plugin`的思路:
- 通过钩子机制实现,在生命周期的钩子中挂载函数实现扩展
- 函数方法体内通过webpack提供的api获取资源做相应处理
- 将处理完的资源通过webpack提供的方法返回
```js
class MyPlugin {
    apply (compiler) {
        console.log('自定义插件')
        // tap方法注册钩子函数（emit是其中一个钩子）
        compiler.hooks.emit.tap('MyPlugin', compilation => {
            // compilation可以理解为此次打包的上下文
            for (const name in compilation.assets) {
                if (name.endsWith('.js')) {
                    const contents = compilation.assets[name].source()
                    const withoutComments = contents.replace(/\/\*\*+\*\//g, '')
                    compilation.assets[name] = {
                        source: () => withoutComments,
                        size: () => withoutComments.length
                    }
                }
            }
        })
    }
}
```

# 二、编程题

#### 1、使用 Webpack 实现 Vue 项目打包任务

具体任务及说明：

1. 在 code/vue-app-base 中安装、创建、编辑相关文件，进而完成作业。
2. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
3. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
4. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
5. 尽可能的使用上所有你了解到的功能和特性



**提示：(开始前必看)**

在视频录制后，webpack 版本以迅雷不及掩耳的速度升级到 5，相应 webpack-cli、webpack-dev-server 都有改变。

项目中使用服务器的配置应该是改为下面这样：

```json
// package.json 中部分代码
"scripts": {
	"serve": "webpack serve --config webpack.config.js"
}
```

vue 文件中 使用 style-loader 即可

**其它问题, 可先到 https://www.npmjs.com/ 上搜索查看相应包的最新版本的配置示例, 可以解决大部分问题.**



#### 作业要求

本次作业中的编程题要求大家完成相应代码后

- 提交一个项目说明文档，要求思路流程清晰。
- 或者简单录制一个小视频介绍一下实现思路，并演示一下相关功能。
- 最终将录制的视频或说明文档和代码统一提交至作业仓库。