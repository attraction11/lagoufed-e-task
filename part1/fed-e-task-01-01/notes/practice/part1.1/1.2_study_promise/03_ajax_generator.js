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


function* main() { 
  try {
    const user = yield ajax('./demo.json')
    console.log('user: ', user);

    const post = yield ajax('./post.json')
    console.log('post: ', post);

    const data = yield ajax('./data.json')
    console.log('data: ', data);
   } catch (error) { 
     console.log('error: ', error);

  }
}

function co(generator) { 

}

const g = main()

function handleResult(result) {   
  if (result.done) return
  result.value.then(data => { 
    handleResult(g.next(data))    
  }, error => { 
      g.throw(error)
  })
}

handleResult(g.next())
