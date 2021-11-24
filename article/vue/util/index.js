export const LIFECLE_HOOKS = [
  'beforeCreate'
]
const ASSETS_TYPE = ['component', 'directive', 'filter']
const strats = {};

function mergeHook(parentVal, childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal)
    } else {
      return [childVal]
    }
  } else {
    return parentVal
  }
}
LIFECLE_HOOKS.forEach((hook) => {
  strats[hook] = mergeHook
})

function mergeAssets(parentVal, childVal) {
  const res = Object.create(parentVal)
  if (childVal) {
    for (let k in childVal) {
      res[k] = childVal[k]
    }
  }
}
ASSETS_TYPE.forEach((type) => {
  strats[type + 's'] = mergeAssets
})
export function mergeOption(parent, child) {
  const options = {}
  for (let k in parent) {
    mergeField(k)
  }
  for (let k in child) {
    if (!parent.hasOwnProperty(k)) {
      mergeField(k)
    }
  }
  function mergeField(k) {
    if (strats[k]) {
      options[k] = strats[k](parent[k], child[k])
    } else {
      options[k] = child[k] ? child[k] : parent[k]
    }
  }
}

export function isObject(data) {
  //判断是否是对象
  if (typeof data !== "object" || data == null) {
    return false;
  }
  return true;
}

export function isReservedTag(tagName) {
  //判断是不是常规html标签
  // 定义常见标签
  let str =
    "html,body,base,head,link,meta,style,title," +
    "address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section," +
    "div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul," +
    "a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby," +
    "s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video," +
    "embed,object,param,source,canvas,script,noscript,del,ins," +
    "caption,col,colgroup,table,thead,tbody,td,th,tr," +
    "button,datalist,fieldset,form,input,label,legend,meter,optgroup,option," +
    "output,progress,select,textarea," +
    "details,dialog,menu,menuitem,summary," +
    "content,element,shadow,template,blockquote,iframe,tfoot";
  let obj = {};
  str.split(",").forEach((tag) => {
    obj[tag] = true;
  });
  return obj[tagName];
}
