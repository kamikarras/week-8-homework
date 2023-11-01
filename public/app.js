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
        // let mySphere = this.document.createElement("a-entity");
        // mySphere.setAttribute('geometry', {
        //     primitive: 'sphere',
        //     height: 1,
        //     width: 1,
        //     depth: 1
        // });
        // mySphere.setAttribute('material', 'color', 'red')
        // mySphere.setAttribute('position', position);
        // mySphere.id = 'id'
        // sceneEl.appendChild(mySphere)
        // spheres.push({sphere:mySphere, id: id})
       

      })
      socket.on('dataAll',users=>{
        console.log(users);
        // spheres[0].sphere.setAttribute('position', {x:obj.x, y:obj.y, z:obj.z-3});
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
                userSphere.setAttribute('material', 'color', '#'+Math.floor(Math.random()*16777215).toString(16))
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
      

      this.document.addEventListener("keypress",()=>{
          let camera = document.querySelector("#camera")
          position = camera.getAttribute('position')
          let data= {position:position, id:myId}
          socket.emit('data',data)
      })
})