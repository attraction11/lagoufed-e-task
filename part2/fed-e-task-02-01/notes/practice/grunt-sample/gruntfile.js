// Grunt的入口文件
// 用于定义一些需要Grunt自动执行的任务
// 需要导出一个函数，此函数接收一个grunt的形参，内部提供一些创建任务时可以用的API
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
    // -------------------------不同任务的配置------------------------------    
    grunt.initConfig({
        foo: { // 对象的key建议为任务名
            log: 'hello grunt!'
        },
        build: { // 为build任务添加多个目标（子任务）
            options: { // 为多个目标添加默认配置选项
                maxSize: 1000
            },
            css: {
                options: { // 目标的配置选项
                    maxSize: 500
                }
            },
            js: '1'
        },
        clean: { // grunt-contrib-clean插件配置
            temp: 'temp/**'
        },
        sass: { // grunt-sass插件配置
            options: {
                sourceMap: true,
                implementation: sass
            },
            main: {
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        babel: {
            options: {
                presets: ['@babel/preset-env'],
                sourceMap: true,
            },
            main: {
                files: {
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass']
            }
        }
    })

    // -------------------------插件的使用------------------------------
    // grunt.loadNpmTasks('grunt-contrib-clean') // 一般插件名称命名规则：grunt-contrib-任务名称
    // grunt.loadNpmTasks('grunt-sass')
    loadGruntTasks(grunt) // 自动加载所有的grunt插件中的任务

    // -------------------------普通任务------------------------------
    grunt.registerTask('foo', () => {
        console.log(grunt.config('foo.log'))
    })

    grunt.registerTask('bad', () => { // 失败任务
        console.log('bad working~')
        return false // 标记失败
    })

    grunt.registerTask('bar', '任务描述', () => { // 失败任务
        console.log('other task!') // 标记失败
    })

    grunt.registerTask('async-task', function () { // 异步任务
        const done = this.async() // 添加异步任务完成的回调函数
        setTimeout(() => {
            console.log('async task working')
            done()
        }, 1000);
    })

    grunt.registerTask('bad-async', function () { // 失败异步任务
        const done = this.async()
        setTimeout(() => {
            console.log('bad async')
            done(false) // 标记失败
        }, 1000);
    })

    // -------------------------多目标任务（子任务）------------------------------
    // 可以让任务根据配置形成多个子任务
    grunt.registerMultiTask('build', function () {
        console.log(this.options())
        console.log(`target: ${this.target}, data: ${this.data}`)
    })

    grunt.registerTask('default', ['sass', 'babel', 'watch']) // 默认任务
}