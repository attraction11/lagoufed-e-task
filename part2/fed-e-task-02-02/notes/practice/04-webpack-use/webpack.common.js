const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    plugins: [
        // 用于生成 index.html
        new HtmlWebpackPlugin({
            title: 'Webpack Plugin Sample',
            meta: {
                viewport: 'width=device-width'
            },
            template: './src/index.html'
        }),
        // 用于生成 about.html
        new HtmlWebpackPlugin({
            filename: 'about.html'
        }),
        // new CopyWebpackPlugin([
        //     // 'public/**'
        //     'public'
        // ]),
        new MyPlugin(),
    ]
}