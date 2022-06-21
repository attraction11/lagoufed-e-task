// 模拟map
const map = (arr, fn) => {
    let results = []
    for (value of arr) {
        results.push(fn(value))
    }
    return results
}
// 测试
// let arr = [1, 2, 3]
// arr = map(arr, v => v * v)
// console.log(arr)

// 模拟every
const every = (arr, fn) => { 
    let result = true
    for (value of arr) { 
        result = fn(value)
        if(!result) break
    }
    return result
}
// 测试
// let arr = [15, 11]
// let r = every(arr, v => v > 10)
// console.log(r)

// 模拟some
const some = (arr, fn) => { 
    let result = false
    for (value of arr) { 
        result = fn(value)
        if(result) break
    }
    return result
}
// 测试
// let arr = [1, 2, 9, 7]
// let r = some(arr, v => v % 2 === 0)
// console.log(r)