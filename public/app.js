window.addEventListener('load', function () {
    let socket = io();
    let position= { x: 0, y: 1.6, z: -3 }
    var sceneEl = document.querySelector('a-scene');


    let mySphere = this.document.createElement("a-entity");
    mySphere.setAttribute('geometry', {
        primitive: 'sphere',
        height: 1,
        width: 1,
        depth: 1
    });
    mySphere.setAttribute('position', position);
    sceneEl.appendChild(mySphere)

    socket.on('connect', () => {
        console.log("Connected");
      });
      socket.on('dataAll',obj=>{
        console.log(obj);
        mySphere.setAttribute('position', {x:obj.x, y:obj.y, z:obj.z-3});
    })
      

      this.document.addEventListener("keypress",()=>{
          let camera = document.querySelector("#camera")
          position = camera.getAttribute('position')
          socket.emit('data', position)
      })
})