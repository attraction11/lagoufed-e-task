// var test = () => { // 一般写法
//     var i
//     var arr = ['aaa', 'bbb', 123]
//     for (i = 0; i < arr.length; i++) {
//         console.log(arr[i])
//     }
// }

// var test = () => { // 缓存循环体不变量
//     var i
//     var arr = ['aaa', 'bbb', 123]
//     var len = arr.length // 缓存循环体中的不变量
//     for (i = 0; i < len; i++) {
//         console.log(arr[i])
//     }
// }

var test = () => { // // 缓存循环体不变量，同时减少条件判断
    var arr = ['aaa', 'bbb', 123]
    var len = arr.length // 缓存循环体中的不变量
    while (len--) { // 采用while条件自减方式，减少条件判断
        console.log(arr[len])
    }
}

test()


// 总结编程思想：
// 对循环体中的不变量，避免通过查找的方式取值，可以提前进行缓存
// 对于循环体输出内容顺序没要求时，可以采用while循环判断条件后自减的方式，减少条件判断次数