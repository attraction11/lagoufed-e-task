const webpack = require('webpack')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const common = require('./webpack.common')
const OptimizeCssAssetsWebpackPlugin = require('mini-css-extract-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
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
                    MiniCssExtractPlugin.loader,
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
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin(['public']),
        new webpack.DefinePlugin({
            // 值要求的是一个代码片段
            API_BASE_URL: JSON.stringify('https://api.example.com')
        }),
        new MiniCssExtractPlugin()
    ]
})
