function init() {
    var scene = new THREE.Scene();

    scene.background = new THREE.Color(0x9C9C9C)
    var box = getBox(1,1,1);
    var plane = getPlane(4);
    box.position.y = box.geometry.parameters.height/2;
    plane.rotation.x = Math.PI/2;

    scene.add(box);
    scene.add(plane);

    var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth/window.innerHeight,
      1,
      1000
    );

    camera.position.x=1;
    camera.position.y=2;
    camera.position.z=5;

    camera.lookAt(new THREE.Vector3(0,0,0));

    renderer = new THREE.WebGLRenderer({
      antialias: true
    });

    renderer.setSize(window.innerWidth,window.innerHeight);
    document.getElementById("webgl").appendChild(renderer.domElement);
    renderer.render(
        scene,
        camera
    );
  }
  
  function getBox(w, h, d) {
    var geometry = new THREE.BoxGeometry(1, 1, 1,)
    var material = new THREE.MeshBasicMaterial({
      color:0x97FFFF
    })
    var mesh = new THREE.Mesh(
        geometry,
         material
    )

    return mesh
    
  }
  function getPlane(size) {
    var geometry = new THREE.PlaneGeometry(size,size)
    var material = new THREE.MeshBasicMaterial({
      color:0xFFCCCC,
      side:THREE.DoubleSide
    })
    var mesh = new THREE.Mesh(
        geometry,
        material
    )

    return mesh
  }
    
  init();













