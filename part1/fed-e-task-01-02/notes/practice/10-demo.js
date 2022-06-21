function Foo () {
    this.m = 10
    this.n = 24
    this.getM = function () {
        console.log(this.m)
    }
}

Foo.prototype.getM = function () {
    console.log(this.m)
}

Foo.prototype.getN = function () {
    console.log(this.n)
}


let foo1 = new Foo
let foo2 = new Foo

console.log(foo1)


Function.__proto__ === Function.prototype
Object.__proto__ === Function.prototype
Function.__proto__ === Object.__proto__


// this包含在AO或GO中