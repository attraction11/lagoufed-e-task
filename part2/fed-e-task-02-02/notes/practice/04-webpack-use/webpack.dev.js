const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-eval-module-source-map',
    devServer: {
        // hot: true,
        hotOnly: true, // 只会使用热更新
        contentBase: './public',
        proxy: {
            '/api': {
                // http://localhost:8080/api/users -> https://api.github.com/api/users
                target: 'https://api.github.com',
                // http://localhost:8080/api/users -> https://api.github.com/users
                pathRewrite: {
                    '^/api': ''
                },
                // 不能使用 localhost:8080 作为请求 GitHub 的主机名
                changeOrigin: true
            }
        }
    },
    // optimization: {
    //     // usedExports负责标记[枯树叶]
    //     usedExports: true,
    //     // minimize负责[摇掉]他们
    //     minimize: true
    // },
    module: {
        rules: [
            // {
            //     test: /.js$/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /.png$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024 // 10 KB
                    }
                }
            },
            // {
            //     test: /.html$/,
            //     use: {
            //         loader: 'html-loader',
            //         options: {
            //             attrs: ['img:src', 'a:href']
            //         }
            //     }
            // },
            {
                test: /.md$/,
                use: [
                    'html-loader',
                    './markdown-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})
