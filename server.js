const http      = require('http')

const app       = require('./app')
const port      = process.env.PORT | 3000

const server = http.createServer(app)
server.listen(()=>{
    console.log(`listening to port ${port}`)
})
