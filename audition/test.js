// 手写bind
Function.prototype.mybind = function(context, ...args) {
  if (!context || context === null) {
      context = window
  }
  let fn = Symbol()
  context[fn] = this
  let _this = this
  let result = function(...innerArgs) {
    if (this instanceof _this) {
        this[fn] = _this
        this[fn](...[...args,...innerArgs])
        delete this[fn]
    } else {
        context[fn](...[...args, ...innerArgs])
        delete context[fn]
    }
  }
  result.prototype = Object.create(this.prototype)
  return result
}

Function.prototype.MyBind = function(context, ...args) {
    let _this = this
    let result = function(...innerArgs) {
        if (this instanceof _this) {
            _this.apply(this, args.concat(innerArgs))
        } else {
            _this.apply(context, args.concat(innerArgs))
        }
    }
    result.prototype = Object.create(this.prototype)
    return result
}

// new

function createNew(o) {
    let t = Object.create(o.prototype)
    let res = o.call(t)
    if (res && typeof res === 'object') {
        return res
    }
    return t
}
// 寄生组合继承
function sup() {}

function sub() {
    sup.call(this)
}
sub.prototype = Object.create(sup.prototype)
sub.prototype.contructor = sub

// settimeout 模拟 setinterval

function mySetInterval(fn, time) {
    let clear = false
    let timer = null
    let loop = () => {
        if (clear) {
            clear = false
            timer = null
           return
        }
        fn()
        timer = setTimeout(() => {
            loop()
        }, time)
    }
    timer = setTimeout(loop, time)
    return () => {
        clear = true
    }
}
// 手写 promise.all 和 race
function myPromise() {}

myPromise.all = function(arr) {
    let result = []
    let count = 0
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            Promise.resolve(arr[i]).then((res) => {
                count ++
                result[i] = res
                if (count === arr.length) {
                    resolve(result)
                }
            }, err => reject(err))
        }
    })
}
myPromise.race = function(arr) {
    return new Promise((resolve, reject) => {
        for (let val of arr) {
            Promise.resolve(val).then(res => {
                resolve(res)
            }, err => reject(err))
        }
    })
}

// 发布订阅模式

class EventEmitter {
    constructor() {
        this.events = {}
    }
    on() {

    }
    off() {}
    emit() {}
    once() {}
}
const obj = {
    a: {
           b: 1,
           c: 2,
           d: {e: 5}
       },
    b: [1, 3, {a: 2, b: 3}],
    c: 3
   }
   
   // flatten(obj) 结果返回如下
   // {
   //  'a.b': 1,
   //  'a.c': 2,
   //  'a.d.e': 5,
   //  'b[0]': 1,
   //  'b[1]': 3,
   //  'b[2].a': 2,
   //  'b[2].b': 3
   //   c: 3
   // }

   const isObject  = function(val) {
        return typeof val === 'object' && val !== null
   }

   function flatten(obj) {
       if (!isObject(obj)) return 
       let res = {}
       const dfs = (cur, prefix) => {
           if (isObject(cur)) {
                if (Array.isArray(cur)) {
                    cur.forEach((item, index) => {
                        dfs(item, `${prefix}[${index}]`)
                    })
                } else {
                    for (let k in cur) {
                        dfs(cur[k], `${prefix}${ prefix ?  '.' : ''}${k}`)
                    }
                }
           } else {
               res[prefix] = cur
           }
       }
       dfs(obj, '')    
   }
   
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

//     左括号必须用相同类型的右括号闭合。
//     左括号必须以正确的顺序闭合。

// 示例 1：

// 输入：s = "()"
// 输出：true

// 示例 2：

// 输入：s = "()[]{}"
// 输出：true

// 示例 3：

// 输入：s = "(]"
// 输出：false

function isValidString(str) {
    if (str.length % 2 === 1) return false
    const regObj = {
        '(' : ')',
        '[': ']',
        '{': '}'
    }
    const stack = []
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(' || str === '[' || str === '}') {
            stack.push(str[i])
        } else {
            const prev = stack.pop()
            if (regObj(str[i]) !== prev) {
                return false
            }
        }
    }
    if (stack.length) return false
    return true
}

// 编写一个函数来查找字符串数组中的最长公共前缀。
// 如果不存在公共前缀，返回空字符串 ""。

// 示例 1：

// 输入：strs = ["flower","flow","flight"]
// 输出："fl"

// 示例 2：

// 输入：strs = ["dog","racecar","car"]
// 输出：""
// 解释：输入不存在公共前缀。

function search(arr) {
    const str = arr[0]
    let index = 0
    while( index < str.length) {
        const curStr = str.slice(0, index + 1)
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i].startsWith(curStr)) {
                return str.slice(0, index)
            }
        }
        index++
    }
    return str
}
// function whi() {
//     let i = 0
//     while( i < 10) {
//         console.log(i)
//         if (i === 7) {
//             return true
//         }
//         i++
//     }
// }
// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。


// 示例 1:

// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

// 示例 2:

// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

// 示例 3:

// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

// 示例 4:

// 输入: s = ""
// 输出: 0

function lengthOfLongestSubstring(str) {
    if(str.length === 0) return 0
    let left = 0;
    let right = 1;
    let max = 0;
    while(right < str.length) {
        let cur = str.slice(left, right)
        const index = cur.indexOf(str[right])
        if (index > -1) {
           // right = 
           left = left + index + 1
        } else {
            cur = str.slice(left, right + 1)
            max = Math.max(cur.length, max)
        }
        right++
    }
    return max
}

// 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
// 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

// 示例 1：

// 输入：nums = [1,2,0]
// 输出：3

// 示例 2：
               // 2,4 3,5 2
// 输入：nums = [3,4,-1,1]
// 输出：2

// 示例 3：

// 输入：nums = [7,8,9,11,12] // 1,8 
// 输出：1
// 第一种O(n2)
function searchMini(arr) { 
    let i = 0;
    let res = 1;
    while(i < arr.length) {
        if (res === arr[i]) {
            res++
            i = 0
        } else {
            i++
        }
    }
    return res
}
// 第二种O(n)
function search(arr) {
    const set = new Set()
    for (let index = 0; index < arr.length; index++) {
        set.add(arr[index])
    }
    for (let index = 1; index <= arr.length + 1; index++) {
        if (!set.has(i)) {
            return i
        }
    }
}
// 
