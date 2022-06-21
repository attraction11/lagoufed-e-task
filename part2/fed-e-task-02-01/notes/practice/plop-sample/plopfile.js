// Plop入口文件，需要导出一个函数
// 此函数接收一个plop对象，用于创建生成器任务
module.exports = plop => {
    plop.setGenerator('component', {
        description: 'create a component',
        prompts: [ // 命令行交互询问
            {
                type: 'input',
                name: 'name', // 键
                message: 'component name', // 问题
                default: 'MyComponent' // 默认答案
            }
        ],
        actions: [ // 生成器动作，即将要生成文件的配置
            {
                type: 'add', // 代表添加文件
                path: 'src/components/{{name}}/{{name}}.js',
                templateFile: 'plop-templates/component.hbs'
            },
            {
                type: 'add', // 代表添加文件
                path: 'src/components/{{name}}/{{name}}.css',
                templateFile: 'plop-templates/component.css.hbs'
            },
            {
                type: 'add', // 代表添加文件
                path: 'src/components/{{name}}/{{name}}.test',
                templateFile: 'plop-templates/component.test.hbs'
            }
        ]
    })
}