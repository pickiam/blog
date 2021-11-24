import initExtend from './initExtend'
import initAssetRegisters from './assets'
const ASSETS_TYPE = ["component", "directive", "filter"];

export function initGlobalApi(Vue) {
  Vue.options = {};
  ASSETS_TYPE.forEach((type) => {
    Vue.options[type + 's'] = {};
  })
  Vue.options._base = Vue;
  initExtend(Vue)
  initAssetRegisters(Vue)
}