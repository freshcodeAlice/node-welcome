const http = require('http')
const fs = require('fs').promises

const PORT = 3000

let count = 0
const users = []

const requestListener = async (req, res) => {
  const { url, method } = req

  if (method === 'GET') {
    if (url === '/') {
      const data = await fs.readFile('./views/index.html', 'utf-8')
      return res.end(data)
    }

    if (url === '/about.html') {
      const data = await fs.readFile('./views/about.html', 'utf-8')
      return res.end(data)
    }
    if (url === '/contacts.html') {
      const data = await fs.readFile('./views/contacts.html', 'utf-8')
      return res.end(data)
    }
  }

  if (method === 'POST') {
    if (url === '/create-user') {
      let jsonString = ''
      req.on('data', chunk => {
        jsonString += chunk
      })
      req.on('end', () => {
        const user = JSON.parse(jsonString)
        delete user.password
        user.id = users.length
        users.push(user)
        console.log(users)
        res.end(JSON.stringify(user))
      })
    }
  }

  const data = await fs.readFile('./views/404.html', 'utf-8')
  return res.end(data)
}

const server = http.createServer(requestListener)

server.listen(PORT)
