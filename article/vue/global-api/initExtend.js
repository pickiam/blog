import { mergeOption } from '../util/index'
export default function initExtend(Vue) {
  let cid = 0;
  Vue.extend = function(extendOptions) {
    const Sub = function VueComponent(options) {
      this._init(options)
    }
    Sub.cid = cid++;
    Sub.prototype = Object.create(this.prototype)
    Sub.prototype.constructor = Sub;
    Sub.options = mergeOption(this.options. extendOptions)
    return Sub
  }
}