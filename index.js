const http = require('http')
const fs = require('fs').promises

const PORT = 3000

let count = 0
const users = []

const routerGET = {
  '/': async (req, res) => {
    const data = await fs.readFile('./views/index.html', 'utf-8')
    return res.end(data)
  },
  '/about.html': async (req, res) => {
    const data = await fs.readFile('./views/about.html', 'utf-8')
    return res.end(data)
  },
  '/contacts.html': async (req, res) => {
    const data = await fs.readFile('./views/contacts.html', 'utf-8')
    return res.end(data)
  }
}

const requestListener = async (req, res) => {
  const { url, method } = req

  if (method === 'GET' && routerGET[url]) {
    return routerGET[url](req, res)
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
