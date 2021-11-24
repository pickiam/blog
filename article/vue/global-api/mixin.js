import { mergeOption } from '../util/index'
export default function initMixin(Vue) {
  Vue.Mixin = function(mixin) {
    this.options = mergeOption(this.options, mixin)
  }
}