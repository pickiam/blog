Function.prototype.myBind = (context, ...args) => {
  const fn = Symbol()
  context[fn] = this
  const _this = this
  const result = function(...innerArgs) {
    // new操作
    if (this instanceof _this) {
      _this(...[...args, ...innerArgs])
    }else {
      // 正常函数调用
      context[fn](...[...args, ...innerArgs])
      delete context[fn]
    }
  }
  result.prototype = Object.create(_this.prototype)
  return result
}
    