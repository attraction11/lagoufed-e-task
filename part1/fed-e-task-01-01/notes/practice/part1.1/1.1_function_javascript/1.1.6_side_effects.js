// 不纯的
let mini = 18
// 函数checkAge的返回结果，受全局变量mini的影响（所谓的副作用）
function checkAge (age) {
    return age >= mini
}

// 纯的(有硬编码，后续可以通过柯里化解决)
function checkAge (age) {
    let mini = 18
    return age >= mini
}