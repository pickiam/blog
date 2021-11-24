import { patch } from './vdom/patch'
import Watcher from './observer/watcher'

export function callhook(vm, hook) {
  const handlers = vm.$options[hook]
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(vm)
    }
  }
}
export function mountComponent(vm, el) {
  vm.$el = el;
  let updateComponent = () => {
    vm._update(vm._render())
  }
  new Watcher(vm, updateComponent, null, true)
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function(vnode) {
    const vm = this;
    const prevVnode = vm._vnode
    if (!prevVnode) {
      patch(vm.$el, vnode)
    } else {
      patch(prevVnode, vnode)
    }
  }
}