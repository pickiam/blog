## koa中间件的执行顺序

Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。正如同官网所言，我们用koa组织代码及其简洁，添加第三方的中间件只需调用app.use(fn);app.use的官方实现如下：

```javascript
this.middleware = [];

use (fn) {
    ...一系列判断参数的操作
    this.middleware.push(fn);
    return this;
}
```
可以看出当我们调用app.use实际执行的操作就是将中间件函数push到middleware数组中，执行的时候只需要从middleware取出，看起来还是蛮简单的，koa是借助koa-compose暴露的compose的函数实现这一过程。既然是compose是关键，compose的实现

```javascript

function compose (middleware) {
    // 判断middleware是否为数组
    if (!Array.isArray(middleware)) {
        throw new TypeError('Middleware stack must be an array!')
    }
    // 判断middleware中的每个元素是否为函数
    for (let fn of middleware) {
        if (typeof fn !== 'function') {
            throw new TypeError('Middleware must be composed of functions!')
        }
    }
    // compose 返回的是一个匿名函数 参数context是根据上下文传递下来，next为undefind
    return function(context, next) {
        let index = -1;
        return dispatch(0);
    }

    function dispatch(i) {

        // 判断同一个中间件是否多次调用next
        if (i <= index) return Promise.reject(new Error('next() called multiple times'));
        // 游标后移
        index = i;

        let fn = middleware[i];
        // 游标数值等于middleware的长度， fn赋值undefind
        if (i === middleware.length) fn = next;
        // 直接返回resolved的promise
        if (!fn) return Promise.reslove();

        try {
            // 返回 resolved promise
            return Promise.resolve(fn(context, function next() {
                return dispatch(i + 1)
            }))
        } catch (err) {
            // 返回 rejected promise
            return Promise.reject(err)
        }
    }
}
```

```javascript
 callback() {
     // 第一次调用的fn = function(context, next) {let index = -1 return dispatch(0);}
    const fn = compose(this.middleware);

    if (!this.listenerCount('error')) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      // 封装 ctx,暂不在讨论范围
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }
    handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    // 第一次fnMiddleware(ctx)调用的是我们的上文的fn返回的dispatch(0),第一次调用next(),实际调用的disptch(1),以此类推dispatch(2)...dispatch(n - 1),直到最后返回一个空的Promise.resolve();
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }
  ```
  执行流程大概如此

  ```javascript

  function a() {console.log(1); return 'aaaa'}
  function b() {console.log(2);Promise.resolve(a());console.log(3); return 'bbbb'};
  function c() {console.log(4);Promise.resolve(b());console.log(5); return 'cccc'};


  Promise.resolve(c()).then(res => console.log(res))
  // 输出
  4 2 1 3 5 'cccc'

  ```
这个输出跟koa的洋葱模型是相同的
 
 其实关于compose函数，reduce和redux也有实现

 ```javascript

 function compose(...funcs) {
     if (funcs.length === 0) {
         return arg => arg
     }
     if (funcs.length === 1) {
         return funcs[0]
     }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))

 }
// 第 1 次 reduce 的返回值，下一次将作为 a
arg => fn1(() => fn2(arg));

// 第 2 次 reduce 的返回值，下一次将作为 a
arg => (arg => fn1(() => fn2(arg)))(() => fn3(arg));

// 等价于...
arg => fn1(() => fn2(() => fn3(arg)));

// 执行最后返回的函数连接中间件，返回值等价于...
fn1(() => fn2(() => fn3(() => {})));

```

以上是现在比较流行库的官方实现，总而言之高大上，现在总结一下compose实现的几种思路

### 面向过程

这个思路就是使用递归的过程思想，不断的检测队列中是否还有任务，如果有任务就执行，并把执行结果往后传递，这里是一个局部的思维，无法预知任务何时结束。直观上最容易结束和理解。


```javascript
 function compose(...funcs) {
    let result;
    let length = funcs.length;
    let count = length - 1;
    return f(...args) {
        result = funcs[count].call(this, ...args);
        if (count <= 0) {
            return result;
        }
        count--;
        return f.call(null, result)
    }

 }
 ```
上面的方式其实就是koa实现方式的简易版

 ### 函数组合

 这个思路是一种函数组合的思想，将函数两两组合，不断的生成新的函数，生成的新函数挟裹了函数执行的逻辑信息，然后再两两组合，不断的传递下去，这种思路可以提前遍历所有任务，将任务组合成一个可以展开的组合结构，最后执行的时候就像推导多米诺骨牌一样

 ```javascript

f1 = (...arg) => step2.call(null, init.apply(null, arg))
f2 = (...arg) => step3.call(null, f1.apply(null, arg))
f3 = (...arg) => step4.call(null, f2.apply(null, arg))

function compose (...args) {
    let pipe = (f,g) => (...arg) => g.call(null, f.call(null, ...arg));
    return function (...argus) {
        args.reverse().reduce(pipe)(argus)
    }
}
```
其实上边的代码的实现都离不离开遍历和递归，在js的世界里这两方面也是极其重要的


