window.addEventListener('load', function () {
    let socket = io();
    let position= { x: 0, y: 1.6, z: -3 }
    var sceneEl = document.querySelector('a-scene');

    let spheres = []
    let myId=''
    let ids=[]

    socket.on('connect', (socket) => {
        console.log(socket);
       
      });
      socket.on('id', id=>{
        myId=id;
        
        console.log("welcome " + id)

       

      })
      socket.on('dataAll',users=>{
        console.log(users);
        users.forEach(user=>{
            
            spheres.forEach(sphere=>{
                if(!ids.includes(sphere.id)){
                    ids.push(sphere.id)
                    console.log('ids '+ids)
                }
                if(sphere.id == user.id){
                    sphere.setAttribute('position',  {x:user.position.x, y:user.position.y, z:user.position.z-3});
                    
                }
            })
            if(!ids.includes(user.id)){
                let userSphere = this.document.createElement("a-entity");

        userSphere.setAttribute('geometry', {
            primitive: 'sphere',
            height: 1,
            width: 1,
            depth: 1
        });
        userSphere.setAttribute('position', user.position);
        userSphere.id = user.id
        sceneEl.appendChild(userSphere)
        spheres.push(userSphere)
            }
            console.log(spheres)
        })
    })
      const sendPosition = ()=>{
        let camera = document.querySelector("#camera")
          position = camera.getAttribute('position')
          let data= {position:position, id:myId}
          socket.emit('data',data)
          this.window.requestAnimationFrame(sendPosition)
      }
      window.requestAnimationFrame(sendPosition)

    //   this.document.addEventListener("keypress",()=>{
    //       let camera = document.querySelector("#camera")
    //       position = camera.getAttribute('position')
    //       let data= {position:position, id:myId}
    //       socket.emit('data',data)
    //   })
})