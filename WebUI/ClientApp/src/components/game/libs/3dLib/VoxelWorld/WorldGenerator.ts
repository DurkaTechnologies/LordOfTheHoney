import * as THREE from "three";
import * as CANNON from "cannon-es";
import { VoxelLandscape } from "./VoxelLandscape";
import VoxelWorld from "./VoxelWorld";

export class WorldGenerator {
  worldGenerate: () => void;
  getBoxes: () => Array<CANNON.Body>;
  updateVoxelGeometry: () => void;
  setCubeTexture: (position: THREE.Vector3 | CANNON.Vec3) => void;

  voxelWorld: VoxelWorld;
  voxels: VoxelLandscape;

  cellSize = 50;
  tileSize = 16;
  tileTextureWidth = 256;
  tileTextureHeight: number = 64;

  numberX = 50;
  numberY = 8;
  numberZ = 50;
  scaleX = 1;
  scaleY = 1;
  scaleZ = 1;

  constructor(world: CANNON.World, scene: THREE.Scene, texture: THREE.Texture) {
    this.worldGenerate = () => {
      for (let i = 0; i < this.numberX; i++) {
        for (let j = 0; j < this.numberY; j++) {
          for (let k = 0; k < this.numberZ; k++) {
            let filled = true;

            // Insert map constructing logic here
            if (
              Math.sin(i * 0.1) * Math.sin(k * 0.1) <
              (j / this.numberY) * 2 - 1
            ) {
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
      //   for (let i = 0; i < voxels.boxes.length; i++) {
      //     const box = voxels.boxes[i];

      //     const voxelGeometry = new THREE.BoxBufferGeometry(
      //       voxels.sx * box.nx,
      //       voxels.sy * box.ny,
      //       voxels.sz * box.nz
      //     );
      // const voxelMesh = new THREE.Mesh(voxelGeometry, this.defaultMaterial);
      // voxelMesh.castShadow = true;
      // voxelMesh.receiveShadow = true;
      // this.boxMeshes.push(voxelMesh);
      // this.scene.add(voxelMesh);
      //   }

      //update voxel geometry
      this.updateVoxelGeometry();
    };
    this.updateVoxelGeometry = () => {
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
      scene.add(mesh);
    };
    this.getBoxes = () => {
      return this.voxels.getBoxes();
    };
    this.setCubeTexture = (position: THREE.Vector3 | CANNON.Vec3) => {
      this.voxelWorld.setVoxel(position.x, position.y, position.z, 14);
    };

    this.voxelWorld = new VoxelWorld({
      cellSize: this.cellSize,
      tileSize: this.tileSize,
      tileTextureWidth: this.tileTextureWidth,
      tileTextureHeight: this.tileTextureHeight,
    });
    this.voxels = new VoxelLandscape(
      world,
      this.numberX,
      this.numberY,
      this.numberZ,
      this.scaleX,
      this.scaleY,
      this.scaleZ
    );
  }
}

// update = () => {
//   for (let i = 0; i < this.voxels.boxes.length; i++) {
//     this.boxMeshes[i].position.copy(this.voxels.boxes[i].position);
//     this.boxMeshes[i].quaternion.copy(this.voxels.boxes[i].quaternion);
//   }
// };
