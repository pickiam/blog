var getNumbers = () => {
    return Promise.resolve([1, 2, 3])
  }
  var multi = num => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (num) {
          resolve(num * num)
        } else {
          reject(new Error('num not specified'))
        }
      }, 1000)
    })
  }
  const f = async (x) => {
    var res = await multi(x)
    console.log(res)
  }
  async function test () {
    var nums = await getNumbers()
    nums.forEach(f())
  }
  test()
  