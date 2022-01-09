import * as THREE from "three";
import { resizeEvent, dblClickEvent, escClickEvent } from "./windowEvents";

export const initializeThree = () => {
  /**
   * Base
   */

  // Canvas;
  const canvas = document.querySelector("#webgl");

  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Scene
  const scene = new THREE.Scene();

  // Object
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  scene.add(mesh);

  // Camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 2;
  camera.lookAt(mesh.position);
  scene.add(camera);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas as Element,
  });
  renderer.setSize(sizes.width, sizes.height);

  //Events
  resizeEvent(sizes, camera, renderer);
  dblClickEvent(canvas);
  escClickEvent();

  // Animate
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // Update objects
    mesh.rotation.y = elapsedTime;
    // Render
    renderer.render(scene, camera);
    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
};
