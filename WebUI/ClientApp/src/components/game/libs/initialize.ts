import * as THREE from "three";
import * as CANNON from "cannon-es";
import { resizeEvent, dblClickEvent, escClickEvent } from "./windowEvents";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import VoxelWorld from "./3dLib/VoxelWorld/VoxelWorld";
import Primitives from "./3dLib/primitives";

import { PointerLockControlsCannon } from "./controlers/PersonController";
//@ts-ignore
import { GPUPicker } from "three_gpu_picking";
import { Vector3 } from "three";

import { VoxelLandscape } from "./3dLib/VoxelWorld/VoxelLandscape";

export class InitializeGame {
  initialize: () => void;
  initializeThree: () => void;
  initCannon: () => void;
  initControls: () => void;
  render: () => void;

  world: CANNON.World;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;

  //@ts-ignore
  controls: PointerLockControlsCannon;
  //@ts-ignore
  camera: THREE.PerspectiveCamera;

  sphereBody: CANNON.Body;
  physicsMaterial: CANNON.Material;

  primitives: Primitives;
  voxels: VoxelLandscape;

  time = Date.now();

  //@ts-ignore
  floor: THREE.Mesh;

  // groundBody: CANNON.Body;
  defaultMaterial: THREE.MeshLambertMaterial;

  nx = 10;
  ny = 1;
  nz = 10;
  sx = 0.5;
  sy = 0.5;
  sz = 0.5;

  constructor() {
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

    this.primitives = new Primitives(this.world, this.scene);

    this.voxels = new VoxelLandscape(
      this.world,
      this.nx,
      this.ny,
      this.nz,
      this.sx,
      this.sy,
      this.sz
    );

    const canvas = document.querySelector("#webgl");
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas as Element });

    this.initializeThree = () => {
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      //Setting Renderer size
      this.renderer.setSize(sizes.width, sizes.height);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const cellSize = 25;

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

      // const controls = new OrbitControls(
      //   camera,
      //   document.getElementById("webgl")!
      // );
      // controls.target.set(cellSize / 2, cellSize / 3, cellSize / 2);
      // controls.update();

      resizeEvent(sizes, this.camera, this.renderer);
      dblClickEvent(canvas);
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

      let renderRequested: boolean | undefined = false;

      const loader = new THREE.TextureLoader();
      const texture = loader.load(
        "textures/flourish-cc-by-nc-sa.png",
        this.render
      );
      console.log(texture);
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;

      const tileSize = 16;
      const tileTextureWidth = 256;
      const tileTextureHeight = 64;
      const world = new VoxelWorld({
        cellSize,
        tileSize,
        tileTextureWidth,
        tileTextureHeight,
      });

      const height = 1;

      let counter = 0;

      // for (let y = 0; y < cellSize; ++y) {
      //   for (let z = 0; z < cellSize; ++z) {
      //     for (let x = 0; x < cellSize; ++x) {
      //       if (y < height) {
      //         if (x % 2 === 0 && z % 2 === 0) {
      //           counter++;
      //         }
      //         console.log("VECTOR:", new Vector3(x, y, z));
      //         world.setVoxel(x, y, z, randInt(1, 17), this.primitives, true);
      //       }
      //     }
      //   }
      // }
      // console.log("COUNTER: ", counter);

      // const materialA = new THREE.MeshLambertMaterial({ color: 0xdddddd });
      // const floorGeometry = new THREE.PlaneBufferGeometry(300, 300, 100, 100);
      // floorGeometry.rotateX(-Math.PI / 2);
      // this.floor = new THREE.Mesh(floorGeometry, materialA);
      // this.floor.receiveShadow = true;
      // this.scene.add(this.floor);

      function randInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
      }

      const { positions, normals, uvs, indices } =
        world.generateGeometryDataForCell(0, 0, 0);
      const geometry = new THREE.BufferGeometry();
      const material = new THREE.MeshLambertMaterial({
        map: texture,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
        transparent: true,
      });

      const positionNumComponents = 3;
      const normalNumComponents = 3;
      const uvNumComponents = 2;
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
          new Float32Array(positions),
          positionNumComponents
        )
      );
      geometry.setAttribute(
        "normal",
        new THREE.BufferAttribute(
          new Float32Array(normals),
          normalNumComponents
        )
      );
      geometry.setAttribute(
        "uv",
        new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents)
      );
      geometry.setIndex(indices);
      const mesh = new THREE.Mesh(geometry, material);
      // this.scene.add(mesh);

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
        const lookAtV = new THREE.Vector3();
        this.camera.getWorldDirection(lookAtV);

        const ray = new CANNON.Ray(
          new CANNON.Vec3(
            this.sphereBody.position.x,
            this.sphereBody.position.y,
            this.sphereBody.position.z
          ),
          new CANNON.Vec3(lookAtV.x, lookAtV.y, lookAtV.z)
        );
        const result = new CANNON.RaycastResult();
        console.log("asd", this.voxels.getBoxes());
        ray.intersectBodies(this.voxels.getBoxes(), result);
        console.log("RAY: ", result);
        console.log("body: ", result.body?.position);

        const resV = new CANNON.Vec3(
          result.rayFromWorld.x + result.hitNormalWorld.x,
          0.5,
          result.rayFromWorld.z + result.hitNormalWorld.z
        );

        this.primitives.createCube(result.hitPointWorld);

        // this.primitives.createCube(result.rayFromWorld)
        // this.primitives.createCube(result.rayToWorld)
        // this.primitives.createCube(result.hitPointWorld)
        // this.primitives.createCube(result.hitNormalWorld)
        // this.primitives.createCube(ray.direction)
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
      this.sphereBody.position.set(1, 1, 1);
      this.sphereBody.linearDamping = 0.9;
      this.world.addBody(this.sphereBody);

      for (let i = 0; i < this.nx; i++) {
        for (let j = 0; j < this.ny; j++) {
          for (let k = 0; k < this.nz; k++) {
            // Insert map constructing logic here
            // if (Math.sin(i * 0.1) * Math.sin(k * 0.1) < (j / ny) * 2 - 1) {
            // filled = true;
            // }

            this.voxels.setFilled(i, j, k, true);
          }
        }
      }

      this.voxels.update();

      console.log(`${this.voxels.boxes.length} voxel physics bodies`);

      // Voxel meshes
      for (let i = 0; i < this.voxels.boxes.length; i++) {
        const box = this.voxels.boxes[i];
        const voxelGeometry = new THREE.BoxBufferGeometry(
          this.voxels.sx * box.nx,
          this.voxels.sy * box.ny,
          this.voxels.sz * box.nz
        );
        const voxelMesh = new THREE.Mesh(voxelGeometry, this.defaultMaterial);
        voxelMesh.castShadow = true;
        voxelMesh.receiveShadow = true;
        this.scene.add(voxelMesh);
      }

      // const groundShape = new CANNON.Plane();
      // this.groundBody.addShape(groundShape);
      // this.groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
      // this.world.addBody(this.groundBody);
    };

    this.initControls = () => {
      this.controls = new PointerLockControlsCannon(
        this.camera,
        this.sphereBody
      );
      this.scene.add(this.controls.getObject());
    };

    this.render = () => {
      requestAnimationFrame(this.render);

      const currTime = Date.now();
      const deltaTime = currTime - this.time;
      this.time = currTime;

      // if (resizeRendererToDisplaySize(renderer)) {
      //   const canvas = renderer.domElement;
      //   this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      //   this.camera.updateProjectionMatrix();
      // }

      this.world.step(1 / 60, deltaTime);

      this.controls.update(deltaTime);
      this.renderer.render(this.scene, this.camera);
    };

    this.initialize = () => {
      this.initializeThree();
      this.initControls();
      this.initCannon();
      this.render();
    };
  }
}
