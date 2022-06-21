// 演示lodash
// first / last / toUpper / each / includes / find /findIndex
const _ = require('lodash')

const array = ['jack', 'tom', 'lucy', 'kate']

console.log(_.first(array))
console.log(_.last(array))
console.log(_.toUpper(_.first(array)))
console.log(_.reverse(array))

_.forEach(array, (item, index) => { 
    console.log(item, index)
})

