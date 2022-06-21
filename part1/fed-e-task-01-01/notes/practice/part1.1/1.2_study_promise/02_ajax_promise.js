function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }

    xhr.send()
  })
}

const p1 = ajax('./demo.json')
const p2 = p1.then(
  (value) => {
    console.log('value: ', value)
  },
  (reason) => {
    console.log('reason: ', reason)
  }
)
console.log('p2: ', p2)
