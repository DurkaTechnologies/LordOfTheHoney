import * as THREE from "three";
import { PerspectiveCamera, WebGLRenderer } from "three";

export const resizeEvent = (
  sizes: any,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
) => {
  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
};

export const dblClickEvent = (canvas: any) => {
  window.addEventListener("dblclick", () => {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
      /* Firefox */
      canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) {
      /* IE/Edge */
      canvas.msRequestFullscreen();
    }
  });
};

export const escClickEvent = () => {
  document.addEventListener("fullscreenchange", exitHandler);
  document.addEventListener("webkitfullscreenchange", exitHandler);
  document.addEventListener("mozfullscreenchange", exitHandler);
  document.addEventListener("MSFullscreenChange", exitHandler);

  function exitHandler(event: Event) {
    if (
      !document.fullscreenElement &&
      // @ts-ignore
      !document.webkitIsFullScreen &&
      // @ts-ignore
      !document.mozFullScreen &&
      // @ts-ignore
      !document.msFullscreenElement
    ) {
      event.preventDefault();
    }
  }
};
