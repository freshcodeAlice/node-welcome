const http = require('http')
const fs = require('fs')

const PORT = 3000

let count = 0

const requestListener = (req, res) => {
  fs.readFile('./views/index.html', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    }
    res.end(data)
  })
  //   res.end(`hello from node! your request is ${count++}`)
}

const server = http.createServer(requestListener)

server.listen(PORT)
