const express = require('express')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const setupDevServer = require('./build/setup-dev-server')

const server = express()

let renderer  // Vue ssr渲染器
let onReady  // 打包状态（promise类）
const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
    // 生产模式，直接基于已构建好的包创建渲染器
    const serverBundle = require('./dist/vue-ssr-server-bundle.json')
    const template = fs.readFileSync('./index.template.html', 'utf-8')
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')
    renderer = createBundleRenderer(serverBundle, {
        template,  // 指定服务端渲染的模板和指定编码
        clientManifest
    })
} else {
    // 开发模式: 监视打包构建 -> 打包构建（客户端 + 服务端） -> 创建渲染器
    onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
        renderer = createBundleRenderer(serverBundle, {
            template,  // 指定服务端渲染的模板和指定编码
            clientManifest
        })
    })
}

// 使用处理静态资源的中间件（将服务器中dist文件夹中的资源开放出来）
// express.static 处理的是物理磁盘中的资源文件
server.use('/dist', express.static('./dist'))

// 路由处理渲染函数
const render = async (req, res) => {
    try {
        const html = await renderer.renderToString({
            title: '渲染示例',
            meta: `<meta name="description" content="渲染示例">`,
            url: req.url,
        })

        res.setHeader('Content-Type', 'text/html; charset=utf8')
        res.end(html)
    } catch (error) {
        res.status(500).end('Internal Server Error.')
    }
}

server.get('*', isProd ? render : async (req, res) => {
    // 等待有了 renderer 渲染器后，调用 render 进行渲染
    await onReady
    render(req, res)
})

server.listen(3000, () => {
    console.log('server running at port 3000.')
})
