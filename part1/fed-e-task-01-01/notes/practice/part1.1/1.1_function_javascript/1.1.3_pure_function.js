let numbers = [1, 2, 3, 4, 5]
// 纯函数
numbers.slice(0, 3) // => [1, 2, 3]
numbers.slice(0, 3) // => [1, 2, 3]
numbers.slice(0, 3) // => [1, 2, 3]

// 不纯的函数
numbers.splice(0, 3) // => [1, 2, 3]
numbers.splice(0, 3) // => [4, 5]
numbers.splice(0, 3) // => []

// 自定义纯函数
function sum (n1, n2) {
    return n1 + n2
}
console.log(sum(1 + 2)) // 3
console.log(sum(1 + 2)) // 3
console.log(sum(1 + 2)) // 3
