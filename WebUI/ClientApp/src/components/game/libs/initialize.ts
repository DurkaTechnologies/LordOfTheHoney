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

export class InitializeGame {
  initialize: () => void;
  initializeThree: () => void;
  initCannon: () => void;
  initControls: () => void;
  render: () => void;
  updateBoxesFromVoxels: () => void;
  switchHeader: (data: boolean) => void;

  world: CANNON.World;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;

  cubeHelperMesh: THREE.Mesh | null = null;
  cubeHelperBody: CANNON.Body | null = null;

  //@ts-ignore
  controls: PointerLockControlsCannon;
  //@ts-ignore
  camera: THREE.PerspectiveCamera;

  sphereBody: CANNON.Body;
  physicsMaterial: CANNON.Material;

  primitives: Primitives;
  voxels: VoxelLandscape;

  time = Date.now();

  boxMeshes: Array<THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>> =
    [];

  lastCallTime = performance.now() / 1000;

  lookAtVector: THREE.Vector3 = new Vector3();
  positionVector: THREE.Vector3 = new Vector3();

  //@ts-ignore
  floor: THREE.Mesh;

  // groundBody: CANNON.Body;
  defaultMaterial: THREE.MeshLambertMaterial;

  boxes: Array<CANNON.Body> = [];

  voxelWorld: VoxelWorld;

  nx = 50;
  ny = 8;
  nz = 50;
  sx = 1;
  sy = 1;
  sz = 1;

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

    const cellSize = 50;
    const tileSize = 16;
    const tileTextureWidth = 256;
    const tileTextureHeight = 64;
    this.voxelWorld = new VoxelWorld({
      cellSize,
      tileSize,
      tileTextureWidth,
      tileTextureHeight,
    });

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

      for (let i = 0; i < this.voxels.boxes.length; i++) {
        this.boxMeshes[i].position.copy(this.voxels.boxes[i].position);
        this.boxMeshes[i].quaternion.copy(this.voxels.boxes[i].quaternion);
      }
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

      if (result.body?.position && result.hasHit) {
        let resultVector = new CANNON.Vec3();
        resultVector = result.body.vectorToWorldFrame(result.hitPointWorld);
        resultVector.x = Math.floor(resultVector.x) + 0.5;
        resultVector.z = Math.floor(resultVector.z) + 0.5;
        resultVector.y = Math.floor(resultVector.y) + 0.5;
        const box = this.primitives.createCube(resultVector, true);
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

      // const controls = new OrbitControls(
      //   camera,
      //   document.getElementById("webgl")!
      // );
      // controls.target.set(cellSize / 2, cellSize / 3, cellSize / 2);
      // controls.update();

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

      const height = 1;

      this.render;

      // for (let y = 0; y < cellSize; ++y) {
      //   for (let z = 0; z < cellSize; ++z) {
      //     for (let x = 0; x < cellSize; ++x) {
      //       if (y < height) {
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
        // console.log("result.hitFaceIndex: ", result.hitFaceIndex);

        if (result.body?.position && result.hasHit) {
          let resultVector = new CANNON.Vec3();
          resultVector = result.body.vectorToWorldFrame(result.hitPointWorld);
          resultVector.x = Math.floor(resultVector.x) + 0.5;
          resultVector.z = Math.floor(resultVector.z) + 0.5;
          resultVector.y = Math.floor(resultVector.y) + 0.5;
          console.log("resultVector: ", resultVector);
          const box = this.primitives.createCube(resultVector).body;
          this.boxes.push(box);
        }

        // const materialLine = new THREE.LineBasicMaterial({ color: 0x0000ff });

        // const points = [];
        // points.push(this.positionVector);
        // points.push(this.lookAtVector);

        // const geometry = new THREE.BufferGeometry().setFromPoints(points);

        // const line = new THREE.Line(geometry, materialLine);

        // this.scene.add(line);
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
      this.sphereBody.position.set(
        this.nx * this.sx * 0.5,
        this.ny * this.sy + radius * 2,
        this.nz * this.sz * 0.5
      );
      this.sphereBody.linearDamping = 0.9;
      this.world.addBody(this.sphereBody);

      for (let i = 0; i < this.nx; i++) {
        for (let j = 0; j < this.ny; j++) {
          for (let k = 0; k < this.nz; k++) {
            let filled = true;

            // Insert map constructing logic here
            if (Math.sin(i * 0.1) * Math.sin(k * 0.1) < (j / this.ny) * 2 - 1) {
              filled = false;
            }

            this.voxels.setFilled(i, j, k, filled);
            if (filled) {
              this.voxelWorld.setVoxel(i, j, k, 14);
            }
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
        this.boxMeshes.push(voxelMesh);
        // this.scene.add(voxelMesh);
      }

      const { positions, normals, uvs, indices } =
        this.voxelWorld.generateGeometryDataForCell(0, 0, 0);
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
      this.scene.add(mesh);

      this.updateBoxesFromVoxels();

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
    this.updateBoxesFromVoxels = () => {
      this.boxes = [...this.voxels.getBoxes()];
      console.log("[...this.voxels.getBoxes()]: ", [...this.voxels.getBoxes()]);
    };
    this.initialize = () => {
      this.initializeThree();
      this.initControls();
      this.initCannon();
      this.render();
    };
  }
}
