var name = 'map'
function print() {
  console.log(this.name)
}
var object = {
  name: 'object',
  getNamePrinter: function(fn) {
    fn && fn()
    return () => {
      console.log(this.name)
    }
  }
}

const arrowFunction = object.getNamePrinter(print)
arrowFunction()
//map object
//map map
const getNamePrinter = Object.getNamePrinter;
const arrowFunction1 = getNamePrinter(print)
arrowFunction1()

console.log(1)
async function async1() {
  return new Promise((resolve) => {
    console.log(2)
    resolve()
  }).then(() => {
    console.log(3)
  })
}

async function async2() {
  console.log(4)
  await async1()
  console.log(5)
}
async2()
console.log(6) 
// 1 4 2 6 3 5


// 深层比较两个对象
var a = {a: 1, b: {c: 2}}
var b = {a: 1, b: {c: 2}}

function compare(a,b) {
  let result = true
  if (Object.keys(a).length !== Object.keys(b).length) {
    result = false
  }
  for (let k in a) {
    if (!b[k]) {
      result = false
      break
    }
    if (Object.prototype.toString.call(a[k]) === '[object Object]' && Object.prototype.toString.call(b[k]) === '[object Object]') {
      result = compare(a[k], b[k])
      if (!result) break
    } else if(a[k] !== b[k]) {
      result = false
      break
    }
  }
  return result
}
console.log(compare(a,b))
// 数据下表查询
function search(arrTarget, target) {
  let result = []
  for (let i = 0; i < arrTarget.length; i++) {
    for (let j = arrTarget.length - 1; i < j; j--) {
      if ((arrTarget[i] + arrTarget[j]) === target) {
        result.push(...[i, j])
      }
    }
  }
  return result
}
function search(arrTarget, target) {
  let result = []
  let map = new Map()
  for (let i = 0; i < arrTarget.length; i++) {
    if (map.has(target - arrTarget[i])) {
      result.push(...[i, map.get(target - arrTarget[i])])
    }
    map.set(arrTarget[i], i)
  }
}
function debounce(fn, delay) {
  let timer
  return function() {
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
search([1,2,3,4,5], 5)

function customAdd(a,b) {
    let maxLen = Math.max(a.length, b.length)
    let num = 0
    let result = ''
    let i = 1
    while(maxLen >= i) {
        let aLast = a.length - i >= 0 ? +a[a.length - i] : 0
        let bLast = b.length - i >= 0 ? +b[b.length - i] : 0
        const total = aLast + bLast + num
        if (total >= 10) {
            num = 1
        } else {
            num = 0
        }
        result = String(total).slice(-1) + result
        i++
    }
    return result
}
customAdd('23243', '34') //23277