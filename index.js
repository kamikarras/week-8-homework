let express = require('express')
let app = express()



// app.get('/',(req,res)=>{
//     res.send("hello")
//     console.log("hello")
// })

app.use('/', express.static('public'))

let http = require("http");
let server = http.createServer(app);

server.listen(3000,()=>{
    console.log("listening at 3000")
})

let io = require("socket.io")
io = new io.Server(server);


io.on("connection", (socket)=>{
    console.log("we have a new client connected")
    console.log(socket.id)
  
    socket.on('data', data=>{
      console.log("data recieved")
      console.log(data)
  
      io.emit('dataAll', data)
    })
  
    io.on("disconnect",()=>{
      console.log(socket.id)
    })
  })
  