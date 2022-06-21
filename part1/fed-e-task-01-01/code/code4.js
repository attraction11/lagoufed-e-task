// Array.from(new Set([1,2,3,3,4,4])) //[1,2,3,4]
// [...new Set([1,2,3,3,4,4])] //[1,2,3,4]

// Array.prototype.distinct = function() {
//     const map = {}
//     const result = []
//     for (const n of this) {
//         if (!(n in map)) {
//             map[n] = 1
//             result.push(n)
//         }
//     }
//     return result
// }
// const list = [1,2,3,3,4,4].distinct(); //[1,2,3,4]
// console.log('list: ', list);

function distinct(array) {
  let map = {}
  let result = []
  for (const i of array) {
    if (!(i in map)) {
      map[i] = array[i]
      result.push(i)
    }
  }
  return result
}

const newArr = distinct([1, 2, 3, 4, 3, 2, 5, 6])
console.log('newArr: ', newArr)
