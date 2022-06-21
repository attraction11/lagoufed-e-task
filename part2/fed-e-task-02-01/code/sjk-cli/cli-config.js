module.exports = [
    {
        type: 'input',
        name: 'title',
        message: 'title name?'
    },
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
    },
    {
        type: 'list',
        name: 'gender',
        message: 'What is your gender?',
        choices: [{ value: '男' }, { value: '女' }, { value: '未知' }],
    },
    {
        type: 'input',
        name: 'age',
        message: 'What is your age?'
    },
    {
        type: 'checkbox',
        name: 'hobby',
        message: 'What is your hobby?',
        choices: [{ value: '游泳' }, { value: '打篮球' }, { value: '跑步' }, { value: '动漫' }, { value: '敲代码' }],
    },
    {
        type: 'confirm',
        name: 'select',
        message: 'Are you sure of your choice?'
    }
]