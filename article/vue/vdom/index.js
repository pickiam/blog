import { isObject, isReservedTag } from '../util/index'
export default class Vnode {
  constructor(tag, data, key, children, text) {
    this.tag = tag;
    this.data = data;
    this.key = key;
    this.children = children;
    this.text = text
  }
}

export function createElement(vm, tag, data = {}, ...children) {
  let key = data.key;
  if (isReservedTag(tag)) {
    return new Vnode(tag, data, key, children)
  } else {
    let Ctor = vm.$options.components[tag]
    return createComponent(vm, tag, data, key, children, Ctor)
  }
}
function createComponent(vm, tag, data, key, children, Ctor) {
  if (isObject(Ctor)) {
    Ctor = vm.$options._base.extend(Ctor)
  }
  data.hook = {
    init(vnode) {
      let child = (vnode.componentInstance = new Ctor({ isComponent: true }))
      child.$mount()
    }
  }
  return new Vnode(
    `vue-component-${Ctor.cid}-${tag}`,
    data,
    key,
    undefined,
    undefined,
    {
      Ctor,
      children
    }
  )
}
export function createTextNode(text) {
  return new Vnode(undefined, undefined, undefined, undefined, text)
}