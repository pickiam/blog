import Vnode from ".";

export function patch(oldVnode, vnode) {
  if (!oldVnode) {
    return createElm(vnode)
  }
  const isRealElement = oldVnode.nodeType;
  if (isRealElement) {
    const oldElm = oldVnode;
    const parentElm = oldElm.parentNode;
    let el = createElm(vnode);
    parentElm.insertBefore(el, oldElm.nextSibling)
    parentElm.removeChild(oldVnode)
    return el;
  } else {
    if (oldVnode.tag !== vnode.tag) {
      oldVnode.el.parentNode.removeChild(createElm(Vnode), oldVnode.el)
    }
    if (!oldVnode.tag && !vnode.tag) {
      if (oldVnode.text !== vnode.text) {
        oldVnode.el.textContent = vnode.text
      }
    }

    const el = (vnode.el = oldVnode.el)
    updateProperties(vnode, oldVnode.data)
    const oldCh = oldVnode.children || []
    const newCh = vnode.children || []
    if (oldCh.length > 0 && newCh.length > 0) {
      updateChildren(el, oldCh, newCh)
    } else if (oldCh.length) {
      el.innerHTML = ''
    } else if (newCh.length) {
      for (let i = 0; i < newCh.length; i++) {
        const child = newCh[i]
        el.appendChild(createElm(child))
      }
    }
  }
}
// 
function createComponent(vnode) {
  let i = vnode.data
  if ((i = i.hook) && (i = i.init)) {
    i(vnode)
  }
  if (vnode.componentInstance) {
    return true
  }
}
function createElm(vnode) {
  let { tag, data, key, children, text } = vnode;
  if (typeof tag === 'string') {
    if (createComponent(vnode)) {
      return vnode.componentInstance.$el;
    }
    vnode.el = document.createElement(tag)
    updateProperties(vnode)
    children.array.forEach(child => {
      return vnode.el.appendChild(createElm(child))
    });
  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

function updateProperties(vnode, oldProps = {}) {
  let newProps = vnode.data || {};
  let el = vnode.el; //真实节点
  for (const k in oldProps) {
    if (!newPropsp[k]) {
      el.removeAttribute(k)
    }
  }
  const newStyle = newProps.style || {}
  const oldStyle = oldProps.style || {}

  for (const key in oldStyle) {
    if (!newStyle[k]) {
      el.style[k] = ''
    }
  }
  for (let key in newProps) {
    // style需要特殊处理下
    if (key === "style") {
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
    } else if (key === "class") {
      el.className = newProps.class;
    } else {
      // 给这个元素添加属性 值就是对应的值
      el.setAttribute(key, newProps[key]);
    }
  }
}
function isSameVnode(oldVnode, newVnode) {
  return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key
}
function updateChildren(parent, oldCh, newCh){
  let oldStartIndex = 0;
  let oldStartVnode = oldCh[0]
  let oldEndIndex = oldCh.length - 1
  let oldEndVnode = oldCh[oldEndIndex]
  let newStartIndex = 0
  let newStartVnode = newCh[0]
  let newEndIndex = newCh.length - 1
  let newEndVnode = newCH[newEndIndex]

  function makeIndexByKey(children) {
    let map = {}
    children.forEach((item, index) => {
      map[item.key] = index
    })
    return map
  }
  let map = makeIndexByKey(oldCh)

  while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (!oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIndex]
    } else if (!oldEndVnode) {
      oldEndVnode = oldCh[--oldEndIndex]
    } else if (isSameVnode(oldStartVnode, newStartVnode)) {
      patch(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIndex]
      newStartVnode = newCh[++newStartIndex]
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      patch(oldEndVnode, newEndIndex)
      oldEndVnode = oldCh[--oldEndIndex]
      newEndVnode = newCH[--newEndIndex]
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      patch(oldStartVnode, newEndVnode)
      parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling)
      oldStartVnode = oldCh[++oldStartIndex]
      newEndVnode = newCh[--newEndIndex]
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      patch(oldEndVnode, newStartVnode)
      parent.insertBefore(oldEndVnode.el, oldStartVnode.el)
      oldEndVnode = oldCh[--oldEndIndex]
      newStartVnode = newCh[++newEndIndex]
    } else {
      let moveIndex = map[newStartVnode.key]
      if (!moveIndex) {
        parent.insertBefore(createElm(newStartVnode), oldStartVnode.el)
      } else {
        let moveVnode = old[moveIndex]
        old[moveIndex] = undefined;
        parent.insertBefore(moveVnode.el, oldStartVnode.el)
        patch(moveVnode, newStartVnode)
      }
      newStartVnode = newCh[newStartIndex]
    }
  }
  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oleEndIndex; i++) {
      let child = oldCh[i]
      if (child !== undefined) {
        parent.removeChild(child.el)
      }
    }
  }
  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      const ele = newCh[newEndIndex + 1] == null ? null : newCh[newEndIndex + 1].el
      parent.insertBefore(createElm(newCh[i]), ele)
    }
  }
}