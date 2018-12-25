## 函数柯里化

### 基本概念

> 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数

#### 高程例子

```javascript

function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        return fn.call(this, ...args.concat(Array.prototype.slice.call(arguments)))
    }
}

// 验证

function test(a,b) {
    return [a,b]
}

console.log(curry(test, 1)(3))   // 输出 [ 1, 3 ]
console.log(curry(test, 1, 3)()) // 输出 [ 1, 3 ]
console.log(curry(test)(1, 3))  // 输出 [ 1, 3 ]
```

由此可见 你可以一次性地调用 curry 函数，也可以每次只传一个参数分多次调用。

上边的例子有着柯里化的影子，但是有一些简单，现在有一个复杂一点的


```javascript

function curry(fn, length) {
    length = length || fn.length;
    var slice = Array.prototype.slice;
    return function () {
        if (arguments.length < length)  {
            let combined = [fn].concat(slice.call(arguments))
            return curry(sub_curry.apply(this, combined), length - arguments.length)
        } else {
            return fn.call(this, ...arguments)
        }
    }
}
var fn = curry(function(a, b, c) {
    return [a, b, c];
});

console.log(fn("a", "b", "c")) // ["a", "b", "c"]
console.log(fn("a", "b")("c")) // ["a", "b", "c"]
console.log(fn("a")("b")("c")) // ["a", "b", "c"]
console.log(fn("a")("b", "c")) // ["a", "b", "c"]
console.log(fn("a")("b", "c", 'd'))

```

简洁的实现方式
```javascript
var curry = fn =>
    judge = (...args) =>
        args.length === fn.length
            ? fn(...args)
            : (...arg) => judge(...args, ...arg)
```