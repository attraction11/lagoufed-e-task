var a = 10
function foo (a) {
    return function (b) {
        console.log(b + (++a))
    }
}
var fn = foo(10) // 0x001
fn(5)  // 0x002(5) --->16
foo(6)(7) // 14
fn(20) // 20+12 = 32
console.log(a) // 10