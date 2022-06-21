//-----------------内存管理流程----------------------------
// // 内存申请
// let obj = {}
// // 内存使用
// obj.name = 'Tom'
// // 内存释放
// obj = null


//-----------------可达对象----------------------------
// function objGroup (obj1, obj2) {
//     obj1.next = obj2
//     obj2.prev = obj1
//     return {
//         o1: obj1,
//         o2: obj2
//     }
// }
// let obj = objGroup({ name: 'obj1' }, { name: 'obj2' })
// // {
// //     o1: { name: 'obj1', next: { name: 'obj2', prev: [Circular] } },
// //     o2: { name: 'obj2', prev: { name: 'obj1', next: [Circular] } }
// // }

// obj.o1 = null
// console.log(obj)
// // {
// //     o1: null,
// //     o2: { name: 'obj2', prev: { name: 'obj1', next: [Circular] } }
// // }


//-----------------引用计数----------------------------
const user1 = { age: 11 }
const nameList = [user1.age]
function fn () {
    const num1 = 1
    console.log(num1)
}
fn()
// 执行完，num1的引用次数变为0