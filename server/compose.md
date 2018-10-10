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

        // 同一个中间件调用多次next
        if (i <= index) return Promise.reject(new Error('next() called multiple times'));

        index = i;

        let fn = middleware[i];
        if (i === middleware.length) fn=next;
        if (!fn) return Promise.reslove();

        try {
            // 返回 resolved promise
            return Promise.resolve(fn(context, function next() {
                return dispatch(i + 1)
            }))
        } catch (err) {
            // 返回 reject promise
            return Promise.reject(err)
        }
    }
}
```
一遍看不懂，二遍还是看不懂，三遍自己奔溃了，对于作者真是佩服！！看看koa是怎么调用的

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
    // 第一次fnMiddleware(ctx)调用的是我们的上文的fn返回的dispatch(0),返回的是一个已经resovled或者rejected的promise，可以顺利then或者catch
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }
  ```


