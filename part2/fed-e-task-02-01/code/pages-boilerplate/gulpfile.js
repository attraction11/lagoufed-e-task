// 实现这个项目的构建任务
const { src, dest, watch, series, parallel } = require('gulp')
const del = require('del')

const gulpLoadPlugins = require('gulp-load-plugins')
const plugins = gulpLoadPlugins()
const browserSync = require('browser-sync')
const bs = browserSync.create()

const data = require('./pages-config.js')

// 编译scss
const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(plugins.sass({ outputStyle: 'expanded' }))
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}
// 编译JS
const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}
// 处理HTML文件
const html = () => {
    return src(['src/*.html'], { base: 'src' })
        .pipe(plugins.swig({ data, defaults: { cache: false } }))
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}
// 处理图片
const img = () => {
    return src('src/assets/images/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}
// 处理字体
const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}
// 拷贝静态资源
const extra = () => {
    return src('public/**', { base: 'public' })
        .pipe(dest('dist'))
}
// 清除构建后的目录
const clean = () => {
    return del(['temp', 'dist'])
}
// 创建热更新开发服务器
const server = () => {
    // 监听文件的修改，自动执行相关编译任务
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/*.html', html)

    // 降低开发阶段无意义的处理任务，因此监听到资源文件变化后仅刷新浏览器不处理文件
    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'
    ], bs.reload)

    bs.init({
        notify: false,
        port: 2020,
        // open: false,
        // files: 'dist/**',
        server: {
            // 服务器寻找文件的优先级dist-->src-->public
            baseDir: ['temp', 'src', 'public'],
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}

// 文件引用处理
const useref = () => {
    return src('temp/*.html', { base: 'temp' })
        .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        .pipe(plugins.if(/\.html$/, plugins.htmlmin({
            collapseWhitespace: true, // 压缩html文件中的空格
            minifyCSS: true, // 压缩html文件中的内部CSS
            minifyJS: true, // 压缩html文件中的内部JS
            removeComments: true, // 清除HTML注释
            collapseBooleanAttributes: true, // 省略布尔属性的值
            removeEmptyAttributes: true, // 删除所有空格作属性值
            removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true // 删除<style>和<link>的type="text/css"
        })))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        .pipe(dest('dist'))
}

const compile = parallel(style, script, html)
const build = series(
    clean,
    parallel(
        series(compile, useref),
        img,
        extra,
        font
    )
)
const develop = series(compile, server)

module.exports = {
    clean,
    build,
    develop
}