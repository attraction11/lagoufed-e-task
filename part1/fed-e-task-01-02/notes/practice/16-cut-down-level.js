// 场景需求：当不同的用户登录课程系统后，访问某个章节的某节课，判断权限逻辑
function doSomeThing (part, chap) {
    const parts = ['ES6', '工程化', 'VUE', 'React', 'Node']
    if (part) {
        if (parts.includes(part)) {
            console.log('属于当前章节')
            if (chap > 5) {
                console.log('您需要VIP 身份')
            }
        }
    } else {
        console.log('请确认模块信息')
    }
}

doSomeThing('ES6', 6)


function doSomeThing (part, chap) {
    const parts = ['ES6', '工程化', 'VUE', 'React', 'Node']
    if (!part) {
        console.log('请确认模块信息')
        return
    }
    if (!parts.includes(part)) return
    console.log('属于当前章节')
    if (chap > 5) {
        console.log('您需要VIP 身份')
    }
}

doSomeThing('ES6', 6)