import { parse } from './parse'
import { generate } from './parse'

export function compileToFunctions(template) {
  let ast = parse(template)
  let code = generate(ast)
  let renderFn = new Function(`with(this){return ${code}}`)
}