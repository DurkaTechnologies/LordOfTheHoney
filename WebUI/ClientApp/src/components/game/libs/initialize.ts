import * as THREE from "three";
import { resizeEvent, dblClickEvent, escClickEvent } from "./windowEvents";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from "dat.gui"
import { Generator } from "./3dLib/objects"

export const initializeThree = () => {
  // Canvas;
  const canvas = document.querySelector("#webgl");

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas as Element,
  });
  renderer.physicallyCorrectLights = true;

  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  //Setting Renderer size
  renderer.setSize(sizes.width, sizes.height);

  // Perspective Camera
  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, document.getElementById('webgl')!);
  controls.target.set(0, 5, 0);
  controls.update();
  
  // Events
  resizeEvent(sizes, camera, renderer);
  dblClickEvent(canvas);
  escClickEvent();

  // Creating SCENE
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#82b2ff');

  Generator.Plane(scene, 40, 80);

  {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(0, cubeSize / 2, 0);
    scene.add(mesh);
  }

  class ColorGUIHelper {
    object: any;
    prop: string;

    constructor(object: any, prop: string) {
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

  function makeXYZGUI(gui: dat.GUI, vector3: THREE.Vector3, name: string, onChangeFn?: any) {
    const folder = gui.addFolder(name);
    folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
    folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
    folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
    folder.open();
  }

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.PointLight(color, intensity);
    light.power = 800;
    light.decay = 2;
    light.distance = Infinity;
    light.position.set(0, 10, 0);
    scene.add(light);

    const helper = new THREE.PointLightHelper(light);
    scene.add(helper);

    // const gui = new dat.GUI();
    // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    // gui.add(light, 'decay', 0, 4, 0.01);
    // gui.add(light, 'power', 0, 4000);

    // makeXYZGUI(gui, light.position, 'position');
  }

  function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
};
