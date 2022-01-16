import * as THREE from "three";
import * as CANNON from "cannon-es";
import { resizeEvent, dblClickEvent, escClickEvent } from "./windowEvents";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import VoxelWorld from "./3dLib/VoxelWorld/VoxelWorld";
import Primitives from "./3dLib/primitives";

import { PointerLockControlsCannon } from "./controlers/PersonController";
//@ts-ignore
import { GPUPicker } from "three_gpu_picking";
import { Quaternion, Vector2, Vector3 } from "three";

import { VoxelLandscape } from "./3dLib/VoxelWorld/VoxelLandscape";

import { mapFromCannon, mapFromThree } from "./mapperVector";
import { WorldGenerator } from "./3dLib/VoxelWorld/WorldGenerator";

export class InitializeGame {
  initialize: () => void;
  initializeThree: () => void;
  initCannon: () => void;
  initControls: () => void;
  render: () => void;
  switchHeader: (data: boolean) => void;
  getGeneratingBlockDirection: () => CANNON.Vec3 | undefined;

  world: CANNON.World;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  worldGenerator: WorldGenerator;
  primitives: Primitives;

  cubeHelperMesh: THREE.Mesh | null = null;
  cubeHelperBody: CANNON.Body | null = null;

  //@ts-ignore
  controls: PointerLockControlsCannon;
  //@ts-ignore
  camera: THREE.PerspectiveCamera;

  sphereBody: CANNON.Body;
  physicsMaterial: CANNON.Material;

  time = Date.now();

  boxMeshes: Array<THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>> =
    [];
  boxes: Array<CANNON.Body> = [];

  isRayLineShow = true;

  lastCallTime = performance.now() / 1000;

  lookAtVector: THREE.Vector3 = new Vector3();
  positionVector: THREE.Vector3 = new Vector3();

  //@ts-ignore
  floor: THREE.Mesh;

  // groundBody: CANNON.Body;
  defaultMaterial: THREE.MeshLambertMaterial;

  constructor(switchHeader: (data: boolean) => void) {
    this.switchHeader = switchHeader;

    this.world = new CANNON.World();
    this.scene = new THREE.Scene();

    this.physicsMaterial = new CANNON.Material("physics");
    // this.groundBody = new CANNON.Body({
    //   mass: 0,
    //   material: this.physicsMaterial,
    // });
    this.sphereBody = new CANNON.Body({
      mass: 5,
      material: this.physicsMaterial,
    });

    this.defaultMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd });

    const canvas = document.querySelector("#webgl");
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas as Element });

    this.render = () => {
      requestAnimationFrame(this.render);

      if (this.cubeHelperMesh !== null && this.cubeHelperBody !== null) {
        this.primitives.clearCube(
          this.cubeHelperBody as CANNON.Body,
          this.cubeHelperMesh as THREE.Mesh
        );
      }

      const time = performance.now() / 1000;
      const dt = time - this.lastCallTime;
      this.lastCallTime = time;

      // if (resizeRendererToDisplaySize(renderer)) {
      //   const canvas = renderer.domElement;
      //   this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      //   this.camera.updateProjectionMatrix();
      // }

      this.world.step(1 / 60);

      const direction = this.getGeneratingBlockDirection();
      if (direction) {
        const box = this.primitives.createCube(direction, true, false);
        this.cubeHelperBody = box.body;
        this.cubeHelperMesh = box.mesh;
      }

      this.controls.update(dt);
      this.renderer.render(this.scene, this.camera);
    };

    const loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = () => {
      console.log("loadingManager: loading started");
    };
    loadingManager.onLoad = () => {
      console.log("loadingManager: loading finished");
    };
    loadingManager.onProgress = () => {
      console.log("loadingManager: loading progressing");
    };
    loadingManager.onError = () => {
      console.log("loadingManager: loading error");
    };

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "textures/flourish-cc-by-nc-sa.png",
      this.render
    );
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;

    this.worldGenerator = new WorldGenerator(this.world, this.scene, texture);

    this.primitives = new Primitives(
      this.world,
      this.scene,
      this.worldGenerator
    );

    this.initializeThree = () => {
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      //Setting Renderer size
      this.renderer.setSize(sizes.width, sizes.height);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const fov = 75;
      const aspect = 2; // the canvas default
      const near = 0.1;
      const far = 1000;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

      // this.camera.position.set(
      //   -cellSize * 0.3,
      //   cellSize * 0.8,
      //   -cellSize * 0.3
      // );

      resizeEvent(sizes, this.camera, this.renderer);
      // dblClickEvent(canvas);
      // escClickEvent();

      this.scene.background = new THREE.Color("lightblue");

      const addLight = (x: number, y: number, z: number) => {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(x, y, z);

        this.scene.add(light);
      };

      addLight(-1, 2, 4);
      addLight(1, -1, -2);

      const axes = new THREE.AxesHelper(10);
      this.scene.add(axes);

      let renderRequested: boolean | undefined = false;

      function randInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
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

      const requestRenderIfNotRequested = () => {
        if (!renderRequested) {
          renderRequested = true;
          requestAnimationFrame(this.render);
        }
      };

      const stayBlock = () => {
        if (this.controls.enabled) {
          const direction = this.getGeneratingBlockDirection();
          if (direction) {
            const box = this.primitives.createCube(direction).body;
            this.boxes.push(box);
          }

          if (this.isRayLineShow) {
            const materialLine = new THREE.LineBasicMaterial({
              color: 0x0000ff,
            });

            const points = [];
            points.push(this.positionVector);
            points.push(this.lookAtVector);

            const geometry = new THREE.BufferGeometry().setFromPoints(points);

            const line = new THREE.Line(geometry, materialLine);

            this.scene.add(line);
          }
        }
      };

      // controls.addEventListener("change", requestRenderIfNotRequested);
      window.addEventListener("resize", requestRenderIfNotRequested);
      window.addEventListener("click", stayBlock);
    };
    this.initCannon = () => {
      let sphereShape: CANNON.Sphere;
      let physicsMaterial;

      // Tweak contact properties.
      // Contact stiffness - use to make softer/harder contacts
      this.world.defaultContactMaterial.contactEquationStiffness = 1e9;

      // Stabilization time in number of timesteps
      this.world.defaultContactMaterial.contactEquationRelaxation = 4;

      const solver = new CANNON.GSSolver();
      solver.iterations = 7;
      solver.tolerance = 0.1;
      this.world.solver = new CANNON.SplitSolver(solver);
      // use this to test non-split solver
      // world.solver = solver

      this.world.gravity.set(0, -9.8, 0);

      // Create a slippery material (friction coefficient = 0.0)
      const physics_physics = new CANNON.ContactMaterial(
        this.physicsMaterial,
        this.physicsMaterial,
        {
          friction: 0.0,
          restitution: 0.3,
        }
      );

      // We must add the contact materials to the world
      // this.world.addContactMaterial(physics_physics);

      // Create the user collision sphere
      const radius = 1.3;
      sphereShape = new CANNON.Sphere(radius);
      this.sphereBody.addShape(sphereShape);
      this.sphereBody.position.set(1, 18.6, 1);
      this.sphereBody.linearDamping = 0.9;
      this.world.addBody(this.sphereBody);

      this.worldGenerator.worldGenerate();
      this.boxes = [...this.worldGenerator.getBoxes()];
    };
    this.initControls = () => {
      this.controls = new PointerLockControlsCannon(
        this.camera,
        this.sphereBody
      );
      this.scene.add(this.controls.getObject());

      this.renderer.domElement.addEventListener("click", () => {
        this.controls.lock();
      });

      this.controls.addEventListener("lock", () => {
        switchHeader(false);
        this.controls.enabled = true;
      });

      this.controls.addEventListener("unlock", () => {
        switchHeader(true);
        this.controls.enabled = false;
      });
    };
    this.getGeneratingBlockDirection = () => {
      this.camera.getWorldPosition(this.positionVector);
      this.camera.getWorldDirection(this.lookAtVector);

      this.lookAtVector.multiplyScalar(5);
      this.lookAtVector.addVectors(this.lookAtVector, this.positionVector);

      const ray = new CANNON.Ray(
        mapFromThree(this.positionVector),
        mapFromThree(this.lookAtVector)
      );
      ray.mode = CANNON.RAY_MODES.CLOSEST;
      const result = new CANNON.RaycastResult();
      ray.intersectBodies(this.boxes, result);
      // console.log("result: ", result);

      if (result.body?.position && result.hasHit) {
        let resultVector = new CANNON.Vec3();
        resultVector = result.body.vectorToWorldFrame(result.hitPointWorld);
        resultVector.x = Math.floor(resultVector.x) + 0.5;
        resultVector.y = Math.floor(resultVector.y) + 0.5;
        resultVector.z = Math.floor(resultVector.z) + 0.5;
        return resultVector;
      }
    };
    this.initialize = () => {
      this.initializeThree();
      this.initControls();
      this.initCannon();
      this.render();
    };
  }
}
