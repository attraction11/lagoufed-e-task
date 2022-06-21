const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')

const resolve = file => path.resolve(__dirname, file)

module.exports = (server, callback) => {
    let ready  // promise 的 resolve 方法
    const onReady = new Promise(r => ready = r)
    // 监视构建 --> 更新 renderer

    let serverBundle, template, clientManifest

    const update = () => {
        if (serverBundle && template && clientManifest) {
            ready()
            callback(serverBundle, template, clientManifest)
        }
    }

    // 监视构建 template --> 调用 update --> 更新 renderer 渲染器
    const templatePath = resolve('../index.template.html')
    template = fs.readFileSync(templatePath, 'utf-8')
    // console.log('template: ', template);
    update()
    // 监视 template 文件的变化 chokidar
    chokidar.watch(templatePath).on('change', () => {
        // console.log('template change');
        template = fs.readFileSync(templatePath, 'utf-8')
        update()
    })

    // 监视构建 serverBundle --> 调用 update --> 更新 renderer 渲染器
    const serverConfig = require('./webpack.server.config')
    const serverCompiler = webpack(serverConfig)
    const serverDevMiddleware = devMiddleware(serverCompiler, {
        logLevel: 'silent'  // 关闭日志输出, 由 FriendlyErrorsWebpackPlugin 管理日志输出
    })
    serverCompiler.hooks.done.tap('server', () => {
        bundleObj = serverDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
        serverBundle = JSON.parse(bundleObj)
        // console.log('serverBundle: ', serverBundle);
        update()
    })

    // 监视构建 clientManifest --> 调用 update --> 更新 renderer 渲染器
    const clientConfig = require('./webpack.client.config')
    // ! 热更新配置
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    clientConfig.entry.app = [
        'webpack-hot-middleware/client?reload=true&noInfo=true',  // 和服务端交互处理热更新的一个客户端脚本 noInfo（关闭日志输出）
        clientConfig.entry.app
    ]
    clientConfig.output.filename = '[name].js'  // 热更新模式不能使用内容生成的chunkName, 应该保持输出文件名称一致

    const clientCompiler = webpack(clientConfig)
    const clientDevMiddleware = devMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        logLevel: 'silent'  // 关闭日志输出, 由 FriendlyErrorsWebpackPlugin 管理日志输出
    })
    clientCompiler.hooks.done.tap('client', () => {
        manifestObj = clientDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-client-manifest.json'), 'utf-8')
        clientManifest = JSON.parse(manifestObj)
        // console.log('clientManifest: ', clientManifest);
        update()
    })

    server.use(hotMiddleware(clientCompiler, {
        log: false // 关闭热更新本身的日志输出
    }))

    // ! 将客户端 clientDevMiddleware 中间件挂载到 Express 服务中，提供对其内部内存中数据的访问
    server.use(clientDevMiddleware)

    return onReady
}