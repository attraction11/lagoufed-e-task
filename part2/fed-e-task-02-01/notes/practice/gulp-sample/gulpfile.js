// const gulp = require('gulp')
const fs = require('fs')
const { series, parallel } = require('gulp');
const { src, dest } = require('gulp');
const cleanCss = require('gulp-clean-css'); // css压缩
const rename = require('gulp-rename'); // 文件重命名
const { Transform } = require('stream');


// ----------------任务基本写法-----------------------
// gulp的入口文件
// gulp4+版本及以前版本任务的写法(仍可用，但不推荐)
// gulp.task('bar', done => {
//     console.log('bar working~')
//     done()
// })

// gulp5+版本任务的写法(推荐此种导出函数成员的方式)
// exports.foo = done => {
//     console.log('foo task working')
//     done() // 标识任务完成
// }


// ----------------组合任务写法------------------------
const task1 = done => {
    setTimeout(() => {
        console.log('task1 working~')
        done()
    }, 1000);
}

const task2 = done => {
    setTimeout(() => {
        console.log('task2 working~')
        done()
    }, 1000);
}

const task3 = done => {
    setTimeout(() => {
        console.log('task3 working~')
        done()
    }, 1000);
}

exports.foo = series(task1, task2, task3) // 串行执行
exports.bar = parallel(task1, task2, task3) // 并行执行


// ----------------异步任务写法------------------------
// 1、回调函数
exports.callback = done => {
    console.log('callback task~')
    done()
}
exports.callback_error = done => {
    console.log('callback task~')
    done(new Error('task failed~'))
}

// 2、promise方式
exports.promise = () => {
    console.log('promise task~')
    return Promise.resolve()
}
exports.promise_error = () => {
    console.log('promise task~')
    return Promise.reject(new Error('task failed~'))
}

// 3、async/await的方式
const timeout = time => {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    })
}
exports.async = async () => {
    await timeout(1000)
    console.log('async task~')
}


// 4、任务流式写法
exports.stream = () => {
    const readStream = fs.createReadStream('package.json')
    const writeStream = fs.createWriteStream('temp.txt')
    readStream.pipe(writeStream)
    return readStream // 默认流式操作的结束事件触发后后会回调done()方法
}

// 模拟stream流式操作的结束事件的处理
// exports.stream = done => {
//     const readStream = fs.createReadStream('package.json')
//     const writeStream = fs.createWriteStream('temp.txt')
//     readStream.pipe(writeStream)
//     readStream.on('end', () => {
//         done()
//     })
// }


// ----------------构建过程核心工作原理------------------------
exports.core_work = () => {
    // 文件读取流
    const read = fs.createReadStream('src/normalize.css')
    // 文件写入流
    const write = fs.createWriteStream('normalize.min.css')
    // 文件转换流
    const transform = new Transform({
        transform: (chunk, encoding, callback) => {
            // 核心转换过程实现
            // chunk => 读取流中读取到的内容（Buffer）
            const input = chunk.toString()
            const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
            callback(null, output)
        }
    })

    // 把读取出来的文件流经过转换后写入文件流
    read.pipe(transform).pipe(write)
    return read
}


// ----------------Gulp文件操作API------------------------
exports.file_opt = () => {
    return src('src/*.css')
        .pipe(cleanCss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('dist'))
}