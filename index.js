let express = require('express')
let app = express()

let users = []


app.use('/', express.static('public'))

let http = require("http");
let server = http.createServer(app);

let port = process.env.PORT || 3000;
server.listen(port, ()=> {
console.log('listening at ', port);
});


let io = require("socket.io")
io = new io.Server(server);


io.on("connection", (socket)=>{
    console.log("we have a new client connected")
    console.log(socket.id)
    socket.emit("id", socket.id)
    let user = {id: socket.id, position: {}}
    users.push(user)

  
    socket.on('data', data=>{
      console.log("data recieved")
      console.log(data)
        users.forEach(user=>{
            if(user.id==data.id){
                user.position = data.position
            }
        })
      io.emit('dataAll', users)
    })

  
    io.on("disconnect",()=>{

      console.log("disconneted " + socket.id)
    })
  })
  