## this的指向

> this永远指向最后调用它的那个对象

```javascript

var name = "windowsName";
var a = {
    name: "aname",
    fn : function () {
        console.log(this.name);      // aname
    }
}
a.fn();
```
因为fn的调用对象是a, 所以打印出来的是a.name,下面是一个是一个相反的例子


```javascript

var name = 'windwosName';
var a = {
    // name: 'aname',
    fn: function () {
        console.log(this.name)  // undefined
    }
}
a.fn();
```
原理同上，fn的调用对象是a, 所以应该打印出来的是a.name,由于a的name属性并不存在，并不会向上查找，所以打印出来的值为undefined

```javascript
var name = 'windowsName';
var a = {
    name: 'aname',
    fn: function () {
        console.log(this.name)
    }
}
var f = a.fn;
f();  // windowsName
```
f的调用对象是window,理所当然的调用的是window上的name属性

```javascript
    var name = "windowsName";

    function fn() {
        var name = 'aname';
        innerFunction();
        function innerFunction() {
            console.log(this.name);      // windowsName
        }
    }

    fn()
```

总而言之，this永远指向最后调用它的那个对象

## 改变this的指向

- 箭头函数
- 调用上层保存this的值
- apply、call、bind
- new操作符

### 箭头函数

箭头函数的 this 始终指向函数定义时的 this，而非执行时。箭头函数没有this绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则this绑定的是最近一层非箭头函数的this,否则this为undefined

```javascript
    var name = "windowsName";

    var a = {
        name : "aname",

        func1: function () {
            console.log(this.name)     
        },

        func2: function () {
            setTimeout( () => {
                this.func1()
            },100);
        }, 
        func3: function () {
            setTimeout(function () {
                this.func1()
            }, 100)
        }

    };

    a.func2()     // aname
    a.func3()    // undefined
    // a.func3()，最后调用setTimeout的对象是window
```
### 调用上层保存this的值

```javascript
    var name = "windowsName";

    var a = {

        name : "aname",

        func1: function () {
            console.log(this.name)     
        },

        func2: function () {
            var _this = this;
            setTimeout( function() {
                _this.func1()
            },100);
        }

    };

    a.func2()       // aname
```
this指向的是最后调用的值，由于func2最后的调用对象是a,所以this指向的a,我们用变量保存这个值

### 使用apply、call、bind

```javascript
    var a = {
        name : "aname",

        func1: function () {
            console.log(this.name)
        },

        func2: function () {
            setTimeout(  function () {
                this.func1()
            }.apply(a),100);
        },
        func3: function () {
            setTimeout(function () {
                this.func1()
            }.call(a), 100)
        },
        func4: function () {
            setTimeOut(function () {
                this.func1()
            }.bind(a), 100)
        }

    };

    a.func2()            // aname
    a.func3()            // aname
    a.func4()            // aname
```
## apply、call、bind区别

> apply() 方法调用一个函数, 其具有一个指定的this值，以及作为一个数组（或类似数组的对象）提供的参数

### 语法

> fun.apply(thisArg, [argsArray])

- thisArg：在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。

- argsArray：一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。浏览器兼容性请参阅本文底部内容

apply 和 call 基本类似，他们的区别只是传入的参数不同。

### call语法

> fun.call(thisArg[, arg1[, arg2[, ...]]])

 apply 和 call 的区别是 call 方法接受的是若干个参数列表，而 apply 接收的是一个包含多个参数的数组或者类数组。

 ### bind和apply、call区别

 > bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列

 由此可以看出，bind是创建一个新的函数，必须手动去调用

 ### new操作符


```javascript

 function myFunction (username) {
     this.name =  username
 }

 let yoursFunction = new MyFunction('dojo')
 ```
 new的过程发生了什么，通常也是面试经常遇到的

 1. let obj = {}; 创建一个空对象
 2. obj._proto_= MyFunction.prototype 将新创建的空对象的隐式原型指向其构造函数的显示原型。
 3. var result = MyFunction.call(obj,args) 使用call改变this的指向
 4. return typeOf result === 'obj' ? result : obj 判读上一步产生的是否是对象，如是对象直接返回，若不是对象返回obj
