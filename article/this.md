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