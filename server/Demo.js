let user = require('./User')

console.log(`userName:${user.userName}`)

let http = require('http')
let url = require('url')
let util = require('util')

http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end(util.inspect(url.parse(req.url)))
}).listen(3000, '127.0.0.1', () => {
  console.log('运行了，输http://127.0.0.1:3000/访问')
})
