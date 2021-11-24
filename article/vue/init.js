// src/init.js
import { initState } from "./state";
import { mergeOption } from './util/index'
import { compileToFunctions } from './compiler/index'
import { callhook, mountComponent } from './lifecycle'
import Watcher from "./observer/watcher";
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    // 这里的this代表调用_init方法的对象(实例对象)
    //  this.$options就是用户new Vue的时候传入的属性

    vm.$options = mergeOption(vm.constructor.options, options);
    callhook(vm, 'beforeCreate')
    // 初始化状态
    initState(vm);
    callhook(vm, 'created')
    if (vm.$options.$el) {
        vm.$mount(vm.$options.el)
    }
  };
  Vue.prototype.$watch = function(exprOrFn, cb, options) {
    const vm = this;
    new Watcher(vm, exprOrFn, cb, {...options, user: true})
    if (options.immediate) {
      cb()
    }
  }
  Vue.prototype.$mount = function(el) {
    const vm = this
    const options = vm.$options;
    el = document.querySelector(el)
    if (!options.render) {
      let template = options.template
      if (!template && el) {
        template = el.outerHTML
      }
      if (template) {
        const render = compileToFunctions(template)
        options.render = render
      }
    }
  }
  return mountComponent(vm, el)
}
