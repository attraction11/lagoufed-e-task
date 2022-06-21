// ---------------------基本类型堆栈处理-------------------------
// var obj1 = { x: 100 }
// var obj2 = obj1
// obj2['x'] = 200
// console.log(obj1.x)

// ---------------------引用类型堆栈处理-------------------------
// var obj1 = { x: 100 }
// var obj2 = obj1
// obj1 = obj1.y = { x: 200 }
// console.log(obj1.y)
// console.log(obj2)

// var a, b, c, d;
// a = b = c = d = { a: 1 };
// a.x = a = b.y = b = c.z = c = {};
// console.log(a, b, c, d);
// console.log(a === b, b === c, c === d, c === d.x, d.x === d.y, d.y === d.z);


// ---------------------函数堆栈处理-------------------------
// var arr = ['aaa', 'bbb']
// function foo (obj) {
//     obj[0] = 'ccc'
//     obj = ['xxxx']
//     obj[1] = 'yyy'
//     console.log(obj)
// }
// foo(arr) // 0x001(0x002) --->  ['xxxx', 'yyy' ]
// console.log(arr) // ['ccc', 'bbb' ]


// ---------------------闭包堆栈处理-------------------------
var a = 1
function foo () {
    var b = 2
    return function (c) {
        console.log(c + b++)
    }
}

var f = foo()
f(5)
f(10)