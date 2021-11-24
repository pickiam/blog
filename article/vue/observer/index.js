import Dep from './dep';
import { arrayMethods } from '/array.js'
class Observer {
    // 观测值
    constructor(value) {
      Object.defineProperty(value, '__ob__', {
        value: this,
        enumerable: false,
        writable: true,
        configurable: true
      })
      if (Array.isArray(value)) {
        value.__proto__ = arrayMethods
        this.observeArray(value)
      }
      this.walk(value);
    }
    walk(data) {
      // 对象上的所有属性依次进行观测
      let keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = data[key];
        defineReactive(data, key, value);
      }
    }
    observeArray(items) {
      for (let i = 0; i < items.length; i++) {
        observe(items[i])
      }
    }
  }
  // Object.defineProperty数据劫持核心 兼容性在ie9以及以上
  function defineReactive(data, key, value) {
    let childob = observe(value); // 递归关键
    let dep = new Dep()
    // --如果value还是一个对象会继续走一遍odefineReactive 层层遍历一直到value不是对象才停止
    //   思考？如果Vue数据嵌套层级过深 >>性能会受影响
    Object.defineProperty(data, key, {
      get() {
        if (Dep.target) {
          dep.depend()
          if (childob) {
            childob.dep.depend()
            if (Array.isArray(value)) {
              dependArray(value)
            }
          }
        }
        return value;
      },
      set(newValue) {
        if (newValue === value) return;
        observe(newValue)
        value = newValue;
        dep.notify()
      },
    });
  }
  function dependArray(value) {
    for (let e, i = 0, l = value.length; i < l; i++) {
      e = value[i]
      e && e.__ob__ && e.__ob__.dep.depend()
      if (Array.isArray(e)) {
        dependArray(e)
      }
    }
  }
  export function observe(value) {
    // 如果传过来的是对象或者数组 进行属性劫持
    if (
      Object.prototype.toString.call(value) === "[object Object]" ||
      Array.isArray(value)
    ) {
      return new Observer(value);
    }
  }
  