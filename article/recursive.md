## 递归

> 一个过程或函数在其定义或说明中有直接或间接调用自身的一种方法，它通常把一个大型复杂的问题层层转化为一个与原问题相似的规模较小的问题来求解，递归策略只需少量的程序就可描述出解题过程所需要的多次重复计算，大大地减少了程序的代码量。


### 递归的调用栈

一个常见的例子

```javascript

function factorial(n) {
    if (n === 0) {
        return 1
    }

    return n * factorial(n - 1)
}

```
如果我们传入参数3，将会递归调用factorial(2)、factorial(1)和factorial(0)，因此会额外再调用factorial三次。
每次函数调用都会压入调用栈，整个调用栈如下:

```javacript

factorial(0) // 0的阶乘为1 
factorial(1) // 该调用依赖factorial(0)
factorial(2) // 该调用依赖factorial(1)
factorial(3) // 该掉用依赖factorial(2)

```

当传入巨大的数值作为参数时，就会存在递归常见的错误，爆栈 Maximum call stack size exceeded，毕竟操作系统为JS引擎调用栈分配的内存是有大小限制的。当然此类错误是有办法去规避的，防止爆栈错误常见的方式

- 消除尾递归
- 递归转化成循环

### 什么是尾递归

在了解什么是尾递归，我们还看一下什么是尾调用

```javascript

function foo() {console.log(33)}
function bar() {foo()}
function baz() {bar()}
baz()
```
上面的代码我们在日常的工作中满普遍的，其实没啥太大的问题，就是依次调用baz -> bar -> foo，但是如果和如下的代码相比较，看看有什么区别

```javascript
'use strict'
function foo() {console.log(33)}
function bar() {return foo()}
function baz() {return bar()}
baz()
```
代码执行其实效果是相同的，但是（特定情况下）调用栈的情况确实不太相同的，特定情况指的是开启严格模式或者node的低版本需要--harmony_tailcalls去开始尾调用模式

造成这种结果是因为每个函数在调用另一个函数的时候，并没有 return 该调用，所以JS引擎会认为你还没有执行完，会保留你的调用帧。正如第一种情况下，baz的调用帧会一直保存。调用栈的情况会依次baz->bar->foo入栈，foo->bar->baz出栈。第二种情况由于尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用记录，只要直接用内层函数的调用记录取代外层函数的调用记录就可以了，调用栈中始终只保持了一条调用帧。

那什么是尾递归，那就很明显了

```javascript

function foo () {
    return foo();
}
```
我们采用尾递归的方式，改写第一个factorial函数

```javacript

function factorial(n, total) {
    if (n === 0) retrun total
    return factorial(n - 1, n * total)
}
```
由此可见，尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。 要做到这一点，需要把函数内部所有用到的中间变量改写为函数的参数，就像上面的factorial()函数改写一样。


我们通常深复制和浅复制需要用到递归

一个简易的深复制函数通常是这样子的

```javacript

function cloneDeep(source) {
    var target = {};
    for(var i in source) { // for in 可以获取到所有enumable为true的事情，包括继承来的
        if (source.hasOwnProperty(i)) { //hasOwnProperty 自身所具有的
            if (typeof source[i] === 'object') {
                target[i] = cloneDeep(source[i]); // 注意这里
            } else {
                target[i] = source[i];
            }
        }
    }
    return target;
}

var source = {
    a: 1,
    b: {
        c: {
            d: {
                e： {
                    f: 1
                }
            }
        }
    }
}
```
当我们cloneDeep(source)时，当source的层级不是特别深的时候，用递归是没有问题的，当层次过深的时候可能会出现爆栈的错误，所以我们可以用循环替代递归

```javacript
function cloneloop (x) {
    let root = {};
    let loopList = [
        {
            parent: root,
            key: undefined,
            data: x
        }
    ]
    while(loopList.length) {
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data
        let res = parent;
        if (typeof key !== undefined) {
            res = parent[key] = {}
        }

        for (let index in data) {
            if (data.hasOwnProperty(index)) {
                if (typeof data[index] == 'object') {
                    loopList.push({
                        parent: res,
                        key: index,
                        data: data[index]
                    })
                } else {
                    res[index] = data[index]
                }
            }
        }
    }
    return root
}
```
递归改循环，需要一个中间栈,通过一个中间栈来控制执行的结束







