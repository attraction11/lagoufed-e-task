# vue-app-base
## 构建步骤
``` bash
# 安装依赖包
npm install

# 在localhost:2000 上热加载服务
npm run serve

# 编译打包整个项目
npm run build

# 修正代码格式问题
npm run lint
```

## 工程介绍
1、项目采用`webpack4+`打包编译项目，通过`webpack-dev-server`在本地启用`web`服务器   
2、项目采用`eslint`通过配置`.eslintrc.js`进行代码风格的检查   
3、项目通过`babel-core`相关的插件进行代码的转换   
4、项目中在`\vue-app-base\config`文件夹中对不同环境下运行代码所需的参数进行配置  
5、项目中在`code\vue-app-base\build`文件夹中对不同环境下运行的`webpack`进行配置  
6、项目中使用到`vue-loader`结合`vue-loader.conf.js`对`vue`文件中的不同语法的样式文件进行转换  
7、项目中对于外部引用的样式文件通过`style-loader!css-loader!postcss-loader`处理  
8、项目中对于各类资源文件结合相关的`loader`进行处理  
9、项目中通过配置`optimization`进行代码分割  
10、项目中结合`webpack`插件以及第三方插件实现更强大的功能，例如：`webpack.HotModuleReplacementPlugin` 实现代码热更新；`webpack.ProvidePlugin`提供全局变量；  
11、项目中结合不同环境下的参数配置，可以自主控制不同插件是否开启，优化打包过程  