import * as THREE from "three";
import * as CANNON from "cannon-es";
import VoxelWorld from "./VoxelWorld/VoxelWorld";
import { WorldGenerator } from "./VoxelWorld/WorldGenerator";

export type CreateCubePrimitiveResponse = {
  mesh: THREE.Mesh;
  body: CANNON.Body;
};

class GeometrySettings {
  width?: number;
  height?: number;
  depth?: number;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;

  constructor(
    width?: number,
    height?: number,
    depth?: number,
    widthSegments?: number,
    heightSegments?: number,
    depthSegments?: number
  ) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.widthSegments = widthSegments;
    this.heightSegments = heightSegments;
    this.depthSegments = depthSegments;
  }
}

class CubeSettings extends GeometrySettings {
  constructor(
    size?: number,
    widthSegments?: number,
    heightSegments?: number,
    depthSegments?: number
  ) {
    super(size, size, size, widthSegments, heightSegments, depthSegments);
  }
}

class Primitives {
  defaultMaterial = new THREE.MeshLambertMaterial({ color: 0xff1100 });
  helperMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
  });
  world: CANNON.World;
  scene: THREE.Scene;
  worldGenerator: WorldGenerator;

  constructor(
    world: CANNON.World,
    scene: THREE.Scene,
    worldGenerator: WorldGenerator
  ) {
    this.world = world;
    this.scene = scene;
    this.worldGenerator = worldGenerator;
  }

  createCube = (
    position: THREE.Vector3 | CANNON.Vec3,
    textureIndex: number,
    isHelper: boolean = false,
    withTexture: boolean = true
  ) => {
    const halfExtents = new CANNON.Vec3(0.5, 0.5, 0.5);
    const boxShape = new CANNON.Box(halfExtents);
    const boxGeometry = new THREE.BoxBufferGeometry(
      halfExtents.x * 2,
      halfExtents.y * 2,
      halfExtents.z * 2
    );

    const boxBody = new CANNON.Body({
      mass: 0,
      type: CANNON.BODY_TYPES.STATIC,
    });
    boxBody.addShape(boxShape);
    const currMaterial = isHelper ? this.helperMaterial : this.defaultMaterial;
    const boxMesh = new THREE.Mesh(boxGeometry, currMaterial);

    boxBody.position.set(position.x, position.y, position.z);
    boxMesh.position.copy(
      new THREE.Vector3(position.x, position.y, position.z)
    );

    // boxMesh.castShadow = true;
    // boxMesh.receiveShadow = true;

    this.world.addBody(boxBody);
    if (withTexture) {
      this.worldGenerator.setCubeTexture(position, textureIndex);
      this.worldGenerator.updateVoxelGeometry();
    } else {
      this.scene.add(boxMesh);
    }

    // boxes.push(boxBody);
    // boxMeshes.push(boxMesh);

    const response: CreateCubePrimitiveResponse = {
      body: boxBody,
      mesh: boxMesh,
    };

    return response;
  };
  clearCube(boxBody: CANNON.Body, mesh?: THREE.Mesh) {
    this.world.removeBody(boxBody);
    if (mesh) this.scene.remove(mesh);
  }

  static CreateBoxGeometry(geometrySettings: GeometrySettings) {
    const geometry = new THREE.BoxGeometry(
      geometrySettings.width,
      geometrySettings.height,
      geometrySettings.depth,
      geometrySettings.widthSegments,
      geometrySettings.heightSegments,
      geometrySettings.depthSegments
    );

    return geometry;
  }

  static CreateCubeGeometry(cubeSettings: CubeSettings) {
    const geometry = new THREE.BoxGeometry(
      cubeSettings.width,
      cubeSettings.height,
      cubeSettings.depth,
      cubeSettings.widthSegments,
      cubeSettings.heightSegments,
      cubeSettings.depthSegments
    );

    return geometry;
  }

  static CreatePlaneGeometry(geometrySettings: GeometrySettings) {
    const geometry = new THREE.PlaneGeometry(
      geometrySettings.width,
      geometrySettings.height,
      geometrySettings.widthSegments,
      geometrySettings.heightSegments
    );

    return geometry;
  }
}

export default Primitives;
