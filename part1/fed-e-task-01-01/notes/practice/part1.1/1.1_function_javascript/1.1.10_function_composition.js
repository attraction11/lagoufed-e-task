function composition (f, g) { 
    return function (value) {
        return f(g(value))
    }
}
reverse = array =>array.reverse()
first = array => array[0]

const last = composition(first, reverse)
console.log(last([1,2,3,4])) // 4