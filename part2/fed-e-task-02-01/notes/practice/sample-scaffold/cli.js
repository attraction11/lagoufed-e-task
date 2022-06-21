#!/usr/bin/env node

// 指定当前文件的运行环境
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux或macOS系统下需要修改此文件的读写权限为755
// 具体就是通过chmod 755 cli.js实现修改
// console.log('cli working')

// 脚手架的工作过程
// 1、通过命令行交互询问用户问题
// 2、根据用户回答的结果生成文件
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name?'
    }
]).then(anwsers => {
    // console.log(anwsers)
    // 根据用户回答的结果生成文件
    // 模板目录
    const tmplDir = path.join(__dirname, 'templates')
    // 目标目录
    const destDir = process.cwd()
    // 将模板下的文件全部转换为目标目录
    fs.readdir(tmplDir, (err, files) => {
        if (err) return err
        files.forEach(file => {
            // 通过模板引擎渲染文件
            ejs.renderFile(path.join(tmplDir, file), anwsers, (err, result) => {
                if (err) return err
                // 将结果写入目标文件目录
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
})
