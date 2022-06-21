import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
    input: {
        foo: 'src/index.js',
        bar: 'src/album.js',
    },
    output: {
        // file: 'dist/bundle.js',
        // format: 'iife'
        dir: 'dist',
        format: 'amd'
    },
    plugins: [
        // 将调用的结果放到插件中
        json(),
        resolve(),  // 加载npm模块
        commonjs()  // 加载`CommonJS`模式组织的模块
    ]
}