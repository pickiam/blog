function curry (fn) {
    console.log(fn.length)
    const args = [].slice.call(arguments, 1);
    return function () {
        return fn.call(this, ...args.concat([].slice.call(arguments)))
    }
}

function test(a,b) {
    return [a,b]
}
console.log(curry(test, 1)(3))