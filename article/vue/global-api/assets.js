const ASSETS_TYPE = ['component', 'directive', 'filter']

export default function initAssetRegisters(Vue) {
  ASSETS_TYPE.forEach((type) => {
    Vue[type] = function(id, definition) {
      if (type === 'component') {
        definition = this.options._base.extend(definition)
      }
      this.options[type + 's'][id] = definition
    }
  })
}