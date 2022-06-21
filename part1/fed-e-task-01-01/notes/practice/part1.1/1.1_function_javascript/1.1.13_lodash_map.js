// lodash 和 lodash/fp 模块中map方法的区别
const _ = require('lodash')
console.log(_.map(['22', '6', '10'], parseInt)) // [ 22, NaN, 2 ]
// parseInt('22', 0, ['22', '6', '10'])
// parseInt('5', 0, ['22', '6', '10'])
// parseInt('10', 0, ['22', '6', '10'])

const fp = require('lodash/fp')
console.log(fp.map(parseInt,['22', '6', '10'])) // [ 22, 6, 10 ]