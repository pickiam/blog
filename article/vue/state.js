// src/state.js
import Dep from "./observer/dep.js";
import { observe } from "./observer/index.js";
import Watcher from "./observer/watcher";
// 初始化状态 注意这里的顺序 比如我经常面试会问到 是否能在data里面直接使用prop的值 为什么？
// 这里初始化的顺序依次是 prop>methods>data>computed>watch
export function initState(vm) {
  // 获取传入的数据对象
  const opts = vm.$options;
//   if (opts.props) {
//     initProps(vm);
//   }
//   if (opts.methods) {
//     initMethod(vm);
//   }
  if (opts.data) {
    // 初始化data
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
}

// 初始化data数据
function initData(vm) {
  let data = vm.$options.data;
  //   实例的_data属性就是传入的data
  // vue组件data推荐使用函数 防止数据在组件之间共享
  data = vm._data = typeof data === "function" ? data.call(vm) : data || {};

  // 把data数据代理到vm 也就是Vue实例上面 我们可以使用this.a来访问this._data.a
  for (let key in data) {
    proxy(vm, `_data`, key);
  }
  // 对数据进行观测 --响应式数据核心
  observe(data);
}
// 数据代理
function proxy(object, sourceKey, key) {
  Object.defineProperty(object, key, {
    get() {
      return object[sourceKey][key];
    },
    set(newValue) {
      object[sourceKey][key] = newValue;
    },
  });
}

function createWatcher(vm, exprOrFn, handler, options = {}) {
  if (typeof handler === 'object') {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(exprOrFn, handler, options)
}

function initWatch(vm) {
  let watch = vm.$options.watch;
  for (let k in watch) {
    const handler = watch[k]
    if (Array.isArray(handler)) {
      handler.forEach((handle) => {
        createWatcher(vm, k, handler)
      })
    } else {
      createWatcher(vm, k, handler)
    }
  }
}
function initComputed(vm) {
  const computed = vm.$options.computed
  const watchers = (vm._computedWatchers = {})
  for (let k in computed) {
    const userDef = computed[k]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    watchers[k] = new Watcher(vm, getter, () => {}, { lazy: true })
    defineComputed(vm, k, userDef)
  }
}
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: () => {},
  set: () => {}
}
function defineComputed(vm, k, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key)
  } else {
    sharedPropertyDefinition.get = createComputedGetter(key)
    sharedPropertyDefinition.set = userDef.set
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter(k) {
  return function() {
    const watcher = this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
        if (Dep.target) {
          watcher.depend()
        }
      }
      return watcher.value
    }
  }
}