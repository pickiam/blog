function myPromise(fn) {
  let state = 'pending'
  const callbacks = []
  let value = null

  this.then = function(onFulfilled, onRejected) {
    return new myPromise((resolve, reject) => {
      handle({
        onFulfilled,
        onRejected,
        resolve,
        reject
      })
    })
  }
  this.catch = function(onError) {
    return this.then(null, onError)
  }
  this.finally = function(onDone) {
    this.then(onDone, onDone)
  }
  this.all = function(arr) {
    const args = Array.prototype.slice.call(arr)
    return new myPromise((resolve, reject) => {
      const len = args.length
      if (len === 0) return resolve([]) 
      function res (i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            const { then } = val
            if (typeof then === 'function') {
              then.call(val, (val) => {
                res(i, val)
              }, reject)
              return
            }
          }
          args[i] = val
          if (--len === 0) {
            resolve(args)
          }
        } catch (error) {
          reject(error)
        }
      }
      for (let i = 0; i < len; i++) {
        res(i, args[i])
      }
    })
  }
  this.race = function(arr) {
    return new myPromise((resolve, reject) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i].then(resolve, reject)
      }
    }) 
  }
  this.resolve = function (value) {
    if (value && value instanceof myPromise) {
      return value
    }
    if (value && typeof value === 'object' && typeof value.then === 'function') {
      const { then } = value
      return new myPromise((resolve) => {
        then(resolve)
      })
    }
    if (value) {
      return new myPromise(resolve => resolve(value))
    }
    return new myPromise(resolve => resolve())
  }

  this.reject = function(value) {
    return new myPromise((resolve, reject) => {
      reject(value)
    })
  }
  const handle = (callback) => {
    if (state === 'pending') {
      callbacks.push(callback)
      return
    }
    const cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
    const next = state === 'fulfilled' ? callback.resolve : callback.reject
    if (!cb) {
      next(value)
      return 
    }
    let ret
    try {
      ret = cb(value)
    } catch (error) {
      callback.reject(error)
    }
    callback.resolve(ret)
  }
  const handelCb = () => {
    while(callbacks.length) {
      const fn = callbacks.shift()
      handle(fn)
    }
  }
  function resolve(newValue) {
    const fn = () => {
      if (state !== 'pending') return
      state = 'fulfilled'
      value = newValue
      handelCb()
    }
    setTimeout(fn, 0)
  }

  function reject(error) {
    const fn = () => {
      if (state !== 'pending') return
      if (error && (typeof error === 'object' || typeof err === 'function')) {
        const { then } = error
        if (typeof then === 'function') {
          then.call(error, resolve, reject)
          return
        }
      }
      state = 'rejected'
      value = error
    }
    setTimeout(fn, 0)
  }
  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }
}