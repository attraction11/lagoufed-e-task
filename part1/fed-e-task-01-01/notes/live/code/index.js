var zce = 100
function fn () {
    var zce = 200
    return function (a) {
        console.log(a + zce++)
    }
}

var foo = fn()
foo(10)
foo(20)




var a = 10
function foo (a) {
    return function (b) {
        console.log(b + (++a))
    }
}
var fn = foo(10)
fn(5)
foo(6)(7)
fn(20)
console.log(a)




