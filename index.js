const http = require('http')
const PORT = 3000

let count = 0

const requestListener = (req, res) => {
  res.end(`hello from node! your request is ${count++}`)
}

const server = http.createServer(requestListener)

server.listen(PORT)
