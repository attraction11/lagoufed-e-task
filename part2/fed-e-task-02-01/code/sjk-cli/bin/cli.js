#!/usr/bin/env node

// console.log('hello~')

const inquirer = require('inquirer')
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

// 加载需要和构建者命令行交互的问题内容
const cliConfig = require('../cli-config')

inquirer.prompt(cliConfig).then(answers => {
    // 获取当前脚手架项目中模板文件所在的目录
    const temp = path.join(__dirname, '../templates')
    // 获取脚手架cli命令执行的目录
    const src = process.cwd()
    // 遍历模板文件所在的目录，拿到不同文件的名称
    fs.readdir(temp, (error, files) => {
        // 处理文件读取错误的情况
        if (error) throw error
        // 遍历获取的文件名称数组
        files.forEach(file => {
            // 将命令行交互收集到的用户回答数据，通过ejs渲染到每一个文件中
            ejs.renderFile(path.join(temp, file), answers, (renderErr, resp) => {
                if (renderErr) throw renderErr
                // 指定数据渲染后的数据，写入的目录路径
                let outDir = path.join(src, 'src')
                //通过设置参数二中的recursive为true，则可以递归创建目录
                fs.mkdir(outDir, { 'recursive': true }, (err) => {
                    if (err) throw err
                    fs.writeFileSync(path.join(outDir, file), resp)
                })
            })
        })
    })

})