let callbacks = [];
let pending = false;

function flushCallbacks() {
  pending = false;
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i]()
  }
}

let timeFunc //定义异步方法 采用优雅降级

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve();
  timeFunc = () => {
    p.then(flushCallbacks)
  }
} else if (typeof MutationObserver !== 'undefined') {

} else if (typeof setImmediate !== 'undefined') {
  timeFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timeFunc = setTimeout(() => {
    flushCallbacks()
  }, 0);
}

export function nextTick(cb) {
  callbacks.push(cb)
  if (!pending) {
    pending = true;
    timeFunc()
  }
}