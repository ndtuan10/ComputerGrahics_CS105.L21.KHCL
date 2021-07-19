let camera, scene, renderer;
let floor, geometry, material, object, floorMesh, light, axes, texture;
let gui;
let stats;

let rotation_x = 0.03;
let rotation_y = 0.04;
let alpha = 0;

// Controls
let obControl, afControl;

// Cài đặt các chức năng
const settings = {
  geometry: {
    object: "torus",
    material: "normal",
  },
  camera_setting: {
    x: 0,
    y: 0,
    z: 4,
    fov: 90,
    near: 0.01,
    far: 3,
  },
  display: {
    scale: 1,
    autoRotate: true,
    showAxes: true,
  },
  affine: {
    mode: "none",
  },
  light: {
    enable: true,
    autoRotate: false,
    shadow: true,
    autoMove: false,
    x: 3,
    y: 4,
    z: 0,
  },
};

const init = () => {
  // Thiết lập camera
  camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    20
  );
  camera.position.set(0, 5, 10);
  scene = new THREE.Scene();

  geometry = new THREE.TorusBufferGeometry(1.2, 0.5, 20, 20);
  material = new THREE.MeshNormalMaterial();
  object = new THREE.Mesh(geometry, material);
  object.castShadow = true;
  object.receiveShadow = false;
  object.name = "object";

  light = new THREE.PointLight(0xffffff, 4, 200);
  light.name = "light";
  light.position.set(3, 4, 0);
  light.castShadow = true;

  floor = new THREE.PlaneBufferGeometry(12, 12, 35, 35);
  let floorMat = new THREE.MeshStandardMaterial({ color: 0xbebebe});
  floorMesh = new THREE.Mesh(floor, floorMat);
  floorMesh.receiveShadow = true;
  floorMesh.rotation.x = -Math.PI / 2.0;
  floorMesh.name = "floor";
  floorMesh.position.set(0, -2.5, 0);

  axes = new THREE.GridHelper(100, 2);
  axes.name = "axes";

  const helper = new THREE.PointLightHelper(light);
  
  scene.add(object);
  scene.add(light);
  scene.add(floorMesh);
  scene.add(axes);
  scene.add(helper);

  stats = new Stats();
  document.body.appendChild(stats.dom);

  const canvas = document.querySelector("#canvas");
  renderer = new THREE.WebGLRenderer({ canvas });

  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);

  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 1;
  controls.minDistance = 1;
  controls.maxDistance = 10;

  afControl = new THREE.TransformControls(camera, renderer.domElement);
  afControl.addEventListener("change", () => {
    renderer.render(scene, camera);
  });
  afControl.addEventListener("dragging-changed", (event) => {
    controls.enabled = !event.value;
  });

  scene.add(afControl);
  window.addEventListener("resize", onWindowResize, false);
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

const render = () => {
  requestAnimationFrame(render);

  if (settings["display"].autoRotate === true) {
    object.rotation.x += 0.02;
    object.rotation.y += 0.02;
  }

  if (settings["light"].autoRotate === true) {
    alpha = Math.PI * 0.005 + alpha;
    let new_x = Math.sin(alpha) * 3;
    let new_z = Math.cos(alpha) * 3;

    light.position.set(new_x, light.position.y, new_z);
    if (alpha == 2 * Math.PI) alpha = 0;
  }

  renderer.render(scene, camera);
  stats.update();
};

const Cockpit = () => {
  // Init Control Table
  gui = new dat.GUI();

  // 1. Geometry: Chọn đối tượng (object), surface (material), texture ảnh
  control = gui.addFolder("Geometry");
  control
    .add(settings["geometry"], "object", [
      "torus",
      "cube",
      "cylinder",
      "sphere",
      "teapot",
      "cone",
      "dodecahedron",
      "icosahedron",
      "octahedron",
      "tetrahedron",
      "knot",
      "circle",
      "plane",
    ])
    .onChange(handleGeometry);

  control
    .add(settings["geometry"], "material", [
      "normal",
      "basic",
      "solid",
      "phong",
      "lambert",
      "point",
      "lines",
      "shadow",
      "dots",
      "crate",
      "lenflare",
      "water",
    ])
    .onChange(handleMaterial);

    // 2. Camera Control: x, y, z, field of view, near, far
    control = gui.addFolder("Camera_setting");
    control.add(settings["camera_setting"], "x", -10, 10, 0.05).onChange(() => {
      camera.position.x = settings["camera_setting"].x;
    });
    control.add(settings["camera_setting"], "y", -10, 10, 0.05).onChange(() => {
      camera.position.y = settings["camera_setting"].y;
    });
    control.add(settings["camera_setting"], "z", -10, 10, 0.05).onChange(() => {
      camera.position.z = settings["camera_setting"].z;
    });
    control.add(camera, "fov", 1, 180, 0.1).onChange(() => {
      camera.updateProjectionMatrix();
    });
    control.add(camera, "near", 0.1, 10, 0.1).onChange(() => {
      camera.updateProjectionMatrix();
    });
    control.add(camera, "far", 0.1, 150, 0.1).onChange(() => {
      camera.updateProjectionMatrix();
    });

  // 3.Hiển thị (Display): tăng/giảm kích thước đối tượng (scale), hiển thị trục (show axes), animation (tự động quay, đứng yên - autoRotate)
  control = gui.addFolder("Display");
  control.add(settings["display"], "scale", 0.1, 3, 0.05).onChange(() => {
    object.scale.set(
      settings["display"].scale,
      settings["display"].scale,
      settings["display"].scale
    );
  });

  control.add(settings["display"], "showAxes").onChange(() => {
    axes.visible = !!settings["display"].showAxes;
  });

  control.add(settings["display"], "autoRotate");

  // 4. Các phép biến đổi (Affine Transformation): scale, tranlate, rotate
  control = gui.addFolder("Affine Transform");
  control
    .add(settings["affine"], "mode", ["none", "translate", "scale", "rotate"])
    .onChange(handleAffineTransform);

  // 5. Light: thay đổi vị trí (position, rotation), thay đổi cường độ sáng (power), thay đổi màu sắc (theo hệ màu Hex).
  control = gui.addFolder("Light Control");
  control.addColor(new ColorGUIHelper(light, "color"), "value").name("color"); //chỉnh màu cho light
  control.add(settings["light"], "enable").onChange(() => {
    light.visible = !!settings["light"].enable;
  });
  control.add(settings["light"], "autoRotate");
  control.add(light, "decay", 0, 4, 0.01);
  control.add(light, "power", 0, 150);
  control.add(settings["light"], "x", -10, 10, 0.1).onChange(() => {
    light.position.x = settings["light"].x;
  });
  control.add(settings["light"], "y", -10, 10, 0.1).onChange(() => {
    light.position.y = settings["light"].y;
  });
  control.add(settings["light"], "z", -10, 10, 0.1).onChange(() => {
    light.position.z = settings["light"].z;
  });

  control.add(settings["light"], "x", -10, 10, 0.1).onChange(() => {
    light.rotation.x = settings["light"].x;
  });
  control.add(settings["light"], "y", -10, 10, 0.1).onChange(() => {
    light.rotation.y = settings["light"].y;
  });
  control.add(settings["light"], "z", -10, 10, 0.1).onChange(() => {
    light.rotation.z = settings["light"].z;
  });
};

// Objects: Torus, Cube, Cylinder, Sphere, Teapot, Cone, Dodecahedron, Icosahedron, Octahedron, Tetrahedron, Knot, Circle, Plane
const handleGeometry = () => {
  switch (settings["geometry"].object) {
    case "torus":
      geometry = new THREE.TorusBufferGeometry(1.2, 0.5, 20, 20);
      break;
    case "cube":
      geometry = new THREE.BoxBufferGeometry(2, 2, 2);
      break;
    case "cylinder":
      geometry = new THREE.CylinderBufferGeometry(1.2, 1.2, 1.9, 20, 20);
      break;
    case "sphere":
      geometry = new THREE.SphereBufferGeometry(1.5, 100, 100);
      break;
    case "teapot":
      geometry = new THREE.TeapotBufferGeometry(
        1.2,
        true,
        true,
        true,
        true,
        true
      );
      break;
    case "cone":
      geometry = new THREE.ConeBufferGeometry(1.5, 1.5, 20, 20);
      break;
    case "dodecahedron":
      geometry = new THREE.DodecahedronGeometry(1.5, 0);
      break;
    case "icosahedron":
      geometry = new THREE.IcosahedronGeometry(1.5, 0);
      break;
    case "octahedron":
      geometry = new THREE.OctahedronGeometry(1.5, 0);
      break;    
    case "tetrahedron":
      geometry = new THREE.TetrahedronGeometry(1.5, 0);
      break;
    case "knot":
      geometry = new THREE.TorusKnotGeometry(1, 0.4, 64, 8, 2, 3);
      break;
    case "circle":
      geometry = new THREE.CircleGeometry(1.5, 8, 0, Math.PI * 2);
      break;
    case "plane":
      geometry = new THREE.PlaneGeometry(2, 2, 2, 2);
      break;

    default:
      geometry = new THREE.TorusBufferGeometry(1.5, 1.5, 20, 20);
      break;
  }
  updateObject(geometry, material);
};

// Material: Normal, Basic, Solid, Phong, Lambert, Point, Lines, Shadow
//Texture: Dots, Crate, Lenflare, Water
const handleMaterial = () => {
  switch (settings["geometry"].material) {
    case "normal":
      material = new THREE.MeshNormalMaterial();
      break;
      case "basic":
        material = new THREE.MeshBasicMaterial({color: 0x33ff99});
        break;
    case "solid":
      material = new THREE.MeshStandardMaterial({color: 0x33ff99});
      break;
    case "phong":
      material = new THREE.MeshPhongMaterial({color: 0x33ff99});
      break;
    case "lambert":
      material = new THREE.MeshLambertMaterial({color: 0x33ff99});
      break;
    case "point":
      material = new THREE.PointsMaterial({color: 0x33ff99});
      break;
    case "lines":
      material = new THREE.MeshNormalMaterial();
      material.wireframe = true;
      break;
    case "shadow":
      material = new THREE.ShadowMaterial(0x33ff99);
        break;
    case "dots":
      texture = new THREE.TextureLoader();
      material = new THREE.MeshNormalMaterial({
        map: texture.load("./textures/dots.jpg"),
      });
      break;
    case "crate":
      texture = new THREE.TextureLoader();
      material = new THREE.MeshNormalMaterial({
        map: texture.load("./textures/crate.jpg"),
      });
      break;
    case "lenflare":
      texture = new THREE.TextureLoader();
      material = new THREE.MeshNormalMaterial({
        map: texture.load("./textures/lenflare0.png"),
      });
      break;
    case "water":
      texture = new THREE.TextureLoader();
      material = new THREE.MeshNormalMaterial({
        map: texture.load("./textures/water.jpg"),
      });
      break;
  }
  updateObject(geometry, material);
};

// Affine Transforms: Translate, Scale, Rotate
const handleAffineTransform = () => {
  switch (settings["affine"].mode) {
    case "none":
      console.log(settings["affine"]);
      console.log("detached");
      afControl.detach();
      break;
    case "translate":
      console.log("translate");
      afControl.setMode("translate");
      afControl.attach(object);
      break;
    case "rotate":
      afControl.setMode("rotate");
      afControl.attach(object);
      break;
    case "scale":
      afControl.setMode("scale");
      afControl.attach(object);
      break;
  }
};

// Utilities (clearObject, updateObject)
const clearObject = () => {
  scene.children = scene.children.filter(
    (element) => element.name !== "object"
  );
};

const updateObject = (newShape, newMaterial) => {
  clearAffineTransform();
  clearObject();

  object = new THREE.Mesh(newShape, newMaterial);
  if (settings["light"].shadow === true) {
    object.castShadow = true;
    object.receiveShadow = false;
  }
  object.name = "object";
  scene.add(object);
};

const clearAffineTransform = () => {
  afControl.detach();
  settings["affine"].mode = "none";
};

//màu sắc của nguồn sáng (theo hệ hexa)
class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

// Main
const main = () => {
  init();
  render();
  Cockpit();
};

main();
