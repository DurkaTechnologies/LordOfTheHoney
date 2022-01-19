import * as THREE from "three";
import * as CANNON from "cannon-es";

export const mapFromCannon = (vec3: CANNON.Vec3) => {
  return new THREE.Vector3(vec3.x, vec3.y, vec3.z);
};
export const mapFromThree = (vector3: THREE.Vector3) => {
  return new CANNON.Vec3(vector3.x, vector3.y, vector3.z);
};
