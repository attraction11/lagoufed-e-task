const p1 = new Promise((resolve, reject) => {
  resolve(100)
  // reject(new Error('some reason'))
})

p1.then(
  (value) => {
    console.log('value: ', value)
  },
  (reason) => {
    console.log('reason: ', reason)
  }
)

console.log('end~')
